import React, { useRef, useState } from 'react';
import { Animated, Linking, Platform, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { RADIUS, FONT_FAMILY } from '../constants/theme';
import { NAV_LINKS, PROFILE, SOCIAL, CONTACT } from '../constants/data';

interface Props {
  scrollY: Animated.Value;
  onNavPress?: (section: string) => void;
}

export default function Navbar({ scrollY, onNavPress }: Props) {
  const { colors, isDark, toggleTheme } = useTheme();
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const useNativeDriver = Platform.OS !== 'web';
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuAnim = useRef(new Animated.Value(0)).current;
  const line1 = useRef(new Animated.Value(0)).current;
  const line3 = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toOpen = !menuOpen;
    setMenuOpen(toOpen);
    Animated.parallel([
      Animated.timing(menuAnim, { toValue: toOpen ? 1 : 0, duration: 240, useNativeDriver }),
      Animated.timing(line1, { toValue: toOpen ? 1 : 0, duration: 200, useNativeDriver }),
      Animated.timing(line3, { toValue: toOpen ? 1 : 0, duration: 200, useNativeDriver }),
    ]).start();
  };

  const handleNavPress = (section: string) => {
    if (menuOpen) toggleMenu();
    onNavPress?.(section);
  };

  const bgOpacity = scrollY.interpolate({ inputRange: [0, 80], outputRange: [0.72, 0.92], extrapolate: 'clamp' });
  const menuY = menuAnim.interpolate({ inputRange: [0, 1], outputRange: [-12, 0] });
  const rot1 = line1.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '45deg'] });
  const rot3 = line3.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-45deg'] });
  const midOp = line1.interpolate({ inputRange: [0, 0.4, 1], outputRange: [1, 0, 0] });

  const webFixed: any = Platform.OS === 'web'
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backdropFilter: 'saturate(180%) blur(22px)',
        WebkitBackdropFilter: 'saturate(180%) blur(22px)',
      }
    : {};

  const styles = getStyles(colors, isDark);

  return (
    <View style={[styles.wrapper, webFixed]}>
      <Animated.View style={[StyleSheet.absoluteFillObject, styles.bg, { opacity: bgOpacity }]} />

      <View style={styles.inner}>
        <Pressable onPress={() => handleNavPress('hero')} style={styles.logoBtn}>
          <View style={styles.logoMark}>
            <Text style={styles.logoText}>{PROFILE.initials}</Text>
          </View>
          {isWide && <Text style={styles.logoName}>{PROFILE.name}</Text>}
        </Pressable>

        {isWide && (
          <View style={styles.links}>
            {NAV_LINKS.map((link) => (
              <Pressable
                key={link.section}
                onPress={() => handleNavPress(link.section)}
                onHoverIn={() => setHoveredLink(link.section)}
                onHoverOut={() => setHoveredLink(null)}
                style={styles.linkBtn}
              >
                <Text style={[styles.link, hoveredLink === link.section && styles.linkHover]}>{link.label}</Text>
              </Pressable>
            ))}
          </View>
        )}

        <View style={styles.right}>
          <Pressable
            style={({ pressed, hovered }: any) => [styles.themeToggleBtn, (pressed || hovered) && styles.themeToggleHover]}
            onPress={toggleTheme}
            accessibilityRole="button"
            accessibilityLabel="Toggle visual theme"
            hitSlop={8}
          >
            <Text style={styles.themeToggleText}>{isDark ? 'L' : 'D'}</Text>
          </Pressable>

          {isWide && (
            <Pressable
              style={({ pressed, hovered }: any) => [styles.contactBtn, (pressed || hovered) && styles.contactBtnHover]}
              onPress={() => Linking.openURL(`mailto:${CONTACT.email}`)}
            >
              <Text style={styles.contactText}>{'Start a project ->'}</Text>
            </Pressable>
          )}

          {!isWide && (
            <Pressable onPress={toggleMenu} style={styles.hamburger} hitSlop={12}>
              <Animated.View style={[styles.bar, { transform: [{ rotate: rot1 }, { translateY: line1.interpolate({ inputRange: [0, 1], outputRange: [0, 7] }) }] }]} />
              <Animated.View style={[styles.bar, { opacity: midOp }]} />
              <Animated.View style={[styles.bar, { transform: [{ rotate: rot3 }, { translateY: line3.interpolate({ inputRange: [0, 1], outputRange: [0, -7] }) }] }]} />
            </Pressable>
          )}
        </View>
      </View>

      {!isWide && menuOpen && (
        <Animated.View style={[styles.mobileMenu, { opacity: menuAnim, transform: [{ translateY: menuY }] }]}>
          {NAV_LINKS.map((link, i) => (
            <Pressable
              key={link.section}
              onPress={() => handleNavPress(link.section)}
              style={({ pressed }: any) => [styles.mobileLink, pressed && { backgroundColor: isDark ? 'rgba(6,182,212,0.08)' : 'rgba(37,99,235,0.08)' }]}
            >
              <Text style={styles.mobileLinkNum}>0{i + 1}</Text>
              <Text style={styles.mobileLinkTxt}>{link.label}</Text>
              <Text style={styles.mobileArrow}>{'->'}</Text>
            </Pressable>
          ))}
          <View style={styles.mobileSocial}>
            {SOCIAL.map((s) => (
              <Pressable
                key={s.label}
                style={styles.socialChip}
                onPress={() => {
                  Linking.openURL(s.url);
                }}
              >
                <Text style={styles.socialChipText}>{s.label}</Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const getStyles = (colors: any, isDark: boolean) => StyleSheet.create({
  wrapper: {
    height: 56,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.navBorder,
  },
  bg: { backgroundColor: colors.navBg },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 1180,
    alignSelf: 'center',
    paddingHorizontal: 20,
    gap: 16,
  },
  logoBtn: { flexDirection: 'row', alignItems: 'center', gap: 10, minWidth: 120 },
  logoMark: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
  },
  logoText: { color: colors.bg, fontWeight: '800', fontSize: 12, letterSpacing: 0.4, fontFamily: FONT_FAMILY.header },
  logoName: { color: colors.textPrimary, fontSize: 13, fontWeight: '700', letterSpacing: 0.1, fontFamily: FONT_FAMILY.header },
  links: { flex: 1, flexDirection: 'row', justifyContent: 'center', gap: 28 },
  linkBtn: { paddingVertical: 10 },
  link: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.1,
    fontFamily: FONT_FAMILY.accent,
    ...(Platform.OS === 'web' ? ({ transition: 'color 160ms ease' } as any) : {}),
  },
  linkHover: { color: colors.textPrimary },
  right: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', minWidth: 120 },
  themeToggleBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 12,
    backgroundColor: colors.surface,
    ...(Platform.OS === 'web' ? ({ transition: 'all 160ms ease', cursor: 'pointer' } as any) : {}),
  },
  themeToggleHover: {
    backgroundColor: colors.cardHover,
    borderColor: colors.borderBright,
  },
  themeToggleText: {
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  contactBtn: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: RADIUS.full,
    backgroundColor: colors.textPrimary,
    ...(Platform.OS === 'web' ? ({ transition: 'background-color 160ms ease, transform 160ms ease' } as any) : {}),
  },
  contactBtnHover: { backgroundColor: isDark ? '#fff' : '#000', transform: [{ translateY: -1 }] },
  contactText: { color: colors.bg, fontSize: 12, fontWeight: '700', fontFamily: FONT_FAMILY.accent },
  hamburger: { gap: 5, padding: 6, justifyContent: 'center', alignItems: 'center' },
  bar: { width: 22, height: 2, backgroundColor: colors.textPrimary, borderRadius: 1 },
  mobileMenu: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    paddingVertical: 8,
    overflow: 'hidden',
    backgroundColor: colors.bg === '#000000' ? 'rgba(0,0,0,0.96)' : 'rgba(250,249,246,0.96)',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    zIndex: 99,
    ...(Platform.OS === 'web' ? ({ backdropFilter: 'blur(20px)' } as any) : {}),
  },
  mobileLink: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 24, paddingVertical: 14 },
  mobileLinkNum: { color: colors.textDim, fontSize: 11, fontWeight: '700', width: 22, fontFamily: FONT_FAMILY.accent },
  mobileLinkTxt: { color: colors.textPrimary, fontSize: 20, fontWeight: '700', flex: 1, letterSpacing: -0.4, fontFamily: FONT_FAMILY.header },
  mobileArrow: { color: colors.textDim, fontSize: 16, fontWeight: '700' },
  mobileSocial: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 4,
    flexWrap: 'wrap',
  },
  socialChip: { paddingVertical: 7, paddingHorizontal: 14, borderRadius: RADIUS.full, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  socialChipText: { color: colors.textSecondary, fontSize: 12, fontWeight: '700', fontFamily: FONT_FAMILY.accent },
});

