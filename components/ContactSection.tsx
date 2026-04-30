import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Linking, Platform, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, RADIUS } from '../constants/theme';
import { CONTACT } from '../constants/data';
import AnimatedSection from './AnimatedSection';
import { sectionPadH, sectionPadV, numSize } from '../utils/responsive';
import { usePrefersReducedMotion } from '../utils/motion';
import { KF_FLOAT, KF_PULSE_RING, KF_BORDER_GLOW } from '../utils/webAnimKeyframes';

function ContactOrb({ style }: { style: any }) {
  if (Platform.OS !== 'web') return null;
  return <View style={[style, { pointerEvents: 'none' } as any]} />;
}

export default function ContactSection() {
  const { width } = useWindowDimensions();
  const reduceMotion = usePrefersReducedMotion();
  const ph = sectionPadH(width);
  const pv = Math.max(40, sectionPadV(width) * 0.7);
  const titleSz = width >= 1024 ? 72 : width >= 768 ? 52 : width >= 480 ? 40 : 32;
  const titleLS = width >= 768 ? -3 : -1;
  const titleLH = width >= 1024 ? 80 : width >= 768 ? 60 : 46;
  const ns = numSize(width);
  const btnPad = width >= 640 ? 16 : 12;
  const btnHPad = width >= 640 ? 40 : 24;
  const borderAnim = useRef(new Animated.Value(0)).current;
  const availablePulse = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (Platform.OS === 'web' || reduceMotion) {
      borderAnim.setValue(0);
      availablePulse.setValue(1);
      return;
    }

    const borderLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(borderAnim, { toValue: 1, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
        Animated.timing(borderAnim, { toValue: 0, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
      ])
    );
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(availablePulse, { toValue: 1.5, duration: 900, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(availablePulse, { toValue: 0.8, duration: 900, easing: Easing.in(Easing.quad), useNativeDriver: true }),
      ])
    );

    borderLoop.start();
    pulseLoop.start();

    return () => {
      borderLoop.stop();
      pulseLoop.stop();
    };
  }, [availablePulse, borderAnim, reduceMotion]);

  const cardBorder = borderAnim.interpolate({ inputRange: [0, 1], outputRange: ['rgba(37,99,235,0.2)', 'rgba(14,165,233,0.48)'] });
  const orb1Style: any = Platform.OS === 'web' ? {
    position: 'absolute',
    top: -60, left: -60,
    width: 280, height: 280, borderRadius: 140,
    backgroundImage: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)',
    ...(reduceMotion ? {} : {
      animationKeyframes: KF_FLOAT,
      animationDuration: '8s',
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
    }),
  } : {};
  const orb2Style: any = Platform.OS === 'web' ? {
    position: 'absolute',
    bottom: -40, right: -40,
    width: 220, height: 220, borderRadius: 110,
    backgroundImage: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)',
    ...(reduceMotion ? {} : {
      animationKeyframes: KF_FLOAT,
      animationDuration: '6s',
      animationDelay: '2s',
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
    }),
  } : {};
  const dotRingStyle: any = Platform.OS === 'web' && !reduceMotion
    ? {
        animationKeyframes: KF_PULSE_RING,
        animationDuration: '2s',
        animationTimingFunction: 'ease-out',
        animationIterationCount: 'infinite',
      }
    : {};

  return (
    <View style={[styles.wrapper, { paddingHorizontal: ph, paddingVertical: pv }]}>
      <Animated.View
        style={[
          styles.ctaCard,
          Platform.OS === 'web' && reduceMotion && styles.cardStill,
          Platform.OS !== 'web' && { borderColor: cardBorder as any },
        ]}
      >
        <ContactOrb style={orb1Style} />
        <ContactOrb style={orb2Style} />
        <LinearGradient
          colors={['rgba(37,99,235,0.1)', 'rgba(14,165,233,0.055)', 'transparent']}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        {Platform.OS === 'web' && (
          <View
            style={[
              StyleSheet.absoluteFillObject,
              reduceMotion ? styles.borderGlowStill : styles.borderGlowWeb,
              { pointerEvents: 'none' } as any,
            ]}
          />
        )}
        <AnimatedSection direction="fade">
          <Text style={[styles.sectionNum, { fontSize: ns, lineHeight: ns }]}>06</Text>
          <View style={styles.badgeRow}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Animated.View
                style={[
                  styles.dotRing,
                  dotRingStyle,
                  Platform.OS !== 'web' ? { transform: [{ scale: availablePulse }] } : null,
                ]}
              />
              <View style={styles.dot} />
            </View>
            <Text style={styles.badge}>AVAILABLE FOR WORK</Text>
          </View>
          <Text style={[styles.ctaTitle, { fontSize: titleSz, letterSpacing: titleLS, lineHeight: titleLH }]}>
            {"Let's Build\nSomething Great"}
          </Text>
          <Text style={styles.ctaDesc}>
            I am open to new opportunities, collaborations and interesting projects.
            Reach out and let us talk.
          </Text>
          <View style={styles.btnRow}>
            <Pressable
              style={({ pressed, hovered }: any) => [styles.btnPrimary, (pressed || hovered) && { opacity: 0.85 }]}
              onPress={() => Linking.openURL(`mailto:${CONTACT.email}`)}
            >
              <LinearGradient colors={GRADIENTS.button} style={[styles.btnGrad, { paddingVertical: btnPad, paddingHorizontal: btnHPad }]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <Text style={styles.btnPrimaryText}>Send Email</Text>
              </LinearGradient>
            </Pressable>
            <Pressable
              style={({ pressed, hovered }: any) => [styles.btnSecondary, { paddingVertical: btnPad, paddingHorizontal: btnHPad }, (pressed || hovered) && styles.btnSecondaryHover]}
              onPress={() => Linking.openURL(`tel:${CONTACT.phone}`)}
            >
              <Text style={styles.btnSecondaryText}>{CONTACT.phone}</Text>
            </Pressable>
          </View>
          <View style={styles.emailRow}>
            <Text style={styles.emailLabel}>Or email directly: </Text>
            <Text style={styles.emailValue} onPress={() => Linking.openURL(`mailto:${CONTACT.email}`)}>
              {CONTACT.email}
            </Text>
          </View>
        </AnimatedSection>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    maxWidth: 1200, alignSelf: 'center', width: '100%',
    justifyContent: 'center', flex: 1,
  },
  ctaCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xl,
    paddingVertical: 56,
    paddingHorizontal: 24,
    gap: 20,
    overflow: 'hidden',
    alignItems: 'center',
    ...(Platform.OS === 'web' ? ({
      backdropFilter: 'blur(16px)',
      animationKeyframes: KF_BORDER_GLOW,
      animationDuration: '3s',
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
    } as any) : { backgroundColor: COLORS.card }),
  },
  cardStill: Platform.OS === 'web' ? ({ animationPlayState: 'paused' } as any) : {},
  borderGlowWeb: {
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: 'transparent',
    ...(Platform.OS === 'web'
      ? ({ animationKeyframes: KF_BORDER_GLOW, animationDuration: '3s', animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite' } as any)
      : {}),
  },
  borderGlowStill: { borderColor: 'rgba(37,99,235,0.24)' },
  sectionNum: { color: 'rgba(37,99,235,0.18)', fontWeight: '900', letterSpacing: -4, textAlign: 'center', marginBottom: 8 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dotRing: { position: 'absolute', width: 14, height: 14, borderRadius: 7, backgroundColor: 'rgba(5,150,105,0.28)' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.emerald },
  badge: { color: COLORS.emerald, fontSize: 12, fontWeight: '700', letterSpacing: 2 },
  ctaTitle: { fontWeight: '900', color: COLORS.textPrimary, textAlign: 'center' },
  ctaDesc: { color: COLORS.textSecondary, fontSize: 16, lineHeight: 26, textAlign: 'center', maxWidth: 500 },
  btnRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap', justifyContent: 'center' },
  btnPrimary: { borderRadius: RADIUS.full, overflow: 'hidden' },
  btnGrad: { alignItems: 'center', justifyContent: 'center' },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  btnSecondary: {
    borderRadius: RADIUS.full, borderWidth: 1,
    borderColor: COLORS.border, backgroundColor: 'rgba(37,99,235,0.07)',
  },
  btnSecondaryHover: { borderColor: COLORS.indigo },
  btnSecondaryText: { color: COLORS.textPrimary, fontWeight: '700', fontSize: 15 },
  emailRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  emailLabel: { color: COLORS.textMuted, fontSize: 14 },
  emailValue: { color: COLORS.sky, fontSize: 14, fontWeight: '600' },
});
