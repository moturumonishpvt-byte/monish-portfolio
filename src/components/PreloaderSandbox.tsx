import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Copy, 
  Check, 
  Play, 
  RotateCcw, 
  Settings, 
  Sparkles,
  BookOpen,
  Layout,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';

interface PreloaderSandboxProps {
  onClose: () => void;
}

export default function PreloaderSandbox({ onClose }: PreloaderSandboxProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'html' | 'css' | 'js'>('all');
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Customization presets & parameters
  const [preset, setPreset] = useState<'monochrome' | 'color'>('color');
  const [blockColor, setBlockColor] = useState('#F4F4F5');
  const [preloaderSize, setPreloaderSize] = useState(120); // in pixels
  const [transitionDuration, setTransitionDuration] = useState(1.5); // in seconds
  const [triggerDelay, setTriggerDelay] = useState(500); // ms
  
  // The exact Google Drive link specified by the user
  const requestedDriveUrl = "https://drive.google.com/file/d/1d_oXIENF-6sWFUX98gX7-gUo4F52z9iZ/view?usp=sharing";
  
  // High-performance image conversion for raw embedding
  const renderImgUrl = requestedDriveUrl.includes('/file/d/')
    ? `https://lh3.googleusercontent.com/d/${requestedDriveUrl.split('/file/d/')[1].split('/')[0]}`
    : requestedDriveUrl;
  
  // Simulation phase
  // 'idle' -> 'loading' -> 'exploding' -> 'contentReveal' -> 'finished'
  const [simPhase, setSimPhase] = useState<'idle' | 'loading' | 'exploding' | 'contentReveal' | 'finished'>('idle');

  const colorPresets = [
    { name: 'Light Gray (Zinc)', hex: '#F4F4F5' },
    { name: 'Gray Zinc 200', hex: '#E4E4E7' },
    { name: 'Gray Zinc 300', hex: '#D4D4D8' },
    { name: 'Dark Gray Scale', hex: '#A1A1AA' },
    { name: 'Deep Charcoal', hex: '#71717A' },
  ];

  //---------------------------------------------------------
  // CODE TEMPLATE A: CINEMATIC LOGO SCALE (Cubic-Bezier)
  //---------------------------------------------------------
  const htmlColor = `<!-- 1. Smooth Scaling Logo Preloader Overlay -->
<div id="preloader" class="preloader-overlay">
    <div class="logo-wrapper">
        <img id="logo-image" 
             src="https://drive.google.com/file/d/1d_oXIENF-6sWFUX98gX7-gUo4F52z9iZ/view?usp=sharing" 
             alt="Premium Logo" 
             class="preloader-logo" 
             onerror="this.onerror=null; this.src='https://lh3.googleusercontent.com/d/1d_oXIENF-6sWFUX98gX7-gUo4F52z9iZ';" />
    </div>
</div>

<!-- 2. Main Page Content (hidden initially) -->
<div id="content" class="main-content">
    <header class="site-header">
        <div class="logo">PORTFOLIO</div>
        <nav class="nav-links">
            <a href="#">WORK</a>
            <a href="#">ABOUT</a>
            <a href="#">CONTACT</a>
        </nav>
    </header>

    <main class="content-body">
        <span class="badge">CSS3 Transition // Active</span>
        <h1 class="main-title">A New Era of Digital Motion</h1>
        <p class="main-subtitle">
            Designed with a cubic-bezier scale ramp to transition fluidly from a central focusing logo into a high-fidelity workspace layout.
        </p>
        
        <div class="media-frame">
            <div class="mockup-screen">
                <div class="mockup-dot dark"></div>
                <div class="mockup-dot medium"></div>
                <div class="mockup-dot light"></div>
                <div class="mockup-grid">
                    <div class="grid-card"></div>
                    <div class="grid-card select"></div>
                    <div class="grid-card"></div>
                </div>
            </div>
        </div>
        
        <button class="replay-btn" onclick="triggerPreloader()">Replay Experience</button>
    </main>
</div>`;

  const cssColor = `/* Core Reset & Full Viewport Stage */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background-color: #FFFFFF; /* Stark white initially */
    overflow: hidden; /* Prevent scrolling during preloading sequence */
    color: #000000;
}

/* 1. Preloader Container overlay covering viewport */
.preloader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #FFFFFF; /* Stark white background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1); /* Smooth fade out */
}

/* 2. Logo Wrapper of constant size */
.logo-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${preloaderSize}px;
    height: ${preloaderSize}px;
    perspective: 1000px;
}

/* 3. Preloader logo image element with high performance scaling */
.preloader-logo {
    width: 105%;
    height: auto;
    object-fit: contain;
    transform: scale(1);
    transform-origin: center center;
    will-change: transform, opacity;
}

/* 4. Exponential scaling class triggered on load */
.preloader-logo.expand {
    /* Premium cinema-like scaling easing */
    transition: transform ${transitionDuration}s cubic-bezier(0.85, 0, 0.15, 1),
                opacity ${transitionDuration}s cubic-bezier(0.85, 0, 0.15, 1);
    transform: scale(100); /* Bust past the bounds of the viewport to fill it with dark canvas */
    opacity: 1;
}

/* 5. Clean, stark high-contrast monochrome landing page content */
.main-content {
    opacity: 0;
    visibility: hidden;
    transform: translateY(30px);
    transition: opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1), 
                transform 1.5s cubic-bezier(0.16, 1, 0.3, 1), 
                visibility 1.5s;
    background-color: #000000; /* Crisp pitch-black backplane */
    min-height: 100vh;
    color: #ffffff; /* Stark high-contrast white text */
    padding: 2.5rem;
}

.main-content.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

/* Custom site structure styled in premium black and white */
.site-header {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}
.logo {
    font-weight: 850;
    letter-spacing: 0.05em;
}
.nav-links a {
    color: rgba(255, 255, 255, 0.65);
    text-decoration: none;
    margin-left: 1.5rem;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    transition: color 0.15s;
}
.nav-links a:hover {
    color: #ffffff;
}

.content-body {
    max-width: 800px;
    margin: 10vh auto 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.badge {
    text-transform: uppercase;
    font-size: 0.70rem;
    font-weight: 800;
    letter-spacing: 0.15em;
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    padding: 0.4rem 0.8rem;
    border-radius: 100px;
    margin-bottom: 1.5rem;
}
.main-title {
    font-size: 3rem;
    font-weight: 950;
    letter-spacing: -0.04em;
    margin-bottom: 1rem;
    line-height: 1.05;
    text-transform: uppercase;
}
.main-subtitle {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.7);
    max-width: 580px;
    line-height: 1.6;
    margin-bottom: 2.5rem;
}

.media-frame {
    width: 100%;
    max-width: 600px;
    background-color: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 1rem;
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
    margin-bottom: 2.5rem;
}
.mockup-screen {
    width: 100%;
    height: 160px;
    background-color: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 0.75rem;
    position: relative;
    text-align: left;
}
.mockup-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 4px;
}
.mockup-dot.dark { background-color: #27272a; }
.mockup-dot.medium { background-color: #52525b; }
.mockup-dot.light { background-color: #d4d4d8; }

.mockup-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 1.25rem;
}
.grid-card {
    height: 65px;
    background-color: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 6.5px;
}
.grid-card.select {
    background-color: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255,255,255,0.1);
}

.replay-btn {
    border: none;
    background-color: #ffffff;
    color: #000000;
    font-weight: 700;
    padding: 0.85rem 1.85rem;
    font-size: 0.85rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    border-radius: 100px;
    cursor: pointer;
    box-shadow: 0 10px 25px rgba(255,255,255,0.1);
    transition: transform 0.2s, background-color 0.2s;
}
.replay-btn:hover {
    transform: scale(1.03);
    background-color: #f4f4f5;
}`;

  const jsColor = `// Function to handle the entire animation lifecycle
function triggerPreloader() {
    const preloader = document.getElementById('preloader');
    const logoImage = document.getElementById('logo-image');
    const content = document.getElementById('content');

    // 1. Reset initial state
    document.body.style.overflow = 'hidden'; // Keep body locked
    content.classList.remove('visible');
    preloader.style.opacity = '1';
    preloader.style.display = 'flex';
    logoImage.classList.remove('expand');

    // Stage A: Brief simulated delay (e.g. ${triggerDelay}ms) before logo triggers 
    setTimeout(() => {
        // Expand the logo image outwards with exponential curve 
        logoImage.classList.add('expand');

        // Stage B: Smoothly fade in content near the end of scale expansion
        setTimeout(() => {
            content.classList.add('visible');
            
            // Restore body scrolling accessibility once the view fully transitions
            document.body.style.overflow = '';
            
            // Stage C: Fade out preloader container completely
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 800); // Allow fade opacity transition to finish
            }, 300);
            
        }, ${Math.round(transitionDuration * 0.8 * 1000)}); // dynamic math offset based on custom transition speed

    }, ${triggerDelay});
}

// Automatically bind sequence on window load
window.addEventListener('load', () => {
    triggerPreloader();
});`;

  //---------------------------------------------------------
  // CODE TEMPLATE B: MONOCHROME PORTFOLIO (GSAP)
  //---------------------------------------------------------
  const htmlMonochrome = `<!-- 1. Include GSAP CDN Library Dependency -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

<!-- 2. Stark Monochrome Preloader Overlay -->
<div id="preloader" class="preloader-overlay">
    <div id="loading-block" class="scaling-block"></div>
</div>

<!-- 3. Minimalist Pitch-Black Portfolio Landing Page Content -->
<div id="content" class="portfolio-container">
    <header class="portfolio-header">
        <div class="brand">S. MONSTERS</div>
        <nav class="nav-links">
            <a href="#" class="stagger-item">ARCHIVE</a>
            <a href="#" class="stagger-item">STUDIO</a>
            <a href="#" class="stagger-item">INFO</a>
        </nav>
    </header>

    <main class="portfolio-hero">
        <span class="stagger-item subtitle-badge">// ARCHITECTURE & MOTION SYSTEM</span>
        <h1 class="stagger-item hero-title">ENGINEERING THE UNSEEN</h1>
        <p class="stagger-item hero-desc">
            A boutique visual experience prioritizing massive contrast ratios, stark serif hierarchies, and fluid, high-velocity GSAP letterbox easing.
        </p>
        
        <div class="stagger-item visual-showcase">
            <div class="showcase-line"></div>
            <div class="showcase-content">
                <span class="num">01 / STAGING</span>
                <span class="label">Scale Transition Core -- GSAP Power4.inOut</span>
            </div>
        </div>
        
        <button class="stagger-item action-btn" onclick="triggerGsapPreloader()">Replay Experience</button>
    </main>
</div>`;

  const cssMonochrome = `/* Premium High-Contrast Portfolio Reset */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: #000000; /* Stark black initially */
    overflow: hidden; /* Lock scroll during animation playback */
    color: #000000;
}

/* 1. Preloader Overlay Box covering viewport */
.preloader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000000; /* Starts Pitch Black */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

/* 2. Custom stark light-gray square anchor in dead-center */
.scaling-block {
    width: ${preloaderSize}px;
    height: ${preloaderSize}px;
    background-color: #F4F4F5; /* Stark light gray */
    border-radius: 4px; /* Crisp minimal border curves */
    transform-origin: center center;
    will-change: transform, border-radius;
}

/* 3. Portfolio Landing Page (Engulfed by scaled square background) */
.portfolio-container {
    opacity: 0;
    visibility: hidden;
    min-height: 100vh;
    background-color: #F4F4F5; /* Matches final block color perfectly */
    color: #000000;
    padding: 3rem 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

/* Typography & Layout styles */
.portfolio-header {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #000000;
    padding-bottom: 1.5rem;
}

.brand {
    font-weight: 700;
    font-size: 1.15rem;
    letter-spacing: -0.03em;
}

.nav-links a {
    color: #000000;
    text-decoration: none;
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    margin-left: 2rem;
    transition: opacity 0.25s;
}
.nav-links a:hover {
    opacity: 0.6;
}

.portfolio-hero {
    max-width: 900px;
    margin: 10vh auto;
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
}

.subtitle-badge {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    color: #52525B;
    margin-bottom: 1.5rem;
}

.hero-title {
    font-size: 4rem;
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 0.95;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
}

.hero-desc {
    font-size: 1.25rem;
    line-height: 1.5;
    color: #18181B;
    max-width: 650px;
    margin-bottom: 3.5rem;
}

/* Elegant high-contrast bento details line */
.visual-showcase {
    width: 100%;
    margin-bottom: 3rem;
}
.showcase-line {
    width: 100%;
    height: 1px;
    background-color: #000000;
    margin-bottom: 1rem;
}
.showcase-content {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    font-weight: 700;
}
.num {
    color: #71717A;
}

.action-btn {
    background-color: #000000;
    color: #F4F4F5;
    border: none;
    font-weight: 700;
    padding: 1.1rem 2.5rem;
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
    transition: transform 0.2s, bg 0.2s;
}
.action-btn:hover {
    background-color: #27272A;
    transform: translateY(-2px);
}

@media(max-width: 768px) {
    .hero-title {
        font-size: 2.5rem;
    }
}`;

  const jsMonochrome = `// Premium stark GSAP scale sequencing
function triggerGsapPreloader() {
    const preloader = document.getElementById('preloader');
    const loadingBlock = document.getElementById('loading-block');
    const content = document.getElementById('content');
    const staggerItems = document.querySelectorAll('.stagger-item');

    // 1. Lock screen scrolling
    document.body.style.overflow = 'hidden';
    
    // 2. Clear previous active styles safely
    gsap.set(content, { opacity: 0, visibility: 'hidden' });
    gsap.set(staggerItems, { opacity: 0, y: 30 });
    gsap.set(loadingBlock, { scale: 1, borderRadius: "4px" });
    gsap.set(preloader, { opacity: 1, display: 'flex' });

    // 3. Chain orchestrated timeline
    const tl = gsap.timeline({
        delay: ${triggerDelay / 1000} /* delay set in dashboard */
    });

    // Step A: Expansive scale-out covering whole screen
    tl.to(loadingBlock, {
        scale: 120, /* scales square to engulf viewport bounds */
        borderRadius: "0%", /* blends flawlessly as standard fullscreen canvas */
        duration: ${transitionDuration},
        ease: "power4.inOut" /* high-velocity extreme acceleration ease curve */
    });

    // Step B: Turn container visible just as the scale is almost finished
    tl.to(content, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.1,
    }, "-=0.15");

    // Step C: Premium staggered slide up of portfolio content typography
    tl.to(staggerItems, {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 1.2,
        ease: "power3.out",
        onComplete: () => {
            // Restore body scrolling accessibility
            document.body.style.overflow = 'auto';
            
            // Hide parent preloader container safely
            preloader.style.display = 'none';
        }
    }, "-=0.35");
}

window.addEventListener('load', () => {
    triggerGsapPreloader();
});`;

  // Filtered code output based on active tab
  const getActiveCode = () => {
    const isMono = preset === 'monochrome';
    const html = isMono ? htmlMonochrome : htmlColor;
    const css = isMono ? cssMonochrome : cssColor;
    const js = isMono ? jsMonochrome : jsColor;
    
    const inline = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${isMono ? 'Stark GSAP Preloader' : 'Scaling Block preloader'}</title>
    <style>
${css.split('\n').map(line => '        ' + line).join('\n')}
    </style>
</head>
<body>

${html.split('\n').map(line => '    ' + line).join('\n')}

    <script>
${js.split('\n').map(line => '        ' + line).join('\n')}
    </script>
</body>
</html>`;

    if (activeTab === 'html') return html;
    if (activeTab === 'css') return css;
    if (activeTab === 'js') return js;
    return inline;
  };

  const copyToClipboard = () => {
    const textToCopy = getActiveCode();
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Run simulated animation on triggers
  const triggerSimulation = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setSimPhase('loading');

    // Phase: Idle -> Loading (Wait for triggerDelay)
    setTimeout(() => {
      setSimPhase('exploding');

      // Phase: Exploding -> Trigger content reveal slightly before transition finishes (e.g., at 85% duration)
      setTimeout(() => {
        setSimPhase('contentReveal');

        // Phase: contentReveal -> Finished after slide-up staggered finishes
        setTimeout(() => {
          setSimPhase('finished');
        }, 1500);

      }, transitionDuration * 0.85 * 1000);

    }, triggerDelay);
  };

  const resetSimulation = () => {
    setIsPlaying(false);
    setSimPhase('idle');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md">
      
      {/* Sandbox Dashboard Box */}
      <motion.div 
        id="preload-sandbox"
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl h-full sm:h-[90vh] bg-[#fbfbfd] sm:rounded-3xl border border-gray-300 shadow-2xl overflow-hidden flex flex-col justify-between"
      >
        {/* Header Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center border border-black/10 text-neutral-800">
              <Sparkles size={16} />
            </div>
            <div>
              <h2 className="text-sm font-sans font-black text-gray-900 uppercase tracking-wider">
                Preloader Motion Architect
              </h2>
              <p className="text-[10px] font-mono text-gray-400">
                PROPORTIONAL PLAYGROUND FOR EXPANDING BLOCK TRANSITIONS
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-105 hover:bg-black hover:text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer border-none text-gray-600"
            title="Close Sandbox"
            id="close-sandbox-btn"
          >
            <X size={15} />
          </button>
        </div>

        {/* Dashboard Panels Layout */}
        <div className="grow overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Column (5/12): UI Configuration Playground Controls */}
          <div className="lg:col-span-5 border-r border-gray-200 bg-white p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              
              <div className="space-y-2 pb-4 border-b border-gray-100">
                <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-extrabold text-neutral-800 tracking-wider bg-neutral-100 px-2 py-0.5 rounded-full uppercase">
                  <Settings size={10} /> Mode Selection & Parameters
                </span>
                <p className="text-xs text-gray-500 leading-relaxed font-light">
                  Choose a preloader preset below to inspect the code structure. The code editor syncs instantly to your specifications.
                </p>
              </div>

              {/* STAGE PRESET SELECTOR */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] font-bold text-gray-550 uppercase tracking-wider block">
                  Design Presets
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setPreset('monochrome');
                      setPreloaderSize(44);
                      resetSimulation();
                    }}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-center transition-all cursor-pointer font-mono text-[10px] font-bold uppercase ${
                      preset === 'monochrome'
                        ? 'border-black bg-neutral-900 text-white shadow'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <Layers size={12} />
                    Monochrome GSAP
                  </button>
                  <button
                    onClick={() => {
                      setPreset('color');
                      setPreloaderSize(120);
                      resetSimulation();
                    }}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-center transition-all cursor-pointer font-mono text-[10px] font-bold uppercase ${
                      preset === 'color'
                        ? 'border-black bg-neutral-900 text-white shadow'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <Layout size={12} />
                    Logo Expansion
                  </button>
                </div>
              </div>

              {/* Dynamic Specific Notice (visible on logo mode vs GSAP) */}
              {preset === 'color' ? (
                <div className="p-4 rounded-2xl bg-black text-white border border-neutral-800 flex gap-3 items-center animate-fadeIn">
                  <Info size={16} className="text-zinc-400 shrink-0" />
                  <div className="space-y-0.5">
                    <p className="font-mono text-[10.5px] font-bold uppercase tracking-tight text-white">Logo Scale Active</p>
                    <p className="text-[10px] text-zinc-450 leading-normal font-light">Central image element scales exponentially on pitch-black background (#000000) using custom CSS3 bezier ramps.</p>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-black/5 text-[#000000] border border-black/5 flex gap-3 items-center">
                  <Info size={16} className="text-neutral-500 shrink-0" />
                  <div className="space-y-0.5">
                    <p className="font-mono text-[10.5px] font-bold uppercase tracking-tight">GSAP Preset Anchor Locked</p>
                    <p className="text-[10px] text-gray-500 leading-normal font-light">Stark Pitch Black (#000000) backdrop and Light Gray (#F4F4F5) focal square represent pristine Swiss layout guidelines.</p>
                  </div>
                </div>
              )}

              {/* Sliders parameters */}
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                      {preset === 'color' ? `Initial Logo Width (${preloaderSize}px)` : `Seed Square Size (${preloaderSize}px)`}
                    </label>
                    <span className="font-mono text-[9px] text-gray-400">{preset === 'color' ? 'Initial width' : 'Anchor width'}</span>
                  </div>
                  <input 
                    type="range"
                    min="15"
                    max="120"
                    value={preloaderSize}
                    onChange={(e) => setPreloaderSize(Number(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                      Movement Duration ({transitionDuration}s)
                    </label>
                    <span className="font-mono text-[9px] text-neutral-800 font-bold">
                      {preset === 'monochrome' ? 'gsap power4.inOut' : 'cubic-bezier(0.85,0,0.15,1)'}
                    </span>
                  </div>
                  <input 
                    type="range"
                    min="0.6"
                    max="3.0"
                    step="0.1"
                    value={transitionDuration}
                    onChange={(e) => setTransitionDuration(Number(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
                      Simulated delay ({triggerDelay}ms)
                    </label>
                    <span className="font-mono text-[9px] text-gray-400">Wait for load</span>
                  </div>
                  <input 
                    type="range"
                    min="200"
                    max="2500"
                    step="100"
                    value={triggerDelay}
                    onChange={(e) => setTriggerDelay(Number(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                </div>
              </div>

              {/* Technical Specifications explanation box */}
              <div className="bg-neutral-50 rounded-2xl border border-gray-150 p-4 space-y-2.5">
                <span className="flex items-center gap-1.5 font-mono text-[9.5px] font-semibold text-gray-650 uppercase">
                  <BookOpen size={11} /> Motion Specs & Physics:
                </span>
                <p className="text-[10px] text-gray-500 leading-relaxed font-light">
                  {preset === 'monochrome' ? (
                    <span>By utilizing GSAP's <code className="font-mono font-bold text-black text-[9.5px]">"power4.inOut"</code>, the square stays slow and heavy for 40% of the duration, creating anticipation, before smoothly accelerating exponentially to occupy the layout. The content is then rendered sequentially using an offset stagger timeline.</span>
                  ) : (
                    <span>This CSS3 transition uses an advanced <code className="font-mono font-bold text-black text-[9.5px]">cubic-bezier(0.85, 0, 0.15, 1)</code> curve. Performance is maximized by utilizing GPU-accelerated <code className="font-mono font-bold text-black text-[9.5px]">transform: scale(100)</code> with <code className="font-mono font-bold text-black text-[9.5px]">will-change</code> flags to prevent frame skips on high DPI screens.</span>
                  )}
                </p>
              </div>

            </div>

            {/* Run Live Action Buttons */}
            <div className="pt-6 shrink-0 space-y-2">
              <button
                onClick={triggerSimulation}
                disabled={isPlaying}
                className="w-full flex items-center justify-center gap-2.5 bg-black hover:bg-neutral-900 disabled:bg-neutral-100 text-white disabled:text-gray-400 font-mono text-xs font-bold uppercase tracking-widest py-3.5 px-6 rounded-xl cursor-pointer disabled:cursor-not-allowed shadow transition-colors"
                title="Simulate Transition"
                id="simulate-transition-btn"
              >
                <Play className="fill-current" size={13} />
                PLAY SEQUENTIAL MOTION
              </button>
              
              {isPlaying && (
                <button
                  onClick={resetSimulation}
                  className="w-full flex items-center justify-center gap-2.5 bg-white border border-gray-250 hover:bg-neutral-50 text-gray-700 font-mono text-xs font-bold uppercase tracking-widest py-3 px-6 rounded-xl cursor-pointer transition-colors"
                  title="Reset Sandbox Block"
                  id="reset-sandbox-btn"
                >
                  <RotateCcw size={13} />
                  Reset Timeline State
                </button>
              )}
            </div>
          </div>

          {/* Right Column (7/12): Code View / Interactive Simulation Screen tabs */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#0f0f11] text-gray-100 overflow-hidden relative">
            
            {/* Top Code Tabs Selector */}
            <div className="bg-[#161619] border-b border-white/5 px-6 py-3 flex items-center justify-between shrink-0">
              <div className="flex gap-2">
                {[
                  { id: 'all', label: 'COMBINED SPEC' },
                  { id: 'html', label: 'index.html' },
                  { id: 'css', label: 'styles.css' },
                  { id: 'js', label: preset === 'monochrome' ? 'gsap.js' : 'app.js' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-[9.5px] font-bold tracking-wider uppercase transition-all cursor-pointer border-none ${
                      activeTab === tab.id
                        ? 'bg-neutral-800 text-white shadow-inner'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Copy Spec Button */}
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 py-1.5 px-3 bg-neutral-800 hover:bg-neutral-700 text-gray-300 hover:text-white font-mono text-[9px] font-bold rounded-lg border border-white/5 cursor-pointer select-none transition-colors"
                title="Copy Source Code"
                id="copy-code-btn"
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-emerald-400" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={12} /> Copy Code
                  </>
                )}
              </button>
            </div>

            {/* Code Body Area wrapper */}
            <div className="grow overflow-auto p-6 font-mono text-[10.5px] leading-relaxed text-neutral-300 relative select-text">
              <pre className="whitespace-pre overflow-x-auto selection:bg-[#4CAF50]/30 selection:text-white">
                {getActiveCode()}
              </pre>
            </div>

            {/* Bottom Status panel */}
            <div className="bg-[#161619] border-t border-white/5 px-6 py-3 flex items-center justify-between shrink-0 font-mono text-[9px] text-neutral-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                GSAP 3 // {preset === 'monochrome' ? 'High-Contrast Active' : 'Color Block Active'}
              </span>
              <span>100% Mobile Responsive Easing Grid</span>
            </div>

            {/* Embedded HTML/CSS Simulation Overlay */}
            <AnimatePresence>
              {isPlaying && simPhase !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 z-40 overflow-hidden select-none"
                  style={{ 
                    fontFamily: preset === 'monochrome' ? '"Space Grotesk", sans-serif' : '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    backgroundColor: preset === 'color' ? '#000000' : '#050505'
                  }}
                >
                  {/* Preloader Overlay Screen (Starts at Stark Pitch Black for Monochrome or White for Color) */}
                  {simPhase !== 'finished' && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center z-50 transition-opacity duration-300"
                      style={{ 
                        opacity: simPhase === 'contentReveal' ? 0 : 1,
                        backgroundColor: preset === 'color' ? '#FFFFFF' : '#050505'
                      }}
                    >
                      {/* Central Small Focal Element (Image vs Square) */}
                      {preset === 'color' ? (
                        <div 
                          className="transition-all ease-in-out flex items-center justify-center"
                          style={{
                            width: `${preloaderSize}px`,
                            height: `${preloaderSize}px`,
                            transformOrigin: 'center center',
                            transform: simPhase === 'exploding' || simPhase === 'contentReveal'
                              ? 'scale(100)'
                              : 'scale(1)',
                            opacity: 1, // Keep fully opaque so it grows to cover the white background entirely
                            transition: `transform ${transitionDuration}s cubic-bezier(0.85, 0, 0.15, 1)`
                          }}
                        >
                          <img 
                            src={renderImgUrl}
                            alt="Logo Focus"
                            className="w-full h-auto object-contain select-none"
                            onError={(e) => {
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
                      ) : (
                        <div 
                          id="sandbox-scale-square"
                          className="transition-all duration-1000 ease-in-out"
                          style={{
                            width: `44px`,
                            height: `44px`,
                            backgroundColor: '#F4F4F5',
                            transformOrigin: 'center center',
                            transform: simPhase === 'exploding' || simPhase === 'contentReveal'
                              ? 'scale(100)'
                              : 'scale(1)',
                            borderRadius: simPhase === 'exploding' || simPhase === 'contentReveal'
                              ? '0%'
                              : '8px',
                            transition: `transform ${transitionDuration}s cubic-bezier(0.85, 0, 0.15, 1), border-radius ${transitionDuration * 0.7}s cubic-bezier(0.85, 0, 0.15, 1)`
                          }}
                        />
                      )}

                      {/* Technical visualization indicators */}
                      <div className="absolute top-6 left-6 font-mono text-[9px] text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse" />
                        STAGING // {simPhase.toUpperCase()}
                      </div>
                      <div className="absolute bottom-6 font-mono text-[9px] text-zinc-500">
                        {preset === 'monochrome' ? 'GSAP power4.inOut - lock overflow' : 'CSS3 cubic-bezier(0.85,0,0.15,1)'}
                      </div>
                    </div>
                  )}

                  {/* Main PORTFOLIO Landing Page Content */}
                  {preset === 'monochrome' ? (
                    <div 
                      className="w-full h-full text-black p-6 sm:p-12 transition-all duration-1000 flex flex-col justify-between overflow-y-auto"
                      style={{
                        backgroundColor: '#F4F4F5',
                        opacity: simPhase === 'contentReveal' || simPhase === 'finished' ? 1 : 0,
                        transform: simPhase === 'contentReveal' || simPhase === 'finished' ? 'translateY(0)' : 'translateY(24px)',
                        transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        minHeight: '100%'
                      }}
                    >
                      {/* Port Header */}
                      <div className="flex justify-between items-center max-w-4xl mx-auto w-full py-4 border-b border-black">
                        <span className="font-extrabold tracking-tight text-xs uppercase text-black">S. MONSTERS</span>
                        <div className="flex gap-4 font-mono text-[10px] text-black">
                          <span>ARCHIVE</span>
                          <span>STUDIO</span>
                          <span>INFO</span>
                        </div>
                      </div>

                      {/* Port Hero */}
                      <div className="max-w-xl mx-auto w-full text-left space-y-6 my-auto pt-6 pb-12">
                        <span className="inline-block font-mono text-[9px] font-bold text-gray-550 uppercase tracking-widest">
                          // DESIGN SYSTEM WORKSPACE ACTIVE
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none uppercase text-black">
                          ENGINEERING<br />THE UNSEEN
                        </h1>
                        <p className="text-zinc-800 text-xs sm:text-sm leading-relaxed max-w-lg">
                          A boutique visual experience prioritizing massive contrast ratios, stark typography hierarchies, and fluid, high-velocity GSAP letterbox transitions.
                        </p>

                        {/* Interactive Line block */}
                        <div className="w-full pt-4">
                          <div className="w-full h-[1px] bg-black mb-3" />
                          <div className="flex justify-between items-center font-mono text-[9px] text-[#000000] uppercase font-bold">
                            <span>01 / TRANSITION SPEC</span>
                            <span>COMPLETED OK</span>
                          </div>
                        </div>

                        {/* Replay Option */}
                        <div className="flex items-center gap-3 pt-4">
                          <button
                            onClick={triggerSimulation}
                            disabled={simPhase !== 'finished'}
                            className="px-5 py-2.5 bg-black hover:bg-neutral-950 text-white rounded font-mono text-[9px] font-bold tracking-wider uppercase disabled:opacity-50 border-none cursor-pointer"
                          >
                            Replay Experience
                          </button>
                          <button
                            onClick={resetSimulation}
                            className="px-5 py-2.5 bg-neutral-200 hover:bg-neutral-300 text-black rounded font-mono text-[9px] font-bold tracking-wider uppercase border-none cursor-pointer"
                          >
                            Close Demo
                          </button>
                        </div>
                      </div>

                      {/* Simulation info */}
                      <div className="max-w-4xl mx-auto w-full border-t border-gray-300 pt-4 flex justify-between items-center font-mono text-[8px] text-gray-550">
                        <span>GSAP 3.12.2 // ACTIVE</span>
                        <span>STAG_ITEM: FULLY REVEALED</span>
                      </div>

                    </div>
                  ) : (
                    <div 
                      className="w-full h-full text-white p-6 sm:p-12 transition-all duration-1000 flex flex-col justify-between overflow-y-auto"
                      style={{
                        backgroundColor: '#000000',
                        opacity: simPhase === 'contentReveal' || simPhase === 'finished' ? 1 : 0,
                        transform: simPhase === 'contentReveal' || simPhase === 'finished' ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1), transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
                        minHeight: '100%'
                      }}
                    >
                      <div className="flex justify-between items-center max-w-4xl mx-auto w-full py-4 border-b border-white/10">
                        <span className="font-extrabold tracking-tight text-xs uppercase text-white">PORTFOLIO DECO</span>
                        <div className="flex gap-4 font-mono text-[10px] text-zinc-400">
                          <span className="text-white font-semibold">WORK</span>
                          <span>ABOUT</span>
                          <span>CONTACT</span>
                        </div>
                      </div>

                      <div className="max-w-xl mx-auto w-full text-center space-y-6 my-auto pt-6 pb-12">
                        <span className="inline-block bg-white/10 text-[9px] font-mono font-bold tracking-wide uppercase px-3 py-1 rounded-full text-white">
                          Cinematic Portal Active
                        </span>
                        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none uppercase text-white">
                          A New Era of Digital Motion
                        </h1>
                        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-normal">
                          Notice how the page content slides in with a subtle y-offset and opacity fade right as the central logo image bursts exponentially.
                        </p>

                        {/* Mockup Frame */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-sm">
                          <div className="flex gap-1.5 mb-3">
                            <span className="w-2 h-2 rounded-full bg-zinc-650" />
                            <span className="w-2 h-2 rounded-full bg-zinc-500" />
                            <span className="w-2 h-2 rounded-full bg-zinc-450" />
                          </div>
                          <div className="grid grid-cols-2 gap-3 pt-2">
                            <div className="h-14 bg-white/5 rounded-lg border border-white/5 flex items-center justify-center font-mono text-[9px] text-white/60 font-bold">GRID_A</div>
                            <div className="h-14 bg-white/10 rounded-lg border border-white/10 flex items-center justify-center font-mono text-[9px] text-white/80 font-bold">GRID_B</div>
                          </div>
                        </div>

                        {/* Test Reset Controls */}
                        <div className="flex items-center gap-3 justify-center pt-2">
                          <button
                            onClick={triggerSimulation}
                            disabled={simPhase !== 'finished'}
                            className="px-5 py-2.5 bg-white text-black hover:bg-zinc-150 rounded font-mono text-[9px] font-bold tracking-wider uppercase shadow cursor-pointer border-none disabled:opacity-50"
                          >
                            Replay Animation
                          </button>
                          <button
                            onClick={resetSimulation}
                            className="px-5 py-2.5 bg-zinc-900 text-white hover:bg-zinc-850 rounded font-mono text-[9px] font-bold tracking-wider uppercase border border-zinc-800 cursor-pointer"
                          >
                            Exit Demo Sandbox
                          </button>
                        </div>
                      </div>

                      <div className="max-w-4xl mx-auto w-full border-t border-white/10 pt-4 flex justify-between items-center font-mono text-[8px] text-zinc-550 font-bold">
                        <span>FPS 60.00 // CALIBRATED</span>
                        <span>REF_ID: LOGO_EXPAND_RAMP</span>
                      </div>

                    </div>
                  )}

                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </motion.div>

    </div>
  );
}
