export const PROFILE = {
  name: 'CHHOY TOO',
  title: 'IT Developer, System Analyst & AI-Assisted Engineer',
  roles: ['System Analyst', 'Web Developer', 'Database Administration', 'AI-Assisted Developer'],
  tagline: 'I design scalable, user-focused systems that transform complex operational challenges into reliable, high-performance digital experiences - powered by AI tools in 2026.',
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
export const PROFILE_STATS = [
  { value: '20+', label: 'Stations Supported', detail: 'POS, dispenser, reporting and database workflows' },
  { value: '6+', label: 'Internal Systems', detail: 'Monitoring, reporting, automation and assistant tools' },
  { value: '3', label: 'Languages', detail: 'Khmer, English and Thai for cross-team support' },
  { value: '2026', label: 'AI Workflow', detail: 'Using AI tools to speed up delivery and documentation' },
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
  { label: 'Project Management', level: 90, color: '#2563EB' },
  { label: 'System Analytics', level: 85, color: '#0EA5E9' },
  { label: 'AI-Assisted Development', level: 88, color: '#7C3AED' },
  { label: 'Prompt Engineering', level: 85, color: '#7C3AED' },
  { label: 'Database Administration', level: 80, color: '#059669' },
  { label: 'IT Support / Infrastructure', level: 80, color: '#0F766E' },
  { label: 'Data Automation', level: 82, color: '#059669' },
  { label: 'Web Development', level: 78, color: '#2563EB' },
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
    impact: ['Monitors 20+ station environments', 'Improves issue visibility for support teams', 'Centralizes alerts, logs and station health'],
    status: 'Production',
    year: '2024',
    color: '#2563EB',
    gradient: ['#2563EB', '#1D4ED8'] as [string, string],
    github: 'https://github.com/chhoytoo',
    live: '',
  },
  {
    title: 'Sales Report Telegram Bot',
    description:
      'Automated Telegram bot that handles sales report requests from team members. Connects to the database backend, generates filtered reports on demand, and delivers formatted messages directly in Telegram.',
    tags: ['Python', 'Telegram API', 'MySQL', 'Automation'],
    impact: ['Reduces manual report requests', 'Delivers filtered sales data directly in chat', 'Supports faster daily decisions'],
    status: 'Production',
    year: '2023',
    color: '#0EA5E9',
    gradient: ['#0EA5E9', '#0284C7'] as [string, string],
    github: 'https://github.com/chhoytoo',
    live: '',
  },
  {
    title: 'Station Inventory & Management DB',
    description:
      'Relational database system for managing fuel station inventory, daily sales records, staff data, and audit logs. Features stored procedures, automated backups, and a web admin interface.',
    tags: ['MySQL', 'SQL', 'PHP', 'Database Design'],
    impact: ['Organizes inventory and daily sales records', 'Improves traceability with audit logs', 'Protects data with backup routines'],
    status: 'Internal Tool',
    year: '2023',
    color: '#059669',
    gradient: ['#059669', '#047857'] as [string, string],
    github: 'https://github.com/chhoytoo',
    live: '',
  },
  {
    title: 'AI-Powered Report Assistant',
    description:
      'An internal AI assistant that uses OpenAI API + LangChain to automatically summarize daily sales reports, generate insights, and answer natural language queries from team members - replacing manual report reading.',
    tags: ['Python', 'OpenAI API', 'LangChain', 'Automation'],
    impact: ['Summarizes long reports into clear insights', 'Supports natural language business questions', 'Cuts time spent reading raw reports'],
    status: 'In Progress',
    year: '2026',
    color: '#7C3AED',
    gradient: ['#7C3AED', '#5B21B6'] as [string, string],
    github: 'https://github.com/chhoytoo',
    live: '',
  },
  {
    title: 'AI Telegram Chatbot Assistant',
    description:
      'Upgraded Telegram bot powered by GPT-4o that understands natural language queries, responds to staff questions about inventory and sales in real-time, and can handle multi-turn conversations with context memory.',
    tags: ['Python', 'OpenAI GPT-4o', 'Telegram API', 'AI'],
    impact: ['Answers staff questions in natural language', 'Keeps multi-turn context for support conversations', 'Connects chat workflows to operational data'],
    status: 'Production',
    year: '2026',
    color: '#0F766E',
    gradient: ['#0F766E', '#0D9488'] as [string, string],
    github: 'https://github.com/chhoytoo',
    live: '',
  },
  {
    title: 'Personal Portfolio Website',
    description:
      'This portfolio - built with React Native Web and Expo SDK 54. Features modular components, scroll-reveal animations, animated gradient avatar, and a Skills bar counter.',
    tags: ['React Native', 'Expo', 'TypeScript', 'Web'],
    impact: ['Responsive profile across web and mobile targets', 'Reusable component structure', 'Scroll motion and animated technical storytelling'],
    status: 'Live',
    year: '2026',
    color: '#475569',
    gradient: ['#475569', '#334155'] as [string, string],
    github: 'https://github.com/chhoytoo/my_profile',
    live: '',
  },
];
// ─── SOCIAL ──────────────────────────────────────────────────────────────────
export const SOCIAL = [
  { label: 'GitHub', url: 'https://github.com/chhoytoo', color: '#F8FAFC' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/chhoytoo', color: '#0EA5E9' },
  { label: 'Email', url: 'mailto:chhoytue2002@gmail.com', color: '#2563EB' },
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
      'Leveraged AI tools (GitHub Copilot, ChatGPT, Claude) to accelerate development workflows and code quality in 2025-2026.',
      'Integrated OpenAI API into internal tools to enable natural language report queries and AI-generated insights.',
    ],
    responsibilities: [
      'Coordinate with operation teams to understand station issues and convert them into technical tasks.',
      'Monitor system reliability, investigate POS incidents, and prepare clear follow-up actions.',
      'Maintain reporting data flows between station systems, databases, and internal users.',
      'Document fixes, workflows, and support knowledge so repeated issues are easier to solve.',
    ],
    tech: ['POS Systems', 'Fuel Dispenser Integration', 'MySQL', 'Python', 'React', 'Telegram API', 'OpenAI API'],
    color: '#2563EB',
  },
];
export const EDUCATION = [
  { institution: 'Royal University of Phnom Penh', degree: 'Bachelor of IT Engineering', period: '2020 - 2024', color: '#2563EB' },
  { institution: 'Svay Chek High School', degree: 'Diploma II Certificate', period: '2018 - 2020', color: '#0EA5E9' },
];
export const LEARNING_FOCUS = [
  { name: 'Advanced TypeScript', detail: 'Safer app structure, reusable components and API contracts', color: '#2563EB' },
  { name: 'AI App Integration', detail: 'Prompt design, report summarization and workflow assistants', color: '#7C3AED' },
  { name: 'Database Performance', detail: 'Query optimization, indexing and reliable backup processes', color: '#059669' },
  { name: 'Cloud Deployment', detail: 'Modern deployment patterns for web tools and APIs', color: '#0EA5E9' },
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
