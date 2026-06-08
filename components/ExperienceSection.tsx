import React, { useRef, useState } from 'react';
import { Animated, Platform, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { RADIUS, FONT_FAMILY } from '../constants/theme';
import { EXPERIENCE } from '../constants/data';
import AnimatedSection from './AnimatedSection';
import { numSize, sectionPadH, sectionPadV, subSize, titleLetterSpacing, titleLineH, titleSize } from '../utils/responsive';
import { MOTION, usePrefersReducedMotion } from '../utils/motion';

export default function ExperienceSection() {
  const { colors, gradients, isDark } = useTheme();
  const { width } = useWindowDimensions();
  const reduceMotion = usePrefersReducedMotion();
  const ph = sectionPadH(width);
  const pv = sectionPadV(width);
  const ts = titleSize(width);
  const tlh = titleLineH(width);
  const tls = titleLetterSpacing(width);
  const ns = numSize(width);
  const ss = subSize(width);

  const styles = getStyles(colors, isDark);

  return (
    <View style={[styles.wrapper, { paddingHorizontal: ph, paddingVertical: pv }]}>
      <AnimatedSection>
        <View style={styles.labelRow}>
          <Text style={[styles.sectionNum, { fontSize: ns, lineHeight: ns }]}>04</Text>
          <LinearGradient colors={gradients.accent} style={styles.labelLine} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
          <Text style={styles.labelText}>CAREER</Text>
        </View>
        <Text style={[styles.sectionTitle, { fontSize: ts, lineHeight: tlh, letterSpacing: tls }]}>Experience shaped by operations.</Text>
        <Text style={[styles.sectionSub, { fontSize: ss }]}>Work focused on supporting real station environments and improving internal workflows.</Text>
      </AnimatedSection>

      <View style={styles.timeline}>
        {EXPERIENCE.map((exp, i) => (
          <AnimatedSection key={exp.company} delay={i * 120} direction="up">
            <ExpCard exp={exp} isLast={i === EXPERIENCE.length - 1} reduceMotion={reduceMotion} styles={styles} colors={colors} />
          </AnimatedSection>
        ))}
      </View>
    </View>
  );
}

function ExpCard({
  exp,
  isLast,
  reduceMotion,
  styles,
  colors,
}: {
  exp: typeof EXPERIENCE[number];
  isLast: boolean;
  reduceMotion: boolean;
  styles: any;
  colors: any;
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

  const nativeScale = reduceMotion ? 1 : hoverAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.01] });
  const webHoverStyle: any = Platform.OS === 'web'
    ? {
        transform: [{ translateY: hovered ? -8 : 0 }, { scale: hovered ? 1.015 : 1 }],
        borderColor: hovered ? `${exp.color}45` : styles.card.borderColor,
        boxShadow: hovered ? `0 34px 90px ${exp.color}14` : 'none',
        transition: 'all 240ms cubic-bezier(0.25, 0.8, 0.25, 1)',
      }
    : {};

  return (
    <View style={styles.timelineItem}>
      <View style={styles.dotCol}>
        <View style={[styles.dot, { borderColor: exp.color }]}>
          <View style={[styles.dotInner, { backgroundColor: exp.color }]} />
        </View>
        {!isLast && <View style={styles.line} />}
      </View>

      <Pressable onHoverIn={onIn} onHoverOut={onOut} style={{ flex: 1 }}>
        <Animated.View style={[styles.card, webHoverStyle, Platform.OS !== 'web' ? { transform: [{ scale: nativeScale }] } : null]}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <Text style={styles.role}>{exp.role}</Text>
              <Text style={[styles.company, { color: exp.color }]}>{exp.company}</Text>
            </View>
            <View style={styles.cardHeaderRight}>
              <View style={[styles.typePill, { backgroundColor: `${exp.color}12` }]}>
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
              <Text style={styles.detailTitle}>Core responsibilities</Text>
              {exp.responsibilities.map((item) => (
                <View key={item} style={styles.responsibilityRow}>
                  <Text style={[styles.checkMark, { color: exp.color }]}>+</Text>
                  <Text style={styles.responsibilityText}>{item}</Text>
                </View>
              ))}
            </View>
            <View style={styles.detailCol}>
              <Text style={styles.detailTitle}>Tools and systems</Text>
              <View style={styles.techWrap}>
                {exp.tech.map((item) => (
                  <View key={item} style={[styles.techPill, { backgroundColor: `${exp.color}10` }]}>
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

const getStyles = (colors: any, isDark: boolean) => {
  const cardShadow = Platform.OS === 'web'
    ? ({ boxShadow: isDark ? '0 22px 70px rgba(0,0,0,0.40)' : '0 22px 70px rgba(0,0,0,0.04)' } as any)
    : {};

  return StyleSheet.create({
    wrapper: { gap: 34, maxWidth: 1180, alignSelf: 'center', width: '100%' },
    labelRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
    sectionNum: { color: colors.textMuted, fontWeight: '800', letterSpacing: 0, marginRight: 2, fontFamily: FONT_FAMILY.accent },
    labelLine: { width: 28, height: 1, borderRadius: 1 },
    labelText: { color: colors.textSecondary, fontSize: 12, fontWeight: '700', letterSpacing: 1.2, fontFamily: FONT_FAMILY.accent },
    sectionTitle: { color: colors.textPrimary, fontWeight: '900', maxWidth: 760, fontFamily: FONT_FAMILY.header },
    sectionSub: { color: colors.textMuted, marginTop: 10, lineHeight: 28, maxWidth: 680, fontFamily: FONT_FAMILY.body },
    timeline: { gap: 0 },
    timelineItem: { flexDirection: 'row', gap: 18, marginBottom: 28 },
    dotCol: { alignItems: 'center', paddingTop: 16, width: 24 },
    dot: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg },
    dotInner: { width: 7, height: 7, borderRadius: 4 },
    line: { flex: 1, width: 2, backgroundColor: colors.border, marginTop: 8 },
    card: {
      flex: 1,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: RADIUS.xl,
      padding: 26,
      gap: 18,
      overflow: 'hidden',
      ...cardShadow,
      ...(Platform.OS === 'web' ? ({ transition: `transform ${MOTION.duration.hover}ms ease, box-shadow 220ms ease, border-color 220ms ease` } as any) : {}),
    },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 },
    cardHeaderLeft: { gap: 5, flex: 1, minWidth: 240 },
    cardHeaderRight: { gap: 5, alignItems: 'flex-end' },
    role: { color: colors.textPrimary, fontSize: 24, lineHeight: 29, fontWeight: '900', letterSpacing: -0.8, fontFamily: FONT_FAMILY.header },
    company: { fontSize: 15, fontWeight: '900', fontFamily: FONT_FAMILY.header },
    typePill: { paddingVertical: 5, paddingHorizontal: 11, borderRadius: RADIUS.full },
    typeText: { fontSize: 11, fontWeight: '900', letterSpacing: 0.4, textTransform: 'uppercase', fontFamily: FONT_FAMILY.accent },
    period: { color: colors.textSecondary, fontSize: 13, fontWeight: '800', fontFamily: FONT_FAMILY.body },
    location: { color: colors.textMuted, fontSize: 12, fontWeight: '600', fontFamily: FONT_FAMILY.body },
    highlights: { gap: 10 },
    highlightRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
    bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 8 },
    highlight: { color: colors.textSecondary, fontSize: 14, lineHeight: 22, flex: 1, fontWeight: '600', fontFamily: FONT_FAMILY.body },
    detailGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 18, paddingTop: 6, borderTopWidth: 1, borderTopColor: colors.border },
    detailCol: { flex: 1, minWidth: 240, gap: 10 },
    detailTitle: { color: colors.textPrimary, fontSize: 12, fontWeight: '900', letterSpacing: 1.2, textTransform: 'uppercase', fontFamily: FONT_FAMILY.accent },
    responsibilityRow: { flexDirection: 'row', gap: 9, alignItems: 'flex-start' },
    checkMark: { fontSize: 13, fontWeight: '900', marginTop: 2, fontFamily: FONT_FAMILY.accent },
    responsibilityText: { color: colors.textSecondary, fontSize: 13, lineHeight: 20, flex: 1, fontWeight: '600', fontFamily: FONT_FAMILY.body },
    techWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    techPill: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: RADIUS.full },
    techText: { fontSize: 11, fontWeight: '900', fontFamily: FONT_FAMILY.body },
  });
};
