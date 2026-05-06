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
import { webAnim, heroAnimStyle } from '../utils/webAnimKeyframes';
const APPLE = Easing.bezier(0.22, 1, 0.36, 1);

// Animated stat counter
function CountUp({ target, color }: { target: string; color: string }) {
  return (
    <View>
      <Text style={[styles.statVal, { color }]}>
        {target}
      </Text>
    </View>
  );
}

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
        backgroundImage: 'linear-gradient(90deg, #F8FAFC, #0EA5E9, #2563EB, #F8FAFC)',
        backgroundSize: '300% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        ...(reduceMotion ? {} : webAnim.gradientFlow()),
      }
    : { color: COLORS.indigo };
  // Pulse ring (web CSS)
  const pulseRingStyle: any = Platform.OS === 'web'
    ? {
        position: 'absolute', width: 12, height: 12, borderRadius: 6,
        backgroundColor: 'rgba(5,150,105,0.34)',
        ...(reduceMotion ? {} : webAnim.pulseRing('2.2s')),
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
    Platform.OS === 'web' && !reduceMotion ? webAnim.float(dur, del) : {};
  // ── CSS animation helper (web hero entrance) ──
  const heroAnim = (name: string, delayMs: number): any =>
    Platform.OS === 'web' && !reduceMotion ? heroAnimStyle(name, delayMs) : {};

  const textContent = (
    <View style={styles.textBlock}>
      {/* Status badge */}
      <View style={[styles.statusBadge, heroAnim('ct-hero-up', 0), Platform.OS !== 'web' ? { opacity: badgeFade } : {}]}>
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
            <TypeWriter
              texts={PROFILE.roles}
              typingSpeed={68}
              deleteSpeed={36}
              pauseDuration={2000}
              style={[styles.twText, { fontSize: twSize }]}
              cursorColor={COLORS.indigo}
              cursorHeight={twSize + 4}
            />
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
          <LinearGradient colors={['#1D4ED8', '#2563EB', '#0EA5E9']} style={styles.btnGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Text style={styles.btnPrimaryTxt}>Hire Me</Text>
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
      {/* Mesh grid */}
      <View style={[StyleSheet.absoluteFillObject, styles.meshBg, { pointerEvents: 'none' } as any]} />
      {/* Orbs with float animation */}
      <Animated.View style={[styles.orb1, { transform: [{ translateY: orb1Anim }] }, orbFloat('7s', '0s')]}>
        <LinearGradient colors={['rgba(37,99,235,0.32)', 'transparent']} style={StyleSheet.absoluteFillObject} />
      </Animated.View>
      <Animated.View style={[styles.orb2, { transform: [{ translateY: orb2Anim }] }, orbFloat('9s', '1.2s')]}>
        <LinearGradient colors={['rgba(14,165,233,0.24)', 'transparent']} style={StyleSheet.absoluteFillObject} />
      </Animated.View>
      <Animated.View style={[styles.orb3, { transform: [{ translateY: orb3Anim }] }, orbFloat('6s', '2.5s')]}>
        <LinearGradient colors={['rgba(5,150,105,0.14)', 'transparent']} style={StyleSheet.absoluteFillObject} />
      </Animated.View>
      {isWide ? (
        <View style={styles.splitRow}>
          <View style={styles.leftCol}>{textContent}</View>
          <Animated.View style={[styles.rightCol, Platform.OS !== 'web'
            ? { opacity: avatarFade, transform: [{ translateX: avatarSlide }] }
            : heroAnim('ct-hero-right', 150)]}>
            <ProfileAvatar size={240} />
            <View style={styles.infoCard}>
              <LinearGradient colors={['rgba(15,23,42,0.96)', 'rgba(2,6,23,0.98)']} style={StyleSheet.absoluteFillObject} />
              {[
                { icon: 'L', label: CONTACT.location, color: COLORS.indigo },
                { icon: 'E', label: CONTACT.email, color: COLORS.sky },
                { icon: 'T', label: '@chhoy_too', color: '#29B6F6' },
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
      <View style={[styles.scrollCue, { pointerEvents: 'none' } as any]}>
        <Text style={styles.scrollCueText}>Scroll</Text>
        <Text style={[styles.scrollCueArrow, Platform.OS === 'web' && !reduceMotion ? (webAnim.scrollCue() as any) : {}]}>↓</Text>
        <View style={styles.scrollCueLine} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1, overflow: 'hidden',
    paddingTop: 64,
    paddingBottom: 120,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meshBg: {
    ...(Platform.OS === 'web' ? ({
      backgroundImage: `
        radial-gradient(ellipse at 15% 25%, rgba(37,99,235,0.1) 0%, transparent 50%),
        radial-gradient(ellipse at 85% 75%, rgba(14,165,233,0.08) 0%, transparent 50%),
        linear-gradient(rgba(37,99,235,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(14,165,233,0.025) 1px, transparent 1px)`,
      backgroundSize: '100% 100%, 100% 100%, 52px 52px, 52px 52px',
    } as any) : {}),
  },
  orb1: { position: 'absolute', top: -120, right: -80, width: 540, height: 540, borderRadius: 999, overflow: 'hidden' },
  orb2: { position: 'absolute', bottom: -80, left: -80, width: 460, height: 460, borderRadius: 999, overflow: 'hidden' },
  orb3: { position: 'absolute', top: '40%', left: '35%', width: 300, height: 300, borderRadius: 999, overflow: 'hidden' },
  splitRow: { flexDirection: 'row', alignItems: 'center', width: '100%', maxWidth: 1200, gap: 48, zIndex: 5 },
  leftCol: { flex: 3 },
  rightCol: { flex: 2, alignItems: 'center', gap: 20 },
  singleCol: { alignItems: 'center', gap: 24, width: '100%', maxWidth: 600, zIndex: 5 },
  textBlock: { gap: 20, zIndex: 5 },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 10, alignSelf: 'flex-start',
    paddingVertical: 7, paddingHorizontal: 16, borderRadius: RADIUS.full,
    backgroundColor: 'rgba(5,150,105,0.08)', borderWidth: 1, borderColor: 'rgba(5,150,105,0.26)',
  },
  pulseContainer: { width: 12, height: 12, alignItems: 'center', justifyContent: 'center' },
  pulseRing: { position: 'absolute', width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: 'rgba(5,150,105,0.36)' },
  pulseDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#059669' },
  statusText: { color: '#059669', fontSize: 11, fontWeight: '700', letterSpacing: 2 },
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
  btnPrimary: { borderRadius: RADIUS.full, overflow: 'hidden', ...(Platform.OS === 'web' ? ({ boxShadow: '0 16px 34px rgba(37,99,235,0.28)' } as any) : {}) },
  btnPrimaryHov: { opacity: 0.88 },
  btnGrad: { paddingVertical: 14, paddingHorizontal: 32, alignItems: 'center' },
  btnPrimaryTxt: { color: '#fff', fontWeight: '800', fontSize: 14, letterSpacing: 0.5 },
  btnSec: { paddingVertical: 14, paddingHorizontal: 28, borderRadius: RADIUS.full, borderWidth: 1, borderColor: COLORS.border, backgroundColor: 'rgba(37,99,235,0.07)' },
  btnSecHov: { borderColor: COLORS.indigo, backgroundColor: 'rgba(37,99,235,0.14)' },
  btnSecTxt: { color: COLORS.textPrimary, fontWeight: '700', fontSize: 14 },
  btnGhost: { paddingVertical: 14, paddingHorizontal: 28, borderRadius: RADIUS.full, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  btnGhostHov: { borderColor: COLORS.sky },
  btnGhostTxt: { color: COLORS.textSecondary, fontWeight: '700', fontSize: 14 },
  statsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 28, paddingTop: 22, borderTopWidth: 1, borderTopColor: 'rgba(148,163,184,0.12)' },
  statItem: { gap: 4, minWidth: 82 },
  statVal: { fontSize: 27, lineHeight: 31, fontWeight: '900', letterSpacing: 0 },
  statLbl: { color: COLORS.textMuted, fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
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
    backgroundColor: 'rgba(37,99,235,0.28)',
  },
});
