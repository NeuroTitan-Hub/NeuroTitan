import React from 'react';
import { motion } from 'framer-motion';

const RevealText = ({ children, delay = 0, duration = 0.6 }) => {
  const words = children.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.div
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', gap: '0.3em' }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ display: 'inline-block' }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default RevealText;
