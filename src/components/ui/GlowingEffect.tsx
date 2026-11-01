import React, { useRef, useEffect, useCallback, memo } from 'react';

export interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: 'default' | 'white';
  glow?: boolean;
  className?: string;
  movementDuration?: number;
  borderWidth?: number;
  disabled?: boolean;
}

export const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.01,
    proximity = 64,
    spread = 40,
    variant = 'default',
    glow = true,
    className = '',
    movementDuration = 2,
    borderWidth = 2,
    disabled = false,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animFrame = useRef<number | null>(null);

    const handleMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;
        if (animFrame.current) cancelAnimationFrame(animFrame.current);

        animFrame.current = requestAnimationFrame(() => {
          const el = containerRef.current;
          if (!el) return;
          const { left, top, width, height } = el.getBoundingClientRect();
          const mouseX = e ? ('clientX' in e ? e.clientX : e.x) : lastPosition.current.x;
          const mouseY = e ? ('clientY' in e ? e.clientY : e.y) : lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + 0.5 * width, top + 0.5 * height];
          const dist = Math.hypot(mouseX - center[0], mouseY - center[1]);

          if (dist < 0.5 * Math.min(width, height) * inactiveZone) {
            el.style.setProperty('--active', '0');
            return;
          }

          const inProximity =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          el.style.setProperty('--active', inProximity ? '1' : '0.15');

          const currentStart = parseFloat(el.style.getPropertyValue('--start')) || 0;
          const targetAngle =
            ((180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90 - currentStart + 180) %
              360 -
            180;
          const newStart = currentStart + targetAngle * 0.15;
          el.style.setProperty('--start', String(newStart));
        });
      },
      [inactiveZone, proximity]
    );

    useEffect(() => {
      if (disabled) return;

      const onScroll = () => handleMove();
      const onPointerMove = (e: MouseEvent) => handleMove(e);

      window.addEventListener('scroll', onScroll, { passive: true });
      document.body.addEventListener('pointermove', onPointerMove, { passive: true });

      return () => {
        if (animFrame.current) cancelAnimationFrame(animFrame.current);
        window.removeEventListener('scroll', onScroll);
        document.body.removeEventListener('pointermove', onPointerMove);
      };
    }, [handleMove, disabled]);

    const gradient =
      variant === 'white'
        ? `repeating-conic-gradient(
            from 236.84deg at 50% 50%,
            var(--black),
            var(--black) calc(25% / var(--repeating-conic-gradient-times))
          )`
        : `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
          radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
          radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%), 
          radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
          repeating-conic-gradient(
            from 236.84deg at 50% 50%,
            #dd7bbb 0%,
            #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
            #5a922c calc(50% / var(--repeating-conic-gradient-times)), 
            #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
            #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
          )`;

    return (
      <>
        <div
          className={`pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity ${
            glow ? 'opacity-100' : ''
          } ${variant === 'white' ? 'border-white' : ''} ${disabled ? '!block' : ''}`}
        />
        <div
          ref={containerRef}
          style={
            {
              '--blur': `${blur}px`,
              '--spread': spread,
              '--start': '0',
              '--active': '0.15',
              '--glowingeffect-border-width': `${borderWidth}px`,
              '--repeating-conic-gradient-times': '5',
              '--gradient': gradient,
            } as React.CSSProperties
          }
          className={`pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity ${
            glow ? 'opacity-100' : ''
          } ${blur > 0 ? 'blur-[var(--blur)]' : ''} ${className} ${disabled ? '!hidden' : ''}`}
        >
          <div
            className={`glow rounded-[inherit] after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))] after:[border:var(--glowingeffect-border-width)_solid_transparent] after:[background:var(--gradient)] after:[background-attachment:fixed] after:opacity-[var(--active)] after:transition-opacity after:duration-300 after:[mask-clip:padding-box,border-box] after:[mask-composite:intersect] after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]`}
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = 'GlowingEffect';
export default GlowingEffect;
