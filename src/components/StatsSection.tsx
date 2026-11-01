import React from 'react';
import { motion } from 'framer-motion';
import { sound } from '../utils/soundEffects';

interface StatItem {
  number: string;
  label: string;
  sublabel: string;
}

const STATS: StatItem[] = [
  {
    number: '1,500+',
    label: 'USERS SERVED',
    sublabel: 'Active students on Hubverse platform'
  },
  {
    number: '0.2s',
    label: 'SOS LATENCY',
    sublabel: 'Sub-200ms worker IoT telemetry stream'
  },
  {
    number: '8.99',
    label: 'ACADEMIC CGPA',
    sublabel: 'B.Tech Computer Science at VNR VJIET'
  },
  {
    number: '15+',
    label: 'CVES SECURED',
    sublabel: 'Linux servers fortified & patched'
  }
];

export const StatsSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto aathif-border-t">
      
      {/* Top Monospace Section Header Bar (Exact Aathif layout) */}
      <div className="flex items-center justify-between pb-8 sm:pb-12 text-slate-500 font-mono text-xs uppercase tracking-widest border-b border-[#1c1c1c] mb-16 sm:mb-20">
        <span className="text-white font-bold">06</span>
        <span className="text-sky-400 font-medium">//STATS</span>
        <span>FUN FACTS</span>
      </div>

      {/* 4 Minimalist Metric Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onMouseEnter={() => sound.playHover()}
            className="aathif-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between group cursor-default"
          >
            <span className="font-clash text-4xl sm:text-5xl md:text-6xl text-white font-semibold tracking-tight group-hover:text-sky-300 transition-colors mb-6 block">
              {stat.number}
            </span>

            <div>
              <span className="block font-mono text-xs text-white font-medium uppercase tracking-wider mb-1">
                {stat.label}
              </span>
              <p className="font-sans text-xs text-slate-500">
                {stat.sublabel}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
