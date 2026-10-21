import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

interface ChapterSectionProps {
  id: string;
  chapterNumber: string; // e.g. "CHAPTER 02"
  chapterQuery?: string; // e.g. "[ WHAT DRIVES ME? ]"
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  hideHeader?: boolean;
}

export const ChapterSection: React.FC<ChapterSectionProps> = ({
  id,
  chapterNumber,
  chapterQuery,
  title,
  subtitle,
  children,
  className = '',
  hideHeader = false,
}) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className={`py-20 sm:py-28 md:py-32 border-b border-gray-150 relative scroll-mt-20 ${className}`}
    >
      {/* Delicate chapter top connector line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent pointer-events-none" />

      <div className="space-y-12 sm:space-y-16">
        {!hideHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200/60">
                <span className="w-2 h-2 rounded-full bg-black"></span>
                <span>{chapterNumber}</span>
                {subtitle && <span>• {subtitle}</span>}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-neutral-900 leading-tight">
                {title}
              </h2>
            </div>
            {chapterQuery && (
              <div className="text-left md:text-right font-mono text-xs text-neutral-400 font-medium">
                {chapterQuery}
              </div>
            )}
          </div>
        )}

        {/* Section Inner Content */}
        <div className="relative z-10">{children}</div>
      </div>
    </motion.section>
  );
};
