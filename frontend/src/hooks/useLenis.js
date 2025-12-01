import { useEffect } from 'react';
import Lenis from 'lenis';

export default function useLenis() {
  useEffect(() => {
    // Check if mobile device
    const isMobile = window.innerWidth < 768;
    
    // Only initialize Lenis on desktop for better mobile performance
    if (isMobile) {
      return;
    }

    // Initialize Lenis for desktop only
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Animation frame loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);
}
