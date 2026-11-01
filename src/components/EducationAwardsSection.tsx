import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Trophy, Award as AwardIcon, CheckCircle, Star, Sparkles, BookOpen } from 'lucide-react';
import { EDUCATION, AWARDS, CERTIFICATIONS } from '../data/portfolioData';
import { sound } from '../utils/soundEffects';

export const EducationAwardsSection: React.FC = () => {
  return (
    <section id="awards" className="py-20 px-4 max-w-6xl mx-auto relative z-10">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-mono uppercase tracking-widest text-sky-400 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20">
          Academic & Competitive Recognition
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
          Education & Honors
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2">
          Academic excellence paired with high-stress competitive coding and national hackathon achievements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Education (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => sound.playHover()}
            className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-sky-500/20 border border-sky-500/40 text-sky-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-sky-400 uppercase tracking-wider">
                  Higher Education
                </span>
                <h3 className="font-display text-lg font-bold text-white leading-tight">
                  B.Tech., Computer Science
                </h3>
              </div>
            </div>

            <p className="text-sm font-semibold text-slate-200">
              {EDUCATION.institution}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Affiliated to {EDUCATION.university}
            </p>

            <div className="my-5 p-4 rounded-2xl bg-slate-900/80 border border-sky-500/30 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-400 block">Current Cumulative CGPA</span>
                <span className="font-display text-2xl font-extrabold text-transparent bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text">
                  {EDUCATION.gpa}
                </span>
              </div>
              <div className="text-right border-l border-white/10 pl-4">
                <span className="text-[11px] font-mono text-slate-400 block">Intermediate (MPC)</span>
                <span className="font-mono text-base font-bold text-emerald-400">
                  {EDUCATION.previousEducation.score}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                Core Rigorous Coursework:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {EDUCATION.coursework.map((course) => (
                  <span
                    key={course}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-900/90 text-slate-300 border border-white/5"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Certifications Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onMouseEnter={() => sound.playHover()}
            className="p-6 rounded-3xl glass-panel border border-white/10 shadow-xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <h4 className="font-display text-base font-bold text-white">
                Industry Certifications
              </h4>
            </div>

            <div className="space-y-3">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-white/5"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-200 leading-snug">
                      {cert.name}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {cert.issuer} • {cert.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Hackathon Honors & Awards (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="font-display text-xl font-bold text-white">
              Competitive Hackathon & League Honors
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AWARDS.map((award, idx) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                onMouseEnter={() => sound.playHover()}
                className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-amber-500/40 transition-all duration-300 shadow-xl relative overflow-hidden group flex flex-col justify-between"
              >
                {/* Gold ambient hover glow */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-colors pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                      {award.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {award.date}
                    </span>
                  </div>

                  <h4 className="font-display text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {award.title}
                  </h4>
                  <p className="text-xs font-semibold text-sky-400 mt-0.5">
                    {award.issuer}
                  </p>
                </div>

                <p className="text-xs text-slate-300 mt-4 leading-relaxed">
                  {award.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Hackathon Callout Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-5 rounded-2xl bg-gradient-to-r from-sky-950/40 via-indigo-950/40 to-slate-900/60 border border-sky-500/20 flex items-center gap-4"
          >
            <div className="p-3 rounded-xl bg-sky-500/20 text-sky-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-white">
                Proven Competitive Performance Under Extreme Deadlines
              </h5>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Experienced in building scalable architectures, pitch-ready prototypes, and zero-defect algorithmic solutions in 24 to 48-hour sprints.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
