import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { FONT_FAMILY } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

/**
 * Premium loading screen with animated initials, progress bar,
 * and dramatic reveal transition.
 */
export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const { colors, isDark } = useTheme();
  const { width, height } = useWindowDimensions();
  const [loadProgress, setLoadProgress] = useState(0);

  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const letterSpacing = useRef(new Animated.Value(24)).current;
  const progressWidth = useRef(new Animated.Value(0)).current;
  const initialsScale = useRef(new Animated.Value(0.7)).current;
  const initialsOpacity = useRef(new Animated.Value(0)).current;
  const lineWidth = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const APPLE = Easing.bezier(0.22, 1, 0.36, 1);

    // Phase 1: Initials appear
    Animated.parallel([
      Animated.timing(initialsOpacity, { toValue: 1, duration: 600, easing: APPLE, useNativeDriver: Platform.OS !== 'web' }),
      Animated.timing(initialsScale, { toValue: 1, duration: 800, easing: APPLE, useNativeDriver: Platform.OS !== 'web' }),
    ]).start();

    // Phase 2: Line expands
    setTimeout(() => {
      Animated.timing(lineWidth, { toValue: 1, duration: 600, easing: APPLE, useNativeDriver: false }).start();
    }, 400);

    // Phase 3: Subtitle appears
    setTimeout(() => {
      Animated.timing(subtitleOpacity, { toValue: 1, duration: 500, easing: APPLE, useNativeDriver: Platform.OS !== 'web' }).start();
    }, 700);

    // Phase 4: Progress fills
    const progressInterval = setInterval(() => {
      setLoadProgress(prev => {
        const next = prev + Math.random() * 18 + 4;
        return Math.min(next, 100);
      });
    }, 120);

    // Phase 5: Exit after load
    const exitTimer = setTimeout(() => {
      clearInterval(progressInterval);
      setLoadProgress(100);

      setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, { toValue: 0, duration: 600, easing: APPLE, useNativeDriver: Platform.OS !== 'web' }),
          Animated.timing(scale, { toValue: 1.1, duration: 700, easing: APPLE, useNativeDriver: Platform.OS !== 'web' }),
        ]).start(() => onFinish());
      }, 400);
    }, 2200);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
    };
  }, []);

  const accentColor = colors.accent;

  const lineAnimWidth = lineWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.min(width * 0.3, 200)],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colors.bg,
          opacity,
          transform: [{ scale }],
          width, height,
        },
      ]}
    >
      {/* Ambient glow */}
      <View style={[styles.glow, {
        backgroundColor: isDark ? 'rgba(6,182,212,0.08)' : 'rgba(37,99,235,0.06)',
      }]} />

      <Animated.View style={[styles.content, {
        opacity: initialsOpacity,
        transform: [{ scale: initialsScale }],
      }]}>
        {/* Initials */}
        <Text style={[styles.initials, { color: accentColor }]}>CT</Text>

        {/* Animated line */}
        <Animated.View style={[styles.line, {
          backgroundColor: accentColor,
          width: lineAnimWidth,
        }]} />

        {/* Subtitle */}
        <Animated.View style={{ opacity: subtitleOpacity }}>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>CHHOY TOO</Text>
          <Text style={[styles.role, { color: colors.textDim }]}>System Analyst & Developer</Text>
        </Animated.View>
      </Animated.View>

      {/* Progress bar */}
      <View style={[styles.progressTrack, { backgroundColor: colors.surface }]}>
        <View style={[styles.progressFill, {
          backgroundColor: accentColor,
          width: `${loadProgress}%`,
        }]} />
      </View>

      <Text style={[styles.loadText, { color: colors.textDim }]}>
        {loadProgress < 100 ? `Loading ${Math.round(loadProgress)}%` : 'Welcome'}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10000,
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web' ? { position: 'fixed' } as any : {}),
  },
  glow: {
    position: 'absolute',
    width: 500,
    height: 500,
    borderRadius: 250,
    ...(Platform.OS === 'web' ? { filter: 'blur(100px)' } as any : {}),
  },
  content: {
    alignItems: 'center',
    gap: 16,
  },
  initials: {
    fontSize: 72,
    fontWeight: '900',
    letterSpacing: 8,
    fontFamily: FONT_FAMILY.header,
  },
  line: {
    height: 2,
    borderRadius: 1,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 6,
    textAlign: 'center',
    fontFamily: FONT_FAMILY.accent,
    marginTop: 8,
  },
  role: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3,
    textAlign: 'center',
    fontFamily: FONT_FAMILY.body,
    marginTop: 4,
  },
  progressTrack: {
    position: 'absolute',
    bottom: 80,
    width: 200,
    height: 2,
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 1,
    ...(Platform.OS === 'web' ? { transition: 'width 200ms ease' } as any : {}),
  },
  loadText: {
    position: 'absolute',
    bottom: 58,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    fontFamily: FONT_FAMILY.accent,
  },
});
