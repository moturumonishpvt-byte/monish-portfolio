import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolioContent } from '../../context/PortfolioContentContext';
import { Sparkles, CheckCircle2, ArrowRight, ChevronRight, ChevronLeft, Layers } from 'lucide-react';
import { motionTokens } from '../../utils/motionTokens';

export const JourneySection: React.FC = () => {
  const { content } = usePortfolioContent();
  const { journeyMilestones } = content;
  const [selectedMilestone, setSelectedMilestone] = useState<number>(0);

  const safeIndex = Math.min(selectedMilestone, journeyMilestones.length - 1);
  const current = journeyMilestones[safeIndex] || journeyMilestones[0];

  const handleNext = () => {
    if (selectedMilestone < journeyMilestones.length - 1) {
      setSelectedMilestone((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (selectedMilestone > 0) {
      setSelectedMilestone((prev) => prev - 1);
    }
  };

  return (
    <section id="journey" className="py-24 sm:py-32 border-b border-gray-150 relative">
      <div className="space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest bg-neutral-100 px-3.5 py-1.5 rounded-full border border-neutral-200/80">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              CHAPTER 03 • MY JOURNEY
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-neutral-900 leading-tight">
              FROM FIRST PRINCIPLES TO AUTONOMOUS EDGE AI.
            </h2>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-neutral-400 font-medium">
            [ WHERE DID I START & HOW DID I GET HERE? ]
          </div>
        </div>

        {/* Spatial Milestone Rail / Stepper */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={selectedMilestone === 0}
                className="w-8 h-8 rounded-full border border-neutral-200 bg-white hover:bg-neutral-900 hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-neutral-400 flex items-center justify-center transition-colors cursor-pointer"
                title="Previous Milestone"
                aria-label="Previous Milestone"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                disabled={selectedMilestone === journeyMilestones.length - 1}
                className="w-8 h-8 rounded-full border border-neutral-200 bg-white hover:bg-neutral-900 hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-neutral-400 flex items-center justify-center transition-colors cursor-pointer"
                title="Next Milestone"
                aria-label="Next Milestone"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {journeyMilestones.map((milestone, idx) => {
              const isSelected = selectedMilestone === idx;
              return (
                <button
                  key={milestone.year}
                  onClick={() => setSelectedMilestone(idx)}
                  className={`p-4 sm:p-5 rounded-3xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-md scale-[1.02]'
                      : 'bg-white text-neutral-700 border-gray-200 hover:border-neutral-400 hover:bg-neutral-50/80 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-mono text-xs font-bold uppercase tracking-wider ${
                        isSelected ? 'text-neutral-300' : 'text-neutral-400'
                      }`}
                    >
                      {milestone.phase}
                    </span>
                    {milestone.year === 'PRESENT' ? (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    ) : null}
                  </div>
                  <div className="text-xl sm:text-2xl font-black tracking-tight font-sans">
                    {milestone.year}
                  </div>
                  <div
                    className={`text-xs mt-1 font-medium truncate ${
                      isSelected ? 'text-neutral-300' : 'text-neutral-500'
                    }`}
                  >
                    {milestone.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Milestone Spatial Deep-Dive Stage */}
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={selectedMilestone}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: motionTokens.ease.cinema }}
              className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Milestone Narrative */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs font-extrabold bg-neutral-900 text-white px-3 py-1 rounded-full uppercase tracking-wider">
                      {current.phase}
                    </span>
                    <span className="font-mono text-xs font-bold text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">
                      {current.highlightTag}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black font-sans text-neutral-900 tracking-tight">
                    {current.title}
                  </h3>

                  <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-normal">
                    {current.summary}
                  </p>

                  {/* Technologies Leveraged */}
                  {current.technologies && (
                    <div className="pt-2 space-y-2.5">
                      <span className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-widest block">
                        Technologies & Tools Leveraged
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {current.technologies?.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-xs font-semibold bg-neutral-50 text-neutral-800 border border-neutral-200 px-3 py-1 rounded-lg"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Reflection & Mindset Evolution */}
                <div className="lg:col-span-4 bg-neutral-50 border border-gray-200 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xs">
                  <div className="space-y-2">
                    <span className="font-mono text-xs font-bold tracking-widest text-neutral-500 uppercase flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-neutral-900" />
                      What I Learned
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
                      {current.learned}
                    </p>
                  </div>

                  <div className="h-px bg-gray-200" />

                  <div className="space-y-2">
                    <span className="font-mono text-xs font-bold tracking-widest text-neutral-500 uppercase flex items-center gap-1.5">
                      <Sparkles size={14} className="text-neutral-900" />
                      How My Thinking Changed
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic font-serif">
                      "{current.changed}"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
