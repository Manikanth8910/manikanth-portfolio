import React from 'react';
import { Layers, Sparkles, Smartphone, Truck } from 'lucide-react';
import { GlowingEffect } from './ui/GlowingEffect';

const FigmaIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    height="24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
    <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
  </svg>
);

interface ServiceItem {
  area: string;
  icon: React.ReactNode;
  title: string;
  about: string;
  technologies: string;
}

export const ServicesSection: React.FC = () => {
  const services: ServiceItem[] = [
    {
      area: 'md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]',
      icon: <Layers className="h-4 w-4 text-black dark:text-neutral-400" />,
      title: 'Full-Stack Websites',
      about: 'I build dynamic, high-performance full-stack websites — clean UI, strong backend architecture, smooth interactions, and optimized databases.',
      technologies: 'Next.js, Node.js, Express, PostgreSQL, Prisma, JWT, Tailwind CSS, Redis, LLM Models.',
    },
    {
      area: 'md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]',
      icon: <Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />,
      title: 'AI Chatbots & Agents',
      about: 'I develop intelligent AI Agents that automate support, onboarding, and domain-specific workflows — trained on your data and available 24/7.',
      technologies: 'PGVector, Vector DBs, LangChain, RAG, LLM Models, Next.js, Node.js, WebSockets.',
    },
    {
      area: 'md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]',
      icon: <Smartphone className="h-4 w-4 text-black dark:text-neutral-400" />,
      title: 'Android / IOS Applications',
      about: 'I build smooth, high-performance Android apps with React Native — modern UI, fluid interactions, and a native-like experience.',
      technologies: 'React Native, Node.js, MongoDB, JWT, Cloud Storage, LLM Models.',
    },
    {
      area: 'md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]',
      icon: <Truck className="h-4 w-4 text-black dark:text-neutral-400" />,
      title: 'E-commerce Platforms',
      about: 'End-to-end e-commerce systems — product flows, cart & checkout, admin dashboards, inventory tools, payments, and full deployment.',
      technologies: 'Next.js, Prisma, PostgreSQL, Razorpay/Stripe, Node.js, JWT, Redis, Cloud Hosting.',
    },
    {
      area: 'md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]',
      icon: <FigmaIcon className="h-4 w-4 text-black dark:text-neutral-400" />,
      title: 'Frontend Design Websites',
      about: 'Aesthetic, typography-driven websites for branding, advertising, and portfolios. Crisp layouts, strong visuals, and clean storytelling.',
      technologies: 'Next.js, Tailwind CSS, Framer Motion, ShadCN UI, Design Systems.',
    },
  ];

  return (
    <section className="w-full" id="services">
      {/* Section Header */}
      <div className="mx-6 md:mx-12 mt-24 font-Ovo">
        <h2 className="text-3xl md:text-5xl font-Ovo text-black dark:text-white">
          My Services
        </h2>
        <p className="mt-2 text-neutral-700 dark:text-neutral-300 max-w-md text-sm md:text-base font-Outfit">
          From full-stack development to AI automation, here’s what I can help you build.
        </p>
      </div>

      {/* Bento Grid */}
      <ul className="grid grid-cols-1 mx-6 md:mx-12 mb-28 mt-14 gap-6 md:grid-cols-12 md:grid-rows-3 lg:gap-6 xl:max-h-[34rem] xl:grid-rows-2 font-Ovo">
        {services.map((item, idx) => (
          <li key={idx} className={`min-h-[14rem] list-none ${item.area}`}>
            <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 border-gray-200 dark:border-neutral-800">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
                <div className="relative flex flex-1 flex-col justify-between gap-3">
                  <div className="w-fit rounded-lg border border-gray-300 dark:border-gray-600 p-2">
                    {item.icon}
                  </div>
                  <div className="space-y-3 font-Outfit">
                    <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                      {item.title}
                    </h3>
                    <div className="font-sans text-sm/[1.125rem] text-neutral-800 md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                      <p className="mb-3">
                        <strong className="text-black dark:text-white">About: </strong>
                        {item.about}
                      </p>
                      <p>
                        <strong className="text-black dark:text-white">Technologies: </strong>
                        {item.technologies}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ServicesSection;
