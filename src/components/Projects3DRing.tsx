import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, ArrowUpRight, Sparkles, Layers, Orbit } from 'lucide-react';
import { Project } from '../types';
import { usePortfolioContent } from '../context/PortfolioContentContext';

interface Projects3DRingProps {
  projects?: Project[];
  setSelectedProject: (project: Project) => void;
}

// Custom cover art graphic generator per project theme with clean, high-contrast monochrome aesthetic
const ProjectGraphic: React.FC<{ id: string; title: string }> = ({ id, title }) => {
  if (id.includes('academic') || id.includes('monitor')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 flex items-center justify-center p-2 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:8px_8px]" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-0.5">
          <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-md">
            <Sparkles size={14} />
          </div>
          <span className="text-[9px] font-mono tracking-wider text-neutral-300 uppercase font-semibold">
            BLE • Face ID • TFLite
          </span>
        </div>
      </div>
    );
  }

  if (id.includes('aequitas') || id.includes('bias')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 flex items-center justify-center p-2 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:8px_8px]" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-0.5">
          <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-md">
            <span className="font-mono font-bold text-[10px]">AI</span>
          </div>
          <span className="text-[9px] font-mono tracking-wider text-neutral-300 uppercase font-semibold">
            Gemma • Bias Audit
          </span>
        </div>
      </div>
    );
  }

  if (id.includes('phish') || id.includes('guard')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 flex items-center justify-center p-2 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:8px_8px]" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-0.5">
          <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-md">
            <span className="font-mono text-[10px] font-bold">88F</span>
          </div>
          <span className="text-[9px] font-mono tracking-wider text-neutral-300 uppercase font-semibold">
            MV3 Extension • FastAPI
          </span>
        </div>
      </div>
    );
  }

  if (id.includes('skill') || id.includes('connect')) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 flex items-center justify-center p-2 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:8px_8px]" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-0.5">
          <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-md">
            <span className="font-mono text-[10px] font-bold">HUB</span>
          </div>
          <span className="text-[9px] font-mono tracking-wider text-neutral-300 uppercase font-semibold">
            22 Routes • WebSockets
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 flex items-center justify-center p-2 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:8px_8px]" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-0.5">
        <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-md">
          <Sparkles size={14} />
        </div>
        <span className="text-[9px] font-mono tracking-wider text-neutral-300 uppercase font-semibold">
          {title.slice(0, 16)}
        </span>
      </div>
    </div>
  );
};

export const Projects3DRing: React.FC<Projects3DRingProps> = ({
  projects: propProjects,
  setSelectedProject,
}) => {
  const { content } = usePortfolioContent();
  const projects = propProjects || content.projects;

  const [currentAngle, setCurrentAngle] = useState(0);
  const [isAreaHovered, setIsAreaHovered] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  // View Mode: 'orbit' for 3D orbital canvas, 'grid' for clean card deck
  const [viewMode, setViewMode] = useState<'orbit' | 'grid'>('orbit');

  // Drag interaction states for desktop mouse
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const angleOnDragStart = useRef(0);

  // Orbital instances array (at least 12 instances for dense 360deg ring)
  const MIN_ORBITAL_INSTANCES = 12;
  const orbitalProjects = React.useMemo(() => {
    if (!projects || projects.length === 0) return [];
    let items = [...projects];
    while (items.length < MIN_ORBITAL_INSTANCES) {
      items = [...items, ...projects];
    }
    return items;
  }, [projects]);

  const numCards = orbitalProjects.length;

  const DESIGN_WIDTH = 1600;
  const DESIGN_HEIGHT = 900;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [sceneScale, setSceneScale] = useState(0.8);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const updateScale = (w: number, h: number) => {
      if (w <= 0 || h <= 0) return;
      const s = Math.min(w / DESIGN_WIDTH, h / DESIGN_HEIGHT);
      setSceneScale(Math.max(0.35, Math.min(1.15, s)));
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        updateScale(entry.contentRect.width, entry.contentRect.height);
      }
    });

    resizeObserver.observe(wrapperRef.current);
    updateScale(wrapperRef.current.clientWidth, wrapperRef.current.clientHeight);

    return () => resizeObserver.disconnect();
  }, []);

  const radiusX = 625;
  const radiusY = 275;

  const animFrameId = useRef<number | null>(null);
  const currentSpeedRef = useRef(0.16);

  useEffect(() => {
    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      let targetSpeed = 0.16;
      if (hoveredCardIndex !== null || isDragging) {
        targetSpeed = 0;
      } else if (isAreaHovered) {
        targetSpeed = 0.05;
      }

      currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * 0.08;

      if (Math.abs(currentSpeedRef.current) > 0.0008) {
        setCurrentAngle((prev) => (prev + currentSpeedRef.current) % 360);
      }

      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isAreaHovered, hoveredCardIndex, isDragging]);

  const handlePointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) return;

    setIsDragging(true);
    dragStartX.current = e.clientX;
    angleOnDragStart.current = currentAngle;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    const sensitivity = 0.22;
    setCurrentAngle(angleOnDragStart.current + deltaX * sensitivity);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <section
      id="projects"
      ref={wrapperRef}
      className="relative w-full py-16 sm:py-24 bg-[#faf9f6] text-neutral-900 overflow-hidden select-none border-t border-b border-neutral-200/60"
    >
      {/* Background warm ivory grid backdrop */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#e2e0d8_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

      {/* Section Header & View Toggle */}
      <div className="px-6 sm:px-10 md:px-16 max-w-7xl mx-auto mb-8 relative z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest bg-white px-3.5 py-1.5 rounded-full border border-neutral-200 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-black"></span>
            CHAPTER 05 • FEATURED SYSTEMS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-neutral-900 leading-tight">
            WHAT DID I BUILD?
          </h2>
        </div>

        {/* View Mode Toggle Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-white border border-neutral-200 p-1 rounded-full shadow-xs">
          <button
            onClick={() => setViewMode('orbit')}
            className={`hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
              viewMode === 'orbit'
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-600 hover:text-neutral-950'
            }`}
          >
            <Orbit size={13} /> 3D Orbit
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-600 hover:text-neutral-950'
            }`}
          >
            <Layers size={13} /> Grid Deck
          </button>
        </div>
      </div>

      {/* VIEW 1: DESKTOP 3D ORBITAL RING */}
      <div
        data-cursor="drag"
        className={`${
          viewMode === 'orbit' ? 'hidden md:flex' : 'hidden'
        } relative w-full h-[620px] lg:h-[720px] items-center justify-center`}
        onMouseEnter={() => setIsAreaHovered(true)}
        onMouseLeave={() => {
          setIsAreaHovered(false);
          setHoveredCardIndex(null);
          setIsDragging(false);
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Uniformly Scaled 1600x900 Design Canvas */}
        <div
          className="relative flex items-center justify-center shrink-0 my-auto transition-transform duration-100 ease-out"
          style={{
            width: DESIGN_WIDTH,
            height: DESIGN_HEIGHT,
            transform: `scale(${sceneScale})`,
            transformOrigin: 'center center',
            perspective: '1200px',
          }}
        >
          {/* Center Focal Anchor */}
          <div className="absolute top-[450px] left-[800px] -translate-x-1/2 -translate-y-1/2 z-0 text-center pointer-events-none">
            <h3 className="text-[54px] font-black tracking-tight text-neutral-900 font-sans leading-none">
              PROJECTS
            </h3>
            <p className="text-[14px] font-sans font-medium text-neutral-500 tracking-wide mt-2">
              Hover card to explore • Click to inspect architecture
            </p>
            <div className="flex items-center justify-center gap-2 mt-3 opacity-40">
              <div className="w-8 h-[1px] bg-neutral-400" />
              <div className="w-1.5 h-1.5 rotate-45 border border-neutral-600" />
              <div className="w-8 h-[1px] bg-neutral-400" />
            </div>
          </div>

          {/* 3D Orbit Scene */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {orbitalProjects.map((proj, idx) => {
              const cardAngle = (currentAngle + (idx * 360) / numCards) % 360;
              const rad = (cardAngle * Math.PI) / 180;

              const x = Math.cos(rad) * radiusX;
              const y = Math.sin(rad) * radiusY;

              const normX = Math.cos(rad);
              const normZ = Math.sin(rad);

              const rotateY = -normX * 62;
              const rotateZ = normX * normZ * 3;
              const rotateX = -normZ * 4;
              const z = normZ * 70;

              const baseScale = 0.87 + (normZ + 1) * 0.075;
              const isHovered = hoveredCardIndex === idx;
              const isAnyHovered = hoveredCardIndex !== null;

              const finalScale = isHovered
                ? baseScale * 1.08
                : isAnyHovered
                ? baseScale * 0.94
                : baseScale;
              const finalZ = isHovered ? z + 70 : z;
              const opacity = isHovered
                ? 1
                : isAnyHovered
                ? 0.35
                : 0.72 + (normZ + 1) * 0.14;
              const depthBlur =
                !isHovered && isAnyHovered
                  ? 1.0
                  : !isHovered && normZ < -0.85
                  ? Math.abs(normZ + 0.85) * 0.6
                  : 0;
              const zIndex = isHovered ? 9999 : Math.round((normZ + 1) * 100);

              return (
                <div
                  key={`${proj.id}-inst-${idx}`}
                  className="absolute transition-all duration-300 ease-out cursor-pointer"
                  style={{
                    transform: `translate3d(${x.toFixed(1)}px, ${y.toFixed(
                      1
                    )}px, ${finalZ.toFixed(1)}px) rotateX(${rotateX.toFixed(
                      1
                    )}deg) rotateY(${rotateY.toFixed(
                      1
                    )}deg) rotateZ(${rotateZ.toFixed(1)}deg) scale(${finalScale.toFixed(
                      3
                    )})`,
                    zIndex,
                    opacity,
                    filter: depthBlur > 0 ? `blur(${depthBlur.toFixed(1)}px)` : 'none',
                    willChange: 'transform, opacity',
                  }}
                  onMouseEnter={() => setHoveredCardIndex(idx)}
                  onMouseLeave={() => setHoveredCardIndex(null)}
                  onClick={() => setSelectedProject(proj)}
                >
                  <div
                    className={`w-[160px] h-[230px] bg-white border rounded-2xl p-3 flex flex-col justify-between shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 relative overflow-hidden group ${
                      isHovered
                        ? 'border-neutral-900 shadow-[0_20px_40px_rgba(0,0,0,0.16)] ring-1 ring-neutral-900/40'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="w-full h-[76px] rounded-xl overflow-hidden border border-neutral-200 relative bg-neutral-100 shrink-0">
                      {proj.imageUrl ? (
                        <img
                          src={proj.imageUrl}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <ProjectGraphic id={proj.id} title={proj.title} />
                      )}
                      <div className="absolute top-1 right-1 w-4 h-4 rounded bg-white/90 backdrop-blur-md border border-neutral-200/80 flex items-center justify-center text-neutral-600 group-hover:text-neutral-900 transition-colors shadow-sm">
                        <ArrowUpRight size={10} />
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between pt-1.5 pb-0.5 space-y-0.5">
                      <div>
                        <h4 className="text-xs font-bold font-sans text-neutral-900 tracking-tight leading-snug line-clamp-1 group-hover:text-neutral-950 transition-colors">
                          {proj.title}
                        </h4>
                        <div className="mt-0.5 space-y-0.5">
                          <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-wider block font-semibold">
                            Tech Stack:
                          </span>
                          <div className="flex flex-wrap gap-0.5">
                            {proj.techStack.slice(0, 3).map((tech, i) => (
                              <span
                                key={i}
                                className="text-[8px] font-mono text-neutral-700 bg-neutral-100 border border-neutral-200 px-1 py-0.2 rounded"
                              >
                                {tech}
                              </span>
                            ))}
                            {proj.techStack.length > 3 && (
                              <span className="text-[8px] font-mono text-neutral-500 bg-neutral-100 px-0.5 py-0.2 rounded">
                                +{proj.techStack.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-0.5 pt-0.5 border-t border-neutral-100">
                        <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-wider block font-semibold">
                          Challenge Solved:
                        </span>
                        <p className="text-[9.5px] text-neutral-600 font-sans leading-tight line-clamp-2 font-normal">
                          {proj.challengeSolved || proj.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="pt-1 border-t border-neutral-100 flex items-center justify-between shrink-0">
                      <a
                        href={proj.githubUrl || 'https://github.com/moturumonishpvt-byte'}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-0.5 text-[9px] text-neutral-600 hover:text-neutral-950 transition-colors group/link py-0.5 px-1 rounded hover:bg-neutral-100"
                      >
                        <Github
                          size={11}
                          className="group-hover/link:scale-110 transition-transform"
                        />
                        <span className="font-mono font-medium">GitHub</span>
                      </a>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(proj);
                        }}
                        className="flex items-center gap-0.5 text-[9px] text-neutral-900 hover:text-black font-mono font-bold transition-colors group/link py-0.5 px-1 rounded hover:bg-neutral-100 cursor-pointer"
                      >
                        <span>Case Study</span>
                        <ArrowUpRight
                          size={9}
                          className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* VIEW 2: TOUCH & MOBILE RESPONSIVE CARD DECK */}
      <div
        className={`${
          viewMode === 'grid' ? 'block' : 'block md:hidden'
        } px-6 sm:px-10 md:px-16 max-w-7xl mx-auto relative z-10`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              onClick={() => setSelectedProject(proj)}
              className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-neutral-900 transition-all duration-300 shadow-xs cursor-pointer group"
            >
              <div className="space-y-4">
                {/* Visual Header */}
                <div className="w-full h-48 rounded-2xl overflow-hidden border border-gray-150 relative bg-neutral-100">
                  {proj.imageUrl ? (
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <ProjectGraphic id={proj.id} title={proj.title} />
                  )}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono font-bold text-neutral-800 border border-neutral-200 shadow-xs flex items-center gap-1">
                    <span>Inspect System</span>
                    <ArrowUpRight size={12} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-neutral-400">
                      {proj.period}
                    </span>
                    {proj.featured && (
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-neutral-900 text-white px-2 py-0.5 rounded">
                        Featured System
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-sans text-neutral-900 tracking-tight">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed font-normal">
                    {proj.shortDescription}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-bold">
                    Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs font-semibold bg-neutral-100 text-neutral-800 px-2.5 py-0.5 rounded-md border border-neutral-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-4 border-t border-gray-100 flex items-center justify-between">
                <a
                  href={proj.githubUrl || 'https://github.com/moturumonishpvt-byte'}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-600 hover:text-black py-1.5 px-2.5 rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  <Github size={14} /> Source
                </a>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(proj);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider bg-neutral-900 hover:bg-neutral-800 text-white py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
                >
                  Read Architecture <ArrowUpRight size={13} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
