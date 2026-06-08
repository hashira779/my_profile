import React from 'react';
import { Platform, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RADIUS, FONT_FAMILY } from '../constants/theme';
import { PROFILE_STATS, TECH } from '../constants/data';
import { usePrefersReducedMotion } from '../utils/motion';
import { webAnim } from '../utils/webAnimKeyframes';

const DISCIPLINES = [
  {
    no: '01',
    title: 'Systems',
    body: 'Station workflows, POS support, monitoring, and structured issue follow-up.',
    tags: ['POS', 'Support', 'Reliability'],
  },
  {
    no: '02',
    title: 'Reporting',
    body: 'Operational data, database workflows, report requests, and clear decision support.',
    tags: ['MySQL', 'Reports', 'Audits'],
  },
  {
    no: '03',
    title: 'Automation',
    body: 'Bots, workflow shortcuts, internal tools, and AI-assisted productivity systems.',
    tags: ['Python', 'Telegram', 'AI'],
  },
  {
    no: '04',
    title: 'Interfaces',
    body: 'Web portals, dashboards, maps, and practical screens for real operating teams.',
    tags: ['React', 'Dashboards', 'UX'],
  },
];

const STACK_ITEMS = [
  'System Analysis',
  'Operational Tools',
  ...TECH.map((item) => item.name),
  'Station Support',
  'Workflow Automation',
  'Internal Reporting',
];

const STACK_TRACK = [...STACK_ITEMS, ...STACK_ITEMS];

const trackBase = StyleSheet.create({
  s: { display: 'flex' as any, flexDirection: 'row', width: 'max-content' as any },
}).s;

function SectionMarker({ compact }: { compact: boolean }) {
  return (
    <View style={[styles.sectionMarker, compact && styles.sectionMarkerCompact]}>
      <Text style={styles.markerText}>[ 01 ]</Text>
      <Text style={styles.markerLabel}>Capabilities / Operations</Text>
      <View style={styles.markerLine} />
      <Text style={styles.markerText}>2024 - 2026</Text>
    </View>
  );
}

function ProofMetric({ value, label, detail, index }: { value: string; label: string; detail: string; index: number }) {
  return (
    <View style={styles.proofMetric}>
      <Text style={styles.proofIndex}>{String(index + 1).padStart(2, '0')}</Text>
      <Text style={styles.proofValue}>{value}</Text>
      <Text style={styles.proofLabel}>{label}</Text>
      <Text style={styles.proofDetail}>{detail}</Text>
    </View>
  );
}

function DisciplineCard({ item, wide }: { item: typeof DISCIPLINES[number]; wide: boolean }) {
  return (
    <View style={[styles.disciplineCard, wide && styles.disciplineCardWide]}>
      <View style={styles.disciplineNumberCol}>
        <Text style={styles.disciplineNo}>{item.no}</Text>
      </View>

      <View style={styles.disciplineCopy}>
        <View style={styles.disciplineTitleRow}>
          <Text style={styles.disciplineTitle}>{item.title}</Text>
          <Text style={styles.disciplineArrow}>{'->'}</Text>
        </View>
        <Text style={styles.disciplineBody}>{item.body}</Text>
        <View style={styles.disciplineTags}>
          {item.tags.map((tag) => (
            <View key={tag} style={styles.disciplineTag}>
              <Text style={styles.disciplineTagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

export default function MarqueeBanner() {
  const { width } = useWindowDimensions();
  const reduceMotion = usePrefersReducedMotion();
  const isWide = width >= 980;
  const isCompact = width < 640;
  const titleSize = width >= 1180 ? 64 : width >= 760 ? 52 : width >= 460 ? 40 : 32;
  const titleLine = width >= 1180 ? 68 : width >= 760 ? 56 : width >= 460 ? 45 : 37;
  const visibleStats = PROFILE_STATS.slice(0, 3);

  const stackTrackStyle: any = Platform.OS === 'web'
    ? [trackBase, reduceMotion ? null : webAnim.marquee('54s')]
    : { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' };

  return (
    <View style={styles.wrapper}>
      <View style={[styles.backgroundGrain, { pointerEvents: 'none' } as any]} />
      <View style={[styles.floatShapeA, { pointerEvents: 'none' } as any]} />
      <View style={[styles.floatShapeB, { pointerEvents: 'none' } as any]} />

      <View style={styles.inner}>
        <SectionMarker compact={isCompact} />

        <View style={[styles.heroRow, isWide && styles.heroRowWide]}>
          <View style={styles.titleBlock}>
            <Text style={[styles.kicker]}>Digital operations studio</Text>
            <Text style={[styles.introTitle, { fontSize: titleSize, lineHeight: titleLine }]}>
              I build practical digital systems for real operating teams.
            </Text>
          </View>

          <View style={styles.copyPanel}>
            <Text style={styles.copyEyebrow}>What this section shows</Text>
            <Text style={styles.introCopy}>
              A focused mix of system analysis, internal tools, data workflows, and automation, presented with the same editorial confidence as the reference studio style.
            </Text>
            <View style={styles.copyCta}>
              <Text style={styles.copyCtaText}>Selected capabilities</Text>
              <Text style={styles.copyCtaArrow}>{'->'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.proofGrid}>
          {visibleStats.map((stat, index) => (
            <ProofMetric key={stat.label} value={stat.value} label={stat.label} detail={stat.detail} index={index} />
          ))}
        </View>

        <View style={styles.disciplineGrid}>
          {DISCIPLINES.map((item) => (
            <DisciplineCard key={item.no} item={item} wide={isWide} />
          ))}
        </View>
      </View>

      <View style={styles.stackRail}>
        {Platform.OS === 'web' && (
          <>
            <View style={[StyleSheet.absoluteFillObject, styles.fadeLeft, { pointerEvents: 'none' } as any]} />
            <View style={[StyleSheet.absoluteFillObject, styles.fadeRight, { pointerEvents: 'none' } as any]} />
          </>
        )}
        <View style={styles.stackOverflow}>
          <View style={stackTrackStyle}>
            {STACK_TRACK.map((item, index) => (
              <View key={`${item}-${index}`} style={styles.stackItem}>
                <Text style={styles.stackIndex}>{String((index % STACK_ITEMS.length) + 1).padStart(2, '0')}</Text>
                <Text style={styles.stackText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <LinearGradient
        colors={['rgba(24,24,22,0)', 'rgba(24,24,22,0.32)', 'rgba(24,24,22,0)']}
        style={styles.bottomRule}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    </View>
  );
}

const softShadow = Platform.OS === 'web'
  ? ({ boxShadow: '0 28px 80px rgba(42,35,24,0.10)' } as any)
  : {};

const railShadow = Platform.OS === 'web'
  ? ({ boxShadow: '0 22px 70px rgba(24,24,22,0.16)' } as any)
  : {};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingTop: 34,
    paddingBottom: 28,
    backgroundColor: '#EDE6D8',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(24,24,22,0.13)',
  },
  backgroundGrain: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.55,
    ...(Platform.OS === 'web'
      ? ({
          backgroundImage:
            'radial-gradient(circle at 18% 14%, rgba(255,255,255,0.62), transparent 28%), radial-gradient(circle at 86% 22%, rgba(163,118,57,0.16), transparent 28%), linear-gradient(135deg, rgba(255,255,255,0.28), transparent 38%)',
        } as any)
      : {}),
  },
  floatShapeA: {
    position: 'absolute',
    top: -96,
    right: '9%',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(24,24,22,0.055)',
    ...(Platform.OS === 'web' ? ({ filter: 'blur(18px)' } as any) : {}),
  },
  floatShapeB: {
    position: 'absolute',
    bottom: -110,
    left: '7%',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(147,103,43,0.12)',
    ...(Platform.OS === 'web' ? ({ filter: 'blur(30px)' } as any) : {}),
  },
  inner: {
    width: '100%',
    maxWidth: 1180,
    alignSelf: 'center',
    gap: 22,
  },
  sectionMarker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(24,24,22,0.16)',
  },
  sectionMarkerCompact: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  markerText: {
    color: 'rgba(24,24,22,0.58)',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    fontFamily: FONT_FAMILY.accent,
  },
  markerLabel: {
    color: '#181816',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    fontFamily: FONT_FAMILY.accent,
  },
  markerLine: {
    flex: 1,
    minWidth: 70,
    height: 1,
    backgroundColor: 'rgba(24,24,22,0.18)',
  },
  heroRow: {
    gap: 18,
  },
  heroRowWide: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  titleBlock: {
    flex: 1.25,
    justifyContent: 'space-between',
    minHeight: 268,
  },
  kicker: {
    color: 'rgba(24,24,22,0.60)',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    fontFamily: FONT_FAMILY.accent,
  },
  introTitle: {
    color: '#181816',
    fontWeight: '900',
    letterSpacing: -3.2,
    maxWidth: 790,
    marginTop: 20,
    fontFamily: FONT_FAMILY.header,
  },
  copyPanel: {
    flex: 0.74,
    minHeight: 268,
    justifyContent: 'space-between',
    padding: 24,
    borderRadius: 30,
    backgroundColor: 'rgba(255,251,242,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(24,24,22,0.12)',
    ...softShadow,
  },
  copyEyebrow: {
    color: 'rgba(24,24,22,0.52)',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontFamily: FONT_FAMILY.accent,
  },
  introCopy: {
    color: 'rgba(24,24,22,0.72)',
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '600',
    marginTop: 16,
    fontFamily: FONT_FAMILY.body,
  },
  copyCta: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: RADIUS.full,
    backgroundColor: '#181816',
    marginTop: 24,
  },
  copyCtaText: {
    color: '#FFF8EA',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.3,
    fontFamily: FONT_FAMILY.accent,
  },
  copyCtaArrow: {
    color: '#FFF8EA',
    fontSize: 13,
    fontWeight: '900',
  },
  proofGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(24,24,22,0.17)',
  },
  proofMetric: {
    flexGrow: 1,
    flexBasis: 220,
    minHeight: 126,
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRightWidth: 1,
    borderRightColor: 'rgba(24,24,22,0.12)',
    justifyContent: 'space-between',
  },
  proofIndex: {
    color: 'rgba(24,24,22,0.34)',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.4,
    fontFamily: FONT_FAMILY.accent,
  },
  proofValue: {
    color: '#181816',
    fontSize: 34,
    lineHeight: 37,
    fontWeight: '900',
    letterSpacing: -1.7,
    marginTop: 14,
    fontFamily: FONT_FAMILY.header,
  },
  proofLabel: {
    color: '#181816',
    fontSize: 13,
    fontWeight: '900',
    marginTop: 8,
    fontFamily: FONT_FAMILY.header,
  },
  proofDetail: {
    color: 'rgba(24,24,22,0.54)',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '600',
    marginTop: 5,
    maxWidth: 250,
    fontFamily: FONT_FAMILY.body,
  },
  disciplineGrid: {
    gap: 10,
  },
  disciplineCard: {
    gap: 16,
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderRadius: 28,
    backgroundColor: '#F6EFE1',
    borderWidth: 1,
    borderColor: 'rgba(24,24,22,0.13)',
    ...softShadow,
  },
  disciplineCardWide: {
    flexDirection: 'row',
    alignItems: 'stretch',
    minHeight: 148,
  },
  disciplineNumberCol: {
    width: 54,
    justifyContent: 'space-between',
  },
  disciplineNo: {
    color: 'rgba(24,24,22,0.46)',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.4,
    fontFamily: FONT_FAMILY.accent,
  },
  disciplineCopy: {
    flex: 1,
  },
  disciplineTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  disciplineTitle: {
    color: '#181816',
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '900',
    letterSpacing: -1.3,
    fontFamily: FONT_FAMILY.header,
  },
  disciplineArrow: {
    color: '#181816',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.4,
  },
  disciplineBody: {
    color: 'rgba(24,24,22,0.64)',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    marginTop: 9,
    maxWidth: 760,
    fontFamily: FONT_FAMILY.body,
  },
  disciplineTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginTop: 18,
  },
  disciplineTag: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(24,24,22,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(24,24,22,0.06)',
  },
  disciplineTagText: {
    color: '#181816',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    fontFamily: FONT_FAMILY.accent,
  },
  stackRail: {
    position: 'relative',
    maxWidth: 1180,
    width: '100%',
    alignSelf: 'center',
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: 'rgba(24,24,22,0.18)',
    backgroundColor: '#181816',
    overflow: 'hidden',
    marginTop: 24,
    marginBottom: 22,
    ...railShadow,
  },
  stackOverflow: {
    overflow: 'hidden',
  },
  fadeLeft: {
    zIndex: 5,
    ...(Platform.OS === 'web'
      ? ({ backgroundImage: 'linear-gradient(90deg, #181816 0%, rgba(24,24,22,0.86) 18%, transparent 34%)' } as any)
      : {}),
  },
  fadeRight: {
    zIndex: 5,
    ...(Platform.OS === 'web'
      ? ({ backgroundImage: 'linear-gradient(270deg, #181816 0%, rgba(24,24,22,0.86) 18%, transparent 34%)' } as any)
      : {}),
  },
  stackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  stackIndex: {
    color: 'rgba(255,248,234,0.38)',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.1,
    fontFamily: FONT_FAMILY.accent,
  },
  stackText: {
    color: '#FFF8EA',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    fontFamily: FONT_FAMILY.accent,
  },
  bottomRule: {
    height: 1,
    width: '100%',
  },
});
