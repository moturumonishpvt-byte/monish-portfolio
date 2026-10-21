import React from 'react';
import { motion } from 'motion/react';
import { usePortfolioContent } from '../../context/PortfolioContentContext';
import { Hammer, BookOpen, Compass, PenTool, Target, CheckCircle2, ArrowRight, Activity } from 'lucide-react';
import { motionTokens } from '../../utils/motionTokens';

export const CurrentlySection: React.FC = () => {
  const { content } = usePortfolioContent();
  const { currentlyStatus } = content;

  const categories = [
    {
      key: 'building',
      label: 'CURRENTLY BUILDING',
      icon: Hammer,
      data: currentlyStatus.building,
    },
    {
      key: 'learning',
      label: 'CURRENTLY LEARNING',
      icon: BookOpen,
      data: currentlyStatus.learning,
    },
    {
      key: 'exploring',
      label: 'CURRENTLY EXPLORING',
      icon: Compass,
      data: currentlyStatus.exploring,
    },
    {
      key: 'creating',
      label: 'CURRENTLY CREATING',
      icon: PenTool,
      data: currentlyStatus.creating,
    },
  ];

  return (
    <section id="currently" className="py-24 sm:py-32 border-b border-gray-150 relative">
      <div className="space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest bg-neutral-100 px-3.5 py-1.5 rounded-full border border-neutral-200/80">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              CHAPTER 10 • CURRENTLY & WHAT'S NEXT
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-neutral-900 leading-tight">
              ACTIVE RADAR & FUTURE TRAJECTORY.
            </h2>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-neutral-400 font-medium">
            [ WHAT AM I DOING NOW? ]
          </div>
        </div>

        {/* 4 Quadrants: Building, Learning, Exploring, Creating */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: motionTokens.ease.cinema,
                }}
                className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 hover:border-neutral-900 transition-all duration-300 shadow-xs flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-neutral-800 bg-neutral-100 px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 border border-neutral-200">
                      <Icon size={13} /> {item.label}
                    </span>
                    <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                      {item.data.tag}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-sans text-neutral-900 tracking-tight">
                    {item.data.title}
                  </h3>

                  <p className="text-sm text-neutral-600 leading-relaxed font-normal whitespace-pre-line">
                    {item.data.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-2 border-t border-gray-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs font-semibold text-neutral-500">
                    Active Development Sprint
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Immediate Goal & Opportunities Open To */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: motionTokens.ease.cinema }}
          className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-10 space-y-8 shadow-md"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-3">
              <span className="font-mono text-xs font-bold tracking-widest text-neutral-400 uppercase flex items-center gap-2">
                <Target size={14} className="text-white" />
                PRIMARY IMMEDIATE GOAL
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-white leading-snug">
                {currentlyStatus.currentGoal}
              </h3>
            </div>

            <div className="lg:col-span-6 bg-neutral-800/90 border border-neutral-700/80 rounded-2xl p-6 space-y-4 shadow-inner">
              <span className="font-mono text-xs font-bold tracking-widest text-neutral-300 uppercase block">
                Open To & Actively Considering:
              </span>
              <ul className="space-y-2.5">
                {currentlyStatus.openTo.map((role, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2.5 text-sm text-neutral-200 font-medium"
                  >
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs font-mono text-neutral-400">
              Ready to ship production code and autonomous AI systems.
            </span>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider bg-white hover:bg-neutral-200 text-neutral-950 px-5 py-2.5 rounded-full transition-colors self-start sm:self-auto shadow-xs group cursor-pointer"
            >
              Get In Touch{' '}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
