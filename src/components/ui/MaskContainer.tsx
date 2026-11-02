import React, { useState, useEffect, useRef, useCallback } from 'react';
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

  // Tracking touch gestures for single-tap vs scroll vs drag
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const lastTouchTimeRef = useRef<number>(0);

  const updateRect = useCallback(() => {
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
  }, []);

  const updateMousePosition = useCallback((e: MouseEvent) => {
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
  }, [updateRect]);

  const isHoveredRef = useRef(false);
  isHoveredRef.current = isHovered;

  // Desktop hover handlers - ignore synthetic events from mobile touch
  const handleMouseEnter = useCallback(() => {
    if (Date.now() - lastTouchTimeRef.current > 600) {
      setIsHovered(true);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (Date.now() - lastTouchTimeRef.current > 600) {
      setIsHovered(false);
    }
  }, []);

  // Single-tap / click toggle handler for mobile and desktop
  const handleToggle = useCallback((clientX?: number, clientY?: number) => {
    if (!rectRef.current) updateRect();
    const rect = rectRef.current;
    const willHover = !isHoveredRef.current;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    if (willHover) {
      if (rect) {
        const x = isMobile
          ? rect.width / 2
          : typeof clientX === 'number'
          ? clientX - rect.left
          : rect.width / 2;
        const y =
          typeof clientY === 'number'
            ? clientY - rect.top
            : rect.height / 2;
        setMousePosition({ x, y });
      }
      setIsHovered(true);
    } else {
      if (isMobile) {
        setMousePosition({ x: null, y: null });
      }
      setIsHovered(false);
    }
  }, [updateRect]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    updateRect();

    // Mouse listeners for desktop
    el.addEventListener('mousemove', updateMousePosition, { passive: true });
    el.addEventListener('mouseenter', updateRect, { passive: true });

    // Auto reset if user scrolls far down the page
    const handleScroll = () => {
      updateRect();
      if (window.scrollY > 250) {
        setIsHovered(false);
      }
    };

    window.addEventListener('resize', updateRect, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Touch event handlers for mobile devices
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        updateRect();
        const touch = e.touches[0];
        touchStartRef.current = {
          x: touch.clientX,
          y: touch.clientY,
          time: Date.now(),
        };
        isDraggingRef.current = false;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartRef.current || e.touches.length !== 1) return;
      const touch = e.touches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;

      // Finger moved noticeably: user is dragging to explore or scroll
      if (Math.hypot(dx, dy) > 10) {
        isDraggingRef.current = true;
        const rect = rectRef.current;
        if (rect) {
          setMousePosition({
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top,
          });
          setIsHovered(true);
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const elapsed = Date.now() - touchStartRef.current.time;
      const touch = e.changedTouches[0];
      const dx = touch ? touch.clientX - touchStartRef.current.x : 0;
      const dy = touch ? touch.clientY - touchStartRef.current.y : 0;
      const distance = Math.hypot(dx, dy);

      // Clean single tap (< 12px movement, < 350ms duration): toggle reveal immediately
      if (!isDraggingRef.current && distance < 12 && elapsed < 350) {
        lastTouchTimeRef.current = Date.now();
        if (touch) {
          handleToggle(touch.clientX, touch.clientY);
        } else {
          handleToggle();
        }
      }

      touchStartRef.current = null;
      isDraggingRef.current = false;
    };

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: true });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('mousemove', updateMousePosition);
      el.removeEventListener('mouseenter', updateRect);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', handleScroll);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleToggle, updateMousePosition, updateRect]);

  const handleClick = (e: React.MouseEvent) => {
    // Prevent synthetic click from firing toggle again after touch tap
    if (Date.now() - lastTouchTimeRef.current < 600) {
      return;
    }
    handleToggle(e.clientX, e.clientY);
  };

  const maskSize = isHovered ? revealSize : size;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // On mobile when not hovered, keep mask offscreen so no dot obscures text
  const effectiveX =
    isMobile && !isHovered
      ? null
      : mousePosition.x !== null
      ? mousePosition.x
      : isHovered && rectRef.current
      ? rectRef.current.width / 2
      : null;

  const effectiveY =
    isMobile && !isHovered
      ? null
      : mousePosition.y !== null
      ? mousePosition.y
      : isHovered && rectRef.current
      ? rectRef.current.height / 2
      : null;

  const posX = effectiveX !== null ? effectiveX - maskSize / 2 : -maskSize;
  const posY = effectiveY !== null ? effectiveY - maskSize / 2 : -maskSize;

  return (
    <motion.div
      ref={containerRef}
      onClick={handleClick}
      className={`relative h-screen w-full overflow-hidden cursor-pointer select-none ${className}`}
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
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
