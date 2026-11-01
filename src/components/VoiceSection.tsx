import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const WORDS = [
  'Hyderabad-based',
  'software',
  '&',
  'systems',
  'engineer,',
  'specializing',
  'in',
  'helping',
  'businesses',
  'and',
  'startups',
  'turn',
  'ambitious',
  'ideas',
  'into',
  'impactful',
  'digital',
  'products',
  'and',
  'resilient',
  'software',
  'solutions.'
];

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const isKeyWord = ['software', 'systems', 'impactful', 'solutions.', 'startups'].includes(children);

  return (
    <span className="relative inline-block mr-2 sm:mr-3.5 my-1">
      <motion.span
        style={{ opacity }}
        className={`transition-colors duration-150 ${
          isKeyWord ? 'text-white font-semibold' : 'text-slate-200'
        }`}
      >
        {children}
      </motion.span>
    </span>
  );
};

export const VoiceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.35'],
  });

  return (
    <section ref={containerRef} className="py-24 sm:py-36 px-4 sm:px-8 max-w-7xl mx-auto aathif-border-t">
      
      {/* Top Monospace Section Header Bar (Exact Aathif layout) */}
      <div className="flex items-center justify-between pb-8 sm:pb-12 text-slate-500 font-mono text-xs uppercase tracking-widest border-b border-[#1c1c1c] mb-16 sm:mb-20">
        <span className="text-white font-bold">05</span>
        <span className="text-sky-400 font-medium">//VOICE OF MANIKANTH</span>
        <span>SINCE 2004</span>
      </div>

      {/* Kinetic Big Typography Text with Scroll Scrub Reveal */}
      <div className="max-w-5xl">
        <h3 className="font-clash text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.2] tracking-tight">
          {WORDS.map((word, index) => {
            const start = index / WORDS.length;
            const end = start + (1 / WORDS.length);
            return (
              <Word key={index} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </h3>
      </div>
    </section>
  );
};
