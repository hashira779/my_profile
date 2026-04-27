import React from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
interface Props {
  scrollY: Animated.Value;
  contentHeight: number;
  windowHeight: number;
}
export default function ScrollProgress({ scrollY, contentHeight, windowHeight }: Props) {
  const maxScroll = Math.max(1, contentHeight - windowHeight);
  const progressWidth = scrollY.interpolate({
    inputRange: [0, maxScroll],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });
  const webStyle: any = Platform.OS === 'web'
    ? { position: 'fixed', top: 64, left: 0, right: 0, zIndex: 200 }
    : {};
  return (
    <View style={[styles.track, webStyle]}>
      <Animated.View style={[styles.fill, { width: progressWidth }]}>
        <LinearGradient
          colors={['#818CF8', '#38BDF8', '#A78BFA']}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        />
        {/* Glow at the leading edge */}
        <View style={styles.edge} />
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  track: {
    height: 3,
    backgroundColor: 'rgba(99,102,241,0.08)',
    overflow: 'visible',
  },
  fill: {
    height: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  edge: {
    position: 'absolute',
    right: 0,
    top: -3,
    width: 12,
    height: 9,
    borderRadius: 6,
    backgroundColor: '#818CF8',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0 0 10px 3px rgba(129,140,248,0.9)' } as any) : {}),
  },
});
