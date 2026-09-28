import React, { useState, useEffect } from 'react';
import { Image, Linking, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { RADIUS, FONT_FAMILY } from '../constants/theme';
import { PROFILE, PROJECTS } from '../constants/data';
import AnimatedSection from './AnimatedSection';
import { sectionPadH, sectionPadV } from '../utils/responsive';

type Project = typeof PROJECTS[number];

const PAYWAY_HUB_IMG = require('../assets/payway/payway_ecosystem_hub.png');
const PAYWAY_POS_IMG = require('../assets/payway/payway_pos_counter.png');

const PAYWAY = {
  navyDark: '#001424',
  navyCard: '#001F38',
  navySurface: '#032B4D',
  navyBorder: 'rgba(0, 188, 212, 0.28)',
  cyan: '#00BCD4',
  cyanLight: '#4DD0E1',
  cyanGlow: 'rgba(0, 188, 212, 0.45)',
  cyanSubtle: 'rgba(0, 188, 212, 0.12)',
  emerald: '#00E676',
  emeraldSubtle: 'rgba(0, 230, 118, 0.14)',
  amber: '#FFB300',
  textLight: '#E0F7FA',
  textMuted: '#80DEEA',
};

const STATIONS_20_DATA = [
  { id: 'ST-01', name: 'PTT Monivong Blvd', city: 'Phnom Penh', status: 'Online', latency: '14ms', liters: '16,420 L', revenue: '$18,883', nozz: 8, qrShare: '72%' },
  { id: 'ST-02', name: 'PTT Toul Kork', city: 'Phnom Penh', status: 'Online', latency: '16ms', liters: '14,110 L', revenue: '$16,226', nozz: 8, qrShare: '68%' },
  { id: 'ST-03', name: 'PTT Boeung Keng Kang', city: 'Phnom Penh', status: 'Online', latency: '12ms', liters: '19,850 L', revenue: '$22,827', nozz: 10, qrShare: '79%' },
  { id: 'ST-04', name: 'PTT Russian Blvd (Airport)', city: 'Phnom Penh', status: 'Online', latency: '15ms', liters: '24,200 L', revenue: '$27,830', nozz: 12, qrShare: '74%' },
  { id: 'ST-05', name: 'PTT Chbar Ampov', city: 'Phnom Penh', status: 'Online', latency: '18ms', liters: '12,900 L', revenue: '$14,835', nozz: 6, qrShare: '61%' },
  { id: 'ST-06', name: 'PTT Sen Sok (AEON 2)', city: 'Phnom Penh', status: 'Online', latency: '14ms', liters: '21,300 L', revenue: '$24,495', nozz: 10, qrShare: '81%' },
  { id: 'ST-07', name: 'PTT Veng Sreng Expressway', city: 'Phnom Penh', status: 'Online', latency: '21ms', liters: '17,800 L', revenue: '$20,470', nozz: 8, qrShare: '59%' },
  { id: 'ST-08', name: 'PTT Chroy Changvar', city: 'Phnom Penh', status: 'Online', latency: '17ms', liters: '13,400 L', revenue: '$15,410', nozz: 6, qrShare: '65%' },
  { id: 'ST-09', name: 'PTT Steung Meanchey', city: 'Phnom Penh', status: 'Online', latency: '15ms', liters: '15,600 L', revenue: '$17,940', nozz: 8, qrShare: '64%' },
  { id: 'ST-10', name: 'PTT Chamkarmon Center', city: 'Phnom Penh', status: 'Online', latency: '13ms', liters: '18,100 L', revenue: '$20,815', nozz: 8, qrShare: '76%' },
  { id: 'ST-11', name: 'PTT Kampong Cham Central', city: 'Kompong Cham', status: 'Online', latency: '26ms', liters: '11,400 L', revenue: '$13,110', nozz: 6, qrShare: '54%' },
  { id: 'ST-12', name: 'PTT Battambang HW 5', city: 'Battambang', status: 'Online', latency: '28ms', liters: '15,200 L', revenue: '$17,480', nozz: 8, qrShare: '58%' },
  { id: 'ST-13', name: 'PTT Siem Reap Airport Rd', city: 'Siem Reap', status: 'Online', latency: '24ms', liters: '18,900 L', revenue: '$21,735', nozz: 8, qrShare: '82%' },
  { id: 'ST-14', name: 'PTT Siem Reap Ring Rd', city: 'Siem Reap', status: 'Online', latency: '25ms', liters: '13,100 L', revenue: '$15,065', nozz: 6, qrShare: '77%' },
  { id: 'ST-15', name: 'PTT Sihanoukville Port', city: 'Preah Sihanouk', status: 'Online', latency: '27ms', liters: '22,600 L', revenue: '$25,990', nozz: 10, qrShare: '71%' },
  { id: 'ST-16', name: 'PTT Kampot Riverfront', city: 'Kampot', status: 'Online', latency: '29ms', liters: '10,800 L', revenue: '$12,420', nozz: 6, qrShare: '63%' },
  { id: 'ST-17', name: 'PTT Poipet Border Hub', city: 'Banteay Meanchey', status: 'Online', latency: '32ms', liters: '16,700 L', revenue: '$19,205', nozz: 8, qrShare: '56%' },
  { id: 'ST-18', name: 'PTT Bavet SEZ Tollgate', city: 'Svay Rieng', status: 'Online', latency: '30ms', liters: '14,500 L', revenue: '$16,675', nozz: 8, qrShare: '53%' },
  { id: 'ST-19', name: 'PTT Takeo Junction Rd 2', city: 'Takeo', status: 'Online', latency: '26ms', liters: '9,800 L', revenue: '$11,270', nozz: 6, qrShare: '51%' },
  { id: 'ST-20', name: 'PTT Expressway Rest Area #1', city: 'Kandal', status: 'Online', latency: '19ms', liters: '28,400 L', revenue: '$32,660', nozz: 12, qrShare: '78%' },
];

const ECOSYSTEM_NODES_GENERAL = [
  { id: 'hub', icon: '🏢', label: 'Central PayWay Gateway', desc: 'Central routing engine managing transactions, HMAC signatures, and database commits.', tech: 'REST API / TLS 1.3' },
  { id: 'pos', icon: '💳', label: 'Counter POS Hub', desc: 'Sub-second in-store cashier checkout terminal with instant receipt printing.', tech: 'Local SQLite / WebSocket' },
  { id: 'delivery', icon: '🛵', label: 'Delivery Logistics', desc: 'Dynamic dispatch service routing rider deliveries straight from warehouse to door.', tech: 'GPS / Webhook Relay' },
  { id: 'store', icon: '💻', label: 'E-Commerce Storefront', desc: 'High-speed Next.js web catalog with real-time stock reservation and checkout.', tech: 'Next.js / Cloudflare' },
  { id: 'bot', icon: '🤖', label: 'Telegram Alert Bot', desc: 'Automated notification engine pushing daily revenue audits and hardware warnings.', tech: 'Telegram Bot API / Long-polling' },
];

const ECOSYSTEM_NODES_FLEET = [
  { id: 'counter', icon: '🏪', label: 'Station Cashier Counter', desc: 'Station master desk handling mixed cash and ABA KHQR transactions.', tech: 'Touch POS / RS-485' },
  { id: 'pumps', icon: '⛽', label: 'Fuel Dispenser Nozzles', desc: 'Automatic digital meters monitoring real-time flow (E95, 92, Diesel) with cut-off sensors.', tech: 'Modbus / RS-485' },
  { id: 'replication', icon: '🔄', label: 'MySQL Binlog Sync', desc: 'Sub-25ms continuous replication forwarding transaction logs to head office servers.', tech: 'MySQL Binary Log Replication' },
  { id: 'khqr', icon: '📱', label: 'ABA KHQR Terminal', desc: 'PayWay dynamic QR screen allowing driver instant scan-and-go payment.', tech: 'ABA PayWay KHQR API' },
  { id: 'bot', icon: '🤖', label: '20+ Station Fleet Bot', desc: 'Centralized Telegram monitor providing hourly flow alerts across all 20 provincial nodes.', tech: 'Telegram Bot API' },
];

export default function ProjectsSection() {
  const { colors, isDark } = useTheme();
  const { width } = useWindowDimensions();
  const ph = sectionPadH(width);
  const pv = sectionPadV(width);
  const cols = width >= 1180 ? 3 : width >= 760 ? 2 : 1;
  const cardWidth = cols === 3 ? '32.1%' : cols === 2 ? '48.8%' : '100%';
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const styles = getStyles(colors, isDark);

  const openProject = (project: Project, index: number) => {
    setSelectedProject(project);
    setSelectedIndex(index);
  };

  return (
    <View style={[styles.wrapper, { paddingHorizontal: ph, paddingVertical: pv }]}>
      <AnimatedSection>
        <View style={styles.showcase}>
          <View style={styles.header}>
            <View style={styles.headerIcon}>
              <Text style={styles.headerIconText}>{'</>'}</Text>
            </View>
            <Text style={styles.title}>Projects <Text style={styles.titleAccent}>Made</Text></Text>
            <Text style={styles.subtitle}>Enterprise software, automated retail fleets, database sync, and PayWay fintech integrations.</Text>
          </View>

          <View style={[styles.projectGrid, cols > 1 && styles.projectGridWrap]}>
            {PROJECTS.map((project, index) => (
              <AnimatedSection key={project.title} delay={index * 55} direction="up" style={{ width: cardWidth }}>
                <ProjectCard project={project} index={index} onPress={() => openProject(project, index)} styles={styles} />
              </AnimatedSection>
            ))}
          </View>

          <Pressable
            onPress={() => Linking.openURL(PROFILE.github)}
            style={({ pressed, hovered }: any) => [styles.viewAllBtn, (pressed || hovered) && styles.viewAllBtnHover]}
          >
            <Text style={styles.viewAllText}>{'View GitHub ->'}</Text>
          </Pressable>
        </View>
      </AnimatedSection>

      <ProjectDetailModal
        project={selectedProject}
        projectIndex={selectedIndex}
        totalProjects={PROJECTS.length}
        onClose={() => setSelectedProject(null)}
        onNext={() => {
          const next = (selectedIndex + 1) % PROJECTS.length;
          setSelectedIndex(next);
          setSelectedProject(PROJECTS[next]);
        }}
        onPrev={() => {
          const prev = (selectedIndex - 1 + PROJECTS.length) % PROJECTS.length;
          setSelectedIndex(prev);
          setSelectedProject(PROJECTS[prev]);
        }}
        colors={colors}
        isDark={isDark}
      />
    </View>
  );
}

function ProjectCard({ project, index, onPress, styles }: { project: Project; index: number; onPress: () => void; styles: any }) {
  const [hovered, setHovered] = useState(false);
  const accent = project.color || PAYWAY.cyan;
  const initials = project.title
    .split(' ')
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  const heroMetric = project.metrics && project.metrics.length > 0 ? project.metrics[0] : null;

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      accessibilityRole="button"
      accessibilityLabel={`Open ${project.title} project details`}
      style={[
        styles.projectCard,
        Platform.OS === 'web' && {
          transform: [{ translateY: hovered ? -8 : 0 }, { scale: hovered ? 1.012 : 1 }],
          borderColor: hovered ? PAYWAY.cyan : 'rgba(0, 188, 212, 0.22)',
          boxShadow: hovered ? `0 24px 60px rgba(0, 188, 212, 0.32)` : '0 12px 32px rgba(0, 15, 30, 0.45)',
          transition: 'all 230ms cubic-bezier(0.22, 1, 0.36, 1)',
          cursor: 'pointer',
        } as any,
      ]}
    >
      <View style={styles.preview}>
        <View style={styles.previewGrid} />
        <View style={[styles.previewOrbA, { backgroundColor: `${accent}22` }]} />
        <View style={[styles.previewOrbB, { backgroundColor: `${accent}16` }]} />

        <View style={styles.previewTopRow}>
          <Text style={styles.projectNumber}>{String(index + 1).padStart(2, '0')}</Text>
          <View style={[styles.statusPill, { borderColor: `${accent}55`, backgroundColor: `${accent}18` }]}>
            <View style={[styles.statusDot, { backgroundColor: accent }]} />
            <Text style={[styles.statusText, { color: accent }]}>{project.status}</Text>
          </View>
        </View>

        <View style={styles.previewCenter}>
          <Text style={[styles.previewInitials, { color: accent }]}>{initials}</Text>
          <Text style={styles.previewMeta}>{project.year}</Text>
          <Text style={styles.previewHeadline} numberOfLines={2}>{project.headline}</Text>
        </View>

        {heroMetric && (
          <View style={[styles.cardMetricBadge, { borderColor: `${accent}40`, backgroundColor: `${accent}12` }]}>
            <Text style={[styles.cardMetricValue, { color: accent }]}>{heroMetric.value}</Text>
            <Text style={styles.cardMetricLabel}>{heroMetric.label}</Text>
          </View>
        )}

        <View style={styles.previewTags}>
          {project.tags.slice(0, 3).map((tag) => (
            <View key={tag} style={styles.previewTag}>
              <Text style={styles.previewTagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.projectStrip, { backgroundColor: PAYWAY.cyan }]}>
        <Text style={styles.projectTitle} numberOfLines={1}>{project.title}</Text>
        <View style={styles.exploreBadge}>
          <Text style={styles.exploreText}>View Spec</Text>
          <Text style={styles.projectArrow}>{'->'}</Text>
        </View>
      </View>
    </Pressable>
  );
}

function ProjectDetailModal({
  project,
  projectIndex,
  totalProjects,
  onClose,
  onNext,
  onPrev,
  colors,
  isDark,
}: {
  project: Project | null;
  projectIndex: number;
  totalProjects: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  colors: any;
  isDark: boolean;
}) {
  const { width, height } = useWindowDimensions();
  const [viewMode, setViewMode] = useState<'production' | 'developer'>('production');
  const [activeTab, setActiveTab] = useState<'overview' | 'simulator' | 'features' | 'architecture' | 'impact'>('overview');
  const [activeCodeLang, setActiveCodeLang] = useState<'curl' | 'js' | 'python' | 'response'>('curl');
  const [copied, setCopied] = useState(false);

  // Simulator specific states
  const [selectedStationIndex, setSelectedStationIndex] = useState(0);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'scanning' | 'approved'>('cart');
  const [botChatMessages, setBotChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    { sender: 'bot', text: '👋 CamTech 20+ Station Telemetry Online. Tap a command below to test live report dispatch.', time: '10:00:02 AM' },
  ]);

  const isFleet = project?.simulator?.type === 'fleet';
  const nodeOptions = isFleet ? ECOSYSTEM_NODES_FLEET : ECOSYSTEM_NODES_GENERAL;
  const [selectedNode, setSelectedNode] = useState(nodeOptions[0]);
  const [isHighTraffic, setIsHighTraffic] = useState(false);

  const generalHotspots = [
    { id: 'hub', label: 'PW HUB', top: '46%', left: '50%', icon: '🏢' },
    { id: 'delivery', label: 'DISPATCH', top: '38%', left: '31%', icon: '🛵' },
    { id: 'pos', label: 'POS TERMINAL', top: '28%', left: '75%', icon: '💳' },
    { id: 'store', label: 'WEB STORE', top: '74%', left: '68%', icon: '💻' },
    { id: 'bot', label: 'TG BOT', top: '22%', left: '46%', icon: '🤖' },
  ];

  const generalLines = [
    { x1: '50%', y1: '46%', x2: '31%', y2: '38%' },
    { x1: '50%', y1: '46%', x2: '75%', y2: '28%' },
    { x1: '50%', y1: '46%', x2: '68%', y2: '74%' },
    { x1: '50%', y1: '46%', x2: '30%', y2: '68%' },
    { x1: '50%', y1: '46%', x2: '46%', y2: '22%' },
  ];

  const fleetHotspots = [
    { id: 'counter', label: 'CASHIER DESK', top: '38%', left: '50%', icon: '🏪' },
    { id: 'pumps', label: 'CARD PUMP', top: '60%', left: '24%', icon: '⛽' },
    { id: 'khqr', label: 'KHQR SCANNER', top: '72%', left: '54%', icon: '📱' },
    { id: 'replication', label: 'BINLOG SYNC', top: '52%', left: '74%', icon: '🔄' },
  ];

  const fleetLines = [
    { x1: '50%', y1: '38%', x2: '24%', y2: '60%' },
    { x1: '50%', y1: '38%', x2: '54%', y2: '72%' },
    { x1: '50%', y1: '38%', x2: '74%', y2: '52%' },
  ];

  const activeHotspots = isFleet ? fleetHotspots : generalHotspots;
  const activeLines = isFleet ? fleetLines : generalLines;

  const styles = getModalStyles(colors, isDark);

  useEffect(() => {
    setActiveTab('overview');
    setViewMode('production');
    setCheckoutStep('cart');
    setSelectedStationIndex(0);
    setSelectedNode(project?.simulator?.type === 'fleet' ? ECOSYSTEM_NODES_FLEET[0] : ECOSYSTEM_NODES_GENERAL[0]);
  }, [projectIndex, project]);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!project) return null;

  const isWide = width >= 880;
  const maxHeight = Math.min(height * 0.94, 900);
  const isPrivate = Boolean((project as any).private);
  const note = (project as any).note as string | undefined;

  const telegramUrl = 'https://t.me/chhoy_too';
  const emailUrl = `mailto:chhoytoo@outlook.com?subject=${encodeURIComponent(`Enterprise Project Inquiry: ${project.title}`)}`;

  const copyCode = (code: string) => {
    if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleBotCommand = (cmd: string) => {
    const timeStr = new Date().toLocaleTimeString();
    if (cmd === '/today') {
      setBotChatMessages((prev) => [
        ...prev,
        { sender: 'user', text: '/today', time: timeStr },
        {
          sender: 'bot',
          text: `📊 DAILY FLEET SUMMARY (20/20 Stations)\n• Total Fuel Pumped: 334,130 Liters\n• Total Gross Revenue: $383,988 USD\n• ABA PayWay / KHQR Share: 68.4%\n• Cash Counter Share: 31.6%\n• Binlog Replication Health: 100% OK`,
          time: timeStr,
        },
      ]);
    } else if (cmd === '/station_report') {
      setBotChatMessages((prev) => [
        ...prev,
        { sender: 'user', text: '/station_report', time: timeStr },
        {
          sender: 'bot',
          text: `⛽ STATION MATRIX STATUS:\n✅ ST-01 Monivong: 16,420 L | Latency: 14ms\n✅ ST-04 Russian Blvd: 24,200 L | Latency: 15ms\n✅ ST-13 Siem Reap: 18,900 L | Latency: 24ms\n✅ ST-20 Expressway: 28,400 L | Latency: 19ms\n[All 20 nodes pinging successfully]`,
          time: timeStr,
        },
      ]);
    } else if (cmd === '/alerts') {
      setBotChatMessages((prev) => [
        ...prev,
        { sender: 'user', text: '/alerts', time: timeStr },
        {
          sender: 'bot',
          text: `🟢 ZERO CRITICAL ALERTS\n• 0 Dropped transactions\n• Max sync lag: 32ms (ST-17 Poipet)\n• Cloudflare Zero Trust Tunnel: Active\n• Next automated report: 18:00 ICT`,
          time: timeStr,
        },
      ]);
    }
  };

  const currentCode = project.codeSnippet ? project.codeSnippet[activeCodeLang] : `// API Reference for ${project.title}\nGET https://api.camtech.cam/v1/health\nStatus: 200 OK`;

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalRoot}>
        <Pressable style={StyleSheet.absoluteFillObject} onPress={onClose} />

        <View
          style={[
            styles.modalShell,
            { maxHeight },
            isWide && styles.modalShellWide,
            Platform.OS === 'web' &&
              ({
                animation: 'ct-modal-pop 360ms cubic-bezier(0.16, 1, 0.3, 1) both',
              } as any),
          ]}
        >
          {/* Ambient luminous PayWay cyan orbs */}
          <View style={styles.modalAmbientOrbA} pointerEvents="none" />
          <View style={styles.modalAmbientOrbB} pointerEvents="none" />

          {/* PayWay Signature Header Navigation Bar */}
          <View style={styles.paywayHeader}>
            <View style={styles.paywayBrandCol}>
              <View style={styles.paywayLogoBadge}>
                <View style={styles.paywayLogoDot} />
                <Text style={styles.paywayLogoText}>ABA PAYWAY ARCHITECTURE</Text>
              </View>
              <Text style={styles.paywayProjectCounter}>
                SYSTEM {String(projectIndex + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
              </Text>
            </View>

            {/* Mode Switcher: Production vs Developer Sandbox */}
            <View style={styles.modeSwitchWrap}>
              <Pressable
                onPress={() => setViewMode('production')}
                style={[
                  styles.modeSwitchBtn,
                  viewMode === 'production' && styles.modeSwitchBtnActive,
                ]}
              >
                <Text style={[styles.modeSwitchText, viewMode === 'production' && styles.modeSwitchTextActive]}>
                  ● Production Spec
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setViewMode('developer')}
                style={[
                  styles.modeSwitchBtn,
                  viewMode === 'developer' && styles.modeSwitchBtnActive,
                ]}
              >
                <Text style={[styles.modeSwitchText, viewMode === 'developer' && styles.modeSwitchTextActive]}>
                  🧪 Developer Sandbox
                </Text>
              </Pressable>
            </View>

            {/* Modal Controls */}
            <View style={styles.headerControls}>
              <Pressable
                onPress={onPrev}
                style={({ pressed, hovered }: any) => [styles.headerNavBtn, (pressed || hovered) && styles.headerNavBtnHover]}
                accessibilityLabel="Previous Project"
              >
                <Text style={styles.headerNavBtnText}>{'< Prev'}</Text>
              </Pressable>

              <Pressable
                onPress={onNext}
                style={({ pressed, hovered }: any) => [styles.headerNavBtn, (pressed || hovered) && styles.headerNavBtnHover]}
                accessibilityLabel="Next Project"
              >
                <Text style={styles.headerNavBtnText}>{'Next >'}</Text>
              </Pressable>

              <Pressable
                onPress={onClose}
                style={({ pressed, hovered }: any) => [styles.headerCloseBtn, (pressed || hovered) && styles.headerCloseBtnHover]}
                accessibilityLabel="Close Modal"
              >
                <Text style={styles.headerCloseBtnText}>✕</Text>
              </Pressable>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* HERO SECTION */}
            <View style={styles.heroSection}>
              <View style={styles.heroMetaRow}>
                <View style={styles.heroStatusBadge}>
                  <View style={styles.heroStatusDot} />
                  <Text style={styles.heroStatusLabel}>{project.status.toUpperCase()} SYSTEM • {project.year}</Text>
                </View>

                {project.metrics && project.metrics[0] ? (
                  <View style={styles.heroMetricPill}>
                    <Text style={styles.heroMetricPillText}>⚡ {project.metrics[0].value} {project.metrics[0].label}</Text>
                  </View>
                ) : null}
              </View>

              <Text style={styles.heroTitle}>{project.title}</Text>
              <Text style={styles.heroHeadline}>{project.headline}</Text>
              <Text style={styles.heroDescription}>{project.description}</Text>

              {/* PayWay Action Bar */}
              <View style={styles.heroActionRow}>
                {project.live ? (
                  <Pressable
                    style={({ pressed, hovered }: any) => [
                      styles.btnPaywayPrimary,
                      (pressed || hovered) && styles.btnPaywayPrimaryHover,
                    ]}
                    onPress={() => Linking.openURL(project.live)}
                  >
                    <Text style={styles.btnPaywayPrimaryText}>🚀 Launch Live System ↗</Text>
                  </Pressable>
                ) : null}

                {!isPrivate && project.github ? (
                  <Pressable
                    style={({ pressed, hovered }: any) => [
                      styles.btnPaywayOutline,
                      (pressed || hovered) && styles.btnPaywayOutlineHover,
                    ]}
                    onPress={() => Linking.openURL(project.github)}
                  >
                    <Text style={styles.btnPaywayOutlineText}>📦 GitHub Repository ↗</Text>
                  </Pressable>
                ) : null}

                <Pressable
                  style={({ pressed, hovered }: any) => [
                    styles.btnPaywayCyanOutline,
                    (pressed || hovered) && styles.btnPaywayCyanOutlineHover,
                  ]}
                  onPress={() => Linking.openURL(telegramUrl)}
                >
                  <Text style={styles.btnPaywayCyanOutlineText}>💬 Contact on Telegram ↗</Text>
                </Pressable>

                <Pressable
                  style={({ pressed, hovered }: any) => [
                    styles.btnPaywayOutline,
                    (pressed || hovered) && styles.btnPaywayOutlineHover,
                  ]}
                  onPress={() => Linking.openURL(emailUrl)}
                >
                  <Text style={styles.btnPaywayOutlineText}>✉️ Email Inquiry ↗</Text>
                </Pressable>
              </View>
            </View>

            {/* 3D ISOMETRIC ECOSYSTEM ANIMATION STAGE */}
            <View style={styles.isometricStageBox}>
              <View style={styles.isometricStageHeader}>
                <View style={styles.isometricTagRow}>
                  <View style={styles.isometricTag}>
                    <Text style={styles.isometricTagText}>3D ISOMETRIC ARCHITECTURE FLOW</Text>
                  </View>
                  <View style={styles.livePulseTag}>
                    <View style={styles.livePulseDot} />
                    <Text style={styles.livePulseText}>REAL-TIME EVENT BUS</Text>
                  </View>
                </View>
                <Text style={styles.isometricTitle}>
                  {isFleet ? 'Retail Cashier & Automated Fuel Dispenser Matrix' : 'Omnichannel Microservices & Hardware Connectivity'}
                </Text>
                <Text style={styles.isometricSubtitle}>
                  {isFleet
                    ? 'Synchronizing in-store POS checkouts, fuel nozzles, and central database replication.'
                    : 'Interconnecting delivery dispatch, physical POS counters, customer web store, and ABA PayWay KHQR.'}
                </Text>
              </View>

              {/* Floating Animated Graphic Canvas with Real-Time Flowing Circuit Lines */}
              <View style={styles.isometricStageCanvas}>
                <View style={styles.isometricGlowAura} pointerEvents="none" />

                {/* Interactive Circuit Canvas with Overlaid SVG Lines and Hotspot Pins */}
                <View style={styles.isometricCanvasFrame}>
                  <View style={styles.isometricGraphicFloatWrap}>
                    <Image
                      source={isFleet ? PAYWAY_POS_IMG : PAYWAY_HUB_IMG}
                      style={styles.isometricGraphicImg}
                      resizeMode="contain"
                    />
                  </View>

                  {/* SVG Circuit Lines with Flowing Animated Dashes & Pulsing Photons */}
                  {Platform.OS === 'web' &&
                    React.createElement(
                      'svg',
                      {
                        style: {
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          pointerEvents: 'none',
                          zIndex: 3,
                        },
                      },
                      activeLines.map((line, i) =>
                        React.createElement(
                          'g',
                          { key: i },
                          React.createElement('line', {
                            x1: line.x1,
                            y1: line.y1,
                            x2: line.x2,
                            y2: line.y2,
                            stroke: '#00BCD4',
                            strokeWidth: isHighTraffic ? '2.5' : '1.8',
                            strokeDasharray: '6,6',
                            style: {
                              animation: `ct-dash-flow ${isHighTraffic ? '0.45s' : '1.1s'} linear infinite`,
                              filter: 'drop-shadow(0 0 4px #00BCD4)',
                            },
                          }),
                          React.createElement('circle', {
                            cx: line.x2,
                            cy: line.y2,
                            r: isHighTraffic ? '4' : '3',
                            fill: '#00E676',
                            style: {
                              animation: `ct-pulse-dot ${isHighTraffic ? '0.6s' : '1.4s'} ease-in-out infinite`,
                            },
                          })
                        )
                      )
                    )}

                  {/* Interactive Glowing Hotspot Beacon Pins Overlaid directly on Nodes */}
                  {activeHotspots.map((spot) => {
                    const isSpotSel = selectedNode.id === spot.id;
                    return (
                      <Pressable
                        key={spot.id}
                        onPress={() => setSelectedNode(nodeOptions.find((n) => n.id === spot.id) || nodeOptions[0])}
                        style={[
                          styles.beaconPin,
                          { top: spot.top as any, left: spot.left as any },
                          isSpotSel && styles.beaconPinSelected,
                        ]}
                      >
                        <View style={styles.beaconRing} />
                        <View style={[styles.beaconCoreDot, isSpotSel && styles.beaconCoreDotActive]} />
                        <View style={[styles.beaconPill, isSpotSel && styles.beaconPillActive]}>
                          <Text style={[styles.beaconPillText, isSpotSel && styles.beaconPillTextActive]}>
                            {spot.icon} {spot.label}
                          </Text>
                        </View>
                      </Pressable>
                    );
                  })}
                </View>

                {/* Simulation Control Bar */}
                <View style={styles.simControlRow}>
                  <Pressable
                    onPress={() => setIsHighTraffic(!isHighTraffic)}
                    style={[styles.trafficToggleBtn, isHighTraffic && styles.trafficToggleBtnActive]}
                  >
                    <Text style={styles.trafficToggleIcon}>{isHighTraffic ? '⚡' : '🚀'}</Text>
                    <Text style={[styles.trafficToggleText, isHighTraffic && styles.trafficToggleTextActive]}>
                      {isHighTraffic ? 'Live Stress Test: 500 req/s Active' : 'Simulate High-Load Event Traffic (Click)'}
                    </Text>
                  </Pressable>
                  <Text style={styles.trafficHint}>
                    {isHighTraffic ? 'Dashes & beacons pulsing at 2.5x speed' : 'Tap any hotspot node to inspect real-time bus telemetry'}
                  </Text>
                </View>

                {/* Hotspot Chips / Architectural Modules */}
                <View style={styles.hotspotsWrap}>
                  {nodeOptions.map((node) => {
                    const isNodeSel = selectedNode.id === node.id;
                    return (
                      <Pressable
                        key={node.id}
                        onPress={() => setSelectedNode(node)}
                        style={[styles.hotspotBtn, isNodeSel && styles.hotspotBtnActive]}
                      >
                        <Text style={styles.hotspotIcon}>{node.icon}</Text>
                        <Text style={[styles.hotspotLabel, isNodeSel && styles.hotspotLabelActive]}>
                          {node.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>

                {/* Active Node Detail Card */}
                <View style={styles.activeNodeCard}>
                  <View style={styles.activeNodeHeaderRow}>
                    <Text style={styles.activeNodeTitle}>{selectedNode.icon} {selectedNode.label}</Text>
                    <View style={styles.protocolPill}>
                      <Text style={styles.protocolText}>{selectedNode.tech}</Text>
                    </View>
                  </View>
                  <Text style={styles.activeNodeDesc}>{selectedNode.desc}</Text>
                </View>
              </View>
            </View>

            {/* IF IN DEVELOPER SANDBOX MODE */}
            {viewMode === 'developer' ? (
              <View style={styles.developerSuiteBox}>
                <View style={styles.suiteHeader}>
                  <View>
                    <Text style={styles.suiteTitle}>PayWay Developer Code Suite</Text>
                    <Text style={styles.suiteSub}>Production REST API payload specifications, headers, and verified responses</Text>
                  </View>
                  <View style={styles.suiteLiveTag}>
                    <Text style={styles.suiteLiveTagText}>🟢 SANDBOX ACTIVE</Text>
                  </View>
                </View>

                {/* Language Switch Tabs */}
                <View style={styles.langTabBar}>
                  {(['curl', 'js', 'python', 'response'] as const).map((lang) => (
                    <Pressable
                      key={lang}
                      onPress={() => setActiveCodeLang(lang)}
                      style={[
                        styles.langTabBtn,
                        activeCodeLang === lang && styles.langTabBtnActive,
                      ]}
                    >
                      <Text style={[styles.langTabBtnText, activeCodeLang === lang && styles.langTabBtnTextActive]}>
                        {lang === 'curl' ? 'cURL' : lang === 'js' ? 'Node.js / JS' : lang === 'python' ? 'Python' : 'JSON Response (200 OK)'}
                      </Text>
                    </Pressable>
                  ))}
                  <Pressable onPress={() => copyCode(currentCode)} style={styles.copyBtn}>
                    <Text style={styles.copyBtnText}>{copied ? '✓ Copied' : '📋 Copy Code'}</Text>
                  </Pressable>
                </View>

                {/* Code Terminal View */}
                <View style={styles.codeTerminal}>
                  <ScrollView horizontal showsHorizontalScrollIndicator contentContainerStyle={{ padding: 16 }}>
                    <Text style={styles.codeContent}>{currentCode}</Text>
                  </ScrollView>
                </View>

                {/* API Request Fields Reference Table */}
                <View style={styles.paramTable}>
                  <Text style={styles.paramTableTitle}>API PARAMETER SPECIFICATIONS</Text>
                  <View style={styles.paramRowHeader}>
                    <Text style={[styles.paramCell, { flex: 1.8, fontWeight: '900' }]}>FIELD</Text>
                    <Text style={[styles.paramCell, { flex: 1.2, fontWeight: '900' }]}>TYPE</Text>
                    <Text style={[styles.paramCell, { flex: 1.2, fontWeight: '900' }]}>REQUIREMENT</Text>
                    <Text style={[styles.paramCell, { flex: 3.5, fontWeight: '900' }]}>DESCRIPTION</Text>
                  </View>
                  <View style={styles.paramRow}>
                    <Text style={[styles.paramCell, styles.paramCode, { flex: 1.8 }]}>X-Api-Key</Text>
                    <Text style={[styles.paramCell, { flex: 1.2 }]}>String</Text>
                    <Text style={[styles.paramCell, styles.paramReq, { flex: 1.2 }]}>Required</Text>
                    <Text style={[styles.paramCell, { flex: 3.5 }]}>HMAC authorization token generated via Cloudflare Gateway</Text>
                  </View>
                  <View style={styles.paramRow}>
                    <Text style={[styles.paramCell, styles.paramCode, { flex: 1.8 }]}>order_id / station_id</Text>
                    <Text style={[styles.paramCell, { flex: 1.2 }]}>String</Text>
                    <Text style={[styles.paramCell, styles.paramReq, { flex: 1.2 }]}>Required</Text>
                    <Text style={[styles.paramCell, { flex: 3.5 }]}>Unique alphanumeric transaction or hardware terminal identifier</Text>
                  </View>
                  <View style={styles.paramRow}>
                    <Text style={[styles.paramCell, styles.paramCode, { flex: 1.8 }]}>payment_method</Text>
                    <Text style={[styles.paramCell, { flex: 1.2 }]}>Enum</Text>
                    <Text style={[styles.paramCell, styles.paramReq, { flex: 1.2 }]}>Required</Text>
                    <Text style={[styles.paramCell, { flex: 3.5 }]}>Supported: ABA_KHQR, BAKONG, VISA, MASTERCARD, CASH_POS</Text>
                  </View>
                  <View style={styles.paramRow}>
                    <Text style={[styles.paramCell, styles.paramCode, { flex: 1.8 }]}>replication_lag_ms</Text>
                    <Text style={[styles.paramCell, { flex: 1.2 }]}>Integer</Text>
                    <Text style={[styles.paramCell, styles.paramOpt, { flex: 1.2 }]}>Telemetry</Text>
                    <Text style={[styles.paramCell, { flex: 3.5 }]}>Binlog delta verification timestamp for cross-station sync</Text>
                  </View>
                </View>
              </View>
            ) : null}

            {/* INTERACTIVE SIMULATOR WIDGET (Always prominent) */}
            <View style={styles.simulatorWrapper}>
              <View style={styles.simulatorHeader}>
                <View style={styles.simBadge}>
                  <Text style={styles.simBadgeText}>{project.simulator?.badge || 'INTERACTIVE DEMONSTRATION'}</Text>
                </View>
                <Text style={styles.simTitle}>{project.simulator?.title || 'Interactive Live Simulator'}</Text>
                <Text style={styles.simSubtitle}>{project.simulator?.subtitle || 'Experience live execution behavior and real-time outputs'}</Text>
              </View>

              {/* SIMULATOR TYPE: FLEET TELEMETRY (PTT 20+ STATIONS) */}
              {isFleet ? (
                <View style={styles.fleetSimulatorBox}>
                  <View style={styles.fleetTopBar}>
                    <Text style={styles.fleetBarTitle}>CAMBODIA FLEET RADAR: 20 STATIONS ACTIVE</Text>
                    <Text style={styles.fleetBarSub}>🟢 All Nodes Online • 0 Offline Events • Binlog Sync &lt; 25ms</Text>
                  </View>

                  {/* Horizontal station selectors (20 stations) */}
                  <Text style={styles.fleetSelectorHint}>Select any station node to inspect live pump metrics & replication latency:</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator contentContainerStyle={styles.stationChipsList}>
                    {STATIONS_20_DATA.map((st, idx) => {
                      const isSel = idx === selectedStationIndex;
                      return (
                        <Pressable
                          key={st.id}
                          onPress={() => setSelectedStationIndex(idx)}
                          style={[styles.stationChip, isSel && styles.stationChipActive]}
                        >
                          <Text style={[styles.stationChipId, isSel && styles.stationChipIdActive]}>{st.id}</Text>
                          <Text style={[styles.stationChipName, isSel && styles.stationChipNameActive]} numberOfLines={1}>
                            {st.city}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </ScrollView>

                  {/* Selected Station Telemetry Cockpit */}
                  {(() => {
                    const activeSt = STATIONS_20_DATA[selectedStationIndex] || STATIONS_20_DATA[0];
                    return (
                      <View style={styles.telemetryCard}>
                        <View style={styles.telemetryCardHeader}>
                          <View>
                            <Text style={styles.telemetryStationTitle}>{activeSt.id}: {activeSt.name}</Text>
                            <Text style={styles.telemetryStationMeta}>{activeSt.city}, Cambodia • {activeSt.nozz} Fuel Dispenser Nozzles</Text>
                          </View>
                          <View style={styles.telemetryLiveBadge}>
                            <View style={styles.telemetryLiveDot} />
                            <Text style={styles.telemetryLiveText}>{activeSt.status} • {activeSt.latency}</Text>
                          </View>
                        </View>

                        <View style={styles.telemetryMetricsRow}>
                          <View style={styles.telemetryMetricItem}>
                            <Text style={styles.telemetryMetricVal}>{activeSt.liters}</Text>
                            <Text style={styles.telemetryMetricLbl}>Today's Fuel Flow</Text>
                          </View>
                          <View style={styles.telemetryMetricItem}>
                            <Text style={[styles.telemetryMetricVal, { color: PAYWAY.cyan }]}>{activeSt.revenue}</Text>
                            <Text style={styles.telemetryMetricLbl}>Gross Station Revenue</Text>
                          </View>
                          <View style={styles.telemetryMetricItem}>
                            <Text style={[styles.telemetryMetricVal, { color: PAYWAY.emerald }]}>{activeSt.qrShare}</Text>
                            <Text style={styles.telemetryMetricLbl}>ABA KHQR Penetration</Text>
                          </View>
                          <View style={styles.telemetryMetricItem}>
                            <Text style={styles.telemetryMetricVal}>{activeSt.latency}</Text>
                            <Text style={styles.telemetryMetricLbl}>MySQL Sync Latency</Text>
                          </View>
                        </View>

                        <View style={styles.telemetryFooter}>
                          <Text style={styles.telemetryFooterText}>
                            🛡️ Hardware Protocol: RS-485 / Modbus Gateway • Edge Failover Buffer: 0 Dropped Packets • Auto-reconnect on 4G recovery
                          </Text>
                        </View>
                      </View>
                    );
                  })()}
                </View>
              ) : null}

              {/* SIMULATOR TYPE: CHECKOUT (ABA PAYWAY KHQR) */}
              {project.simulator?.type === 'checkout' ? (
                <View style={styles.checkoutSimulatorBox}>
                  <View style={styles.checkoutOrderSummary}>
                    <View style={styles.checkoutSummaryCol}>
                      <Text style={styles.checkoutBrandTag}>CAMTECH OFFICIAL STORE & POS</Text>
                      <Text style={styles.checkoutOrderTitle}>Order #CT-2026-9810</Text>
                      <Text style={styles.checkoutOrderItems}>• Pro Workstation License & Hardware Adapter</Text>
                    </View>
                    <View style={styles.checkoutPriceCol}>
                      <Text style={styles.checkoutPriceTotal}>$149.00</Text>
                      <Text style={styles.checkoutPriceSub}>USD (ABA PayWay)</Text>
                    </View>
                  </View>

                  {/* Payment Stage */}
                  {checkoutStep === 'cart' && (
                    <View style={styles.checkoutCardBody}>
                      <View style={styles.khqrFrame}>
                        <View style={styles.khqrInnerBox}>
                          {/* Animated Cyber Laser Scanner Bar */}
                          <View style={styles.khqrLaserLine} pointerEvents="none" />

                          <Text style={styles.khqrMockQr}>[ KHQR CODE MATRIX ]</Text>
                          <View style={styles.khqrPaywayLogoRow}>
                            <Text style={styles.khqrPaywayLogo}>ABA PAYWAY</Text>
                          </View>
                        </View>
                        <Text style={styles.khqrScanText}>Scan with ABA Mobile or any Bakong App</Text>
                      </View>

                      <View style={styles.checkoutCtaWrap}>
                        <Pressable
                          onPress={() => {
                            setCheckoutStep('scanning');
                            setTimeout(() => setCheckoutStep('approved'), 1200);
                          }}
                          style={({ pressed, hovered }: any) => [
                            styles.btnPaywayPrimary,
                            (pressed || hovered) && styles.btnPaywayPrimaryHover,
                          ]}
                        >
                          <Text style={styles.btnPaywayPrimaryText}>📲 Simulate ABA Mobile Scan & Pay ($149.00)</Text>
                        </Pressable>
                        <Text style={styles.checkoutSimNote}>Simulates instant webhook dispatch and inventory deduction in POS</Text>
                      </View>
                    </View>
                  )}

                  {checkoutStep === 'scanning' && (
                    <View style={styles.checkoutProcessingBox}>
                      <Text style={styles.processingSpinner}>⚡</Text>
                      <Text style={styles.processingTitle}>Authorizing with ABA PayWay API...</Text>
                      <Text style={styles.processingSub}>Validating cryptographic signature & reserving inventory</Text>
                    </View>
                  )}

                  {checkoutStep === 'approved' && (
                    <View style={styles.checkoutApprovedBox}>
                      <View style={styles.approvedIconWrap}>
                        <Text style={styles.approvedIcon}>✓</Text>
                      </View>
                      <Text style={styles.approvedTitle}>Payment Approved via ABA PayWay!</Text>
                      <Text style={styles.approvedSub}>Transaction Ref: ABA-PW-20260928-847291 • Status: COMPLETED</Text>
                      <View style={styles.approvedLogBox}>
                        <Text style={styles.approvedLogLine}>[Webhook] Received payment verification from api.payway.com.kh</Text>
                        <Text style={styles.approvedLogLine}>[POS Hub] Deducted stock in warehouse #1 • Receipt printed in 42ms</Text>
                      </View>
                      <Pressable onPress={() => setCheckoutStep('cart')} style={styles.resetSimBtn}>
                        <Text style={styles.resetSimBtnText}>↺ Test Again</Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              ) : null}

              {/* SIMULATOR TYPE: TELEGRAM BOT */}
              {project.simulator?.type === 'bot' ? (
                <View style={styles.telegramSimulatorBox}>
                  <View style={styles.tgHeader}>
                    <View style={styles.tgAvatar}>
                      <Text style={styles.tgAvatarText}>🤖</Text>
                    </View>
                    <View>
                      <Text style={styles.tgBotName}>CamTech Fleet Telemetry Bot</Text>
                      <Text style={styles.tgBotStatus}>bot • 20+ Stations Connected</Text>
                    </View>
                  </View>

                  <ScrollView style={styles.tgChatArea} contentContainerStyle={{ padding: 14, gap: 10 }}>
                    {botChatMessages.map((msg, i) => (
                      <View
                        key={i}
                        style={[
                          styles.tgBubble,
                          msg.sender === 'user' ? styles.tgBubbleUser : styles.tgBubbleBot,
                        ]}
                      >
                        <Text style={styles.tgMsgText}>{msg.text}</Text>
                        <Text style={styles.tgMsgTime}>{msg.time}</Text>
                      </View>
                    ))}
                  </ScrollView>

                  {/* Quick Telegram Command Action Bar */}
                  <View style={styles.tgCommandsRow}>
                    <Pressable onPress={() => handleBotCommand('/today')} style={styles.tgCmdChip}>
                      <Text style={styles.tgCmdChipText}>📊 /today (Revenue)</Text>
                    </Pressable>
                    <Pressable onPress={() => handleBotCommand('/station_report')} style={styles.tgCmdChip}>
                      <Text style={styles.tgCmdChipText}>⛽ /station_report (20 Stations)</Text>
                    </Pressable>
                    <Pressable onPress={() => handleBotCommand('/alerts')} style={styles.tgCmdChip}>
                      <Text style={styles.tgCmdChipText}>⚠️ /alerts (Health Check)</Text>
                    </Pressable>
                  </View>
                </View>
              ) : null}

              {/* SIMULATOR TYPE: CONSOLE / AUDIT / MAP */}
              {!isFleet && project.simulator?.type !== 'checkout' && project.simulator?.type !== 'bot' ? (
                <View style={styles.consoleSimulatorBox}>
                  <View style={styles.consoleHeader}>
                    <Text style={styles.consoleHeaderTitle}>LIVE API PIPELINE TESTER</Text>
                    <Text style={styles.consoleHeaderStatus}>200 OK • LATENCY: 18ms</Text>
                  </View>
                  <View style={styles.consoleBody}>
                    <Text style={styles.consoleCodeLine}>&gt; POST /v1/telemetry/event HTTP/1.1</Text>
                    <Text style={styles.consoleCodeLine}>&gt; Host: api.camtech.cam</Text>
                    <Text style={styles.consoleCodeLine}>&gt; Authorization: Bearer ct_live_token</Text>
                    <Text style={[styles.consoleCodeLine, { color: PAYWAY.emerald }]}>&lt; HTTP/1.1 200 OK</Text>
                    <Text style={[styles.consoleCodeLine, { color: PAYWAY.textMuted }]}>
                      &lt; {`{"status": "ACK", "station_nodes_synced": 20, "binlog_delta": 0, "hash": "sha256:8f4a2"}`}
                    </Text>
                  </View>
                </View>
              ) : null}
            </View>

            {/* KEY PERFORMANCE METRICS STRIP */}
            {project.metrics && project.metrics.length > 0 && (
              <View style={styles.metricsSection}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionHeaderLabel}>KEY PERFORMANCE METRICS</Text>
                  <View style={styles.sectionHeaderLine} />
                </View>

                <View style={styles.metricsGrid}>
                  {project.metrics.map((metric) => (
                    <View key={metric.label} style={styles.metricCard}>
                      <Text style={[styles.metricValue, { color: PAYWAY.cyan }]}>{metric.value}</Text>
                      <Text style={styles.metricLabel}>{metric.label}</Text>
                      {metric.sub && <Text style={styles.metricSub}>{metric.sub}</Text>}
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* TAB SELECTOR: The Solution / Capabilities / Architecture / Impact */}
            <View style={styles.detailTabsBar}>
              {[
                { key: 'overview', label: '🎯 The Solution', sub: 'Problem vs Fix' },
                { key: 'features', label: '⚡ Capabilities', sub: 'Feature Modules' },
                { key: 'architecture', label: '🏗️ Architecture', sub: 'Stack & Security' },
                { key: 'impact', label: '📈 Proven ROI', sub: 'Business Impact' },
              ].map((tab: any) => {
                const isSelected = activeTab === tab.key;
                return (
                  <Pressable
                    key={tab.key}
                    onPress={() => setActiveTab(tab.key)}
                    style={[styles.detailTabBtn, isSelected && styles.detailTabBtnActive]}
                  >
                    <Text style={[styles.detailTabBtnLabel, isSelected && styles.detailTabBtnLabelActive]}>
                      {tab.label}
                    </Text>
                    <Text style={[styles.detailTabBtnSub, isSelected && styles.detailTabBtnSubActive]}>
                      {tab.sub}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* DYNAMIC TAB CONTENT */}
            {activeTab === 'overview' && (
              <View style={styles.comparativeContainer}>
                {/* The Problem / Challenge */}
                <View style={styles.challengeBox}>
                  <View style={styles.boxTitleRow}>
                    <View style={styles.boxIconDanger}>
                      <Text style={styles.boxIconDangerText}>🛑</Text>
                    </View>
                    <View>
                      <Text style={styles.boxTitleDanger}>The Business Challenge</Text>
                      <Text style={styles.boxSubDanger}>Operational Friction & Bottlenecks</Text>
                    </View>
                  </View>
                  <Text style={styles.boxDesc}>{project.challenge}</Text>
                </View>

                {/* The Engineering Solution */}
                <View style={styles.solutionBox}>
                  <View style={styles.boxTitleRow}>
                    <View style={styles.boxIconSuccess}>
                      <Text style={styles.boxIconSuccessText}>💡</Text>
                    </View>
                    <View>
                      <Text style={styles.boxTitleSuccess}>The Engineering Breakthrough</Text>
                      <Text style={styles.boxSubSuccess}>Engineered by Chhoy Too • PayWay-Grade Standards</Text>
                    </View>
                  </View>
                  <Text style={styles.boxDesc}>{project.solution}</Text>
                </View>
              </View>
            )}

            {activeTab === 'features' && (
              <View style={styles.featuresGrid}>
                {project.features.map((feat) => (
                  <View key={feat.title} style={styles.featureCard}>
                    <View style={styles.featureCardTop}>
                      <View style={styles.featureIconBadge}>
                        <Text style={styles.featureIconText}>{feat.icon}</Text>
                      </View>
                      {feat.badge && (
                        <View style={styles.featurePill}>
                          <Text style={styles.featurePillText}>{feat.badge}</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.featureTitle}>{feat.title}</Text>
                    <Text style={styles.featureDesc}>{feat.desc}</Text>
                  </View>
                ))}
              </View>
            )}

            {activeTab === 'architecture' && (
              <View style={styles.architectureContainer}>
                <View style={styles.archGrid}>
                  {project.architecture.map((arch) => (
                    <View key={arch.category} style={styles.archCard}>
                      <Text style={styles.archCategoryTitle}>{arch.category}</Text>
                      <View style={styles.archItemsList}>
                        {arch.items.map((item) => (
                          <View key={item} style={styles.archItemBadge}>
                            <View style={styles.archDot} />
                            <Text style={styles.archItemText}>{item}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>

                <View style={styles.archTagsBlock}>
                  <Text style={styles.archTagsLabel}>TECHNOLOGIES & PROTOCOLS</Text>
                  <View style={styles.techPillWrap}>
                    {project.tags.map((tag) => (
                      <View key={tag} style={styles.techPill}>
                        <Text style={styles.techPillText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )}

            {activeTab === 'impact' && (
              <View style={styles.impactContainer}>
                <View style={styles.impactCardList}>
                  {project.impact.map((point) => (
                    <View key={point} style={styles.impactCard}>
                      <View style={styles.impactCheckBadge}>
                        <Text style={styles.impactCheckText}>✓</Text>
                      </View>
                      <Text style={styles.impactPointText}>{point}</Text>
                    </View>
                  ))}
                </View>

                {isPrivate && (
                  <View style={styles.complianceNoticeBox}>
                    <Text style={styles.complianceTitle}>🔒 Enterprise Security & Compliance Notice</Text>
                    <Text style={styles.complianceDesc}>
                      {note || 'This codebase is protected by enterprise Non-Disclosure Agreements (NDA) and commercial compliance standards. Demonstrates production-grade experience with confidential corporate databases and mission-critical live hardware.'}
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* PAYWAY ENTERPRISE INTEGRATION BANNER */}
            <View style={styles.ctaBanner}>
              <View style={styles.ctaGlowOrb} pointerEvents="none" />
              <View style={styles.ctaTextCol}>
                <Text style={styles.ctaHeading}>Deploy PayWay-Grade Architecture for Your Business</Text>
                <Text style={styles.ctaSub}>
                  From 20+ station POS hardware telemetry and automated database replication to omnichannel e-commerce microservices, I design and build mission-critical systems that never go down.
                </Text>
              </View>

              <View style={styles.ctaButtonsCol}>
                <Pressable
                  style={({ pressed, hovered }: any) => [
                    styles.btnPaywayPrimary,
                    (pressed || hovered) && styles.btnPaywayPrimaryHover,
                  ]}
                  onPress={() => Linking.openURL(telegramUrl)}
                >
                  <Text style={styles.btnPaywayPrimaryText}>💬 Inquire on Telegram ↗</Text>
                </Pressable>

                <Pressable
                  style={({ pressed, hovered }: any) => [
                    styles.btnPaywayOutline,
                    (pressed || hovered) && styles.btnPaywayOutlineHover,
                  ]}
                  onPress={() => Linking.openURL(emailUrl)}
                >
                  <Text style={styles.btnPaywayOutlineText}>✉️ Email Project Brief ↗</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const getStyles = (colors: any, isDark: boolean) => {
  return StyleSheet.create({
    wrapper: {
      width: '100%',
      maxWidth: 1320,
      alignSelf: 'center',
    },
    showcase: {
      padding: 24,
      borderRadius: 32,
      borderWidth: 1,
      borderColor: 'rgba(0, 188, 212, 0.22)',
      backgroundColor: '#001424',
      overflow: 'hidden',
      ...(Platform.OS === 'web'
        ? ({
            backgroundImage:
              'radial-gradient(circle at 18% 4%, rgba(0, 188, 212, 0.24), transparent 36%), radial-gradient(circle at 88% 12%, rgba(5, 91, 131, 0.28), transparent 32%), linear-gradient(135deg, #00172B 0%, #001220 58%, #000B14 100%)',
            boxShadow: '0 28px 90px rgba(0, 10, 20, 0.65)',
          } as any)
        : {}),
    },
    header: {
      alignItems: 'center',
      gap: 10,
      marginBottom: 24,
    },
    headerIcon: {
      width: 40,
      height: 36,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 188, 212, 0.16)',
      borderWidth: 1,
      borderColor: 'rgba(0, 188, 212, 0.35)',
    },
    headerIconText: {
      color: PAYWAY.cyan,
      fontSize: 16,
      fontWeight: '900',
      fontFamily: FONT_FAMILY.accent,
    },
    title: {
      color: '#FFFFFF',
      fontSize: 32,
      fontWeight: '900',
      letterSpacing: -0.8,
      textAlign: 'center',
      fontFamily: FONT_FAMILY.header,
    },
    titleAccent: {
      color: PAYWAY.cyan,
    },
    subtitle: {
      color: 'rgba(255,255,255,0.72)',
      fontSize: 15,
      lineHeight: 22,
      textAlign: 'center',
      maxWidth: 620,
      fontFamily: FONT_FAMILY.body,
    },
    projectGrid: {
      gap: 16,
    },
    projectGridWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    projectCard: {
      borderRadius: 22,
      borderWidth: 1,
      borderColor: 'rgba(0, 188, 212, 0.20)',
      backgroundColor: '#001A30',
      overflow: 'hidden',
    },
    preview: {
      minHeight: 250,
      padding: 18,
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#001E38',
    },
    previewGrid: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0.15,
      ...(Platform.OS === 'web'
        ? ({
            backgroundImage:
              'linear-gradient(rgba(0,188,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,188,212,0.3) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          } as any)
        : {}),
    },
    previewOrbA: {
      position: 'absolute',
      width: 180,
      height: 180,
      borderRadius: 90,
      top: -30,
      right: -30,
    },
    previewOrbB: {
      position: 'absolute',
      width: 140,
      height: 140,
      borderRadius: 70,
      bottom: -20,
      left: -20,
    },
    previewTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 2,
    },
    projectNumber: {
      color: 'rgba(255,255,255,0.45)',
      fontSize: 13,
      fontWeight: '900',
      letterSpacing: 1.2,
      fontFamily: FONT_FAMILY.accent,
    },
    statusPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingVertical: 5,
      paddingHorizontal: 9,
      borderRadius: RADIUS.full,
      borderWidth: 1,
    },
    statusDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
    },
    statusText: {
      fontSize: 10,
      fontWeight: '900',
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      fontFamily: FONT_FAMILY.accent,
    },
    previewCenter: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      zIndex: 2,
      paddingVertical: 8,
    },
    previewInitials: {
      fontSize: 48,
      lineHeight: 52,
      fontWeight: '900',
      letterSpacing: -1.5,
      fontFamily: FONT_FAMILY.header,
    },
    previewMeta: {
      color: PAYWAY.cyan,
      fontSize: 11,
      fontWeight: '900',
      letterSpacing: 1.4,
      fontFamily: FONT_FAMILY.accent,
    },
    previewHeadline: {
      color: 'rgba(255,255,255,0.85)',
      fontSize: 12,
      lineHeight: 17,
      fontWeight: '700',
      textAlign: 'center',
      marginTop: 2,
      maxWidth: 280,
      fontFamily: FONT_FAMILY.body,
    },
    cardMetricBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: RADIUS.full,
      borderWidth: 1,
      alignSelf: 'center',
      zIndex: 2,
      marginTop: 4,
    },
    cardMetricValue: {
      fontSize: 12,
      fontWeight: '900',
      fontFamily: FONT_FAMILY.accent,
    },
    cardMetricLabel: {
      color: 'rgba(255,255,255,0.72)',
      fontSize: 11,
      fontWeight: '700',
      fontFamily: FONT_FAMILY.body,
    },
    previewTags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 7,
      zIndex: 2,
      marginTop: 8,
    },
    previewTag: {
      paddingVertical: 5,
      paddingHorizontal: 8,
      borderRadius: RADIUS.full,
      backgroundColor: 'rgba(0, 188, 212, 0.10)',
      borderWidth: 1,
      borderColor: 'rgba(0, 188, 212, 0.24)',
    },
    previewTagText: {
      color: PAYWAY.textLight,
      fontSize: 10,
      fontWeight: '800',
      fontFamily: FONT_FAMILY.accent,
    },
    projectStrip: {
      minHeight: 52,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
    },
    projectTitle: {
      color: '#001424',
      fontSize: 14,
      fontWeight: '900',
      letterSpacing: -0.3,
      flex: 1,
      fontFamily: FONT_FAMILY.header,
    },
    exploreBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    exploreText: {
      color: '#001424',
      fontSize: 11,
      fontWeight: '900',
      letterSpacing: 0.5,
      fontFamily: FONT_FAMILY.accent,
    },
    projectArrow: {
      color: '#001424',
      fontSize: 16,
      fontWeight: '900',
      fontFamily: FONT_FAMILY.accent,
    },
    viewAllBtn: {
      alignSelf: 'center',
      marginTop: 24,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: PAYWAY.cyan,
      backgroundColor: 'rgba(0, 188, 212, 0.08)',
      ...(Platform.OS === 'web' ? ({ transition: 'all 180ms ease' } as any) : {}),
    },
    viewAllBtnHover: {
      backgroundColor: 'rgba(0, 188, 212, 0.20)',
      transform: [{ translateY: -2 }],
    },
    viewAllText: {
      color: PAYWAY.cyan,
      fontSize: 14,
      fontWeight: '900',
      fontFamily: FONT_FAMILY.accent,
    },
  });
};

const getModalStyles = (colors: any, isDark: boolean) => StyleSheet.create({
  modalRoot: {
    flex: 1,
    backgroundColor: 'rgba(0, 12, 22, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalShell: {
    width: '100%',
    maxWidth: 1120,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#00162B',
    borderWidth: 1,
    borderColor: PAYWAY.navyBorder,
    position: 'relative',
    ...(Platform.OS === 'web'
      ? ({
          boxShadow: '0 32px 100px -10px rgba(0, 0, 0, 0.85), 0 0 40px rgba(0, 188, 212, 0.22)',
        } as any)
      : {}),
  },
  modalShellWide: {
    width: '94%',
  },
  modalAmbientOrbA: {
    position: 'absolute',
    top: -120,
    right: -120,
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: 'rgba(0, 188, 212, 0.16)',
    filter: 'blur(80px)',
  } as any,
  modalAmbientOrbB: {
    position: 'absolute',
    bottom: -100,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(5, 91, 131, 0.24)',
    filter: 'blur(70px)',
  } as any,
  paywayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingVertical: 14,
    backgroundColor: '#001A33',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 188, 212, 0.22)',
    flexWrap: 'wrap',
    gap: 12,
    zIndex: 10,
  },
  paywayBrandCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  paywayLogoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 188, 212, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.40)',
  },
  paywayLogoDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: PAYWAY.cyan,
  },
  paywayLogoText: {
    color: PAYWAY.cyan,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.1,
    fontFamily: FONT_FAMILY.accent,
  },
  paywayProjectCounter: {
    color: 'rgba(255, 255, 255, 0.55)',
    fontSize: 11,
    fontWeight: '800',
    fontFamily: FONT_FAMILY.accent,
  },
  modeSwitchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#001020',
    borderRadius: RADIUS.full,
    padding: 3,
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.30)',
  },
  modeSwitchBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: RADIUS.full,
    ...(Platform.OS === 'web' ? ({ transition: 'all 160ms ease', cursor: 'pointer' } as any) : {}),
  },
  modeSwitchBtnActive: {
    backgroundColor: PAYWAY.cyan,
  },
  modeSwitchText: {
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: 11,
    fontWeight: '800',
    fontFamily: FONT_FAMILY.accent,
  },
  modeSwitchTextActive: {
    color: '#001424',
    fontWeight: '900',
  },
  headerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerNavBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    ...(Platform.OS === 'web' ? ({ transition: 'all 160ms ease', cursor: 'pointer' } as any) : {}),
  },
  headerNavBtnHover: {
    backgroundColor: 'rgba(0, 188, 212, 0.20)',
    borderColor: PAYWAY.cyan,
  },
  headerNavBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    fontFamily: FONT_FAMILY.accent,
  },
  headerCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    ...(Platform.OS === 'web' ? ({ transition: 'all 160ms ease', cursor: 'pointer' } as any) : {}),
  },
  headerCloseBtnHover: {
    backgroundColor: 'rgba(239, 68, 68, 0.25)',
    borderColor: '#EF4444',
  },
  headerCloseBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },
  scrollContent: {
    padding: 24,
    gap: 24,
  },
  heroSection: {
    width: '100%',
    gap: 12,
  },
  heroMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  heroStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 230, 118, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0, 230, 118, 0.35)',
  },
  heroStatusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: PAYWAY.emerald,
  },
  heroStatusLabel: {
    color: PAYWAY.emerald,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
    fontFamily: FONT_FAMILY.accent,
  },
  heroMetricPill: {
    paddingVertical: 5,
    paddingHorizontal: 11,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 188, 212, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.35)',
  },
  heroMetricPillText: {
    color: PAYWAY.cyan,
    fontSize: 11,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.accent,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '900',
    letterSpacing: -1,
    fontFamily: FONT_FAMILY.header,
  },
  heroHeadline: {
    color: PAYWAY.cyan,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '800',
    fontFamily: FONT_FAMILY.header,
  },
  heroDescription: {
    color: 'rgba(255, 255, 255, 0.78)',
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.body,
  },
  heroActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
  },
  btnPaywayPrimary: {
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: RADIUS.full,
    backgroundColor: PAYWAY.cyan,
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web'
      ? ({
          boxShadow: '0 4px 18px rgba(0, 188, 212, 0.40)',
          transition: 'all 180ms ease',
          cursor: 'pointer',
        } as any)
      : {}),
  },
  btnPaywayPrimaryHover: {
    backgroundColor: PAYWAY.cyanLight,
    transform: [{ translateY: -2 }],
  },
  btnPaywayPrimaryText: {
    color: '#001424',
    fontSize: 13,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.accent,
  },
  btnPaywayOutline: {
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web' ? ({ transition: 'all 180ms ease', cursor: 'pointer' } as any) : {}),
  },
  btnPaywayOutlineHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderColor: 'rgba(255, 255, 255, 0.35)',
    transform: [{ translateY: -1 }],
  },
  btnPaywayOutlineText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    fontFamily: FONT_FAMILY.accent,
  },
  btnPaywayCyanOutline: {
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 188, 212, 0.10)',
    borderWidth: 1,
    borderColor: PAYWAY.cyan,
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web' ? ({ transition: 'all 180ms ease', cursor: 'pointer' } as any) : {}),
  },
  btnPaywayCyanOutlineHover: {
    backgroundColor: 'rgba(0, 188, 212, 0.22)',
    transform: [{ translateY: -1 }],
  },
  btnPaywayCyanOutlineText: {
    color: PAYWAY.cyan,
    fontSize: 13,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.accent,
  },
  isometricStageBox: {
    borderRadius: 22,
    backgroundColor: '#00172B',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.35)',
    padding: 22,
    gap: 18,
    overflow: 'hidden',
    position: 'relative',
    ...(Platform.OS === 'web'
      ? ({
          boxShadow: '0 20px 60px rgba(0, 188, 212, 0.15)',
        } as any)
      : {}),
  },
  isometricStageHeader: {
    gap: 6,
  },
  isometricTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  isometricTag: {
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 188, 212, 0.16)',
    borderWidth: 1,
    borderColor: PAYWAY.cyan,
  },
  isometricTagText: {
    color: PAYWAY.cyan,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.1,
    fontFamily: FONT_FAMILY.accent,
  },
  livePulseTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 230, 118, 0.12)',
    borderWidth: 1,
    borderColor: PAYWAY.emerald,
  },
  livePulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: PAYWAY.emerald,
  },
  livePulseText: {
    color: PAYWAY.emerald,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
    fontFamily: FONT_FAMILY.accent,
  },
  isometricTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.4,
    fontFamily: FONT_FAMILY.header,
  },
  isometricSubtitle: {
    color: 'rgba(255, 255, 255, 0.70)',
    fontSize: 13,
    lineHeight: 19,
    fontFamily: FONT_FAMILY.body,
  },
  isometricStageCanvas: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001020',
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.20)',
    position: 'relative',
    overflow: 'hidden',
    gap: 16,
  },
  isometricGlowAura: {
    position: 'absolute',
    width: 320,
    height: 220,
    borderRadius: 160,
    backgroundColor: 'rgba(0, 188, 212, 0.22)',
    ...(Platform.OS === 'web'
      ? ({
          animation: 'ct-glow-pulse 4.5s ease-in-out infinite',
        } as any)
      : {}),
  },
  isometricGraphicFloatWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    zIndex: 2,
    ...(Platform.OS === 'web'
      ? ({
          animation: 'ct-float-slow 6s ease-in-out infinite',
        } as any)
      : {}),
  },
  isometricGraphicImg: {
    width: '100%',
    maxWidth: 520,
    height: 250,
  },
  isometricCanvasFrame: {
    width: '100%',
    maxWidth: 580,
    height: 270,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  beaconPin: {
    position: 'absolute',
    transform: [{ translateX: -12 }, { translateY: -12 }],
    zIndex: 10,
    alignItems: 'center',
    ...(Platform.OS === 'web' ? ({ cursor: 'pointer' } as any) : {}),
  },
  beaconPinSelected: {
    zIndex: 20,
    transform: [{ translateX: -12 }, { translateY: -15 }, { scale: 1.1 }],
  },
  beaconRing: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#00BCD4',
    ...(Platform.OS === 'web'
      ? ({
          animation: 'ct-beacon-ring 2.2s cubic-bezier(0, 0.2, 0.8, 1) infinite',
        } as any)
      : {}),
  },
  beaconCoreDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00BCD4',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    ...(Platform.OS === 'web'
      ? ({
          boxShadow: '0 0 10px #00BCD4',
        } as any)
      : {}),
  },
  beaconCoreDotActive: {
    backgroundColor: PAYWAY.emerald,
    borderColor: '#FFFFFF',
  },
  beaconPill: {
    marginTop: 4,
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 20, 36, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.45)',
    ...(Platform.OS === 'web'
      ? ({
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.6)',
        } as any)
      : {}),
  },
  beaconPillActive: {
    backgroundColor: 'rgba(0, 188, 212, 0.30)',
    borderColor: PAYWAY.cyan,
  },
  beaconPillText: {
    color: '#E0F7FA',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
    fontFamily: FONT_FAMILY.accent,
  },
  beaconPillTextActive: {
    color: '#FFFFFF',
  },
  simControlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 4,
    zIndex: 5,
  },
  trafficToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 188, 212, 0.12)',
    borderWidth: 1,
    borderColor: PAYWAY.cyan,
    ...(Platform.OS === 'web'
      ? ({
          transition: 'all 160ms ease',
          cursor: 'pointer',
        } as any)
      : {}),
  },
  trafficToggleBtnActive: {
    backgroundColor: 'rgba(0, 230, 118, 0.20)',
    borderColor: PAYWAY.emerald,
  },
  trafficToggleIcon: {
    fontSize: 12,
  },
  trafficToggleText: {
    color: PAYWAY.cyan,
    fontSize: 11,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.accent,
  },
  trafficToggleTextActive: {
    color: PAYWAY.emerald,
  },
  trafficHint: {
    color: 'rgba(255, 255, 255, 0.55)',
    fontSize: 11,
    fontFamily: FONT_FAMILY.body,
  },
  hotspotsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    zIndex: 3,
    width: '100%',
  },
  hotspotBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 18, 36, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.25)',
    ...(Platform.OS === 'web'
      ? ({
          transition: 'all 160ms ease',
          cursor: 'pointer',
        } as any)
      : {}),
  },
  hotspotBtnActive: {
    backgroundColor: 'rgba(0, 188, 212, 0.22)',
    borderColor: PAYWAY.cyan,
    transform: [{ translateY: -2 }],
    ...(Platform.OS === 'web'
      ? ({
          boxShadow: '0 4px 14px rgba(0, 188, 212, 0.40)',
        } as any)
      : {}),
  },
  hotspotIcon: {
    fontSize: 14,
  },
  hotspotLabel: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 11,
    fontWeight: '800',
    fontFamily: FONT_FAMILY.accent,
  },
  hotspotLabelActive: {
    color: PAYWAY.cyan,
    fontWeight: '900',
  },
  activeNodeCard: {
    width: '100%',
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#00162B',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.28)',
    gap: 6,
    zIndex: 3,
  },
  activeNodeHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  activeNodeTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.header,
  },
  protocolPill: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 188, 212, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.35)',
  },
  protocolText: {
    color: PAYWAY.cyan,
    fontSize: 10,
    fontWeight: '800',
    fontFamily: Platform.OS === 'web' ? 'monospace' : FONT_FAMILY.accent,
  },
  activeNodeDesc: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 12,
    lineHeight: 18,
    fontFamily: FONT_FAMILY.body,
  },
  developerSuiteBox: {
    borderRadius: 20,
    backgroundColor: '#001020',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.35)',
    padding: 20,
    gap: 16,
    ...(Platform.OS === 'web' ? ({ boxShadow: '0 12px 40px rgba(0, 188, 212, 0.15)' } as any) : {}),
  },
  suiteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },
  suiteTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.header,
  },
  suiteSub: {
    color: PAYWAY.textMuted,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.body,
  },
  suiteLiveTag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 230, 118, 0.15)',
    borderWidth: 1,
    borderColor: PAYWAY.emerald,
  },
  suiteLiveTagText: {
    color: PAYWAY.emerald,
    fontSize: 11,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.accent,
  },
  langTabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.10)',
  },
  langTabBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'transparent',
    ...(Platform.OS === 'web' ? ({ transition: 'all 150ms ease', cursor: 'pointer' } as any) : {}),
  },
  langTabBtnActive: {
    backgroundColor: 'rgba(0, 188, 212, 0.18)',
    borderColor: PAYWAY.cyan,
  },
  langTabBtnText: {
    color: 'rgba(255, 255, 255, 0.60)',
    fontSize: 12,
    fontWeight: '800',
    fontFamily: FONT_FAMILY.accent,
  },
  langTabBtnTextActive: {
    color: PAYWAY.cyan,
    fontWeight: '900',
  },
  copyBtn: {
    marginLeft: 'auto',
    paddingVertical: 5,
    paddingHorizontal: 11,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 188, 212, 0.15)',
    borderWidth: 1,
    borderColor: PAYWAY.cyan,
    ...(Platform.OS === 'web' ? ({ cursor: 'pointer' } as any) : {}),
  },
  copyBtnText: {
    color: PAYWAY.cyan,
    fontSize: 11,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.accent,
  },
  codeTerminal: {
    backgroundColor: '#000A14',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.20)',
    maxHeight: 280,
  },
  codeContent: {
    color: '#B2EBF2',
    fontFamily: Platform.OS === 'web' ? 'Consolas, Monaco, "Courier New", monospace' : FONT_FAMILY.accent,
    fontSize: 12.5,
    lineHeight: 20,
  },
  paramTable: {
    gap: 8,
    marginTop: 6,
  },
  paramTableTitle: {
    color: PAYWAY.cyan,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.1,
    fontFamily: FONT_FAMILY.accent,
  },
  paramRowHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.12)',
  },
  paramRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  paramCell: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 12,
    fontFamily: FONT_FAMILY.body,
  },
  paramCode: {
    color: PAYWAY.cyan,
    fontFamily: Platform.OS === 'web' ? 'monospace' : FONT_FAMILY.accent,
    fontWeight: '800',
  },
  paramReq: {
    color: PAYWAY.emerald,
    fontWeight: '900',
  },
  paramOpt: {
    color: PAYWAY.amber,
    fontWeight: '800',
  },
  simulatorWrapper: {
    borderRadius: 22,
    backgroundColor: '#001B33',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.32)',
    padding: 20,
    gap: 16,
    ...(Platform.OS === 'web' ? ({ boxShadow: '0 16px 50px rgba(0, 188, 212, 0.12)' } as any) : {}),
  },
  simulatorHeader: {
    gap: 6,
  },
  simBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 188, 212, 0.15)',
    borderWidth: 1,
    borderColor: PAYWAY.cyan,
  },
  simBadgeText: {
    color: PAYWAY.cyan,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.1,
    fontFamily: FONT_FAMILY.accent,
  },
  simTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.4,
    fontFamily: FONT_FAMILY.header,
  },
  simSubtitle: {
    color: 'rgba(255, 255, 255, 0.70)',
    fontSize: 13,
    lineHeight: 19,
    fontFamily: FONT_FAMILY.body,
  },
  fleetSimulatorBox: {
    gap: 12,
  },
  fleetTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#001020',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.20)',
    flexWrap: 'wrap',
    gap: 6,
  },
  fleetBarTitle: {
    color: PAYWAY.cyan,
    fontSize: 12,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.accent,
  },
  fleetBarSub: {
    color: PAYWAY.emerald,
    fontSize: 11,
    fontWeight: '800',
    fontFamily: FONT_FAMILY.accent,
  },
  fleetSelectorHint: {
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.body,
  },
  stationChipsList: {
    gap: 8,
    paddingVertical: 4,
  },
  stationChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    gap: 2,
    minWidth: 70,
    ...(Platform.OS === 'web' ? ({ transition: 'all 150ms ease', cursor: 'pointer' } as any) : {}),
  },
  stationChipActive: {
    backgroundColor: 'rgba(0, 188, 212, 0.20)',
    borderColor: PAYWAY.cyan,
    transform: [{ translateY: -2 }],
  },
  stationChipId: {
    color: 'rgba(255, 255, 255, 0.60)',
    fontSize: 11,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.accent,
  },
  stationChipIdActive: {
    color: PAYWAY.cyan,
  },
  stationChipName: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.body,
  },
  stationChipNameActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  telemetryCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#001224',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.25)',
    gap: 14,
  },
  telemetryCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },
  telemetryStationTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.header,
  },
  telemetryStationMeta: {
    color: PAYWAY.textMuted,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.body,
  },
  telemetryLiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 230, 118, 0.15)',
    borderWidth: 1,
    borderColor: PAYWAY.emerald,
  },
  telemetryLiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: PAYWAY.emerald,
  },
  telemetryLiveText: {
    color: PAYWAY.emerald,
    fontSize: 11,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.accent,
  },
  telemetryMetricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  telemetryMetricItem: {
    flex: 1,
    minWidth: 120,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#001A33',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 4,
  },
  telemetryMetricVal: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.5,
    fontFamily: FONT_FAMILY.header,
  },
  telemetryMetricLbl: {
    color: 'rgba(255, 255, 255, 0.60)',
    fontSize: 11,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.body,
  },
  telemetryFooter: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  telemetryFooterText: {
    color: 'rgba(255, 255, 255, 0.55)',
    fontSize: 11,
    lineHeight: 16,
    fontFamily: FONT_FAMILY.body,
  },
  checkoutSimulatorBox: {
    borderRadius: 18,
    backgroundColor: '#001224',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.25)',
    overflow: 'hidden',
  },
  checkoutOrderSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#001A33',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 188, 212, 0.18)',
    flexWrap: 'wrap',
    gap: 10,
  },
  checkoutSummaryCol: {
    gap: 3,
  },
  checkoutBrandTag: {
    color: PAYWAY.cyan,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    fontFamily: FONT_FAMILY.accent,
  },
  checkoutOrderTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.header,
  },
  checkoutOrderItems: {
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: 12,
    fontFamily: FONT_FAMILY.body,
  },
  checkoutPriceCol: {
    alignItems: 'flex-end',
  },
  checkoutPriceTotal: {
    color: PAYWAY.cyan,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
    fontFamily: FONT_FAMILY.header,
  },
  checkoutPriceSub: {
    color: 'rgba(255, 255, 255, 0.55)',
    fontSize: 11,
    fontFamily: FONT_FAMILY.accent,
  },
  checkoutCardBody: {
    padding: 20,
    alignItems: 'center',
    gap: 16,
  },
  khqrFrame: {
    alignItems: 'center',
    gap: 8,
  },
  khqrInnerBox: {
    width: 170,
    height: 170,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 3,
    borderColor: '#E11D48',
    position: 'relative',
    overflow: 'hidden',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0 8px 30px rgba(0,0,0,0.4)' } as any) : {}),
  },
  khqrLaserLine: {
    position: 'absolute',
    left: 8,
    right: 8,
    height: 3,
    backgroundColor: '#00BCD4',
    borderRadius: 2,
    zIndex: 10,
    ...(Platform.OS === 'web'
      ? ({
          boxShadow: '0 0 10px #00BCD4, 0 0 20px #00BCD4',
          animation: 'ct-laser-scan 2.2s ease-in-out infinite',
        } as any)
      : {}),
  },
  khqrMockQr: {
    color: '#000000',
    fontSize: 11,
    fontWeight: '900',
    textAlign: 'center',
    fontFamily: Platform.OS === 'web' ? 'monospace' : FONT_FAMILY.accent,
  },
  khqrPaywayLogoRow: {
    position: 'absolute',
    bottom: 8,
    backgroundColor: '#002744',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  khqrPaywayLogo: {
    color: PAYWAY.cyan,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
    fontFamily: FONT_FAMILY.accent,
  },
  khqrScanText: {
    color: 'rgba(255, 255, 255, 0.70)',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.body,
  },
  checkoutCtaWrap: {
    width: '100%',
    maxWidth: 380,
    gap: 6,
    alignItems: 'center',
  },
  checkoutSimNote: {
    color: 'rgba(255, 255, 255, 0.45)',
    fontSize: 11,
    textAlign: 'center',
    fontFamily: FONT_FAMILY.body,
  },
  checkoutProcessingBox: {
    padding: 36,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  processingSpinner: {
    fontSize: 32,
  },
  processingTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.header,
  },
  processingSub: {
    color: PAYWAY.cyan,
    fontSize: 12,
    fontFamily: FONT_FAMILY.body,
  },
  checkoutApprovedBox: {
    padding: 24,
    alignItems: 'center',
    gap: 10,
  },
  approvedIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 230, 118, 0.20)',
    borderWidth: 1,
    borderColor: PAYWAY.emerald,
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web'
      ? ({
          animation: 'ct-badge-pulse 1.8s ease-in-out infinite',
        } as any)
      : {}),
  },
  approvedIcon: {
    color: PAYWAY.emerald,
    fontSize: 24,
    fontWeight: '900',
  },
  approvedTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.header,
  },
  approvedSub: {
    color: PAYWAY.emerald,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.accent,
  },
  approvedLogBox: {
    width: '100%',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#000A14',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.20)',
    gap: 4,
    marginTop: 6,
  },
  approvedLogLine: {
    color: '#80DEEA',
    fontSize: 11,
    fontFamily: Platform.OS === 'web' ? 'monospace' : FONT_FAMILY.accent,
  },
  resetSimBtn: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.20)',
    ...(Platform.OS === 'web' ? ({ cursor: 'pointer' } as any) : {}),
  },
  resetSimBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    fontFamily: FONT_FAMILY.accent,
  },
  telegramSimulatorBox: {
    borderRadius: 16,
    backgroundColor: '#001224',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.25)',
    overflow: 'hidden',
  },
  tgHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    backgroundColor: '#001A33',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 188, 212, 0.20)',
  },
  tgAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 188, 212, 0.20)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tgAvatarText: {
    fontSize: 18,
  },
  tgBotName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.header,
  },
  tgBotStatus: {
    color: PAYWAY.cyan,
    fontSize: 11,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.body,
  },
  tgChatArea: {
    height: 190,
  },
  tgBubble: {
    maxWidth: '85%',
    padding: 10,
    borderRadius: 12,
    gap: 4,
  },
  tgBubbleBot: {
    alignSelf: 'flex-start',
    backgroundColor: '#002244',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.20)',
  },
  tgBubbleUser: {
    alignSelf: 'flex-end',
    backgroundColor: PAYWAY.cyan,
  },
  tgMsgText: {
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 18,
    fontFamily: FONT_FAMILY.body,
  },
  tgMsgTime: {
    color: 'rgba(255, 255, 255, 0.45)',
    fontSize: 9,
    alignSelf: 'flex-end',
    fontFamily: FONT_FAMILY.accent,
  },
  tgCommandsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 10,
    backgroundColor: '#001A33',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 188, 212, 0.15)',
  },
  tgCmdChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 188, 212, 0.12)',
    borderWidth: 1,
    borderColor: PAYWAY.cyan,
    ...(Platform.OS === 'web' ? ({ cursor: 'pointer' } as any) : {}),
  },
  tgCmdChipText: {
    color: PAYWAY.cyan,
    fontSize: 11,
    fontWeight: '800',
    fontFamily: FONT_FAMILY.accent,
  },
  consoleSimulatorBox: {
    borderRadius: 14,
    backgroundColor: '#000D1A',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.22)',
    overflow: 'hidden',
  },
  consoleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#00162B',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 188, 212, 0.15)',
  },
  consoleHeaderTitle: {
    color: PAYWAY.cyan,
    fontSize: 11,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.accent,
  },
  consoleHeaderStatus: {
    color: PAYWAY.emerald,
    fontSize: 11,
    fontWeight: '800',
    fontFamily: FONT_FAMILY.accent,
  },
  consoleBody: {
    padding: 14,
    gap: 6,
  },
  consoleCodeLine: {
    color: '#80DEEA',
    fontSize: 12,
    lineHeight: 18,
    fontFamily: Platform.OS === 'web' ? 'Consolas, monospace' : FONT_FAMILY.accent,
  },
  metricsSection: {
    gap: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionHeaderLabel: {
    color: PAYWAY.cyan,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
    fontFamily: FONT_FAMILY.accent,
  },
  sectionHeaderLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0, 188, 212, 0.25)',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: 160,
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#001A33',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.22)',
    gap: 4,
  },
  metricValue: {
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '900',
    letterSpacing: -1,
    fontFamily: FONT_FAMILY.header,
  },
  metricLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    fontFamily: FONT_FAMILY.header,
  },
  metricSub: {
    color: 'rgba(255, 255, 255, 0.60)',
    fontSize: 11,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.body,
  },
  detailTabsBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 6,
    borderRadius: 18,
    backgroundColor: '#001224',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.25)',
  },
  detailTabBtn: {
    flex: 1,
    minWidth: 130,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    borderWidth: 1,
    borderColor: 'transparent',
    ...(Platform.OS === 'web' ? ({ transition: 'all 160ms ease', cursor: 'pointer' } as any) : {}),
  },
  detailTabBtnActive: {
    backgroundColor: 'rgba(0, 188, 212, 0.16)',
    borderColor: PAYWAY.cyan,
  },
  detailTabBtnLabel: {
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: 13,
    fontWeight: '800',
    fontFamily: FONT_FAMILY.header,
  },
  detailTabBtnLabelActive: {
    color: PAYWAY.cyan,
    fontWeight: '900',
  },
  detailTabBtnSub: {
    color: 'rgba(255, 255, 255, 0.40)',
    fontSize: 10,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.body,
  },
  detailTabBtnSubActive: {
    color: '#FFFFFF',
  },
  comparativeContainer: {
    gap: 14,
  },
  challengeBox: {
    padding: 20,
    borderRadius: 18,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.25)',
    gap: 10,
  },
  solutionBox: {
    padding: 20,
    borderRadius: 18,
    backgroundColor: '#001C38',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.40)',
    gap: 10,
  },
  boxTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  boxIconDanger: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.16)',
  },
  boxIconDangerText: {
    fontSize: 18,
  },
  boxTitleDanger: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.header,
  },
  boxSubDanger: {
    color: 'rgba(255, 255, 255, 0.50)',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.accent,
  },
  boxIconSuccess: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 188, 212, 0.18)',
  },
  boxIconSuccessText: {
    fontSize: 18,
  },
  boxTitleSuccess: {
    color: PAYWAY.cyan,
    fontSize: 16,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.header,
  },
  boxSubSuccess: {
    color: 'rgba(255, 255, 255, 0.55)',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.accent,
  },
  boxDesc: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 14,
    lineHeight: 23,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.body,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  featureCard: {
    flex: 1,
    minWidth: 260,
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#001A33',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.20)',
    gap: 8,
  },
  featureCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  featureIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 188, 212, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.30)',
  },
  featureIconText: {
    fontSize: 20,
  },
  featurePill: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 188, 212, 0.12)',
    borderWidth: 1,
    borderColor: PAYWAY.cyan,
  },
  featurePillText: {
    color: PAYWAY.cyan,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
    fontFamily: FONT_FAMILY.accent,
  },
  featureTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.header,
  },
  featureDesc: {
    color: 'rgba(255, 255, 255, 0.70)',
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.body,
  },
  architectureContainer: {
    gap: 16,
  },
  archGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  archCard: {
    flex: 1,
    minWidth: 220,
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#001A33',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.20)',
    gap: 10,
  },
  archCategoryTitle: {
    color: PAYWAY.cyan,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: -0.2,
    fontFamily: FONT_FAMILY.header,
  },
  archItemsList: {
    gap: 7,
  },
  archItemBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  archDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: PAYWAY.cyan,
  },
  archItemText: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.body,
  },
  archTagsBlock: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#001A33',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.20)',
    gap: 10,
  },
  archTagsLabel: {
    color: PAYWAY.cyan,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.1,
    fontFamily: FONT_FAMILY.accent,
  },
  techPillWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techPill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(0, 188, 212, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.28)',
  },
  techPillText: {
    color: PAYWAY.textLight,
    fontSize: 12,
    fontWeight: '800',
    fontFamily: FONT_FAMILY.accent,
  },
  impactContainer: {
    gap: 14,
  },
  impactCardList: {
    gap: 10,
  },
  impactCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#001A33',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.20)',
  },
  impactCheckBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 230, 118, 0.18)',
    marginTop: 2,
  },
  impactCheckText: {
    color: PAYWAY.emerald,
    fontSize: 14,
    fontWeight: '900',
  },
  impactPointText: {
    color: 'rgba(255, 255, 255, 0.88)',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    flex: 1,
    fontFamily: FONT_FAMILY.body,
  },
  complianceNoticeBox: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    gap: 6,
  },
  complianceTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.header,
  },
  complianceDesc: {
    color: 'rgba(255, 255, 255, 0.60)',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    fontFamily: FONT_FAMILY.body,
  },
  ctaBanner: {
    padding: 24,
    borderRadius: 22,
    backgroundColor: '#001830',
    borderWidth: 1,
    borderColor: PAYWAY.cyan,
    position: 'relative',
    overflow: 'hidden',
    gap: 16,
    ...(Platform.OS === 'web' ? ({ boxShadow: '0 16px 60px rgba(0, 188, 212, 0.20)' } as any) : {}),
  },
  ctaGlowOrb: {
    position: 'absolute',
    bottom: -60,
    right: -60,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(0, 188, 212, 0.18)',
  },
  ctaTextCol: {
    gap: 8,
    zIndex: 2,
  },
  ctaHeading: {
    color: '#FFFFFF',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
    fontFamily: FONT_FAMILY.header,
  },
  ctaSub: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
    maxWidth: 720,
    fontFamily: FONT_FAMILY.body,
  },
  ctaButtonsCol: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    zIndex: 2,
  },
});
