# 🎨 Lenis Smooth Scrolling Implementation

## Overview
Your website now features buttery-smooth scrolling and animations inspired by the Lenis website! Here's everything that's been implemented:

## 🚀 Key Features Implemented

### 1. **Lenis Smooth Scrolling**
- Ultra-smooth scroll interpolation with custom easing
- Natural momentum and deceleration
- Optimized for both mouse wheel and touchpad
- Duration: 1.2s with custom easing curve

### 2. **Parallax Effects**
- Hero section elements move at different speeds while scrolling
- Creates depth and immersion
- Opacity transitions on scroll

### 3. **Scroll-Triggered Animations**
- Sections fade in and slide up when they enter the viewport
- Staggered animations for child elements
- Uses Intersection Observer for performance

### 4. **Magnetic Buttons** (Interactive)
- Buttons subtly follow your cursor when hovering
- Spring physics for natural movement
- Enhanced user interaction feedback

### 5. **Enhanced Card Hovers**
- Smooth scale and translate transforms
- Optimized transitions with cubic-bezier easing
- Will-change properties for performance

## 📦 New Components Created

### `useLenis.js` Hook
```javascript
import useLenis from './hooks/useLenis';

// Add to your main App component
function App() {
  useLenis();
  // ...
}
```

### `useScrollAnimation.js` Hook
```javascript
import useScrollAnimation from './hooks/useScrollAnimation';

// Use in any component
const ref = useScrollAnimation({ threshold: 0.1, animateOnce: true });
return <div ref={ref}>Content</div>;
```

### `MagneticButton.js` Component
```javascript
import MagneticButton from './components/MagneticButton';

<MagneticButton className="your-classes">
  Click Me
</MagneticButton>
```

### `ParallaxText.js` Component
```javascript
import ParallaxText from './components/ParallaxText';

<ParallaxText speed={0.5}>
  <h1>Your Text</h1>
</ParallaxText>
```

### `ScrollSection.js` Component
```javascript
import ScrollSection from './components/ScrollSection';

<ScrollSection>
  <YourContent />
</ScrollSection>
```

## 🎯 Animation Timings

All animations use carefully tuned easing curves:
- **Scroll Duration**: 1.2s
- **Fade In**: 0.8s with `cubic-bezier(0.25, 0.1, 0.25, 1)`
- **Card Hovers**: 0.5s with smooth spring physics
- **Magnetic Buttons**: Spring animation (stiffness: 150, damping: 15)

## 🎨 CSS Classes Added

### Scroll Animations
```css
section {
  /* Automatically animated on scroll */
}

.stagger-item {
  /* Children animate in sequence */
}

.parallax {
  /* Parallax scrolling effect */
}
```

## 🔧 Customization

### Adjust Scroll Speed
In `useLenis.js`:
```javascript
const lenis = new Lenis({
  duration: 1.2, // Change this (0.5 - 2.0 recommended)
  // ...
});
```

### Change Animation Delays
In `App.css`:
```css
.in-view .stagger-item:nth-child(1) { transition-delay: 0.1s; }
.in-view .stagger-item:nth-child(2) { transition-delay: 0.2s; }
/* Add more as needed */
```

### Modify Magnetic Strength
In `MagneticButton.js`:
```javascript
setPosition({ 
  x: middleX * 0.3, // Increase for stronger effect (0.1 - 0.5)
  y: middleY * 0.3 
});
```

## 🌟 Best Practices

1. **Add scroll animations to new sections:**
   ```javascript
   import ScrollSection from './components/ScrollSection';
   
   <ScrollSection>
     <YourNewSection />
   </ScrollSection>
   ```

2. **Use stagger-item class for lists:**
   ```javascript
   {items.map(item => (
     <div className="stagger-item">
       {item.content}
     </div>
   ))}
   ```

3. **Wrap interactive buttons:**
   ```javascript
   <MagneticButton>
     <button>Click Me</button>
   </MagneticButton>
   ```

## 🎭 Effects Showcase

### Smooth Scrolling
- Natural deceleration and momentum
- No jank or stuttering
- Respects reduced motion preferences

### Fade & Slide
- Elements appear smoothly from below
- Opacity transitions feel natural
- Staggered timing prevents overwhelming

### Parallax
- Hero content moves slower than background
- Creates depth perception
- Subtle and sophisticated

### Magnetic Interaction
- Buttons react to cursor proximity
- Spring physics feel organic
- Enhances perceived interactivity

## 📱 Mobile Optimization

- Smooth scrolling disabled on mobile (performance)
- Touch gestures remain native
- Reduced animation complexity
- Optimized transition durations

## ⚡ Performance

- Uses `will-change` for optimized rendering
- `transform: translateZ(0)` for GPU acceleration
- Intersection Observer instead of scroll events
- RAF loop for Lenis (60fps target)

## 🔍 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Optimized experience

## 🎉 What's Next?

Consider adding:
1. **Horizontal scroll sections** (like Apple website)
2. **SVG path animations** triggered on scroll
3. **Text reveal animations** (letter-by-letter)
4. **Scroll-linked progress indicators**
5. **3D transforms** on scroll

## 🐛 Troubleshooting

### Scrolling feels too slow/fast
Adjust `duration` in `useLenis.js`

### Animations not triggering
Check that elements have the correct classes and are wrapped in `ScrollSection`

### Performance issues
- Reduce `will-change` usage
- Simplify parallax calculations
- Use `animateOnce: true` for scroll animations

---

Enjoy your butter-smooth website! 🚀✨
