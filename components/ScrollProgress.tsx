import React from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { usePrefersReducedMotion } from '../utils/motion';
import { webAnim } from '../utils/webAnimKeyframes';
interface Props {
  scrollY: Animated.Value;
  contentHeight: number;
  windowHeight: number;
}
export default function ScrollProgress({ scrollY, contentHeight, windowHeight }: Props) {
  const reduceMotion = usePrefersReducedMotion();
  const maxScroll = Math.max(1, contentHeight - windowHeight);
  const progressWidth = scrollY.interpolate({
    inputRange: [0, maxScroll],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });
  const webStyle: any = Platform.OS === 'web'
    ? { position: 'fixed', top: 64, left: 0, right: 0, zIndex: 200 }
    : {};
  const edgeMotion: any = Platform.OS === 'web' && !reduceMotion ? webAnim.glowPulse() : {};
  return (
    <View style={[styles.track, webStyle]}>
      <Animated.View style={[styles.fill, { width: progressWidth }]}>
        <LinearGradient
          colors={['#2563EB', '#0EA5E9', '#059669']}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        />
        {Platform.OS === 'web' && !reduceMotion && <View style={styles.shimmer} />}
        {/* Glow at the leading edge */}
        <View style={[styles.edge, edgeMotion]} />
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  track: {
    height: 3,
    backgroundColor: 'rgba(37,99,235,0.08)',
    overflow: 'visible',
  },
  fill: {
    height: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  shimmer: {
    position: 'absolute', top: 0, bottom: 0, left: 0, width: '42%',
    ...(Platform.OS === 'web'
      ? ({
          backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)',
          ...webAnim.progressShine(),
        } as any)
      : {}),
  },
  edge: {
    position: 'absolute',
    right: 0,
    top: -3,
    width: 12,
    height: 9,
    borderRadius: 6,
    backgroundColor: '#2563EB',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0 0 10px 3px rgba(37,99,235,0.72)' } as any) : {}),
  },
});
