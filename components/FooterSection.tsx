import React from 'react';
import { Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { RADIUS, FONT_FAMILY } from '../constants/theme';
import { PROFILE, SOCIAL } from '../constants/data';

export default function FooterSection() {
  const { colors, isDark } = useTheme();

  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) await Linking.openURL(url);
  };

  const styles = getStyles(colors, isDark);

  return (
    <View style={styles.wrapper}>
      <View style={styles.inner}>
        <View style={styles.logoMark}>
          <Text style={styles.logoText}>{PROFILE.initials}</Text>
        </View>

        <Text style={styles.tagline}>Building reliable systems, practical tools, and better digital workflows.</Text>

        <View style={styles.socialRow}>
          {SOCIAL.map((s) => (
            <Pressable
              key={s.label}
              style={({ pressed, hovered }: any) => [styles.socialBtn, (pressed || hovered) && styles.socialBtnHover]}
              onPress={() => openLink(s.url)}
            >
              <Text style={styles.socialText}>{s.label}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.copy}>2026 Chhoy Too. System Analyst and Web Developer. Built with React Native Web and Expo.</Text>
        <Text style={styles.status}>Open to opportunities</Text>
      </View>
    </View>
  );
}

const getStyles = (colors: any, isDark: boolean) => StyleSheet.create({
  wrapper: { paddingHorizontal: 20, paddingBottom: 46, paddingTop: 18 },
  inner: {
    maxWidth: 1180,
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
    gap: 16,
    paddingTop: 28,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  logoMark: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.textPrimary },
  logoText: { color: colors.bg, fontWeight: '900', fontSize: 15, letterSpacing: 0.6, fontFamily: FONT_FAMILY.header },
  tagline: { color: colors.textSecondary, fontSize: 14, fontWeight: '700', textAlign: 'center', maxWidth: 520, lineHeight: 22, fontFamily: FONT_FAMILY.body },
  socialRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap', justifyContent: 'center' },
  socialBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...(Platform.OS === 'web' ? ({ transition: 'all 180ms ease' } as any) : {}),
  },
  socialBtnHover: {
    backgroundColor: colors.cardHover,
    borderColor: colors.accent,
    transform: [{ translateY: -1 }],
  },
  socialText: { color: colors.textSecondary, fontSize: 13, fontWeight: '900', fontFamily: FONT_FAMILY.accent },
  copy: { color: colors.textMuted, fontSize: 11, textAlign: 'center', lineHeight: 18, fontFamily: FONT_FAMILY.body },
  status: { color: colors.accent, fontSize: 12, fontWeight: '900', letterSpacing: 1, textTransform: 'uppercase', fontFamily: FONT_FAMILY.accent },
});
