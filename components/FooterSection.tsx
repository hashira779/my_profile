import React from 'react';
import { Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, RADIUS } from '../constants/theme';
import { PROFILE, SOCIAL } from '../constants/data';

export default function FooterSection() {
  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
      <View style={styles.wrapper}>
        <View style={styles.dividerRow}>
          <LinearGradient
              colors={['transparent', COLORS.indigo, COLORS.sky, 'transparent']}
              style={styles.divider}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
          />
        </View>

        <View style={styles.inner}>
          <View style={styles.logoWrap}>
            <LinearGradient
                colors={GRADIENTS.button}
                style={styles.logoGrad}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
              <Text style={styles.logoText}>{PROFILE.initials}</Text>
            </LinearGradient>
          </View>

          <Text style={styles.tagline}>
            Building reliable systems, practical tools, and better digital workflows.
          </Text>

          <View style={styles.socialRow}>
            {SOCIAL.map((s) => (
                <Pressable
                    key={s.label}
                    style={({ pressed, hovered }: any) => [
                      styles.socialBtn,
                      { borderColor: `${s.color}40` },
                      (pressed || hovered) && {
                        backgroundColor: `${s.color}12`,
                        borderColor: s.color,
                        transform: [{ translateY: -2 }],
                      },
                    ]}
                    onPress={() => openLink(s.url)}
                >
                  <Text style={[styles.socialText, { color: s.color }]}>{s.label}</Text>
                </Pressable>
            ))}
          </View>

          <Text style={styles.copy}>
            © 2026 Chhoy Too · System Analyst & Web Developer · Built with React Native Web + Expo
          </Text>

          <Text style={styles.status}>Open to opportunities</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingBottom: 48,
    paddingTop: 16,
  },
  dividerRow: {
    marginBottom: 32,
  },
  divider: {
    height: 1,
  },
  inner: {
    alignItems: 'center',
    gap: 16,
  },
  logoWrap: {
    borderRadius: RADIUS.md,
    overflow: 'hidden',
  },
  logoGrad: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.md,
  },
  logoText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
    letterSpacing: 1,
  },
  tagline: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    maxWidth: 520,
    lineHeight: 22,
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
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...(Platform.OS === 'web' ? ({ transition: 'all 0.2s' } as any) : {}),
  },
  socialText: {
    fontSize: 13,
    fontWeight: '700',
  },
  copy: {
    color: COLORS.textMuted,
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 18,
  },
  status: {
    color: COLORS.sky,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});