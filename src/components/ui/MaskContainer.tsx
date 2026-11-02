import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export interface MaskContainerProps {
  children?: React.ReactNode;
  revealText?: React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
}

export const MaskContainer: React.FC<MaskContainerProps> = ({
  children,
  revealText,
  size = 30,
  revealSize = 600,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const updateRect = () => {
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
  };

  const updateMousePosition = (e: MouseEvent) => {
    if (!rectRef.current) {
      updateRect();
    }
    const rect = rectRef.current;
    if (rect) {
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    updateRect();
    el.addEventListener('mousemove', updateMousePosition, { passive: true });
    el.addEventListener('mouseenter', updateRect, { passive: true });
    window.addEventListener('resize', updateRect, { passive: true });
    window.addEventListener('scroll', updateRect, { passive: true });

    return () => {
      el.removeEventListener('mousemove', updateMousePosition);
      el.removeEventListener('mouseenter', updateRect);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, []);

  const maskSize = isHovered ? revealSize : size;
  const posX = mousePosition.x !== null ? mousePosition.x - maskSize / 2 : -maskSize;
  const posY = mousePosition.y !== null ? mousePosition.y - maskSize / 2 : -maskSize;

  return (
    <motion.div
      ref={containerRef}
      className={`relative h-screen w-full overflow-hidden ${className}`}
      animate={{
        backgroundColor: isHovered ? 'var(--slate-900)' : 'transparent',
      }}
      transition={{
        backgroundColor: { duration: 0.3 },
      }}
    >
      {/* Masked reveal layer (black in light mode, white in dark mode) */}
      <motion.div
        className="absolute inset-0 flex h-full w-full items-center justify-center bg-black dark:bg-white [mask-image:url(/assets/mask.svg)] [mask-repeat:no-repeat] [mask-size:40px] z-10 will-change-[mask-position,mask-size]"
        animate={{
          maskPosition: `${posX}px ${posY}px`,
          maskSize: `${maskSize}px`,
        }}
        transition={{
          maskSize: { duration: 0.3, ease: 'easeInOut' },
          maskPosition: { duration: 0.15, ease: 'linear' },
        }}
      >
        <div className="absolute inset-0 z-0 h-full w-full bg-black opacity-50 dark:bg-white" />
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative z-20 w-full h-full flex items-center justify-center"
        >
          {children}
        </div>
      </motion.div>

      {/* Base unmasked layer */}
      <div className="flex h-full w-full items-center justify-center">
        {revealText}
      </div>
    </motion.div>
  );
};

export default MaskContainer;
