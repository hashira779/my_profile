import React, { useRef, useState } from 'react';
import { Animated, Platform, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, RADIUS } from '../constants/theme';
import { NAV_LINKS, PROFILE, SOCIAL } from '../constants/data';

interface Props {
  scrollY: Animated.Value;
  onNavPress?: (section: string) => void;
}

export default function Navbar({ scrollY, onNavPress }: Props) {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuAnim = useRef(new Animated.Value(0)).current;
  const line1 = useRef(new Animated.Value(0)).current;
  const line3 = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toOpen = !menuOpen;
    setMenuOpen(toOpen);
    Animated.parallel([
      Animated.timing(menuAnim, { toValue: toOpen ? 1 : 0, duration: 280, useNativeDriver: true }),
      Animated.timing(line1, { toValue: toOpen ? 1 : 0, duration: 220, useNativeDriver: true }),
      Animated.timing(line3, { toValue: toOpen ? 1 : 0, duration: 220, useNativeDriver: true }),
    ]).start();
  };

  const handleNavPress = (section: string) => {
    if (menuOpen) toggleMenu();
    onNavPress?.(section);
  };

  const bgOpacity = scrollY.interpolate({ inputRange: [0, 80], outputRange: [0, 1], extrapolate: 'clamp' });
  const menuY = menuAnim.interpolate({ inputRange: [0, 1], outputRange: [-20, 0] });
  // Hamburger line rotations
  const rot1 = line1.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '45deg'] });
  const rot3 = line3.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-45deg'] });
  const midOp = line1.interpolate({ inputRange: [0, 0.4, 1], outputRange: [1, 0, 0] });

  const webFixed: any = Platform.OS === 'web'
    ? { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }
    : {};

  return (
    <View style={[styles.wrapper, webFixed]}>
      <Animated.View style={[StyleSheet.absoluteFillObject, styles.bg, { opacity: bgOpacity }]} />

      <View style={styles.inner}>
        {/* Logo */}
        <Pressable onPress={() => handleNavPress('hero')}>
          <View style={styles.logoWrap}>
            <LinearGradient colors={GRADIENTS.button} style={styles.logoGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <Text style={styles.logoTxt}>{PROFILE.initials}</Text>
            </LinearGradient>
          </View>
        </Pressable>

        {/* Desktop nav links */}
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
                <Text style={[styles.link, hoveredLink === link.section && styles.linkHov]}>
                  {link.label}
                </Text>
                {hoveredLink === link.section && <View style={styles.linkUnder} />}
              </Pressable>
            ))}
          </View>
        )}

        <View style={styles.right}>
          {isWide && (
            <Pressable
              style={({ pressed, hovered }: any) => [styles.hireBtn, (pressed || hovered) && styles.hireBtnHov]}
              onPress={() => handleNavPress('contact')}
            >
              <LinearGradient colors={GRADIENTS.button} style={styles.hireBtnGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <Text style={styles.hireTxt}>Hire Me</Text>
              </LinearGradient>
            </Pressable>
          )}

          {/* Hamburger — mobile only */}
          {!isWide && (
            <Pressable onPress={toggleMenu} style={styles.hamburger} hitSlop={12}>
              <Animated.View style={[styles.bar, { transform: [{ rotate: rot1 }, { translateY: line1.interpolate({ inputRange:[0,1], outputRange:[0,7.5] }) }] }]} />
              <Animated.View style={[styles.bar, { opacity: midOp }]} />
              <Animated.View style={[styles.bar, { transform: [{ rotate: rot3 }, { translateY: line3.interpolate({ inputRange:[0,1], outputRange:[0,-7.5] }) }] }]} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Mobile dropdown menu */}
      {!isWide && menuOpen && (
        <Animated.View style={[styles.mobileMenu, { opacity: menuAnim, transform: [{ translateY: menuY }] }]}>
          <LinearGradient colors={['rgba(15,23,42,0.98)', 'rgba(2,6,23,0.99)']} style={StyleSheet.absoluteFillObject} />
          {NAV_LINKS.map((link, i) => (
            <Pressable
              key={link.section}
              onPress={() => handleNavPress(link.section)}
              style={({ pressed }: any) => [styles.mobileLink, pressed && { backgroundColor: 'rgba(37,99,235,0.1)' }]}
            >
              <Text style={styles.mobileLinkNum}>0{i + 1}</Text>
              <Text style={styles.mobileLinkTxt}>{link.label}</Text>
              <Text style={styles.mobileLinkArrow}>→</Text>
            </Pressable>
          ))}
          <View style={styles.mobileSocial}>
            {SOCIAL.map((s) => (
              <Pressable key={s.label} style={[styles.socialChip, { borderColor: `${s.color}40` }]}
                onPress={() => { const { Linking } = require('react-native'); Linking.openURL(s.url); }}>
                <Text style={[styles.socialChipTxt, { color: s.color }]}>{s.label}</Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { height: 64, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: COLORS.navBorder },
  bg: { backgroundColor: COLORS.navBg },
  inner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, gap: 16 },
  logoWrap: { borderRadius: RADIUS.md, overflow: 'hidden' },
  logoGrad: { width: 38, height: 38, borderRadius: RADIUS.md, alignItems: 'center', justifyContent: 'center' },
  logoTxt: { color: '#fff', fontWeight: '900', fontSize: 15, letterSpacing: 1 },
  links: { flex: 1, flexDirection: 'row', justifyContent: 'center', gap: 28 },
  linkBtn: { alignItems: 'center', gap: 4 },
  link: { color: COLORS.textSecondary, fontSize: 14, fontWeight: '600', letterSpacing: 0.3 },
  linkHov: { color: COLORS.indigo },
  linkUnder: { height: 1.5, width: '100%', backgroundColor: COLORS.indigo, borderRadius: 1 },
  right: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  hireBtn: { borderRadius: RADIUS.full, overflow: 'hidden' },
  hireBtnHov: { opacity: 0.85 },
  hireBtnGrad: { paddingVertical: 8, paddingHorizontal: 20, alignItems: 'center' },
  hireTxt: { color: '#fff', fontWeight: '700', fontSize: 13 },
  hamburger: { gap: 5.5, padding: 6, justifyContent: 'center', alignItems: 'center' },
  bar: { width: 22, height: 2, backgroundColor: COLORS.textSecondary, borderRadius: 1 },
  mobileMenu: {
    position: 'absolute', top: 64, left: 0, right: 0,
    paddingVertical: 8, overflow: 'hidden',
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
    zIndex: 99,
    ...(Platform.OS === 'web' ? ({ backdropFilter: 'blur(20px)' } as any) : {}),
  },
  mobileLink: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    paddingHorizontal: 24, paddingVertical: 14,
  },
  mobileLinkNum: { color: COLORS.indigo, fontSize: 11, fontWeight: '700', width: 22 },
  mobileLinkTxt: { color: COLORS.textPrimary, fontSize: 18, fontWeight: '700', flex: 1 },
  mobileLinkArrow: { color: COLORS.textMuted, fontSize: 16 },
  mobileSocial: { flexDirection: 'row', gap: 10, paddingHorizontal: 24, paddingVertical: 14, borderTopWidth: 1, borderTopColor: COLORS.border, marginTop: 4 },
  socialChip: { paddingVertical: 6, paddingHorizontal: 16, borderRadius: RADIUS.full, borderWidth: 1 },
  socialChipTxt: { fontSize: 13, fontWeight: '600' },
});
