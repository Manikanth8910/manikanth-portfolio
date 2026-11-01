import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isInput, setIsInput] = useState(false);

  // Smooth spring physics for pro-level cursor feel
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  const dotSpringConfig = { damping: 40, stiffness: 800, mass: 0.2 };
  const dotX = useSpring(-100, dotSpringConfig);
  const dotY = useSpring(-100, dotSpringConfig);

  useEffect(() => {
    // Disable on mobile/touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    document.body.classList.add('custom-cursor-enabled');

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const inputElement = target.closest('input, textarea');
      setIsInput(!!inputElement);

      const interactive = target.closest('a, button, input, textarea, select, [role="button"], .interactive-hover');
      setIsHovering(!!interactive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleElementHover);

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, [cursorX, cursorY, dotX, dotY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Outer Follower Ring - Always visible above all modals/terminals */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-sky-400/60 pointer-events-none transition-opacity duration-200"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering && !isInput ? 54 : isClicking ? 28 : isInput ? 24 : 38,
          height: isHovering && !isInput ? 54 : isClicking ? 28 : isInput ? 24 : 38,
          backgroundColor: isHovering && !isInput ? 'rgba(56, 189, 248, 0.12)' : 'rgba(56, 189, 248, 0.03)',
          borderColor: isInput ? 'rgba(56, 189, 248, 0.25)' : isHovering ? '#38bdf8' : 'rgba(56, 189, 248, 0.45)',
          boxShadow: isHovering && !isInput ? '0 0 25px rgba(56, 189, 248, 0.4)' : 'none',
          opacity: isInput ? 0.3 : 1,
        }}
      />

      {/* Center Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none bg-sky-400"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering && !isInput ? 8 : isClicking ? 4 : isInput ? 3 : 6,
          height: isHovering && !isInput ? 8 : isClicking ? 4 : isInput ? 3 : 6,
          boxShadow: '0 0 10px #38bdf8',
          opacity: isInput ? 0.4 : 1,
        }}
      />
    </div>
  );
};
