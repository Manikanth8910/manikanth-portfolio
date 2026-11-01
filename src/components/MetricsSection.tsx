import React from 'react';
import { motion } from 'framer-motion';
import { Users, Server, Radio, Eye, ShieldCheck, Award } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface MetricItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  subtext: string;
  color: string;
  glow: string;
}

const METRICS: MetricItem[] = [
  {
    icon: <Users className="w-5 h-5" />,
    value: '1,500+',
    label: 'Campus Students',
    subtext: 'Across 20+ clubs via Hubverse platform',
    color: 'from-sky-400 to-blue-600',
    glow: 'rgba(56, 189, 248, 0.25)',
  },
  {
    icon: <Server className="w-5 h-5" />,
    value: '99.8%',
    label: 'Production Uptime',
    subtext: '10+ microservices & 3 live institute sites',
    color: 'from-emerald-400 to-teal-600',
    glow: 'rgba(52, 211, 153, 0.25)',
  },
  {
    icon: <Radio className="w-5 h-5" />,
    value: '<200ms',
    label: 'IoT SOS Latency',
    subtext: 'Real-time telemetry on JARSH platform',
    color: 'from-rose-400 to-amber-500',
    glow: 'rgba(244, 63, 94, 0.25)',
  },
  {
    icon: <Eye className="w-5 h-5" />,
    value: '94%',
    label: 'YOLOv11 Accuracy',
    subtext: 'Edge vehicle detection at 30 FPS',
    color: 'from-violet-400 to-purple-600',
    glow: 'rgba(139, 92, 246, 0.25)',
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    value: '15+',
    label: 'Vulnerabilities Remediated',
    subtext: 'VAPT & firewall hardening across Linux nodes',
    color: 'from-cyan-400 to-indigo-500',
    glow: 'rgba(6, 182, 212, 0.25)',
  },
  {
    icon: <Award className="w-5 h-5" />,
    value: '4+',
    label: 'Hackathon Finalists',
    subtext: 'IIT Tirupati E-Summit, Webathon, Echo, SPL',
    color: 'from-amber-400 to-orange-500',
    glow: 'rgba(245, 158, 11, 0.25)',
  },
];

export const MetricsSection: React.FC = () => {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto relative z-10">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-mono uppercase tracking-widest text-sky-400 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20"
        >
          Measurable Engineering Impact
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-3"
        >
          Systems Engineered for High Scale & Zero Downtime
        </motion.h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {METRICS.map((metric, idx) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            whileHover={{ y: -6, scale: 1.02 }}
            onMouseEnter={() => sound.playHover()}
            className="group relative p-4 sm:p-5 rounded-2xl glass-panel border border-white/5 hover:border-sky-500/30 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg"
          >
            {/* Ambient Corner Glow on hover */}
            <div
              className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ backgroundColor: metric.glow }}
            />

            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-xl bg-slate-900/80 border border-white/5 text-slate-300 group-hover:text-white group-hover:border-sky-500/30 transition-colors">
                {metric.icon}
              </div>
            </div>

            <div>
              <div className={`font-display text-2xl sm:text-3xl font-extrabold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                {metric.value}
              </div>
              <div className="font-semibold text-xs sm:text-sm text-slate-200 mt-1">
                {metric.label}
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                {metric.subtext}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
