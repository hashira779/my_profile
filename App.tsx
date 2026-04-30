import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Animated, Platform, Pressable, SafeAreaView, ScrollView,
  StyleSheet, Text, View, useWindowDimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { injectGlobalStyles } from './utils/webStyles';
import { usePrefersReducedMotion } from './utils/motion';
import { pageSheenAnim, dividerScanAnim } from './utils/webAnimKeyframes';
import { ScrollAnimProvider } from './context/ScrollAnimContext';
import CursorGlow from './components/CursorGlow';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import MarqueeBanner from './components/MarqueeBanner';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';

// Section definitions for dot navigation
const SECTIONS = [
  { key: 'hero',       label: 'Home',       color: '#2563EB' },
  { key: 'about',      label: 'About',      color: '#0EA5E9' },
  { key: 'projects',   label: 'Projects',   color: '#2563EB' },
  { key: 'skills',     label: 'Skills',     color: '#059669' },
  { key: 'experience', label: 'Experience', color: '#7C3AED' },
  { key: 'education',  label: 'Education',  color: '#D97706' },
  { key: 'contact',    label: 'Contact',    color: '#0EA5E9' },
];

// Scroll-reactive page backdrop
function ScrollBackdrop({ scrollY }: { scrollY: Animated.Value }) {
  const reduceMotion = usePrefersReducedMotion();
  const gridY = scrollY.interpolate({
    inputRange: [0, 1600],
    outputRange: [0, -80],
    extrapolate: 'clamp',
  });
  const gridOpacity = scrollY.interpolate({
    inputRange: [0, 700, 1600],
    outputRange: [0.34, 0.24, 0.16],
    extrapolate: 'clamp',
  });
  const webSheen: any = Platform.OS === 'web' && !reduceMotion ? pageSheenAnim() : {};

  return (
    <View style={[backStyles.wrap, { pointerEvents: 'none' } as any]}>
      <Animated.View style={[backStyles.grid, reduceMotion ? { opacity: 0.28 } : { opacity: gridOpacity, transform: [{ translateY: gridY }] }]} />
      <View style={backStyles.glowTop} />
      <View style={backStyles.glowBottom} />
      <View style={[backStyles.sheen, webSheen]} />
      <View style={backStyles.vignette} />
    </View>
  );
}

// Floating right-side dot navigator (web only, hidden on small screens)
function DotNav({
  active, onPress, sections,
}: {
  active: string;
  onPress: (s: string) => void;
  sections: typeof SECTIONS;
}) {
  const { width } = useWindowDimensions();
  if (Platform.OS !== 'web' || width < 1024) return null;
  return (
    <View style={dotStyles.wrap}>
      {sections.map((s) => {
        const isActive = active === s.key;
        return (
          <Pressable key={s.key} onPress={() => onPress(s.key)} style={dotStyles.dot} hitSlop={8}>
            <View style={[
              dotStyles.dotInner,
              isActive
                ? { width: 10, height: 10, backgroundColor: s.color, borderRadius: 5 }
                : { width: 6, height: 6, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 3 },
              Platform.OS === 'web' ? ({ transition: 'all 0.3s' } as any) : {},
            ]} />
            {isActive && (
              <Text style={[dotStyles.label, { color: s.color }]}>{s.label}</Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

// Gradient transition divider between sections
function SectionDivider({ flip = false }: { flip?: boolean }) {
  const reduceMotion = usePrefersReducedMotion();
  const sparkStyle: any = Platform.OS === 'web' && !reduceMotion ? dividerScanAnim(flip) : {};
  return (
    <View style={[divStyles.wrap, { pointerEvents: 'none' } as any]}>
      <LinearGradient
        colors={flip
          ? ['transparent', 'rgba(37,99,235,0.055)', 'rgba(14,165,233,0.035)', 'transparent']
          : ['transparent', 'rgba(14,165,233,0.035)', 'rgba(37,99,235,0.055)', 'transparent']}
        style={divStyles.grad}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
      />
      {Platform.OS === 'web' && !reduceMotion && <View style={[divStyles.spark, sparkStyle]} />}
    </View>
  );
}

export default function App() {
  const { height: windowHeight } = useWindowDimensions();
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const sectionOffsets = useRef<Record<string, number>>({});
  const [contentHeight, setContentHeight] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    injectGlobalStyles();
  }, []);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (e: any) => {
        const y = e.nativeEvent.contentOffset.y;
        // Determine active section
        const offsets = sectionOffsets.current;
        let current = 'hero';
        for (const s of SECTIONS) {
          if (offsets[s.key] !== undefined && y + windowHeight * 0.4 >= offsets[s.key]) {
            current = s.key;
          }
        }
        setActiveSection(current);
      },
    }
  );

  const scrollToSection = useCallback((section: string) => {
    const y = sectionOffsets.current[section];
    if (y !== undefined) {
      scrollViewRef.current?.scrollTo({ y: Math.max(0, y - 72), animated: true });
    }
  }, []);

  const registerSection = (section: string) => (event: any) => {
    sectionOffsets.current[section] = event.nativeEvent.layout.y;
  };

  return (
    <ScrollAnimProvider windowHeight={windowHeight} scrollY={scrollY}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <ScrollBackdrop scrollY={scrollY} />

        {/* Web-only: cursor glow effect */}
        <CursorGlow />

        <Navbar scrollY={scrollY} onNavPress={scrollToSection} />
        <ScrollProgress scrollY={scrollY} contentHeight={contentHeight} windowHeight={windowHeight} />

        <ScrollView
          ref={scrollViewRef}
          id="scroll-root"
          style={[styles.scroll, Platform.OS === 'web' ? ({ overflowY: 'scroll' } as any) : {}]}
          contentContainerStyle={styles.content}
          scrollEventThrottle={16}
          onScroll={handleScroll}
          onContentSizeChange={(_, h) => setContentHeight(h)}
          showsVerticalScrollIndicator={false}
        >
          {/* ── HERO (full screen) ───────────────────── */}
          <View
            onLayout={registerSection('hero')}
            style={[styles.sectionFull, { minHeight: windowHeight }]}
          >
            <HeroSection />
          </View>

          {/* Marquee connector */}
          <MarqueeBanner />

          {/* ── ABOUT ───────────────────────────────── */}
          <SectionDivider />
          <View onLayout={registerSection('about')} style={styles.sectionBlock}>
            <AboutSection />
          </View>

          {/* ── PROJECTS ────────────────────────────── */}
          <SectionDivider flip />
          <View onLayout={registerSection('projects')} style={styles.sectionBlock}>
            <ProjectsSection />
          </View>

          {/* ── SKILLS ──────────────────────────────── */}
          <SectionDivider />
          <View onLayout={registerSection('skills')} style={styles.sectionBlock}>
            <SkillsSection />
          </View>

          {/* ── EXPERIENCE ──────────────────────────── */}
          <SectionDivider flip />
          <View onLayout={registerSection('experience')} style={styles.sectionBlock}>
            <ExperienceSection />
          </View>

          {/* ── EDUCATION ───────────────────────────── */}
          <SectionDivider />
          <View onLayout={registerSection('education')} style={styles.sectionBlock}>
            <EducationSection />
          </View>

          {/* ── CONTACT (full screen CTA) ────────────── */}
          <SectionDivider flip />
          <View onLayout={registerSection('contact')} style={[styles.sectionFull, { minHeight: windowHeight * 0.75 }]}>
            <ContactSection />
          </View>

          <FooterSection />
        </ScrollView>
      </SafeAreaView>
    </ScrollAnimProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#05070D' },
  scroll: {
    flex: 1,
    backgroundColor: 'transparent',
    zIndex: 1,
    ...(Platform.OS === 'web' ? { marginTop: 64 } as any : {}),
  },
  content: { paddingBottom: 0 },
  // Full-viewport section (Hero, Contact)
  sectionFull: {
    justifyContent: 'center',
    overflow: 'hidden',
  },
  // Content sections with generous Apple-style vertical breathing room
  sectionBlock: {
    paddingVertical: Platform.OS === 'web' ? 40 : 0,
  },
});

const backStyles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    backgroundColor: '#05070D',
    zIndex: 0,
  },
  grid: {
    position: 'absolute',
    top: -120,
    left: 0,
    right: 0,
    height: '140%',
    ...(Platform.OS === 'web'
      ? ({
          backgroundImage: `
            linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,165,233,0.035) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 16%, black 76%, transparent 100%)',
        } as any)
      : {}),
  },
  glowTop: {
    position: 'absolute',
    top: -220,
    right: -160,
    width: 640,
    height: 640,
    borderRadius: 320,
    backgroundColor: 'rgba(37,99,235,0.1)',
    ...(Platform.OS === 'web' ? ({ filter: 'blur(80px)' } as any) : {}),
  },
  glowBottom: {
    position: 'absolute',
    bottom: -260,
    left: -180,
    width: 620,
    height: 620,
    borderRadius: 310,
    backgroundColor: 'rgba(14,165,233,0.07)',
    ...(Platform.OS === 'web' ? ({ filter: 'blur(90px)' } as any) : {}),
  },
  sheen: {
    position: 'absolute',
    top: 0, bottom: 0,
    left: '-45%',
    width: '38%',
    ...(Platform.OS === 'web'
      ? ({
          backgroundImage: 'linear-gradient(100deg, transparent 0%, rgba(255,255,255,0.025) 48%, transparent 100%)',
        } as any)
      : {}),
  },
  vignette: {
    ...StyleSheet.absoluteFillObject,
    ...(Platform.OS === 'web'
      ? ({
          backgroundImage:
            'radial-gradient(ellipse at center, transparent 0%, transparent 48%, rgba(0,0,0,0.72) 100%)',
        } as any)
      : { backgroundColor: 'transparent' }),
  },
});

// Dot nav styles
const dotStyles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    right: 24,
    top: '50%',
    zIndex: 500,
    gap: 14,
    alignItems: 'center',
    ...(Platform.OS === 'web' ? ({ transform: 'translateY(-50%)' } as any) : {}),
  },
  dot: { alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  dotInner: {},
  label: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
});

// Divider styles
const divStyles = StyleSheet.create({
  wrap: { height: 1, overflow: 'hidden', position: 'relative' },
  grad: { height: 1, width: '100%' },
  spark: {
    position: 'absolute',
    top: 0, left: 0,
    width: '18%', height: 1,
    ...(Platform.OS === 'web'
      ? ({
          backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.95) 50%, transparent 100%)',
          boxShadow: '0 0 12px rgba(37,99,235,0.55)',
        } as any)
      : {}),
  },
});
