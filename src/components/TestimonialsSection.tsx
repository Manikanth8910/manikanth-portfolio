import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../data/portfolioData';
import { sound } from '../utils/soundEffects';

export const TestimonialsSection: React.FC = () => {
  const marqueeList = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-24 sm:py-32 aathif-border-t overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-16 sm:mb-20">
        
        {/* Top Monospace Section Header Bar (Exact Aathif layout) */}
        <div className="flex items-center justify-between pb-8 sm:pb-12 text-slate-500 font-mono text-xs uppercase tracking-widest border-b border-[#1c1c1c] mb-16 sm:mb-20">
          <span className="text-white font-bold">011</span>
          <span className="text-sky-400 font-medium">//TESTIMONIAL</span>
          <span>VOICES</span>
        </div>

        <h2 className="font-clash text-4xl sm:text-6xl md:text-7xl text-white font-semibold tracking-tight uppercase">
          Trusted By Teams
        </h2>
      </div>

      {/* Infinite Marquee Strip */}
      <div className="relative w-full overflow-hidden select-none">
        
        {/* Left & Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-left flex gap-6 sm:gap-8 px-4">
          {marqueeList.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sound.playHover()}
              className="aathif-card w-80 sm:w-[420px] shrink-0 p-6 sm:p-8 rounded-3xl flex flex-col justify-between"
            >
              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed mb-6 italic">
                "{item.quote}"
              </p>

              <div className="pt-4 border-t border-[#1a1a1a]">
                <h4 className="font-clash text-lg text-white font-semibold">
                  {item.author}
                </h4>
                <p className="font-mono text-xs text-slate-400 mt-0.5">
                  {item.role}, <span className="text-slate-300">{item.company}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
