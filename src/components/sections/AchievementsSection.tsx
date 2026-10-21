import React from 'react';
import { motion } from 'motion/react';
import { usePortfolioContent } from '../../context/PortfolioContentContext';
import { Trophy, Award, Zap, Shield, Users, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motionTokens } from '../../utils/motionTokens';

export const AchievementsSection: React.FC = () => {
  const { content } = usePortfolioContent();
  const { achievementsData } = content;

  return (
    <section id="achievements" className="py-24 sm:py-32 border-b border-gray-150 relative">
      <div className="space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest bg-neutral-100 px-3.5 py-1.5 rounded-full border border-neutral-200/80">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              CHAPTER 08 • ACHIEVEMENTS
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-neutral-900 leading-tight">
              MEASURABLE OUTCOMES & VERIFIED RESULTS.
            </h2>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-neutral-400 font-medium">
            [ WHAT CAME FROM ALL OF THIS? ]
          </div>
        </div>

        {/* High-Contrast Swiss Number Metric Blocks */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-7 space-y-2 shadow-sm">
            <span className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-widest block">
              IIT Bombay NEC 2025
            </span>
            <div className="text-3xl sm:text-4xl font-black tracking-tight font-sans">
              Top 0.6%
            </div>
            <p className="text-xs text-neutral-400 font-normal">
              National Finalist out of 1,000+ contending teams
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-7 space-y-2 shadow-xs">
            <span className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-widest block">
              Academic Standing
            </span>
            <div className="text-3xl sm:text-4xl font-black tracking-tight font-sans text-neutral-900">
              8.64
            </div>
            <p className="text-xs text-neutral-500 font-normal">
              B.Tech Data Science consistent high CGPA
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-7 space-y-2 shadow-xs">
            <span className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-widest block">
              Native Kotlin Speedup
            </span>
            <div className="text-3xl sm:text-4xl font-black tracking-tight font-sans text-neutral-900">
              25–40x
            </div>
            <p className="text-xs text-neutral-500 font-normal">
              On-device TFLite face inference (6,000ms → 200ms)
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-7 space-y-2 shadow-xs">
            <span className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-widest block">
              PhishGuard Dataset
            </span>
            <div className="text-3xl sm:text-4xl font-black tracking-tight font-sans text-neutral-900">
              11,431
            </div>
            <p className="text-xs text-neutral-500 font-normal">
              URLs evaluated across 88 lexical & structural features
            </p>
          </div>
        </div>

        {/* Detailed Achievements List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementsData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: motionTokens.ease.cinema,
              }}
              className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-neutral-900 transition-all duration-300 shadow-xs space-y-6 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-neutral-800 bg-neutral-100 px-2.5 py-0.5 rounded-full uppercase border border-neutral-200">
                    {item.category}
                  </span>
                  <span className="font-mono text-xs text-neutral-400 font-semibold">{item.date}</span>
                </div>

                <h3 className="text-xl font-bold font-sans text-neutral-900 tracking-tight">
                  {item.title}
                </h3>

                <div className="text-xs font-semibold text-neutral-500">
                  {item.organization}
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              {item.highlight && (
                <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                  <ShieldCheck size={15} className="text-neutral-900 shrink-0" />
                  <span className="font-mono text-xs font-bold text-neutral-900">
                    {item.highlight}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
