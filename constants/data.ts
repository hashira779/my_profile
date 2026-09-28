export const PROFILE = {
  name: 'CHHOY TOO',
  title: 'IT Developer, System Analyst & AI-Assisted Engineer',
  roles: ['System Analyst', 'Web Developer', 'Data Analyst'],
  tagline: 'I build scalable, user-focused digital systems that streamline complex operations and deliver reliable, high-performance experiences across 20+ station environments.',
  status: 'OPEN TO OPPORTUNITIES',
  initials: 'CT',
  github: 'https://github.com/hashira779',
  linkedin: 'https://www.linkedin.com/in/too-chhoy-b4910b342?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
};
export const CONTACT = {
  email: 'chhoytoo@outlook.com',
  phone: '+855 15 488 991',
  telegram: 'https://t.me/chhoy_too',
  location: 'Sen Sok District, Phnom Penh, Cambodia',
  languages: ['Khmer (Native)', 'English (Good)', 'Thai (Conversational)'],
};
export const PROFILE_STATS = [
  { value: '20+', label: 'Stations Supported', detail: 'POS, dispenser, reporting and database workflows' },
  { value: '6+', label: 'Internal Systems', detail: 'Monitoring, reporting, automation and assistant tools' },
  { value: '3', label: 'Languages', detail: 'Khmer, English and Thai for cross-team support' },
  { value: '2026', label: 'AI Workflow', detail: 'Using AI tools to improve delivery, documentation, and workflow efficiency' },
];
export const SERVICES = [
  {
    title: 'System Analysis',
    description: 'Translate business operations into reliable system requirements, process maps, and practical technical plans.',
    points: ['Requirement discovery', 'Workflow documentation', 'Issue triage'],
    color: '#2563EB',
  },
  {
    title: 'Internal Web Tools',
    description: 'Build dashboards, admin panels, reporting screens, and workflow tools that teams can use every day.',
    points: ['React / TypeScript UI', 'REST API integration', 'Role-focused screens'],
    color: '#0EA5E9',
  },
  {
    title: 'Database Operations',
    description: 'Design and maintain structured data for sales, inventory, staff records, audits, and operational reporting.',
    points: ['MySQL schema design', 'Stored procedures', 'Backup workflows'],
    color: '#059669',
  },
  {
    title: 'Automation & AI',
    description: 'Automate repeatable reporting and support workflows with bots, scripts, and AI-assisted tools.',
    points: ['Telegram bots', 'Report generation', 'AI summaries'],
    color: '#7C3AED',
  },
];
export const SKILLS = [
  {
    label: 'System Analysis',
    level: 'Strong',
    color: '#0EA5E9',
    description: 'POS workflows, system operations, troubleshooting, and process improvement',
  },
  {
    label: 'IT Support / Infrastructure',
    level: 'Strong',
    color: '#0F766E',
    description: 'Station support, issue resolution, system maintenance, and operational reliability',
  },
  {
    label: 'Database Administration',
    level: 'Good',
    color: '#059669',
    description: 'Managing station, sales, inventory, and reporting data',
  },
  {
    label: 'Data Automation',
    level: 'Good',
    color: '#059669',
    description: 'Automating report requests and repetitive operational workflows',
  },
  {
    label: 'Web Development',
    level: 'Good',
    color: '#2563EB',
    description: 'Building internal web tools, dashboards, and reporting interfaces',
  },
  {
    label: 'AI-Assisted Development',
    level: 'Growing',
    color: '#7C3AED',
    description: 'Using AI tools to improve coding, documentation, and workflow speed',
  },
  {
    label: 'Docker & Ubuntu Environments',
    level: 'Good',
    color: '#0EA5E9',
    description: 'Working with Docker containers, Ubuntu server workflows, CLI setup, and deployment support',
  },
  {
    label: 'Project Management',
    level: 'Practical',
    color: '#2563EB',
    description: 'Coordinating tasks, documenting updates, and supporting delivery',
  },
  {
    label: 'Prompt Engineering',
    level: 'Growing',
    color: '#7C3AED',
    description: 'Creating prompts for support, automation, and internal assistant workflows',
  },
];
export const TECH = [
  { name: 'PHP', icon: 'code' },
  { name: 'Python', icon: 'snake' },
  { name: 'JavaScript / TypeScript', icon: 'lightning' },
  { name: 'HTML / CSS', icon: 'web' },
  { name: 'SQL / MySQL', icon: 'db' },
  { name: 'REST APIs', icon: 'link' },
  { name: 'Telegram Bot API', icon: 'bot' },
  { name: 'Web Dashboards', icon: 'web' },
  { name: 'Database Design', icon: 'db' },
  { name: 'Linux / CLI', icon: 'terminal' },
  { name: 'Docker', icon: 'container' },
  { name: 'Ubuntu Server', icon: 'terminal' },
  { name: 'Git / GitHub', icon: 'github' },
  { name: 'Microsoft Excel', icon: 'table' },
];
// ─── PROJECTS ────────────────────────────────────────────────────────────────
// Update github / live fields with your real repo / deployed URLs
export const PROJECTS = [
  {
    title: 'CamTech E-Commerce & Operations Ecosystem',
    description:
      'A comprehensive suite of scalable digital platforms for CamTech. Features a microservices architecture with dedicated systems for Storefront, POS, HRMS, Delivery, Admin Consoles, and API Gateway.',
    tags: ['E-Commerce', 'Microservices', 'POS', 'HRMS', 'Cloudflare Tunnels'],
    impact: [
      'Orchestrates 10+ interconnected internal and public web platforms',
      'Centralizes Point of Sale (POS), Human Resources (HRMS), and Delivery tracking',
      'Secures backend infrastructure using Cloudflare Zero Trust Tunnels',
      'Provides scalable APIs and dedicated admin portals for seamless business operations',
    ],
    status: 'Live',
    year: '2026',
    color: '#7C3AED',
    gradient: ['#7C3AED', '#4C1D95'] as [string, string],
    github: '',
    live: 'https://store.camtech.cam',
    private: false,
    note: 'Infrastructure encompasses api, blog, business, delivery, gateway, hrms, pos, and store modules.',
  },
  {
    title: 'PTT Station POS Monitor',
    description:
      'Web-based internal dashboard for real-time monitoring and debugging of POS systems integrated with fuel dispensers across 20+ stations. Includes live alerts, log viewer, and station health status.',
    tags: ['React', 'Node.js', 'MySQL', 'REST API'],
    impact: [
      'Monitors 20+ live station environments globally',
      'Improves issue visibility and response time for support teams',
      'Centralizes alerts, system logs, and hardware health tracking',
    ],
    status: 'Production',
    year: '2024',
    color: '#2563EB',
    gradient: ['#2563EB', '#1D4ED8'] as [string, string],
    github: '',
    live: '',
    private: true,
    note: 'Repository is private due to company confidentiality.',
  },
  {
    title: 'Sales Report Telegram Bot',
    description:
      'Automated Telegram bot that handles sales report requests from team members. Connects to the database backend, generates filtered reports on demand, and delivers formatted messages directly in Telegram.',
    tags: ['Python', 'Telegram API', 'MySQL', 'Automation'],
    impact: [
      'Eliminates manual reporting overhead by 100%',
      'Delivers precise, filtered sales data instantly in chat',
      'Accelerates daily operational decision-making',
    ],
    status: 'Production',
    year: '2024',
    color: '#0EA5E9',
    gradient: ['#0EA5E9', '#0284C7'] as [string, string],
    github: '',
    live: '',
    private: true,
    note: 'Repository is private due to company confidentiality.',
  },
  {
    title: 'Cost Supply Management System',
    description:
      'Internal database system for managing cost supply records, supplier information, purchase tracking, expense details, and audit logs. Features robust reporting workflows and secure admin access.',
    tags: ['MySQL', 'SQL', 'PHP', 'Database Design'],
    impact: [
      'Digitizes and organizes supplier and cost supply records',
      'Enhances financial tracking of purchases and operational expenses',
      'Improves accountability and traceability with immutable audit logs',
    ],
    status: 'Internal Tool',
    year: '2026',
    color: '#059669',
    gradient: ['#059669', '#047857'] as [string, string],
    github: '',
    live: '',
    private: true,
    note: 'Repository is private due to company confidentiality.',
  },
  {
    title: 'Station Map Web Portal',
    description:
      'Built a web-based map portal for viewing and locating station information through an interactive digital map. Integrates rich location data to support field teams and operational logistics.',
    tags: ['Web Portal', 'Map Integration', 'JavaScript', 'Location Data'],
    impact: [
      'Provides instantaneous access to station locations via interactive UI',
      'Drastically improves visibility of field operational data',
      'Supports logistics teams with seamless station lookup and routing',
    ],
    status: 'Live',
    year: '2026',
    color: '#F59E0B',
    gradient: ['#F59E0B', '#D97706'] as [string, string],
    github: 'https://github.com/hashira779/PTT_STATION_MAP',
    live: 'https://map.orsptt.space/',
  },
  {
    title: 'Internal Web Portal',
    description:
      'A private internal web portal centralizing operational tools, reporting workflows, and staff access controls. Designed with a clean, secure, and user-friendly interface to maximize team efficiency.',
    tags: ['Web Development', 'Dashboard', 'Internal Tools', 'Automation'],
    impact: [
      'Consolidates fragmented internal tools into one unified platform',
      'Streamlines staff access to critical reports and operational data',
      'Reduces manual workflow bottlenecks and communication overhead',
    ],
    status: 'Production',
    year: '2025',
    color: '#14B8A6',
    gradient: ['#14B8A6', '#0F766E'] as [string, string],
    github: '',
    live: '',
    private: true,
    note: 'Repository is private due to company confidentiality.',
  },
  {
    title: 'Personal Portfolio Website',
    description:
      'This portfolio - built with React Native Web and Expo SDK 54. Features modular components, scroll-reveal animations, animated gradient avatar, and a dynamic Skills bar counter.',
    tags: ['React Native', 'Expo', 'TypeScript', 'Web'],
    impact: [
      'Delivers a seamless, responsive profile across mobile and web',
      'Maintains a clean, reusable component architecture',
      'Showcases advanced scroll motion and animated technical storytelling',
    ],
    status: 'Live',
    year: '2026',
    color: '#475569',
    gradient: ['#475569', '#334155'] as [string, string],
    github: 'https://github.com/hashira779/my_profile',
    live: 'https://portfolio.camtech.cam',
  }
];
// ─── SOCIAL ──────────────────────────────────────────────────────────────────
export const SOCIAL = [
  { label: 'GitHub', url: 'https://github.com/hashira779', color: '#F8FAFC' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/too-chhoy-b4910b342?utm_source=share_via&utm_content=profile&utm_medium=member_ios', color: '#0EA5E9' },
  { label: 'Telegram', url: 'https://t.me/chhoy_too', color: '#29B6F6' },
  { label: 'Email', url: 'mailto:chhoytoo@outlook.com', color: '#2563EB' },
];
export const EXPERIENCE = [
  {
    role: 'System Analyst Support',
    company: 'PTT (Cambodia) LTD',
    type: 'Full-time',
    period: '2023 - Present',
    location: 'Phnom Penh, Cambodia',
    highlights: [
      'Managed and supported POS systems integrated with fuel dispensers across 20+ stations.',
      'Built internal web-based tools for reporting, monitoring, and debugging workflows.',
      'Automated sales report requests using a Telegram bot for team-wide support.',
      'Maintained databases for station management, inventory tracking, and sales records.',
      'Used AI tools such as GitHub Copilot, ChatGPT, Claude, and Cursor to improve development speed, debugging, and documentation.',
      'Integrated OpenAI API into internal tools to support natural-language report queries and AI-assisted insights.',
    ],
    responsibilities: [
      'Coordinated with operations teams to understand station issues and translate them into technical tasks.',
      'Monitored system reliability, investigated POS incidents, and prepared clear follow-up actions.',
      'Maintained reporting data flows between station systems, databases, and internal users.',
      'Documented fixes, workflows, and support knowledge to make repeated issues easier to solve.',
    ],
    tech: [
      'POS Systems',
      'Fuel Dispenser Integration',
      'MySQL',
      'Python',
      'PHP',
      'Telegram API',
      'OpenAI API',
      'Docker',
      'Ubuntu Server',
      'ChatGPT',
      'GitHub Copilot',
      'Cursor',
    ],
    color: '#2563EB',
  },
];
export const EDUCATION = [
  {
    institution: 'Royal University of Phnom Penh',
    degree: 'Bachelor of IT Engineering',
    period: '2020 - 2025',
    color: '#2563EB',
    badge: { initials: 'RUPP', bgFrom: '#8B1A1A', bgTo: '#C62828' },
    logoLocal: true,
  },
  {
    institution: 'Svay Chek High School',
    degree: 'Diploma II Certificate',
    period: '2018 - 2020',
    color: '#0EA5E9',
    badge: { initials: 'SCH', bgFrom: '#0369A1', bgTo: '#0EA5E9' },
    logoLocal: false,
  },
];

export const LEARNING_FOCUS = [
  {
    name: 'Practical TypeScript',
    detail: 'Safer app structure, reusable components, and clearer API contracts',
    color: '#2563EB',
  },
  {
    name: 'AI App Integration',
    detail: 'Prompt design, report summarization, and workflow assistants',
    color: '#7C3AED',
  },
  {
    name: 'Database Performance',
    detail: 'Query optimization, indexing, and reliable backup processes',
    color: '#059669',
  },
  {
    name: 'Cloud Deployment',
    detail: 'Deployment patterns for internal web tools, APIs, and automation services',
    color: '#0EA5E9',
  },
];

export const TOOLS = [
  { name: 'Microsoft Word', level: 'Excellent' },
  { name: 'PowerPoint', level: 'Excellent' },
  { name: 'Excel', level: 'Good' },
  { name: 'Internet & E-mail', level: 'Excellent' },

  { name: 'API Integration', level: 'Good' },
  { name: 'Database Workflows', level: 'Good' },
  { name: 'Git / GitHub', level: 'Good' },

  { name: 'ChatGPT / OpenAI API', level: 'Practical Use' },
  { name: 'GitHub Copilot', level: 'Practical Use' },
  { name: 'Claude', level: 'Practical Use' },
  { name: 'Cursor AI', level: 'Practical Use' },

  { name: 'Prompt Engineering', level: 'Growing' },
  { name: 'AI Workflow Automation', level: 'Growing' },
];

export const NAV_LINKS = [
  { label: 'About', section: 'about' },
  { label: 'Skills', section: 'skills' },
  { label: 'Education', section: 'education' },
  { label: 'Projects', section: 'projects' },
  { label: 'Experience', section: 'experience' },
  { label: 'Contact', section: 'contact' },
];
