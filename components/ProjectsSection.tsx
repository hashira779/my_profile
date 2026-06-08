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
        onClose={() => setSelectedProject(null)}
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
          boxShadow: hovered ? `0 26px 70px ${accent}22` : '0 14px 34px rgba(0,0,0,0.24)',
          transition: 'all 230ms cubic-bezier(0.22, 1, 0.36, 1)',
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
        </View>
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
        <Text style={styles.projectArrow}>{'->'}</Text>
      </View>
    </Pressable>
  );
}

function ProjectDetailModal({
  project,
  projectIndex,
  onClose,
  colors,
  isDark,
}: {
  project: Project | null;
  projectIndex: number;
  onClose: () => void;
  colors: any;
  isDark: boolean;
}) {
  const { width, height } = useWindowDimensions();
  const styles = getModalStyles(colors, isDark);
  if (!project) return null;

  const accent = STATUS_COLOR[project.status] ?? colors.accent;
  const isPrivate = Boolean((project as any).private);
  const note = (project as any).note as string | undefined;
  const isWide = width >= 840;
  const maxHeight = Math.min(height * 0.88, 760);

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalRoot}>
        <Pressable style={StyleSheet.absoluteFillObject} onPress={onClose} />
        <View style={[styles.modalShell, { maxHeight }, isWide && styles.modalShellWide]}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTopRow}>
                <View style={[styles.modalStatus, { borderColor: `${accent}44`, backgroundColor: `${accent}12` }]}>
                  <View style={[styles.modalDot, { backgroundColor: accent }]} />
                  <Text style={[styles.modalStatusText, { color: accent }]}>{project.status} / {project.year}</Text>
                </View>
                <Pressable onPress={onClose} style={styles.closeBtn}>
                  <Text style={styles.closeText}>Close</Text>
                </Pressable>
              </View>
              <Text style={styles.modalIndex}>Project {String(projectIndex + 1).padStart(2, '0')}</Text>
              <Text style={styles.modalTitle}>{project.title}</Text>
              <Text style={styles.modalDesc}>{project.description}</Text>
            </View>

            <View style={[styles.modalBody, isWide && styles.modalBodyWide]}>
              <View style={styles.modalMainCol}>
                <Text style={styles.modalSectionTitle}>Impact</Text>
                <View style={styles.impactList}>
                  {project.impact.map((item) => (
                    <View key={item} style={styles.impactItem}>
                      <View style={[styles.impactDot, { backgroundColor: accent }]} />
                      <Text style={styles.impactText}>{item}</Text>
                    </View>
                  ))}
                </View>

                <Text style={styles.modalSectionTitle}>Technology</Text>
                <View style={styles.tagList}>
                  {project.tags.map((tag) => (
                    <View key={tag} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.modalSideCol}>
                <InfoRow label="Status" value={project.status} styles={styles} />
                <InfoRow label="Year" value={project.year} styles={styles} />
                <InfoRow label="Access" value={isPrivate ? 'Private / internal' : 'Public'} styles={styles} />
                {note ? <Text style={styles.noteText}>{note}</Text> : null}

                {project.live ? (
                  <Pressable style={[styles.primaryAction, { backgroundColor: accent }]} onPress={() => Linking.openURL(project.live)}>
                    <Text style={styles.primaryActionText}>Open live project</Text>
                  </Pressable>
                ) : null}
                {!isPrivate && project.github ? (
                  <Pressable style={styles.secondaryAction} onPress={() => Linking.openURL(project.github)}>
                    <Text style={[styles.secondaryActionText, { color: accent }]}>View repository</Text>
                  </Pressable>
                ) : null}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function InfoRow({ label, value, styles }: { label: string; value: string; styles: any }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
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
      minHeight: 276,
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: 'rgba(2,6,23,0.92)',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.10)',
    },
    preview: {
      flex: 1,
      minHeight: 222,
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
      gap: 8,
      zIndex: 2,
    },
    previewInitials: {
      fontSize: 58,
      lineHeight: 64,
      fontWeight: '900',
      letterSpacing: -2,
      fontFamily: FONT_FAMILY.header,
    },
    previewMeta: {
      color: 'rgba(255,255,255,0.56)',
      fontSize: 12,
      fontWeight: '900',
      letterSpacing: 1.4,
      fontFamily: FONT_FAMILY.accent,
    },
    previewTags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 7,
      zIndex: 2,
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
      fontSize: 15,
      fontWeight: '900',
      letterSpacing: -0.3,
      flex: 1,
      fontFamily: FONT_FAMILY.header,
    },
    projectArrow: {
      color: '#030712',
      fontSize: 18,
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
    backgroundColor: isDark ? 'rgba(0,0,0,0.72)' : 'rgba(0,0,0,0.46)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  modalShell: {
    width: '100%',
    maxWidth: 980,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: colors.cardSolid,
    borderWidth: 1,
    borderColor: colors.border,
    ...(Platform.OS === 'web' ? ({ boxShadow: isDark ? '0 44px 120px rgba(0,0,0,0.62)' : '0 44px 120px rgba(0,0,0,0.16)' } as any) : {}),
  },
  modalShellWide: {
    width: '92%',
  },
  modalContent: {
    paddingBottom: 0,
  },
  modalHeader: {
    padding: 28,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 7,
    paddingHorizontal: 11,
    borderRadius: RADIUS.full,
    borderWidth: 1,
  },
  modalDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  modalStatusText: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    fontFamily: FONT_FAMILY.accent,
  },
  closeBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: RADIUS.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  closeText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.accent,
  },
  modalIndex: {
    color: colors.textDim,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginTop: 26,
    textTransform: 'uppercase',
    fontFamily: FONT_FAMILY.accent,
  },
  modalTitle: {
    color: colors.textPrimary,
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '900',
    letterSpacing: -1.3,
    marginTop: 8,
    fontFamily: FONT_FAMILY.header,
  },
  modalDesc: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '600',
    marginTop: 12,
    maxWidth: 760,
    fontFamily: FONT_FAMILY.body,
  },
  modalBody: {
    padding: 24,
    gap: 18,
  },
  modalBodyWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  modalMainCol: {
    flex: 1.45,
    padding: 20,
    borderRadius: 22,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 14,
  },
  modalSideCol: {
    flex: 0.8,
    padding: 18,
    borderRadius: 22,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
    minWidth: 250,
  },
  modalSectionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: -0.3,
    fontFamily: FONT_FAMILY.header,
  },
  impactList: {
    gap: 10,
    marginBottom: 8,
  },
  impactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  impactDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginTop: 7,
  },
  impactText: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '700',
    flex: 1,
    fontFamily: FONT_FAMILY.body,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingVertical: 7,
    paddingHorizontal: 11,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  tagText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.accent,
  },
  infoRow: {
    gap: 3,
    paddingBottom: 11,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    color: colors.textDim,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    fontFamily: FONT_FAMILY.accent,
  },
  infoValue: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '800',
    fontFamily: FONT_FAMILY.body,
  },
  noteText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.body,
  },
  primaryAction: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    marginTop: 6,
  },
  primaryActionText: {
    color: '#020617',
    fontSize: 14,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.accent,
  },
  secondaryAction: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryActionText: {
    fontSize: 14,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.accent,
  },
});
