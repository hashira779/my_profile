import React, { useEffect, useRef } from 'react';
import { Animated, Image, Platform, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { usePrefersReducedMotion } from '../utils/motion';
import { webAnim } from '../utils/webAnimKeyframes';

const profilePhoto = require('../assets/profile/IMG_4682.JPG');

interface Props { size?: number; }

export default function ProfileAvatar({ size = 220 }: Props) {
  const reduceMotion = usePrefersReducedMotion();
  const pulse1       = useRef(new Animated.Value(1)).current;
  const pulse2       = useRef(new Animated.Value(1)).current;
  const rotateVal    = useRef(new Animated.Value(0)).current;
  const rotateRevVal = useRef(new Animated.Value(0)).current;
  const floatY       = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (Platform.OS === 'web' || reduceMotion) {
      pulse1.setValue(1); pulse2.setValue(1);
      rotateVal.setValue(0); rotateRevVal.setValue(0); floatY.setValue(0);
      return;
    }
    const ringSpin    = Animated.loop(Animated.timing(rotateVal,    { toValue: 1, duration: 5000, useNativeDriver: true }));
    const ringRevSpin = Animated.loop(Animated.timing(rotateRevVal, { toValue: 1, duration: 8000, useNativeDriver: true }));
    const outerPulse  = Animated.loop(Animated.sequence([
      Animated.timing(pulse1, { toValue: 1.12, duration: 2400, useNativeDriver: true }),
      Animated.timing(pulse1, { toValue: 1,    duration: 2400, useNativeDriver: true }),
    ]));
    const innerPulse  = Animated.loop(Animated.sequence([
      Animated.timing(pulse2, { toValue: 1.04, duration: 3200, useNativeDriver: true }),
      Animated.timing(pulse2, { toValue: 0.96, duration: 3200, useNativeDriver: true }),
    ]));
    const floatLoop   = Animated.loop(Animated.sequence([
      Animated.timing(floatY, { toValue: -12, duration: 3500, useNativeDriver: true }),
      Animated.timing(floatY, { toValue:  12, duration: 3500, useNativeDriver: true }),
    ]));
    ringSpin.start(); ringRevSpin.start(); outerPulse.start(); innerPulse.start(); floatLoop.start();
    return () => { ringSpin.stop(); ringRevSpin.stop(); outerPulse.stop(); innerPulse.stop(); floatLoop.stop(); };
  }, [floatY, pulse1, pulse2, reduceMotion, rotateVal, rotateRevVal]);

  const rotate    = rotateVal.interpolate({    inputRange: [0,1], outputRange: ['0deg','360deg'] });
  const rotateRev = rotateRevVal.interpolate({ inputRange: [0,1], outputRange: ['0deg','-360deg'] });

  const ringSize      = size + 16;
  const outerRingSize = size + 38;
  const glowSize      = size + 80;

  const webFloatStyle     = Platform.OS === 'web' && !reduceMotion ? webAnim.avatarFloat()  : {};
  const webRingStyle      = Platform.OS === 'web' && !reduceMotion ? webAnim.spinSlow()     : {};
  const webOuterRingStyle = Platform.OS === 'web' && !reduceMotion ? webAnim.spinRev()      : {};

  return (
    <Animated.View
      style={[
        styles.container,
        { width: size + 110, height: size + 110 },
        Platform.OS === 'web' ? webFloatStyle : { transform: [{ translateY: floatY }] },
      ]}
    >
      {/* Deep glow blob */}
      <Animated.View
        style={[
          styles.glow,
          { width: glowSize, height: glowSize, borderRadius: glowSize / 2 },
          Platform.OS === 'web' ? null : { transform: [{ scale: pulse1 }] },
        ]}
      />

      {/* CSS expanding pulse rings (web only) */}
      {Platform.OS === 'web' && !reduceMotion && (['0s','1.1s','2.2s'] as string[]).map((delay, i) => (
        <View
          key={i}
          style={[
            styles.pulseRing,
            { width: ringSize+18, height: ringSize+18, borderRadius: (ringSize+18)/2 },
            webAnim.avatarPulse(delay) as any,
          ]}
        />
      ))}

      {/* Outer counter-rotating ring (violet → sky) */}
      <Animated.View
        style={[
          styles.outerRingWrap,
          { width: outerRingSize, height: outerRingSize, borderRadius: outerRingSize / 2 },
          Platform.OS === 'web'
            ? webOuterRingStyle
            : { transform: [{ scale: pulse1 }, { rotate: rotateRev }] },
        ]}
      >
        <LinearGradient
          colors={['#7C3AED','transparent','#0EA5E9','transparent','#7C3AED']}
          style={StyleSheet.absoluteFillObject}
          start={{ x:0,y:0 }} end={{ x:1,y:1 }}
        />
      </Animated.View>

      {/* Main spinning gradient ring */}
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
          colors={['#2563EB','#0EA5E9','#059669','#2563EB']}
          style={StyleSheet.absoluteFillObject}
          start={{ x:0,y:0 }} end={{ x:1,y:1 }}
        />
      </Animated.View>

      {/* Avatar photo */}
      <View style={[styles.avatarBg, { width: size, height: size, borderRadius: size/2 }]}>
        <Image
          source={profilePhoto}
          style={[styles.photo, { width: size, height: size, borderRadius: size/2 }]}
          resizeMode="cover"
        />
        <View
          style={[
            styles.vignette,
            { width: size, height: size, borderRadius: size/2, pointerEvents: 'none' } as any,
          ]}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container:     { alignItems: 'center', justifyContent: 'center' },
  glow: {
    position: 'absolute',
    backgroundColor: '#2563EB',
    opacity: 0.16,
    ...(Platform.OS === 'web' ? ({ filter: 'blur(52px)' } as any) : {}),
  },
  pulseRing:     { position: 'absolute', borderWidth: 1.5, borderColor: 'rgba(37,99,235,0.5)' },
  outerRingWrap: { position: 'absolute', overflow: 'hidden', opacity: 0.55 },
  ringWrap:      { position: 'absolute', overflow: 'hidden' },
  avatarBg:      { overflow: 'hidden', alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  photo:         { position: 'absolute', top: 0, left: 0 },
  vignette: {
    position: 'absolute', top: 0, left: 0,
    ...(Platform.OS === 'web'
      ? ({ backgroundImage: 'radial-gradient(circle at 50% 50%, transparent 55%, rgba(2,6,23,0.58) 100%)' } as any)
      : { backgroundColor: 'transparent' }),
  },
});
