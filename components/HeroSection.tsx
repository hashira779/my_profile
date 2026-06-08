import React, { useEffect, useRef } from 'react';
import {
  Animated, Easing, Linking, Platform, Pressable,
  StyleSheet, Text, View, useWindowDimensions,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { RADIUS, FONT_FAMILY } from '../constants/theme';
import { CONTACT, PROFILE, PROFILE_STATS, SOCIAL } from '../constants/data';
import TypeWriter from './TypeWriter';
import { MOTION, usePrefersReducedMotion } from '../utils/motion';
import { heroAnimStyle, webAnim } from '../utils/webAnimKeyframes';

const APPLE = Easing.bezier(0.22, 1, 0.36, 1);
const DURATION = MOTION.duration.reveal;

export default function HeroSection() {
  const { colors, isDark } = useTheme();
  const { width } = useWindowDimensions();
  const reduceMotion = usePrefersReducedMotion();

  const titleSize = width >= 1180 ? 92 : width >= 768 ? 68 : width >= 480 ? 48 : 36;
  const titleLine = width >= 1180 ? 96 : width >= 768 ? 74 : width >= 480 ? 54 : 42;
  const subtitleSize = width >= 768 ? 20 : 16;
  const bodySize = width >= 768 ? 18 : 15;

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    if (Platform.OS === 'web' || reduceMotion) return;
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: MOTION.duration.hero, easing: APPLE, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: MOTION.duration.hero, easing: APPLE, useNativeDriver: true }),
    ]).start();
  }, [fade, reduceMotion, slide]);

  const heroAnim = (delayMs: number): any => (
    Platform.OS === 'web' && !reduceMotion ? heroAnimStyle('ct-hero-up', delayMs) : {}
  );

  const openEmail = () => Linking.openURL(`mailto:${CONTACT.email}`);
  const openTelegram = () => Linking.openURL(CONTACT.telegram);
  const openGithub = () => Linking.openURL(PROFILE.github);
  const openSocial = (url: string) => Linking.openURL(url);

  const styles = getStyles(colors, isDark);

  return (
    <View style={styles.wrapper}>
      <View style={[styles.glowA, Platform.OS === 'web' && !reduceMotion ? webAnim.float('9s', '0s') : null]} />
      <View style={[styles.glowB, Platform.OS === 'web' && !reduceMotion ? webAnim.float('11s', '1s') : null]} />

      <Animated.View
        style={[
          styles.content,
          Platform.OS !== 'web' ? { opacity: fade, transform: [{ translateY: slide }] } : null,
        ]}
      >
        {/* Status badge */}
        <View style={[styles.badge, heroAnim(0)]}>
          <View style={styles.statusDotWrap}>
            <View style={[styles.statusPulse, Platform.OS === 'web' && !reduceMotion ? webAnim.pulseRing('2.4s') : null]} />
            <View style={styles.statusDot} />
          </View>
          <Text style={styles.badgeText}>{PROFILE.status}</Text>
        </View>

        {/* Main title */}
        <View style={[styles.copyBlock, heroAnim(90)]}>
          <Text style={[styles.kicker, { fontSize: subtitleSize }]}>Portfolio of</Text>
          <Text style={[styles.title, { fontSize: titleSize, lineHeight: titleLine }]}>
            {PROFILE.name}
          </Text>
          <View style={styles.roleRow}>
            <Text style={[styles.rolePrefix, { fontSize: bodySize }]}>Building as a </Text>
            <TypeWriter
              texts={PROFILE.roles}
              typingSpeed={68}
              deleteSpeed={34}
              pauseDuration={1800}
              style={[styles.roleText, { fontSize: bodySize }]}
              cursorColor={colors.accent}
              cursorHeight={bodySize + 5}
            />
          </View>
          <Text style={[styles.desc, { fontSize: bodySize, lineHeight: bodySize + 10 }]}>{PROFILE.tagline}</Text>
        </View>

        {/* CTA Buttons */}
        <View style={[styles.btnRow, heroAnim(180)]}>
          <Pressable style={({ pressed, hovered }: any) => [styles.primaryBtn, (pressed || hovered) && styles.primaryBtnHover]} onPress={openEmail}>
            {Platform.OS === 'web' && !reduceMotion && <View style={[styles.shinyOverlay, webAnim.shinyCta()]} />}
            <Text style={styles.primaryText}>Start a conversation</Text>
          </Pressable>
          <Pressable style={({ pressed, hovered }: any) => [styles.secondaryBtn, (pressed || hovered) && styles.secondaryBtnHover]} onPress={openTelegram}>
            <Text style={styles.secondaryText}>Telegram</Text>
          </Pressable>
          <Pressable style={({ pressed, hovered }: any) => [styles.textBtn, (pressed || hovered) && styles.textBtnHover]} onPress={openGithub}>
            <Text style={styles.textBtnText}>GitHub / projects</Text>
          </Pressable>
        </View>

        {/* Social links inspired by classic developer portfolios, but styled for this brand. */}
        <View style={[styles.socialRow, heroAnim(235)]}>
          {SOCIAL.map((item) => (
            <Pressable
              key={item.label}
              onPress={() => openSocial(item.url)}
              style={({ pressed, hovered }: any) => [styles.socialBtn, (pressed || hovered) && styles.socialBtnHover]}
            >
              <View style={[styles.socialDot, { backgroundColor: item.color }]} />
              <Text style={styles.socialText}>{item.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Trust stats */}
        <View style={[styles.trustRow, heroAnim(270)]}>
          {PROFILE_STATS.map((stat, i) => (
            <View key={stat.label} style={styles.trustItem}>
              {i > 0 && <View style={styles.trustDivider} />}
              <Text style={styles.trustValue}>{stat.value}</Text>
              <Text style={styles.trustLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </Animated.View>

      {/* Scroll indicator */}
      <View style={[styles.scrollCue, { pointerEvents: 'none' } as any]}>
        <Text style={styles.scrollText}>Scroll</Text>
        <View style={styles.scrollLine} />
      </View>
    </View>
  );
}

const getStyles = (colors: any, isDark: boolean) => {
  const scrollLineBg = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.14)';

  return StyleSheet.create({
    wrapper: {
      flex: 1,
      overflow: 'hidden',
      paddingTop: 96,
      paddingBottom: 96,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    glowA: {
      position: 'absolute',
      top: 80,
      left: '12%',
      width: 340,
      height: 340,
      borderRadius: 170,
      backgroundColor: isDark ? 'rgba(6,182,212,0.06)' : 'rgba(37,99,235,0.08)',
      ...(Platform.OS === 'web' ? ({ filter: 'blur(80px)' } as any) : {}),
    },
    glowB: {
      position: 'absolute',
      bottom: 120,
      right: '12%',
      width: 380,
      height: 380,
      borderRadius: 190,
      backgroundColor: isDark ? 'rgba(139,92,246,0.04)' : 'rgba(124,58,237,0.04)',
      ...(Platform.OS === 'web' ? ({ filter: 'blur(80px)' } as any) : {}),
    },
    content: { width: '100%', maxWidth: 1180, alignItems: 'center', zIndex: 2 },
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 9,
      paddingVertical: 7,
      paddingHorizontal: 14,
      borderRadius: RADIUS.full,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 24,
    },
    statusDotWrap: { width: 10, height: 10, alignItems: 'center', justifyContent: 'center' },
    statusPulse: { position: 'absolute', width: 10, height: 10, borderRadius: 5, backgroundColor: 'rgba(52,211,153,0.30)' },
    statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.emerald },
    badgeText: { color: colors.textMuted, fontSize: 11, fontWeight: '800', letterSpacing: 1.2, fontFamily: FONT_FAMILY.accent },
    copyBlock: { alignItems: 'center', maxWidth: 960 },
    kicker: { color: colors.textMuted, fontWeight: '850' as any, marginBottom: 8, letterSpacing: 1.5, textTransform: 'uppercase', fontFamily: FONT_FAMILY.accent },
    title: {
      fontWeight: '900',
      textAlign: 'center',
      letterSpacing: -3,
      color: colors.textPrimary,
      fontFamily: FONT_FAMILY.header,
    },
    roleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', marginTop: 16 },
    rolePrefix: { color: colors.textSecondary, fontWeight: '600', fontFamily: FONT_FAMILY.body },
    roleText: { color: colors.accent, fontWeight: '800', fontFamily: FONT_FAMILY.header },
    desc: { color: colors.textSecondary, textAlign: 'center', maxWidth: 720, marginTop: 20, fontFamily: FONT_FAMILY.body },
    btnRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginTop: 36 },
    primaryBtn: {
      paddingVertical: 14,
      paddingHorizontal: 28,
      borderRadius: RADIUS.full,
      backgroundColor: colors.textPrimary,
      overflow: 'hidden',
      position: 'relative',
      ...(Platform.OS === 'web' ? ({ transition: 'all 180ms ease', boxShadow: `0 14px 30px ${colors.accent}22` } as any) : {}),
    },
    primaryBtnHover: { backgroundColor: isDark ? '#fff' : '#000', transform: [{ translateY: -2 }] },
    primaryText: { color: colors.bg, fontSize: 15, fontWeight: '900', position: 'relative', zIndex: 2, fontFamily: FONT_FAMILY.header },
    shinyOverlay: {
      position: 'absolute',
      top: 0,
      width: '40%',
      height: '100%',
      ...(Platform.OS === 'web' ? ({
        backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
      } as any) : {}),
    },
    secondaryBtn: {
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: RADIUS.full,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.borderBright,
      ...(Platform.OS === 'web' ? ({ transition: 'all 180ms ease' } as any) : {}),
    },
    secondaryBtnHover: { borderColor: colors.accent, transform: [{ translateY: -2 }] },
    secondaryText: { color: colors.textPrimary, fontSize: 15, fontWeight: '850' as any, fontFamily: FONT_FAMILY.header },
    textBtn: { paddingVertical: 14, paddingHorizontal: 12, borderRadius: RADIUS.full },
    textBtnHover: { backgroundColor: isDark ? 'rgba(6,182,212,0.08)' : 'rgba(37,99,235,0.08)' },
    textBtnText: { color: colors.accent, fontSize: 15, fontWeight: '800', fontFamily: FONT_FAMILY.header },
    socialRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 10,
      marginTop: 18,
    },
    socialBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingVertical: 8,
      paddingHorizontal: 13,
      borderRadius: RADIUS.full,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      ...(Platform.OS === 'web' ? ({ transition: 'all 180ms ease', cursor: 'pointer' } as any) : {}),
    },
    socialBtnHover: {
      borderColor: colors.borderBright,
      backgroundColor: colors.cardHover,
      transform: [{ translateY: -2 }],
    },
    socialDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
    },
    socialText: {
      color: colors.textSecondary,
      fontSize: 12,
      fontWeight: '800',
      letterSpacing: 0.1,
      fontFamily: FONT_FAMILY.accent,
    },

    trustRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 0,
      marginTop: 56,
      paddingTop: 32,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    trustItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: 20,
      paddingVertical: 8,
    },
    trustDivider: {
      width: 1,
      height: 24,
      backgroundColor: colors.border,
      marginRight: 12,
    },
    trustValue: {
      color: colors.textPrimary,
      fontSize: 22,
      fontWeight: '900',
      letterSpacing: -0.5,
      fontFamily: FONT_FAMILY.header,
    },
    trustLabel: {
      color: colors.textMuted,
      fontSize: 12,
      fontWeight: '700',
      fontFamily: FONT_FAMILY.body,
    },

    scrollCue: { position: 'absolute', bottom: 24, alignItems: 'center', gap: 8 },
    scrollText: { color: colors.textDim, fontSize: 10, fontWeight: '800', letterSpacing: 1.6, textTransform: 'uppercase', fontFamily: FONT_FAMILY.accent },
    scrollLine: { width: 1, height: 38, backgroundColor: scrollLineBg },
  });
};
