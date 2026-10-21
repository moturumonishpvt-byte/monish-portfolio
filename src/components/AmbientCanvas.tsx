import React from 'react';

interface AmbientCanvasProps {
  className?: string;
}

/**
 * High-performance, zero-overhead ambient grid canvas.
 * Replaces heavy Three.js WebGL rendering with GPU-accelerated CSS radial & linear grid layers,
 * completely eliminating CPU/GPU rendering overhead and lag.
 */
export const AmbientCanvas: React.FC<AmbientCanvasProps> = ({ className = '' }) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* Subtle Spatial Dot Grid Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(#18181b_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.045]" />
      
      {/* Soft atmospheric gradient sheen */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-100/30 to-transparent pointer-events-none" />
    </div>
  );
};
