/*
 * Homepage motion. Everything here is decoration on top of content that is complete without it:
 * - with JavaScript off, the hero shows its first word, the field scene shows its final state,
 *   and numbers show their real values;
 * - under prefers-reduced-motion, canvases draw one still frame and nothing moves;
 * - canvases pause when off screen or when the tab is hidden.
 */

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => t * t * (3 - 2 * t);

/** Runs `draw` on animation frames only while `el` is on screen and the tab is visible. */
function loopWhileVisible(el: Element, draw: (t: number) => void) {
  let on = false;
  let raf = 0;
  const tick = (t: number) => {
    draw(t);
    raf = requestAnimationFrame(tick);
  };
  const update = () => {
    const want = on && document.visibilityState === "visible";
    if (want && !raf) raf = requestAnimationFrame(tick);
    if (!want && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
  new IntersectionObserver(([e]) => {
    on = e.isIntersecting;
    update();
  }).observe(el);
  document.addEventListener("visibilitychange", update);
}

function sizeCanvas(c: HTMLCanvasElement) {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const w = c.clientWidth;
  const h = c.clientHeight;
  c.width = Math.round(w * dpr);
  c.height = Math.round(h * dpr);
  const ctx = c.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h };
}

/* ---------- 1. Hero: signal streaming out from one point ---------- */
function warp(c: HTMLCanvasElement) {
  let { ctx, w, h } = sizeCanvas(c);
  type P = { a: number; r: number; v: number; red: boolean; len: number };
  const N = Math.round(clamp((w * h) / 2600, 160, 520));
  const spawn = (r = Math.random() * 40): P => ({
    a: Math.random() * Math.PI * 2,
    r,
    v: 0.25 + Math.random() * 0.9,
    red: Math.random() < 0.07,
    len: 0,
  });
  const ps: P[] = Array.from({ length: N }, () => spawn(Math.random() * Math.hypot(w, h) * 0.6));
  let mx = 0;
  let my = 0;
  c.parentElement?.addEventListener("pointermove", (e) => {
    const b = c.getBoundingClientRect();
    mx = (e.clientX - b.left) / b.width - 0.5;
    my = (e.clientY - b.top) / b.height - 0.5;
  });
  addEventListener("resize", () => ({ ctx, w, h } = sizeCanvas(c)));

  const frame = (still: boolean) => {
    const cx = w * (0.68 - mx * 0.04);
    const cy = h * (0.46 - my * 0.04);
    const maxR = Math.hypot(w, h) * 0.75;
    ctx.fillStyle = still ? "#0f0f0f" : "rgba(15,15,15,0.28)";
    ctx.fillRect(0, 0, w, h);
    for (const p of ps) {
      const speed = p.v * (1 + p.r / 120);
      if (!still) p.r += speed;
      p.len = Math.min(26, speed * 5);
      if (p.r > maxR) Object.assign(p, spawn());
      const k = clamp(p.r / (maxR * 0.5));
      const x1 = cx + Math.cos(p.a) * p.r;
      const y1 = cy + Math.sin(p.a) * p.r;
      const x0 = cx + Math.cos(p.a) * (p.r - p.len);
      const y0 = cy + Math.sin(p.a) * (p.r - p.len);
      ctx.strokeStyle = p.red ? `rgba(229,87,78,${0.25 + 0.6 * k})` : `rgba(236,232,225,${0.08 + 0.5 * k})`;
      ctx.lineWidth = 0.6 + k * 0.9;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
    }
    // a soft core where the signal comes from
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 46);
    g.addColorStop(0, "rgba(255,236,230,0.5)");
    g.addColorStop(0.3, "rgba(229,87,78,0.14)");
    g.addColorStop(1, "rgba(229,87,78,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, 46, 0, Math.PI * 2);
    ctx.fill();
  };

  if (reduce) {
    for (let i = 0; i < 40; i++) frame(false);
    frame(true);
    return;
  }
  ctx.fillStyle = "#0f0f0f";
  ctx.fillRect(0, 0, w, h);
  loopWhileVisible(c, () => frame(false));
}

/* ---------- 2. Hero: the last word scrambles into the next one ---------- */
function swapWords(el: HTMLElement) {
  const words: string[] = JSON.parse(el.dataset.words || "[]");
  if (reduce || words.length < 2) return;
  const glyphs = "01<>/=+*#%&$@";
  let i = 0;
  const to = (next: string) => {
    const from = el.textContent || "";
    const len = Math.max(from.length, next.length);
    const start = performance.now();
    const dur = 650;
    const step = (t: number) => {
      const k = clamp((t - start) / dur);
      let out = "";
      for (let j = 0; j < len; j++) {
        const settle = (j + 1) / len;
        if (k >= settle) out += next[j] ?? "";
        else if (k > settle - 0.45) out += glyphs[(Math.random() * glyphs.length) | 0];
        else out += from[j] ?? "";
      }
      el.textContent = out;
      if (k < 1) requestAnimationFrame(step);
      else el.textContent = next;
    };
    requestAnimationFrame(step);
  };
  setInterval(() => {
    if (document.visibilityState !== "visible") return;
    i = (i + 1) % words.length;
    to(words[i]);
  }, 2800);
}

/* ---------- 3. One core splits into the three fields as you scroll ---------- */
function orbit(section: HTMLElement) {
  const stage = section.querySelector<HTMLElement>("[data-orbit-stage]");
  if (!stage) return;
  if (reduce) {
    section.classList.add("is-static");
    return;
  }
  section.classList.add("is-live");
  const update = () => {
    const b = section.getBoundingClientRect();
    const total = b.height - innerHeight;
    const p = clamp(-b.top / (total || 1));
    stage.style.setProperty("--grow", ease(clamp(p / 0.22)).toFixed(3));
    stage.style.setProperty("--split", ease(clamp((p - 0.18) / 0.37)).toFixed(3));
    stage.style.setProperty("--labels", ease(clamp((p - 0.5) / 0.2)).toFixed(3));
    stage.style.setProperty("--text", ease(clamp((p - 0.68) / 0.22)).toFixed(3));
  };
  let queued = false;
  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      update();
    });
  };
  update();
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll, { passive: true });
}

/* ---------- 4. Numbers count up when they come into view ---------- */
function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target) || reduce) return;
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    const start = performance.now();
    const dur = 1100;
    const step = (t: number) => {
      const k = clamp((t - start) / dur);
      el.textContent = String(Math.round(target * ease(k)));
      if (k < 1) requestAnimationFrame(step);
    };
    el.textContent = "0";
    requestAnimationFrame(step);
  });
  io.observe(el);
}

/* ---------- 5. A rippling field of points (a wave on a plane) ---------- */
function wave(c: HTMLCanvasElement) {
  let { ctx, w, h } = sizeCanvas(c);
  addEventListener("resize", () => ({ ctx, w, h } = sizeCanvas(c)));
  let px = 0.5;
  let py = 0.5;
  c.addEventListener("pointermove", (e) => {
    const b = c.getBoundingClientRect();
    px = (e.clientX - b.left) / b.width;
    py = (e.clientY - b.top) / b.height;
  });
  const cols = 34;
  const rows = 22;
  const draw = (t: number) => {
    ctx.clearRect(0, 0, w, h);
    const time = t / 1000;
    for (let j = 0; j < rows; j++) {
      const depth = j / (rows - 1); // 0 far, 1 near
      const y0 = h * (0.12 + 0.82 * depth * depth * 0.6 + depth * 0.32);
      const spread = 0.45 + 0.55 * depth;
      for (let i = 0; i < cols; i++) {
        const u = i / (cols - 1);
        const x = w * (0.5 + (u - 0.5) * spread);
        const dx = u - px;
        const dy = depth - py;
        const d = Math.hypot(dx, dy);
        const z = Math.sin(d * 14 - time * 2.2) * Math.exp(-d * 2.2) + 0.35 * Math.sin(u * 6 + time * 0.9);
        const y = y0 - z * 18 * (0.4 + depth);
        const r = 0.6 + depth * 1.6;
        const a = 0.15 + depth * 0.55;
        const hot = z > 0.75;
        ctx.fillStyle = hot ? `rgba(163,33,27,${a + 0.2})` : `rgba(21,21,21,${a})`;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
      }
    }
  };
  if (reduce) {
    draw(0);
    return;
  }
  loopWhileVisible(c, draw);
}

document.querySelectorAll<HTMLCanvasElement>("canvas[data-warp]").forEach(warp);
document.querySelectorAll<HTMLElement>("[data-words]").forEach(swapWords);
document.querySelectorAll<HTMLElement>("[data-orbit]").forEach(orbit);
document.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
document.querySelectorAll<HTMLCanvasElement>("canvas[data-wave]").forEach(wave);
