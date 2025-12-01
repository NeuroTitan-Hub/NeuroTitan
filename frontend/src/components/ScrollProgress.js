import React from 'react';
import { motion, useScroll } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #8A2BE2 0%, #00FFFF 100%)',
        transformOrigin: '0%',
        zIndex: 9999,
      }}
    />
  );
};

export default ScrollProgress;
