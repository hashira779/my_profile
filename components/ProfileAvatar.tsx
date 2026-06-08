import React, { useEffect, useRef } from 'react';
import { Animated, Image, Platform, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { usePrefersReducedMotion } from '../utils/motion';
import { webAnim } from '../utils/webAnimKeyframes';

const profilePhoto = require('../assets/profile/IMG_4682.JPG');

interface Props { size?: number; }

export default function ProfileAvatar({ size = 220 }: Props) {
  const { colors, isDark } = useTheme();
  const reduceMotion = usePrefersReducedMotion();
  const floatY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (Platform.OS === 'web' || reduceMotion) {
      floatY.setValue(0);
      return;
    }

    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatY, { toValue: -8, duration: 3200, useNativeDriver: true }),
        Animated.timing(floatY, { toValue: 0, duration: 3200, useNativeDriver: true }),
      ]),
    );
    floatLoop.start();
    return () => floatLoop.stop();
  }, [floatY, reduceMotion]);

  const frameSize = size + 34;
  const webFloatStyle = Platform.OS === 'web' && !reduceMotion ? webAnim.avatarFloat() : {};
  const styles = getStyles(colors, isDark);

  return (
    <Animated.View
      style={[
        styles.container,
        { width: frameSize + 80, height: frameSize + 80 },
        Platform.OS === 'web' ? webFloatStyle : { transform: [{ translateY: floatY }] },
      ]}
    >
      <View style={[styles.halo, { width: size + 100, height: size + 100, borderRadius: (size + 100) / 2 }]} />
      <LinearGradient
        colors={isDark ? ['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.02)'] : ['#FFFFFF', '#FAF9F6']}
        style={[styles.frame, { width: frameSize, height: frameSize, borderRadius: frameSize / 2 }]}
      >
        <View style={[styles.photoWrap, { width: size, height: size, borderRadius: size / 2 }]}>
          <Image source={profilePhoto} style={[styles.photo, { width: size, height: size, borderRadius: size / 2 }]} resizeMode="cover" />
          <View style={[styles.vignette, { width: size, height: size, borderRadius: size / 2, pointerEvents: 'none' } as any]} />
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const getStyles = (colors: any, isDark: boolean) => {
  const frameShadow = Platform.OS === 'web'
    ? ({ boxShadow: isDark ? `0 34px 90px ${colors.shadow}, inset 0 1px 0 rgba(255,255,255,0.08)` : `0 24px 60px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.95)` } as any)
    : {};

  // Convert hex accent to rgba for subtle halo glow
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const haloBg = hexToRgba(colors.accent, isDark ? 0.12 : 0.08);

  return StyleSheet.create({
    container: { alignItems: 'center', justifyContent: 'center' },
    halo: {
      position: 'absolute',
      backgroundColor: haloBg,
      ...(Platform.OS === 'web' ? ({ filter: 'blur(48px)' } as any) : {}),
    },
    frame: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      ...frameShadow,
    },
    photoWrap: {
      overflow: 'hidden',
      backgroundColor: colors.surfaceSoft,
      borderWidth: 1,
      borderColor: colors.border,
    },
    photo: { position: 'absolute', top: 0, left: 0 },
    vignette: {
      position: 'absolute',
      top: 0,
      left: 0,
      ...(Platform.OS === 'web'
        ? ({ backgroundImage: isDark ? 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.38) 100%)' : 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.12) 100%)' } as any)
        : { backgroundColor: 'transparent' }),
    },
  });
};
