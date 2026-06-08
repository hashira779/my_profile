import React from 'react';
import { Linking, Platform, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { RADIUS, FONT_FAMILY } from '../constants/theme';
import { CONTACT } from '../constants/data';
import AnimatedSection from './AnimatedSection';
import { sectionPadH, sectionPadV } from '../utils/responsive';
import { usePrefersReducedMotion } from '../utils/motion';
import { webAnim } from '../utils/webAnimKeyframes';

const CONTACT_METHODS = [
  { label: 'Email', value: CONTACT.email, action: `mailto:${CONTACT.email}` },
  { label: 'Telegram', value: '@chhoy_too', action: CONTACT.telegram },
  { label: 'Phone', value: CONTACT.phone, action: `tel:${CONTACT.phone}` },
];

export default function ContactSection() {
  const { colors, isDark } = useTheme();
  const { width } = useWindowDimensions();
  const reduceMotion = usePrefersReducedMotion();
  const isWide = width >= 860;
  const ph = sectionPadH(width);
  const pv = Math.max(56, sectionPadV(width) * 0.8);
  const titleSize = width >= 1180 ? 58 : width >= 760 ? 48 : width >= 480 ? 38 : 31;
  const titleLine = width >= 1180 ? 62 : width >= 760 ? 53 : width >= 480 ? 44 : 37;
  const styles = getStyles(colors, isDark);

  return (
    <View style={[styles.wrapper, { paddingHorizontal: ph, paddingVertical: pv }]}> 
      <AnimatedSection direction="up">
        <View style={[styles.panel, isWide && styles.panelWide]}>
          <View
            style={[
              styles.panelSheen,
              Platform.OS === 'web' && !reduceMotion ? webAnim.panelSheen('7s') : null,
              { pointerEvents: 'none' } as any,
            ]}
          />
          <View style={[styles.leftCol, isWide && styles.leftColWide]}>
            <View style={styles.labelRow}>
              <Text style={styles.sectionCode}>06</Text>
              <View style={[styles.labelLine, Platform.OS === 'web' && !reduceMotion ? webAnim.softBreathe('3.8s') : null]} />
              <Text style={styles.labelText}>Contact</Text>
            </View>

            <Text style={[styles.title, { fontSize: titleSize, lineHeight: titleLine }]}>
              Let's talk about useful systems, not decoration.
            </Text>

            <Text style={styles.description}>
              I am available for IT development, system analysis, internal tools, reporting workflows, and AI-assisted automation work.
            </Text>
          </View>

          <View style={styles.rightCol}>
            <Text style={styles.statusText}>Available for direct contact</Text>

            <View style={styles.methodList}>
              {CONTACT_METHODS.map((item) => (
                <Pressable
                  key={item.label}
                  onPress={() => Linking.openURL(item.action)}
                  style={({ pressed, hovered }: any) => [
                    styles.methodRow,
                    (pressed || hovered) && styles.methodRowHover,
                  ]}
                >
                  <View style={styles.methodMeta}>
                    <Text style={styles.methodLabel}>{item.label}</Text>
                    <Text style={styles.methodValue}>{item.value}</Text>
                  </View>
                  <Text style={styles.methodArrow}>{'->'}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.locationBlock}>
              <Text style={styles.locationLabel}>Based in</Text>
              <Text style={styles.locationValue}>{CONTACT.location}</Text>
            </View>
          </View>
        </View>
      </AnimatedSection>
    </View>
  );
}

const getStyles = (colors: any, isDark: boolean) => {
  const panelShadow = Platform.OS === 'web'
    ? ({ boxShadow: isDark ? '0 32px 90px rgba(0,0,0,0.38)' : '0 28px 80px rgba(24,24,22,0.08)' } as any)
    : {};

  return StyleSheet.create({
    wrapper: {
      maxWidth: 1180,
      alignSelf: 'center',
      width: '100%',
      justifyContent: 'center',
      flex: 1,
    },
    panel: {
      width: '100%',
      borderRadius: 30,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: isDark ? 'rgba(255,255,255,0.035)' : '#F3EFE6',
      overflow: 'hidden',
      ...panelShadow,
    },
    panelWide: {
      flexDirection: 'row',
      minHeight: 390,
    },
    panelSheen: {
      position: 'absolute',
      top: -40,
      bottom: -40,
      left: 0,
      width: 120,
      zIndex: 1,
      opacity: 0,
      ...(Platform.OS === 'web'
        ? ({
            backgroundImage: `linear-gradient(100deg, transparent 0%, ${isDark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.55)'} 50%, transparent 100%)`,
          } as any)
        : {}),
    },
    leftCol: {
      flex: 1.1,
      padding: 28,
      justifyContent: 'space-between',
      gap: 26,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    leftColWide: {
      borderBottomWidth: 0,
      borderRightWidth: 1,
      borderRightColor: colors.border,
    },
    rightCol: {
      flex: 0.9,
      padding: 18,
      gap: 14,
      backgroundColor: isDark ? 'rgba(0,0,0,0.22)' : 'rgba(255,255,255,0.46)',
    },
    labelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    sectionCode: {
      color: colors.textDim,
      fontSize: 12,
      fontWeight: '900',
      letterSpacing: 1.5,
      fontFamily: FONT_FAMILY.accent,
    },
    labelLine: {
      width: 42,
      height: 1,
      backgroundColor: colors.borderBright,
    },
    labelText: {
      color: colors.textMuted,
      fontSize: 12,
      fontWeight: '900',
      letterSpacing: 1.8,
      textTransform: 'uppercase',
      fontFamily: FONT_FAMILY.accent,
    },
    title: {
      color: colors.textPrimary,
      fontWeight: '900',
      letterSpacing: -2.2,
      maxWidth: 650,
      fontFamily: FONT_FAMILY.header,
    },
    description: {
      color: colors.textSecondary,
      fontSize: 16,
      lineHeight: 25,
      fontWeight: '600',
      maxWidth: 560,
      fontFamily: FONT_FAMILY.body,
    },
    statusText: {
      color: colors.textPrimary,
      fontSize: 13,
      fontWeight: '900',
      letterSpacing: 1.1,
      textTransform: 'uppercase',
      padding: 12,
      fontFamily: FONT_FAMILY.accent,
    },
    methodList: {
      gap: 10,
    },
    methodRow: {
      minHeight: 78,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 14,
      paddingVertical: 15,
      paddingHorizontal: 16,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: isDark ? 'rgba(255,255,255,0.035)' : 'rgba(255,255,255,0.64)',
      ...(Platform.OS === 'web' ? ({ transition: 'all 180ms ease', cursor: 'pointer' } as any) : {}),
    },
    methodRowHover: {
      borderColor: colors.accent,
      transform: [{ translateX: 4 }],
      backgroundColor: isDark ? 'rgba(6,182,212,0.08)' : 'rgba(37,99,235,0.07)',
    },
    methodMeta: {
      flex: 1,
      gap: 5,
    },
    methodLabel: {
      color: colors.textDim,
      fontSize: 11,
      fontWeight: '900',
      letterSpacing: 1.3,
      textTransform: 'uppercase',
      fontFamily: FONT_FAMILY.accent,
    },
    methodValue: {
      color: colors.textPrimary,
      fontSize: 17,
      lineHeight: 22,
      fontWeight: '900',
      fontFamily: FONT_FAMILY.header,
    },
    methodArrow: {
      color: colors.accent,
      fontSize: 15,
      fontWeight: '900',
      fontFamily: FONT_FAMILY.accent,
    },
    locationBlock: {
      marginTop: 4,
      padding: 16,
      borderRadius: 20,
      backgroundColor: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(24,24,22,0.045)',
      borderWidth: 1,
      borderColor: colors.border,
      gap: 5,
    },
    locationLabel: {
      color: colors.textDim,
      fontSize: 11,
      fontWeight: '900',
      letterSpacing: 1.3,
      textTransform: 'uppercase',
      fontFamily: FONT_FAMILY.accent,
    },
    locationValue: {
      color: colors.textSecondary,
      fontSize: 14,
      lineHeight: 21,
      fontWeight: '700',
      fontFamily: FONT_FAMILY.body,
    },
  });
};
