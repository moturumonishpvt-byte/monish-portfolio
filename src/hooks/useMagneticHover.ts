import React, { useRef, useState, useCallback } from 'react';
import { useSpring, useReducedMotion } from 'motion/react';
import { motionTokens } from '../utils/motionTokens';

interface MagneticHoverOptions {
  strength?: number; // Maximum offset in pixels
}

export function useMagneticHover({ strength = 6 }: MagneticHoverOptions = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useSpring(0, motionTokens.spring.snappy);
  const y = useSpring(0, motionTokens.spring.snappy);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (shouldReduceMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      x.set(deltaX * strength);
      y.set(deltaY * strength);
    },
    [shouldReduceMotion, strength, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return {
    ref,
    x,
    y,
    handleMouseMove,
    handleMouseLeave,
  };
}
