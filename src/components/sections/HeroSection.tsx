import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { usePortfolioContent } from '../../context/PortfolioContentContext';
import { usePointerParallax } from '../../hooks/usePointerParallax';
import InteractiveImageReveal from '../InteractiveImageReveal';
import { motionTokens } from '../../utils/motionTokens';

interface HeroSectionProps {
  isPreloadFinished: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isPreloadFinished }) => {
  const { content } = usePortfolioContent();
  const { personalInfo } = content;
  const shouldReduceMotion = useReducedMotion();

  const {
    handleMouseMove,
    handleMouseLeave,
    rotateX,
    rotateY,
    translateX,
    translateY,
  } = usePointerParallax({ maxAngle: 6, maxOffset: 10 });

  return (
    <motion.section
      id="home"
      initial={{ opacity: 0 }}
      animate={isPreloadFinished ? { opacity: 1 } : {}}
      transition={{ duration: 1, ease: motionTokens.ease.cinema }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen sm:min-h-[92vh] flex flex-col justify-center pt-28 pb-16 relative overflow-hidden border-b border-gray-150"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full relative z-10">
        {/* Left Column: Headline, Bio & Primary CTAs */}
        <div className="lg:col-span-6 space-y-8 relative z-10">
          <div className="space-y-4">
            {/* Chapter Indicator Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isPreloadFinished ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: motionTokens.ease.smooth }}
              className="inline-flex items-center gap-2 font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest bg-neutral-100 px-3.5 py-1.5 rounded-full border border-neutral-200/80"
            >
              <span className="w-2 h-2 rounded-full bg-black"></span>
              CHAPTER 01 • WHO AM I?
            </motion.div>

            {/* Display Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
              animate={
                isPreloadFinished
                  ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                  : {}
              }
              transition={{
                duration: 0.8,
                ease: motionTokens.ease.cinema,
              }}
              className="text-6xl sm:text-7xl md:text-8xl font-sans font-black tracking-tighter text-neutral-900 leading-tight"
            >
              Monish
            </motion.h1>

            {/* Subtitle & Verified Positioning */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isPreloadFinished ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-3"
            >
              <p className="text-xl sm:text-2xl font-bold text-neutral-900 font-sans tracking-tight leading-snug">
                {personalInfo.tagline}
              </p>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-lg font-normal">
                {personalInfo.bio}
              </p>
            </motion.div>
          </div>

          {/* Verified Attribute Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isPreloadFinished ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap gap-2 pt-1"
          >
            <span className="font-mono text-xs font-bold bg-neutral-100 text-neutral-800 px-3 py-1 rounded-md border border-neutral-200/90 shadow-xs">
              8.64 CGPA • Data Science
            </span>
            <span className="font-mono text-xs font-bold bg-neutral-100 text-neutral-800 px-3 py-1 rounded-md border border-neutral-200/90 shadow-xs">
              IIT Bombay NEC Top 0.6%
            </span>
            <span className="font-mono text-xs font-bold bg-neutral-100 text-neutral-800 px-3 py-1 rounded-md border border-neutral-200/90 shadow-xs">
              Full Stack &amp; AI/ML Systems
            </span>
          </motion.div>

          {/* Primary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isPreloadFinished ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="/Moturu_Monish_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm flex items-center gap-2 group cursor-pointer"
            >
              Resume{' '}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="#about"
              className="px-6 py-3.5 bg-white hover:bg-neutral-100 text-neutral-900 border border-gray-300 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
            >
              Read Full Story
            </a>
          </motion.div>
        </div>

        {/* Right Column: 3D Dual-Layer Portrait Stage */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isPreloadFinished ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: motionTokens.ease.cinema }}
            style={{
              rotateX,
              rotateY,
              x: translateX,
              y: translateY,
              transformStyle: 'preserve-3d',
            }}
            className="relative w-full max-w-lg h-[50vh] sm:h-[65vh] lg:h-[72vh] flex items-end justify-center lg:justify-end"
          >
            <InteractiveImageReveal
              aboveSrc="/above.png"
              belowSrc="/below.png"
              belowOffsetX={-0.018}
              belowOffsetY={-0.065}
              belowScale={1.07}
              revealRadius={70}
              className="w-full h-full relative overflow-hidden flex items-end justify-center"
            />
            <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>

    </motion.section>
  );
};
