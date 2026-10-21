import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useReducedMotion } from 'motion/react';
import { motionTokens } from '../utils/motionTokens';

export const CustomCursor: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<
    'default' | 'pointer' | 'text' | 'drag' | 'explore'
  >('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // High precision spring coordinates for the cursor follower ring
  const mouseX = useSpring(0, motionTokens.spring.snappy);
  const mouseY = useSpring(0, motionTokens.spring.snappy);
  const ringX = useSpring(0, motionTokens.spring.gentle);
  const ringY = useSpring(0, motionTokens.spring.gentle);

  const currentTypeRef = useRef(cursorType);
  currentTypeRef.current = cursorType;

  const lastTargetCheckRef = useRef(0);

  useEffect(() => {
    // Detect touch device
    if (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      setIsVisible((prev) => (prev ? prev : true));

      // Throttle DOM tree inspection to 60ms to prevent layout thrashing and re-renders
      const now = performance.now();
      if (now - lastTargetCheckRef.current < 60) {
        return;
      }
      lastTargetCheckRef.current = now;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      let nextType: 'default' | 'pointer' | 'text' | 'drag' | 'explore' = 'default';

      if (target.closest('[data-cursor="drag"]') || target.closest('#projects')) {
        nextType = 'drag';
      } else if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer')
      ) {
        nextType = 'pointer';
      } else if (target.closest('input') || target.closest('textarea')) {
        nextType = 'text';
      }

      if (nextType !== currentTypeRef.current) {
        currentTypeRef.current = nextType;
        setCursorType(nextType);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, ringX, ringY]);

  if (isTouchDevice || shouldReduceMotion || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none">
      {/* Central crisp focal dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className={`w-1.5 h-1.5 rounded-full bg-black transition-transform duration-150 ${
          cursorType === 'text' ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Trailing subtle inertial ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorType === 'pointer' ? 1.5 : cursorType === 'drag' ? 1.8 : 1,
          borderColor:
            cursorType === 'pointer'
              ? 'rgba(0, 0, 0, 0.45)'
              : cursorType === 'drag'
              ? 'rgba(0, 0, 0, 0.6)'
              : 'rgba(0, 0, 0, 0.18)',
        }}
        transition={{ duration: 0.2 }}
        className={`w-7 h-7 rounded-full border border-black/20 flex items-center justify-center ${
          cursorType === 'text' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {cursorType === 'drag' && (
          <span className="text-[7px] font-mono font-black text-black uppercase tracking-tighter">
            DRAG
          </span>
        )}
      </motion.div>
    </div>
  );
};
