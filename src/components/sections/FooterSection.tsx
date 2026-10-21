import React from 'react';
import { usePortfolioContent } from '../../context/PortfolioContentContext';
import { Github, Linkedin, Mail, ArrowUp, Sparkles, Terminal } from 'lucide-react';

interface FooterSectionProps {
  onBackToTop: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onBackToTop }) => {
  const { content } = usePortfolioContent();
  const { personalInfo } = content;

  return (
    <footer id="epilogue" className="pt-24 pb-16 border-t border-gray-150 relative select-none">
      <div className="space-y-16">
        {/* End Scene Hero Heading with Spatial Closure */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-neutral-400 uppercase tracking-widest bg-neutral-100 px-3.5 py-1.5 rounded-full border border-neutral-200/80">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              EPILOGUE • CHAPTER 12
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-sans tracking-tight text-neutral-900 leading-none">
              THE JOURNEY CONTINUES.
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 max-w-lg leading-relaxed font-normal">
              Designed & engineered with architectural conviction, mechanical sympathy, zero bloat, and authentic evidence.
            </p>
          </div>

          <button
            onClick={onBackToTop}
            className="self-start md:self-end inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider bg-neutral-900 hover:bg-neutral-800 text-white px-5 py-3 rounded-full transition-all shadow-sm cursor-pointer group"
          >
            <span>Back to Top</span>
            <ArrowUp
              size={14}
              className="group-hover:-translate-y-1 transition-transform"
            />
          </button>
        </div>

        {/* Closing Monogram Signature */}
        <div className="py-8 border-t border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-black tracking-widest text-neutral-900 uppercase">
              MOTURU MONISH
            </span>
            <span className="h-1 w-1 rounded-full bg-neutral-300" />
            <span className="font-mono text-xs text-neutral-500">
              Software Engineer (SDE) • AI/ML Systems
            </span>
          </div>

          <div className="font-mono text-xs text-neutral-400">
            VISAKHAPATNAM, INDIA // 2026
          </div>
        </div>

        {/* Links & Information Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs font-semibold text-neutral-500">
              © {new Date().getFullYear()} Moturu Monish. All rights reserved.
            </span>
          </div>

          {/* Verified Social Channels */}
          <div className="flex items-center gap-5">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-500 hover:text-black transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-500 hover:text-black transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-neutral-500 hover:text-black transition-colors"
              aria-label="Email Direct"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
