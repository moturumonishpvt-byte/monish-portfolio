import { useState, useEffect, MouseEvent } from 'react';
import { Menu, X, Github, Linkedin, MessageSquareCode } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolioContent } from '../context/PortfolioContentContext';

interface HeaderProps {
  onOpenInbox: () => void;
  onNavigateToSection: (id: string) => void;
}

export default function Header({ onOpenInbox, onNavigateToSection }: HeaderProps) {
  const { content } = usePortfolioContent();
  const { personalInfo } = content;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Journey', href: '#journey' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Hackathons', href: '#hackathons' },
    { name: 'Experience', href: '#experience' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigateToSection(href.replace('#', ''));
  };

  return (
    <>
      <header
        className={`fixed z-50 transition-all duration-300 ${
          scrolled
            ? 'top-4 left-4 right-4 md:left-6 md:right-auto md:max-w-max bg-white/95 backdrop-blur-md border border-gray-200 shadow-lg'
            : 'top-6 left-6 right-6 md:left-8 md:right-auto md:max-w-max bg-white/90 backdrop-blur-md border border-gray-150 shadow-sm'
        } rounded-2xl md:rounded-full py-3 px-5`}
      >
        <div className="flex justify-between md:justify-start items-center gap-6">
          {/* Logo / Initials */}
          <motion.a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 group cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-9 h-9 rounded-full bg-white border-2 border-black overflow-hidden flex items-center justify-center p-0.5 transition-transform duration-200 group-hover:scale-105 shadow-sm">
              <img 
                src="https://drive.google.com/thumbnail?id=1d_oXIENF-6sWFUX98gX7-gUo4F52z9iZ&sz=w150" 
                alt="MM Logo"
                className="w-full h-full rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.a>

          {/* Desktop Navigation links inside Pill */}
          <nav className="hidden md:flex items-center gap-5">
            <ul className="flex items-center gap-5 text-xs font-mono font-bold tracking-wider text-gray-500 uppercase">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="hover:text-black transition-colors py-1 relative block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="h-3 w-px bg-gray-200" />

            <div className="flex items-center gap-3">
              <a
                href={personalInfo.github}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noreferrer"
                className="text-gray-400 hover:text-black transition-colors"
                aria-label="GitHub Profile"
              >
                <Github size={15} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={15} />
              </a>
              <button
                onClick={onOpenInbox}
                className="text-[10px] font-mono font-bold uppercase bg-neutral-100 hover:bg-black hover:text-white text-gray-850 px-2.5 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer"
              >
                <MessageSquareCode size={11} />
                Portal
              </button>
            </div>
          </nav>

          {/* Mobile Menu Action */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenInbox}
              className="text-[10px] font-mono font-bold bg-gray-100 text-gray-850 px-2.5 py-1.5 rounded-full flex items-center gap-1"
            >
              <MessageSquareCode size={11} />
              Portal
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-black p-1"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-xs md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl p-8 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-8">
                <div className="flex justify-between items-center pb-6 border-b border-gray-100">
                  <span className="font-mono font-extrabold tracking-wider bg-black text-white px-2.5 py-0.5 rounded text-sm">
                    NAVIGATION
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-400 hover:text-black"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav>
                  <ul className="space-y-6 text-lg font-medium text-gray-800">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className="hover:text-black transition-colors block py-1"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="space-y-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-6 justify-center">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noreferrer"
                    className="text-gray-500 hover:text-black"
                  >
                    <Github size={22} />
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noreferrer"
                    className="text-gray-500 hover:text-blue-600"
                  >
                    <Linkedin size={22} />
                  </a>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 font-mono">
                    {personalInfo.email}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
