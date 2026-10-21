import React, { useEffect, useRef, useState } from 'react';

interface InteractiveImageRevealProps {
  aboveSrc?: string;
  belowSrc?: string;
  className?: string;
  belowOffsetX?: number; // e.g. -0.03 to shift slightly left
  belowOffsetY?: number; // e.g. +0.025 to shift slightly down
  belowScale?: number;   // e.g. 1.0 to match facial scale
  revealRadius?: number; // optional custom hover reveal radius
}

export default function InteractiveImageReveal({
  aboveSrc = '/above.png',
  belowSrc = '/below.png',
  className = 'w-full h-full relative overflow-hidden flex items-center justify-center',
  belowOffsetX = -0.035,
  belowOffsetY = 0.028,
  belowScale = 1.02,
  revealRadius,
}: InteractiveImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const TRAIL_LENGTH = 50;
    let headRadius = revealRadius ?? 75;

    let mouseActive = false;
    const mouse = { x: -1000, y: -1000 };
    const smooth = { x: -1000, y: -1000 };
    let trail: { x: number; y: number }[] = [];

    const belowImage = new Image();
    const aboveImage = new Image();
    let loadedCount = 0;
    let animId: number;

    // off1 for trail mask, off2 for masked belowImage
    const off1 = document.createElement('canvas');
    const off1c = off1.getContext('2d');
    const off2 = document.createElement('canvas');
    const off2c = off2.getContext('2d');

    function fitImage(img: HTMLImageElement, cw: number, ch: number, scale = 1.08): [number, number, number, number] {
      const imgW = img.naturalWidth || img.width;
      const imgH = img.naturalHeight || img.height;
      if (!imgW || !imgH) return [0, 0, cw, ch];
      const ir = imgW / imgH;
      const cr = cw / ch;
      let w: number, h: number, x: number, y: number;
      // Object contain with scale - bottom aligned for portrait
      if (ir > cr) {
        w = cw * scale;
        h = (cw / ir) * scale;
        x = (cw - w) / 2;
        y = ch - h;
      } else {
        h = ch * scale;
        w = (ch * ir) * scale;
        x = (cw - w) / 2;
        y = ch - h;
      }
      return [x, y, w, h];
    }

    function resize() {
      if (!container || !canvas || !off1 || !off2 || !off1c || !off2c) return;
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      if (w === 0 || h === 0) return;

      canvas.width = w * DPR;
      canvas.height = h * DPR;
      off1.width = w * DPR;
      off1.height = h * DPR;
      off2.width = w * DPR;
      off2.height = h * DPR;

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      off1c.setTransform(DPR, 0, 0, DPR, 0, 0);
      off2c.setTransform(DPR, 0, 0, DPR, 0, 0);

      headRadius = revealRadius ?? Math.max(60, Math.min(w, h) * 0.16);
    }

    resize();
    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    const handleMouseEnter = (e: MouseEvent) => {
      mouseActive = true;
      setIsHovered(true);
      const r = container.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      smooth.x = mouse.x;
      smooth.y = mouse.y;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseActive = true;
      setIsHovered(true);
      const r = container.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      if (smooth.x === -1000) {
        smooth.x = mouse.x;
        smooth.y = mouse.y;
      }
    };

    const handleMouseLeave = () => {
      mouseActive = false;
      setIsHovered(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseActive = true;
        setIsHovered(true);
        const r = container.getBoundingClientRect();
        const t = e.touches[0];
        mouse.x = t.clientX - r.left;
        mouse.y = t.clientY - r.top;
        if (smooth.x === -1000) {
          smooth.x = mouse.x;
          smooth.y = mouse.y;
        }
      }
    };

    const handleTouchEnd = () => {
      mouseActive = false;
      setIsHovered(false);
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);

    function draw() {
      if (!container || !canvas || !ctx || !off1c || !off2c) return;
      const w = container.offsetWidth;
      const h = container.offsetHeight;

      if (w > 0 && h > 0) {
        if (mouseActive) {
          smooth.x += (mouse.x - smooth.x) * 0.15;
          smooth.y += (mouse.y - smooth.y) * 0.15;
          trail.unshift({ x: smooth.x, y: smooth.y });
          if (trail.length > TRAIL_LENGTH) trail.length = TRAIL_LENGTH;
        } else {
          if (trail.length > 0) {
            trail.pop();
          }
        }

        const aboveRect = fitImage(aboveImage, w, h, 1.08);

        // Calculate belowRect preserving belowImage's intrinsic aspect ratio (no vertical/horizontal stretching!)
        let belowRect: [number, number, number, number] = [...aboveRect];
        const bwNat = belowImage.naturalWidth || belowImage.width;
        const bhNat = belowImage.naturalHeight || belowImage.height;
        if (bwNat && bhNat) {
          const belowAspect = bwNat / bhNat;
          const bw = aboveRect[2] * belowScale;
          const bh = bw / belowAspect;
          const bx = aboveRect[0] + (aboveRect[2] * belowOffsetX);
          const by = (aboveRect[1] + aboveRect[3]) - bh + (aboveRect[3] * belowOffsetY);
          belowRect = [bx, by, bw, bh];
        }

        // 1. Draw aboveImage as base on main canvas
        ctx.clearRect(0, 0, w, h);
        if (aboveImage.complete && (aboveImage.naturalWidth || aboveImage.width)) {
          ctx.globalCompositeOperation = 'source-over';
          ctx.drawImage(aboveImage, aboveRect[0], aboveRect[1], aboveRect[2], aboveRect[3]);
        }

        // 2. If hover trail exists and belowImage is loaded, punch hole in aboveImage and overlay clipped belowImage
        if (trail.length > 0 && off1 && off2 && belowImage.complete && (belowImage.naturalWidth || belowImage.width)) {
          // Build trail mask on off1
          off1c.clearRect(0, 0, w, h);
          off1c.globalCompositeOperation = 'source-over';
          for (let i = 0; i < trail.length; i++) {
            const t = 1 - i / trail.length;
            const r = headRadius * (0.2 + 0.8 * t);
            off1c.beginPath();
            off1c.arc(trail[i].x, trail[i].y, r, 0, Math.PI * 2);
            off1c.fillStyle = 'rgba(0,0,0,1)';
            off1c.fill();
          }

          // Build masked belowImage on off2 (belowImage drawn at belowRect, clipped to off1 mask)
          off2c.clearRect(0, 0, w, h);
          off2c.globalCompositeOperation = 'source-over';
          off2c.drawImage(belowImage, belowRect[0], belowRect[1], belowRect[2], belowRect[3]);
          off2c.globalCompositeOperation = 'destination-in';
          off2c.drawImage(off1, 0, 0, w, h);

          // Punch hole in main canvas (aboveImage) using off1 trail mask
          ctx.globalCompositeOperation = 'destination-out';
          ctx.drawImage(off1, 0, 0, w, h);

          // Draw masked belowImage (off2) onto main canvas
          ctx.globalCompositeOperation = 'source-over';
          ctx.drawImage(off2, 0, 0, w, h);

          // Glowing aura at cursor head
          if (mouseActive) {
            const head = trail[0];
            const glow = ctx.createRadialGradient(
              head.x, head.y, 0,
              head.x, head.y, headRadius * 1.3
            );
            glow.addColorStop(0, 'rgba(255, 235, 170, 0.35)');
            glow.addColorStop(0.5, 'rgba(244, 196, 48, 0.15)');
            glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.beginPath();
            ctx.arc(head.x, head.y, headRadius * 1.3, 0, Math.PI * 2);
            ctx.fillStyle = glow;
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }

    belowImage.src = belowSrc;
    aboveImage.src = aboveSrc;

    // Start animation loop immediately
    draw();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [aboveSrc, belowSrc, belowOffsetX, belowOffsetY, belowScale]);

  return (
    <div ref={containerRef} className={className}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair mix-blend-multiply"
      />
    </div>
  );
}


