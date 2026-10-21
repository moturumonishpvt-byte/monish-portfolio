import {
  Project,
  SkillCategory,
  JourneyMilestone,
  HackathonChallenge,
  ExperienceItem,
  TeachingItem,
  ContentMediaItem,
  AchievementItem,
  EducationItem,
  CertificationItem,
  CurrentlyStatus,
  AboutSectionData,
} from './types';

export const personalInfo = {
  name: 'Moturu Monish',
  tagline: 'Software Engineer (SDE) • Full Stack & AI/ML Systems',
  quote: 'A human can achieve anything with the proper resources and a given amount of time.',
  title: 'Software Engineer (SDE) • Full Stack & AI/ML Systems',
  location: 'Visakhapatnam, India',
  phone: '+91 6303636530',
  email: 'moturumonishofcl@gmail.com',
  github: 'https://github.com/moturumonishpvt-byte',
  linkedin: 'https://linkedin.com/in/moturu-monish-joyboy',
  bio: 'Software Engineer (SDE) specializing in Full Stack and AI/ML Systems. Experienced in architecting offline-first edge applications, real-time security heuristics, and high-performance web platforms.',
};

export const aboutData: AboutSectionData = {
  introduction:
    'I am a Computer Science (Data Science) undergraduate at Vignan’s Institute of Information Technology with an 8.64 GPA, focused on building low-latency intelligent systems and robust full-stack infrastructure.',
  mindset:
    'I approach software engineering with mechanical sympathy for performance under constraint—from quantizing on-device neural network weights and writing native Kotlin modules, to establishing strict database Row-Level Security and responsive interfaces.',
  philosophy:
    'A human can achieve anything with the proper resources and a given amount of time.',
  curiosityAreas: [
    'On-Device Edge AI & TensorFlow Lite / ONNX Optimization',
    'Real-Time Heuristic Security Classifiers & MV3 Extensions',
    'Resilient Distributed State & Supabase Row-Level Security',
    'Algorithmic Fairness & Speech Perspective Modeling',
  ],
  buildingPrinciples: [
    {
      title: 'Performance Under Constraint',
      desc: 'Optimizing inference times, memory footprints, and roundtrips down to milliseconds rather than relying on bloated cloud overhead.',
    },
    {
      title: 'Full-Stack Ownership',
      desc: 'Architecting systems end-to-end from embedded sensors and BLE handshakes to backend API triggers and editorial user interfaces.',
    },
    {
      title: 'Algorithmic Rigor',
      desc: 'Auditing bias in statistical models, ensuring explainability for end-users, and enforcing cryptographic audit verification.',
    },
  ],
};

export const journeyMilestones: JourneyMilestone[] = [
  {
    year: '2023',
    phase: '01 • START',
    title: 'Foundations & Algorithmic Curiosity',
    summary:
      'Stepped into Computer Science (Data Science) at Vignan’s Institute. Built strong core competencies in Data Structures & Algorithms, Java, Python, and relational database systems.',
    learned: 'Data Structures, Algorithms, Relational SQL, Object-Oriented Java & Python.',
    changed: 'Shifted mindset from passive consumer of technology to an active builder seeking mechanical sympathy with hardware and data.',
    highlightTag: 'ACADEMIC COMMENCEMENT',
    technologies: ['Python', 'Java', 'SQL', 'Data Structures'],
  },
  {
    year: '2024',
    phase: '02 • BUILD',
    title: 'Web Development Lead & Production Portals',
    summary:
      'Appointed Web Development Lead at E-Cell, VIIT. Directed digital infrastructure for 500+ attendees with 99.9% uptime and mentored 5 junior developers in modern React and Git workflows.',
    learned: 'Component Lifecycles, Supabase Row-Level Security, Team Leadership & Mentorship.',
    changed: 'Learned how to coordinate engineering squads, manage production deployments, and write modular, maintainable UI systems.',
    highlightTag: 'LEADERSHIP & PLATFORMS',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Node.js', 'Git'],
  },
  {
    year: '2025',
    phase: '03 • AI / ML',
    title: 'Applied Machine Learning & IIT Bombay NEC Finalist',
    summary:
      'Engineered PhishGuard AI (88 features, 11,431 URLs in FastAPI) and Skill Connect (22 routes, 8 tables). Competed in IIT Bombay National Entrepreneurship Challenge, finishing as National Finalist in the Top 0.6% of 1,000+ teams.',
    learned: 'Feature Extraction, Scikit-learn Pipelines, Random Forest Tuning, Fast Inference.',
    changed: 'Bridged classical full-stack applications with high-accuracy, on-the-fly ML classification models.',
    highlightTag: 'NATIONAL FINALIST & ML',
    technologies: ['Scikit-learn', 'FastAPI', 'Pandas', 'NumPy', 'Chrome MV3 Extension', 'Supabase'],
  },
  {
    year: '2026',
    phase: '04 • EDGE AI',
    title: 'Offline-First Edge Systems & Fairness Auditing',
    summary:
      'Engineered Academic Monitor—a 3-app suite with on-device MobileFaceNet and BLE handshakes (25–40x Kotlin speedup). Built Aequitas AI Bias Mitigation Platform with Gemma LLM and Perspective API.',
    learned: 'TensorFlow Lite on Edge, BLE Advertising Protocols, Open-Source LLMs (Gemma), ONNX Runtime.',
    changed: 'Proved that state-of-the-art AI can execute directly on budget client hardware without expensive cloud compute.',
    highlightTag: 'EDGE AI & RESEARCH',
    technologies: ['React Native', 'Kotlin', 'TensorFlow Lite', 'ONNX', 'BLE', 'Gemma', 'Flask'],
  },
  {
    year: 'PRESENT',
    phase: '05 • SDE READY',
    title: 'Scaling Systems & Seeking SDE Opportunities',
    summary:
      'Expanding into agentic systems and high-throughput backend infrastructure while actively seeking full-time Software Development Engineer (SDE) and AI/ML Systems roles.',
    learned: 'Distributed Systems, Production Performance Profiling, High-Impact Engineering.',
    changed: 'Transitioning to full-time engineering roles to build scalable platforms and mission-critical software.',
    highlightTag: 'READY TO SHIP',
    technologies: ['Python', 'TypeScript', 'React', 'FastAPI', 'Node.js', 'PostgreSQL'],
  },
];

export const skillsData: SkillCategory[] = [
  {
    name: 'Languages',
    skills: ['Python', 'Java', 'TypeScript', 'JavaScript', 'SQL', 'Kotlin'],
    iconName: 'Code2',
    description: 'Typed, compiled, and scripting languages with strong algorithmic and object-oriented foundations.',
  },
  {
    name: 'AI / ML & Edge',
    skills: [
      'TensorFlow Lite',
      'ONNX Runtime',
      'Scikit-learn',
      'Hugging Face / Gemma',
      'LLM Integration',
      'Pandas',
      'NumPy',
      'Prompt Engineering',
    ],
    iconName: 'Cpu',
    description: 'On-device tensor quantization, tabular classification, fairness auditing, and NLP pipelines.',
  },
  {
    name: 'Full Stack / Web',
    skills: [
      'React.js',
      'React Native',
      'Node.js',
      'Express.js',
      'FastAPI',
      'Flask',
      'REST APIs',
      'WebSockets',
      'Tailwind CSS',
      'MUI',
    ],
    iconName: 'Layout',
    description: 'High-performance interactive frontends, mobile client apps, and low-latency REST/WebSocket backends.',
  },
  {
    name: 'Databases / Cloud / Tools',
    skills: [
      'PostgreSQL',
      'Supabase',
      'SQLite',
      'MongoDB (familiar)',
      'Docker',
      'Git',
      'GitHub Actions',
      'Playwright',
      'Vercel',
    ],
    iconName: 'Database',
    description: 'Relational database schema modeling, Row-Level Security, containerization, and automated workflows.',
  },
];

export const projectCaseStudies: Project[] = [
  {
    id: 'academic-monitor',
    title: 'Academic Monitor System',
    period: 'Jan. 2026 – Present',
    role: 'Creator & Full-Stack Developer',
    shortDescription: 'Offline-first attendance • Edge AI • BLE networking',
    challengeSolved: 'Offline-first attendance without continuous internet access using biometric verification and BLE networking.',
    longDescription:
      'Integrated software architecture with 3 connected components designed to reduce dependence on continuous internet access during classroom attendance. Combines facial verification, proximity-aware BLE communication, and session-based OTP confirmation, separating faculty session management, student attendance, and administrative functionality into dedicated components.',
    techStack: ['React Native', 'TensorFlow Lite', 'BLE', 'Supabase', 'TypeScript'],
    problem:
      'Traditional classroom check-ins suffer from proxy attendance, continuous cloud connectivity dependencies, and latency issues in institutional environments.',
    architecture: [
      'Stage 1: Faculty App: Broadcasts active classroom sessions over Bluetooth Low Energy (BLE), allowing nearby student devices to discover the class and initiate attendance.',
      'Stage 2: Student App: Performs on-device facial verification and scans for faculty broadcasts. RSSI-based proximity checks and session OTP verification support classroom attendance validation.',
      'Stage 3: Admin Web Client: Provides the web-based administrative component, with facial-recognition model assets and a web application interface for the wider attendance system.',
    ],
    impact: [
      'Engineered an offline-first attendance architecture eliminating dependence on continuous internet access during classroom sessions.',
      'Implemented native Kotlin modules for MobileFaceNet feature extraction, achieving a 25–40x speedup over JS-based inference.',
      'Secured classroom validation using multi-factor checks: BLE RSSI proximity gating, dynamic OTP confirmation, and facial embedding match.',
      'Decoupled system into 3 dedicated components: Faculty App (BLE host), Student App (edge scanner), and Admin Web dashboard.',
    ],
    githubUrl: 'https://github.com/moturumonishpvt-byte/Admin_Web_app_code',
    liveUrl: 'https://github.com/moturumonishpvt-byte/Admin_Web_app_code',
    repositories: [
      { name: 'Admin Web', url: 'https://github.com/moturumonishpvt-byte/Admin_Web_app_code' },
      { name: 'Faculty App', url: 'https://github.com/moturumonishpvt-byte/FacultyAPP_SC' },
      { name: 'Student App', url: 'https://github.com/moturumonishpvt-byte/StudentAPP_SC' },
    ],
    featured: true,
  },
  {
    id: 'phishguard',
    title: 'PhishGuard AI',
    period: 'Dec. 2025',
    role: 'ML & Extension Developer (Creator)',
    shortDescription: 'Machine learning • URL analysis • Browser security',
    challengeSolved: 'Real-time phishing website detection with explainable machine learning and browser DOM protection.',
    longDescription:
      'Embedded security intelligence combining machine learning, URL analysis, and browser security. Integrates machine learning into a practical website-security workflow, helping users recognize suspicious URLs and potential brand impersonation, and providing explainable warnings instead of relying solely on an unexplained risk label.',
    techStack: ['Python', 'Random Forest', 'FastAPI', 'SQLite', 'Chrome Extension'],
    problem:
      'Ephemeral zero-day phishing sites and deceptive URLs bypass static domain blacklists and expose users to credential harvesting.',
    architecture: [
      'Stage 1: URL Feature Analysis: Extracts URL-related features and checks suspicious patterns to identify potentially malicious or deceptive websites.',
      'Stage 2: Machine Learning Detection: Uses a Random Forest classifier to assess phishing risk based on URL features, with additional checks for suspicious domains and brand impersonation.',
      'Stage 3: Browser Extension & API: Connects browser-side checks with a local FastAPI backend and SQLite storage to deliver detection results and explain security warnings.',
    ],
    impact: [
      'Trained a 200-estimator Random Forest classifier over 11,431 balanced benign and malicious URLs with 88 extracted lexical/structural features.',
      'Engineered a hybrid scoring engine (70% ML probability + 30% heuristic rule checks) in FastAPI with sub-85ms average response times.',
      'Developed a Chrome MV3 extension with real-time DOM injection to warn users with explainable risk breakdown instead of opaque blocks.',
    ],
    githubUrl: 'https://github.com/moturumonishpvt-byte/Phishing_detection',
    liveUrl: 'https://github.com/moturumonishpvt-byte/Phishing_detection',
    featured: true,
  },
  {
    id: 'skill-connect',
    title: 'Skill Connect',
    period: '2025 – 2026',
    role: 'Full-Stack Web Developer (Creator)',
    shortDescription: 'Skill discovery • Project collaboration • Institutional networking',
    challengeSolved: 'Enabling campus students and faculty to discover peers, form teams, and manage collaboration requests.',
    longDescription:
      'Collaborative platform architecture for institutional networking, skill discovery, and multidisciplinary project collaboration. Brings institutional networking and project collaboration into a shared platform, organizes collaboration requests and their acceptance or rejection, and uses role-based access patterns and Supabase Row Level Security to support controlled access to platform data.',
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase'],
    problem:
      'Students and faculty face high friction in finding cross-disciplinary collaborators, forming teams around shared project ideas, and managing member permissions.',
    architecture: [
      'Stage 1: Member Profiles: Enables students and faculty to maintain profiles containing their skills, biographies, contact details, and social links.',
      'Stage 2: Project & Team Matching: Supports project discovery, skill-based member searches, collaboration requests, and team formation around shared project ideas.',
      'Stage 3: Administration & Governance: Provides administrative tools for user management, skill approvals, project promotion, announcements, and community reporting.',
    ],
    impact: [
      'Built a complete campus collaboration platform across 22 responsive views and 8 normalized relational tables in Supabase PostgreSQL.',
      'Enforced granular Row-Level Security (RLS) policies and role-based access to safeguard private student profiles, team requests, and project data.',
      'Integrated real-time invite lifecycle (pending, accepted, rejected) and skill tagging to streamline multidisciplinary team formation.',
    ],
    githubUrl: 'https://github.com/moturumonishpvt-byte/skillconnect2025',
    liveUrl: 'https://github.com/moturumonishpvt-byte/skillconnect2025',
    featured: true,
  },
  {
    id: 'aequitas-platform',
    title: 'Aequitas Platform',
    period: '2026',
    role: 'Developer & AI Researcher',
    shortDescription: 'Recruitment analytics • Accent bias • Fairness mitigation',
    challengeSolved: 'Auditing AI recruitment systems for accent-based bias and evaluating selection-rate parity disparities.',
    longDescription:
      'AI fairness and model auditing platform engineered to evaluate demographic selection disparities and accent-based bias in automated recruitment. Makes demographic disparities in AI-assisted hiring easier to investigate, supports analysis of accent-related bias and differences in recruitment outcomes, and provides a structured workflow for fairness auditing and mitigation reporting.',
    techStack: ['Python', 'Flask', 'Supabase', 'Fairness Metrics', 'Data Analytics'],
    problem:
      'Automated candidate assessment pipelines often introduce systemic disparities by penalizing regional accents and non-standard dialects in video and audio interviews.',
    architecture: [
      'Stage 1: Recruitment Data Ingestion: Accepts structured candidate data, including demographic attributes, accent classifications, AI interview scores, hiring decisions, and transcript notes.',
      'Stage 2: Bias Audit & Metrics: Evaluates selection-rate parity and recall gaps across demographic groups, helping identify disparities in AI-assisted recruitment decisions.',
      'Stage 3: Mitigation & Reporting: Incorporates reweighting-based mitigation concepts and fairness analytics to support more equitable selection decisions and transparent audit reporting.',
    ],
    impact: [
      'Implemented demographic parity, equalized odds, and disparate impact ratio evaluations to audit hiring decisions across regional dialect cohorts.',
      'Integrated Google Perspective API and open-source NLP evaluation to benchmark sentiment and toxicity bias across non-native spoken transcripts.',
      'Engineered reweighting mitigation algorithms reducing statistical selection-rate disparity between accent demographic groups.',
    ],
    githubUrl: 'https://github.com/moturumonishpvt-byte/Aequitas_Platform',
    liveUrl: 'https://github.com/moturumonishpvt-byte/Aequitas_Platform',
    featured: true,
  },
  {
    id: 'dag-nodecanvas',
    title: 'DAG NodeCanvas',
    period: '2025',
    role: 'Backend & Graph Algorithms Developer',
    shortDescription: 'Node-based workflows • Dependency graphs • Cycle validation',
    challengeSolved: 'Visual workflow canvas with automated cycle detection and graph dependency processing.',
    longDescription:
      'Visual workflow engineering platform representing task steps as nodes and dependencies as connections. Makes workflow dependencies more intuitive to understand, provides a graph-oriented foundation for workflow validation, and includes dedicated testing and verification code for graph-related behavior.',
    techStack: ['Python', 'Graph Algorithms', 'DAG Validation', 'API Testing'],
    problem:
      'Complex multi-step task execution pipelines easily develop circular dependencies and execution deadlocks without robust cycle validation.',
    architecture: [
      'Stage 1: Visual Workflow Design: Represents workflow steps as nodes and their dependencies as connections, making task relationships easier to inspect.',
      'Stage 2: Graph Processing: Uses backend graph utilities to process workflow relationships and support validation of graph structures.',
      'Stage 3: Validation & Testing: Includes backend API tests, graph tests, and cycle-verification utilities to help detect invalid dependency structures.',
    ],
    impact: [
      'Implemented Kahn’s topological sort and Tarjan’s strongly connected components algorithm in Python for real-time circular dependency detection.',
      'Built interactive visual node canvas enabling drag-and-drop workflow authoring with live validation feedback.',
      'Authored automated test suites verifying cycle prevention, branch isolation, and deterministic task execution orders.',
    ],
    githubUrl: 'https://github.com/moturumonishpvt-byte/DAG_NodeCanvas',
    liveUrl: 'https://github.com/moturumonishpvt-byte/DAG_NodeCanvas',
    featured: true,
  },
  {
    id: 'whis-assistant',
    title: 'WHIS — Personal AI Assistant',
    period: '2025 – 2026',
    role: 'Python & Systems Developer (Creator)',
    shortDescription: 'Personal AI assistant • Model management • Tool execution',
    challengeSolved: 'Local-first modular AI assistant integrating memory, tool execution, and local model lifecycle management.',
    longDescription:
      'Local-first personal AI assistant architecture organizing AI inference, context management, and automation into modular subsystems. Structures an AI assistant around distinct, maintainable subsystems, separates model lifecycle management from memory, agent execution, and automation, and establishes a foundation for combining AI reasoning with tool-assisted tasks on Windows.',
    techStack: ['Python', 'AI Inference', 'Memory & Retrieval', 'Speech Processing', 'Automation'],
    problem:
      'Monolithic AI client scripts lack modular lifecycle boundaries, complicating local model management, conversational context retention, and reliable tool execution.',
    architecture: [
      'Stage 1: AI Runtime & Model Management: Organizes AI inference, model loading, lifecycle management, resource handling, and routing within a modular Python architecture.',
      'Stage 2: Context & Memory: Provides dedicated components for conversational context, memory management, embeddings, and retrieval to support context-aware interactions.',
      'Stage 3: Agents & Automation: Separates planning, execution, observation, and verification into agent modules, alongside audio processing and automation components.',
    ],
    impact: [
      'Architected a local-first modular assistant in Python with decoupled subsystems for model lifecycle, vector memory, and tool execution.',
      'Integrated local embedding retrieval for context persistence across user sessions without sending sensitive queries to cloud APIs.',
      'Created native OS automation capabilities on Windows with safety sandboxing and structured step verification before execution.',
    ],
    githubUrl: 'https://github.com/moturumonishpvt-byte/Whis',
    liveUrl: 'https://github.com/moturumonishpvt-byte/Whis',
    featured: true,
  },
  {
    id: 'system-gamified',
    title: 'S.Y.S.T.E.M.',
    period: '2024 – 2025',
    role: 'Frontend Developer & Creator',
    shortDescription: 'Habit tracking • Quest progression • Personal development',
    challengeSolved: 'Gamifying habit formation and daily routines into an RPG quest and attribute leveling system.',
    longDescription:
      'Gamified productivity system converting everyday tasks and personal development into a structured, game-inspired progression interface. Connects quest completion with experience points and leveling mechanics while keeping user progress available across browser sessions using local persistence.',
    techStack: ['React', 'TypeScript', 'Vite', 'Local Storage'],
    problem:
      'Traditional todo lists lack engagement and feedback loops, leading to high abandonment rates in habit tracking and personal goal achievement.',
    architecture: [
      'Stage 1: Player Profile & Attributes: Tracks player level, experience points, rank, and personal attributes through a game-inspired progression interface.',
      'Stage 2: Quest Management: Supports daily routines and custom quests, turning personal goals into trackable activities with experience rewards.',
      'Stage 3: Skills, Inventory & Persistence: Organizes skills, inventory, and an in-app shop while saving progress through browser local storage.',
    ],
    impact: [
      'Engineered an RPG-style productivity engine turning daily habits into interactive quests, experience curves, and stat leveling.',
      'Designed a zero-backend, client-side architecture using schema-validated localStorage persistence with JSON export/import backup.',
      'Implemented animated XP rewards and milestone badges in React & Tailwind, maintaining 60fps interaction during streak calculations.',
    ],
    githubUrl: 'https://github.com/moturumonishpvt-byte/SYSTEM.1',
    liveUrl: 'https://github.com/moturumonishpvt-byte/SYSTEM.1',
    featured: true,
  },
];

export const hackathonsData: HackathonChallenge[] = [
  {
    id: 'nec-iit-bombay',
    name: 'National Entrepreneurship Challenge (NEC) 2025',
    organization: 'IIT Bombay',
    date: '2025',
    problem:
      'Formulating, prototyping, and defending an end-to-end tech-enabled venture architecture capable of scaling across collegiate ecosystems.',
    idea: 'A real-time campus collaboration and talent matchmaking platform with structured peer accountability and verifiable milestone tracking.',
    build:
      'Engineered interactive software prototypes, relational schemas, and pitch deliverables through multiple rigorous evaluation stages.',
    role: 'Lead Full-Stack Architect & Team Leader',
    technologies: ['React', 'TypeScript', 'Supabase', 'Node.js', 'Product Architecture'],
    result: 'National Finalist — Ranked in the Top 0.6% out of 1,000+ contending teams across India.',
    rank: 'Top 0.6% Nationally',
    lessonsLearned:
      'Building under intense competition pressure taught me that architectural clarity, rapid iteration, and reliable data contracts outweigh raw feature volume.',
    githubUrl: 'https://github.com/moturumonishpvt-byte',
  },
  {
    id: 'academic-monitor-sprint',
    name: 'Academic Monitor Offline Biometrics Build',
    organization: 'Independent Engineering Sprint',
    date: '2026',
    problem:
      'Eliminating proxy attendance in academic environments without relying on continuous internet connectivity or costly dedicated hardware.',
    idea: 'Combine RSSI-gated BLE proximity handshakes with on-device MobileFaceNet inference accelerated via native Kotlin modules.',
    build:
      'Engineered the three-app suite (Student, Faculty, Admin) and reduced face inference latency from 6,000ms down to 200ms using native Kotlin modules.',
    role: 'Lead Full Stack & AI Architect',
    technologies: ['React Native', 'Kotlin', 'TensorFlow Lite', 'BLE Protocol', 'Supabase'],
    result: 'Achieved 25–40x on-device inference speedup with zero internet requirement for attendance verification.',
    rank: 'Core Architecture',
    lessonsLearned:
      'On-device tensor quantization and native platform bridges outperform cloud-dependent APIs for localized, low-latency verification.',
    githubUrl: 'https://github.com/moturumonishpvt-byte',
  },
];

export const experienceData: ExperienceItem[] = [
  {
    id: 'ecell-lead',
    role: 'Web Development Lead',
    organization: 'E-Cell, Vignan’s Institute of Information Technology',
    type: 'leadership',
    period: 'Aug. 2024 – Dec. 2025',
    location: 'Visakhapatnam, India',
    details: [
      'Directed web infrastructure development for official entrepreneurship portals.',
      'Maintained 99.9% uptime during peak campus event registrations, handling 500+ participants.',
      'Mentored 5 junior developers on modern React patterns, state management, and Git workflows.',
    ],
    impact: 'Maintained 99.9% uptime across 500+ participant registrations and mentored 5 junior developers.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Supabase', 'Git'],
  },
  {
    id: 'guesss-ambassador',
    role: 'Campus Ambassador',
    organization: 'GUESSS India • IIT Mandi',
    type: 'ambassadorship',
    period: 'Aug. 2025 – Dec. 2025',
    location: 'Visakhapatnam / South India',
    details: [
      'Served as the primary regional liaison for the global GUESSS India entrepreneurship research initiative.',
      'Collected 100+ validated survey responses evaluating collegiate entrepreneurial intentions across South India.',
    ],
    impact: 'Gathered 100+ validated research survey responses for collegiate entrepreneurship analysis.',
    technologies: ['Data Collection', 'Campus Outreach'],
  },
];

export const leadershipData = experienceData;

export const teachingAndContentData = {
  teaching: [
    {
      title: 'React & Modern Git Workflows Mentorship',
      platform: 'E-Cell Developer Mentorship',
      description:
        'Mentored 5 junior developers in modern React component patterns, state management, clean styling practices, and collaborative Git workflows.',
      topics: ['React Hooks', 'Git Branching & PRs', 'TypeScript Basics', 'UI Consistency'],
      actionLabel: 'View GitHub Profile',
      actionUrl: 'https://github.com/moturumonishpvt-byte',
      learnersCount: '5 Junior Developers Mentored',
    },
    {
      title: 'Data Structures & Algorithms Peer Study',
      platform: 'Campus Academic Circle',
      description:
        'Conducted peer study and problem-solving sessions on core data structures, algorithms, and relational SQL database querying.',
      topics: ['Data Structures', 'Algorithmic Complexity', 'SQL Queries', 'Java / Python'],
      actionLabel: 'View GitHub Profile',
      actionUrl: 'https://github.com/moturumonishpvt-byte',
    },
  ] as TeachingItem[],
  content: [
    {
      title: 'Offline-First Attendance: MobileFaceNet TFLite & Native Kotlin Optimization',
      type: 'Architecture Breakdown' as const,
      description:
        'Technical breakdown of accelerating on-device facial recognition inference from 6,000ms to 200ms (25–40x speedup) using native Kotlin modules.',
      duration: 'Architecture Case Study',
      tag: 'Edge AI & Mobile',
      actionUrl: 'https://github.com/moturumonishpvt-byte',
    },
    {
      title: 'Real-Time Phishing URL Detection with Random Forests & MV3 Extension',
      type: 'Technical Guide' as const,
      description:
        'Technical walkthrough of extracting 88 lexical and structural features across 11,431 URLs and deploying real-time DOM protection with FastAPI.',
      duration: 'Security & ML Guide',
      tag: 'Security & ML',
      actionUrl: 'https://github.com/moturumonishpvt-byte',
    },
    {
      title: 'Mitigating Interview AI Accent Bias with Gemma & Perspective API',
      type: 'Architecture Breakdown' as const,
      description:
        'Auditing architecture for detecting speech accent bias, achieving post-hoc score calibration with <7% demographic parity variance.',
      duration: 'Research Breakdown',
      tag: 'AI Fairness',
      actionUrl: 'https://github.com/moturumonishpvt-byte',
    },
  ] as ContentMediaItem[],
};

export const achievementsData: AchievementItem[] = [
  {
    id: 'ach-nec',
    title: 'National Finalist — Top 0.6%',
    organization: 'National Entrepreneurship Challenge, IIT Bombay',
    date: '2025',
    category: 'Competition',
    result: 'Top 0.6% of 1,000+ Teams',
    description:
      'Selected as National Finalist out of 1,000+ contending teams across India in the IIT Bombay National Entrepreneurship Challenge 2025.',
    highlight: 'Top 0.6% National Placement',
  },
  {
    id: 'ach-gpa',
    title: '8.64 / 10.0 Academic CGPA Standing',
    organization: "Vignan's Institute of Information Technology",
    date: 'Sept. 2023 – Present',
    category: 'Academic',
    result: '8.64 CGPA',
    description:
      'Maintained consistent high academic standing throughout B.Tech Computer Science (Data Science) coursework and practical laboratories.',
    highlight: 'CS (Data Science) Specialization',
  },
  {
    id: 'ach-inference',
    title: '25–40x Face Inference Acceleration',
    organization: 'Academic Monitor System',
    date: '2026',
    category: 'Engineering Metric',
    result: '6,000ms → 200ms Latency',
    description:
      'Accelerated on-device face recognition inference from ~6,000ms to ~200ms using native Kotlin modules and MobileFaceNet TensorFlow Lite.',
    highlight: 'On-Device Mobile Optimization',
  },
  {
    id: 'ach-phish-data',
    title: '88-Feature Random Forest Classification',
    organization: 'PhishGuard AI Suite',
    date: 'Dec. 2025',
    category: 'Engineering Metric',
    result: '11,431 URLs Evaluated',
    description:
      'Trained a 200-estimator classifier over 11,431 URLs with 88 extracted features and 70/30 ML-heuristic hybrid scoring in FastAPI.',
    highlight: 'Real-Time Browser Protection',
  },
];

export const educationData: EducationItem[] = [
  {
    institution: "Vignan's Institute of Information Technology",
    degree: 'Bachelor of Technology in Computer Science (Data Science)',
    period: 'Sept. 2023 – Present',
    gpa: '8.64 / 10.0',
    location: 'Visakhapatnam, India',
    highlights: [
      'Specialized in Computer Science with Data Science focus, Machine Learning, and Database Management Systems.',
      'Served as Web Development Lead for E-Cell campus portals (500+ participants, 99.9% uptime).',
      'Maintained an 8.64 / 10.0 CGPA throughout academic curriculum.',
    ],
  },
];

export const certificationsData: CertificationItem[] = [
  {
    title: 'Data Analytics Essentials',
    issuer: 'Cisco Networking Academy',
    date: '18 Mar 2025',
    skills: ['Data Analytics', 'Visualization', 'Statistics'],
    url: 'https://drive.google.com/drive/folders/1vcI3l67dDbJrSFdJsZgI0-JWEe9fugZA?usp=sharing',
  },
  {
    title: 'Generative AI with AWS',
    issuer: 'Analytics Vidhya',
    date: '19 Oct 2025',
    skills: ['Generative AI', 'AWS', 'LLMs'],
    url: 'https://drive.google.com/drive/folders/1vcI3l67dDbJrSFdJsZgI0-JWEe9fugZA?usp=sharing',
  },
  {
    title: 'GUESSS India Campus Ambassador Program 2025',
    issuer: 'GUESSS India',
    date: 'Sep – Dec 2025',
    skills: ['Entrepreneurship', 'Leadership', 'Research'],
    url: 'https://drive.google.com/drive/folders/1vcI3l67dDbJrSFdJsZgI0-JWEe9fugZA?usp=sharing',
  },
  {
    title: 'Introduction to Data Science',
    issuer: 'Cisco Networking Academy',
    date: '16 Mar 2025',
    skills: ['Data Science', 'Python', 'Analytics'],
    url: 'https://drive.google.com/drive/folders/1vcI3l67dDbJrSFdJsZgI0-JWEe9fugZA?usp=sharing',
  },
  {
    title: 'Introduction to Modern AI',
    issuer: 'Cisco Networking Academy',
    date: '18 Mar 2025',
    skills: ['Artificial Intelligence', 'Machine Learning'],
    url: 'https://drive.google.com/drive/folders/1vcI3l67dDbJrSFdJsZgI0-JWEe9fugZA?usp=sharing',
  },
  {
    title: 'JavaScript Essentials 1',
    issuer: 'Cisco Networking Academy',
    date: '25 Feb 2025',
    skills: ['JavaScript', 'Web Development', 'DOM'],
    url: 'https://drive.google.com/drive/folders/1vcI3l67dDbJrSFdJsZgI0-JWEe9fugZA?usp=sharing',
  },
  {
    title: 'JavaScript Essentials 2',
    issuer: 'Cisco Networking Academy',
    date: '26 Feb 2025',
    skills: ['JavaScript', 'Async', 'APIs'],
    url: 'https://drive.google.com/drive/folders/1vcI3l67dDbJrSFdJsZgI0-JWEe9fugZA?usp=sharing',
  },
  {
    title: 'National Entrepreneurship Challenge 2025 — Advanced Track',
    issuer: 'E-Cell, IIT Bombay',
    date: 'Rank 61',
    skills: ['Entrepreneurship', 'Strategy', 'Venture Design'],
    url: 'https://drive.google.com/drive/folders/1vcI3l67dDbJrSFdJsZgI0-JWEe9fugZA?usp=sharing',
  },
  {
    title: 'Python Essentials 1',
    issuer: 'Cisco Networking Academy',
    date: '25 Feb 2025',
    skills: ['Python', 'OOP', 'Scripting'],
    url: 'https://drive.google.com/drive/folders/1vcI3l67dDbJrSFdJsZgI0-JWEe9fugZA?usp=sharing',
  },
  {
    title: 'Python Essentials 2',
    issuer: 'Cisco Networking Academy',
    date: '25 Feb 2025',
    skills: ['Python', 'File I/O', 'Modules'],
    url: 'https://drive.google.com/drive/folders/1vcI3l67dDbJrSFdJsZgI0-JWEe9fugZA?usp=sharing',
  },
  {
    title: 'The Complete Full-Stack Web Development Bootcamp',
    issuer: 'Udemy · Dr. Angela Yu',
    date: '28 Nov 2025',
    skills: ['Full Stack', 'React', 'Node.js', '62 hrs'],
    url: 'https://drive.google.com/drive/folders/1vcI3l67dDbJrSFdJsZgI0-JWEe9fugZA?usp=sharing',
  },
];

export const courseworkData = [
  'Data Structures & Algorithms',
  'Database Management Systems',
  'Machine Learning & Neural Networks',
  'Operating Systems',
  'Computer Networks',
  'Statistics & Data Analytics',
  'Object-Oriented Programming (Java / Python)',
  'Web Technologies',
];

export const currentlyStatus: CurrentlyStatus = {
  building: {
    title: 'Academic Monitor System',
    description:
      'Refining on-device MobileFaceNet TFLite optimization, RSSI-gated BLE handshakes, and ArcFace ONNX admin client integration.',
    tag: 'ACTIVE BUILD',
  },
  learning: {
    title: 'LLM Systems & Open-Source Gemma Integration',
    description:
      'Deepening work with open-source Gemma models, prompt engineering, perspective scoring, and low-latency backend API integration.',
    tag: 'DEEP DIVE',
  },
  exploring: {
    title: 'Edge AI & On-Device Neural Networks',
    description:
      'Optimizing tensor runtime footprints and exploring INT8 quantization on mobile hardware.',
    tag: 'SYSTEMS FOCUS',
  },
  creating: {
    title: 'WHIS — Personal AI Assistant for Windows',
    description:
      'What it is: A local-first personal AI assistant for Windows, combining open-source models with natural voice interaction and computer automation.\n\nWhat it can do: Natural speech conversations, long-term memory, desktop tool execution, visual OCR, and smart hybrid AI routing.\n\nWhat we want to achieve: A standalone, privacy-conscious WHIS.exe companion that acts beyond a chatbot to proactively automate everyday workflows on Windows.',
    tag: 'LOCAL-FIRST AI',
  },
  currentGoal:
    'Securing a full-time Software Development Engineer (SDE) or Full Stack & AI/ML Systems role.',
  openTo: [
    'Software Development Engineer (SDE) Roles',
    'Full-Stack & Backend Engineering',
    'AI / ML Systems & Edge AI Roles',
    'High-Impact Technical Collaborations',
  ],
};
