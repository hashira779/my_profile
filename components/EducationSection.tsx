import React, { useState } from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { RADIUS, FONT_FAMILY } from '../constants/theme';
import { EDUCATION, LEARNING_FOCUS, TOOLS } from '../constants/data';
import AnimatedSection from './AnimatedSection';
import { cardPad, sectionPadH, sectionPadV, subSize, titleLetterSpacing, titleLineH, titleSize } from '../utils/responsive';

type Education = typeof EDUCATION[number];
type Tool = typeof TOOLS[number];

const LOCAL_LOGOS: Record<string, any> = {
  'Royal University of Phnom Penh': require('../assets/education/rupp.png'),
};

const EDUCATION_META: Record<string, { short: string; focus: string; summary: string }> = {
  'Royal University of Phnom Penh': {
    short: 'RUPP',
    focus: 'IT Engineering',
    summary: 'Programming, databases, system design fundamentals, and practical IT problem solving.',
  },
  'Svay Chek High School': {
    short: 'SCH',
    focus: 'High School',
    summary: 'General education foundation before university, with discipline and communication habits.',
  },
};

const TOOL_GROUPS = [
  { title: 'Reporting', tools: ['Microsoft Word', 'PowerPoint', 'Excel', 'Internet & E-mail'] },
  { title: 'Development', tools: ['API Integration', 'Database Workflows', 'Git / GitHub'] },
  { title: 'AI workflow', tools: ['ChatGPT / OpenAI API', 'GitHub Copilot', 'Claude', 'Cursor AI'] },
  { title: 'Growth', tools: ['Prompt Engineering', 'AI Workflow Automation'] },
];

function findTool(name: string): Tool | undefined {
  return TOOLS.find((tool) => tool.name === name);
}

export default function EducationSection() {
  const { colors, isDark } = useTheme();
  const { width } = useWindowDimensions();
  const isWide = width >= 920;
  const isCompact = width < 620;
  const ph = sectionPadH(width);
  const pv = sectionPadV(width);
  const cp = cardPad(width);
  const ts = titleSize(width);
  const tlh = titleLineH(width);
  const tls = titleLetterSpacing(width);
  const ss = subSize(width);
  const styles = getStyles(colors, isDark, isCompact);
  const latestEducation = EDUCATION[0];
  const latestMeta = latestEducation ? EDUCATION_META[latestEducation.institution] : undefined;

  return (
    <View style={[styles.wrapper, { paddingHorizontal: ph, paddingVertical: pv }]}>
      <AnimatedSection>
        <View style={[styles.educationCard, isWide && styles.educationCardWide]}>
          <View style={[styles.leftPanel, isWide && styles.leftPanelWide]}>
            <View style={styles.leftTop}>
              <Text style={styles.eyebrow}>04 / Education</Text>
              <Text style={[styles.title, { fontSize: ts, lineHeight: tlh, letterSpacing: tls }]}>Education</Text>
              <Text style={[styles.subtitle, { fontSize: ss }]}>University and school history, kept clean and easy to scan.</Text>
            </View>

            <View style={styles.sideMetaGrid}>
              <MetaBox label="Latest" value={latestEducation?.period ?? '2020 - 2025'} styles={styles} />
              <MetaBox label="Focus" value={latestMeta?.focus ?? 'IT Engineering'} styles={styles} />
            </View>
          </View>

          <View style={styles.timelinePanel}>
            <View style={styles.timelineHeader}>
              <Text style={styles.timelineTitle}>Study history</Text>
              <Text style={styles.timelineStatus}>Completed</Text>
            </View>

            <View style={styles.timelineList}>
              {EDUCATION.map((edu, index) => (
                <EducationRow
                  key={edu.institution}
                  edu={edu}
                  index={index}
                  isCompact={isCompact}
                  styles={styles}
                  colors={colors}
                  isDark={isDark}
                />
              ))}
            </View>
          </View>
        </View>
      </AnimatedSection>

      <View style={[styles.supportGrid, isWide && styles.supportGridWide]}>
        <AnimatedSection delay={130} direction="up" style={styles.supportItem}>
          <ToolsPanel padding={cp} styles={styles} colors={colors} />
        </AnimatedSection>

        <AnimatedSection delay={190} direction="up" style={styles.supportItem}>
          <LearningPanel padding={cp} styles={styles} colors={colors} />
        </AnimatedSection>
      </View>
    </View>
  );
}

function MetaBox({ label, value, styles }: { label: string; value: string; styles: any }) {
  return (
    <View style={styles.metaBox}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

function EducationRow({
  edu,
  index,
  isCompact,
  styles,
  colors,
  isDark,
}: {
  edu: Education;
  index: number;
  isCompact: boolean;
  styles: any;
  colors: any;
  isDark: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const accent = edu.color || colors.accent;
  const meta = EDUCATION_META[edu.institution] ?? {
    short: edu.institution.slice(0, 3).toUpperCase(),
    focus: edu.degree,
    summary: 'Education record supporting technical work and continued learning.',
  };
  const logo = LOCAL_LOGOS[edu.institution];

  return (
    <Pressable
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={[
        styles.educationRow,
        isCompact && styles.educationRowCompact,
        Platform.OS === 'web' && {
          borderColor: hovered ? `${accent}70` : colors.border,
          transform: [{ translateY: hovered ? -5 : 0 }],
          boxShadow: hovered
            ? isDark ? '0 26px 74px rgba(0,0,0,0.42)' : '0 24px 58px rgba(15,23,42,0.11)'
            : 'none',
          transition: 'all 220ms cubic-bezier(0.22, 1, 0.36, 1)',
        } as any,
      ]}
    >
      <View style={[styles.periodBlock, isCompact && styles.periodBlockCompact, { borderColor: `${accent}35`, backgroundColor: `${accent}10` }]}>
        <Text style={[styles.rowNumber, { color: accent }]}>{String(index + 1).padStart(2, '0')}</Text>
        <Text style={[styles.periodText, { color: accent }]}>{edu.period}</Text>
      </View>

      <View style={[styles.rowBody, isCompact && styles.rowBodyCompact]}>
        <View style={[styles.logoFrame, { borderColor: `${accent}38`, backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#FFFFFF' }]}>
          {logo ? (
            <Image source={logo} style={styles.logoImage} resizeMode="contain" />
          ) : (
            <Text style={[styles.logoFallback, { color: accent }]}>{meta.short}</Text>
          )}
        </View>

        <View style={styles.rowCopy}>
          <View style={styles.rowTitleLine}>
            <Text style={styles.institution}>{edu.institution}</Text>
            <View style={[styles.focusPill, { borderColor: `${accent}35`, backgroundColor: `${accent}10` }]}>
              <Text style={[styles.focusText, { color: accent }]}>{meta.focus}</Text>
            </View>
          </View>
          <Text style={styles.degree}>{edu.degree}</Text>
          <Text style={styles.summary}>{meta.summary}</Text>
        </View>
      </View>
    </Pressable>
  );
}

function ToolsPanel({ padding, styles, colors }: { padding: number; styles: any; colors: any }) {
  return (
    <View style={[styles.supportCard, { padding }]}>
      <View style={styles.supportHeader}>
        <Text style={styles.supportKicker}>Tools</Text>
        <Text style={styles.supportTitle}>Work support</Text>
      </View>

      <View style={styles.toolGroupList}>
        {TOOL_GROUPS.map((group) => {
          const tools = group.tools.map(findTool).filter(Boolean) as Tool[];
          return (
            <View key={group.title} style={styles.toolGroup}>
              <Text style={styles.toolGroupTitle}>{group.title}</Text>
              <View style={styles.toolChipWrap}>
                {tools.map((tool) => (
                  <View key={tool.name} style={styles.toolChip}>
                    <View style={[styles.toolDot, { backgroundColor: colors.accent }]} />
                    <Text style={styles.toolChipText}>{tool.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function LearningPanel({ padding, styles, colors }: { padding: number; styles: any; colors: any }) {
  return (
    <View style={[styles.supportCard, { padding }]}>
      <View style={styles.supportHeader}>
        <Text style={styles.supportKicker}>Learning</Text>
        <Text style={styles.supportTitle}>Current focus</Text>
      </View>

      <View style={styles.learningList}>
        {LEARNING_FOCUS.map((item, index) => (
          <View key={item.name} style={styles.learningRow}>
            <Text style={[styles.learningIndex, { color: item.color || colors.accent }]}>{String(index + 1).padStart(2, '0')}</Text>
            <View style={[styles.learningAccent, { backgroundColor: item.color || colors.accent }]} />
            <View style={styles.learningCopy}>
              <Text style={styles.learningName}>{item.name}</Text>
              <Text style={styles.learningDetail}>{item.detail}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const getStyles = (colors: any, isDark: boolean, isCompact: boolean) => {
  const mainBg = isDark ? 'rgba(255,255,255,0.038)' : 'rgba(255,255,255,0.82)';
  const sideBg = isDark ? 'rgba(0,0,0,0.22)' : 'rgba(15,23,42,0.035)';
  const rowBg = isDark ? 'rgba(255,255,255,0.044)' : 'rgba(255,255,255,0.84)';
  const supportBg = isDark ? 'rgba(255,255,255,0.034)' : 'rgba(255,255,255,0.70)';
  const shadow = Platform.OS === 'web'
    ? ({ boxShadow: isDark ? '0 30px 92px rgba(0,0,0,0.38)' : '0 28px 82px rgba(15,23,42,0.09)' } as any)
    : {};

  return StyleSheet.create({
    wrapper: {
      width: '100%',
      maxWidth: 1210,
      alignSelf: 'center',
      gap: 16,
    },
    educationCard: {
      width: '100%',
      borderRadius: isCompact ? 28 : 34,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: mainBg,
      overflow: 'hidden',
      ...shadow,
      ...(Platform.OS === 'web'
        ? ({
            backgroundImage: isDark
              ? 'radial-gradient(circle at 0% 0%, rgba(6,182,212,0.14), transparent 31%), linear-gradient(135deg, rgba(255,255,255,0.055), rgba(255,255,255,0.018))'
              : 'radial-gradient(circle at 0% 0%, rgba(37,99,235,0.11), transparent 31%), linear-gradient(135deg, rgba(255,255,255,0.96), rgba(255,255,255,0.62))',
          } as any)
        : {}),
    },
    educationCardWide: {
      flexDirection: 'row',
      alignItems: 'stretch',
    },
    leftPanel: {
      padding: isCompact ? 20 : 28,
      gap: 24,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: sideBg,
      justifyContent: 'space-between',
    },
    leftPanelWide: {
      width: 360,
      borderBottomWidth: 0,
      borderRightWidth: 1,
      borderRightColor: colors.border,
    },
    leftTop: {
      gap: 10,
    },
    eyebrow: {
      color: colors.accent,
      fontSize: 12,
      fontWeight: '900',
      letterSpacing: 1.7,
      textTransform: 'uppercase',
      fontFamily: FONT_FAMILY.accent,
    },
    title: {
      color: colors.textPrimary,
      fontWeight: '900',
      fontFamily: FONT_FAMILY.header,
    },
    subtitle: {
      color: colors.textMuted,
      lineHeight: 28,
      fontWeight: '600',
      maxWidth: 620,
      fontFamily: FONT_FAMILY.body,
    },
    sideMetaGrid: {
      flexDirection: 'row',
      gap: 10,
      flexWrap: 'wrap',
    },
    metaBox: {
      flex: 1,
      minWidth: 124,
      padding: 14,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      gap: 4,
    },
    metaLabel: {
      color: colors.textDim,
      fontSize: 10,
      fontWeight: '900',
      letterSpacing: 1,
      textTransform: 'uppercase',
      fontFamily: FONT_FAMILY.accent,
    },
    metaValue: {
      color: colors.textPrimary,
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '900',
      fontFamily: FONT_FAMILY.header,
    },
    timelinePanel: {
      flex: 1,
      padding: isCompact ? 16 : 22,
      gap: 14,
    },
    timelineHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      paddingHorizontal: 4,
    },
    timelineTitle: {
      color: colors.textPrimary,
      fontSize: 20,
      lineHeight: 25,
      fontWeight: '900',
      letterSpacing: -0.55,
      fontFamily: FONT_FAMILY.header,
    },
    timelineStatus: {
      color: colors.textMuted,
      fontSize: 11,
      fontWeight: '900',
      letterSpacing: 1.1,
      textTransform: 'uppercase',
      fontFamily: FONT_FAMILY.accent,
    },
    timelineList: {
      gap: 12,
    },
    educationRow: {
      flexDirection: 'row',
      gap: 14,
      padding: isCompact ? 12 : 14,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: rowBg,
      overflow: 'hidden',
    },
    educationRowCompact: {
      flexDirection: 'column',
    },
    periodBlock: {
      width: 124,
      flexShrink: 0,
      padding: 13,
      borderRadius: 20,
      borderWidth: 1,
      justifyContent: 'center',
      gap: 5,
    },
    periodBlockCompact: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    rowNumber: {
      fontSize: 11,
      fontWeight: '900',
      letterSpacing: 1.1,
      fontFamily: FONT_FAMILY.accent,
    },
    periodText: {
      fontSize: 13,
      lineHeight: 18,
      fontWeight: '900',
      fontFamily: FONT_FAMILY.header,
    },
    rowBody: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 14,
      minWidth: 0,
    },
    rowBodyCompact: {
      gap: 12,
    },
    logoFrame: {
      width: isCompact ? 58 : 72,
      height: isCompact ? 58 : 72,
      borderRadius: isCompact ? 18 : 22,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      flexShrink: 0,
    },
    logoImage: {
      width: isCompact ? 46 : 58,
      height: isCompact ? 46 : 58,
    },
    logoFallback: {
      fontSize: isCompact ? 16 : 20,
      fontWeight: '900',
      letterSpacing: -0.5,
      fontFamily: FONT_FAMILY.header,
    },
    rowCopy: {
      flex: 1,
      minWidth: 0,
      gap: 7,
    },
    rowTitleLine: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      flexWrap: 'wrap',
    },
    institution: {
      color: colors.textPrimary,
      fontSize: isCompact ? 16 : 19,
      lineHeight: isCompact ? 22 : 24,
      fontWeight: '900',
      letterSpacing: -0.5,
      flex: 1,
      minWidth: isCompact ? 0 : 220,
      fontFamily: FONT_FAMILY.header,
    },
    focusPill: {
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: RADIUS.full,
      borderWidth: 1,
    },
    focusText: {
      fontSize: 10,
      fontWeight: '900',
      letterSpacing: 0.7,
      textTransform: 'uppercase',
      fontFamily: FONT_FAMILY.accent,
    },
    degree: {
      color: colors.textSecondary,
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '800',
      fontFamily: FONT_FAMILY.body,
    },
    summary: {
      color: colors.textMuted,
      fontSize: 13,
      lineHeight: 20,
      fontWeight: '600',
      maxWidth: 620,
      fontFamily: FONT_FAMILY.body,
    },
    supportGrid: {
      flexDirection: 'column',
      gap: 14,
    },
    supportGridWide: {
      flexDirection: 'row',
      alignItems: 'stretch',
    },
    supportItem: {
      flex: 1,
    },
    supportCard: {
      flex: 1,
      borderRadius: 28,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: supportBg,
      gap: 16,
      ...(Platform.OS === 'web'
        ? ({ boxShadow: isDark ? '0 20px 64px rgba(0,0,0,0.28)' : '0 20px 58px rgba(15,23,42,0.06)' } as any)
        : {}),
    },
    supportHeader: {
      gap: 5,
    },
    supportKicker: {
      color: colors.accent,
      fontSize: 11,
      fontWeight: '900',
      letterSpacing: 1.6,
      textTransform: 'uppercase',
      fontFamily: FONT_FAMILY.accent,
    },
    supportTitle: {
      color: colors.textPrimary,
      fontSize: 22,
      lineHeight: 28,
      fontWeight: '900',
      letterSpacing: -0.7,
      fontFamily: FONT_FAMILY.header,
    },
    toolGroupList: {
      gap: 12,
    },
    toolGroup: {
      gap: 8,
    },
    toolGroupTitle: {
      color: colors.textMuted,
      fontSize: 11,
      fontWeight: '900',
      letterSpacing: 1,
      textTransform: 'uppercase',
      fontFamily: FONT_FAMILY.accent,
    },
    toolChipWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    toolChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: RADIUS.full,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    toolDot: {
      width: 5,
      height: 5,
      borderRadius: 3,
    },
    toolChipText: {
      color: colors.textSecondary,
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '800',
      fontFamily: FONT_FAMILY.body,
    },
    learningList: {
      gap: 10,
    },
    learningRow: {
      flexDirection: 'row',
      alignItems: 'stretch',
      gap: 11,
      padding: 13,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surfaceSoft,
    },
    learningIndex: {
      width: 24,
      fontSize: 11,
      fontWeight: '900',
      letterSpacing: 0.9,
      fontFamily: FONT_FAMILY.accent,
    },
    learningAccent: {
      width: 4,
      borderRadius: 4,
    },
    learningCopy: {
      flex: 1,
      gap: 4,
    },
    learningName: {
      color: colors.textPrimary,
      fontSize: 15,
      lineHeight: 20,
      fontWeight: '900',
      letterSpacing: -0.35,
      fontFamily: FONT_FAMILY.header,
    },
    learningDetail: {
      color: colors.textMuted,
      fontSize: 13,
      lineHeight: 20,
      fontWeight: '600',
      fontFamily: FONT_FAMILY.body,
    },
  });
};
