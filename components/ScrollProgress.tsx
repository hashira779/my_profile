import React from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { usePrefersReducedMotion } from '../utils/motion';
import { webAnim } from '../utils/webAnimKeyframes';

interface Props {
  scrollY: Animated.Value;
  contentHeight: number;
  windowHeight: number;
}

export default function ScrollProgress({ scrollY, contentHeight, windowHeight }: Props) {
  const { colors, gradients, isDark } = useTheme();
  const reduceMotion = usePrefersReducedMotion();
  const maxScroll = Math.max(1, contentHeight - windowHeight);
  const progressWidth = scrollY.interpolate({
    inputRange: [0, maxScroll],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });
  const webStyle: any = Platform.OS === 'web'
    ? { position: 'fixed', top: 56, left: 0, right: 0, zIndex: 200 }
    : {};
  const edgeMotion: any = Platform.OS === 'web' && !reduceMotion ? webAnim.glowPulse() : {};
  const styles = getStyles(colors, isDark);

  return (
    <View style={[styles.track, webStyle]}>
      <Animated.View style={[styles.fill, { width: progressWidth }]}>
        <LinearGradient
          colors={[gradients.button[0], gradients.button[1], colors.emerald]}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        {Platform.OS === 'web' && !reduceMotion && <View style={styles.shimmer} />}
        <View style={[styles.edge, edgeMotion]} />
      </Animated.View>
    </View>
  );
}

const getStyles = (colors: any, isDark: boolean) => {
  // Convert hex accent to rgba for edge shadow glow
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const edgeShadow = Platform.OS === 'web'
    ? ({ boxShadow: `0 0 10px 2px ${hexToRgba(colors.accent, 0.38)}` } as any)
    : {};

  return StyleSheet.create({
    track: {
      height: 2,
      backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
      overflow: 'visible',
    },
    fill: {
      height: 2,
      overflow: 'hidden',
      position: 'relative',
    },
    shimmer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: '42%',
      ...(Platform.OS === 'web'
        ? ({
            backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.75) 50%, transparent 100%)',
            ...webAnim.progressShine(),
          } as any)
        : {}),
    },
    edge: {
      position: 'absolute',
      right: 0,
      top: -3,
      width: 10,
      height: 8,
      borderRadius: 5,
      backgroundColor: colors.accent,
      ...edgeShadow,
    },
  });
};
