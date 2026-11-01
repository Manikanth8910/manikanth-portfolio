import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import gsap from 'gsap';

export interface TargetCursorProps {
  targetSelector?: string;
  parentSelector?: string;
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  hoverDuration?: number;
  parallaxOn?: boolean;
}

export const TargetCursor: React.FC<TargetCursorProps> = ({
  targetSelector = '.cursor-target',
  parentSelector = '#skills-section',
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true,
}) => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cornersRef = useRef<NodeListOf<HTMLElement> | null>(null);
  const spinTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const isHoveredRef = useRef(false);
  const targetCornersRef = useRef<{ x: number; y: number }[] | null>(null);
  const tickerUpdateRef = useRef<(() => void) | null>(null);
  const progressRef = useRef(0);
  const isInsideParentRef = useRef(false);
  const currentTargetRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmall = window.innerWidth <= 768;
    const userAgent = navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera || '';
    const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    setIsMobile((hasTouch && isSmall) || isMobileDevice);
  }, []);

  const constants = useMemo(() => ({ borderWidth: 3, cornerSize: 12 }), []);

  const updatePosition = useCallback((x: number, y: number) => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, { x, y, duration: 0.1, ease: 'power3.out' });
    }
  }, []);

  useEffect(() => {
    if (!mounted || isMobile || !cursorRef.current) return;

    const parentEl = document.querySelector<HTMLElement>(parentSelector);
    if (!parentEl) return;

    const originalCursor = parentEl.style.cursor;
    if (hideDefaultCursor) {
      parentEl.style.cursor = 'none';
    }

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll<HTMLElement>('.target-cursor-corner');

    let currentLeaveHandler: (() => void) | null = null;
    let resumeTimeout: ReturnType<typeof setTimeout> | null = null;

    const cleanupTarget = (el: HTMLElement) => {
      if (currentLeaveHandler) {
        el.removeEventListener('mouseleave', currentLeaveHandler);
      }
      currentLeaveHandler = null;
    };

    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });
    if (spinTimelineRef.current) spinTimelineRef.current.kill();
    spinTimelineRef.current = gsap.timeline({ repeat: -1 }).to(cursor, {
      rotation: '+=360',
      duration: spinDuration,
      ease: 'none',
    });

    // Dynamic frame-by-frame tracker
    tickerUpdateRef.current = () => {
      if (!cursorRef.current || !cornersRef.current) return;
      const progress = progressRef.current;
      if (progress === 0) return;

      const hoveredEl = currentTargetRef.current;
      if (hoveredEl) {
        const v = hoveredEl.getBoundingClientRect();
        const { borderWidth: y, cornerSize: b } = constants;
        targetCornersRef.current = [
          { x: v.left - y, y: v.top - y },
          { x: v.right + y - b, y: v.top - y },
          { x: v.right + y - b, y: v.bottom + y - b },
          { x: v.left - y, y: v.bottom + y - b },
        ];
      }

      if (!targetCornersRef.current) return;

      const curX = gsap.getProperty(cursorRef.current, 'x') as number;
      const curY = gsap.getProperty(cursorRef.current, 'y') as number;

      Array.from(cornersRef.current).forEach((corner, idx) => {
        const curCornerX = gsap.getProperty(corner, 'x') as number;
        const curCornerY = gsap.getProperty(corner, 'y') as number;
        const destCornerX = targetCornersRef.current![idx].x - curX;
        const destCornerY = targetCornersRef.current![idx].y - curY;
        const duration = progress >= 0.99 ? 0.2 * (parallaxOn ? 1 : 0) : 0.05;
        gsap.to(corner, {
          x: curCornerX + (destCornerX - curCornerX) * progress,
          y: curCornerY + (destCornerY - curCornerY) * progress,
          duration,
          ease: duration === 0 ? 'none' : 'power1.out',
          overwrite: 'auto',
        });
      });
    };

    // Robust pointer check that works across scrolling and mouse moves
    const checkWithinParent = (clientX: number, clientY: number) => {
      const rect = parentEl.getBoundingClientRect();
      return (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      );
    };

    let lastKnownX = -100;
    let lastKnownY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      lastKnownX = e.clientX;
      lastKnownY = e.clientY;
      const isInside = checkWithinParent(e.clientX, e.clientY);

      if (isInside) {
        if (!isInsideParentRef.current) {
          isInsideParentRef.current = true;
          if (cursorRef.current) gsap.to(cursorRef.current, { opacity: 1, duration: 0.2 });
        }
        updatePosition(e.clientX, e.clientY);
      } else {
        if (isInsideParentRef.current) {
          isInsideParentRef.current = false;
          if (cursorRef.current) gsap.to(cursorRef.current, { opacity: 0, duration: 0.2 });
        }
      }
    };
    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleMouseEnter = () => {
      isInsideParentRef.current = true;
      if (cursorRef.current) gsap.to(cursorRef.current, { opacity: 1, duration: 0.2 });
    };

    const handleMouseLeave = () => {
      isInsideParentRef.current = false;
      if (cursorRef.current) gsap.to(cursorRef.current, { opacity: 0, duration: 0.2 });
    };

    parentEl.addEventListener('mouseenter', handleMouseEnter);
    parentEl.addEventListener('mouseleave', handleMouseLeave);

    const handleWindowScroll = () => {
      if (lastKnownX > 0 && lastKnownY > 0) {
        const isInside = checkWithinParent(lastKnownX, lastKnownY);
        if (isInside) {
          if (!isInsideParentRef.current) {
            isInsideParentRef.current = true;
            if (cursorRef.current) gsap.to(cursorRef.current, { opacity: 1, duration: 0.2 });
          }
          updatePosition(lastKnownX, lastKnownY);
        } else {
          if (isInsideParentRef.current) {
            isInsideParentRef.current = false;
            if (cursorRef.current) gsap.to(cursorRef.current, { opacity: 0, duration: 0.2 });
          }
        }
      }

      const activeEl = currentTargetRef.current;
      if (activeEl && cursorRef.current) {
        const curX = gsap.getProperty(cursorRef.current, 'x') as number;
        const curY = gsap.getProperty(cursorRef.current, 'y') as number;
        const elAtPoint = document.elementFromPoint(curX, curY);
        const isStillOver = elAtPoint && (elAtPoint === activeEl || elAtPoint.closest(targetSelector) === activeEl);
        if (!isStillOver && currentLeaveHandler) {
          currentLeaveHandler();
        }
      }
    };
    window.addEventListener('scroll', handleWindowScroll, { passive: true });

    const handleMouseDown = () => {
      if (dotRef.current && isInsideParentRef.current) {
        gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });
        if (cursorRef.current) gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2 });
      }
    };

    const handleMouseUp = () => {
      if (dotRef.current && isInsideParentRef.current) {
        gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
        if (cursorRef.current) gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      let matchedEl: HTMLElement | null = null;
      let cur = target;
      while (cur && cur !== document.body) {
        if (cur.matches(targetSelector)) {
          matchedEl = cur;
          break;
        }
        cur = cur.parentElement;
      }

      if (!matchedEl || !cursorRef.current || !cornersRef.current || currentTargetRef.current === matchedEl) return;

      // Always activate inside parent if hovering a card
      if (!isInsideParentRef.current) {
        isInsideParentRef.current = true;
        gsap.to(cursorRef.current, { opacity: 1, duration: 0.2 });
      }

      if (currentTargetRef.current) cleanupTarget(currentTargetRef.current);
      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
        resumeTimeout = null;
      }

      currentTargetRef.current = matchedEl;
      const corners = Array.from(cornersRef.current);
      corners.forEach((c) => gsap.killTweensOf(c));
      gsap.killTweensOf(cursorRef.current, 'rotation');
      spinTimelineRef.current?.pause();
      gsap.set(cursorRef.current, { rotation: 0 });

      const rect = matchedEl.getBoundingClientRect();
      const { borderWidth, cornerSize } = constants;
      const curX = gsap.getProperty(cursorRef.current, 'x') as number;
      const curY = gsap.getProperty(cursorRef.current, 'y') as number;

      targetCornersRef.current = [
        { x: rect.left - borderWidth, y: rect.top - borderWidth },
        { x: rect.right + borderWidth - cornerSize, y: rect.top - borderWidth },
        { x: rect.right + borderWidth - cornerSize, y: rect.bottom + borderWidth - cornerSize },
        { x: rect.left - borderWidth, y: rect.bottom + borderWidth - cornerSize },
      ];

      isHoveredRef.current = true;
      if (tickerUpdateRef.current) gsap.ticker.add(tickerUpdateRef.current);
      gsap.to(progressRef, { current: 1, duration: hoverDuration, ease: 'power2.out' });

      corners.forEach((corner, idx) => {
        gsap.to(corner, {
          x: targetCornersRef.current![idx].x - curX,
          y: targetCornersRef.current![idx].y - curY,
          duration: 0.2,
          ease: 'power2.out',
        });
      });

      const onTargetLeave = () => {
        if (tickerUpdateRef.current) gsap.ticker.remove(tickerUpdateRef.current);
        isHoveredRef.current = false;
        targetCornersRef.current = null;
        gsap.set(progressRef, { current: 0, overwrite: true });
        currentTargetRef.current = null;

        if (cornersRef.current) {
          const cArray = Array.from(cornersRef.current);
          cArray.forEach((c) => gsap.killTweensOf(c));
          const { cornerSize } = constants;
          const defaultOffsets = [
            { x: -(1.5 * cornerSize), y: -(1.5 * cornerSize) },
            { x: 0.5 * cornerSize, y: -(1.5 * cornerSize) },
            { x: 0.5 * cornerSize, y: 0.5 * cornerSize },
            { x: -(1.5 * cornerSize), y: 0.5 * cornerSize },
          ];
          const tl = gsap.timeline();
          cArray.forEach((c, i) => {
            tl.to(c, { x: defaultOffsets[i].x, y: defaultOffsets[i].y, duration: 0.3, ease: 'power3.out' }, 0);
          });
        }

        resumeTimeout = setTimeout(() => {
          if (!currentTargetRef.current && cursorRef.current && spinTimelineRef.current) {
            const rot = (gsap.getProperty(cursorRef.current, 'rotation') as number) % 360;
            spinTimelineRef.current.kill();
            spinTimelineRef.current = gsap.timeline({ repeat: -1 }).to(cursorRef.current, {
              rotation: '+=360',
              duration: spinDuration,
              ease: 'none',
            });
            gsap.to(cursorRef.current, {
              rotation: rot + 360,
              duration: spinDuration * (1 - rot / 360),
              ease: 'none',
              onComplete: () => {
                spinTimelineRef.current?.restart();
              },
            });
          }
          resumeTimeout = null;
        }, 50);

        cleanupTarget(matchedEl);
      };

      currentLeaveHandler = onTargetLeave;
      matchedEl.addEventListener('mouseleave', onTargetLeave);
    };

    parentEl.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      if (tickerUpdateRef.current) gsap.ticker.remove(tickerUpdateRef.current);
      document.removeEventListener('mousemove', handleMouseMove);
      parentEl.removeEventListener('mouseenter', handleMouseEnter);
      parentEl.removeEventListener('mouseleave', handleMouseLeave);
      parentEl.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('scroll', handleWindowScroll);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      if (currentTargetRef.current) cleanupTarget(currentTargetRef.current);
      spinTimelineRef.current?.kill();
      if (parentEl) parentEl.style.cursor = originalCursor;
      isHoveredRef.current = false;
      targetCornersRef.current = null;
      progressRef.current = 0;
      isInsideParentRef.current = false;
      currentTargetRef.current = null;
    };
  }, [mounted, targetSelector, parentSelector, spinDuration, updatePosition, constants, hideDefaultCursor, isMobile, hoverDuration, parallaxOn]);

  useEffect(() => {
    if (mounted && !isMobile && cursorRef.current && spinTimelineRef.current && spinTimelineRef.current.isActive()) {
      spinTimelineRef.current.kill();
      spinTimelineRef.current = gsap.timeline({ repeat: -1 }).to(cursorRef.current, {
        rotation: '+=360',
        duration: spinDuration,
        ease: 'none',
      });
    }
  }, [spinDuration, mounted, isMobile]);

  if (!mounted || isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[9999]"
      style={{ willChange: 'transform' }}
    >
      <div
        ref={dotRef}
        className="absolute top-1/2 left-1/2 w-1 h-1 bg-black dark:bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      />
      {/* Top Left corner */}
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] border-black dark:border-white -translate-x-[150%] -translate-y-[150%] border-r-0 border-b-0"
        style={{ willChange: 'transform' }}
      />
      {/* Top Right corner */}
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] border-black dark:border-white translate-x-1/2 -translate-y-[150%] border-l-0 border-b-0"
        style={{ willChange: 'transform' }}
      />
      {/* Bottom Right corner */}
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] border-black dark:border-white translate-x-1/2 translate-y-1/2 border-l-0 border-t-0"
        style={{ willChange: 'transform' }}
      />
      {/* Bottom Left corner */}
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] border-black dark:border-white -translate-x-[150%] translate-y-1/2 border-r-0 border-t-0"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};

export default TargetCursor;
