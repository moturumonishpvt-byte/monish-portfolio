import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StoryChapterMeta } from '../context/PortfolioContentContext';

interface VerticalStoryTrackerProps {
  chapters: StoryChapterMeta[];
  activeChapterIndex: number;
  onSelectChapter: (index: number, id: string) => void;
}

export const VerticalStoryTracker: React.FC<VerticalStoryTrackerProps> = ({
  chapters,
  activeChapterIndex,
  onSelectChapter,
}) => {
  const [hoveredChapter, setHoveredChapter] = useState<StoryChapterMeta | null>(null);

  return (
    <nav
      aria-label="Story Chapters Navigator"
      className="fixed right-3 xl:right-4 2xl:right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center select-none pointer-events-auto bg-white/95 backdrop-blur-md px-2.5 py-3.5 rounded-full border border-gray-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
    >
      <span className="text-[9px] font-mono font-bold tracking-widest text-neutral-400 mb-2">
        01
      </span>

      <div className="relative flex flex-col items-center space-y-2">
        {chapters.map((chapter) => {
          const isActive = activeChapterIndex === chapter.index;
          return (
            <div
              key={chapter.id}
              className="relative flex items-center"
              onMouseEnter={() => setHoveredChapter(chapter)}
              onMouseLeave={() => setHoveredChapter(null)}
            >
              <button
                onClick={() => onSelectChapter(chapter.index, chapter.id)}
                className={`w-2.5 h-2.5 block rounded-full transition-all duration-300 focus:outline-none cursor-pointer z-10 shrink-0 ${
                  isActive
                    ? 'bg-black scale-110'
                    : 'bg-neutral-200 hover:bg-neutral-600 hover:scale-125'
                }`}
                title={`${chapter.chapterNumber} • ${chapter.title}`}
                aria-label={`Jump to ${chapter.chapterNumber} ${chapter.title}`}
              />

              {/* Hover Tooltip Card */}
              <AnimatePresence>
                {hoveredChapter?.id === chapter.id && (
                  <motion.div
                    initial={{ opacity: 0, x: 8, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-6 pointer-events-none whitespace-nowrap bg-neutral-900 text-white px-3 py-1.5 rounded-xl text-xs font-mono shadow-lg border border-neutral-700 flex items-center gap-2 z-50"
                  >
                    <span className="font-bold text-neutral-400 text-[10px]">
                      {chapter.chapterNumber.slice(-2)}
                    </span>
                    <span className="font-semibold text-white tracking-wide">
                      {chapter.title}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <span className="text-[9px] font-mono font-bold tracking-widest text-neutral-400 mt-2">
        {chapters.length.toString().padStart(2, '0')}
      </span>
    </nav>
  );
};
