import { useEffect, useRef } from 'react';

export default function useScrollAnimation(options = {}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const {
      threshold = 0.1,
      rootMargin = '0px',
      animateOnce = false,
    } = options;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            if (animateOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!animateOnce) {
            entry.target.classList.remove('in-view');
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options.threshold, options.rootMargin, options.animateOnce]);

  return elementRef;
}
