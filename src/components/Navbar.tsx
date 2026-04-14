import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, FileText } from 'lucide-react';
import { NAV_LINKS, SOCIAL_LINKS } from '../constants/data';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-300 border-b h-[70px] flex items-center",
        isScrolled 
          ? "bg-slate-green-deep/85 backdrop-blur-md border-khaki/20 animate-glow-pulse" 
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-[60px] flex items-center justify-between w-full">
        {/* Logo */}
        <motion.a
          href="#hero"
          className="flex items-center gap-3 group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full fill-none stroke-khaki stroke-[4]">
              <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" />
            </svg>
            <span className="text-khaki font-bold text-lg">AG</span>
          </div>
          <span className="text-khaki font-semibold text-lg hidden sm:block">Anshu Gupta</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-mint hover:text-khaki transition-colors relative group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.2, y: -2 }}
              data-tooltip={link.name}
            >
              <link.icon size={20} />
            </motion.a>
          ))}
          <div className="w-px h-6 bg-khaki/20 mx-2" />
          {SOCIAL_LINKS.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mint hover:text-khaki transition-colors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (NAV_LINKS.length + i) * 0.1 }}
              whileHover={{ scale: 1.2, y: -2 }}
              data-tooltip={link.name}
            >
              <link.icon size={20} />
            </motion.a>
          ))}
          <motion.a
            href="#"
            className="text-mint hover:text-khaki transition-colors"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (NAV_LINKS.length + SOCIAL_LINKS.length) * 0.1 }}
            whileHover={{ scale: 1.2, y: -2 }}
            data-tooltip="Resume"
          >
            <FileText size={20} />
          </motion.a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-khaki p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-green-deep border-b border-khaki/20 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-mint hover:text-khaki flex items-center gap-3 text-lg py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <link.icon size={20} />
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-khaki/20 w-full my-2" />
              <div className="flex gap-6 justify-center">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mint hover:text-khaki"
                  >
                    <link.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
