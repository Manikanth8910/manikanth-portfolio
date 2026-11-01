import React from 'react';
import { Cover } from './ui/Cover';
import { MaskContainer } from './ui/MaskContainer';

interface HeroProps {
  onOpenTerminal?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <header id="top" className="relative w-full h-screen overflow-hidden">
      {/* Background Top Corner Glow */}
      <div className="fixed top-0 right-0 w-11/12 max-w-5xl -z-10 translate-y-[-80%] pointer-events-none dark:hidden select-none">
        <img alt="" className="w-full opacity-90" src="/assets/header-bg-color.png" />
      </div>

      <MaskContainer
        className="w-full h-full"
        revealSize={600}
        size={30}
        revealText={
          <div className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4 select-none">
            <div className="rounded-full w-32 h-32 invisible" />
            <h3 className="flex items-end justify-center gap-2 text-md md:text-2xl mb-3 font-Ovo h-9 invisible">
              Hlo! I'm Manikanth
            </h3>
            <h1 className="text-3xl text-black dark:text-white sm:text-6xl lg:text-[66px] font-Ovo leading-tight">
              Making sense of problems through creation
            </h1>
            <p className="max-w-2xl mx-auto font-Ovo text-sm md:text-base leading-relaxed invisible">
              Curiosity leads the way as I build, break, and rebuild — growing through mistakes and every small win.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 invisible">
              <div className="px-10 py-2.5 h-[42px] rounded-full border flex items-center gap-2 font-Ovo text-sm shadow-sm">
                <span>contact me</span>
                <div className="w-4 h-4" />
              </div>
            </div>
          </div>
        }
      >
        <div className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4 select-none">
          <div className="rounded-full w-32 h-32 invisible" />
          <h3 className="flex items-end justify-center gap-2 text-md md:text-2xl mb-3 font-Ovo h-9 invisible">
            Hlo! I'm Manikanth
          </h3>
          <h1 className="text-3xl text-white dark:text-slate-400 sm:text-6xl lg:text-[66px] font-Ovo leading-tight">
            Still chasing the kid who wanted to build robots.
          </h1>
          <p className="max-w-2xl mx-auto font-Ovo text-sm md:text-base leading-relaxed invisible">
            Curiosity leads the way as I build, break, and rebuild — growing through mistakes and every small win.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 invisible">
            <div className="px-10 py-2.5 h-[42px] rounded-full border flex items-center gap-2 font-Ovo text-sm shadow-sm">
              <span>contact me</span>
              <div className="w-4 h-4" />
            </div>
          </div>
        </div>
      </MaskContainer>

      {/* Foreground overlay with profile picture, greeting, and contact CTA */}
      <div className="absolute inset-0 w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4 pointer-events-none z-20">
        <img
          alt="Manikanth Panuganti"
          className="rounded-full w-32 h-32 object-cover border-2 border-white dark:border-white/20 shadow-lg pointer-events-auto transition-transform duration-300 hover:scale-105"
          src="/images/manikanth_studio_portrait_clean.png"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/images/manikanth_portrait.jpg';
          }}
        />

        <h3 className="flex items-end justify-center gap-2 text-md md:text-2xl mb-3 font-Ovo h-9 pointer-events-auto text-neutral-800 dark:text-neutral-200">
          <span>Hlo! I'm</span>
          <Cover>
            <span className="dark:text-white inline-block text-neutral-900 relative z-20 group-hover/cover:text-white transition duration-200">
              Manikanth
            </span>
          </Cover>
          <img
            alt="Waving Hand"
            className="w-6 h-6 mb-1 inline-block animate-bounce"
            src="/assets/hand-icon.png"
          />
        </h3>

        {/* Space matching the h1 so the mask shows through without being covered */}
        <div
          aria-hidden="true"
          className="text-3xl sm:text-6xl lg:text-[66px] font-Ovo leading-tight invisible select-none pointer-events-none"
        >
          Making sense of problems through creation
        </div>

        <p className="max-w-2xl mx-auto font-Ovo pointer-events-auto text-neutral-600 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
          Curiosity leads the way as I build, break, and rebuild — growing through mistakes and every small win.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 pointer-events-auto">
          <a
            className="px-10 py-2.5 rounded-full border border-neutral-900 bg-neutral-900 hover:bg-black text-white dark:bg-transparent dark:border-white/30 dark:hover:bg-darkHover active:scale-95 flex items-center gap-2 transition font-Ovo text-sm shadow-sm cursor-pointer select-none"
            href="#contact"
          >
            <span>contact me</span>
            <img
              alt="Arrow Icon"
              className="w-4"
              src="/assets/right-arrow-white.png"
            />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Hero;
