import React, { useState } from 'react';
import { Linking, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { RADIUS, FONT_FAMILY } from '../constants/theme';
import { PROFILE, PROJECTS } from '../constants/data';
import AnimatedSection from './AnimatedSection';
import { sectionPadH, sectionPadV } from '../utils/responsive';

type Project = typeof PROJECTS[number];

const STATUS_COLOR: Record<string, string> = {
  Production: '#34D399',
  Live: '#22D3EE',
  'Internal Tool': '#FBBF24',
  'In Progress': '#A78BFA',
};

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
            <Text style={styles.subtitle}>Selected real work from support, reporting, automation, database, and internal web systems.</Text>
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
  const accent = project.status === 'Internal Tool' ? '#FBBF24' : project.status === 'Live' ? '#22D3EE' : '#34D399';
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
          borderColor: hovered ? `${accent}88` : 'rgba(255,255,255,0.10)',
          boxShadow: hovered ? `0 26px 70px ${accent}26` : '0 14px 34px rgba(0,0,0,0.24)',
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
          <View style={[styles.statusPill, { borderColor: `${accent}44`, backgroundColor: `${accent}14` }]}>
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
          <View style={[styles.cardMetricBadge, { borderColor: `${accent}33`, backgroundColor: `${accent}10` }]}>
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

      <View style={[styles.projectStrip, { backgroundColor: accent }]}>
        <Text style={styles.projectTitle} numberOfLines={1}>{project.title}</Text>
        <View style={styles.exploreBadge}>
          <Text style={styles.exploreText}>Case Study</Text>
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
  const [activeTab, setActiveTab] = useState<'pitch' | 'features' | 'architecture' | 'impact'>('pitch');
  const styles = getModalStyles(colors, isDark);

  React.useEffect(() => {
    setActiveTab('pitch');
  }, [projectIndex]);

  React.useEffect(() => {
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

  const accent = STATUS_COLOR[project.status] ?? colors.accent;
  const isPrivate = Boolean((project as any).private);
  const note = (project as any).note as string | undefined;
  const isWide = width >= 860;
  const maxHeight = Math.min(height * 0.92, 840);

  const telegramUrl = 'https://t.me/chhoy_too';
  const emailUrl = `mailto:chhoytoo@outlook.com?subject=${encodeURIComponent(`Project Inquiry: ${project.title}`)}`;

  const tabs = [
    { key: 'pitch', label: '🎯 The Solution', sub: 'Problem vs Fix' },
    { key: 'features', label: '⚡ Capabilities', sub: 'Feature Modules' },
    { key: 'architecture', label: '🏗️ Architecture', sub: 'Stack & Security' },
    { key: 'impact', label: '📈 Proven ROI', sub: 'Business Impact' },
  ] as const;

  const partAnim = (delayMs: number) =>
    Platform.OS === 'web'
      ? ({
          animation: `ct-part-reveal 420ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms both`,
        } as any)
      : {};

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
          {/* Ambient luminous orb in modal corner */}
          <View style={[styles.modalAmbientOrb, { backgroundColor: `${accent}18` }]} pointerEvents="none" />

          {/* Top Control Bar */}
          <View style={styles.modalTopBar}>
            <View style={styles.modalMetaGroup}>
              <View style={styles.caseStudyBadge}>
                <Text style={styles.caseStudyText}>
                  CASE STUDY {String(projectIndex + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
                </Text>
              </View>
              <View style={[styles.modalStatusPill, { borderColor: `${accent}55`, backgroundColor: `${accent}16` }]}>
                <View style={[styles.modalStatusDot, { backgroundColor: accent }]} />
                <Text style={[styles.modalStatusText, { color: accent }]}>{project.status} • {project.year}</Text>
              </View>
              {project.metrics && project.metrics[0] ? (
                <View style={[styles.specialHighlightPill, { borderColor: `${accent}40`, backgroundColor: `${accent}12` }]}>
                  <Text style={[styles.specialHighlightText, { color: accent }]}>
                    ⚡ {project.metrics[0].value} {project.metrics[0].label}
                  </Text>
                </View>
              ) : null}
            </View>

            <View style={styles.modalControlsGroup}>
              <Pressable
                onPress={onPrev}
                style={({ pressed, hovered }: any) => [
                  styles.navBtn,
                  (pressed || hovered) && styles.navBtnHover,
                ]}
                accessibilityLabel="Previous Project"
              >
                <Text style={styles.navBtnText}>{'< Prev'}</Text>
              </Pressable>

              <Pressable
                onPress={onNext}
                style={({ pressed, hovered }: any) => [
                  styles.navBtn,
                  (pressed || hovered) && styles.navBtnHover,
                ]}
                accessibilityLabel="Next Project"
              >
                <Text style={styles.navBtnText}>{'Next >'}</Text>
              </Pressable>

              <Pressable
                onPress={onClose}
                style={({ pressed, hovered }: any) => [
                  styles.closeBtn,
                  (pressed || hovered) && styles.closeBtnHover,
                ]}
                accessibilityLabel="Close Modal"
              >
                <Text style={styles.closeBtnText}>✕</Text>
              </Pressable>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalScrollBody}>
            {/* PART 1: Hero Sales Pitch (delay 0ms) */}
            <View style={[styles.partContainer, partAnim(0)]}>
              <Text style={styles.modalProjectTitle}>{project.title}</Text>
              <Text style={[styles.modalHeadline, { color: accent }]}>{project.headline}</Text>
              <Text style={styles.modalDescription}>{project.description}</Text>

              {/* Action Buttons Bar */}
              <View style={styles.heroActionRow}>
                {project.live ? (
                  <Pressable
                    style={({ pressed, hovered }: any) => [
                      styles.actionPrimaryBtn,
                      { backgroundColor: accent },
                      (pressed || hovered) && { opacity: 0.9, transform: [{ translateY: -2 }] },
                    ]}
                    onPress={() => Linking.openURL(project.live)}
                  >
                    <Text style={styles.actionPrimaryText}>🚀 Launch Live System ↗</Text>
                  </Pressable>
                ) : null}

                {!isPrivate && project.github ? (
                  <Pressable
                    style={({ pressed, hovered }: any) => [
                      styles.actionSecondaryBtn,
                      (pressed || hovered) && styles.actionSecondaryBtnHover,
                    ]}
                    onPress={() => Linking.openURL(project.github)}
                  >
                    <Text style={[styles.actionSecondaryText, { color: colors.textPrimary }]}>📦 GitHub Repository ↗</Text>
                  </Pressable>
                ) : null}

                <Pressable
                  style={({ pressed, hovered }: any) => [
                    styles.actionInquireBtn,
                    (pressed || hovered) && styles.actionInquireBtnHover,
                  ]}
                  onPress={() => Linking.openURL(telegramUrl)}
                >
                  <Text style={styles.actionInquireText}>💬 Discuss on Telegram ↗</Text>
                </Pressable>

                <Pressable
                  style={({ pressed, hovered }: any) => [
                    styles.actionEmailBtn,
                    (pressed || hovered) && styles.actionEmailBtnHover,
                  ]}
                  onPress={() => Linking.openURL(emailUrl)}
                >
                  <Text style={styles.actionEmailText}>✉️ Email Inquiry ↗</Text>
                </Pressable>
              </View>
            </View>

            {/* PART 2: Key KPI Metrics Strip (delay 70ms) */}
            {project.metrics && project.metrics.length > 0 && (
              <View style={[styles.partContainer, partAnim(70)]}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionHeaderLabel}>KEY PERFORMANCE METRICS</Text>
                  <View style={styles.sectionHeaderLine} />
                </View>

                <View style={styles.metricsGrid}>
                  {project.metrics.map((metric) => (
                    <View
                      key={metric.label}
                      style={[
                        styles.metricCard,
                        Platform.OS === 'web' &&
                          ({
                            transition: 'all 200ms ease',
                          } as any),
                      ]}
                    >
                      <Text style={[styles.metricValue, { color: accent }]}>{metric.value}</Text>
                      <Text style={styles.metricLabel}>{metric.label}</Text>
                      {metric.sub && <Text style={styles.metricSub}>{metric.sub}</Text>}
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* PART 3: Interactive Tabs Switcher (delay 130ms) */}
            <View style={[styles.partContainer, partAnim(130)]}>
              <View style={styles.tabBar}>
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.key;
                  return (
                    <Pressable
                      key={tab.key}
                      onPress={() => setActiveTab(tab.key)}
                      style={[
                        styles.tabBtn,
                        isActive && [styles.tabBtnActive, { borderColor: accent, backgroundColor: `${accent}18` }],
                      ]}
                    >
                      <Text style={[styles.tabBtnLabel, isActive && { color: accent, fontWeight: '900' }]}>
                        {tab.label}
                      </Text>
                      <Text style={[styles.tabBtnSub, isActive && { color: colors.textPrimary }]}>
                        {tab.sub}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* PART 4: Tab Content Dynamic View (delay 190ms) */}
            <View style={[styles.partContainer, partAnim(190)]}>
              {activeTab === 'pitch' && (
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

                  {/* The Solution */}
                  <View style={[styles.solutionBox, { borderColor: `${accent}66` }]}>
                    <View style={styles.boxTitleRow}>
                      <View style={[styles.boxIconSuccess, { backgroundColor: `${accent}22` }]}>
                        <Text style={styles.boxIconSuccessText}>💡</Text>
                      </View>
                      <View>
                        <Text style={[styles.boxTitleSuccess, { color: accent }]}>The Engineering Breakthrough</Text>
                        <Text style={styles.boxSubSuccess}>Engineered by Chhoy Too</Text>
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
                        <View style={[styles.featureIconBadge, { backgroundColor: `${accent}16`, borderColor: `${accent}33` }]}>
                          <Text style={styles.featureIconText}>{feat.icon}</Text>
                        </View>
                        {feat.badge && (
                          <View style={[styles.featurePill, { borderColor: `${accent}44`, backgroundColor: `${accent}10` }]}>
                            <Text style={[styles.featurePillText, { color: accent }]}>{feat.badge}</Text>
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
                        <Text style={[styles.archCategoryTitle, { color: accent }]}>{arch.category}</Text>
                        <View style={styles.archItemsList}>
                          {arch.items.map((item) => (
                            <View key={item} style={styles.archItemBadge}>
                              <View style={[styles.archDot, { backgroundColor: accent }]} />
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
                        <View style={[styles.impactCheckBadge, { backgroundColor: `${accent}18` }]}>
                          <Text style={[styles.impactCheckText, { color: accent }]}>✓</Text>
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
            </View>

            {/* PART 5: High-Ticket Client Conversion CTA Banner (delay 250ms) */}
            <View style={[styles.partContainer, partAnim(250)]}>
              <View style={[styles.ctaBanner, { borderColor: `${accent}55` }]}>
                <View style={[styles.ctaGlowOrb, { backgroundColor: `${accent}20` }]} pointerEvents="none" />
                <View style={styles.ctaTextCol}>
                  <Text style={styles.ctaHeading}>Need a High-Performance System Engineered for Your Business?</Text>
                  <Text style={styles.ctaSub}>
                    From 20+ station POS telemetry and hardware observability to omnichannel microservices commerce networks, I turn complex business challenges into reliable, automated digital realities.
                  </Text>
                </View>

                <View style={styles.ctaButtonsCol}>
                  <Pressable
                    style={({ pressed, hovered }: any) => [
                      styles.ctaMainBtn,
                      { backgroundColor: accent },
                      (pressed || hovered) && { opacity: 0.9, transform: [{ scale: 1.02 }] },
                    ]}
                    onPress={() => Linking.openURL(telegramUrl)}
                  >
                    <Text style={styles.ctaMainBtnText}>💬 Chat on Telegram</Text>
                  </Pressable>

                  <Pressable
                    style={({ pressed, hovered }: any) => [
                      styles.ctaSubBtn,
                      (pressed || hovered) && styles.ctaSubBtnHover,
                    ]}
                    onPress={() => Linking.openURL(emailUrl)}
                  >
                    <Text style={[styles.ctaSubBtnText, { color: colors.textPrimary }]}>✉️ Email Project Brief</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const getStyles = (colors: any, isDark: boolean) => {
  const sectionShadow = Platform.OS === 'web'
    ? ({ boxShadow: isDark ? '0 26px 90px rgba(0,0,0,0.42)' : '0 26px 90px rgba(15,23,42,0.14)' } as any)
    : {};

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
      borderColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(15,23,42,0.16)',
      backgroundColor: '#030425',
      overflow: 'hidden',
      ...sectionShadow,
      ...(Platform.OS === 'web'
        ? ({
            backgroundImage: 'radial-gradient(circle at 16% 4%, rgba(37,99,235,0.34), transparent 34%), radial-gradient(circle at 88% 12%, rgba(251,191,36,0.16), transparent 26%), linear-gradient(135deg, #060735 0%, #02031F 58%, #01020F 100%)',
          } as any)
        : {}),
    },
    header: {
      alignItems: 'center',
      gap: 10,
      marginBottom: 24,
    },
    headerIcon: {
      width: 38,
      height: 34,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255,255,255,0.08)',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.14)',
    },
    headerIconText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '900',
      fontFamily: FONT_FAMILY.accent,
    },
    title: {
      color: '#FFFFFF',
      fontSize: 32,
      lineHeight: 38,
      fontWeight: '900',
      letterSpacing: -0.8,
      textAlign: 'center',
      fontFamily: FONT_FAMILY.header,
    },
    titleAccent: {
      color: '#FACC15',
    },
    subtitle: {
      color: 'rgba(255,255,255,0.66)',
      fontSize: 15,
      lineHeight: 23,
      fontWeight: '600',
      textAlign: 'center',
      maxWidth: 720,
      fontFamily: FONT_FAMILY.body,
    },
    projectGrid: {
      gap: 14,
      flexDirection: 'column',
    },
    projectGridWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    projectCard: {
      minHeight: 300,
      borderRadius: 14,
      overflow: 'hidden',
      backgroundColor: 'rgba(2,6,23,0.92)',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.10)',
    },
    preview: {
      flex: 1,
      minHeight: 246,
      padding: 16,
      position: 'relative',
      overflow: 'hidden',
      justifyContent: 'space-between',
    },
    previewGrid: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0.12,
      ...(Platform.OS === 'web'
        ? ({
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.20) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          } as any)
        : {}),
    },
    previewOrbA: {
      position: 'absolute',
      top: -54,
      right: -42,
      width: 160,
      height: 160,
      borderRadius: 80,
    },
    previewOrbB: {
      position: 'absolute',
      bottom: -70,
      left: -52,
      width: 180,
      height: 180,
      borderRadius: 90,
    },
    previewTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      zIndex: 2,
    },
    projectNumber: {
      color: 'rgba(255,255,255,0.38)',
      fontSize: 12,
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
      color: 'rgba(255,255,255,0.56)',
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
      backgroundColor: 'rgba(255,255,255,0.08)',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.10)',
    },
    previewTagText: {
      color: 'rgba(255,255,255,0.78)',
      fontSize: 10,
      fontWeight: '800',
      fontFamily: FONT_FAMILY.accent,
    },
    projectStrip: {
      minHeight: 54,
      paddingHorizontal: 14,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
    },
    projectTitle: {
      color: '#030712',
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
      color: '#030712',
      fontSize: 11,
      fontWeight: '900',
      letterSpacing: 0.5,
      fontFamily: FONT_FAMILY.accent,
    },
    projectArrow: {
      color: '#030712',
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
      borderColor: 'rgba(255,255,255,0.42)',
      backgroundColor: 'rgba(255,255,255,0.04)',
      ...(Platform.OS === 'web' ? ({ transition: 'all 180ms ease' } as any) : {}),
    },
    viewAllBtnHover: {
      backgroundColor: 'rgba(255,255,255,0.10)',
      transform: [{ translateY: -2 }],
    },
    viewAllText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '900',
      fontFamily: FONT_FAMILY.accent,
    },
  });
};

const getModalStyles = (colors: any, isDark: boolean) => StyleSheet.create({
  modalRoot: {
    flex: 1,
    backgroundColor: isDark ? 'rgba(2, 6, 23, 0.78)' : 'rgba(15, 23, 42, 0.58)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalShell: {
    width: '100%',
    maxWidth: 1060,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: colors.cardSolid,
    borderWidth: 1,
    borderColor: isDark ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0, 0, 0, 0.12)',
    position: 'relative',
    ...(Platform.OS === 'web'
      ? ({
          boxShadow: isDark
            ? '0 32px 100px -12px rgba(0, 0, 0, 0.82), 0 0 0 1px rgba(255, 255, 255, 0.08)'
            : '0 32px 100px -12px rgba(15, 23, 42, 0.22)',
        } as any)
      : {}),
  },
  modalShellWide: {
    width: '92%',
  },
  modalAmbientOrb: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 320,
    height: 320,
    borderRadius: 160,
    filter: 'blur(70px)',
  } as any,
  modalTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surfaceSoft,
    flexWrap: 'wrap',
    gap: 10,
    zIndex: 10,
  },
  modalMetaGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  caseStudyBadge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  caseStudyText: {
    color: colors.textDim,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.1,
    fontFamily: FONT_FAMILY.accent,
  },
  modalStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: RADIUS.full,
    borderWidth: 1,
  },
  modalStatusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  modalStatusText: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    fontFamily: FONT_FAMILY.accent,
  },
  specialHighlightPill: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: RADIUS.full,
    borderWidth: 1,
  },
  specialHighlightText: {
    fontSize: 11,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.accent,
  },
  modalControlsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: RADIUS.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...(Platform.OS === 'web' ? ({ transition: 'all 160ms ease', cursor: 'pointer' } as any) : {}),
  },
  navBtnHover: {
    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
    transform: [{ translateY: -1 }],
  },
  navBtnText: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: '800',
    fontFamily: FONT_FAMILY.accent,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...(Platform.OS === 'web' ? ({ transition: 'all 160ms ease', cursor: 'pointer' } as any) : {}),
  },
  closeBtnHover: {
    backgroundColor: isDark ? 'rgba(239, 68, 68, 0.22)' : 'rgba(239, 68, 68, 0.12)',
    borderColor: 'rgba(239, 68, 68, 0.44)',
    transform: [{ scale: 1.05 }],
  },
  closeBtnText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.accent,
  },
  modalScrollBody: {
    padding: 24,
    gap: 24,
  },
  partContainer: {
    width: '100%',
  },
  modalProjectTitle: {
    color: colors.textPrimary,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '900',
    letterSpacing: -1.2,
    fontFamily: FONT_FAMILY.header,
  },
  modalHeadline: {
    fontSize: 17,
    lineHeight: 25,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginTop: 6,
    fontFamily: FONT_FAMILY.header,
  },
  modalDescription: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '600',
    marginTop: 12,
    fontFamily: FONT_FAMILY.body,
  },
  heroActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 18,
  },
  actionPrimaryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web' ? ({ transition: 'all 180ms ease', cursor: 'pointer' } as any) : {}),
  },
  actionPrimaryText: {
    color: '#020617',
    fontSize: 13,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.accent,
  },
  actionSecondaryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...(Platform.OS === 'web' ? ({ transition: 'all 180ms ease', cursor: 'pointer' } as any) : {}),
  },
  actionSecondaryBtnHover: {
    backgroundColor: colors.surfaceHover,
    borderColor: colors.borderHover,
    transform: [{ translateY: -1 }],
  },
  actionSecondaryText: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: FONT_FAMILY.accent,
  },
  actionInquireBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: '#38BDF8',
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    ...(Platform.OS === 'web' ? ({ transition: 'all 180ms ease', cursor: 'pointer' } as any) : {}),
  },
  actionInquireBtnHover: {
    backgroundColor: 'rgba(56, 189, 248, 0.22)',
    transform: [{ translateY: -1 }],
  },
  actionInquireText: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.accent,
  },
  actionEmailBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...(Platform.OS === 'web' ? ({ transition: 'all 180ms ease', cursor: 'pointer' } as any) : {}),
  },
  actionEmailBtnHover: {
    backgroundColor: colors.surfaceHover,
    transform: [{ translateY: -1 }],
  },
  actionEmailText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '800',
    fontFamily: FONT_FAMILY.accent,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  sectionHeaderLabel: {
    color: colors.textDim,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
    fontFamily: FONT_FAMILY.accent,
  },
  sectionHeaderLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
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
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
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
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '800',
    fontFamily: FONT_FAMILY.header,
  },
  metricSub: {
    color: colors.textDim,
    fontSize: 11,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.body,
  },
  tabBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 6,
    borderRadius: 20,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabBtn: {
    flex: 1,
    minWidth: 140,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    borderWidth: 1,
    borderColor: 'transparent',
    ...(Platform.OS === 'web' ? ({ transition: 'all 180ms ease', cursor: 'pointer' } as any) : {}),
  },
  tabBtnActive: {
    borderWidth: 1,
  },
  tabBtnLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '800',
    fontFamily: FONT_FAMILY.header,
  },
  tabBtnSub: {
    color: colors.textDim,
    fontSize: 10,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.body,
  },
  comparativeContainer: {
    gap: 14,
  },
  challengeBox: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: isDark ? 'rgba(239, 68, 68, 0.08)' : 'rgba(239, 68, 68, 0.05)',
    borderWidth: 1,
    borderColor: isDark ? 'rgba(239, 68, 68, 0.28)' : 'rgba(239, 68, 68, 0.22)',
    gap: 10,
  },
  solutionBox: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
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
    color: colors.textDim,
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
  },
  boxIconSuccessText: {
    fontSize: 18,
  },
  boxTitleSuccess: {
    fontSize: 16,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.header,
  },
  boxSubSuccess: {
    color: colors.textDim,
    fontSize: 11,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.accent,
  },
  boxDesc: {
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 23,
    fontWeight: '600',
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
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
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
    borderWidth: 1,
  },
  featureIconText: {
    fontSize: 20,
  },
  featurePill: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: RADIUS.full,
    borderWidth: 1,
  },
  featurePillText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
    fontFamily: FONT_FAMILY.accent,
  },
  featureTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.header,
  },
  featureDesc: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '600',
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
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
  },
  archCategoryTitle: {
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
  },
  archItemText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.body,
  },
  archTagsBlock: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
  },
  archTagsLabel: {
    color: colors.textDim,
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
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  techPillText: {
    color: colors.textPrimary,
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
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
  },
  impactCheckBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  impactCheckText: {
    fontSize: 14,
    fontWeight: '900',
  },
  impactPointText: {
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '700',
    flex: 1,
    fontFamily: FONT_FAMILY.body,
  },
  complianceNoticeBox: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  complianceTitle: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.header,
  },
  complianceDesc: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.body,
  },
  ctaBanner: {
    padding: 24,
    borderRadius: 22,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
    gap: 16,
  },
  ctaGlowOrb: {
    position: 'absolute',
    bottom: -60,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
  },
  ctaTextCol: {
    gap: 8,
    zIndex: 2,
  },
  ctaHeading: {
    color: colors.textPrimary,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '900',
    letterSpacing: -0.5,
    fontFamily: FONT_FAMILY.header,
  },
  ctaSub: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
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
  ctaMainBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web' ? ({ transition: 'all 180ms ease', cursor: 'pointer' } as any) : {}),
  },
  ctaMainBtnText: {
    color: '#020617',
    fontSize: 13,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.accent,
  },
  ctaSubBtn: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: RADIUS.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...(Platform.OS === 'web' ? ({ transition: 'all 180ms ease', cursor: 'pointer' } as any) : {}),
  },
  ctaSubBtnHover: {
    backgroundColor: colors.surfaceHover,
    borderColor: colors.borderHover,
  },
  ctaSubBtnText: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: FONT_FAMILY.accent,
  },
});
