import React, { useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, RADIUS } from '../constants/theme';
import { PROFILE } from '../constants/data';
import { usePrefersReducedMotion } from '../utils/motion';

interface Props {
  size?: number;
}

export default function ProfileAvatar({ size = 220 }: Props) {
  const reduceMotion = usePrefersReducedMotion();
  const pulse1 = useRef(new Animated.Value(1)).current;
  const pulse2 = useRef(new Animated.Value(1)).current;
  const rotateVal = useRef(new Animated.Value(0)).current;
  const floatY = useRef(new Animated.Value(0)).current;
  const badge1Scale = useRef(new Animated.Value(0)).current;
  const badge2Scale = useRef(new Animated.Value(0)).current;
  const badge3Scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (Platform.OS === 'web' || reduceMotion) {
      pulse1.setValue(1);
      pulse2.setValue(1);
      rotateVal.setValue(0);
      floatY.setValue(0);
      badge1Scale.setValue(1);
      badge2Scale.setValue(1);
      badge3Scale.setValue(1);
      return;
    }

    const ringSpin = Animated.loop(
      Animated.timing(rotateVal, { toValue: 1, duration: 5000, useNativeDriver: true })
    );
    const outerPulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse1, { toValue: 1.12, duration: 2400, useNativeDriver: true }),
        Animated.timing(pulse1, { toValue: 1, duration: 2400, useNativeDriver: true }),
      ])
    );
    const innerPulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse2, { toValue: 1.04, duration: 3200, useNativeDriver: true }),
        Animated.timing(pulse2, { toValue: 0.96, duration: 3200, useNativeDriver: true }),
      ])
    );
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatY, { toValue: -10, duration: 3500, useNativeDriver: true }),
        Animated.timing(floatY, { toValue: 10, duration: 3500, useNativeDriver: true }),
      ])
    );
    const badgeIntro = Animated.stagger(200, [
      Animated.spring(badge1Scale, { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }),
      Animated.spring(badge2Scale, { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }),
      Animated.spring(badge3Scale, { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }),
    ]);

    ringSpin.start();
    outerPulse.start();
    innerPulse.start();
    floatLoop.start();
    badgeIntro.start();

    return () => {
      ringSpin.stop();
      outerPulse.stop();
      innerPulse.stop();
      floatLoop.stop();
      badgeIntro.stop();
    };
  }, [badge1Scale, badge2Scale, badge3Scale, floatY, pulse1, pulse2, reduceMotion, rotateVal]);

  const rotate = rotateVal.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const ringSize = size + 16;
  const glowSize = size + 72;
  const webFloatStyle: any = Platform.OS === 'web' && !reduceMotion
    ? {
        animationName: 'ct-avatar-float',
        animationDuration: '6.8s',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        animationFillMode: 'both',
      }
    : {};
  const webRingStyle: any = Platform.OS === 'web' && !reduceMotion
    ? {
        animationName: 'ct-spin-slow',
        animationDuration: '18s',
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
      }
    : {};
  const badgeMotion = (delayMs: number, scaleValue: Animated.Value): any => (
    Platform.OS === 'web'
      ? (!reduceMotion
          ? {
              animationName: 'ct-bounce-in',
              animationDuration: '0.7s',
              animationDelay: `${delayMs}ms`,
              animationFillMode: 'both',
            }
          : {})
      : { transform: [{ scale: scaleValue }] }
  );

  return (
    <Animated.View
      style={[
        styles.container,
        { width: size + 100, height: size + 100 },
        Platform.OS === 'web' ? webFloatStyle : { transform: [{ translateY: floatY }] },
      ]}
    >
      <Animated.View
        style={[
          styles.glow,
          {
            width: glowSize,
            height: glowSize,
            borderRadius: glowSize / 2,
          },
          Platform.OS === 'web' ? null : { transform: [{ scale: pulse1 }] },
        ]}
      />

      <Animated.View
        style={[
          styles.ringWrap,
          { width: ringSize, height: ringSize, borderRadius: ringSize / 2 },
          Platform.OS === 'web'
            ? webRingStyle
            : { transform: [{ scale: pulse2 }, { rotate }] },
        ]}
      >
        <LinearGradient
          colors={['#818CF8', '#38BDF8', '#A78BFA', '#FB7185', '#818CF8']}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      <View style={[styles.avatarBg, { width: size, height: size, borderRadius: size / 2 }]}>
        <LinearGradient
          colors={['#1C2558', '#0E1432', '#070D24']}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <View
          style={[
            styles.innerGlow,
            { width: size * 0.7, height: size * 0.7, borderRadius: size * 0.35 },
          ]}
        />
        <Text style={[styles.initials, { fontSize: size * 0.3 }]}>{PROFILE.initials}</Text>
      </View>

      <Animated.View style={[styles.floatBadge, styles.badgePos1, badgeMotion(120, badge1Scale)]}>
        <LinearGradient colors={['rgba(10,18,48,0.96)', 'rgba(6,12,32,0.96)']} style={styles.badgeGrad}>
          <View style={styles.greenDot} />
          <Text style={[styles.badgeLabel, { color: COLORS.emerald }]}>Available</Text>
        </LinearGradient>
      </Animated.View>

      <Animated.View style={[styles.floatBadge, styles.badgePos2, badgeMotion(240, badge2Scale)]}>
        <LinearGradient colors={['rgba(10,18,48,0.96)', 'rgba(6,12,32,0.96)']} style={styles.badgeGrad}>
          <Text style={[styles.badgeLabel, { color: COLORS.indigo }]}>#{PROFILE.roles[0]}</Text>
        </LinearGradient>
      </Animated.View>

      <Animated.View style={[styles.floatBadge, styles.badgePos3, badgeMotion(360, badge3Scale)]}>
        <LinearGradient colors={['rgba(10,18,48,0.96)', 'rgba(6,12,32,0.96)']} style={styles.badgeGrad}>
          <Text style={[styles.badgeLabel, { color: COLORS.sky }]}>2+ Years</Text>
        </LinearGradient>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  glow: {
    position: 'absolute',
    backgroundColor: '#3730A3',
    opacity: 0.18,
    ...(Platform.OS === 'web' ? ({ filter: 'blur(40px)' } as any) : {}),
  },
  ringWrap: { position: 'absolute', overflow: 'hidden' },
  avatarBg: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  innerGlow: {
    position: 'absolute',
    backgroundColor: 'rgba(99,102,241,0.12)',
    borderRadius: 999,
    ...(Platform.OS === 'web' ? ({ filter: 'blur(20px)' } as any) : {}),
  },
  initials: {
    color: '#FFFFFF',
    fontWeight: '900',
    letterSpacing: -2,
    zIndex: 3,
    ...(Platform.OS === 'web'
      ? ({
          background: 'linear-gradient(135deg, #818CF8, #38BDF8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        } as any)
      : {}),
  },
  floatBadge: {
    position: 'absolute',
    borderRadius: RADIUS.full,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(99,102,241,0.25)',
    zIndex: 10,
    ...(Platform.OS === 'web' ? ({ boxShadow: '0 4px 20px rgba(0,0,0,0.4)' } as any) : {}),
  },
  badgeGrad: { paddingVertical: 7, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 6 },
  badgeLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 0.3 },
  greenDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#34D399' },
  badgePos1: { top: 4, right: 0 },
  badgePos2: { bottom: 24, left: -4 },
  badgePos3: { bottom: 0, right: -4 },
});
