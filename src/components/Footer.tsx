import React from 'react';
import { ArrowUp, Terminal, Heart, Code2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/soundEffects';

interface FooterProps {
  onOpenTerminal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal }) => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#04060b] py-12 px-4 z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Status */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-mono font-bold text-sm shadow-md shadow-sky-500/20">
            MP
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-display font-bold text-sm text-white">
                {PERSONAL_INFO.name}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                Active Builder
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Hyderabad, India • Engineering robust full-stack & low-latency systems.
            </p>
          </div>
        </div>

        {/* Center: Interactive CLI Trigger */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenTerminal();
          }}
          onMouseEnter={() => sound.playHover()}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-xs font-mono text-sky-400 border border-sky-500/30 transition-colors"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Launch CLI Terminal</span>
        </button>

        {/* Right: Back to top */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            © {new Date().getFullYear()} Manikanth Panuganti
          </span>
          <button
            onClick={scrollToTop}
            onMouseEnter={() => sound.playHover()}
            title="Back to Top"
            className="p-2.5 rounded-xl bg-surface-100 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/5 hover:border-sky-500/30 transition-all hover:-translate-y-1 active:scale-95"
          >
            <ArrowUp className="w-4 h-4 text-sky-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
