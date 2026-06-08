import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { RADIUS, FONT_FAMILY } from '../constants/theme';
import { SKILLS, TECH } from '../constants/data';
import AnimatedSection from './AnimatedSection';
import { sectionPadH, sectionPadV, subSize, titleLetterSpacing, titleLineH, titleSize } from '../utils/responsive';

type Skill = typeof SKILLS[number];
type TechItem = typeof TECH[number];

const ICON_TEXT: Record<string, string> = {
  code: '</>',
  snake: 'PY',
  lightning: 'JS',
  web: 'WEB',
  db: 'SQL',
  link: 'API',
  bot: 'BOT',
  terminal: '$_',
  container: 'DO',
  github: 'GH',
  table: 'XL',
};

export default function SkillsSection() {
  const { colors, isDark } = useTheme();
  const { width } = useWindowDimensions();
  const ph = sectionPadH(width);
  const pv = sectionPadV(width);
  const ts = titleSize(width);
  const tlh = titleLineH(width);
  const tls = titleLetterSpacing(width);
  const ss = subSize(width);
  const tileCols = width >= 1180 ? 6 : width >= 920 ? 4 : width >= 620 ? 3 : 2;
  const skillCols = width >= 980 ? 3 : width >= 680 ? 2 : 1;
  const styles = getStyles(colors, isDark);

  const tileWidth = tileCols === 6 ? '15.7%' : tileCols === 4 ? '23.9%' : tileCols === 3 ? '31.9%' : '48.2%';
  const skillWidth = skillCols === 3 ? '32.1%' : skillCols === 2 ? '48.8%' : '100%';

  return (
    <View style={[styles.wrapper, { paddingHorizontal: ph, paddingVertical: pv }]}>
      <AnimatedSection>
        <View style={styles.header}>
          <Text style={styles.sectionKicker}>03 / Skills & Abilities</Text>
          <Text style={[styles.sectionTitle, { fontSize: ts, lineHeight: tlh, letterSpacing: tls }]}>Tools I use to build real systems.</Text>
          <Text style={[styles.sectionSub, { fontSize: ss }]}>A cleaner, visual skill board for development, support, automation, Docker, Ubuntu, and database work.</Text>
        </View>
      </AnimatedSection>

      <AnimatedSection delay={80} direction="up">
        <View style={styles.techShowcase}>
          <View style={styles.showcaseHeader}>
            <View style={styles.showcaseIcon}>
              <Text style={styles.showcaseIconText}>{'</>'}</Text>
            </View>
            <Text style={styles.showcaseTitle}>Skills <Text style={styles.showcaseTitleAccent}>& Abilities</Text></Text>
          </View>

          <View style={styles.techGrid}>
            {TECH.map((item, index) => (
              <TechTile key={item.name} item={item} index={index} width={tileWidth} styles={styles} />
            ))}
          </View>
        </View>
      </AnimatedSection>

      <View style={[styles.skillGrid, skillCols > 1 && styles.skillGridWrap]}>
        {SKILLS.map((skill, index) => (
          <AnimatedSection key={skill.label} delay={140 + index * 45} direction="up" style={{ width: skillWidth }}>
            <SkillCard skill={skill} index={index} styles={styles} colors={colors} isDark={isDark} />
          </AnimatedSection>
        ))}
      </View>
    </View>
  );
}

function TechTile({ item, index, width, styles }: { item: TechItem; index: number; width: string; styles: any }) {
  const [hovered, setHovered] = useState(false);
  const accents = ['#22D3EE', '#34D399', '#A78BFA', '#FBBF24', '#60A5FA', '#FB7185'];
  const accent = accents[index % accents.length];
  const icon = ICON_TEXT[item.icon] ?? item.name.slice(0, 2).toUpperCase();

  return (
    <Pressable
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={[
        styles.techTile,
        { width },
        Platform.OS === 'web' && {
          borderColor: hovered ? `${accent}88` : 'rgba(255,255,255,0.08)',
          boxShadow: hovered ? `0 22px 54px ${accent}22` : '0 12px 28px rgba(0,0,0,0.24)',
          transform: [{ translateY: hovered ? -7 : 0 }, { scale: hovered ? 1.015 : 1 }],
          transition: 'all 220ms cubic-bezier(0.22, 1, 0.36, 1)',
        } as any,
      ]}
    >
      <View style={[styles.techIconWrap, { backgroundColor: `${accent}14`, borderColor: `${accent}42` }]}>
        <Text style={[styles.techIconText, { color: accent }]}>{icon}</Text>
      </View>
      <Text style={styles.techLabel}>{item.name}</Text>
    </Pressable>
  );
}

function SkillCard({
  skill,
  index,
  styles,
  colors,
  isDark,
}: {
  skill: Skill;
  index: number;
  styles: any;
  colors: any;
  isDark: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const accent = skill.color || [colors.accent, colors.emerald, colors.violet][index % 3];

  return (
    <Pressable
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={[
        styles.skillCard,
        Platform.OS === 'web' && {
          borderColor: hovered ? `${accent}55` : colors.border,
          transform: [{ translateY: hovered ? -5 : 0 }],
          boxShadow: hovered
            ? isDark ? '0 24px 70px rgba(0,0,0,0.40)' : '0 22px 54px rgba(15,23,42,0.10)'
            : 'none',
          transition: 'all 220ms cubic-bezier(0.22, 1, 0.36, 1)',
        } as any,
      ]}
    >
      <View style={styles.skillTopRow}>
        <Text style={styles.skillIndex}>{String(index + 1).padStart(2, '0')}</Text>
        <View style={[styles.levelBadge, { backgroundColor: `${accent}12`, borderColor: `${accent}35` }]}>
          <Text style={[styles.levelText, { color: accent }]}>{skill.level}</Text>
        </View>
      </View>
      <Text style={styles.skillTitle}>{skill.label}</Text>
      <Text style={styles.skillDesc}>{skill.description}</Text>
    </Pressable>
  );
}

const getStyles = (colors: any, isDark: boolean) => {
  const softShadow = Platform.OS === 'web'
    ? ({ boxShadow: isDark ? '0 24px 80px rgba(0,0,0,0.36)' : '0 24px 70px rgba(15,23,42,0.08)' } as any)
    : {};

  return StyleSheet.create({
    wrapper: {
      width: '100%',
      maxWidth: 1280,
      alignSelf: 'center',
      gap: 22,
    },
    header: {
      alignItems: 'center',
      gap: 10,
      marginBottom: 2,
    },
    sectionKicker: {
      color: colors.accent,
      fontSize: 12,
      fontWeight: '900',
      letterSpacing: 1.7,
      textTransform: 'uppercase',
      fontFamily: FONT_FAMILY.accent,
    },
    sectionTitle: {
      color: colors.textPrimary,
      fontWeight: '900',
      textAlign: 'center',
      maxWidth: 850,
      fontFamily: FONT_FAMILY.header,
    },
    sectionSub: {
      color: colors.textMuted,
      textAlign: 'center',
      maxWidth: 760,
      lineHeight: 28,
      fontWeight: '600',
      fontFamily: FONT_FAMILY.body,
    },
    techShowcase: {
      padding: 22,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(91,33,182,0.20)',
      backgroundColor: '#12002D',
      overflow: 'hidden',
      ...softShadow,
      ...(Platform.OS === 'web'
        ? ({
            backgroundImage: 'radial-gradient(circle at 12% 0%, rgba(124,58,237,0.55), transparent 34%), radial-gradient(circle at 84% 18%, rgba(37,99,235,0.38), transparent 30%), linear-gradient(135deg, #25005E 0%, #13002E 46%, #070015 100%)',
          } as any)
        : {}),
    },
    showcaseHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      marginBottom: 22,
    },
    showcaseIcon: {
      width: 38,
      height: 38,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.18)',
      backgroundColor: 'rgba(255,255,255,0.08)',
    },
    showcaseIconText: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: '900',
      fontFamily: FONT_FAMILY.accent,
    },
    showcaseTitle: {
      color: '#FFFFFF',
      fontSize: 28,
      lineHeight: 34,
      fontWeight: '900',
      letterSpacing: -0.7,
      textAlign: 'center',
      fontFamily: FONT_FAMILY.header,
    },
    showcaseTitleAccent: {
      color: '#FBBF24',
    },
    techGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 13,
      justifyContent: 'center',
    },
    techTile: {
      minHeight: 112,
      paddingVertical: 18,
      paddingHorizontal: 10,
      borderRadius: 11,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.08)',
      backgroundColor: 'rgba(1,4,20,0.90)',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
    },
    techIconWrap: {
      minWidth: 48,
      height: 42,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      paddingHorizontal: 8,
    },
    techIconText: {
      fontSize: 18,
      fontWeight: '900',
      letterSpacing: -0.4,
      fontFamily: FONT_FAMILY.header,
    },
    techLabel: {
      color: '#F8FAFC',
      fontSize: 14,
      lineHeight: 19,
      fontWeight: '800',
      textAlign: 'center',
      fontFamily: FONT_FAMILY.body,
    },
    skillGrid: {
      gap: 13,
      flexDirection: 'column',
    },
    skillGridWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    skillCard: {
      minHeight: 142,
      padding: 18,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: isDark ? colors.card : '#FFFFFF',
    },
    skillTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      marginBottom: 16,
    },
    skillIndex: {
      color: colors.textDim,
      fontSize: 12,
      fontWeight: '900',
      letterSpacing: 1.1,
      fontFamily: FONT_FAMILY.accent,
    },
    levelBadge: {
      paddingVertical: 5,
      paddingHorizontal: 9,
      borderRadius: RADIUS.full,
      borderWidth: 1,
    },
    levelText: {
      fontSize: 10,
      fontWeight: '900',
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      fontFamily: FONT_FAMILY.accent,
    },
    skillTitle: {
      color: colors.textPrimary,
      fontSize: 18,
      lineHeight: 23,
      fontWeight: '900',
      letterSpacing: -0.45,
      fontFamily: FONT_FAMILY.header,
    },
    skillDesc: {
      color: colors.textMuted,
      fontSize: 13,
      lineHeight: 20,
      fontWeight: '600',
      marginTop: 9,
      fontFamily: FONT_FAMILY.body,
    },
  });
};
