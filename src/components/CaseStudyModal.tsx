import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  GitMerge,
  CheckSquare,
  Target,
  FileCheck,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { Project } from '../types';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

// ordered list matches data.ts projectCaseStudies order
const PROJECT_ORDER = [
  'academic-monitor',
  'phishguard',
  'skill-connect',
  'aequitas-platform',
  'dag-nodecanvas',
  'whis-assistant',
  'system-gamified',
];

function getNum(id: string) {
  const idx = PROJECT_ORDER.indexOf(id);
  return idx >= 0 ? String(idx + 1).padStart(2, '0') : '00';
}

function SectionLabel({
  icon,
  label,
  className = '',
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <h4
      className={`flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest ${className}`}
    >
      {icon}
      {label}
    </h4>
  );
}

function ModalContent({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);

  /* ── stop wheel events from propagating to the page while inside the modal ── */
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const stop = (e: WheelEvent) => e.stopPropagation();
    el.addEventListener('wheel', stop, { passive: true });
    return () => el.removeEventListener('wheel', stop);
  }, []);

  /* ── Escape key ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  /* ── lock body scroll (Lenis-compatible) ── */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const num = getNum(project.id);

  return (
    /* full-screen overlay — rendered into document.body so it escapes all transforms */
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ perspective: '1200px' }}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Sheet */}
      <motion.div
        initial={{ opacity: 0, y: 64, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 48, scale: 0.97 }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-t-3xl sm:rounded-3xl overflow-hidden z-10 flex flex-col"
        style={{
          maxHeight: '92vh',
          background: '#fff',
          boxShadow:
            '0 40px 100px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.07)',
        }}
      >
        {/* ── DARK HEADER ── */}
        <div className="relative bg-neutral-950 text-white px-6 sm:px-8 pt-8 pb-6 flex-shrink-0 overflow-hidden">
          {/* Watermark number */}
          <div className="absolute right-2 top-0 font-black font-sans text-[9rem] leading-none text-white/[0.04] select-none pointer-events-none">
            {num}
          </div>

          {/* Meta row */}
          <div className="flex items-start justify-between gap-3 mb-5 relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                {num} • CASE STUDY
              </span>
              {project.period && (
                <span className="font-mono text-[10px] text-neutral-500 tracking-wide">
                  {project.period}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Title + subtitle */}
          <div className="relative z-10 space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-white leading-tight">
              {project.title}
            </h2>
            {project.shortDescription && (
              <p className="text-sm text-neutral-400 font-mono leading-relaxed">
                {project.shortDescription}
              </p>
            )}
            {project.role && (
              <div className="mt-3 inline-flex items-center gap-1.5 bg-white/8 border border-white/12 rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-[10px] text-neutral-300 font-bold uppercase tracking-wider">
                  {project.role}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div
          ref={bodyRef}
          className="overflow-y-auto flex-1"
          style={{
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div className="px-6 sm:px-8 py-8 space-y-8">

            {/* Overview */}
            {project.longDescription && (
              <div className="space-y-2">
                <SectionLabel
                  icon={<span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />}
                  label="Overview"
                  className="text-gray-400"
                />
                <p className="text-gray-700 leading-relaxed text-base">
                  {project.longDescription}
                </p>
              </div>
            )}

            {/* Problem */}
            {project.problem && (
              <div className="rounded-2xl bg-red-50 border border-red-100 p-5 space-y-2">
                <SectionLabel
                  icon={<Target size={14} className="text-red-500" />}
                  label="The Problem"
                  className="text-red-600"
                />
                <p className="text-red-900/80 text-sm leading-relaxed">
                  {project.problem}
                </p>
              </div>
            )}

            {/* Architecture timeline */}
            {project.architecture && project.architecture.length > 0 && (
              <div className="space-y-4">
                <SectionLabel
                  icon={<GitMerge size={14} className="text-black" />}
                  label="Integrated Software Architecture"
                  className="text-gray-400"
                />
                <div className="relative border-l-2 border-gray-200 pl-6 ml-2 space-y-6">
                  {project.architecture.map((step, idx) => {
                    // Step format: "Stage N: Title: Description" OR "Stage N: Title"
                    // Strip leading "Stage N:" prefix first
                    const withoutStagePrefix = step.replace(/^Stage\s+\d+:\s*/i, '');
                    const colonIdx = withoutStagePrefix.indexOf(':');
                    const title =
                      colonIdx > -1
                        ? withoutStagePrefix.slice(0, colonIdx).trim()
                        : withoutStagePrefix.trim();
                    const desc =
                      colonIdx > -1
                        ? withoutStagePrefix.slice(colonIdx + 1).trim()
                        : '';

                    return (
                      <div key={idx} className="relative">
                        <span className="absolute -left-[35px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 font-mono text-[9px] font-bold text-white">
                          {idx + 1}
                        </span>
                        <div className="space-y-1">
                          <p className="font-bold text-sm text-neutral-900">
                            Stage {idx + 1}: {title}
                          </p>
                          {desc && (
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {desc}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="space-y-3">
                <SectionLabel
                  icon={<Code2 size={14} className="text-black" />}
                  label="Tech Stack"
                  className="text-gray-400"
                />
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs font-semibold bg-neutral-100 text-neutral-800 border border-neutral-200 px-3 py-1.5 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Impact */}
            {project.impact && project.impact.length > 0 && (
              <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-5 sm:p-6 space-y-4">
                <SectionLabel
                  icon={<FileCheck size={14} className="text-black" />}
                  label="Development Impact & Outcomes"
                  className="text-black"
                />
                <ul className="space-y-3">
                  {project.impact.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm">
                      <CheckSquare size={14} className="text-black shrink-0 mt-0.5" />
                      <span className="text-gray-800 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="flex-shrink-0 border-t border-gray-100 px-6 sm:px-8 py-5 flex items-center justify-between gap-4 bg-gray-50/80">
          <p className="text-xs text-gray-400 font-mono hidden sm:block">
            Designed &amp; built by Moturu Monish
          </p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 ml-auto">
            {project.repositories && project.repositories.length > 0 ? (
              project.repositories.map((repo, idx) => (
                <a
                  key={idx}
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold border border-gray-300 text-gray-700 hover:border-black hover:text-black px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl transition-all"
                >
                  <ExternalLink size={12} />
                  {repo.name}
                </a>
              ))
            ) : project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold border border-gray-300 text-gray-700 hover:border-black hover:text-black px-4 py-2.5 rounded-xl transition-all"
              >
                <ExternalLink size={12} />
                Source Code
              </a>
            ) : null}
            <button
              onClick={onClose}
              className="font-mono text-xs font-bold bg-black hover:bg-neutral-800 text-white px-5 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              Back to Portfolio
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  return createPortal(
    <AnimatePresence>
      {project && <ModalContent project={project} onClose={onClose} />}
    </AnimatePresence>,
    document.body,
  );
}
