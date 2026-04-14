import { motion } from 'motion/react';
import { SOCIAL_LINKS, NAV_LINKS } from '../constants/data';

export default function Footer() {
  return (
    <footer className="bg-slate-green-deep border-t border-khaki/15 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full fill-none stroke-khaki stroke-[4]">
                <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" />
              </svg>
              <span className="text-khaki font-bold text-lg">AG</span>
            </div>
            <span className="text-khaki font-semibold text-lg">Anshu Gupta</span>
          </a>

          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-mint hover:text-khaki transition-colors text-sm font-medium uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex gap-6">
            {SOCIAL_LINKS.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -4 }}
                className="w-10 h-10 rounded-full bg-slate-green-mid/30 border border-khaki/20 flex items-center justify-center text-mint hover:text-khaki hover:border-khaki/50 hover:shadow-[0_0_15px_rgba(242,183,89,0.3)] transition-all"
              >
                <link.icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-mint font-medium flex items-center justify-center gap-2">
            Powered by Anshu <span className="text-red-500 animate-[heartbeat_1.5s_ease-in-out_infinite]">❤️</span>
          </p>
          <p className="text-mint/40 text-xs tracking-widest uppercase">
            © 2025 Anshu Gupta. Built with React & ❤️ in Kathmandu 🏔️
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}} />
    </footer>
  );
}
