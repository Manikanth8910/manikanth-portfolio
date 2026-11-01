import React from 'react';
import { PinContainer } from './ui/PinContainer';

interface ProjectItem {
  id: string;
  title: string;
  date: string;
  description: string;
  github?: string;
  demo?: string;
  image: string;
  technologies: { name: string; icon: string }[];
}

export const ProjectsSection: React.FC = () => {
  const projects: ProjectItem[] = [
    {
      id: 'hubverse',
      title: 'Hubverse Ecosystem',
      date: 'Jan 2026 – Mar 2026',
      description: 'Architected and deployed an end-to-end event management platform serving 1,500+ university students and 20+ clubs across campus. Designed zero-lock Express/Node.js APIs with SQLite in WAL mode for instantaneous reads, automated QR ticket validation cutting admission wait time by 70%, and released mobile companion apps with 500+ Play Store downloads.',
      github: 'https://github.com/manikanth8910',
      demo: 'https://hubverse.in',
      image: '/assets/nativex.webp',
      technologies: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      ],
    },
    {
      id: 'jarsh',
      title: 'JARSH — WorkForce Alert (WFA)',
      date: '2025 – 2026',
      description: 'Mission-critical industrial worker-safety IoT platform with wearable telemetry and emergency SOS alerts under 200ms; precise GPS and cellular location within 5m. Ingests high-frequency sensor streams via EMQX MQTT clusters; Redis in-memory caching reduced database read overhead by 50%. Deployed live at wfa.jarshconnect.com.',
      github: 'https://github.com/manikanth8910',
      demo: 'https://wfa.jarshconnect.com/',
      image: '/assets/lakeview.webp',
      technologies: [
        { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      ],
    },
    {
      id: 'applypilot',
      title: 'ApplyPilot Orchestrator',
      date: '2025 – 2026',
      description: "Built a full-stack autonomous ATS application pipeline using generative AI. Implemented Dockerized isolated sandboxes, scalable multi-user session pooling with Playwright, and sub-second semantic resume vector search with PGVector.",
      github: 'https://github.com/manikanth8910',
      demo: 'https://hubverse.in',
      image: '/assets/thoht.webp',
      technologies: [
        { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
        { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-20 px-4 md:px-8 space-y-12" id="work">
      {projects.map((proj) => (
        <div
          key={proj.id}
          className="relative overflow-hidden md:overflow-visible border rounded-xl shadow-lg bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 p-6 md:p-10 h-auto md:h-[380px] flex flex-col justify-between gap-8 md:gap-0"
        >
          {/* Left info column */}
          <div className="relative z-10 w-full md:w-[58%] space-y-3">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight dark:text-white font-Outfit">
                {proj.title}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 font-Outfit">
                {proj.date}
              </p>
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm md:text-base font-Outfit">
              {proj.description}
            </p>

            {/* Circle sweep hover buttons */}
            <div className="flex gap-3 pt-2">
              {proj.github && (
                <button
                  onClick={() => window.open(proj.github, '_blank', 'noopener,noreferrer')}
                  className="flex justify-center gap-2 items-center shadow-xl text-sm bg-white dark:bg-neutral-900 backdrop-blur-md isolation-auto border-gray-200 dark:border-neutral-700 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-black dark:before:bg-white hover:text-white dark:hover:text-black before:-z-10 before:aspect-square before:hover:scale-150 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>Github</span>
                </button>
              )}
              {proj.demo && (
                <button
                  onClick={() => window.open(proj.demo, '_blank', 'noopener,noreferrer')}
                  className="flex justify-center gap-2 items-center shadow-xl text-sm bg-white dark:bg-neutral-900 backdrop-blur-md isolation-auto border-gray-200 dark:border-neutral-700 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-black dark:before:bg-white hover:text-white dark:hover:text-black before:-z-10 before:aspect-square before:hover:scale-150 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                  <span>Demo</span>
                </button>
              )}
            </div>
          </div>

          {/* Overlapping circular tech stack badges */}
          <div className="relative z-10 flex flex-row items-center w-full md:w-[45%]">
            {proj.technologies.map((tech, idx) => (
              <div key={idx} className="-mr-4 relative group">
                <div
                  className="flex items-center justify-center rounded-full h-14 w-14 border-2 border-white bg-white dark:bg-neutral-900 relative transition duration-500 group-hover:scale-105 group-hover:z-30 !p-0 !m-0 shadow-sm"
                  style={{ lineHeight: 0 }}
                >
                  <img
                    alt={tech.name}
                    src={tech.icon}
                    className="w-7 h-7 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* 3D Pin Container on the right */}
          <div className="relative md:absolute bottom-0 right-0 w-full md:w-[60%] h-[250px] md:h-full flex items-center md:items-end justify-center md:justify-end pointer-events-none mt-4 md:mt-0">
            <div className="pointer-events-auto w-full h-full flex justify-center md:w-auto md:h-auto md:block">
              <PinContainer
                title={proj.title}
                href={proj.demo}
                containerClassName="h-full w-full flex justify-center md:justify-end"
              >
                <div className="w-[300px] md:w-[550px] h-full md:h-[300px] flex items-center justify-center md:block relative">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="object-cover rounded-xl w-full h-full"
                  />
                </div>
              </PinContainer>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsSection;
