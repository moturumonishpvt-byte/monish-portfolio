"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { ChevronRight } from "lucide-react";
import { Project } from "../types";

export interface RoundCarouselItem {
  src: string;
  project?: Project;
  title?: string;
  category?: string;
  badge?: string;
  stats?: string;
}

export interface RoundCarouselProps {
  items?: RoundCarouselItem[];
  images?: { src: string }[];
  imageWidth?: number;
  imageHeight?: number;
  spacing?: number;
  speed?: number;
  direction?: "right" | "left";
  drag?: boolean;
  sensitivity?: number;
  tilt?: number;
  perspective?: number;
  cornerRadius?: number;
  innerDim?: number;
  background?: string;
  style?: React.CSSProperties;
  onSelectProject?: (project: Project) => void;
  onActiveIndexChange?: (index: number) => void;
}

export const DEFAULT_CAROUSEL_IMAGES = [
  { src: "/editable.jpeg" },
  { src: "/editable.jpeg" },
  { src: "/editable.jpeg" },
  { src: "/editable.jpeg" },
  { src: "/editable.jpeg" },
  { src: "/editable.jpeg" },
  { src: "/editable.jpeg" },
];

export default function RoundCarousel({
  items,
  images,
  imageWidth = 290,
  imageHeight = 390,
  spacing = 3,
  speed = 7,
  direction = "right",
  drag = true,
  sensitivity = 5,
  tilt = -7,
  perspective = 3000,
  cornerRadius = 22,
  innerDim = 3.5,
  background = "transparent",
  style = {},
  onSelectProject,
  onActiveIndexChange,
}: RoundCarouselProps) {
  const carouselItems: RoundCarouselItem[] = useMemo(() => {
    if (items && items.length > 0) return items;
    if (images && images.length > 0) return images;
    return DEFAULT_CAROUSEL_IMAGES;
  }, [items, images]);

  const count = carouselItems.length;

  const ringRef    = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef     = useRef(0);
  const rotYRef    = useRef(0);
  const velRef     = useRef(0);
  const lastRef    = useRef(0);

  // Drag state — using a plain object ref so we never trigger re-renders
  const drag$ = useRef({
    active:     false,
    startX:     0,
    lastX:      0,
    totalDelta: 0,
    // DOM element that received pointerdown, so we can resolve which card it was
    downTarget: null as HTMLElement | null,
  });

  const angle     = 360 / count;
  const factor    = 1 + spacing * 0.15;
  const radius    = (imageWidth * factor) / (2 * Math.tan(Math.PI / count));
  const radiusPx  = cornerRadius;
  const degPerSec = speed * 6 * (direction === "left" ? -1 : 1);

  // ── Animation loop ──────────────────────────────────────────────
  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const apply = () => {
      ring.style.transform = `translateZ(${-radius}px) rotateY(${rotYRef.current}deg)`;
    };
    apply();

    let lastActiveIdx = -1;

    const draw = (now: number) => {
      const dt = lastRef.current ? (now - lastRef.current) / 1000 : 0;
      lastRef.current = now;
      const f = Math.min(dt, 0.1);
      if (!drag$.current.active) {
        if (Math.abs(velRef.current) > 0.01) {
          rotYRef.current += velRef.current * f;
          velRef.current  *= 0.94;
        } else {
          rotYRef.current += degPerSec * f;
        }
      }
      apply();

      if (onActiveIndexChange) {
        const norm = ((-rotYRef.current % 360) + 360) % 360;
        const idx  = Math.round(norm / angle) % count;
        if (idx !== lastActiveIdx) {
          lastActiveIdx = idx;
          onActiveIndexChange(idx);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [radius, degPerSec, count, angle, onActiveIndexChange]);

  // ── Keep layout values in a ref so closures always see fresh values ──
  const layoutRef = useRef({ count, angle, radius });
  useEffect(() => { layoutRef.current = { count, angle, radius }; }, [count, angle, radius]);

  // ── Pointer handlers — NO setPointerCapture ──────────────────────
  // Drag uses global window listeners so it works even when cursor
  // leaves the container. Click detection uses geometry (not DOM hit-
  // testing) because CSS 3D cards overlap unpredictably in 2D space.
  useEffect(() => {
    if (!drag) return;

    const onWindowMove = (e: PointerEvent) => {
      if (!drag$.current.active) return;
      const dx = e.clientX - drag$.current.lastX;
      drag$.current.lastX       = e.clientX;
      drag$.current.totalDelta += Math.abs(dx);
      const k = 0.3 * sensitivity;
      rotYRef.current += dx * k;
      velRef.current   = dx * k * 60;
    };

    const onWindowUp = (_e: PointerEvent) => {
      if (!drag$.current.active) return;

      const wasDrag = drag$.current.totalDelta > 8;
      drag$.current.active = false;

      if (!wasDrag && onSelectProject && containerRef.current) {
        // ── Geometric card detection ───────────────────────────────
        // Project each front-facing card's 3D center to screen-space X,
        // then open whichever is closest to where the user tapped.
        const { count: n, angle: a, radius: r } = layoutRef.current;
        const rect            = containerRef.current.getBoundingClientRect();
        const containerCenterX = rect.left + rect.width / 2;
        const clickOffsetX    = drag$.current.startX - containerCenterX;

        let bestIdx  = 0;
        let bestDist = Infinity;

        for (let i = 0; i < n; i++) {
          // World angle of card i given current ring rotation
          const worldDeg = ((i * a + rotYRef.current) % 360 + 360) % 360;
          const worldRad = worldDeg * (Math.PI / 180);
          const cosA     = Math.cos(worldRad);

          // Skip back-facing cards (cos < 0 → facing away from camera)
          if (cosA < 0) continue;

          // Screen-space X offset: positive rotateY moves card leftward
          const screenX = -r * Math.sin(worldRad);
          const dist    = Math.abs(clickOffsetX - screenX);

          if (dist < bestDist) { bestDist = dist; bestIdx = i; }
        }

        const item = carouselItems[bestIdx];
        if (item?.project) onSelectProject(item.project);
      }

      setTimeout(() => { drag$.current.totalDelta = 0; }, 0);
      window.removeEventListener("pointermove",   onWindowMove);
      window.removeEventListener("pointerup",     onWindowUp);
      window.removeEventListener("pointercancel", onWindowUp);
    };

    const onContainerDown = (e: PointerEvent) => {
      drag$.current = {
        active: true, startX: e.clientX, lastX: e.clientX,
        totalDelta: 0, downTarget: e.target as HTMLElement,
      };
      velRef.current = 0;
      window.addEventListener("pointermove",   onWindowMove);
      window.addEventListener("pointerup",     onWindowUp);
      window.addEventListener("pointercancel", onWindowUp);
    };

    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("pointerdown", onContainerDown);
    return () => {
      el.removeEventListener("pointerdown", onContainerDown);
      window.removeEventListener("pointermove",   onWindowMove);
      window.removeEventListener("pointerup",     onWindowUp);
      window.removeEventListener("pointercancel", onWindowUp);
    };
  }, [drag, sensitivity, carouselItems, onSelectProject]);

  // ── Styles ──────────────────────────────────────────────────────
  const faceBase: React.CSSProperties = {
    position:            "absolute",
    inset:               0,
    borderRadius:        radiusPx,
    overflow:            "hidden",
    backfaceVisibility:  "hidden",
    backgroundSize:      "cover",
    backgroundPosition:  "center",
    // back-faces must never intercept pointer events
    pointerEvents:       "none",
  };

  return (
    <div
      ref={containerRef}
      style={{
        ...style,
        width:           "100%",
        height:          "100%",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        overflow:        "hidden",
        background,
        perspective:     `${perspective}px`,
        cursor:          drag ? "grab" : "default",
        touchAction:     "none",
        userSelect:      "none",
      }}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          transform:      `rotateX(${tilt}deg)`,
        }}
      >
        <div
          ref={ringRef}
          style={{
            position:       "relative",
            width:          imageWidth,
            height:         imageHeight,
            transformStyle: "preserve-3d",
          }}
        >
          {carouselItems.map((item, i) => {
            const src = item?.src || "/editable.jpeg";
            return (
              <div
                key={i}
                // ↓ This attribute lets resolveCardIndex() find which card was tapped
                data-card-index={i}
                role="button"
                tabIndex={0}
                aria-label={item.title || `Project Card ${i + 1}`}
                style={{
                  position:       "absolute",
                  inset:          0,
                  transform:      `rotateY(${i * angle}deg) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                  cursor:         item.project ? "pointer" : "inherit",
                }}
                className="group select-none"
              >
                {/*
                  Inner container: handles hover scale/elevation.
                  Must NOT intercept pointer events (handled on outer card div).
                */}
                <div
                  className="w-full h-full relative transition-all duration-200 ease-out group-hover:scale-[1.04] group-hover:-translate-y-1.5 group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.35)]"
                  style={{
                    transformStyle: "preserve-3d",
                    borderRadius:   radiusPx,
                    pointerEvents:  "none",  // ← let the parent card div own all events
                  }}
                >
                  {/* FRONT FACE */}
                  <div
                    style={{
                      ...faceBase,
                      backgroundColor: "#0d0d11",
                      backgroundImage: `url(${src})`,
                      boxShadow:       "0 15px 35px rgba(0,0,0,0.25)",
                    }}
                    className="border border-white/20 relative flex flex-col justify-between p-5 transition-colors duration-200 group-hover:border-white/50"
                  >
                    {/* Dark gradient scrim overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/25 pointer-events-none" />

                    {/* Top Header Badge */}
                    <div className="relative z-10 flex items-center justify-between w-full">
                      <span className="font-mono text-[9px] font-bold uppercase px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-neutral-900 shadow-sm tracking-wider">
                        {item.badge || `PROJECT ${(i + 1).toString().padStart(2, "0")}`}
                      </span>
                      <span className="font-mono text-[10px] text-white/90 font-bold bg-black/40 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                        #{(i + 1).toString().padStart(2, "0")}
                      </span>
                    </div>

                    {/* Bottom Project Details */}
                    <div className="relative z-10 space-y-2">
                      {item.category && (
                        <div className="text-[9px] font-mono font-bold uppercase text-neutral-300 tracking-wider truncate">
                          {item.category}
                        </div>
                      )}

                      <h3 className="font-sans font-black text-sm sm:text-base text-white leading-snug line-clamp-2 drop-shadow-md">
                        {item.title || "Engineering Architecture"}
                      </h3>

                      {item.stats && (
                        <div className="flex items-center justify-between pt-2 border-t border-white/20 text-[10px] font-mono text-neutral-200">
                          <span className="text-white font-bold">{item.stats}</span>
                          {item.project && (
                            <span className="text-white font-bold inline-flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                              Case Study <ChevronRight size={12} />
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div
                    style={{
                      ...faceBase,
                      transform:       "rotateY(180deg)",
                      backgroundColor: "#181818",
                      backgroundImage: `url(${src})`,
                      filter:          `brightness(${innerDim / 10})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center font-serif font-black text-white text-sm shadow-md">
                        MM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
