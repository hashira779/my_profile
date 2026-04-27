import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, RADIUS } from '../constants/theme';
import { SKILLS, TECH } from '../constants/data';
import AnimatedSection from './AnimatedSection';
import { sectionPadH, sectionPadV, titleSize, titleLineH, titleLetterSpacing, numSize, subSize } from '../utils/responsive';
import { MOTION, usePrefersReducedMotion } from '../utils/motion';

const CHIP_COLORS = ['#818CF8', '#38BDF8', '#A78BFA', '#34D399', '#FB7185', '#FBBF24'];

function TechChip({ name, index, reduceMotion }: { name: string; index: number; reduceMotion: boolean }) {
  const [hovered, setHovered] = useState(false);
  const hoverAnim = useRef(new Animated.Value(0)).current;
  const chipColor = CHIP_COLORS[index % CHIP_COLORS.length];

  const onIn = () => {
    setHovered(true);
    if (Platform.OS !== 'web' && !reduceMotion) {
      Animated.spring(hoverAnim, { toValue: 1, tension: 90, friction: 9, useNativeDriver: true }).start();
    }
  };

  const onOut = () => {
    setHovered(false);
    if (Platform.OS !== 'web' && !reduceMotion) {
      Animated.spring(hoverAnim, { toValue: 0, tension: 90, friction: 12, useNativeDriver: true }).start();
    }
  };

  const nativeScale = reduceMotion
    ? 1
    : hoverAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] });
  const webHoverStyle: any = Platform.OS === 'web'
    ? {
        transform: [{ scale: hovered ? 1.04 : 1 }],
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
        <LinearGradient
          colors={['rgba(20,28,68,0.9)', 'rgba(12,17,45,0.95)']}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={[styles.techDot, { backgroundColor: chipColor }]} />
        <Text style={styles.techName}>{name}</Text>
      </Animated.View>
    </Pressable>
  );
}

function SkillBar({
  label,
  level,
  color,
  delay,
  reduceMotion,
}: {
  label: string;
  level: number;
  color: string;
  delay: number;
  reduceMotion: boolean;
}) {
  const barWidth = useRef(new Animated.Value(0)).current;
  const barOpacity = useRef(new Animated.Value(0)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const [displayPct, setDisplayPct] = useState(reduceMotion ? level : 0);
  const viewRef = useRef(null);
  const triggered = useRef(false);

  const trigger = useCallback(() => {
    if (triggered.current) return;
    triggered.current = true;

    if (reduceMotion) {
      barOpacity.setValue(1);
      barWidth.setValue(level);
      shimmerAnim.setValue(0);
      setDisplayPct(level);
      return;
    }

    const listenerId = barWidth.addListener(({ value }) => setDisplayPct(Math.round(value)));

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(barOpacity, { toValue: 1, duration: 300, useNativeDriver: false }),
        Animated.timing(barWidth, {
          toValue: level,
          duration: 1100,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
      ]).start(() => {
        barWidth.removeListener(listenerId);
        Animated.sequence([
          Animated.delay(120),
          Animated.timing(shimmerAnim, {
            toValue: 1,
            duration: 900,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(shimmerAnim, { toValue: 0, duration: 0, useNativeDriver: true }),
        ]).start();
      });
    }, delay);
  }, [barOpacity, barWidth, delay, level, reduceMotion, shimmerAnim]);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      trigger();
      return;
    }

    const el = viewRef.current as unknown as Element;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trigger();
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger]);

  const widthInterp = barWidth.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] });
  const shimmerX = shimmerAnim.interpolate({ inputRange: [0, 1], outputRange: ['-100%', '220%'] });

  return (
    <View ref={viewRef} style={styles.skillItem}>
      <View style={styles.skillHeader}>
        <View style={styles.skillLabelRow}>
          <View style={[styles.skillDot, { backgroundColor: color }]} />
          <Text style={styles.skillLabel}>{label}</Text>
        </View>
        <View style={[styles.pctBadge, { backgroundColor: `${color}18`, borderColor: `${color}44` }]}>
          <Text style={[styles.skillPct, { color }]}>{displayPct}%</Text>
        </View>
      </View>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, { width: widthInterp }]}>
          <LinearGradient
            colors={[color, `${color}99`]}
            style={StyleSheet.absoluteFillObject}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
          {!reduceMotion && (
            <Animated.View style={[styles.shimmer, { transform: [{ translateX: shimmerX }] }]} />
          )}
          <Animated.View
            style={[
              styles.glowEdge,
              {
                backgroundColor: color,
                opacity: barOpacity,
                ...(Platform.OS === 'web'
                  ? ({ boxShadow: `0 0 10px 3px ${color}66` } as any)
                  : {}),
              },
            ]}
          />
        </Animated.View>
      </View>
    </View>
  );
}

export default function SkillsSection() {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const reduceMotion = usePrefersReducedMotion();
  const ph = sectionPadH(width);
  const pv = sectionPadV(width);
  const ts = titleSize(width);
  const tlh = titleLineH(width);
  const tls = titleLetterSpacing(width);
  const ns = numSize(width);
  const ss = subSize(width);

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
      </AnimatedSection>

      <AnimatedSection style={styles.card} delay={80}>
        <View style={[styles.barsGrid, isWide && { flexDirection: 'row', flexWrap: 'wrap' }]}>
          {SKILLS.map((skill, i) => (
            <View key={skill.label} style={[styles.barWrapper, isWide && { width: '48%' }]}>
              <SkillBar
                label={skill.label}
                level={skill.level}
                color={skill.color}
                delay={i * 90}
                reduceMotion={reduceMotion}
              />
            </View>
          ))}
        </View>
      </AnimatedSection>

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
  sectionNum: { color: 'rgba(52,211,153,0.22)', fontWeight: '900', letterSpacing: -3, marginRight: 4 },
  labelLine: { width: 32, height: 2, borderRadius: 1 },
  labelText: { color: COLORS.indigo, fontSize: 12, fontWeight: '700', letterSpacing: 3 },
  sectionTitle: { color: COLORS.textPrimary, fontWeight: '900' },
  sectionSub: { color: COLORS.textMuted, marginTop: 8 },
  subTitle: { color: COLORS.textPrimary, fontWeight: '700', fontSize: 20 },
  card: {
    backgroundColor: 'rgba(12,18,48,0.88)',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xl,
    padding: 28,
    gap: 4,
    ...(Platform.OS === 'web' ? ({ backdropFilter: 'blur(16px)', boxShadow: '0 4px 40px rgba(0,0,0,0.3)' } as any) : {}),
  },
  barsGrid: { gap: 22, flexDirection: 'column', justifyContent: 'space-between' },
  barWrapper: {},
  skillItem: { gap: 10 },
  skillHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  skillLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  skillDot: { width: 8, height: 8, borderRadius: 4 },
  skillLabel: { color: COLORS.textPrimary, fontSize: 14, fontWeight: '600' },
  pctBadge: { paddingVertical: 2, paddingHorizontal: 8, borderRadius: RADIUS.full, borderWidth: 1 },
  skillPct: { fontSize: 12, fontWeight: '800' },
  track: {
    height: 8,
    backgroundColor: 'rgba(99,102,241,0.1)',
    borderRadius: RADIUS.full,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(99,102,241,0.08)',
  },
  fill: { height: 8, borderRadius: RADIUS.full, overflow: 'hidden', position: 'relative' },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '40%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderRadius: RADIUS.full,
    ...(Platform.OS === 'web' ? ({ filter: 'blur(2px)' } as any) : {}),
  },
  glowEdge: { position: 'absolute', right: 0, top: -2, width: 10, height: 12, borderRadius: 5 },
  stackHeader: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 },
  stackLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  techGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  techCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 9,
    paddingHorizontal: 18,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...(Platform.OS === 'web'
      ? ({
          transition: `transform ${MOTION.duration.hover}ms ease, border-color ${MOTION.duration.hover}ms ease, box-shadow ${MOTION.duration.hover}ms ease`,
        } as any)
      : {}),
  },
  techDot: { width: 6, height: 6, borderRadius: 3 },
  techName: { color: COLORS.textSecondary, fontSize: 13, fontWeight: '600' },
});
