import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<'initial' | 'delaying' | 'scaling' | 'transitioning' | 'complete'>('initial');
  
  // The exact Google Drive link specified by the user
  const requestedDriveUrl = "https://drive.google.com/file/d/1d_oXIENF-6sWFUX98gX7-gUo4F52z9iZ/view?usp=sharing";
  
  // High-performance image conversion for raw embedding
  const renderImgUrl = requestedDriveUrl.includes('/file/d/')
    ? `https://lh3.googleusercontent.com/d/${requestedDriveUrl.split('/file/d/')[1].split('/')[0]}`
    : requestedDriveUrl;

  useEffect(() => {
    // Phase 1: Lock body overflow on mount
    document.body.style.overflow = 'hidden';

    // Phase 2: Start trigger timer after a 0.5-second initial delay
    const startDelayTimer = setTimeout(() => {
      setPhase('scaling');
    }, 500);

    // Phase 3: Wait for exponential scale to fully overtake the screen (1.15 seconds into the 1.5-second transition)
    const coverPageTimer = setTimeout(() => {
      setPhase('transitioning');
    }, 500 + 1150);

    // Phase 4: Complete transition and release body scrolling after 1.5 seconds of scaling are done
    const completeTimer = setTimeout(() => {
      setPhase('complete');
      document.body.style.overflow = '';
      onComplete(); // Reveal content
    }, 500 + 1500);

    return () => {
      clearTimeout(startDelayTimer);
      clearTimeout(coverPageTimer);
      clearTimeout(completeTimer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (phase === 'complete') return null;

  return (
    <AnimatePresence>
      {(phase === 'initial' || phase === 'delaying' || phase === 'scaling' || phase === 'transitioning') && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-[#FFFFFF]"
          style={{ pointerEvents: phase === 'transitioning' ? 'none' : 'auto' }}
        >
          {/* Hardware-accelerated centered scaling logo image initialized at 120px */}
          <div
            className="flex items-center justify-center select-none"
            style={{
              width: '120px',
              height: '120px',
              transformOrigin: 'center center',
              
              // Scale exponentially past the viewport
              transform: phase === 'scaling' || phase === 'transitioning'
                ? 'scale(100)'
                : 'scale(1)',
              opacity: 1,
              
              transition: 'transform 1.50s cubic-bezier(0.85, 0, 0.15, 1)',
              willChange: 'transform'
            }}
          >
            <img 
              src={renderImgUrl}
              alt="Premium Logo"
              className="w-full h-auto object-contain"
              onError={(e) => {
                // If direct loading fails, display a premium minimalist vector fallback
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  let fallback = parent.querySelector('.fallback-svg');
                  if (!fallback) {
                    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    svg.setAttribute('viewBox', '0 0 100 100');
                    svg.setAttribute('class', 'w-16 h-16 text-black fallback-svg');
                    svg.innerHTML = `<circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="4"/><path d="M40 30h15a15 15 0 0 1 0 30H40V30zm10 20a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" fill="currentColor"/>`;
                    parent.appendChild(svg);
                  }
                }
              }}
            />
          </div>

          {/* Elegant microscopic loader status indicator in corners (pure monochrome) */}
          <div className="absolute top-8 left-8 font-mono text-[9px] text-[#27272A] tracking-[0.25em] uppercase flex items-center gap-1.5 pointer-events-none select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#18181B] animate-pulse" />
            STAGING CORE TRANSITION
          </div>
          
          <div className="absolute bottom-8 right-8 font-mono text-[9px] text-[#27272A] tracking-widest pointer-events-none select-none flex items-center gap-1">
            <Sparkles size={11} className="text-[#18181B]" />
            MONO PRELOAD // 1.5s SCALE
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
