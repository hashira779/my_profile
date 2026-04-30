import React, { useRef, useState } from 'react';
import { Animated, Platform, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, RADIUS } from '../constants/theme';
import { EXPERIENCE } from '../constants/data';
import AnimatedSection from './AnimatedSection';
import { sectionPadH, sectionPadV, titleSize, titleLetterSpacing, numSize, subSize } from '../utils/responsive';
import { MOTION, usePrefersReducedMotion } from '../utils/motion';

function ExpCard({
  exp,
  isLast,
  reduceMotion,
}: {
  exp: typeof EXPERIENCE[number];
  isLast: boolean;
  reduceMotion: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const hoverAnim = useRef(new Animated.Value(0)).current;

  const onIn = () => {
    setHovered(true);
    if (Platform.OS !== 'web' && !reduceMotion) {
      Animated.spring(hoverAnim, { toValue: 1, tension: 80, friction: 10, useNativeDriver: true }).start();
    }
  };

  const onOut = () => {
    setHovered(false);
    if (Platform.OS !== 'web' && !reduceMotion) {
      Animated.spring(hoverAnim, { toValue: 0, tension: 80, friction: 12, useNativeDriver: true }).start();
    }
  };

  const nativeScale = reduceMotion
    ? 1
    : hoverAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.015] });
  const webHoverStyle: any = Platform.OS === 'web'
    ? {
        transform: [{ translateY: hovered ? -5 : 0 }, { scale: hovered ? 1.01 : 1 }],
        borderColor: hovered ? `${exp.color}55` : COLORS.border,
        ...(hovered ? { boxShadow: `0 12px 36px ${exp.color}18` } : {}),
      }
    : {};

  return (
    <View style={styles.timelineItem}>
      <View style={styles.dotCol}>
        <View style={styles.dotWrap}>
          <View style={[styles.dotHalo, { backgroundColor: `${exp.color}22` }]} />
          <View style={[styles.dot, { borderColor: exp.color }]}>
            <View style={[styles.dotInner, { backgroundColor: exp.color }]} />
          </View>
        </View>
        {!isLast && <View style={styles.line} />}
      </View>

      <Pressable onHoverIn={onIn} onHoverOut={onOut} style={{ flex: 1 }}>
        <Animated.View
          style={[
            styles.card,
            webHoverStyle,
            Platform.OS !== 'web' ? { transform: [{ scale: nativeScale }] } : null,
          ]}
        >
          <LinearGradient
            colors={['rgba(14,20,54,0.0)', `${exp.color}08`]}
            style={StyleSheet.absoluteFillObject}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <Text style={styles.role}>{exp.role}</Text>
              <Text style={[styles.company, { color: exp.color }]}>{exp.company}</Text>
            </View>
            <View style={styles.cardHeaderRight}>
              <View style={[styles.typePill, { borderColor: exp.color }]}>
                <Text style={[styles.typeText, { color: exp.color }]}>{exp.type}</Text>
              </View>
              <Text style={styles.period}>{exp.period}</Text>
              <Text style={styles.location}>{exp.location}</Text>
            </View>
          </View>
          <View style={styles.highlights}>
            {exp.highlights.map((h, hi) => (
              <View key={hi} style={styles.highlightRow}>
                <View style={[styles.bullet, { backgroundColor: exp.color }]} />
                <Text style={styles.highlight}>{h}</Text>
              </View>
            ))}
          </View>
          <View style={styles.detailGrid}>
            <View style={styles.detailCol}>
              <Text style={styles.detailTitle}>Core Responsibilities</Text>
              {exp.responsibilities.map((item) => (
                <View key={item} style={styles.responsibilityRow}>
                  <Text style={[styles.checkMark, { color: exp.color }]}>+</Text>
                  <Text style={styles.responsibilityText}>{item}</Text>
                </View>
              ))}
            </View>
            <View style={styles.detailCol}>
              <Text style={styles.detailTitle}>Tools & Systems</Text>
              <View style={styles.techWrap}>
                {exp.tech.map((item) => (
                  <View key={item} style={[styles.techPill, { borderColor: `${exp.color}40`, backgroundColor: `${exp.color}12` }]}>
                    <Text style={[styles.techText, { color: exp.color }]}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
}

export default function ExperienceSection() {
  const { width } = useWindowDimensions();
  const reduceMotion = usePrefersReducedMotion();
  const ph = sectionPadH(width);
  const pv = sectionPadV(width);
  const ts = titleSize(width);
  const tls = titleLetterSpacing(width);
  const ns = numSize(width);
  const ss = subSize(width);

  return (
    <View style={[styles.wrapper, { paddingHorizontal: ph, paddingVertical: pv }]}>
      <AnimatedSection>
        <View style={styles.labelRow}>
          <Text style={[styles.sectionNum, { fontSize: ns, lineHeight: ns }]}>04</Text>
          <LinearGradient colors={GRADIENTS.accent} style={styles.labelLine} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
          <Text style={styles.labelText}>CAREER</Text>
        </View>
        <Text style={[styles.sectionTitle, { fontSize: ts, letterSpacing: tls }]}>Experience</Text>
        <Text style={[styles.sectionSub, { fontSize: ss }]}>Where I've put the work in.</Text>
      </AnimatedSection>

      <View style={styles.timeline}>
        {EXPERIENCE.map((exp, i) => (
          <AnimatedSection key={exp.company} delay={i * 120} direction="left">
            <ExpCard exp={exp} isLast={i === EXPERIENCE.length - 1} reduceMotion={reduceMotion} />
          </AnimatedSection>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 36, maxWidth: 1200, alignSelf: 'center', width: '100%' },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  sectionNum: { color: 'rgba(124,58,237,0.18)', fontWeight: '900', letterSpacing: -3, marginRight: 4 },
  labelLine: { width: 32, height: 2, borderRadius: 1 },
  labelText: { color: COLORS.indigo, fontSize: 12, fontWeight: '700', letterSpacing: 3 },
  sectionTitle: { color: COLORS.textPrimary, fontWeight: '900' },
  sectionSub: { color: COLORS.textMuted, marginTop: 8 },
  timeline: { gap: 0 },
  timelineItem: { flexDirection: 'row', gap: 20, marginBottom: 28 },
  dotCol: { alignItems: 'center', paddingTop: 4, width: 24 },
  dotWrap: { alignItems: 'center', justifyContent: 'center' },
  dotHalo: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    ...(Platform.OS === 'web' ? ({ filter: 'blur(8px)' } as any) : {}),
  },
  dot: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' },
  dotInner: { width: 8, height: 8, borderRadius: 4 },
  line: { flex: 1, width: 2, backgroundColor: COLORS.border, marginTop: 6 },
  card: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xl,
    padding: 24,
    gap: 16,
    overflow: 'hidden',
    ...(Platform.OS === 'web'
      ? ({
          backdropFilter: 'blur(12px)',
          transition: `transform ${MOTION.duration.hover}ms ease, box-shadow 220ms ease, border-color 220ms ease`,
          boxShadow: '0 2px 20px rgba(0,0,0,0.2)',
        } as any)
      : {}),
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 },
  cardHeaderLeft: { gap: 4, flex: 1 },
  cardHeaderRight: { gap: 4, alignItems: 'flex-end' },
  role: { color: COLORS.textPrimary, fontSize: 18, fontWeight: '700' },
  company: { fontSize: 14, fontWeight: '600' },
  typePill: { paddingVertical: 3, paddingHorizontal: 10, borderRadius: RADIUS.full, borderWidth: 1 },
  typeText: { fontSize: 11, fontWeight: '700' },
  period: { color: COLORS.textSecondary, fontSize: 13, fontWeight: '600' },
  location: { color: COLORS.textMuted, fontSize: 12 },
  highlights: { gap: 10 },
  highlightRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 8 },
  highlight: { color: COLORS.textSecondary, fontSize: 14, lineHeight: 22, flex: 1 },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  detailCol: { flex: 1, minWidth: 240, gap: 10 },
  detailTitle: { color: COLORS.textPrimary, fontSize: 13, fontWeight: '900', letterSpacing: 1, textTransform: 'uppercase' },
  responsibilityRow: { flexDirection: 'row', gap: 9, alignItems: 'flex-start' },
  checkMark: { fontSize: 13, fontWeight: '900', marginTop: 2 },
  responsibilityText: { color: COLORS.textSecondary, fontSize: 13, lineHeight: 20, flex: 1 },
  techWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  techPill: { paddingVertical: 5, paddingHorizontal: 10, borderRadius: RADIUS.full, borderWidth: 1 },
  techText: { fontSize: 11, fontWeight: '800' },
});
