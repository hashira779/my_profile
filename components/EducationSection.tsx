import React from 'react';
import { Image, Platform, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, RADIUS } from '../constants/theme';
import { EDUCATION, LEARNING_FOCUS, TOOLS } from '../constants/data';
import AnimatedSection from './AnimatedSection';
import UniversityBadge from './UniversityBadge';
import { sectionPadH, sectionPadV, titleSize, titleLetterSpacing, numSize, subSize, bodySize, cardPad } from '../utils/responsive';

// Local logo assets — keyed by institution name
const LOCAL_LOGOS: Record<string, any> = {
  'Royal University of Phnom Penh': require('../assets/education/rupp.png'),
};


const TOOL_LEVEL_COLOR: Record<string, string> = {
  Excellent: COLORS.emerald,
  Good: COLORS.sky,
  Proficient: COLORS.indigo,
};

export default function EducationSection() {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const ph = sectionPadH(width);
  const pv = sectionPadV(width);
  const ts = titleSize(width);
  const tls = titleLetterSpacing(width);
  const ns = numSize(width);
  const ss = subSize(width);
  const bs = bodySize(width);
  const cp = cardPad(width);

  return (
    <View style={[styles.wrapper, { paddingHorizontal: ph, paddingVertical: pv }]}>
      <AnimatedSection>
        <View style={styles.labelRow}>
          <Text style={[styles.sectionNum, { fontSize: ns, lineHeight: ns }]}>05</Text>
          <LinearGradient colors={GRADIENTS.accent} style={styles.labelLine} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
          <Text style={styles.labelText}>BACKGROUND</Text>
        </View>
        <Text style={[styles.sectionTitle, { fontSize: ts, letterSpacing: tls }]}>Education & Tools</Text>
        <Text style={[styles.sectionSub, { fontSize: ss }]}>The foundation and the tools I work with.</Text>
      </AnimatedSection>
      <View style={[styles.grid, isWide && { flexDirection: 'row' }]}>
        <AnimatedSection style={[styles.card, isWide && { flex: 1 }, { padding: cp }]} delay={100} direction="left">
          <Text style={[styles.cardTitle, { fontSize: bs + 2 }]}>Education</Text>
          {EDUCATION.map((edu, i) => {
            const badge = (edu as any).badge;
            const localLogo = LOCAL_LOGOS[edu.institution];
            return (
              <View key={edu.institution} style={[styles.eduItem, i > 0 && { marginTop: 20, paddingTop: 20, borderTopWidth: 1, borderTopColor: COLORS.border }]}>
                {localLogo ? (
                  <View style={[styles.logoWrap, { borderColor: `${edu.color}30` }]}>
                    <Image source={localLogo} style={styles.logoImg} resizeMode="contain" />
                  </View>
                ) : (
                  <UniversityBadge
                    initials={badge?.initials ?? edu.institution.slice(0, 1)}
                    color={edu.color}
                    bgFrom={badge?.bgFrom}
                    bgTo={badge?.bgTo}
                    size={52}
                  />
                )}
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={[styles.institution, { fontSize: bs }]}>{edu.institution}</Text>
                  <Text style={[styles.degree, { color: edu.color }]}>{edu.degree}</Text>
                  <Text style={styles.period}>{edu.period}</Text>
                </View>
              </View>
            );
          })}
        </AnimatedSection>
        <AnimatedSection style={[styles.card, isWide && { flex: 1 }, { padding: cp }]} delay={200} direction="right">
          <Text style={[styles.cardTitle, { fontSize: bs + 2 }]}>Tools & Productivity</Text>
          <View style={styles.toolsGrid}>
            {TOOLS.map((tool) => {
              const levelColor = TOOL_LEVEL_COLOR[tool.level] || COLORS.indigo;
              return (
                <View key={tool.name} style={styles.toolItem}>
                  <Text style={[styles.toolName, { fontSize: bs - 1 }]}>{tool.name}</Text>
                  <View style={[styles.levelBadge, { backgroundColor: `${levelColor}18`, borderColor: `${levelColor}44` }]}>
                    <Text style={[styles.levelText, { color: levelColor }]}>{tool.level}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </AnimatedSection>
      </View>
      <AnimatedSection style={[styles.card, { padding: cp }]} delay={260} direction="up">
        <View style={styles.focusHeader}>
          <Text style={[styles.cardTitle, { fontSize: bs + 2 }]}>Current Learning Focus</Text>
          <Text style={styles.focusSub}>Areas I am improving to build stronger production tools.</Text>
        </View>
        <View style={[styles.focusGrid, isWide && { flexDirection: 'row', flexWrap: 'wrap' }]}>
          {LEARNING_FOCUS.map((item) => (
            <View key={item.name} style={[styles.focusItem, isWide && { width: '48.5%' }]}>
              <View style={[styles.focusDot, { backgroundColor: item.color }]} />
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={styles.focusName}>{item.name}</Text>
                <Text style={styles.focusDetail}>{item.detail}</Text>
              </View>
            </View>
          ))}
        </View>
      </AnimatedSection>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 36, maxWidth: 1200, alignSelf: 'center', width: '100%' },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  sectionNum: { color: 'rgba(217,119,6,0.18)', fontWeight: '900', letterSpacing: -3, marginRight: 4 },
  labelLine: { width: 32, height: 2, borderRadius: 1 },
  labelText: { color: COLORS.indigo, fontSize: 12, fontWeight: '700', letterSpacing: 3 },
  sectionTitle: { color: COLORS.textPrimary, fontWeight: '900' },
  sectionSub: { color: COLORS.textMuted, marginTop: 8 },
  grid: { gap: 20, flexDirection: 'column' },
  card: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xl,
    gap: 16,
    ...(Platform.OS === 'web' ? ({ backdropFilter: 'blur(12px)' } as any) : {}),
  },
  cardTitle: { color: COLORS.textPrimary, fontWeight: '700' },
  eduItem: { flexDirection: 'row', gap: 14, alignItems: 'center' },
  logoWrap: {
    width: 58, height: 58, borderRadius: 12,
    borderWidth: 1, overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  logoImg: { width: 52, height: 52 },
  institution: { color: COLORS.textPrimary, fontWeight: '700' },
  degree: { fontSize: 13, fontWeight: '600' },
  period: { color: COLORS.textMuted, fontSize: 12, fontWeight: '600' },
  toolsGrid: { gap: 8 },
  toolItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  toolName: { color: COLORS.textSecondary, fontWeight: '500' },
  levelBadge: { paddingVertical: 3, paddingHorizontal: 10, borderRadius: RADIUS.full, borderWidth: 1 },
  levelText: { fontSize: 11, fontWeight: '700' },
  focusHeader: { gap: 6 },
  focusSub: { color: COLORS.textMuted, fontSize: 13, lineHeight: 20 },
  focusGrid: { gap: 12, flexDirection: 'column' },
  focusItem: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: 'rgba(255,255,255,0.025)',
  },
  focusDot: { width: 10, height: 10, borderRadius: 5, marginTop: 5 },
  focusName: { color: COLORS.textPrimary, fontSize: 14, fontWeight: '800' },
  focusDetail: { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18 },
});
