import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Server, 
  Radio, 
  ShieldCheck, 
  Cpu, 
  RefreshCw, 
  Wifi, 
  Zap,
  CheckCircle2
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface ServiceNode {
  name: string;
  subtext: string;
  baseLatency: number;
  protocol: string;
  uptime: string;
  status: 'Operational' | 'Optimal' | 'Secured';
}

const SERVICES: ServiceNode[] = [
  {
    name: 'Hubverse API Gateway',
    subtext: 'Express REST & SQLite WAL Concurrency',
    baseLatency: 18,
    protocol: 'HTTP/2 • JWT',
    uptime: '99.8%',
    status: 'Operational',
  },
  {
    name: 'JARSH Industrial IoT Broker',
    subtext: 'EMQX Distributed MQTT Telemetry',
    baseLatency: 38,
    protocol: 'MQTT / WSS',
    uptime: '99.9%',
    status: 'Optimal',
  },
  {
    name: 'YOLOv11 Vision Edge Node',
    subtext: 'Edge Vehicle Stream Detection (30 FPS)',
    baseLatency: 33,
    protocol: 'RTSP • OpenCV',
    uptime: '99.7%',
    status: 'Optimal',
  },
  {
    name: 'ApplyPilot Orchestrator',
    subtext: 'Autonomous Playwright Execution Engine',
    baseLatency: 22,
    protocol: 'AsyncIO • Python',
    uptime: '100%',
    status: 'Operational',
  },
  {
    name: 'VJStartup Linux Security Grid',
    subtext: '5 Fortified Ubuntu Production Nodes',
    baseLatency: 12,
    protocol: 'SSH / UFW / VAPT',
    uptime: '99.9%',
    status: 'Secured',
  }
];

export const SystemTelemetry: React.FC = () => {
  const [latencies, setLatencies] = useState<number[]>(SERVICES.map(s => s.baseLatency));
  const [isPinging, setIsPinging] = useState(false);
  const [lastPingTime, setLastPingTime] = useState<string>('Just now');

  // Periodic subtle latency jitter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLatencies(SERVICES.map(s => s.baseLatency + Math.floor((Math.random() - 0.5) * 6)));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleRunPingTest = () => {
    sound.playClick();
    sound.playScouterBeep();
    setIsPinging(true);

    setTimeout(() => {
      setLatencies(SERVICES.map(s => s.baseLatency + Math.floor((Math.random() - 0.5) * 4)));
      setIsPinging(false);
      sound.playSuccess();
      setLastPingTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 700);
  };

  return (
    <section className="py-14 px-4 max-w-6xl mx-auto relative z-10">
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Subtle top energy line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-cyan-400" />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                Live Production Telemetry & Architecture Health
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              Distributed Systems Operations Monitor
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Live telemetry tracking microservices, IoT streams, edge vision inference, and security nodes.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
              Updated: {lastPingTime}
            </span>
            <button
              onClick={handleRunPingTest}
              disabled={isPinging}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-amber-300 font-mono text-xs border border-amber-400/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
              <span>{isPinging ? 'Pinging Mesh...' : 'Ping Cluster'}</span>
            </button>
          </div>
        </div>

        {/* Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {SERVICES.map((service, idx) => {
            const currentLatency = latencies[idx];
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="p-4 rounded-2xl bg-surface-100/70 border border-white/5 hover:border-amber-400/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                      {service.status}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-sky-400">
                      {currentLatency}ms
                    </span>
                  </div>

                  <h4 className="font-semibold text-xs sm:text-sm text-slate-100 group-hover:text-amber-300 transition-colors leading-snug">
                    {service.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-tight line-clamp-2">
                    {service.subtext}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>{service.protocol}</span>
                  <span className="text-emerald-400 font-bold">{service.uptime}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
