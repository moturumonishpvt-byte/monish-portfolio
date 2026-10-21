import React from 'react';
import { motion } from 'motion/react';
import { usePortfolioContent } from '../../context/PortfolioContentContext';
import { Award, MapPin, ExternalLink } from 'lucide-react';
import { motionTokens } from '../../utils/motionTokens';

export const EducationSection: React.FC = () => {
  const { content } = usePortfolioContent();
  const { educationData, certificationsData } = content;

  return (
    <section id="education" className="py-24 sm:py-32 border-b border-gray-150 relative">
      <div className="space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest bg-neutral-100 px-3.5 py-1.5 rounded-full border border-neutral-200/80">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              CHAPTER 09 • EDUCATION &amp; CERTIFICATIONS
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-neutral-900 leading-tight">
              ACADEMIC RIGOR &amp; FORMAL FOUNDATIONS.
            </h2>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-neutral-400 font-medium">
            [ WHERE AM I FORMALLY LEARNING? ]
          </div>
        </div>

        {/* Education & Certifications Layout */}
        <div className="space-y-10">
          {/* Main Academic Degree Card */}
          {educationData.map((edu) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, ease: motionTokens.ease.cinema }}
              className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-wider">
                    {edu.period}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black font-sans text-neutral-900 tracking-tight">
                    {edu.degree}
                  </h3>
                  <div className="text-base font-bold text-neutral-700">{edu.institution}</div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
                    <MapPin size={13} /> {edu.location}
                  </div>
                </div>

                <div className="bg-neutral-900 text-white px-4 py-2.5 rounded-2xl text-center self-start shrink-0 shadow-xs">
                  <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
                    Cumulative CGPA
                  </span>
                  <span className="text-xl font-black">{edu.gpa}</span>
                </div>
              </div>

              {edu.highlights && (
                <ul className="space-y-2 pt-2 border-t border-gray-100">
                  {edu.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-neutral-700 leading-relaxed font-normal"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-900 mt-2 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}

          {/* Certifications Grid */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Award size={18} className="text-neutral-900" />
              <h3 className="font-mono text-xs font-bold tracking-widest text-neutral-900 uppercase">
                Certifications &amp; Verified Tracks
              </h3>
              <span className="font-mono text-xs text-neutral-400 ml-auto">
                {certificationsData.length} VERIFIED
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certificationsData.map((cert, idx) => (
                <motion.a
                  key={cert.title}
                  href={cert.url || 'https://drive.google.com/drive/folders/1vcI3l67dDbJrSFdJsZgI0-JWEe9fugZA?usp=sharing'}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.04,
                    ease: motionTokens.ease.cinema,
                  }}
                  className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3 hover:border-neutral-900 hover:shadow-sm transition-all duration-300 group flex flex-col"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                        {cert.issuer}
                      </span>
                      <h4 className="text-sm font-bold font-sans text-neutral-900 leading-snug">
                        {cert.title}
                      </h4>
                    </div>
                    <ExternalLink
                      size={13}
                      className="text-neutral-300 group-hover:text-neutral-900 transition-colors shrink-0 mt-0.5"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="font-mono text-[10px] font-semibold bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded border border-neutral-200"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-[10px] text-neutral-400 font-semibold shrink-0 ml-2">
                      {cert.date}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
