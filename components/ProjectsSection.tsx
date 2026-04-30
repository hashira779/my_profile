import React, { useRef, useState } from 'react';
import {
  Animated, Linking, Platform, Pressable,
  StyleSheet, Text, View, useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, RADIUS } from '../constants/theme';
import { PROJECTS, PROFILE } from '../constants/data';
import AnimatedSection from './AnimatedSection';
import { sectionPadH, sectionPadV, titleSize, titleLineH, titleLetterSpacing, numSize, subSize } from '../utils/responsive';
import { MOTION, usePrefersReducedMotion } from '../utils/motion';
import { glintAnim } from '../utils/webAnimKeyframes';

const STATUS_COLOR: Record<string, string> = {
  Production: '#059669',
  Live: '#2563EB',
  'Internal Tool': '#D97706',
  'In Progress': '#0EA5E9',
};

function ProjectCard({
  project,
  index,
  reduceMotion,
}: {
  project: typeof PROJECTS[number];
  index: number;
  reduceMotion: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const hoverAnim = useRef(new Animated.Value(0)).current;

  const onHoverIn = () => {
    setHovered(true);
    if (Platform.OS !== 'web' && !reduceMotion) {
      Animated.spring(hoverAnim, { toValue: 1, tension: 80, friction: 10, useNativeDriver: true }).start();
    }
  };

  const onHoverOut = () => {
    setHovered(false);
    if (Platform.OS !== 'web' && !reduceMotion) {
      Animated.spring(hoverAnim, { toValue: 0, tension: 80, friction: 12, useNativeDriver: true }).start();
    }
  };

  const nativeScale = reduceMotion
    ? 1
    : hoverAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.025] });
  const statusColor = STATUS_COLOR[project.status] ?? COLORS.indigo;
  const webHoverStyle: any = Platform.OS === 'web'
    ? {
        transform: [{ translateY: hovered ? -8 : 0 }, { scale: hovered ? 1.018 : 1 }],
        ...(hovered
          ? { boxShadow: `0 10px 48px ${project.color}28, 0 0 0 1px ${project.color}40` }
          : {}),
      }
    : {};

  return (
    <AnimatedSection
      delay={index * 100}
      direction={index % 2 === 0 ? 'left' : 'right'}
      style={styles.cardWrapper}
    >
      <Pressable
        onHoverIn={onHoverIn}
        onHoverOut={onHoverOut}
        onPress={() => project.github && Linking.openURL(project.github)}
        style={{ flex: 1 }}
      >
        <Animated.View
          style={[
            styles.card,
            webHoverStyle,
            Platform.OS !== 'web' ? { transform: [{ scale: nativeScale }] } : null,
          ]}
        >
          <View style={styles.accentBarWrap}>
            <LinearGradient
              colors={project.gradient}
              style={styles.accentBar}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </View>
          <LinearGradient
            colors={['rgba(15,23,42,0.94)', 'rgba(2,6,23,0.97)']}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={[styles.cornerGlow, { backgroundColor: project.color }]} />
          {Platform.OS === 'web' && !reduceMotion && (
            <View
              style={[styles.cardGlint, hovered && styles.cardGlintActive, { pointerEvents: 'none' } as any]}
            />
          )}

          <View style={styles.cardBody}>
            <View style={styles.cardTop}>
              <View style={[styles.projIcon, { backgroundColor: `${project.color}18`, borderColor: `${project.color}30` }]}>
                <LinearGradient colors={project.gradient} style={styles.projIconGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                  <Text style={styles.projIconText}>{project.title.slice(0, 1)}</Text>
                </LinearGradient>
              </View>
              <View style={styles.cardMeta}>
                <View style={[styles.statusBadge, { backgroundColor: `${statusColor}18`, borderColor: `${statusColor}40` }]}>
                  <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                  <Text style={[styles.statusText, { color: statusColor }]}>{project.status}</Text>
                </View>
                <Text style={styles.yearText}>{project.year}</Text>
              </View>
            </View>

            <Text style={[styles.projTitle, hovered && { color: project.color }]}>{project.title}</Text>
            <Text style={styles.projDesc} numberOfLines={5}>{project.description}</Text>

            <View style={styles.impactBlock}>
              <Text style={[styles.impactTitle, { color: project.color }]}>Impact</Text>
              {project.impact.map((item) => (
                <View key={item} style={styles.impactRow}>
                  <View style={[styles.impactDot, { backgroundColor: project.color }]} />
                  <Text style={styles.impactText}>{item}</Text>
                </View>
              ))}
            </View>

            <View style={styles.tagRow}>
              {project.tags.map((tag) => (
                <View key={tag} style={[styles.tag, { borderColor: `${project.color}35` }]}>
                  <Text style={[styles.tagText, { color: project.color }]}>{tag}</Text>
                </View>
              ))}
            </View>

            <View style={styles.linkRow}>
              {project.github ? (
                <Pressable
                  style={({ pressed, hovered: isHovered }: any) => [
                    styles.linkBtn,
                    { borderColor: `${project.color}50` },
                    (pressed || isHovered) && { backgroundColor: `${project.color}15` },
                  ]}
                  onPress={() => Linking.openURL(project.github)}
                >
                  <Text style={styles.linkIcon}>{'{ }'}</Text>
                  <Text style={[styles.linkText, { color: project.color }]}>GitHub</Text>
                </Pressable>
              ) : null}
              {project.live ? (
                <Pressable
                  style={({ pressed, hovered: isHovered }: any) => [
                    styles.linkBtn,
                    styles.liveLinkBtn,
                    (pressed || isHovered) && { opacity: 0.8 },
                  ]}
                  onPress={() => Linking.openURL(project.live)}
                >
                  <LinearGradient colors={project.gradient} style={StyleSheet.absoluteFillObject} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
                  <Text style={styles.linkIcon}>{'>'}</Text>
                  <Text style={styles.liveLinkText}>Live Demo</Text>
                </Pressable>
              ) : null}
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </AnimatedSection>
  );
}

export default function ProjectsSection() {
  const { width } = useWindowDimensions();
  const cols = width >= 1000 ? 2 : 1;
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
          <Text style={[styles.sectionNum, { fontSize: ns, lineHeight: ns }]}>02</Text>
          <LinearGradient colors={GRADIENTS.accent} style={styles.labelLine} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
          <Text style={styles.labelText}>FEATURED WORK</Text>
        </View>
        <View style={styles.titleRow}>
          <Text style={[styles.sectionTitle, { fontSize: ts, lineHeight: tlh, letterSpacing: tls }]}>Projects</Text>
          <Pressable
            style={({ pressed, hovered }: any) => [styles.githubBtn, (pressed || hovered) && styles.githubBtnHov]}
            onPress={() => Linking.openURL(PROFILE.github)}
          >
            <Text style={styles.githubBtnIcon}>{'</>'}</Text>
            <Text style={styles.githubBtnText}>View All on GitHub</Text>
            <Text style={styles.githubArrow}>→</Text>
          </Pressable>
        </View>
        <Text style={[styles.sectionSub, { fontSize: ss }]}>
          Real-world systems built and shipped at PTT (Cambodia) LTD and for personal development.
        </Text>
      </AnimatedSection>

      <View style={[styles.grid, cols === 2 && styles.gridWide]}>
        {PROJECTS.map((project, i) => (
          <View key={project.title} style={[styles.gridItem, cols === 2 && styles.gridItemWide]}>
            <ProjectCard project={project} index={i} reduceMotion={reduceMotion} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 40, maxWidth: 1200, alignSelf: 'center', width: '100%' },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  sectionNum: { color: 'rgba(37,99,235,0.18)', fontWeight: '900', letterSpacing: -3, marginRight: 4 },
  labelLine: { width: 32, height: 2, borderRadius: 1 },
  labelText: { color: COLORS.indigo, fontSize: 12, fontWeight: '700', letterSpacing: 3 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 8 },
  sectionTitle: { color: COLORS.textPrimary, fontWeight: '900' },
  sectionSub: { color: COLORS.textMuted, marginTop: 4, lineHeight: 24 },
  githubBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 9,
    paddingHorizontal: 18,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: 'rgba(37,99,235,0.07)',
  },
  githubBtnHov: { borderColor: COLORS.indigo, backgroundColor: 'rgba(37,99,235,0.12)' },
  githubBtnIcon: { color: COLORS.indigo, fontWeight: '800', fontSize: 13 },
  githubBtnText: { color: COLORS.textSecondary, fontSize: 13, fontWeight: '600' },
  githubArrow: { color: COLORS.indigo, fontSize: 13, fontWeight: '700' },
  grid: { gap: 16 },
  gridWide: { flexDirection: 'row', flexWrap: 'wrap' },
  gridItem: { width: '100%' },
  gridItemWide: { width: '49%' },
  cardWrapper: { flex: 1 },
  card: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    flex: 1,
    ...(Platform.OS === 'web'
      ? ({
          transition: `transform ${MOTION.duration.hover}ms ease, box-shadow 220ms ease`,
        } as any)
      : {}),
  },
  cardGlint: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0,
    width: '34%',
    opacity: 0,
    zIndex: 2,
    ...(Platform.OS === 'web'
      ? ({
          backgroundImage: 'linear-gradient(100deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)',
          transform: 'translateX(-220%) skewX(-18deg)',
        } as any)
      : {}),
  },
  cardGlintActive: {
    ...(Platform.OS === 'web' ? (glintAnim() as any) : {}),
  },
  accentBarWrap: { height: 3 },
  accentBar: { flex: 1 },
  cornerGlow: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 160,
    height: 160,
    borderRadius: 80,
    opacity: 0.07,
    ...(Platform.OS === 'web' ? ({ filter: 'blur(30px)' } as any) : {}),
  },
  cardBody: { padding: 22, gap: 14 },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  projIcon: { width: 48, height: 48, borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  projIconGrad: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  projIconText: { color: '#fff', fontSize: 22, fontWeight: '800' },
  cardMeta: { alignItems: 'flex-end', gap: 4 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 3, paddingHorizontal: 10, borderRadius: RADIUS.full, borderWidth: 1 },
  statusDot: { width: 5, height: 5, borderRadius: 3 },
  statusText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  yearText: { color: COLORS.textMuted, fontSize: 11, fontWeight: '600' },
  projTitle: {
    color: COLORS.textPrimary,
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: -0.3,
    ...(Platform.OS === 'web' ? ({ transition: 'color 0.2s ease' } as any) : {}),
  },
  projDesc: { color: COLORS.textSecondary, fontSize: 14, lineHeight: 22 },
  impactBlock: {
    gap: 7,
    paddingTop: 4,
    paddingBottom: 2,
  },
  impactTitle: { fontSize: 11, fontWeight: '900', letterSpacing: 1.4, textTransform: 'uppercase' },
  impactRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  impactDot: { width: 5, height: 5, borderRadius: 3, marginTop: 7 },
  impactText: { color: COLORS.textSecondary, fontSize: 12, lineHeight: 19, flex: 1 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  tag: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: RADIUS.full, borderWidth: 1, backgroundColor: 'rgba(255,255,255,0.03)' },
  tagText: { fontSize: 11, fontWeight: '700' },
  linkRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
  linkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...(Platform.OS === 'web' ? ({ transition: 'background-color 0.2s ease' } as any) : {}),
  },
  linkIcon: { color: COLORS.textMuted, fontSize: 13, fontWeight: '700' },
  linkText: { fontSize: 13, fontWeight: '700' },
  liveLinkBtn: {
    overflow: 'hidden',
    borderWidth: 0,
  },
  liveLinkText: { color: '#fff', fontSize: 13, fontWeight: '700' },
});
