import React, { useState, useCallback } from 'react';
import { useSpring, useTransform, useReducedMotion } from 'motion/react';
import { motionTokens } from '../utils/motionTokens';

interface PointerParallaxOptions {
  maxAngle?: number;
  maxOffset?: number;
}

export function usePointerParallax({
  maxAngle = 8,
  maxOffset = 12,
}: PointerParallaxOptions = {}) {
  const shouldReduceMotion = useReducedMotion();
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (shouldReduceMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setCoords({ x, y });
    },
    [shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setCoords({ x: 0, y: 0 });
  }, []);

  const springConfig = motionTokens.spring.tactile;

  const rotateX = useSpring(
    useTransform(() => (shouldReduceMotion ? 0 : coords.y * -maxAngle)),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(() => (shouldReduceMotion ? 0 : coords.x * maxAngle)),
    springConfig
  );
  const translateX = useSpring(
    useTransform(() => (shouldReduceMotion ? 0 : coords.x * maxOffset)),
    springConfig
  );
  const translateY = useSpring(
    useTransform(() => (shouldReduceMotion ? 0 : coords.y * maxOffset)),
    springConfig
  );

  return {
    handleMouseMove,
    handleMouseLeave,
    rotateX,
    rotateY,
    translateX,
    translateY,
    normalizedX: coords.x,
    normalizedY: coords.y,
  };
}
