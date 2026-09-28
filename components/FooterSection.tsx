import React from 'react';
import { Linking, Platform, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { RADIUS, FONT_FAMILY } from '../constants/theme';
import { PROFILE, SOCIAL } from '../constants/data';
import { usePrefersReducedMotion } from '../utils/motion';
import { webAnim } from '../utils/webAnimKeyframes';

export default function FooterSection() {
  const { colors, isDark } = useTheme();
  const { width } = useWindowDimensions();
  const reduceMotion = usePrefersReducedMotion();
  const year = new Date().getFullYear();

  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) await Linking.openURL(url);
  };

  const styles = getStyles(colors, isDark, width);

  return (
    <View style={styles.wrapper}>
      {/* Decorative top gradient line */}
      <View style={styles.gradientLine} />

      <View style={styles.inner}>
        {/* Logo & tagline */}
        <View style={styles.brandBlock}>
          <View style={styles.logoRow}>
            <View style={styles.logoMark}>
              <Text style={styles.logoText}>{PROFILE.initials}</Text>
            </View>
            <Text style={styles.brandName}>{PROFILE.name}</Text>
          </View>
          <Text style={styles.tagline}>Building reliable systems, practical tools, and better digital workflows.</Text>
        </View>

        {/* Social buttons */}
        <View style={styles.socialRow}>
          {SOCIAL.map((s) => (
            <Pressable
              key={s.label}
              style={({ pressed, hovered }: any) => [styles.socialBtn, (pressed || hovered) && styles.socialBtnHover]}
              onPress={() => openLink(s.url)}
            >
              <View style={[styles.socialDot, { backgroundColor: s.color }]} />
              <Text style={styles.socialText}>{s.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Bottom line */}
        <View style={styles.bottomRow}>
          <Text style={styles.copy}>© {year} {PROFILE.name}. System Analyst & Developer.</Text>
          <View style={styles.techRow}>
            <Text style={styles.techText}>Built with React Native Web + Expo</Text>
            <View style={[styles.statusDot, Platform.OS === 'web' && !reduceMotion ? webAnim.softBreathe('3s') : null]} />
            <Text style={styles.statusLabel}>Open to opportunities</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const getStyles = (colors: any, isDark: boolean, width: number) => {
  const isWide = width >= 768;

  return StyleSheet.create({
    wrapper: {
      paddingHorizontal: 20,
      paddingBottom: 48,
      paddingTop: 4,
    },
    gradientLine: {
      height: 1,
      width: '100%',
      maxWidth: 1180,
      alignSelf: 'center',
      ...(Platform.OS === 'web' ? ({
        backgroundImage: isDark
          ? 'linear-gradient(90deg, transparent, rgba(6,182,212,0.4), rgba(139,92,246,0.3), rgba(52,211,153,0.3), transparent)'
          : 'linear-gradient(90deg, transparent, rgba(37,99,235,0.3), rgba(124,58,237,0.25), rgba(5,150,105,0.25), transparent)',
      } as any) : { backgroundColor: colors.border }),
    },
    inner: {
      maxWidth: 1180,
      alignSelf: 'center',
      width: '100%',
      gap: 24,
      paddingTop: 32,
    },
    brandBlock: {
      alignItems: 'center',
      gap: 12,
    },
    logoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    logoMark: {
      width: 42,
      height: 42,
      borderRadius: 21,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.textPrimary,
      ...(Platform.OS === 'web' ? ({
        boxShadow: isDark
          ? `0 8px 24px ${colors.accent}22`
          : '0 6px 18px rgba(0,0,0,0.08)',
      } as any) : {}),
    },
    logoText: {
      color: colors.bg,
      fontWeight: '900',
      fontSize: 15,
      letterSpacing: 0.6,
      fontFamily: FONT_FAMILY.header,
    },
    brandName: {
      color: colors.textPrimary,
      fontSize: 18,
      fontWeight: '900',
      letterSpacing: -0.4,
      fontFamily: FONT_FAMILY.header,
    },
    tagline: {
      color: colors.textSecondary,
      fontSize: 14,
      fontWeight: '700',
      textAlign: 'center',
      maxWidth: 520,
      lineHeight: 22,
      fontFamily: FONT_FAMILY.body,
    },
    socialRow: {
      flexDirection: 'row',
      gap: 10,
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    socialBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: RADIUS.full,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      ...(Platform.OS === 'web' ? ({
        transition: 'all 220ms cubic-bezier(0.22, 1, 0.36, 1)',
        cursor: 'pointer',
      } as any) : {}),
    },
    socialBtnHover: {
      backgroundColor: colors.cardHover,
      borderColor: colors.accent,
      transform: [{ translateY: -2 }, { scale: 1.03 }],
      ...(Platform.OS === 'web' ? ({
        boxShadow: isDark
          ? `0 8px 24px rgba(0,0,0,0.3)`
          : `0 6px 18px rgba(0,0,0,0.06)`,
      } as any) : {}),
    },
    socialDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
    },
    socialText: {
      color: colors.textSecondary,
      fontSize: 13,
      fontWeight: '900',
      fontFamily: FONT_FAMILY.accent,
    },
    bottomRow: {
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      alignItems: 'center',
      gap: 8,
      ...(isWide ? {
        flexDirection: 'row',
        justifyContent: 'space-between',
      } : {}),
    },
    copy: {
      color: colors.textMuted,
      fontSize: 11,
      lineHeight: 18,
      fontFamily: FONT_FAMILY.body,
    },
    techRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    techText: {
      color: colors.textDim,
      fontSize: 11,
      fontFamily: FONT_FAMILY.body,
    },
    statusDot: {
      width: 5,
      height: 5,
      borderRadius: 3,
      backgroundColor: colors.emerald,
    },
    statusLabel: {
      color: colors.accent,
      fontSize: 11,
      fontWeight: '900',
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      fontFamily: FONT_FAMILY.accent,
    },
  });
};
