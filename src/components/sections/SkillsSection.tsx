import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolioContent } from '../../context/PortfolioContentContext';
import { Code2, Cpu, Layout, Database, Terminal, ArrowUpRight, Sparkles } from 'lucide-react';
import { motionTokens } from '../../utils/motionTokens';

export const SkillsSection: React.FC = () => {
  const { content } = usePortfolioContent();
  const { skillsData, projects } = content;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Code2':
        return <Code2 size={20} />;
      case 'Cpu':
        return <Cpu size={20} />;
      case 'Layout':
        return <Layout size={20} />;
      case 'Database':
        return <Database size={20} />;
      case 'Terminal':
      default:
        return <Terminal size={20} />;
    }
  };

  const displayedCategories = selectedCategory
    ? skillsData.filter((cat) => cat.name === selectedCategory)
    : skillsData;

  // Find projects that utilize the hovered skill
  const relatedProjects = hoveredSkill
    ? projects.filter((p) =>
        p.techStack.some(
          (t) =>
            t.toLowerCase().includes(hoveredSkill.toLowerCase()) ||
            hoveredSkill.toLowerCase().includes(t.toLowerCase())
        )
      )
    : [];

  return (
    <section id="skills" className="py-24 sm:py-32 border-b border-gray-150 relative">
      <div className="space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest bg-neutral-100 px-3.5 py-1.5 rounded-full border border-neutral-200/80">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              CHAPTER 04 • SKILLS & TECH STACK
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-neutral-900 leading-tight">
              MODERN FULL-STACK & DEEP LEARNING TOOLKIT.
            </h2>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-neutral-400 font-medium">
            [ WHAT DID I LEARN? ]
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2.5 items-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`font-mono text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
              selectedCategory === null
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                : 'bg-white text-neutral-600 border-gray-200 hover:border-gray-300 hover:text-neutral-900 shadow-xs'
            }`}
          >
            All Disciplines ({skillsData.reduce((acc, c) => acc + c.skills.length, 0)})
          </button>
          {skillsData.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`font-mono text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.name
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                  : 'bg-white text-neutral-600 border-gray-200 hover:border-gray-300 hover:text-neutral-900 shadow-xs'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {displayedCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: motionTokens.ease.cinema,
              }}
              className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-neutral-900 transition-all duration-300 space-y-6 shadow-xs group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900 border border-neutral-200 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                    {getIcon(category.iconName)}
                  </div>
                  <span className="font-mono text-xs font-bold text-neutral-400">
                    {category.skills.length} TECHNOLOGIES
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-sans text-neutral-900 tracking-tight">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-xs sm:text-sm text-neutral-500 mt-1 leading-relaxed font-normal">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Skills Badges with Tactile Hover */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                {category.skills.map((skill) => {
                  const isHovered = hoveredSkill === skill;
                  return (
                    <button
                      key={skill}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`skill-tag font-mono text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        isHovered
                          ? 'bg-neutral-900 text-white border-neutral-900 scale-105 shadow-xs'
                          : 'bg-neutral-50 text-neutral-800 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-100'
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Skill-to-Project Connection Inspector */}
        <AnimatePresence>
          {hoveredSkill && relatedProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="p-4 sm:p-5 bg-neutral-900 text-white rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg border border-neutral-800"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                  <Sparkles size={14} />
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                    Deployed in Production Systems:
                  </span>
                  <span className="text-sm font-bold text-white">
                    {hoveredSkill}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {relatedProjects.map((p) => (
                  <a
                    key={p.id}
                    href="#projects"
                    className="inline-flex items-center gap-1 font-mono text-xs font-bold bg-white text-neutral-900 px-3 py-1 rounded-full hover:bg-neutral-200 transition-colors"
                  >
                    <span>{p.title}</span>
                    <ArrowUpRight size={11} />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
