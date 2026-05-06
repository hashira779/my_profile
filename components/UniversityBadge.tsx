import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  initials: string;
  color: string;       // accent colour (border / glow)
  bgFrom?: string;     // gradient start
  bgTo?: string;       // gradient end
  size?: number;
}

/**
 * A local institution badge — no external image, no CORS issues.
 * Renders a circular gradient seal with initials and a subtle ring.
 */
export default function UniversityBadge({
  initials, color,
  bgFrom = '#7B1111', bgTo = '#B71C1C',
  size = 54,
}: Props) {
  const fontSize = size * 0.28;
  const ringSize = size + 6;

  return (
    <View style={[styles.outer, { width: ringSize, height: ringSize, borderRadius: ringSize / 2, borderColor: `${color}40` }]}>
      {/* Outer decorative ring (web only filter glow) */}
      {Platform.OS === 'web' && (
        <View style={[
          StyleSheet.absoluteFillObject,
          { borderRadius: ringSize / 2, borderWidth: 1, borderColor: `${color}30` },
          { ...(({ filter: `blur(4px)` } as any)) },
        ]} />
      )}
      <LinearGradient
        colors={[bgFrom, bgTo]}
        style={[styles.badge, { width: size, height: size, borderRadius: size / 2 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Inner highlight arc */}
        <View style={[styles.highlight, { width: size * 0.6, height: size * 0.22, borderRadius: size * 0.12 }]} />
        <Text style={[styles.initials, { fontSize, letterSpacing: initials.length > 2 ? 0.5 : 1 }]}>
          {initials}
        </Text>
        {/* Bottom accent line */}
        <View style={[styles.accentLine, { width: size * 0.42, backgroundColor: 'rgba(255,255,255,0.35)' }]} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    overflow: 'hidden',
  },
  highlight: {
    position: 'absolute',
    top: 6,
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  initials: {
    color: '#fff',
    fontWeight: '900',
    textAlign: 'center',
    ...(Platform.OS === 'web' ? ({ textShadow: '0 1px 4px rgba(0,0,0,0.4)' } as any) : {}),
  },
  accentLine: {
    height: 1.5,
    borderRadius: 1,
    marginTop: 2,
  },
});

