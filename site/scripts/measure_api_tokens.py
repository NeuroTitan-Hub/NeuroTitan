"""Count FLORES-200 devtest tokens on tokenizers that are only reachable through an API:
Anthropic's (Claude) and Google's (Gemini). Both counting endpoints are free to call.

Usage (PowerShell; the key stays in your own terminal and is never written anywhere):
    $env:ANTHROPIC_API_KEY = "..."   # Anthropic Console key
    python -I site/scripts/measure_api_tokens.py anthropic claude-opus-5-5 FLORES_DEVTEST_DIR site/scripts/api-tokens
    python -I site/scripts/measure_api_tokens.py anthropic claude-sonnet-4-6 FLORES_DEVTEST_DIR site/scripts/api-tokens

    $env:GEMINI_API_KEY = "..."      # Google AI Studio key (free tier is enough)
    python -I site/scripts/measure_api_tokens.py gemini --list
    python -I site/scripts/measure_api_tokens.py gemini gemini-2.5-flash FLORES_DEVTEST_DIR site/scripts/api-tokens

Method:
- Each language's 1,012 sentences go in 22 requests of 46 sentences, joined by newlines.
  Checked on o200k, where we can count locally: ratios from this chunking match per-sentence
  ratios with a median difference of 0.01% and a worst case of 1.3% (Thai).
- Each request carries a fixed wrapper overhead (Anthropic counts a whole message). We measure it:
  overhead = 2 x count(T) - count(T + newline + T), median over 3 English chunks. The newline adds about one
  token, so this slightly overstates the overhead; the effect is about 0.1% of a language's total.
- Output: one CSV row per (model, language, chunk) with the raw count, plus a calibration file.
  The run is resumable: rows already in the CSV are skipped.
"""

from __future__ import annotations

import csv
import json
import os
import statistics
import sys
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

CHUNK = 46  # 1,012 = 22 x 46


def anthropic_counter(model: str):
    import anthropic

    client = anthropic.Anthropic(max_retries=8)  # key from ANTHROPIC_API_KEY

    def count(text: str) -> int:
        return client.messages.count_tokens(model=model, messages=[{"role": "user", "content": text}]).input_tokens

    return count


def _gemini_request(path: str, body: dict | None = None) -> dict:
    key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not key:
        raise SystemExit("Set GEMINI_API_KEY in this terminal first.")
    url = f"https://generativelanguage.googleapis.com/v1beta/{path}"
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, headers={"x-goog-api-key": key, "Content-Type": "application/json"})
    for attempt in range(8):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503, 504) and attempt < 7:
                time.sleep(min(60, 2**attempt))
                continue
            raise SystemExit(f"Gemini API error {e.code}: {e.read()[:300]!r}")
    raise SystemExit("Gemini API: too many retries")


def gemini_counter(model: str):
    def count(text: str) -> int:
        res = _gemini_request(f"models/{model}:countTokens", {"contents": [{"parts": [{"text": text}]}]})
        return int(res["totalTokens"])

    return count


def tiktoken_counter(model: str):
    """Local test mode: runs the same pipeline on an OpenAI tokenizer, no key needed."""
    import tiktoken

    enc = tiktoken.get_encoding(model)
    return lambda text: len(enc.encode_ordinary(text))


def chunks(devtest: Path, lang: str) -> list[str]:
    lines = [l for l in (devtest / f"{lang}.devtest").read_text(encoding="utf-8").split("\n") if l != ""]
    if len(lines) != 1012:
        raise SystemExit(f"{lang}: expected 1012 sentences, got {len(lines)}")
    return ["\n".join(lines[i : i + CHUNK]) for i in range(0, len(lines), CHUNK)]


def main() -> None:
    args = sys.argv[1:]
    if args[:2] == ["gemini", "--list"]:
        res = _gemini_request("models?pageSize=200")
        for m in res.get("models", []):
            if "countTokens" in m.get("supportedGenerationMethods", []) and "gemini" in m["name"]:
                print(m["name"].removeprefix("models/"), "|", m.get("displayName", ""))
        return
    if len(args) != 4:
        raise SystemExit(__doc__)
    provider, model, devtest, outdir = args[0], args[1], Path(args[2]), Path(args[3])
    count = {"anthropic": anthropic_counter, "gemini": gemini_counter, "tiktoken": tiktoken_counter}[provider](model)
    outdir.mkdir(parents=True, exist_ok=True)
    out = outdir / f"{model}.csv"

    # Calibration: fixed per-request overhead.
    eng = chunks(devtest, "eng_Latn")
    over = []
    for t in eng[:3]:
        over.append(2 * count(t) - count(t + "\n" + t))
    overhead = statistics.median(over)
    (outdir / f"{model}.calibration.json").write_text(
        json.dumps({"provider": provider, "model": model, "overhead_samples": over, "overhead": overhead,
                    "chunk_sentences": CHUNK, "date": time.strftime("%Y-%m-%d")}, indent=2),
        encoding="utf-8",
    )
    print(f"{model}: per-request overhead {overhead} tokens (samples {over})")

    done = set()
    if out.exists():
        with out.open(encoding="utf-8", newline="") as f:
            done = {(r["lang"], int(r["chunk"])) for r in csv.DictReader(f)}
    langs = sorted(p.name.removesuffix(".devtest") for p in devtest.glob("*.devtest"))
    jobs = [(lang, i, text) for lang in langs for i, text in enumerate(chunks(devtest, lang)) if (lang, i) not in done]
    print(f"{len(langs)} languages, {len(jobs)} requests to make ({len(done)} already done)")

    new_file = not out.exists()
    with out.open("a", encoding="utf-8", newline="") as f:
        w = csv.writer(f)
        if new_file:
            w.writerow(["model", "lang", "chunk", "sentences", "tokens_raw"])
        workers = 8 if provider == "anthropic" else 4
        with ThreadPoolExecutor(workers) as pool:
            futs = {pool.submit(count, text): (lang, i, text) for lang, i, text in jobs}
            for n, fut in enumerate(as_completed(futs), 1):
                lang, i, text = futs[fut]
                w.writerow([model, lang, i, text.count("\n") + 1, fut.result()])
                if n % 200 == 0:
                    f.flush()
                    print(f"  {n}/{len(jobs)}")
    print(f"done: {out}")


if __name__ == "__main__":
    main()
