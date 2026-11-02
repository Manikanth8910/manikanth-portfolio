import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface TimelineItem {
  period: string;
  role: string;
  techStack: string;
  description: string;
  bullets?: string[];
  images?: { src: string; alt: string }[];
}

export const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
      setHeight(trackRef.current.offsetHeight);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const items: TimelineItem[] = [
    {
      period: '2026',
      role: 'CTO & Full-Stack Developer – Hubverse (Jan 2026 – Mar 2026)',
      techStack: 'React, React Native, Node.js, Express, SQLite WAL, Docker, GitHub Actions, JWT',
      description:
        'Launched a React and React Native university events platform for 1,500+ students and 20+ clubs, reaching 500+ Google Play downloads. Built high-concurrency Node.js/Express APIs with SQLite in WAL mode for lock-free reads, added JWT/Google OAuth, automated QR check-in, and Docker/GitHub Actions releases.',
      bullets: [
        'Hubverse Platform: hubverse.in — Live campus event & club orchestration ecosystem.',
        'SQLite WAL Mode: Zero-lock concurrent read architecture slashing check-in latency.',
        'QR Admission Engine: Cryptographically signed offline-first QR ticket validation cutting queue times by 70%.',
        'Automated CI/CD: Docker containerization with GitHub Actions pipelines reducing deployment cycles by 60%.',
      ],
      images: [
        { src: '/assets/hubverse_project.webp', alt: 'Hubverse Platform' },
        { src: '/assets/vnr_parking_project.webp', alt: 'VNR Smart Parking Management' },
      ],
    },
    {
      period: '2025 – Present',
      role: 'Infrastructure & Security Lead – VJStartup, VNR VJIET (Oct 2025 – Present)',
      techStack: 'Linux (Ubuntu/Debian), VAPT, Nginx, UFW / IPTables, SSH Hardening, Fail2ban',
      description:
        'Directing server infrastructure security, vulnerability assessments, and systems hardening across incubated startups and institute servers.',
      bullets: [
        'Penetration Testing: Performed comprehensive VAPT across 5+ production Linux servers, remediating 15+ critical security misconfigurations.',
        'Server Hardening: Configured SSH public-key enforcement, UFW/iptables firewalls, and fine-grained RBAC policies.',
        'Intrusion Monitoring: Implemented real-time intrusion monitoring and log anomaly alerting with automated fail2ban IP mitigation.',
      ],
      images: [
        { src: '/assets/jarsh_wfa_project.webp', alt: 'Industrial Telemetry & Systems Security' },
      ],
    },
    {
      period: '2025',
      role: 'Server Management & DevOps Intern – Innovation Cell, VNR VJIET (Jul 2025 – Sep 2025)',
      techStack: 'Linux Administration, Nginx Load Balancing, Apache JMeter, Docker, Microservices, Bash',
      description:
        'Maintained 10+ backend microservices and 3 production web properties at 99.8% uptime; Nginx load balancing cut latency 35%, and JMeter testing improved throughput 40% at 1,000+ concurrent users.',
      bullets: [
        '99.8% Uptime SLA: Maintained 10+ backend microservices and 3 production web properties with high availability.',
        'Nginx Load Balancing: Configured upstream reverse proxies and caching, reducing response latency by 35%.',
        'Apache JMeter Benchmarking: Stress-tested APIs under sustained 1,000+ concurrent user loads, improving throughput by 40%.',
      ],
    },
    {
      period: '2024 – Present',
      role: 'Technical Coordinator – ISTE Student Chapter, VNR VJIET (Sep 2024 – Present)',
      techStack: 'Competitive Programming, Online Judges, System Architecture, Technical Mentorship',
      description:
        'Organized 4+ technical workshops and coding hackathons for 500+ students; managed live coding judge servers and problem sets.',
      bullets: [
        'Hackathons & Bootcamps: Organized 4+ technical workshops and coding hackathons for 500+ participants.',
        'Automated Judge System: Configured and operated real-time online judge servers and algorithmic evaluation problem sets.',
        'Technical Mentorship: Mentored junior engineering students in Data Structures, Algorithms, and Full-Stack Engineering.',
      ],
    },
    {
      period: '2024 – 2028',
      role: 'B.Tech in Computer Science – VNR VJIET (Aug 2024 – May 2028, 8.99 CGPA)',
      techStack: 'Operating Systems, Distributed Systems, Networks, Algorithms, Database Systems',
      description:
        'Pursuing Bachelor of Technology with an 8.99 / 10 CGPA (Aug 2024 – May 2028). Intermediate (MPC), TSBIE: 95.9%. Startup Expo Finalist at E-Summit 2026 (IIT Tirupati), Webathon 4.0 Finalist, Echo National Hackathon Finalist, and SPL Coding League Winner.',
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <div className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10" ref={containerRef}>
        <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
          <h2 className="text-lg md:text-5xl font-Ovo mb-4 text-black dark:text-white max-w-4xl">
            Changelog from my journey
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
            A timeline of the ideas I built, the challenges I met, and everything I learned along the way.
          </p>
        </div>

        <div ref={trackRef} className="relative max-w-7xl mx-auto pb-20">
          {items.map((item, idx) => (
            <div key={idx} className="flex justify-start pt-10 md:pt-40 md:gap-10">
              {/* Sticky milestone indicator */}
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                </div>
                <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500">
                  {item.period}
                </h3>
              </div>

              {/* Content column */}
              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                  {item.period}
                </h3>
                <div>
                  <h3 className="text-sm font-semibold dark:text-white">
                    {item.role}
                  </h3>
                  <p className="mt-2 mb-4 text-[11px] uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
                    Tech Stack: <span className="font-medium">{item.techStack}</span>
                  </p>
                  <p className="mb-6 text-xs md:text-sm text-neutral-800 dark:text-neutral-300 leading-relaxed">
                    {item.description}
                  </p>

                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="space-y-3 text-xs md:text-sm text-neutral-700 dark:text-neutral-300 mb-6">
                      {item.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="leading-relaxed">
                          • {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.images && item.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      {item.images.map((img, iIdx) => (
                        <img
                          key={iIdx}
                          src={img.src}
                          alt={img.alt}
                          className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset] md:h-44 lg:h-60"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Timeline rail with animated gradient beam */}
          <div
            style={{ height: `${height}px` }}
            className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full shadow-[0_0_12px_rgba(168,85,247,0.8)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
