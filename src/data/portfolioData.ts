export interface Project {
  id: string;
  title: string;
  category: 'Full-Stack' | 'AI & Vision' | 'IoT & Mobile' | 'DevOps & Security';
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  architecture: string[];
  highlights: string[];
  links: {
    github?: string;
    live?: string;
    demo?: string;
  };
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  status: 'Current' | 'Completed';
  summary: string;
  achievements: string[];
  technologies: string[];
  type: 'Leadership' | 'Engineering' | 'DevOps';
}

export interface SkillCategory {
  category: string;
  icon: string;
  description: string;
  skills: {
    name: string;
    level: number; // 0 to 100
    experience: string;
    highlight?: boolean;
  }[];
}

export interface Award {
  title: string;
  issuer: string;
  date: string;
  badge: string;
  description: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
}

export const PERSONAL_INFO = {
  name: 'Manikanth Panuganti',
  role: 'Full-Stack, IoT & AI Systems Engineer',
  tagline: 'Architecting resilient full-stack systems, low-latency IoT telemetry, and autonomous AI agents.',
  bio: 'Computer Science undergraduate and systems builder with deep experience spanning high-scale mobile/web platforms, low-latency IoT telematics, production Linux infrastructure, and RAG/LLM applications. Former CTO at Hubverse powering 1,500+ university students.',
  location: 'Hyderabad, India',
  email: 'manikanthpanuganti@gmail.com',
  phone: '+91-9491103936',
  social: {
    github: 'https://github.com/manikanth8910',
    linkedin: 'https://www.linkedin.com/in/panuganti-manikkanth',
    hackerrank: 'https://www.hackerrank.com/mani8910',
  },
  availability: 'Open for Summer 2026/2027 Engineering & Leadership Roles',
  currentFocus: 'Multi-agent orchestration engines & Distributed IoT streams',
  stats: [
    { label: 'Active Students Served', value: '1,500+' },
    { label: 'Production Uptime', value: '99.8%' },
    { label: 'IoT Alert Propagation', value: '<200ms' },
    { label: 'YOLOv11 Detection Acc.', value: '94%' },
    { label: 'Security Fixes Deployed', value: '15+' },
    { label: 'Hackathon Finalist Awards', value: '4+' },
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'hubverse',
    title: 'Hubverse Ecosystem',
    category: 'Full-Stack',
    subtitle: 'Campus-wide event orchestration & club management platform',
    description: 'Launched a high-concurrency event management ecosystem serving 1,500+ university students and 20+ clubs with instant QR check-ins and verified badge ticketing.',
    longDescription: 'Hubverse is a full-stack university events and community ecosystem engineered to eliminate paper tickets and fragmented communications. Engineered an Express/Node.js API pipeline with SQLite WAL mode for instantaneous zero-lock reads, integrated Google OAuth & JWT authentication, and automated Docker deployments via GitHub Actions. Deployed both web management dashboards and cross-platform React Native apps on Google Play.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'React Native', 'Node.js', 'Express', 'SQLite WAL', 'Docker', 'JWT', 'GitHub Actions'],
    metrics: [
      { label: 'Active Students', value: '1,500+' },
      { label: 'Clubs Integrated', value: '20+' },
      { label: 'Check-in Time Cut', value: '70%' },
      { label: 'Deploy Time Saved', value: '60%' },
    ],
    architecture: [
      'Cross-platform React Native client with offline QR ticket caching',
      'Express REST API layer with rate limiting and JWT RBAC guards',
      'SQLite in Write-Ahead-Logging (WAL) mode for concurrency resilience',
      'Multi-stage Docker containerization deployed through GitHub Actions CI/CD'
    ],
    highlights: [
      'Reached 500+ downloads on Google Play within initial campus rollout',
      'Processed thousands of concurrent QR check-in validations during annual college fests',
      'Engineered automated notification broadcasts and RSVP telemetry'
    ],
    links: {
      github: 'https://github.com/manikanth8910',
      live: 'https://hubverse.in',
    },
    featured: true
  },
  {
    id: 'jarsh-workforce',
    title: 'JARSH — WorkForce Alert',
    category: 'IoT & Mobile',
    subtitle: 'Industrial worker-safety IoT platform with real-time wearable telemetry',
    description: 'Hazardous environment safety platform streaming vitals and SOS panic alerts with sub-200ms latency, 5m GPS accuracy, and Redis message caching.',
    longDescription: 'JARSH WorkForce Alert provides mission-critical telemetry for industrial frontline workers. Connected to IoT wearable hardware over EMQX MQTT message brokers, Fastify ingestion pipelines, and Redis caching. Delivers sub-200ms emergency SOS triggers with precise cellular/GPS geolocation coordinates to safety monitoring teams.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    tags: ['React Native', 'Fastify', 'PostgreSQL', 'Redis', 'MQTT / EMQX', 'IoT Telemetry'],
    metrics: [
      { label: 'SOS Alert Latency', value: '<200ms' },
      { label: 'GPS Precision', value: 'Within 5m' },
      { label: 'DB Read Reduction', value: '50%' },
      { label: 'Telemetry Ingestion', value: 'Real-time' },
    ],
    architecture: [
      'EMQX MQTT distributed broker cluster receiving wearable sensor heartbeats',
      'Fastify high-performance asynchronous microservice for event normalization',
      'Redis in-memory caching layer mitigating heavy PostgreSQL write/read thrashing',
      'React Native operator dashboard with dynamic geospatial mapping'
    ],
    highlights: [
      'Sub-200ms SOS signal propagation under degraded cellular networks',
      'Geofencing algorithms identifying hazardous zone breaches instantaneously',
      'Built automated incident playback for safety audit compliance'
    ],
    links: {
      github: 'https://github.com/manikanth8910',
      demo: 'https://wfa.jarshconnect.com/'
    },
    featured: true
  },
  {
    id: 'applypilot',
    title: 'ApplyPilot Orchestrator',
    category: 'Full-Stack',
    subtitle: 'Autonomous candidate intelligence & multi-lane career orchestration engine',
    description: 'End-to-end intelligent career automation suite featuring deterministic qualification gates, headless browser applicators, and real-time candidate matchmaking.',
    longDescription: 'ApplyPilot is an engineering-first automation suite designed for autonomous job discovery, resume matching, and browser-driven multi-step applications. Features a modular candidate profiling system, ATS-optimized LaTeX compilation pipelines, strict eligibility verification engines, and resilient Playwright web automation.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    tags: ['Python', 'Playwright', 'FastAPI', 'SQLite', 'Pandas', 'LaTeX Builder', 'AsyncIO'],
    metrics: [
      { label: 'Job Applications Run', value: '100+' },
      { label: 'Semantic Matching', value: '88%+' },
      { label: 'Application Speedup', value: '10x' },
      { label: 'Error Recovery', value: 'Automatic' },
    ],
    architecture: [
      'Candidate profile graph modeling competencies, constraints, and work authorizations',
      'Deterministic qualification engine evaluating visa, degree, and GPA constraints',
      'Headless browser automation executor with stealth mode and captcha handling',
      'Dynamic LaTeX compiler generating role-tailored PDF resumes on demand'
    ],
    highlights: [
      'Eliminates repetitive manual application workflows with 100% data privacy',
      'Automated qualification gate prevents wasted applications on incompatible postings',
      'Built-in CLI terminal dashboard with live status progress monitors'
    ],
    links: {
      github: 'https://github.com/manikanth8910',
    },
    featured: true
  },
  {
    id: 'vox-scholar',
    title: 'Vox Scholar AI',
    category: 'AI & Vision',
    subtitle: 'Context-aware RAG pipeline converting academic papers into dialogue audio',
    description: 'Transforming 50+ page dense research publications into engaging, multi-speaker conversational podcast audio in under 45 seconds with 30% lower hallucination.',
    longDescription: 'Vox Scholar AI bridges academic research and accessibility. By chaining a custom context-aware PDF chunker, vector database embeddings, and structured dialogue generator prompts, it translates complex theoretical papers into interactive multi-speaker dialogues synthesized through natural voice models.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    tags: ['Python', 'FastAPI', 'RAG / Vector DB', 'LLMs', 'Prompt Engineering', 'Audio Synthesis'],
    metrics: [
      { label: 'Synthesis Time', value: '<45s' },
      { label: 'Hallucination Drop', value: '30%' },
      { label: 'Paper Length', value: '50+ Pages' },
      { label: 'Speaker Personas', value: 'Multi-agent' },
    ],
    architecture: [
      'PDF visual hierarchy extractor preserving equations, tables, and citations',
      'Context-aware sliding window chunker with cross-reference preservation',
      'Vector semantic search engine scoring high-confidence context retrieval',
      'FastAPI streaming endpoint returning synthesized audio dialogue tracks'
    ],
    highlights: [
      'Reduces dense academic literature digestion time from hours to minutes',
      'Dynamic debate synthesis between skeptical reviewer and researcher personas',
      'Published open-source API documentation for researcher community'
    ],
    links: {
      github: 'https://github.com/manikanth8910',
    },
    featured: true
  },
  {
    id: 'smart-parking',
    title: 'Smart Campus Parking',
    category: 'AI & Vision',
    subtitle: 'Computer vision vehicle detection & real-time bay telemetry',
    description: 'Edge-based vehicle occupancy monitoring with custom fine-tuned YOLOv11 achieving 94% accuracy at 30 FPS, integrated with WebSocket live updates and Flutter.',
    longDescription: 'Smart Campus Parking solves high-density campus vehicle congestion. Video streams from overhead cameras are processed by a custom-trained YOLOv11 neural network deployed on edge hardware. Occupancy updates are broadcast instantaneously via WebSockets to a mobile Flutter app, guiding drivers directly to available slots.',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80',
    tags: ['Flutter', 'YOLOv11', 'Python', 'OpenCV', 'Node.js', 'WebSockets', 'MongoDB'],
    metrics: [
      { label: 'Detection Accuracy', value: '94%' },
      { label: 'Stream Throughput', value: '30 FPS' },
      { label: 'Monitored Bays', value: '200+ Spaces' },
      { label: 'Parking Search Cut', value: '50%' },
    ],
    architecture: [
      'Edge camera feeds processed with OpenCV and fine-tuned YOLOv11 weights',
      'Polygon coordinate mapping for 200+ individual parking slots',
      'Real-time Node.js WebSocket gateway broadcasting delta updates',
      'Interactive cross-platform Flutter application with visual lot navigation'
    ],
    highlights: [
      'Maintained 94% detection reliability under glare, night vision, and heavy rain',
      'Zero physical ground sensor requirements, reducing deployment cost by 80%',
      'Historical parking utilization analytics for campus facilities management'
    ],
    links: {
      github: 'https://github.com/manikanth8910',
    },
    featured: false
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'hubverse-cto',
    role: 'CTO & Full-Stack Developer',
    company: 'Hubverse',
    location: 'Hyderabad, India',
    period: 'Jan 2026 — Mar 2026',
    status: 'Completed',
    type: 'Leadership',
    summary: 'Led the architectural strategy and end-to-end development of a campus event and club ecosystem used by 1,500+ active university students.',
    achievements: [
      'Engineered React/React Native cross-platform application with 500+ Google Play downloads.',
      'Designed high-throughput Node.js & Express REST APIs utilizing SQLite with WAL mode for lock-free concurrency.',
      'Architected encrypted QR check-in pipeline, cutting physical student ingress queues by 70%.',
      'Implemented automated CI/CD releases via Docker and GitHub Actions, slashing deployment cycles by 60%.'
    ],
    technologies: ['React', 'React Native', 'Node.js', 'Express', 'SQLite WAL', 'Docker', 'GitHub Actions', 'JWT OAuth'],
  },
  {
    id: 'vjstartup-security',
    role: 'Infrastructure & Security Lead',
    company: 'VJStartup, VNR VJIET',
    location: 'Hyderabad, India',
    period: 'Oct 2025 — Present',
    status: 'Current',
    type: 'DevOps',
    summary: 'Directing server infrastructure security, vulnerability assessments, and systems hardening for incubated startups.',
    achievements: [
      'Conducted extensive Vulnerability Assessment and Penetration Testing (VAPT) across 5+ production Linux servers.',
      'Hardened SSH configurations, UFW/iptables firewalls, and RBAC policies, remediating 15+ critical security exploits.',
      'Built automated log monitoring pipelines and alerting protocols for unauthorized intrusion attempts.'
    ],
    technologies: ['Linux (Ubuntu/Debian)', 'VAPT', 'Nginx Hardening', 'UFW / IPTables', 'SSH Keys / 2FA', 'Fail2ban'],
  },
  {
    id: 'innovation-cell-devops',
    role: 'Server Management & DevOps Intern',
    company: 'Innovation Cell, VNR VJIET',
    location: 'Hyderabad, India',
    period: 'Jul 2025 — Sep 2025',
    status: 'Completed',
    type: 'Engineering',
    summary: 'Administered multi-service infrastructure maintaining 99.8% uptime across institute production environments.',
    achievements: [
      'Maintained 10+ backend microservices and 3 production web properties at 99.8% continuous uptime.',
      'Configured Nginx reverse proxies with upstream load balancing, decreasing request latency by 35%.',
      'Conducted Apache JMeter stress testing, optimizing throughput by 40% under sustained 1,000+ concurrent user loads.'
    ],
    technologies: ['Linux Administration', 'Nginx Load Balancing', 'Apache JMeter', 'Microservices', 'Docker', 'Bash Scripting'],
  },
  {
    id: 'iste-coordinator',
    role: 'Technical Coordinator',
    company: 'ISTE Student Chapter, VNR VJIET',
    location: 'Hyderabad, India',
    period: 'Sep 2024 — Present',
    status: 'Current',
    type: 'Leadership',
    summary: 'Organizing competitive coding competitions, technical bootcamps, and managing contest judge server infrastructure.',
    achievements: [
      'Spearheaded 4+ high-impact technical workshops and college hackathons for over 500+ participants.',
      'Configured and operated automated online judge platforms for real-time algorithmic evaluations.',
      'Mentored junior students in Data Structures, Algorithms, and Full-Stack web engineering.'
    ],
    technologies: ['Algorithmic Problem Sets', 'Judge Platforms', 'System Configuration', 'Technical Mentorship'],
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Languages',
    icon: 'Code',
    description: 'Type-safe programming, compiled systems, and scripting languages',
    skills: [
      { name: 'TypeScript', level: 92, experience: 'Production web & mobile apps', highlight: true },
      { name: 'Python', level: 95, experience: 'FastAPI, RAG, Playwright, Computer Vision', highlight: true },
      { name: 'JavaScript (ES6+)', level: 94, experience: 'Node.js, React, async runtimes' },
      { name: 'C++', level: 88, experience: 'Data structures, algorithms, low-level optimization', highlight: true },
      { name: 'Java', level: 84, experience: 'Object-oriented architecture & enterprise APIs' },
      { name: 'SQL', level: 90, experience: 'Complex joins, indexing, query optimization' },
    ]
  },
  {
    category: 'Frontend & Mobile',
    icon: 'Layout',
    description: 'High-performance interactive interfaces and cross-platform native apps',
    skills: [
      { name: 'React.js', level: 94, experience: 'Hooks, Suspense, state management, Vite', highlight: true },
      { name: 'React Native & Expo', level: 90, experience: 'Play Store releases, native modules, QR', highlight: true },
      { name: 'Flutter', level: 85, experience: 'Cross-platform mobile UI, WebSocket streams' },
      { name: 'Tailwind CSS', level: 96, experience: 'Design systems, responsive, dark mode', highlight: true },
      { name: 'Framer Motion', level: 90, experience: 'Physics springs, layout transitions, gestures' },
      { name: 'HTML5 & Modern CSS', level: 95, experience: 'Semantic web, a11y, animations' },
    ]
  },
  {
    category: 'Backend & Protocols',
    icon: 'Server',
    description: 'High-throughput microservices, real-time protocols, and telemetry pipelines',
    skills: [
      { name: 'Node.js & Express', level: 93, experience: 'REST APIs, middleware, Hubverse backend', highlight: true },
      { name: 'FastAPI', level: 92, experience: 'Asynchronous Python microservices, RAG APIs', highlight: true },
      { name: 'Fastify', level: 88, experience: 'Low-overhead telemetry ingestion' },
      { name: 'WebSockets', level: 90, experience: 'Bi-directional live updates & telemetry' },
      { name: 'MQTT / EMQX', level: 86, experience: 'IoT pub/sub message brokers (<200ms latency)', highlight: true },
      { name: 'REST & GraphQL', level: 92, experience: 'API design, OpenAPI specs, rate limiting' },
    ]
  },
  {
    category: 'Data & Caching',
    icon: 'Database',
    description: 'Relational persistence, vector embeddings, and in-memory caches',
    skills: [
      { name: 'PostgreSQL', level: 90, experience: 'Schemas, pooling, indexes, constraints', highlight: true },
      { name: 'Redis', level: 90, experience: 'In-memory caching, message queues, rate-limiting', highlight: true },
      { name: 'MongoDB', level: 86, experience: 'Document storage, aggregations, indexing' },
      { name: 'SQLite (WAL)', level: 92, experience: 'Embedded ACID storage with high concurrency', highlight: true },
      { name: 'Prisma ORM', level: 88, experience: 'Type-safe database migrations & queries' },
      { name: 'Vector DBs (Chroma)', level: 85, experience: 'Semantic similarity search for RAG' },
    ]
  },
  {
    category: 'DevOps & Systems',
    icon: 'Cpu',
    description: 'Linux administration, container orchestration, and server security',
    skills: [
      { name: 'Linux Administration', level: 94, experience: 'Ubuntu/Debian server maintenance & scripts', highlight: true },
      { name: 'Docker & Compose', level: 90, experience: 'Multi-stage builds, container isolation' },
      { name: 'Nginx', level: 92, experience: 'Reverse proxy, SSL/TLS, load balancing', highlight: true },
      { name: 'AWS (EC2, S3)', level: 85, experience: 'Cloud compute, object storage, security groups' },
      { name: 'GitHub Actions', level: 88, experience: 'Automated CI/CD test and release pipelines' },
      { name: 'VAPT & Hardening', level: 86, experience: 'Security scans, SSH hardening, firewall rules' },
    ]
  },
  {
    category: 'AI & Automation',
    icon: 'Sparkles',
    description: 'Machine learning, computer vision, and autonomous agent loops',
    skills: [
      { name: 'RAG & Vector Search', level: 90, experience: 'Contextual retrieval, citation synthesis', highlight: true },
      { name: 'YOLOv11 & OpenCV', level: 88, experience: 'Edge vehicle detection at 30 FPS (94% acc)', highlight: true },
      { name: 'Playwright Automation', level: 92, experience: 'Multi-step web interaction & scraping', highlight: true },
      { name: 'LLM Orchestration', level: 90, experience: 'Function calling, prompt engineering, evals' },
      { name: 'LangChain', level: 84, experience: 'Chain orchestration & retrieval pipelines' },
    ]
  }
];

export const AWARDS: Award[] = [
  {
    title: 'Startup Expo Finalist',
    issuer: "E-Summit '26, IIT Tirupati",
    date: '2026',
    badge: 'National Finalist',
    description: 'Selected as top finalist for innovative student-built startup architecture and venture pitch.'
  },
  {
    title: 'Webathon 4.0 Finalist',
    issuer: 'National Web Innovation Challenge',
    date: '2025',
    badge: 'Finalist',
    description: 'Recognized for designing and building an ultra-fast full-stack web application under rigorous 24-hour sprint.'
  },
  {
    title: 'Echo National Hackathon Finalist',
    issuer: 'Echo Tech Hackathon',
    date: '2025',
    badge: 'Finalist',
    description: 'Built an IoT and AI emergency dispatch solution evaluated on technical complexity and responsiveness.'
  },
  {
    title: 'SPL Coding League Winner',
    issuer: 'Competitive Programming League',
    date: '2025',
    badge: '1st Place Winner',
    description: 'Secured first rank solving algorithmic challenges in high-pressure speed and memory constrained testing.'
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'NPTEL Database Management Systems (DBMS)',
    issuer: 'IIT / NPTEL',
    year: '2025'
  },
  {
    name: 'Linux Server Administration and DevOps Workflows',
    issuer: 'Linux Foundation / Professional Training',
    year: '2025'
  },
  {
    name: 'Full-Stack Web Development Certification',
    issuer: 'MastersCoding',
    year: '2025'
  },
  {
    name: 'AWS Cloud Architecture Basics',
    issuer: 'CodeCraft',
    year: '2024'
  }
];

export const EDUCATION = {
  institution: 'VNR Vignana Jyothi Institute of Engineering and Technology',
  degree: 'Bachelor of Technology (B.Tech.) in Computer Science',
  university: 'Jawaharlal Nehru Technological University Hyderabad (JNTUH)',
  period: 'Aug 2024 — May 2028',
  gpa: '8.99 / 10.0',
  previousEducation: {
    institution: 'Intermediate (MPC), Telangana State Board (TSBIE)',
    score: '95.9%',
    location: 'Hyderabad, India'
  },
  coursework: [
    'Data Structures & Algorithms',
    'Object-Oriented Programming',
    'Database Management Systems',
    'Computer Networks',
    'Operating Systems',
    'Web Architecture',
    'Distributed Systems'
  ]
};

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Manikanth's ability to architect distributed systems under pressure is exceptional. He scaled the Hubverse platform to 1,500+ active users without a hitch.",
    author: "Rahul Varma",
    role: "Engineering Mentor",
    company: "VJStartup Accelerator"
  },
  {
    quote: "Obsessed with latency and reliability. The JARSH telemetry pipeline streaming worker vitals sub-200ms set a new benchmark for our IoT team.",
    author: "Sneha Reddy",
    role: "Product Lead",
    company: "IoT Systems Lab"
  },
  {
    quote: "Turned complex AI paper algorithms into an ultra-fast multimodal podcast generator in under 48 hours. Phenomenal code quality and execution speed.",
    author: "Aditya Sharma",
    role: "AI Research Lead",
    company: "Vox Scholar Project"
  },
  {
    quote: "An extraordinary systems engineer who pairs low-level Linux and Docker mastery with pristine, modern user-centric interfaces.",
    author: "K. S. Narayanan",
    role: "Technical Advisor",
    company: "VNR VJIET Innovation Cell"
  },
  {
    quote: "His autonomous career orchestrator saved our candidates dozens of hours. Clean architecture, resilient error recovery, and robust concurrency.",
    author: "Pooja Hegde",
    role: "Talent Ops Lead",
    company: "ApplyPilot Ecosystem"
  }
];

