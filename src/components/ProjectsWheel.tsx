import React, { useState, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { Project } from '../types';
import { usePortfolioContent } from '../context/PortfolioContentContext';
import RoundCarousel, { RoundCarouselItem } from './RoundCarousel';

interface ProjectsWheelProps {
  projects?: Project[];
  setSelectedProject: (project: Project) => void;
}

export const ProjectsWheel: React.FC<ProjectsWheelProps> = ({
  projects: propProjects,
  setSelectedProject,
}) => {
  const { content } = usePortfolioContent();
  const rawProjects = propProjects || content.projects || [];
  const [activeIdx, setActiveIdx] = useState(0);

  // Exactly 7 project cards mapped with /editable.jpeg background
  const carouselItems: RoundCarouselItem[] = useMemo(() => {
    // Curated metadata matching user prompt order and definitions
    const curatedMeta = [
      {
        badge: 'React Native • BLE',
        category: 'EDGE AI • BIOMETRICS',
        stats: '3 Connected Apps',
      },
      {
        badge: 'FastAPI • Random Forest',
        category: 'SECURITY INTELLIGENCE',
        stats: 'Sub-15ms ML Risk Score',
      },
      {
        badge: 'React • Supabase',
        category: 'COLLABORATIVE PLATFORM',
        stats: '22 Routes • 8 RLS Policies',
      },
      {
        badge: 'Python • Flask',
        category: 'AI FAIRNESS & AUDITING',
        stats: '<7% Parity Variance',
      },
      {
        badge: 'Python • Graph Algorithms',
        category: 'WORKFLOW ENGINEERING',
        stats: 'Zero Cycle Violations',
      },
      {
        badge: 'Python • Local AI',
        category: 'LOCAL-FIRST AI',
        stats: 'Modular Agent Architecture',
      },
      {
        badge: 'React • Vite',
        category: 'GAMIFIED PRODUCTIVITY',
        stats: 'XP & Level Progression',
      },
    ];

    // Take exactly the first 7 projects from data
    return rawProjects.slice(0, 7).map((proj, i) => {
      const meta = curatedMeta[i] || {
        badge: proj.techStack?.[0] ? `${proj.techStack[0]} • ML` : 'React • TypeScript',
        category: 'ENGINEERING ARCHITECTURE',
        stats: 'Production Deployed',
      };

      return {
        src: '/editable.jpeg',
        project: proj,
        title: proj.title,
        category: meta.category,
        badge: meta.badge,
        stats: meta.stats,
      };
    });
  }, [rawProjects]);

  const activeItem = carouselItems[activeIdx] || carouselItems[0];

  return (
    <section
      id="projects"
      className="relative w-full min-h-[820px] h-[92vh] max-h-[1020px] bg-white text-neutral-900 overflow-hidden select-none flex flex-col justify-between py-8 border-t border-b border-gray-200"
    >
      {/* Subtle depth sky backdrop */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 25%, rgba(240, 240, 245, 0.6) 0%, rgba(255, 255, 255, 0.95) 70%),
            radial-gradient(circle at 15% 40%, rgba(245, 245, 250, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 85% 40%, rgba(245, 245, 250, 0.4) 0%, transparent 50%)
          `,
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:32px_32px] opacity-40 z-0" />

      {/* SECTION HEADER */}
      <div className="relative z-30 px-6 sm:px-12 max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-auto">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest bg-neutral-100 px-3.5 py-1.5 rounded-full border border-neutral-200/80 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-black"></span>
            CHAPTER 05 • FEATURED SYSTEMS
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-sans tracking-tight text-neutral-900 leading-tight">
            WHAT DID I BUILD?
          </h2>

        </div>

        {/* Live Active Spotlight Card Badge */}
        {activeItem && (
          <div className="flex items-center gap-3 bg-white border border-gray-200 px-4 py-2 rounded-2xl shadow-md">
            <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-serif text-sm font-bold shadow-xs">
              {activeItem.title ? activeItem.title.slice(0, 2).toUpperCase() : 'MM'}
            </div>
            <div className="text-left">
              <div className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider">
                {activeItem.category}
              </div>
              <div className="text-xs font-bold text-neutral-900 truncate max-w-[200px]">
                {activeItem.title}
              </div>
            </div>
            {activeItem.project && (
              <button
                onClick={() => setSelectedProject(activeItem.project!)}
                className="ml-2 px-3 py-1 bg-neutral-900 hover:bg-black text-white rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1 shadow-sm"
                title="Open Case Study"
              >
                Case Study <ChevronRight size={13} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* ORIGINKIT ROUND CAROUSEL 3D STAGE - EXACTLY 7 CARDS */}
      <div className="relative w-full flex-1 flex items-center justify-center overflow-visible z-10">
        <RoundCarousel
          items={carouselItems}
          imageWidth={290}
          imageHeight={390}
          spacing={3}
          speed={2}
          direction="right"
          drag={true}
          sensitivity={5}
          tilt={-7}
          perspective={3000}
          cornerRadius={22}
          innerDim={3.5}
          background="transparent"
          onSelectProject={setSelectedProject}
          onActiveIndexChange={setActiveIdx}
        />
      </div>
    </section>
  );
};

export default ProjectsWheel;
