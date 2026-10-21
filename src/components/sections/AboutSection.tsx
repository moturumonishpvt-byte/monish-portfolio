import React, { useState } from 'react';
import { motion } from 'motion/react';
import { usePortfolioContent } from '../../context/PortfolioContentContext';
import { Compass, Lightbulb, ShieldCheck, ArrowRight, Sparkles, Terminal } from 'lucide-react';
import { motionTokens } from '../../utils/motionTokens';

export const AboutSection: React.FC = () => {
  const { content } = usePortfolioContent();
  const { aboutData } = content;
  const principleIcons = [Compass, ShieldCheck, Lightbulb];
  const [activeArea, setActiveArea] = useState<number | null>(null);

  return (
    <section id="about" className="py-24 sm:py-32 border-b border-gray-150 relative">
      <div className="space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest bg-neutral-100 px-3.5 py-1.5 rounded-full border border-neutral-200/80">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              CHAPTER 02 • ABOUT ME
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-neutral-900 leading-tight">
              ENGINEERING WITH INTENT & MECHANICAL SYMPATHY.
            </h2>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-neutral-400 font-medium">
            [ WHAT KIND OF BUILDER AM I? ]
          </div>
        </div>

        {/* Narrative & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Editorial Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: motionTokens.ease.cinema }}
            className="lg:col-span-7 space-y-6"
          >
            <p className="text-xl sm:text-2xl font-medium text-neutral-900 leading-relaxed font-sans">
              {aboutData.introduction}
            </p>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              {aboutData.mindset}
            </p>

            {/* Guiding Philosophy Callout */}
            <div className="p-6 sm:p-7 bg-neutral-50 border-l-3 border-black rounded-r-3xl space-y-2 shadow-xs">
              <span className="font-mono text-xs font-bold tracking-widest text-neutral-500 uppercase flex items-center gap-2">
                <Sparkles size={13} className="text-neutral-900" />
                Guiding Engineering Philosophy
              </span>
              <p className="text-base sm:text-lg font-semibold text-neutral-900 italic font-serif leading-relaxed">
                "{aboutData.philosophy}"
              </p>
            </div>
          </motion.div>

          {/* Active Research & Curiosity Node Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: motionTokens.ease.cinema }}
            className="lg:col-span-5 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <span className="font-mono text-xs font-bold tracking-widest text-neutral-900 uppercase flex items-center gap-2">
                <Terminal size={14} />
                Active Focus & Research
              </span>
              <span className="font-mono text-xs text-neutral-400">
                0{aboutData.curiosityAreas.length} AREAS
              </span>
            </div>

            <ul className="space-y-3">
              {aboutData.curiosityAreas.map((area, idx) => (
                <li
                  key={idx}
                  onMouseEnter={() => setActiveArea(idx)}
                  onMouseLeave={() => setActiveArea(null)}
                  className={`flex items-start gap-3 text-sm font-medium p-3 rounded-2xl border transition-all duration-200 cursor-default ${
                    activeArea === idx
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                      : 'bg-neutral-50/70 text-neutral-800 border-neutral-200/60 hover:bg-neutral-100'
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-bold mt-0.5 ${
                      activeArea === idx ? 'text-neutral-400' : 'text-neutral-400'
                    }`}
                  >
                    0{idx + 1}.
                  </span>
                  <span className="leading-snug">{area}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <a
                href="#journey"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-neutral-900 hover:text-neutral-600 transition-colors uppercase group cursor-pointer"
              >
                Trace the growth timeline{' '}
                <ArrowRight
                  size={13}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
            </div>
          </motion.div>
        </div>

        {/* 3 Core Principles */}
        <div className="space-y-6 pt-4">
          <div className="font-mono text-xs font-bold tracking-widest text-neutral-400 uppercase">
            CORE BUILDING PRINCIPLES
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aboutData.buildingPrinciples.map((principle, index) => {
              const Icon = principleIcons[index % principleIcons.length];
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: motionTokens.ease.cinema,
                  }}
                  className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-7 hover:border-neutral-900 transition-all duration-300 space-y-3 shadow-xs group"
                >
                  <div className="w-11 h-11 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900 border border-neutral-200 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold font-sans text-neutral-900 tracking-tight">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                    {principle.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
