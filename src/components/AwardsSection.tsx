import React from 'react';
import { motion } from 'framer-motion';
import { AWARDS } from '../data/portfolioData';
import { sound } from '../utils/soundEffects';

export const AwardsSection: React.FC = () => {
  return (
    <section id="awards" className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto aathif-border-t">
      
      {/* Top Monospace Section Header Bar (Exact Aathif layout) */}
      <div className="flex items-center justify-between pb-8 sm:pb-12 text-slate-500 font-mono text-xs uppercase tracking-widest border-b border-[#1c1c1c] mb-16 sm:mb-20">
        <span className="text-white font-bold">08</span>
        <span className="text-sky-400 font-medium">//AWARDS</span>
        <span>RECOGNITION</span>
      </div>

      <h2 className="font-clash text-4xl sm:text-6xl md:text-7xl text-white font-semibold tracking-tight uppercase mb-16 sm:mb-20">
        Achievements
      </h2>

      {/* Awards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {AWARDS.map((award, idx) => (
          <motion.div
            key={award.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onMouseEnter={() => sound.playHover()}
            className="aathif-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between group cursor-default"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="font-mono text-xs font-semibold text-sky-400 uppercase tracking-widest">
                  {award.badge}
                </span>
                <span className="font-mono text-xs text-slate-500">
                  {award.date}
                </span>
              </div>

              <h3 className="font-clash text-2xl sm:text-3xl text-white font-semibold group-hover:text-sky-300 transition-colors mb-2 uppercase">
                {award.title}
              </h3>

              <p className="font-mono text-xs text-slate-400 mb-4">
                {award.issuer}
              </p>
            </div>

            <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed pt-4 border-t border-[#1a1a1a]">
              {award.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
