import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section className="w-full px-[12%] py-10 scroll-mt-20" id="about">
      {/* Headings */}
      <h4 className="text-center mb-2 text-lg font-Ovo">
        Introduction
      </h4>
      <h2 className="text-center text-5xl font-Ovo">
        About me
      </h2>

      <div className="flex w-full flex-col lg:flex-row items-center gap-20 my-20">
        {/* Left: Profile Cutout Image with Rotating Circular Badge */}
        <div className="max-w-max mx-auto relative">
          <img
            alt="Manikanth Profile Picture"
            className="w-64 sm:w-80 rounded-3xl max-w-none object-cover"
            src="/images/manikanth_studio_portrait_clean.png"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/images/manikanth_portrait.jpg';
            }}
          />

          {/* Rotating Circular Stamp Badge */}
          <div className="bg-white dark:bg-[#180a2b] w-1/2 aspect-square absolute right-0 bottom-0 rounded-full translate-x-1/4 translate-y-1/3 shadow-[0_4px_55px_rgba(149,0,162,0.15)] flex items-center justify-center border border-neutral-200 dark:border-white/20">
            <div className="relative w-full h-full flex items-center justify-center animate-spin_slow">
              <svg className="w-full h-full" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <path
                    d="M150,150 m-120,0 a120,120 0 1,1 240,0 a120,120 0 1,1 -240,0"
                    id="circleText"
                  />
                </defs>
                <text fill="currentColor" className="text-black dark:text-white" fontSize="20" letterSpacing="4">
                  <textPath href="#circleText" startOffset="0%">
                    DEVELOPER • DESIGNER • BUILDER • THINKER • CREATOR •
                  </textPath>
                </text>
              </svg>
            </div>
            <p className="absolute text-4xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
              🧑🏻‍💻
            </p>
          </div>
        </div>

        {/* Right: Bio and 2 Information Cards */}
        <div className="flex-1">
          <p className="mb-10 max-w-2xl font-Ovo leading-relaxed">
            I’m a Computer Science undergraduate at <strong className="font-semibold text-black dark:text-white">VNR VJIET (Aug 2024 – May 2028, 8.99 CGPA)</strong> with a deep passion for building scalable distributed systems and autonomous architectures. As former CTO & Full-Stack Developer at <strong className="font-semibold text-black dark:text-white">Hubverse</strong> (<a href="https://hubverse.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-600 dark:hover:text-purple-400">hubverse.in</a>, Jan 2026 – Mar 2026), I launched a university platform serving 1,500+ students and 20+ clubs with zero-lock SQLite WAL APIs and automated Docker CI/CD pipelines. Currently architecting <strong className="font-semibold text-black dark:text-white">JARSH WorkForce Alert</strong> (<a href="https://wfa.jarshconnect.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-600 dark:hover:text-purple-400">wfa.jarshconnect.com</a>) and leading infrastructure & security at VJStartup.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            <li className="border border-gray-300 dark:border-white/30 rounded-xl p-6 cursor-pointer hover:bg-slate-100/50 hover:-translate-y-1 duration-500 hover:shadow-black dark:hover:shadow-white/80 dark:hover:bg-darkHover/50">
              <img
                alt="Education"
                className="w-7 mt-3 dark:hidden"
                src="/assets/edu-icon.png"
              />
              <img
                alt="Education"
                className="w-7 mt-3 hidden dark:block"
                src="/assets/edu-icon-dark.png"
              />
              <h3 className="my-4 font-semibold text-gray-700 dark:text-white font-Outfit">
                Education
              </h3>
              <p className="text-gray-600 text-sm dark:text-white/80 font-Outfit">
                B.Tech in Computer Science
              </p>
              <p className="text-gray-500 text-xs dark:text-white/60 font-Outfit mt-1">
                VNR VJIET • 8.99 CGPA (2024–2028)
              </p>
            </li>

            <li className="border border-gray-300 dark:border-white/30 rounded-xl p-6 cursor-pointer hover:bg-slate-100/50 hover:-translate-y-1 duration-500 hover:shadow-black dark:hover:shadow-white/80 dark:hover:bg-darkHover/50">
              <img
                alt="Experience"
                className="w-7 mt-3 dark:hidden"
                src="/assets/edu-icon.png"
              />
              <img
                alt="Experience"
                className="w-7 mt-3 hidden dark:block"
                src="/assets/edu-icon-dark.png"
              />
              <h3 className="my-4 font-semibold text-gray-700 dark:text-white font-Outfit">
                Experience
              </h3>
              <p className="text-gray-600 text-sm dark:text-white/80 font-Outfit">
                CTO @ Hubverse (2026)
              </p>
              <p className="text-gray-500 text-xs dark:text-white/60 font-Outfit mt-1">
                VJStartup • Innovation Cell
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
