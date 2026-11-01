import React from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/soundEffects';

interface Phase {
  num: string;
  title: string;
  description: string;
}

const PHASES: Phase[] = [
  {
    num: '01',
    title: 'Discover and Analysis',
    description: 'Discover opportunities, analyze edge bottlenecks, and refine strategies for scalable architectural decisions.'
  },
  {
    num: '02',
    title: 'Design and Implement',
    description: 'Design and implement resilient microservices, low-latency telemetry pipelines, and modern web/mobile interfaces.'
  },
  {
    num: '03',
    title: 'Deliver and Monitor',
    description: 'Ensure 99.8% uptime, sub-200ms real-time event streaming, automated CI/CD, and production security observability.'
  }
];

export const ApproachSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto aathif-border-t">
      
      {/* Top Monospace Section Header Bar (Exact Aathif layout) */}
      <div className="flex items-center justify-between pb-8 sm:pb-12 text-slate-500 font-mono text-xs uppercase tracking-widest border-b border-[#1c1c1c] mb-16 sm:mb-20">
        <span className="text-white font-bold">01</span>
        <span className="text-sky-400 font-medium">//APPROACH</span>
        <span>THREE PHASES</span>
      </div>

      {/* Centered Large Title */}
      <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-clash text-4xl sm:text-6xl md:text-7xl text-white font-semibold uppercase tracking-tight leading-[1.05] mb-6"
        >
          I'M MANIKANTH PANUGANTI BASED IN HYDERABAD.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-sans text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed"
        >
          I employed software and systems engineering skills to build scalable, low-latency, and reliable applications.
        </motion.p>
      </div>

      {/* 3-Step Connecting Timeline (01 —— 02 —— 03) */}
      <div className="max-w-3xl mx-auto mb-16 sm:mb-20 relative">
        {/* Connecting line */}
        <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-[1px] bg-[#222] pointer-events-none" />

        <div className="flex items-center justify-between relative z-10 px-4">
          {['01', '02', '03'].map((step, idx) => (
            <motion.div
              key={step}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#121212] border border-[#2e2e2e] flex items-center justify-center font-mono text-xs sm:text-sm text-slate-300 shadow-lg"
            >
              {step}
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3 Phase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {PHASES.map((phase, idx) => (
          <motion.div
            key={phase.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
            onMouseEnter={() => sound.playHover()}
            className="aathif-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between group cursor-default"
          >
            <div>
              <span className="block font-mono text-xs text-slate-500 group-hover:text-sky-400 transition-colors font-medium mb-6">
                {phase.num}
              </span>

              <h3 className="font-clash text-2xl sm:text-3xl text-white font-semibold mb-3 group-hover:text-sky-300 transition-colors">
                {phase.title}
              </h3>
            </div>

            <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed pt-4 border-t border-[#1a1a1a]">
              {phase.description}
            </p>
          </motion.div>
        ))}
      </div>

    </section>
  );
};
