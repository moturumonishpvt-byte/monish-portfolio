import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { usePortfolioContent } from './context/PortfolioContentContext';
import { Project } from './types';

// Components & Systems
import Header from './components/Header';
import CaseStudyModal from './components/CaseStudyModal';
import Preloader from './components/Preloader';
import { ProjectsWheel } from './components/ProjectsWheel';
import { VerticalStoryTracker } from './components/VerticalStoryTracker';
import { AmbientCanvas } from './components/AmbientCanvas';
import { CustomCursor } from './components/CustomCursor';

// 13-Chapter Story Sections
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { JourneySection } from './components/sections/JourneySection';
import { SkillsSection } from './components/sections/SkillsSection';
import { HackathonsSection } from './components/sections/HackathonsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { AchievementsSection } from './components/sections/AchievementsSection';
import { EducationSection } from './components/sections/EducationSection';
import { CurrentlySection } from './components/sections/CurrentlySection';
import { ContactSection } from './components/sections/ContactSection';
import { FooterSection } from './components/sections/FooterSection';

export default function App() {
  const { content } = usePortfolioContent();
  const { projects, chapters } = content;

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPreloadFinished, setIsPreloadFinished] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(1);
  const lenisRef = useRef<Lenis | null>(null);

  // Drive Lenis from GSAP's ticker so scrolling and scroll-triggered motion share a frame loop.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t: number) => 1 - Math.pow(1 - t, 5),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.4,
      anchors: true,
    });
    lenisRef.current = lenis;

    const updateScrollTrigger = () => ScrollTrigger.update();
    const updateLenis = (time: number) => lenis.raf(time * 1000);

    lenis.on('scroll', updateScrollTrigger);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', updateScrollTrigger);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  // Comprehensive GSAP scroll reveal system
  useEffect(() => {
    if (!isPreloadFinished || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {

      // 1. Section headings: fade + rise
      gsap.utils.toArray<HTMLElement>('section[id] h2, footer[id] h2').forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1, y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        );
      });

      // 2. Chapter label pills: slide in from left
      gsap.utils
        .toArray<HTMLElement>('section[id] .font-mono.rounded-full, footer[id] .font-mono.rounded-full')
        .forEach((pill) => {
          gsap.fromTo(
            pill,
            { autoAlpha: 0, x: -16 },
            {
              autoAlpha: 1, x: 0,
              duration: 0.55,
              ease: 'power2.out',
              scrollTrigger: { trigger: pill, start: 'top 90%', once: true },
            },
          );
        });

      // 3. Cards / bordered panels: stagger up with clip-path reveal
      gsap.utils.toArray<HTMLElement>('section[id] .rounded-3xl, section[id] .rounded-2xl').forEach((card, i) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 28, clipPath: 'inset(6% 0% 0% 0% round 24px)' },
          {
            autoAlpha: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 24px)',
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              once: true,
            },
            delay: (i % 4) * 0.07,
          },
        );
      });

      // 4. Horizontal rule / border-b dividers: width wipe from left
      gsap.utils.toArray<HTMLElement>('section[id] .border-b:not(section), footer[id] .border-b').forEach((divider) => {
        gsap.fromTo(
          divider,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 0.9,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: divider, start: 'top 92%', once: true },
          },
        );
      });

    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [isPreloadFinished]);

  // Top Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax subtle background shift
  const bgShiftY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  // Scroll spy tracking across all 13 canonical chapters
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;
      if (isAtBottom) {
        setActiveChapterIndex(chapters.length || 13);
        ticking = false;
        return;
      }

      const threshold = window.innerHeight * 0.45;
      let currentActive = 1;

      for (const chapter of chapters) {
        const el = document.getElementById(chapter.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold) {
            currentActive = chapter.index;
          }
        }
      }

      setActiveChapterIndex(currentActive);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [chapters]);

  const handleSelectChapter = (index: number, id: string) => {
    setActiveChapterIndex(index);
    scrollToSection(id);
  };

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: -24 });
      } else {
        target.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
          block: 'start',
        });
      }
    }
  };

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0);
    } else {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
      });
    }
  };

  return (
    <div className="bg-[#e5e5e7] text-neutral-900 min-h-screen font-sans selection:bg-black selection:text-white flex justify-center py-0 sm:py-8 md:py-12 px-0 sm:px-4 md:px-8 xl:pr-14 relative">
      {/* Custom Minimal Desktop Cursor */}
      <CustomCursor />

      {/* Dynamic 12-Chapter Story Indicator */}
      <VerticalStoryTracker
        chapters={chapters}
        activeChapterIndex={activeChapterIndex}
        onSelectChapter={handleSelectChapter}
      />

      <div className="w-full max-w-[1260px] 2xl:max-w-[1300px]">
        {/* Floating Presentation Canvas Box */}
        <div
          className="w-full bg-[#ffffff] rounded-none sm:rounded-[36px] shadow-[0_50px_130px_rgba(0,0,0,0.06)] border border-gray-200 overflow-hidden relative flex flex-col justify-between min-h-screen transition-all duration-1000"
          style={{
            opacity: isPreloadFinished ? 1 : 0,
            transform: isPreloadFinished ? 'translateY(0)' : 'translateY(24px)',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Ambient 3D Depth Canvas Grid Layer */}
          <AmbientCanvas />

          {/* Top Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] bg-black z-50 origin-[0%] pointer-events-none"
            style={{ scaleX }}
          />

          {/* Background Monograms with Subtle Parallax */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
            <motion.div
              style={{ y: bgShiftY }}
              initial={{ opacity: 0 }}
              animate={isPreloadFinished ? { opacity: 1 } : {}}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              className="absolute right-[-10%] top-[4%] text-[36rem] font-sans font-extrabold text-black/[0.012] tracking-tighter leading-none"
            >
              MM
            </motion.div>
            <motion.div
              style={{ y: bgShiftY }}
              initial={{ opacity: 0 }}
              animate={isPreloadFinished ? { opacity: 1 } : {}}
              transition={{ duration: 1.8, delay: 0.2, ease: 'easeOut' }}
              className="absolute left-[-12%] bottom-[12%] text-[32rem] font-sans font-extrabold text-black/[0.009] tracking-tighter leading-none"
            >
              SDE
            </motion.div>
          </div>

          {/* Floating Top Nav Pill */}
          <Header
            onOpenInbox={() => {}}
            onNavigateToSection={scrollToSection}
          />

          {/* Canvas Inner Content with 13 Continuous Story Scenes */}
          <div className="px-6 sm:px-10 md:px-16 lg:px-20 relative z-10">
            {/* 01. HERO */}
            <HeroSection isPreloadFinished={isPreloadFinished} />

            {/* 02. ABOUT ME */}
            <AboutSection />

            {/* 03. MY JOURNEY */}
            <JourneySection />

            {/* 04. SKILLS & TECH STACK */}
            <SkillsSection />

            {/* 05. PROJECTS (34-Card 3D Fan Deal & Lift Wheel) */}
            <div className="border-b border-gray-150 relative overflow-hidden">
              <ProjectsWheel
                projects={projects}
                setSelectedProject={setSelectedProject}
              />
            </div>

            {/* 06. HACKATHONS & CHALLENGES */}
            <HackathonsSection />

            {/* 07. EXPERIENCE & LEADERSHIP */}
            <ExperienceSection />

            {/* 08. ACHIEVEMENTS */}
            <AchievementsSection />

            {/* 10. EDUCATION & CERTIFICATIONS */}
            <EducationSection />

            {/* 11. CURRENTLY / WHAT'S NEXT */}
            <CurrentlySection />

            {/* 12. CONTACT */}
            <ContactSection />

            {/* 13. FOOTER / END SCENE */}
            <FooterSection onBackToTop={scrollToTop} />
          </div>
        </div>
      </div>

      {/* Case Study Detailed Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Preloader */}
      {!isPreloadFinished && (
        <Preloader onComplete={() => setIsPreloadFinished(true)} />
      )}
    </div>
  );
}
