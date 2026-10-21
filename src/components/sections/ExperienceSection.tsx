import React from 'react';
import { motion } from 'motion/react';
import { usePortfolioContent } from '../../context/PortfolioContentContext';
import { Briefcase, Users, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { motionTokens } from '../../utils/motionTokens';

export const ExperienceSection: React.FC = () => {
  const { content } = usePortfolioContent();
  const { experienceData } = content;

  return (
    <section id="experience" className="py-24 sm:py-32 border-b border-gray-150 relative">
      <div className="space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest bg-neutral-100 px-3.5 py-1.5 rounded-full border border-neutral-200/80">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              CHAPTER 07 • EXPERIENCE & LEADERSHIP
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-neutral-900 leading-tight">
              OWNERSHIP, TEAM LEADERSHIP & PRODUCTION DEPLOYMENTS.
            </h2>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-neutral-400 font-medium">
            [ CAN I WORK WITH OTHERS & TAKE OWNERSHIP? ]
          </div>
        </div>

        {/* Experience Timeline Cards */}
        <div className="space-y-8">
          {experienceData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: motionTokens.ease.cinema,
              }}
              className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-xs hover:border-neutral-900 transition-all duration-300 space-y-6 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-wider">
                      {item.period}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-neutral-300" />
                    <span className="font-mono text-xs font-semibold text-neutral-500">
                      {item.location}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black font-sans text-neutral-900 tracking-tight">
                    {item.role}
                  </h3>
                  <div className="text-base font-bold text-neutral-700">
                    {item.organization}
                  </div>
                </div>

                <div className="self-start sm:self-center">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider bg-neutral-100 text-neutral-900 px-4 py-1.5 rounded-full border border-neutral-200 shadow-xs">
                    {item.type}
                  </span>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="space-y-3">
                <span className="font-mono text-xs font-bold tracking-widest text-neutral-400 uppercase">
                  Key Responsibilities & Deliverables
                </span>
                <ul className="space-y-2.5">
                  {item.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm sm:text-base text-neutral-700 leading-relaxed font-normal"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-900 mt-2 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verified Impact Banner */}
              <div className="p-4 sm:p-5 bg-neutral-50 border border-neutral-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                      Verified Result & Milestone
                    </span>
                    <span className="text-sm font-bold text-neutral-900">
                      {item.impact}
                    </span>
                  </div>
                </div>

                {item.technologies && (
                  <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
                    {item.technologies.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[11px] font-semibold bg-white text-neutral-800 border border-neutral-200 px-2.5 py-1 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
