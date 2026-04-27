import React, { useEffect, useRef, useState } from 'react';
import {
  Animated, Easing, Linking, Platform, Pressable,
  StyleSheet, Text, View, useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, RADIUS } from '../constants/theme';
import { PROFILE, CONTACT } from '../constants/data';
import ProfileAvatar from './ProfileAvatar';
import TypeWriter from './TypeWriter';
import { MOTION, usePrefersReducedMotion } from '../utils/motion';
const TYPEWRITER_TEXTS = [
  'System Analyst',
  'Web Developer',
  'Database Architect',
  'IT Problem Solver',
  'Automation Engineer',
];
const APPLE = Easing.bezier(0.22, 1, 0.36, 1);

// Animated stat counter
function CountUp({ target, color }: { target: string; color: string }) {
  const isNumeric = /^\d+/.test(target);
  const numPart = isNumeric ? parseInt(target, 10) : 0;
  const suffix = isNumeric ? target.replace(String(numPart), '') : target;
  const [display, setDisplay] = useState(isNumeric ? '0' : target);
  const startRef = useRef(false);
  const viewRef = useRef(null);

  useEffect(() => {
    if (!isNumeric) return;
    if (Platform.OS !== 'web') return;
    const el = viewRef.current as unknown as Element | null;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !startRef.current) {
        startRef.current = true;
        let start = 0;
        const step = Math.ceil(numPart / 40);
        const timer = setInterval(() => {
          start = Math.min(start + step, numPart);
          setDisplay(String(start));
          if (start >= numPart) clearInterval(timer);
        }, 28);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [isNumeric, numPart]);

  const counterStyle: any = Platform.OS === 'web'
    ? { animationName: 'ct-counter-up', animationDuration: '0.5s', animationFillMode: 'both' }
    : {};

  return (
    <View ref={viewRef}>
      <Text style={[styles.statVal, { color }, counterStyle]}>
        {isNumeric ? display + suffix : target}
      </Text>
    </View>
  );
}

// Floating particle (web-only)
function FloatingParticle({ x, y, color, delay, size }: { x: string; y: string; color: string; delay: number; size: number }) {
  if (Platform.OS !== 'web') return null;
  const style: any = {
    position: 'absolute', left: x, top: y,
    width: size, height: size, borderRadius: size / 2,
    backgroundColor: color, pointerEvents: 'none',
    animationName: 'ct-particle-rise',
    animationDuration: `${2.8 + Math.random() * 2}s`,
    animationDelay: `${delay}s`,
    animationTimingFunction: 'ease-out',
    animationIterationCount: 'infinite',
    animationFillMode: 'both',
  };
  return <View style={style} />;
}

const PARTICLES = [
  { x: '8%',  y: '70%', color: '#818CF8', delay: 0,   size: 4 },
  { x: '15%', y: '50%', color: '#38BDF8', delay: 0.8, size: 3 },
  { x: '5%',  y: '40%', color: '#A78BFA', delay: 1.6, size: 5 },
  { x: '20%', y: '80%', color: '#34D399', delay: 0.4, size: 3 },
  { x: '12%', y: '60%', color: '#F472B6', delay: 2.1, size: 2 },
  { x: '88%', y: '65%', color: '#818CF8', delay: 0.3, size: 4 },
  { x: '92%', y: '45%', color: '#38BDF8', delay: 1.2, size: 3 },
  { x: '85%', y: '75%', color: '#FBBF24', delay: 1.9, size: 3 },
];
export default function HeroSection() {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;
  const reduceMotion = usePrefersReducedMotion();
  // Responsive size helpers
  const nameSize   = width >= 1024 ? 82 : width >= 768 ? 62 : width >= 480 ? 48 : 38;
  const nameLH     = width >= 1024 ? 90 : width >= 768 ? 70 : width >= 480 ? 56 : 46;
  const nameLS     = width >= 768  ? -4 : -2;
  const twSize     = width >= 768  ? 22 : 18;
  const descSize   = width >= 768  ? 18 : 15;
  const descLH     = width >= 768  ? 30 : 24;
  const badgeFade    = useRef(new Animated.Value(0)).current;
  const nameFade     = useRef(new Animated.Value(0)).current;
  const nameSlide    = useRef(new Animated.Value(-24)).current;
  const twFade       = useRef(new Animated.Value(0)).current;
  const twSlide      = useRef(new Animated.Value(16)).current;
  const descFade     = useRef(new Animated.Value(0)).current;
  const btnFade      = useRef(new Animated.Value(0)).current;
  const statsFade    = useRef(new Animated.Value(0)).current;
  const avatarFade   = useRef(new Animated.Value(0)).current;
  const avatarSlide  = useRef(new Animated.Value(32)).current;
  // Floating orb animations
  const orb1Anim = useRef(new Animated.Value(0)).current;
  const orb2Anim = useRef(new Animated.Value(0)).current;
  const orb3Anim = useRef(new Animated.Value(0)).current;

  const D = MOTION.duration.hero;

  useEffect(() => {
    if (Platform.OS === 'web' || reduceMotion) {
      // On web, hero entrance handled by CSS (see webAnimStyle below), skip JS anims
      return;
    }
    // Native entrance — timing only, Apple easing, short distances
    const seq = [
      Animated.timing(badgeFade,  { toValue: 1, duration: 500,   easing: APPLE, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(nameFade,  { toValue: 1, duration: D,     easing: APPLE, useNativeDriver: true }),
        Animated.timing(nameSlide, { toValue: 0, duration: D,     easing: APPLE, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(twFade,    { toValue: 1, duration: D - 50, easing: APPLE, useNativeDriver: true }),
        Animated.timing(twSlide,   { toValue: 0, duration: D - 50, easing: APPLE, useNativeDriver: true }),
      ]),
      Animated.timing(descFade,   { toValue: 1, duration: D,     easing: APPLE, useNativeDriver: true }),
      Animated.timing(btnFade,    { toValue: 1, duration: D - 50, easing: APPLE, useNativeDriver: true }),
      Animated.timing(statsFade,  { toValue: 1, duration: D,     easing: APPLE, useNativeDriver: true }),
    ];
    Animated.stagger(80, seq).start();
    Animated.parallel([
      Animated.timing(avatarFade,  { toValue: 1, duration: D,   delay: 120, easing: APPLE, useNativeDriver: true }),
      Animated.timing(avatarSlide, { toValue: 0, duration: D,   delay: 120, easing: APPLE, useNativeDriver: true }),
    ]).start();
    // Looping orb float
    const floatOrb = (val: Animated.Value, dur: number, d: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(val, { toValue: -18, duration: dur, easing: Easing.inOut(Easing.sin), delay: d, useNativeDriver: true }),
          Animated.timing(val, { toValue: 0,   duration: dur, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ])
      ).start();
    floatOrb(orb1Anim, 3800, 0);
    floatOrb(orb2Anim, 4400, 600);
    floatOrb(orb3Anim, 3200, 1200);
  }, [APPLE, D, avatarFade, avatarSlide, badgeFade, btnFade, descFade, nameFade, nameSlide, orb1Anim, orb2Anim, orb3Anim, reduceMotion, statsFade, twFade, twSlide]);
  // Flowing gradient name (web-only CSS animation)
  const nameFlowStyle: any = Platform.OS === 'web'
    ? {
        background: 'linear-gradient(90deg, #818CF8, #38BDF8, #A78BFA, #F472B6, #818CF8)',
        backgroundSize: '300% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        ...(reduceMotion ? {} : {
          animationName: 'ct-gradient-flow',
          animationDuration: '7s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        }),
      }
    : { color: COLORS.indigo };
  // Pulse ring (web CSS)
  const pulseRingStyle: any = Platform.OS === 'web'
    ? {
        position: 'absolute', width: 12, height: 12, borderRadius: 6,
        backgroundColor: 'rgba(52,211,153,0.4)',
        ...(reduceMotion ? {} : {
          animationName: 'ct-pulse-ring',
          animationDuration: '2.2s',
          animationTimingFunction: 'ease-out',
          animationIterationCount: 'infinite',
        }),
      }
    : {};
  const stats = [
    { val: '2+', label: 'Years Exp', color: COLORS.indigo },
    { val: '20+', label: 'Stations',  color: COLORS.sky },
    { val: '3',   label: 'Languages', color: COLORS.violet },
    { val: 'PTT', label: 'Employer',  color: COLORS.emerald },
  ];
  // Orb web-float styles
  const orbFloat = (dur: string, del: string): any =>
    Platform.OS === 'web' && !reduceMotion
      ? { animationName: 'ct-float', animationDuration: dur, animationDelay: del, animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite', animationFillMode: 'both' }
      : {};
  // ── CSS animation helper (web hero entrance — runs on compositor thread) ──
  const heroAnim = (name: string, delayMs: number): any =>
    Platform.OS === 'web' && !reduceMotion
      ? {
          animationName: name,
          animationDuration: `${MOTION.duration.hero}ms`,
          animationTimingFunction: MOTION.easing.standard,
          animationDelay: `${delayMs}ms`,
          animationFillMode: 'both',
        }
      : {};

  const textContent = (
    <View style={styles.textBlock}>
      {/* Status badge */}
      <View style={[styles.statusBadge, heroAnim('ct-hero-up', 0), Platform.OS !== 'web' && { opacity: badgeFade }]}>
        <View style={styles.pulseContainer}>
          <View style={[styles.pulseRing, pulseRingStyle]} />
          <View style={styles.pulseDot} />
        </View>
        <Text style={styles.statusText}>{PROFILE.status}</Text>
      </View>
      {/* Name */}
      <View style={heroAnim('ct-hero-left', 100)}>
        <Animated.Text
          style={[styles.name, nameFlowStyle, {
            fontSize: nameSize, lineHeight: nameLH, letterSpacing: nameLS,
            ...(Platform.OS !== 'web' ? { opacity: nameFade, transform: [{ translateX: nameSlide }] } : {}),
          }]}
          numberOfLines={2}
        >
          {PROFILE.name}
        </Animated.Text>
      </View>
      {/* TypeWriter */}
      <View style={heroAnim('ct-hero-up', 220)}>
        <Animated.View style={Platform.OS !== 'web' ? { opacity: twFade, transform: [{ translateY: twSlide }] } : {}}>
          <View style={styles.twRow}>
            <Text style={[styles.twPrefix, { fontSize: twSize }]}>I am a </Text>
            <TypeWriter texts={TYPEWRITER_TEXTS} style={[styles.twText, { fontSize: twSize }]} cursorColor={COLORS.indigo} />
          </View>
        </Animated.View>
      </View>
      {/* Description */}
      <View style={heroAnim('ct-hero-up', 340)}>
        <Animated.Text style={[styles.desc, { fontSize: descSize, lineHeight: descLH }, Platform.OS !== 'web' && { opacity: descFade }]}>
          {PROFILE.tagline}
        </Animated.Text>
      </View>
      {/* CTA Buttons */}
      <View style={[styles.btnRow, heroAnim('ct-hero-up', 460)]}>
        <Pressable
          style={({ pressed, hovered }: any) => [styles.btnPrimary, (pressed || hovered) && styles.btnPrimaryHov]}
          onPress={() => Linking.openURL(`mailto:${CONTACT.email}`)}
        >
          <LinearGradient colors={['#4F46E5', '#818CF8', '#38BDF8']} style={styles.btnGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Text style={styles.btnPrimaryTxt}>Hire Me →</Text>
          </LinearGradient>
        </Pressable>
        <Pressable
          style={({ pressed, hovered }: any) => [styles.btnSec, (pressed || hovered) && styles.btnSecHov]}
          onPress={() => Linking.openURL(`tel:${CONTACT.phone}`)}
        >
          <Text style={styles.btnSecTxt}>Call Me</Text>
        </Pressable>
        <Pressable
          style={({ pressed, hovered }: any) => [styles.btnGhost, (pressed || hovered) && styles.btnGhostHov]}
          onPress={() => Linking.openURL(`mailto:${CONTACT.email}`)}
        >
          <Text style={styles.btnGhostTxt}>Download CV</Text>
        </Pressable>
      </View>
      {/* Stats */}
      <View style={heroAnim('ct-hero-up', 580)}>
        <Animated.View style={[styles.statsRow, Platform.OS !== 'web' && { opacity: statsFade }]}>
          {stats.map((s) => (
            <View key={s.label} style={styles.statItem}>
              <CountUp target={s.val} color={s.color} />
              <Text style={styles.statLbl}>{s.label}</Text>
            </View>
          ))}
        </Animated.View>
      </View>
    </View>
  );
  return (
    <View style={styles.wrapper}>
      {/* Floating particles (web) */}
      {!reduceMotion && PARTICLES.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}
      {/* Mesh grid */}
      <View style={[StyleSheet.absoluteFillObject, styles.meshBg]} pointerEvents="none" />
      {/* Orbs with float animation */}
      <Animated.View style={[styles.orb1, { transform: [{ translateY: orb1Anim }] }, orbFloat('7s', '0s')]}>
        <LinearGradient colors={['rgba(99,102,241,0.55)', 'transparent']} style={StyleSheet.absoluteFillObject} />
      </Animated.View>
      <Animated.View style={[styles.orb2, { transform: [{ translateY: orb2Anim }] }, orbFloat('9s', '1.2s')]}>
        <LinearGradient colors={['rgba(56,189,248,0.4)', 'transparent']} style={StyleSheet.absoluteFillObject} />
      </Animated.View>
      <Animated.View style={[styles.orb3, { transform: [{ translateY: orb3Anim }] }, orbFloat('6s', '2.5s')]}>
        <LinearGradient colors={['rgba(167,139,250,0.3)', 'transparent']} style={StyleSheet.absoluteFillObject} />
      </Animated.View>
      {isWide ? (
        <View style={styles.splitRow}>
          <View style={styles.leftCol}>{textContent}</View>
          <Animated.View style={[styles.rightCol, Platform.OS !== 'web'
            ? { opacity: avatarFade, transform: [{ translateX: avatarSlide }] }
            : heroAnim('ct-hero-right', 150)]}>
            <ProfileAvatar size={240} />
            <View style={styles.infoCard}>
              <LinearGradient colors={['rgba(18,25,62,0.96)', 'rgba(10,14,40,0.98)']} style={StyleSheet.absoluteFillObject} />
              {[
                { icon: 'L', label: CONTACT.location, color: COLORS.indigo },
                { icon: 'E', label: CONTACT.email, color: COLORS.sky },
                { icon: 'P', label: CONTACT.phone, color: COLORS.violet },
              ].map(({ icon, label, color }) => (
                <View key={icon} style={styles.infoRow}>
                  <View style={[styles.infoIcon, { backgroundColor: `${color}18` }]}>
                    <Text style={[styles.infoIconTxt, { color }]}>{icon}</Text>
                  </View>
                  <Text style={styles.infoTxt} numberOfLines={1}>{label}</Text>
                </View>
              ))}
            </View>
          </Animated.View>
        </View>
      ) : (
        <View style={styles.singleCol}>
          <View style={heroAnim('ct-hero-scale', 0)}>
            <Animated.View style={Platform.OS !== 'web' ? { opacity: avatarFade } : {}}>
              <ProfileAvatar size={180} />
            </Animated.View>
          </View>
          {textContent}
        </View>
      )}

      {/* Scroll-down indicator */}
      <View style={styles.scrollCue} pointerEvents="none">
        <Text style={styles.scrollCueText}>Scroll</Text>
        <Text style={[styles.scrollCueArrow, Platform.OS === 'web' ? ({
          ...(reduceMotion ? {} : {
            animationName: 'ct-scroll-cue',
            animationDuration: '1.8s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
          }),
        } as any) : {}]}>↓</Text>
        <View style={styles.scrollCueLine} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1, overflow: 'hidden',
    paddingTop: 80,
    paddingBottom: 120,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meshBg: {
    ...(Platform.OS === 'web' ? ({
      backgroundImage: `
        radial-gradient(ellipse at 15% 25%, rgba(99,102,241,0.14) 0%, transparent 50%),
        radial-gradient(ellipse at 85% 75%, rgba(56,189,248,0.1) 0%, transparent 50%),
        linear-gradient(rgba(129,140,248,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(129,140,248,0.04) 1px, transparent 1px)`,
      backgroundSize: '100% 100%, 100% 100%, 52px 52px, 52px 52px',
    } as any) : {}),
  },
  orb1: { position: 'absolute', top: -120, right: -80, width: 540, height: 540, borderRadius: 999, overflow: 'hidden' },
  orb2: { position: 'absolute', bottom: -80, left: -80, width: 460, height: 460, borderRadius: 999, overflow: 'hidden' },
  orb3: { position: 'absolute', top: '40%', left: '35%', width: 300, height: 300, borderRadius: 999, overflow: 'hidden' },
  splitRow: { flexDirection: 'row', alignItems: 'center', width: '100%', maxWidth: 1200, gap: 48, zIndex: 1 },
  leftCol: { flex: 3 },
  rightCol: { flex: 2, alignItems: 'center', gap: 20 },
  singleCol: { alignItems: 'center', gap: 24, width: '100%', maxWidth: 600, zIndex: 1 },
  textBlock: { gap: 20 },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 10, alignSelf: 'flex-start',
    paddingVertical: 7, paddingHorizontal: 16, borderRadius: RADIUS.full,
    backgroundColor: 'rgba(52,211,153,0.08)', borderWidth: 1, borderColor: 'rgba(52,211,153,0.28)',
  },
  pulseContainer: { width: 12, height: 12, alignItems: 'center', justifyContent: 'center' },
  pulseRing: { position: 'absolute', width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: 'rgba(52,211,153,0.4)' },
  pulseDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#34D399' },
  statusText: { color: '#34D399', fontSize: 11, fontWeight: '700', letterSpacing: 2 },
  name: {
    fontWeight: '900',
    color: COLORS.textPrimary,
    // fontSize/lineHeight/letterSpacing set dynamically via inline style
  },
  twRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  twPrefix: { color: COLORS.textSecondary, fontWeight: '400' },
  twText: { color: COLORS.sky, fontWeight: '700' },
  desc: { color: COLORS.textSecondary, maxWidth: 560 },
  btnRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  btnPrimary: { borderRadius: RADIUS.full, overflow: 'hidden', ...(Platform.OS === 'web' ? ({ boxShadow: '0 0 28px rgba(99,102,241,0.55)' } as any) : {}) },
  btnPrimaryHov: { opacity: 0.88 },
  btnGrad: { paddingVertical: 14, paddingHorizontal: 32, alignItems: 'center' },
  btnPrimaryTxt: { color: '#fff', fontWeight: '800', fontSize: 14, letterSpacing: 0.5 },
  btnSec: { paddingVertical: 14, paddingHorizontal: 28, borderRadius: RADIUS.full, borderWidth: 1, borderColor: COLORS.border, backgroundColor: 'rgba(99,102,241,0.07)' },
  btnSecHov: { borderColor: COLORS.indigo, backgroundColor: 'rgba(99,102,241,0.18)' },
  btnSecTxt: { color: COLORS.textPrimary, fontWeight: '700', fontSize: 14 },
  btnGhost: { paddingVertical: 14, paddingHorizontal: 28, borderRadius: RADIUS.full, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  btnGhostHov: { borderColor: COLORS.sky },
  btnGhostTxt: { color: COLORS.textSecondary, fontWeight: '700', fontSize: 14 },
  statsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 28, paddingTop: 22, borderTopWidth: 1, borderTopColor: 'rgba(99,102,241,0.1)' },
  statItem: { gap: 3 },
  statVal: { fontSize: 28, fontWeight: '900', letterSpacing: -1 },
  statLbl: { color: COLORS.textMuted, fontSize: 11, fontWeight: '600', letterSpacing: 0.5 },
  infoCard: {
    borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.lg,
    padding: 16, gap: 12, overflow: 'hidden', width: 290,
    ...(Platform.OS === 'web' ? ({ backdropFilter: 'blur(16px)', boxShadow: '0 12px 40px rgba(0,0,0,0.35)' } as any) : {}),
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  infoIcon: { width: 30, height: 30, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  infoIconTxt: { fontSize: 12, fontWeight: '800' },
  infoTxt: { color: COLORS.textSecondary, fontSize: 12, flex: 1 },
  // Scroll cue indicator
  scrollCue: {
    position: 'absolute',
    bottom: Platform.OS === 'web' ? 36 : 20,
    alignSelf: 'center',
    alignItems: 'center',
    gap: 6,
  },
  scrollCueText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  scrollCueArrow: { color: 'rgba(255,255,255,0.4)', fontSize: 18 },
  scrollCueLine: {
    width: 1,
    height: Platform.OS === 'web' ? 40 : 24,
    backgroundColor: 'rgba(129,140,248,0.3)',
  },
});
