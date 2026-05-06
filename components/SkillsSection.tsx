import React, { useRef, useState } from 'react';
import { Animated, Platform, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, RADIUS } from '../constants/theme';
import { SKILLS, TECH } from '../constants/data';
import AnimatedSection from './AnimatedSection';
import { sectionPadH, sectionPadV, titleSize, titleLineH, titleLetterSpacing, numSize, subSize } from '../utils/responsive';
import { MOTION, usePrefersReducedMotion } from '../utils/motion';

const CHIP_COLORS = ['#2563EB', '#0EA5E9', '#059669', '#64748B'];

// Level → colour mapping
const LEVEL_META: Record<string, { color: string; bg: string; border: string; dot: string }> = {
  Strong:    { color: '#059669', bg: 'rgba(5,150,105,0.10)',  border: 'rgba(5,150,105,0.30)',  dot: '#059669' },
  Good:      { color: '#0EA5E9', bg: 'rgba(14,165,233,0.10)', border: 'rgba(14,165,233,0.30)', dot: '#0EA5E9' },
  Growing:   { color: '#7C3AED', bg: 'rgba(124,58,237,0.10)', border: 'rgba(124,58,237,0.30)', dot: '#7C3AED' },
  Practical: { color: '#D97706', bg: 'rgba(217,119,6,0.10)',  border: 'rgba(217,119,6,0.30)',  dot: '#D97706' },
};

function SkillCard({
  label, level, color, description, reduceMotion,
}: {
  label: string; level: string; color: string; description: string; reduceMotion: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const hoverAnim = useRef(new Animated.Value(0)).current;
  const meta = LEVEL_META[level] ?? LEVEL_META['Good'];

  const onIn = () => {
    setHovered(true);
    if (Platform.OS !== 'web' && !reduceMotion)
      Animated.spring(hoverAnim, { toValue: 1, tension: 80, friction: 10, useNativeDriver: true }).start();
  };
  const onOut = () => {
    setHovered(false);
    if (Platform.OS !== 'web' && !reduceMotion)
      Animated.spring(hoverAnim, { toValue: 0, tension: 80, friction: 12, useNativeDriver: true }).start();
  };

  const nativeScale = reduceMotion ? 1 : hoverAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.03] });
  const webHoverStyle: any = Platform.OS === 'web'
    ? {
        transform: [{ translateY: hovered ? -5 : 0 }],
        borderColor: hovered ? `${color}55` : COLORS.border,
        ...(hovered ? { boxShadow: `0 8px 32px ${color}22` } : {}),
      }
    : {};

  return (
    <Pressable onHoverIn={onIn} onHoverOut={onOut} style={{ flex: 1 }}>
      <Animated.View
        style={[
          styles.skillCard,
          webHoverStyle,
          Platform.OS !== 'web' ? { transform: [{ scale: nativeScale }] } : null,
        ]}
      >
        <LinearGradient
          colors={['rgba(15,23,42,0.93)', 'rgba(2,6,23,0.97)']}
          style={StyleSheet.absoluteFillObject}
        />
        {/* Colour accent bar on the left */}
        <View style={[styles.cardAccent, { backgroundColor: color }]} />

        <View style={styles.cardContent}>
          {/* Top row: label + level badge */}
          <View style={styles.cardTop}>
            <View style={styles.labelRow_}>
              <View style={[styles.cardDot, { backgroundColor: color }]} />
              <Text style={[styles.cardLabel, hovered && { color }]}>{label}</Text>
            </View>
            <View style={[styles.levelBadge, { backgroundColor: meta.bg, borderColor: meta.border }]}>
              <View style={[styles.levelDot, { backgroundColor: meta.dot }]} />
              <Text style={[styles.levelText, { color: meta.color }]}>{level}</Text>
            </View>
          </View>
          {/* Description */}
          <Text style={styles.cardDesc}>{description}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

function TechChip({ name, index, reduceMotion }: { name: string; index: number; reduceMotion: boolean }) {
  const [hovered, setHovered] = useState(false);
  const hoverAnim = useRef(new Animated.Value(0)).current;
  const chipColor = CHIP_COLORS[index % CHIP_COLORS.length];

  const onIn = () => {
    setHovered(true);
    if (Platform.OS !== 'web' && !reduceMotion)
      Animated.spring(hoverAnim, { toValue: 1, tension: 90, friction: 9, useNativeDriver: true }).start();
  };
  const onOut = () => {
    setHovered(false);
    if (Platform.OS !== 'web' && !reduceMotion)
      Animated.spring(hoverAnim, { toValue: 0, tension: 90, friction: 12, useNativeDriver: true }).start();
  };

  const nativeScale = reduceMotion ? 1 : hoverAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] });
  const webHoverStyle: any = Platform.OS === 'web'
    ? {
        transform: [{ translateY: hovered ? -4 : 0 }, { scale: hovered ? 1.04 : 1 }],
        borderColor: hovered ? `${chipColor}66` : COLORS.border,
        ...(hovered ? { boxShadow: `0 10px 28px ${chipColor}1f` } : {}),
      }
    : {};

  return (
    <Pressable onHoverIn={onIn} onHoverOut={onOut}>
      <Animated.View
        style={[
          styles.techCard,
          webHoverStyle,
          Platform.OS !== 'web' ? { transform: [{ scale: nativeScale }] } : null,
        ]}
      >
        <LinearGradient colors={['rgba(15,23,42,0.92)', 'rgba(2,6,23,0.96)']} style={StyleSheet.absoluteFillObject} />
        <View style={[styles.techDot, { backgroundColor: chipColor }]} />
        <Text style={styles.techName}>{name}</Text>
      </Animated.View>
    </Pressable>
  );
}

export default function SkillsSection() {
  const { width } = useWindowDimensions();
  const cols = width >= 768 ? 2 : 1;
  const reduceMotion = usePrefersReducedMotion();
  const ph = sectionPadH(width);
  const pv = sectionPadV(width);
  const ts = titleSize(width);
  const tlh = titleLineH(width);
  const tls = titleLetterSpacing(width);
  const ns = numSize(width);
  const ss = subSize(width);

  // Legend items derived from unique levels in data
  const legend = Object.entries(LEVEL_META).map(([lvl, m]) => ({ lvl, ...m }));

  return (
    <View style={[styles.wrapper, { paddingHorizontal: ph, paddingVertical: pv }]}>
      <AnimatedSection>
        <View style={styles.labelRow}>
          <Text style={[styles.sectionNum, { fontSize: ns, lineHeight: ns }]}>03</Text>
          <LinearGradient colors={GRADIENTS.accent} style={styles.labelLine} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
          <Text style={styles.labelText}>CAPABILITIES</Text>
        </View>
        <Text style={[styles.sectionTitle, { fontSize: ts, lineHeight: tlh, letterSpacing: tls }]}>Technical Strength</Text>
        <Text style={[styles.sectionSub, { fontSize: ss }]}>Core skills shaping every solution I build.</Text>

        {/* Level legend */}
        <View style={styles.legend}>
          {legend.map(({ lvl, color, bg, border, dot }) => (
            <View key={lvl} style={[styles.legendBadge, { backgroundColor: bg, borderColor: border }]}>
              <View style={[styles.levelDot, { backgroundColor: dot }]} />
              <Text style={[styles.legendText, { color }]}>{lvl}</Text>
            </View>
          ))}
        </View>
      </AnimatedSection>

      {/* Skills grid */}
      <View style={[styles.grid, cols === 2 && styles.gridWide]}>
        {SKILLS.map((skill, i) => (
          <AnimatedSection
            key={skill.label}
            delay={i * 80}
            direction={i % 2 === 0 ? 'left' : 'right'}
            style={[styles.gridItem, cols === 2 && styles.gridItemWide]}
          >
            <SkillCard
              label={skill.label}
              level={skill.level}
              color={skill.color}
              description={skill.description}
              reduceMotion={reduceMotion}
            />
          </AnimatedSection>
        ))}
      </View>

      {/* Tech Stack */}
      <AnimatedSection delay={160}>
        <View style={styles.stackHeader}>
          <Text style={styles.subTitle}>Tech Stack</Text>
          <View style={styles.stackLine} />
        </View>
        <View style={styles.techGrid}>
          {TECH.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 50} direction="up">
              <TechChip name={t.name} index={i} reduceMotion={reduceMotion} />
            </AnimatedSection>
          ))}
        </View>
      </AnimatedSection>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 36, maxWidth: 1200, alignSelf: 'center', width: '100%' },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  sectionNum: { color: 'rgba(5,150,105,0.18)', fontWeight: '900', letterSpacing: -3, marginRight: 4 },
  labelLine: { width: 32, height: 2, borderRadius: 1 },
  labelText: { color: COLORS.indigo, fontSize: 12, fontWeight: '700', letterSpacing: 3 },
  sectionTitle: { color: COLORS.textPrimary, fontWeight: '900' },
  sectionSub: { color: COLORS.textMuted, marginTop: 8 },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 18 },
  legendBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingVertical: 4, paddingHorizontal: 12,
    borderRadius: RADIUS.full, borderWidth: 1,
  },
  legendText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
  grid: { gap: 12, flexDirection: 'column' },
  gridWide: { flexDirection: 'row', flexWrap: 'wrap' },
  gridItem: { width: '100%' },
  gridItemWide: { width: '49%' },
  // Skill card
  skillCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    flexDirection: 'row',
    minHeight: 88,
    ...(Platform.OS === 'web'
      ? ({ transition: `transform ${MOTION.duration.hover}ms ease, border-color ${MOTION.duration.hover}ms ease, box-shadow ${MOTION.duration.hover}ms ease` } as any)
      : {}),
  },
  cardAccent: { width: 4, minHeight: '100%' },
  cardContent: { flex: 1, padding: 16, gap: 8 },
  cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  labelRow_: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  cardDot: { width: 8, height: 8, borderRadius: 4, flexShrink: 0 },
  cardLabel: {
    color: COLORS.textPrimary, fontSize: 14, fontWeight: '700', flex: 1,
    ...(Platform.OS === 'web' ? ({ transition: 'color 0.2s ease' } as any) : {}),
  },
  levelBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingVertical: 3, paddingHorizontal: 10,
    borderRadius: RADIUS.full, borderWidth: 1, flexShrink: 0,
  },
  levelDot: { width: 5, height: 5, borderRadius: 3 },
  levelText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  cardDesc: { color: COLORS.textMuted, fontSize: 12, lineHeight: 18 },
  // Tech stack
  subTitle: { color: COLORS.textPrimary, fontWeight: '700', fontSize: 20 },
  stackHeader: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 },
  stackLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  techGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  techCard: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 9, paddingHorizontal: 18,
    borderRadius: RADIUS.full, overflow: 'hidden',
    borderWidth: 1, borderColor: COLORS.border,
    ...(Platform.OS === 'web'
      ? ({ transition: `transform ${MOTION.duration.hover}ms ease, border-color ${MOTION.duration.hover}ms ease, box-shadow ${MOTION.duration.hover}ms ease` } as any)
      : {}),
  },
  techDot: { width: 6, height: 6, borderRadius: 3 },
  techName: { color: COLORS.textSecondary, fontSize: 13, fontWeight: '600' },
});
