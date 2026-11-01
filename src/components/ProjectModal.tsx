import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Layers, Cpu, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { sound } from '../utils/soundEffects';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'innovations' | 'metrics'>('architecture');

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 25 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl bg-[#090e1a] border border-sky-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(56,189,248,0.2)] overflow-hidden"
        >
          {/* Header Image & Title */}
          <div className="relative h-48 sm:h-56 w-full overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center filter brightness-75 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090e1a] via-[#090e1a]/60 to-transparent" />

            {/* Close Button */}
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/10 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Floating Badges */}
            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/30 mb-2 inline-block">
                  {project.category}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 drop-shadow">
                  {project.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 pt-3 pb-1 border-b border-white/10 flex items-center gap-2 bg-[#0c1222]">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('architecture');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'architecture'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Architecture & Flow</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('innovations');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'innovations'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Technical Innovations</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('metrics');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'metrics'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Metrics & Impact</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
            {/* Project Overview */}
            <div>
              <p className="text-slate-300 leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Tab Contents */}
            {activeTab === 'architecture' && (
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                  System Architecture Pipeline:
                </h4>
                <div className="space-y-2.5">
                  {project.architecture.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/70 border border-white/5"
                    >
                      <div className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="text-slate-300 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'innovations' && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-violet-400 font-bold">
                  Engineering Innovations:
                </h4>
                <div className="space-y-2">
                  {project.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-white/5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'metrics' && (
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Measured Performance & Results:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-500/20 text-center"
                    >
                      <div className="font-display text-xl sm:text-2xl font-bold text-emerald-300">
                        {m.value}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Pills */}
            <div>
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold">
                Technologies & Tools:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-slate-800 text-xs font-mono text-slate-300 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-[#0c1222] border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">
              Engineered by Manikanth Panuganti
            </span>
            <div className="flex items-center gap-3">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-white border border-white/10 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white transition-all shadow-md shadow-sky-500/25"
                >
                  <span>Live Platform</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
