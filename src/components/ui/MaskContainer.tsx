import React, { useState, useEffect, useRef } from 'react';

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
  size = 40,
  revealSize = 600,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const maskLayerRef = useRef<HTMLDivElement | null>(null);
  const posRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const rafId = useRef<number | null>(null);

  const updateMaskStyles = () => {
    if (maskLayerRef.current) {
      const currentSize = isHovered ? revealSize : size;
      const posX = posRef.current.x - currentSize / 2;
      const posY = posRef.current.y - currentSize / 2;
      maskLayerRef.current.style.maskPosition = `${posX}px ${posY}px`;
      (maskLayerRef.current.style as any).webkitMaskPosition = `${posX}px ${posY}px`;
      maskLayerRef.current.style.maskSize = `${currentSize}px auto`;
      (maskLayerRef.current.style as any).webkitMaskSize = `${currentSize}px auto`;
    }
    rafId.current = null;
  };

  useEffect(() => {
    if (!rafId.current) {
      rafId.current = requestAnimationFrame(updateMaskStyles);
    }
  }, [isHovered, revealSize, size]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      posRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(updateMaskStyles);
      }
    };

    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [isHovered, revealSize, size]);

  return (
    <div
      ref={containerRef}
      className={`relative h-screen w-full overflow-hidden ${className}`}
    >
      {/* Masked reveal layer */}
      <div
        ref={maskLayerRef}
        className="absolute inset-0 flex h-full w-full items-center justify-center bg-black dark:bg-white [mask-image:url(/assets/mask.svg)] [mask-repeat:no-repeat] z-10 transition-[mask-size] duration-300 ease-out will-change-[mask-position,mask-size]"
        style={{
          maskPosition: '-1000px -1000px',
          WebkitMaskPosition: '-1000px -1000px',
          maskSize: `${size}px auto`,
          WebkitMaskSize: `${size}px auto`,
        }}
      >
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative z-20 w-full h-full flex items-center justify-center"
        >
          {children}
        </div>
      </div>

      {/* Base unmasked layer */}
      <div className="flex h-full w-full items-center justify-center">
        {revealText}
      </div>
    </div>
  );
};

export default MaskContainer;
