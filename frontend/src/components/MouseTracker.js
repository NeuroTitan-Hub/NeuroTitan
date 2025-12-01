import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MouseTracker = () => {
  const [isMobile, setIsMobile] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('resize', checkMobile);
    };
  }, [cursorX, cursorY]);

  // Don't render on mobile
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="pointer-events-none fixed z-50 mix-blend-screen"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div
          style={{
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </motion.div>

      {/* Secondary subtle glow */}
      <motion.div
        className="pointer-events-none fixed z-50 mix-blend-screen"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 60%)',
            filter: 'blur(20px)',
          }}
        />
      </motion.div>
    </>
  );
};

export default MouseTracker;
