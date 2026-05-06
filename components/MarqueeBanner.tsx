import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/theme';
import { usePrefersReducedMotion } from '../utils/motion';
import { webAnim } from '../utils/webAnimKeyframes';

const ITEMS = [
  'System Analysis', 'TypeScript', 'React Native', 'Python', 'MySQL',
  'REST APIs', 'Telegram Bot', 'HTML / CSS', 'Linux', 'POS Systems',
  'Database Design', 'IT Support', 'Data Automation', 'Node.js', 'Git',
  'Project Management', 'IoT Integration', 'PHP', 'Agile', 'Expo',
  'System Analysis', 'TypeScript', 'React Native', 'Python', 'MySQL',
  'REST APIs', 'Telegram Bot', 'HTML / CSS', 'Linux', 'POS Systems',
  'Database Design', 'IT Support', 'Data Automation', 'Node.js', 'Git',
  'Project Management', 'IoT Integration', 'PHP', 'Agile', 'Expo',
];

const DOT_COLORS = ['#2563EB', '#0EA5E9', '#059669', '#64748B'];

// Must live outside the component so StyleSheet.create compiles it once.
// animationKeyframes only works when the style is a registered StyleSheet
// reference — spreading it into a plain inline object silently drops it in RNW.
const trackBase = StyleSheet.create({
  s: { display: 'flex' as any, flexDirection: 'row', width: 'max-content' as any },
}).s;

export default function MarqueeBanner() {
  const reduceMotion = usePrefersReducedMotion();

  const trackStyle: any = Platform.OS === 'web'
    ? [trackBase, reduceMotion ? null : webAnim.marquee('40s')]
    : { flexDirection: 'row' };

  const trackRevStyle: any = Platform.OS === 'web'
    ? [trackBase, reduceMotion ? null : webAnim.marqueeRev('36s')]
    : { flexDirection: 'row' };

  return (
    <View style={styles.wrapper}>
      {Platform.OS === 'web' && (
        <>
          <View style={[StyleSheet.absoluteFillObject, styles.fadeL, { pointerEvents: 'none' } as any]} />
          <View style={[StyleSheet.absoluteFillObject, styles.fadeR, { pointerEvents: 'none' } as any]} />
        </>
      )}

      <LinearGradient
        colors={['transparent', 'rgba(37,99,235,0.18)', 'transparent']}
        style={styles.topLine}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />

      <View style={styles.overflow}>
        <View style={trackStyle}>
          {ITEMS.map((item, i) => (
            <View key={`f-${i}`} style={styles.chip}>
              <View style={[styles.dot, { backgroundColor: DOT_COLORS[i % DOT_COLORS.length] }]} />
              <Text style={styles.label}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.overflow, { marginTop: 4 }]}>
        <View style={trackRevStyle}>
          {[...ITEMS].reverse().map((item, i) => (
            <View key={`r-${i}`} style={[styles.chip, styles.chipRev]}>
              <View style={[styles.dot, { backgroundColor: DOT_COLORS[(i + 2) % DOT_COLORS.length] }]} />
              <Text style={[styles.label, { color: COLORS.textMuted, opacity: 0.65 }]}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <LinearGradient
        colors={['transparent', 'rgba(37,99,235,0.18)', 'transparent']}
        style={styles.botLine}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { paddingVertical: 6, position: 'relative', overflow: 'hidden' },
  overflow: { overflow: 'hidden' },
  topLine: { height: 1, marginBottom: 8 },
  botLine: { height: 1, marginTop: 8 },
  fadeL: {
    ...(Platform.OS === 'web'
      ? ({ backgroundImage: 'linear-gradient(90deg, #05070D 0%, transparent 12%)' } as any)
      : {}),
    zIndex: 2,
  },
  fadeR: {
    ...(Platform.OS === 'web'
      ? ({ backgroundImage: 'linear-gradient(270deg, #05070D 0%, transparent 12%)' } as any)
      : {}),
    zIndex: 2,
  },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 20, paddingVertical: 6 },
  chipRev: { paddingVertical: 4 },
  dot: { width: 5, height: 5, borderRadius: 3 },
  label: { color: COLORS.textMuted, fontSize: 12, fontWeight: '600', letterSpacing: 0.5 },
});
