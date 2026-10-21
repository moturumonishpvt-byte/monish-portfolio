import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolioContent } from '../../context/PortfolioContentContext';
import { Target, Lightbulb, Hammer, UserCheck, Award, Github, ArrowUpRight } from 'lucide-react';
import { motionTokens } from '../../utils/motionTokens';

export const HackathonsSection: React.FC = () => {
  const { content } = usePortfolioContent();
  const { hackathonsData } = content;
  const [activeHackathon, setActiveHackathon] = useState<string>(hackathonsData[0]?.id || '');

  const current = hackathonsData.find((h) => h.id === activeHackathon) || hackathonsData[0];

  return (
    <section id="hackathons" className="py-24 sm:py-32 border-b border-gray-150 relative">
      <div className="space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest bg-neutral-100 px-3.5 py-1.5 rounded-full border border-neutral-200/80">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              CHAPTER 06 • HACKATHONS & CHALLENGES
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-neutral-900 leading-tight">
              BUILDING UNDER CONSTRAINT & TIME PRESSURE.
            </h2>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-neutral-400 font-medium">
            [ WHERE DID I TEST MYSELF? ]
          </div>
        </div>

        {/* Hackathon Selector Pills */}
        <div className="flex flex-wrap gap-3">
          {hackathonsData.map((h) => {
            const isSelected = h.id === activeHackathon || (!activeHackathon && h === current);
            return (
              <button
                key={h.id}
                onClick={() => setActiveHackathon(h.id)}
                className={`p-4 sm:p-5 rounded-3xl border text-left transition-all duration-200 cursor-pointer flex-1 min-w-[260px] ${
                  isSelected
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-md scale-[1.01]'
                    : 'bg-white text-neutral-700 border-gray-200 hover:border-neutral-400 hover:bg-neutral-50 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span
                    className={`font-mono text-xs font-bold uppercase tracking-wider ${
                      isSelected ? 'text-neutral-300' : 'text-neutral-400'
                    }`}
                  >
                    {h.organization} • {h.date}
                  </span>
                  {h.rank && (
                    <span className="text-[10px] font-mono font-bold bg-white/15 text-white px-2 py-0.5 rounded border border-white/20">
                      {h.rank}
                    </span>
                  )}
                </div>
                <div className="text-base sm:text-lg font-bold tracking-tight font-sans">
                  {h.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Challenge Deep-Dive Structure: 5-Stage Narrative Grid */}
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: motionTokens.ease.cinema }}
              className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-wider">
                      {current.organization} • {current.date}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-neutral-300" />
                    <span className="font-mono text-xs font-bold text-neutral-900 bg-neutral-100 px-2.5 py-0.5 rounded-md border border-neutral-200">
                      {current.role}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black font-sans text-neutral-900 tracking-tight">
                    {current.name}
                  </h3>
                </div>

                {current.githubUrl && (
                  <a
                    href={current.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-800 px-4 py-2.5 rounded-xl transition-colors self-start sm:self-auto shadow-xs group"
                  >
                    <Github size={14} /> Repository{' '}
                    <ArrowUpRight
                      size={14}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </a>
                )}
              </div>

              {/* 5-Step Story Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 1. Problem */}
                <div className="bg-neutral-50 border border-neutral-200/90 rounded-2xl p-5 space-y-2">
                  <span className="font-mono text-xs font-bold text-neutral-900 uppercase tracking-widest flex items-center gap-1.5">
                    <Target size={14} /> 01 • THE PROBLEM
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">
                    {current.problem}
                  </p>
                </div>

                {/* 2. Idea */}
                <div className="bg-neutral-50 border border-neutral-200/90 rounded-2xl p-5 space-y-2">
                  <span className="font-mono text-xs font-bold text-neutral-900 uppercase tracking-widest flex items-center gap-1.5">
                    <Lightbulb size={14} /> 02 • THE CORE IDEA
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">
                    {current.idea}
                  </p>
                </div>

                {/* 3. Build */}
                <div className="bg-neutral-50 border border-neutral-200/90 rounded-2xl p-5 space-y-2">
                  <span className="font-mono text-xs font-bold text-neutral-900 uppercase tracking-widest flex items-center gap-1.5">
                    <Hammer size={14} /> 03 • THE RAPID BUILD
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">
                    {current.build}
                  </p>
                </div>

                {/* 4. Role & Ownership */}
                <div className="bg-neutral-50 border border-neutral-200/90 rounded-2xl p-5 space-y-2">
                  <span className="font-mono text-xs font-bold text-neutral-900 uppercase tracking-widest flex items-center gap-1.5">
                    <UserCheck size={14} /> 04 • MY ROLE & EXECUTION
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">
                    Led architectural schema, core integration logic, and presentation delivery under intense hackathon countdowns.
                  </p>
                </div>

                {/* 5. Result / Impact */}
                <div className="bg-neutral-900 text-white rounded-2xl p-5 space-y-2 md:col-span-2 lg:col-span-2 shadow-sm">
                  <span className="font-mono text-xs font-bold text-neutral-300 uppercase tracking-widest flex items-center gap-1.5">
                    <Award size={14} /> 05 • OUTCOME & VERIFIED IMPACT
                  </span>
                  <p className="text-sm sm:text-base text-white font-bold leading-relaxed">
                    {current.result}
                  </p>
                  <p className="text-xs text-neutral-400 italic mt-1 font-serif">
                    Takeaway: "{current.lessonsLearned}"
                  </p>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-wider mr-2">
                  Tech Deployed:
                </span>
                {current.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs font-semibold bg-neutral-100 text-neutral-800 px-3 py-1 rounded-md border border-neutral-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
