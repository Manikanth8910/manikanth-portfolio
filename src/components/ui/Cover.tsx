import React, { useEffect, useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const Cover: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const [hovered, setHovered] = useState(false);
  const id = useId();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group/cover inline-block px-3 py-0.5 rounded-md cursor-pointer transition-colors duration-300"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-neutral-900 dark:bg-neutral-800 rounded-md -z-10 shadow-lg"
          >
            {/* Animated Beam Lines */}
            <div className="absolute inset-0 overflow-hidden rounded-md pointer-events-none">
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: 'linear',
                }}
                className="w-full h-full absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/40 to-transparent"
              />
            </div>

            {/* Glowing Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-sky-400 rounded-tl-sm" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-sky-400 rounded-tr-sm" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-sky-400 rounded-bl-sm" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-sky-400 rounded-br-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sparkles on Hover */}
      {hovered && (
        <>
          <Sparkle style={{ top: '-6px', left: '15%' }} delay={0} />
          <Sparkle style={{ bottom: '-6px', right: '20%' }} delay={0.3} />
          <Sparkle style={{ top: '20%', right: '-8px' }} delay={0.6} />
        </>
      )}

      {/* Text with animated color transition */}
      <span
        className={`relative z-10 transition-colors duration-200 ${
          hovered
            ? 'text-white font-bold drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]'
            : 'text-neutral-900 dark:text-white font-semibold underline decoration-sky-400 decoration-wavy underline-offset-4'
        } ${className}`}
      >
        {children}
      </span>
    </div>
  );
};

const Sparkle: React.FC<{ style: React.CSSProperties; delay: number }> = ({
  style,
  delay,
}) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1.2, 0],
        opacity: [0, 1, 0],
        rotate: [0, 90, 180],
      }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
      style={style}
      className="absolute pointer-events-none text-sky-400 text-xs"
    >
      ✦
    </motion.div>
  );
};

export default Cover;
