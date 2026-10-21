import { ReactNode, Key } from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  className?: string;
  once?: boolean;
  key?: Key;
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 1.0,
  direction = 'up',
  distance = 35,
  className = '',
  once = true,
}: ScrollRevealProps) {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  const initial = {
    opacity: 0,
    ...directions[direction],
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once,
        margin: '0px 0px -80px 0px', // Animates earlier for high usability and a natural revealing flow
        amount: 0.1, // Starts revealing when 10% of the item is in viewport
      }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Fluid ultra-premium easeOutExpo bezier curve, giving a slow, satisfying slide-in
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
