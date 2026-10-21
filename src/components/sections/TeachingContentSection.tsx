import React from 'react';
import { motion } from 'motion/react';
import { usePortfolioContent } from '../../context/PortfolioContentContext';
import { BookOpen, Video, ArrowUpRight, Github, GitFork, Sparkles } from 'lucide-react';
import { motionTokens } from '../../utils/motionTokens';

export const TeachingContentSection: React.FC = () => {
  const { content } = usePortfolioContent();
  const { teachingAndContentData, personalInfo } = content;

  return (
    <section id="teaching" className="py-24 sm:py-32 border-b border-gray-150 relative">
      <div className="space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest bg-neutral-100 px-3.5 py-1.5 rounded-full border border-neutral-200/80">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              CHAPTER 08 • TEACHING & CONTENT
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-neutral-900 leading-tight">
              GIVING BACK: KNOWLEDGE SHARING & MENTORSHIP.
            </h2>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-neutral-400 font-medium">
            [ WHAT DID I DO WITH WHAT I LEARNED? ]
          </div>
        </div>

        {/* Knowledge Source Visual Node: Branching into Curriculum vs Breakdowns */}
        <div className="bg-neutral-50 border border-gray-200 rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0">
              <GitFork size={16} />
            </div>
            <div>
              <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                Dual Knowledge Distribution
              </span>
              <p className="text-sm font-bold text-neutral-900">
                Bridging Peer Mentorship & In-Depth Systems Architecture
              </p>
            </div>
          </div>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider bg-white border border-neutral-200 hover:border-neutral-900 px-4 py-2 rounded-xl transition-colors self-start sm:self-auto"
          >
            <Github size={14} /> Open Source Hub <ArrowUpRight size={14} />
          </a>
        </div>

        {/* 2 Major Columns: Teaching Curriculum vs Technical Breakdowns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Teaching & Workshops */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
              <BookOpen size={18} className="text-neutral-900" />
              <h3 className="font-mono text-xs font-bold tracking-widest text-neutral-900 uppercase">
                Curriculum & Mentorship
              </h3>
            </div>

            <div className="space-y-6">
              {teachingAndContentData.teaching.map((course, idx) => (
                <motion.div
                  key={course.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.1,
                    ease: motionTokens.ease.cinema,
                  }}
                  className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-7 space-y-5 hover:border-neutral-900 transition-all duration-300 shadow-xs"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-wider">
                        {course.platform}
                      </span>
                      {course.learnersCount && (
                        <span className="font-mono text-xs font-bold bg-neutral-100 text-neutral-800 px-2.5 py-0.5 rounded-full border border-neutral-200">
                          {course.learnersCount}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xl font-bold font-sans text-neutral-900 tracking-tight">
                      {course.title}
                    </h4>
                  </div>

                  <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                    {course.description}
                  </p>

                  <div className="space-y-2">
                    <span className="font-mono text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                      Core Modules
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {course.topics.map((topic) => (
                        <span
                          key={topic}
                          className="font-mono text-xs font-semibold bg-neutral-50 text-neutral-800 border border-neutral-200 px-2.5 py-1 rounded-md"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={course.actionUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2.5 rounded-xl transition-colors shadow-xs group cursor-pointer"
                    >
                      {course.actionLabel}{' '}
                      <ArrowUpRight
                        size={14}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Technical Breakdowns & Case Studies */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
              <Video size={18} className="text-neutral-900" />
              <h3 className="font-mono text-xs font-bold tracking-widest text-neutral-900 uppercase">
                Architecture Breakdowns & Guides
              </h3>
            </div>

            <div className="space-y-4">
              {teachingAndContentData.content.map((media, idx) => (
                <motion.div
                  key={media.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.1,
                    ease: motionTokens.ease.cinema,
                  }}
                  className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 space-y-3 hover:border-neutral-900 transition-all duration-300 shadow-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-neutral-800 bg-neutral-100 px-2.5 py-0.5 rounded-full uppercase border border-neutral-200">
                      {media.tag}
                    </span>
                    <span className="font-mono text-xs text-neutral-400">
                      {media.duration}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold font-sans text-neutral-900 tracking-tight">
                    {media.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {media.description}
                  </p>

                  <div className="pt-2">
                    <a
                      href={media.actionUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs font-bold text-neutral-900 hover:text-neutral-600 transition-colors uppercase group cursor-pointer"
                    >
                      Explore Technical Breakdown{' '}
                      <ArrowUpRight
                        size={13}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
