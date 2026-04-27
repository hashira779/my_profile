export const PROFILE = {
  name: 'CHHOY TOO',
  title: 'IT Developer, System Analyst & AI-Assisted Engineer',
  roles: ['System Analyst', 'Web Developer', 'Database Architect', 'AI-Assisted Developer'],
  tagline: 'I design scalable, user-focused systems that transform complex operational challenges into reliable, high-performance digital experiences — powered by AI tools in 2026.',
  status: 'OPEN TO OPPORTUNITIES',
  initials: 'CT',
  github: 'https://github.com/chhoytoo',  // update with your real username
  linkedin: 'https://linkedin.com/in/chhoytoo',
};
export const CONTACT = {
  email: 'chhoytue2002@gmail.com',
  phone: '+855 15 488 991',
  location: 'Sen Sok District, Phnom Penh, Cambodia',
  languages: ['Khmer (Native)', 'English (Professional)', 'Thai (Conversational)'],
};
export const SKILLS = [
  { label: 'Project Management', level: 90, color: '#818CF8' },
  { label: 'System Analytics', level: 85, color: '#A78BFA' },
  { label: 'AI-Assisted Development', level: 88, color: '#F472B6' },
  { label: 'Prompt Engineering', level: 85, color: '#FB923C' },
  { label: 'Database Administration', level: 80, color: '#38BDF8' },
  { label: 'IT Support / Infrastructure', level: 80, color: '#22D3EE' },
  { label: 'Data Automation', level: 82, color: '#34D399' },
  { label: 'Web Development', level: 78, color: '#FB7185' },
];
export const TECH = [
  { name: 'TypeScript / JS', icon: 'lightning' },
  { name: 'React Native', icon: 'mobile' },
  { name: 'Python', icon: 'snake' },
  { name: 'SQL / MySQL', icon: 'db' },
  { name: 'REST APIs', icon: 'link' },
  { name: 'Telegram Bot API', icon: 'bot' },
  { name: 'HTML / CSS', icon: 'web' },
  { name: 'Linux / CLI', icon: 'terminal' },
  { name: 'GitHub Copilot', icon: 'bot' },
  { name: 'ChatGPT / OpenAI API', icon: 'lightning' },
  { name: 'Claude (Anthropic)', icon: 'lightning' },
  { name: 'Cursor AI', icon: 'lightning' },
  { name: 'Gemini AI', icon: 'lightning' },
  { name: 'LLM Integration', icon: 'link' },
];
// ─── PROJECTS ────────────────────────────────────────────────────────────────
// Update github / live fields with your real repo / deployed URLs
export const PROJECTS = [
  {
    title: 'PTT Station POS Monitor',
    description:
      'Web-based internal dashboard for real-time monitoring and debugging of POS systems integrated with fuel dispensers across 20+ stations. Includes live alerts, log viewer, and station health status.',
    tags: ['React', 'Node.js', 'MySQL', 'REST API'],
    status: 'Production',
    year: '2024',
    color: '#818CF8',
    gradient: ['#818CF8', '#6366F1'] as [string, string],
    github: 'https://github.com/chhoytoo',
    live: '',
  },
  {
    title: 'Sales Report Telegram Bot',
    description:
      'Automated Telegram bot that handles sales report requests from team members. Connects to the database backend, generates filtered reports on demand, and delivers formatted messages directly in Telegram.',
    tags: ['Python', 'Telegram API', 'MySQL', 'Automation'],
    status: 'Production',
    year: '2023',
    color: '#38BDF8',
    gradient: ['#38BDF8', '#0EA5E9'] as [string, string],
    github: 'https://github.com/chhoytoo',
    live: '',
  },
  {
    title: 'Station Inventory & Management DB',
    description:
      'Relational database system for managing fuel station inventory, daily sales records, staff data, and audit logs. Features stored procedures, automated backups, and a web admin interface.',
    tags: ['MySQL', 'SQL', 'PHP', 'Database Design'],
    status: 'Internal Tool',
    year: '2023',
    color: '#34D399',
    gradient: ['#34D399', '#10B981'] as [string, string],
    github: 'https://github.com/chhoytoo',
    live: '',
  },
  {
    title: 'AI-Powered Report Assistant',
    description:
      'An internal AI assistant that uses OpenAI API + LangChain to automatically summarize daily sales reports, generate insights, and answer natural language queries from team members — replacing manual report reading.',
    tags: ['Python', 'OpenAI API', 'LangChain', 'Automation'],
    status: 'In Progress',
    year: '2026',
    color: '#F472B6',
    gradient: ['#F472B6', '#EC4899'] as [string, string],
    github: 'https://github.com/chhoytoo',
    live: '',
  },
  {
    title: 'AI Telegram Chatbot Assistant',
    description:
      'Upgraded Telegram bot powered by GPT-4o that understands natural language queries, responds to staff questions about inventory and sales in real-time, and can handle multi-turn conversations with context memory.',
    tags: ['Python', 'OpenAI GPT-4o', 'Telegram API', 'AI'],
    status: 'Production',
    year: '2026',
    color: '#FB923C',
    gradient: ['#FB923C', '#F97316'] as [string, string],
    github: 'https://github.com/chhoytoo',
    live: '',
  },
  {
    title: 'Personal Portfolio Website',
    description:
      'This portfolio — built with React Native Web and Expo SDK 54. Features modular components, scroll-reveal animations powered by Intersection Observer, animated gradient avatar, and a Skills bar counter.',
    tags: ['React Native', 'Expo', 'TypeScript', 'Web'],
    status: 'Live',
    year: '2026',
    color: '#A78BFA',
    gradient: ['#A78BFA', '#8B5CF6'] as [string, string],
    github: 'https://github.com/chhoytoo/my_profile',
    live: '',
  },
];
// ─── SOCIAL ──────────────────────────────────────────────────────────────────
export const SOCIAL = [
  { label: 'GitHub', url: 'https://github.com/chhoytoo', color: '#F8FAFC' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/chhoytoo', color: '#38BDF8' },
  { label: 'Email', url: 'mailto:chhoytue2002@gmail.com', color: '#818CF8' },
];
export const EXPERIENCE = [
  {
    role: 'System Analyst Support',
    company: 'PTT (Cambodia) LTD',
    type: 'Full-time',
    period: '2023 - Present',
    location: 'Phnom Penh, Cambodia',
    highlights: [
      'Managed POS systems integrated with fuel dispensers across 20+ stations.',
      'Built web-based internal tools for reporting, monitoring, and debugging.',
      'Automated sales report requests using a Telegram bot for team-wide use.',
      'Maintained databases for station management, inventory tracking and sales data.',
      'Leveraged AI tools (GitHub Copilot, ChatGPT, Claude) to accelerate development workflows and code quality in 2025–2026.',
      'Integrated OpenAI API into internal tools to enable natural language report queries and AI-generated insights.',
    ],
    color: '#818CF8',
  },
];
export const EDUCATION = [
  { institution: 'Royal University of Phnom Penh', degree: 'Bachelor of IT Engineering', period: '2020 - 2024', color: '#818CF8' },
  { institution: 'Svay Chek High School', degree: 'Diploma II Certificate', period: '2018 - 2020', color: '#38BDF8' },
];
export const TOOLS = [
  { name: 'Microsoft Word', level: 'Excellent' },
  { name: 'PowerPoint', level: 'Excellent' },
  { name: 'Excel', level: 'Good' },
  { name: 'Internet & E-mail', level: 'Excellent' },
  { name: 'API Integration', level: 'Proficient' },
  { name: 'Database Workflows', level: 'Proficient' },
  { name: 'GitHub Copilot', level: 'Proficient' },
  { name: 'ChatGPT / OpenAI API', level: 'Proficient' },
  { name: 'Claude (Anthropic)', level: 'Proficient' },
  { name: 'Cursor AI', level: 'Good' },
  { name: 'Prompt Engineering', level: 'Proficient' },
  { name: 'AI Workflow Automation', level: 'Good' },
];
export const NAV_LINKS = [
  { label: 'About', section: 'about' },
  { label: 'Projects', section: 'projects' },
  { label: 'Skills', section: 'skills' },
  { label: 'Experience', section: 'experience' },
  { label: 'Contact', section: 'contact' },
];
