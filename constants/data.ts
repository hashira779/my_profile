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
export interface ProjectMetric {
  value: string;
  label: string;
  sub?: string;
}

export interface ProjectFeature {
  icon: string;
  title: string;
  desc: string;
  badge?: string;
}

export interface ProjectArchitecture {
  category: string;
  items: string[];
}

export interface ProjectCodeSnippet {
  curl: string;
  js: string;
  python: string;
  response: string;
}

export interface ProjectSimulator {
  type: 'fleet' | 'checkout' | 'bot' | 'map' | 'audit' | 'console';
  badge: string;
  title: string;
  subtitle: string;
}

export interface ProjectItem {
  title: string;
  headline: string;
  description: string;
  challenge: string;
  solution: string;
  metrics: ProjectMetric[];
  features: ProjectFeature[];
  architecture: ProjectArchitecture[];
  tags: string[];
  impact: string[];
  status: 'Live' | 'Production' | 'Internal Tool' | 'In Progress';
  year: string;
  color: string;
  gradient: [string, string];
  github: string;
  live: string;
  private?: boolean;
  note?: string;
  codeSnippet?: ProjectCodeSnippet;
  simulator?: ProjectSimulator;
}

export const PROJECTS: ProjectItem[] = [
  {
    title: 'CamTech Enterprise E-Commerce Ecosystem',
    headline: 'The All-In-One Omnichannel Commerce & Microservices Backbone',
    description:
      'An enterprise-grade, end-to-end digital ecosystem built from the ground up to power every facet of the CamTech business. Engineered with a highly scalable microservices architecture, this interconnected network seamlessly handles high-volume B2B/B2C storefront traffic, real-time POS retail operations, delivery logistics, and full HR management. By unifying 10+ distinct modules behind a robust API gateway and securing all internal infrastructure via Cloudflare Zero Trust Tunnels, this system guarantees flawless uptime and lightning-fast data synchronization.',
    challenge:
      'Fragmented retail channels, separated in-store POS hardware, and manual stock reconciliations caused sales delays, frequent inventory mismatches, and administrative bottlenecks across physical and digital storefronts.',
    solution:
      'Engineered a unified microservices network coordinating POS counter checkouts, high-speed customer web store, warehouse inventory, and automated delivery dispatch through an API gateway, fully shielded behind Cloudflare Zero Trust.',
    metrics: [
      { value: '10+', label: 'Integrated Modules', sub: 'Store, POS, HRMS, Delivery' },
      { value: '< 50ms', label: 'Cross-Store Sync', sub: 'Zero Stock Discrepancy' },
      { value: '100%', label: 'Zero Trust Secured', sub: 'No Public Open Ports' },
      { value: '99.99%', label: 'Gateway Availability', sub: 'Continuous Operational Flow' },
    ],
    features: [
      {
        icon: '🛍️',
        title: 'High-Volume Omnichannel Store',
        desc: 'Blazing-fast B2B/B2C shopping catalog with real-time stock reservations, instant search, and automated checkout.',
        badge: 'E-Commerce',
      },
      {
        icon: '💳',
        title: 'Real-Time POS Terminal Hub',
        desc: 'Sub-second in-store counter checkout integrated directly with central inventory and immediate invoice generation.',
        badge: 'Retail POS',
      },
      {
        icon: '🛡️',
        title: 'Zero Trust Perimeter Defense',
        desc: 'All backends, databases, and microservices secured via Cloudflare Tunnels without exposing any public server IPs.',
        badge: 'Enterprise Security',
      },
      {
        icon: '⚡',
        title: 'High-Throughput API Gateway',
        desc: 'Centralized rate limiting, JWT token validation, and load balancing across all 10+ internal business services.',
        badge: 'Microservices',
      },
      {
        icon: '🚚',
        title: 'Automated Logistics Dispatch',
        desc: 'Dynamic order routing and live parcel dispatch tracking from warehouse shelf straight to customer doorsteps.',
        badge: 'Supply Chain',
      },
      {
        icon: '👥',
        title: 'Integrated HRMS & Role Matrix',
        desc: 'Comprehensive staff payroll, shift scheduling, and granular role-based access control safeguarding corporate data.',
        badge: 'Operations',
      },
    ],
    architecture: [
      {
        category: 'Frontend Ecosystem',
        items: ['Next.js / React Web App', 'Tailwind / Responsive Design', 'High-Speed POS Interface', 'Customer Portal'],
      },
      {
        category: 'Microservices & APIs',
        items: ['API Gateway Router', 'Store Service', 'POS Engine', 'Delivery Dispatch', 'HRMS Module'],
      },
      {
        category: 'Data & Persistence',
        items: ['PostgreSQL / MySQL Databases', 'Redis Cache Layer', 'ACID Transaction Locks', 'Real-Time WebSockets'],
      },
      {
        category: 'DevOps & Security',
        items: ['Cloudflare Zero Trust Tunnels', 'Docker Containers', 'Ubuntu Linux Host', 'Automated Health Monitors'],
      },
    ],
    tags: ['E-Commerce', 'Microservices', 'POS', 'Cloudflare Tunnels', 'API Gateway', 'Docker'],
    impact: [
      '🚀 Transformed fragmented workflows into a singular, automated digital powerhouse',
      '🛍️ Powers high-volume POS and E-Commerce sales with zero-latency synchronization',
      '🛡️ Engineered military-grade infrastructure security using Zero Trust architecture',
      '📊 Delivers real-time, cross-departmental analytics for immediate business decisions',
    ],
    status: 'Live',
    year: '2026',
    color: '#00BCD4',
    gradient: ['#00BCD4', '#055B83'] as [string, string],
    github: '',
    live: 'https://store.camtech.cam',
    private: false,
    note: 'Ecosystem modules: API, Blog, Business, Delivery, Gateway, HRMS, POS, and Store.',
    simulator: {
      type: 'checkout',
      badge: 'ABA PAYWAY / KHQR DEMO',
      title: 'Interactive POS & E-Commerce Checkout',
      subtitle: 'Simulate instant retail checkout with ABA KHQR payment and real-time inventory reservation',
    },
    codeSnippet: {
      curl: `curl -X POST https://api.camtech.cam/v1/checkout/purchase \\
  -H "X-Api-Key: ct_live_9948201" \\
  -H "Content-Type: application/json" \\
  -d '{
    "order_id": "ORD-2026-8812",
    "amount": 149.00,
    "currency": "USD",
    "payment_method": "ABA_KHQR",
    "pos_terminal_id": "POS-CENTRAL-01"
  }'`,
      js: `import { CamTechClient } from '@camtech/sdk';

const client = new CamTechClient({ apiKey: process.env.CAMTECH_KEY });
const checkout = await client.orders.create({
  orderId: 'ORD-2026-8812',
  amount: 149.00,
  currency: 'USD',
  gateway: 'ABA_PAYWAY_KHQR',
  syncPOS: true,
});
console.log('KHQR String:', checkout.qrString);`,
      python: `import requests

response = requests.post(
    "https://api.camtech.cam/v1/checkout/purchase",
    headers={"X-Api-Key": "ct_live_9948201"},
    json={
        "order_id": "ORD-2026-8812",
        "amount": 149.00,
        "payment_method": "ABA_KHQR",
        "dispatch": "AUTO"
    }
)
data = response.json()
print("Payment QR generated in", data["latency_ms"], "ms")`,
      response: `{
  "status": 200,
  "transaction_id": "TXN_77492019482",
  "qr_string": "00020101021229300016aba.payway.kh...",
  "inventory_status": "LOCKED_RESERVED",
  "dispatch_channel": "AUTO_ASSIGNED_RIDER",
  "cloudflare_tunnel": "SECURE_ZERO_TRUST",
  "latency_ms": 32.4
}`,
    },
  },
  {
    title: 'PTT Station POS Monitor',
    headline: 'Mission-Critical POS Telemetry & Hardware Observability Across 20+ Fueling Stations',
    description:
      'A mission-critical observability platform engineered to monitor and orchestrate live Point-of-Sale (POS) systems across 20+ active fueling stations. Processing thousands of transactions and hardware signals daily, this dashboard provides instantaneous alerting, advanced log analytics, and predictive hardware health monitoring. It acts as the central nervous system for technical support, allowing teams to intercept and resolve database synchronization issues before the customer ever notices.',
    challenge:
      'Operating 20+ high-traffic fuel stations with dispersed POS machines meant unexpected hardware jams, dispenser disconnects, or database sync drops could halt fuel pumps and cause immediate revenue losses.',
    solution:
      'Architected a centralized 24/7 telemetry monitoring console that continuously collects heartbeats, pump dispensers, receipt printers, and database replication health across all 20+ stations simultaneously.',
    metrics: [
      { value: '20+', label: 'Stations Supported', sub: 'Active Fueling Fleet' },
      { value: '100%', label: 'Telemetry Coverage', sub: 'Real-Time Health Feeds' },
      { value: '< 2 Min', label: 'Fault Interception', sub: 'Predictive Alerting' },
      { value: '0%', label: 'Transaction Loss', sub: 'Resilient Queue Sync' },
    ],
    features: [
      {
        icon: '⛽',
        title: '20+ Station Fleet Matrix',
        desc: 'Real-time birds-eye view of every fueling station, showing active pumps, terminals, and network status.',
        badge: 'Fleet Control',
      },
      {
        icon: '📊',
        title: 'Live POS Transaction Stream',
        desc: 'Sub-second stream verifying fuel volume and sales amounts against pump dispensers in real time.',
        badge: 'Telemetry',
      },
      {
        icon: '🚨',
        title: 'Instant Anomaly Alerting',
        desc: 'Automated warnings triggered immediately if a printer runs out of paper, network lags, or dispensers stall.',
        badge: 'Observability',
      },
      {
        icon: '🔄',
        title: 'Offline Resilient Queue Sync',
        desc: 'Transactions cached locally during network brownouts and safely synchronized to MySQL upon reconnection.',
        badge: 'Data Integrity',
      },
    ],
    architecture: [
      {
        category: 'Mission Control UI',
        items: ['React Operational Dashboard', 'Live Status Lights', 'Station Fleet Map', 'Interactive Incident Filter'],
      },
      {
        category: 'Ingestion & Telemetry',
        items: ['Node.js Heartbeat Collector', 'Dispenser Hardware Agents', 'Syslog Aggregator'],
      },
      {
        category: 'Database & Storage',
        items: ['MySQL Production Replication', 'Partitioned Transaction Logs', 'Hourly Audit Snapshots'],
      },
      {
        category: 'Infrastructure',
        items: ['Linux Support Daemons', 'VPN Inter-Station Mesh', 'Automated Health Watchdogs'],
      },
    ],
    tags: ['React', 'Node.js', 'MySQL', 'Telemetry', 'Hardware Monitoring', 'Fleet Ops'],
    impact: [
      '⚡ Slashed incident resolution time by providing real-time, actionable system telemetry',
      '🌍 Monitors hardware health and live transactions for 20+ stations simultaneously',
      '🔧 Centralized fragmented local station logs into one secure, searchable cloud interface',
      '🛡️ Guaranteed zero revenue leakage by eliminating offline sync dropouts',
    ],
    status: 'Production',
    year: '2024',
    color: '#00BCD4',
    gradient: ['#00BCD4', '#055B83'] as [string, string],
    github: '',
    live: '',
    private: true,
    note: 'Live enterprise system in active production across 20+ stations. Repository is private due to enterprise security compliance.',
    simulator: {
      type: 'fleet',
      badge: '20+ STATIONS FLEET RADAR',
      title: 'Live 20+ Station POS Telemetry Simulator',
      subtitle: 'Click any fueling station to inspect live dispenser flow, MySQL sync heartbeat, and hardware health',
    },
    codeSnippet: {
      curl: `curl -X POST https://telemetry.ptt-stations.internal/v1/station/heartbeat \\
  -H "Authorization: Bearer ptt_sec_token_9942" \\
  -H "Content-Type: application/json" \\
  -d '{
    "station_id": "ST-018",
    "station_name": "PTT Sen Sok Express",
    "pumps_active": 6,
    "liters_dispensed_today": 14820.5,
    "db_replication_lag_ms": 28,
    "hardware_status": "ALL_SYSTEMS_OPTIMAL"
  }'`,
      js: `const telemetry = await fetch('https://telemetry.ptt-stations.internal/v1/stream', {
  headers: { 'Authorization': 'Bearer ' + PTT_TOKEN },
});
const stream = await telemetry.json();
console.log('Active Fleet:', stream.stationsCount); // 20+ Stations
console.log('Replication Latency:', stream.avgLatencyMs, 'ms');`,
      python: `from ptt_telemetry import FleetWatcher

watcher = FleetWatcher(stations_count=20)
@watcher.on_anomaly
def handle_fault(alert):
    print(f"🚨 Hardware alert at {alert.station_id}: {alert.message}")
watcher.start()`,
      response: `{
  "status": 200,
  "fleet_monitored": "20+ Fueling Stations",
  "all_stations_online": true,
  "total_dispensers": 128,
  "telemetry_sync": "100% REAL_TIME",
  "mysql_replication": "HEALTHY",
  "avg_latency_ms": 28.6
}`,
    },
  },
  {
    title: 'Automated Sales Intel Bot',
    headline: 'Autonomous Real-Time Revenue Intelligence & Reporting Bot',
    description:
      'An intelligent, automated Telegram bot designed to revolutionize how executives and managers access financial data. Bypassing clunky web portals, this backend service hooks directly into live production databases to generate on-demand, beautifully formatted sales reports instantly within Telegram. It completely eliminates manual data pulls, allowing leadership to query real-time revenue metrics from anywhere in the world.',
    challenge:
      'Branch managers spent hours daily compiling spreadsheets and emailing sales numbers, while executives had to wait until the next morning to know how much revenue stations generated.',
    solution:
      'Created a 24/7 autonomous Python service connected to database read replicas that delivers instant formatted revenue reports, shift summaries, and anomaly alerts straight into Telegram.',
    metrics: [
      { value: '0 Hours', label: 'Manual Effort Needed', sub: '100% Automated Pulls' },
      { value: '< 500ms', label: 'Query Response', sub: 'Instant Data Delivery' },
      { value: '99.9%', label: 'Bot Uptime', sub: 'Always Available' },
      { value: '100%', label: 'Direct DB Accuracy', sub: 'Zero Spreadsheet Errors' },
    ],
    features: [
      {
        icon: '🤖',
        title: 'Natural Slash Command Queries',
        desc: 'Type /today, /summary, or /station [id] to receive instant breakdowns with formatted charts.',
        badge: 'Bot AI',
      },
      {
        icon: '⏰',
        title: 'Automated Nightly Briefings',
        desc: 'Pushes executive-level financial recaps automatically at midnight without human intervention.',
        badge: 'Scheduled Cron',
      },
      {
        icon: '📈',
        title: 'Revenue Anomaly Detection',
        desc: 'Flags unexpected sales dips or sudden spikes and alerts management for immediate review.',
        badge: 'Intelligent Alert',
      },
      {
        icon: '🔐',
        title: 'Executive Role Verification',
        desc: 'Cryptographically validates Telegram chat IDs to ensure confidential financial data is protected.',
        badge: 'Security',
      },
    ],
    architecture: [
      {
        category: 'Bot Runtime',
        items: ['Python AsyncIO Engine', 'Telegram Bot API', 'Webhook Listener', 'Scheduled Celery/Cron Jobs'],
      },
      {
        category: 'Data Aggregation',
        items: ['MySQL Analytical Queries', 'Read Replica Pooling', 'Dynamic Table Formatter'],
      },
      {
        category: 'Hosting & Security',
        items: ['Ubuntu Linux VPS', 'Systemd Service Daemon', 'Encrypted Secret Storage'],
      },
    ],
    tags: ['Python', 'Telegram API', 'MySQL', 'AI Automation', 'Cron Daemons'],
    impact: [
      '📉 Eliminated 100% of manual reporting overhead and spreadsheet processing',
      '📱 Delivers precise, filtered sales intelligence directly into executive chat streams',
      '⚡ Accelerates daily operational decision-making with instant data retrieval',
      '🔒 Ensures zero confidential leakages with strict role-based Telegram ID checks',
    ],
    status: 'Production',
    year: '2024',
    color: '#00BCD4',
    gradient: ['#00BCD4', '#055B83'] as [string, string],
    github: '',
    live: '',
    private: true,
    note: 'Repository is private due to enterprise security compliance.',
    simulator: {
      type: 'bot',
      badge: 'TELEGRAM BOT SIMULATOR',
      title: 'Autonomous Executive Bot Simulator',
      subtitle: 'Simulate running live slash commands to fetch instant sales reports and shift analytics',
    },
    codeSnippet: {
      curl: `curl -X POST https://api.telegram.org/bot\${BOT_TOKEN}/sendMessage \\
  -H "Content-Type: application/json" \\
  -d '{
    "chat_id": 99482012,
    "parse_mode": "HTML",
    "text": "📊 <b>DAILY REVENUE BRIEF</b>\\n• Total: $42,850\\n• Volume: 26,100L\\n• Stations: 20/20 Synced"
  }'`,
      js: `bot.command('today', async (ctx) => {
  const stats = await db.query('SELECT SUM(revenue) FROM daily_station_sales');
  await ctx.replyWithMarkdown(\`*Today Sales:* $\${stats.total} across 20 stations.\`);
});`,
      python: `from telegram.ext import ApplicationBuilder, CommandHandler

async def sales_report(update, context):
    report = await fetch_mysql_station_aggregates()
    await update.message.reply_html(f"<b>Real-Time Sales:</b> \${report.total}")

app = ApplicationBuilder().token("BOT_TOKEN").build()
app.add_handler(CommandHandler("today", sales_report))`,
      response: `{
  "ok": true,
  "result": {
    "message_id": 14209,
    "date": 1786529400,
    "text": "📊 PTT 20+ Stations Sales: $42,850 USD | 100% Automated | Latency: 420ms"
  }
}`,
    },
  },
  {
    title: 'Enterprise Cost Supply System',
    headline: 'Tamper-Proof Procurement, Inventory & Expense Control Engine',
    description:
      'A highly secure internal management engine responsible for tracking complex supply chains, supplier lifecycles, and corporate expenses. Built with a focus on absolute financial accountability, this system utilizes immutable audit logs and dynamic reporting matrices. It serves as the single source of truth for procurement teams to guarantee zero data loss and flawless inventory cost tracking.',
    challenge:
      'Unregulated procurement requests, unlogged price shifts, and scattered paper receipts created audit gaps and prevented finance teams from calculating true operational margins.',
    solution:
      'Architected an internal portal with mandatory hierarchical approval workflows, ACID database transactions, and an unalterable audit log for every dollar spent.',
    metrics: [
      { value: '100%', label: 'Immutable Audit Trail', sub: 'Every Entry Verified' },
      { value: '3x', label: 'Procurement Speed', sub: 'Automated Approval Chain' },
      { value: '$0', label: 'Unaccounted Spending', sub: 'Strict Budget Gates' },
      { value: '100%', label: 'ACID Compliance', sub: 'Zero Data Loss' },
    ],
    features: [
      {
        icon: '📦',
        title: 'Supplier Contract Lifecycle',
        desc: 'Centralizes supplier pricing agreements, delivery schedules, and historical fulfillment quality.',
        badge: 'Procurement',
      },
      {
        icon: '📑',
        title: 'Multi-Level Approval Chains',
        desc: 'Automatic routing of purchase orders to senior management based on threshold amounts.',
        badge: 'Governance',
      },
      {
        icon: '🔒',
        title: 'Tamper-Evident Audit Logging',
        desc: 'Every creation, modification, or cancellation is stamped with user ID, timestamp, and IP address.',
        badge: 'Security',
      },
      {
        icon: '📊',
        title: 'Dynamic Cost Variance Matrix',
        desc: 'Real-time charts comparing budgeted vs actual material costs across quarters.',
        badge: 'Analytics',
      },
    ],
    architecture: [
      {
        category: 'Application Backend',
        items: ['PHP Application Architecture', 'Strict Type Checking', 'RESTful API Layer', 'Session Management'],
      },
      {
        category: 'Database Engine',
        items: ['MySQL Enterprise InnoDB', 'Foreign Key Constraints', 'Stored Procedures', 'Trigger-Based Audits'],
      },
      {
        category: 'Security & Control',
        items: ['Role-Based Access Control', 'CSRF Protection', 'SQL Injection Mitigation'],
      },
    ],
    tags: ['MySQL', 'PHP', 'Database Architecture', 'Finance', 'Audit Systems'],
    impact: [
      '💰 Digitized and heavily optimized complex supplier tracking workflows',
      '🔒 Introduced immutable audit logging for absolute financial accountability',
      '📈 Provides granular reporting matrices for high-level expense optimization',
      '⚡ Slashed end-of-month financial reconciliation from 2 weeks to 2 days',
    ],
    status: 'Internal Tool',
    year: '2026',
    color: '#00BCD4',
    gradient: ['#00BCD4', '#055B83'] as [string, string],
    github: '',
    live: '',
    private: true,
    note: 'Internal enterprise financial system. Repository is private due to corporate compliance.',
    simulator: {
      type: 'audit',
      badge: 'IMMUTABLE AUDIT LOG',
      title: 'Tamper-Proof Expense & Procurement Console',
      subtitle: 'Simulate purchase order approval workflow and cryptographic audit trail verification',
    },
    codeSnippet: {
      curl: `curl -X POST https://supply.camtech.internal/api/v1/orders/approve \\
  -H "Authorization: Bearer sec_token_procurement" \\
  -d '{
    "po_number": "PO-2026-9041",
    "approved_by": "CHHOY_TOO_DIRECTOR",
    "amount": 8450.00,
    "audit_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  }'`,
      js: `const order = await procurementApi.approvePurchaseOrder({
  poNumber: 'PO-2026-9041',
  auditEnforced: true,
});
console.log('Immutable Audit Stamp:', order.auditTimestamp);`,
      python: `with db.transaction():
    po = PurchaseOrder.get(id=9041)
    po.approve(user_id=1)
    AuditLog.create(record=po.to_hash(), verified=True)`,
      response: `{
  "status": 200,
  "po_status": "APPROVED",
  "audit_trail_recorded": true,
  "cryptographic_hash": "sha256_verified_e3b0...",
  "discrepancy": 0.00
}`,
    },
  },
  {
    title: 'Strategic Station Map Portal',
    headline: 'Interactive Geospatial Distribution & Logistics Command Center',
    description:
      'An interactive, visually stunning geo-spatial web portal designed for field teams and logistics planning. By plotting active stations onto a rich digital map interface with integrated operational data, logistics coordinators can instantly visualize distribution networks, calculate routing efficiencies, and monitor geographical deployment zones in real time.',
    challenge:
      'Logistics managers and delivery fuel drivers had to rely on cumbersome address lists and static spreadsheets to understand station geography across Cambodia.',
    solution:
      'Designed an interactive high-performance vector map portal that pins every station with live operational data, driving routes, province filters, and contact details.',
    metrics: [
      { value: '60 FPS', label: 'Vector Rendering', sub: 'Smooth Pan & Zoom' },
      { value: 'Nationwide', label: 'Stations Mapped', sub: 'Comprehensive Geo-Data' },
      { value: '+35%', label: 'Route Efficiency', sub: 'Optimized Logistics' },
      { value: 'Instant', label: 'Search Indexing', sub: 'Sub-second Discovery' },
    ],
    features: [
      {
        icon: '🗺️',
        title: 'Interactive Vector Mapping',
        desc: 'Ultra-smooth map navigation rendering stations with custom state-indicative pins.',
        badge: 'GIS Tech',
      },
      {
        icon: '🔍',
        title: 'Instant Province & Station Search',
        desc: 'Filter stations by national highway, provincial borders, or station name within milliseconds.',
        badge: 'Search Engine',
      },
      {
        icon: '📍',
        title: 'Station Operational Deep-Dive',
        desc: 'Clicking any pin reveals dispenser count, operating hours, manager contacts, and GPS links.',
        badge: 'Fleet Intel',
      },
      {
        icon: '📱',
        title: 'Mobile-Optimized Driver View',
        desc: 'Tailored for on-the-road fuel tanker drivers with one-tap Google Maps route launches.',
        badge: 'Mobile-First',
      },
    ],
    architecture: [
      {
        category: 'Map Engine',
        items: ['Leaflet / OpenStreetMap', 'GeoJSON Vector Layers', 'Custom SVG Marker Icons', 'Cluster Renderer'],
      },
      {
        category: 'Client Application',
        items: ['JavaScript ES6+', 'HTML5 GeoLocation API', 'Progressive CSS Styling'],
      },
      {
        category: 'Hosting & CDN',
        items: ['Vercel Cloud Deployment', 'Global Edge CDN Caching', 'Custom Domain DNS'],
      },
    ],
    tags: ['Web Portal', 'Map Integration', 'JavaScript', 'Geo-Data', 'Logistics'],
    impact: [
      '🗺️ Transformed static data sheets into a rich, interactive geographical visualization',
      '🚀 Drastically improved visibility for field operatives and logistics teams',
      '📍 Streamlined nationwide routing and station deployment analysis',
      '⚡ Enabled field engineers to pinpoint nearest operational stations instantly',
    ],
    status: 'Live',
    year: '2026',
    color: '#00BCD4',
    gradient: ['#00BCD4', '#055B83'] as [string, string],
    github: 'https://github.com/hashira779/PTT_STATION_MAP',
    live: 'https://map.orsptt.space/',
    private: false,
    simulator: {
      type: 'map',
      badge: 'GIS RADAR ENGINE',
      title: 'Geospatial Distribution Command Center',
      subtitle: 'Simulate GPS coordinates query and nationwide fuel delivery route calculation',
    },
    codeSnippet: {
      curl: `curl -X GET "https://map.orsptt.space/api/stations?province=PhnomPenh&radius_km=15" \\
  -H "Accept: application/json"`,
      js: `const stations = await mapApi.getNearbyStations({ lat: 11.5564, lng: 104.9282, radiusKm: 15 });
stations.forEach(st => renderStationPin(st));`,
      python: `import geojson

stations = geo_db.query_nearby(lat=11.5564, lng=104.9282, radius=15)
print(f"Found {len(stations)} active stations in radius.")`,
      response: `{
  "status": 200,
  "stations_found": 24,
  "query_time_ms": 14.2,
  "nearest_station": "PTT Central Sen Sok",
  "vector_rendering": "60_FPS"
}`,
    },
  },
  {
    title: 'Centralized Operations Hub',
    headline: 'Single-Pane-of-Glass Enterprise Intranet & Unified Workspace',
    description:
      'A unified digital workspace that consolidates a massively fragmented internal toolset into a single, beautifully designed application. Featuring role-based access control, automated workflow pipelines, and live data dashboards, this portal empowers the entire staff to perform their duties with unprecedented speed and efficiency.',
    challenge:
      'Employees had to navigate across multiple disjointed web apps, remember separate credentials, and constantly ask IT where to find essential daily work tools.',
    solution:
      'Architected an all-in-one digital command portal with unified authentication, quick app launchers, real-time company alerts, and departmental widgets.',
    metrics: [
      { value: '6+ Systems', label: 'Consolidated Apps', sub: 'One Unified Portal' },
      { value: 'Single SSO', label: 'Access Management', sub: 'Role-Based Gateway' },
      { value: '-65%', label: 'Workflow Friction', sub: 'Fewer IT Support Tickets' },
      { value: '100%', label: 'Team Adoption', sub: 'Intuitive Daily Interface' },
    ],
    features: [
      {
        icon: '🔐',
        title: 'Unified Identity & RBAC',
        desc: 'Single sign-on gateway enforcing role-based permissions across technical, finance, and operations teams.',
        badge: 'Access Control',
      },
      {
        icon: '⚡',
        title: 'Instant App Launchpad',
        desc: 'Dock with live ping indicators allowing staff to jump into POS monitors, bots, and databases.',
        badge: 'Productivity',
      },
      {
        icon: '📢',
        title: 'System-Wide Broadcast Alerts',
        desc: 'Live banner system alerting employees about scheduled maintenance or network outages.',
        badge: 'Communication',
      },
      {
        icon: '📊',
        title: 'Department KPI Widgets',
        desc: 'Customizable dashboard cards surfacing daily performance numbers and task deadlines.',
        badge: 'Dashboard',
      },
    ],
    architecture: [
      {
        category: 'UI Framework',
        items: ['React / TypeScript', 'Modular Component System', 'Theme Context (Dark/Light)', 'Responsive Grid'],
      },
      {
        category: 'API Integration',
        items: ['REST Gateway Aggregator', 'JWT Session Management', 'Webhook Notification Bus'],
      },
      {
        category: 'Infrastructure',
        items: ['Docker Containerization', 'Nginx Reverse Proxy', 'Ubuntu Server Deployment'],
      },
    ],
    tags: ['Web Development', 'Dashboard', 'Internal Tools', 'UI/UX', 'Operations'],
    impact: [
      '🎯 Unified dozens of fragmented internal tools into one seamless interface',
      '⚡ Reduced manual workflow bottlenecks and inter-departmental communication drag',
      '🔐 Secured sensitive company assets with granular role-based access controls',
      '💡 Empowered new employees to get up to speed in minutes rather than days',
    ],
    status: 'Production',
    year: '2025',
    color: '#00BCD4',
    gradient: ['#00BCD4', '#055B83'] as [string, string],
    github: '',
    live: '',
    private: true,
    note: 'Repository is private due to enterprise security compliance.',
    simulator: {
      type: 'console',
      badge: 'ENTERPRISE SSO GATEWAY',
      title: 'Single-Pane Operations Control Portal',
      subtitle: 'Simulate unified authentication token exchange and modular service dock',
    },
    codeSnippet: {
      curl: `curl -X POST https://hub.camtech.internal/oauth/token \\
  -d "grant_type=client_credentials&scope=pos,inventory,reporting"`,
      js: `const session = await ssoClient.authenticate({ role: 'SYSTEM_ANALYST' });
console.log('Available internal modules:', session.authorizedApps);`,
      python: `session = SSOGateway.verify_token(token)
user_perms = session.get_roles() # ['POS_ADMIN', 'REPORTS', 'FLEET_20_STATIONS']`,
      response: `{
  "status": 200,
  "token_type": "Bearer",
  "expires_in": 28800,
  "services_accessible": ["PTT_POS_MONITOR", "TELEGRAM_BOT", "SUPPLY_SYSTEM", "ECOMMERCE"]
}`,
    },
  },
  {
    title: 'Personal Portfolio Website',
    headline: 'High-Performance React Native Web Showcase with 60FPS Micro-Animations',
    description:
      'The platform you are viewing right now. Crafted entirely from scratch using React Native Web and Expo SDK 54, this portfolio is a testament to modern web performance and high-end design. It features bespoke scroll-reveal micro-animations, glassmorphism UI techniques, a dynamic skills engine, and an architecture that performs flawlessly across every mobile and desktop device.',
    challenge:
      'Standard web portfolios often feel cookie-cutter, lack fluid micro-interactions, and fail to convey the depth of real production engineering capability.',
    solution:
      'Engineered a bespoke universal React Native Web application featuring custom glassmorphism shaders, dynamic theme engines, and interactive enterprise case studies.',
    metrics: [
      { value: '60 FPS', label: 'Animation Smoothness', sub: 'Native Micro-Interactions' },
      { value: 'Universal', label: 'Cross-Platform Build', sub: 'Web, iOS, Android' },
      { value: '100/100', label: 'Type Safety', sub: 'Strict TypeScript Codebase' },
      { value: 'Expo 54', label: 'Latest Framework', sub: 'Production-Grade Tooling' },
    ],
    features: [
      {
        icon: '💎',
        title: 'Dynamic Glassmorphism Engine',
        desc: 'Bespoke frosted glass cards, dynamic light halos, and luminous borders that react to cursor hover.',
        badge: 'Visual Design',
      },
      {
        icon: '⚡',
        title: 'Staggered Part-by-Part Reveal',
        desc: 'Sophisticated sequence animations that present case studies and data with modern flair.',
        badge: 'Animation',
      },
      {
        icon: '📱',
        title: 'Universal Responsive Layout',
        desc: 'Fluid adaptive design scaling gracefully from 320px mobile screens to 4K ultra-wide displays.',
        badge: 'Responsive',
      },
      {
        icon: '🌓',
        title: 'Integrated Dual-Theme System',
        desc: 'Deep obsidian dark mode and crisp arctic light mode with seamless reactive theme toggling.',
        badge: 'Theme Engine',
      },
    ],
    architecture: [
      {
        category: 'Core Stack',
        items: ['React Native Web', 'Expo SDK 54', 'TypeScript Strict Mode', 'Expo Linear Gradient'],
      },
      {
        category: 'Animation & Effects',
        items: ['Bespoke CSS Keyframe Injector', 'React Native Animated', 'Micro-Interactions Engine'],
      },
      {
        category: 'Hosting & CDN',
        items: ['Vercel Edge Network', 'Cloudflare DNS', 'Automated CI/CD Deployments'],
      },
    ],
    tags: ['React Native', 'Expo', 'TypeScript', 'Web Design', 'Micro-Animations'],
    impact: [
      '✨ Delivers a premium, 60fps responsive experience across all screen sizes',
      '🎨 Showcases advanced scroll motion and high-end glassmorphism UI design',
      '🏗️ Built upon a highly modular, strictly typed component architecture',
      '🌍 Globally deployed with lightning-fast CDN edge caching on portfolio.camtech.cam',
    ],
    status: 'Live',
    year: '2026',
    color: '#00BCD4',
    gradient: ['#00BCD4', '#055B83'] as [string, string],
    github: 'https://github.com/hashira779/my_profile',
    live: 'https://portfolio.camtech.cam',
    private: false,
    simulator: {
      type: 'console',
      badge: 'UNIVERSAL WEB ENGINE',
      title: 'Universal 60FPS Architecture',
      subtitle: 'Simulate multi-platform responsive render tree and glassmorphism shader pipeline',
    },
    codeSnippet: {
      curl: `curl -I https://portfolio.camtech.cam`,
      js: `import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('MyProfile', () => App);
AppRegistry.runApplication('MyProfile', { rootTag: document.getElementById('root') });`,
      python: `# Automated performance audit check
score = lighthouse.audit("https://portfolio.camtech.cam")
print(f"Performance: {score.performance}/100, Smooth 60FPS")`,
      response: `{
  "framework": "Expo SDK 54 / React Native Web",
  "cdn_edge": "Vercel Global Network",
  "custom_domain": "portfolio.camtech.cam",
  "render_speed": "60fps",
  "type_safety": "100% Strict TypeScript"
}`,
    },
  },
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
