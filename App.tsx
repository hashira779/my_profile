import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated, Platform, Pressable, SafeAreaView, ScrollView,
  StyleSheet, Text, View, useWindowDimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { injectGlobalStyles } from './utils/webStyles';
import { usePrefersReducedMotion } from './utils/motion';
import { webAnim } from './utils/webAnimKeyframes';
import { ScrollAnimProvider } from './context/ScrollAnimContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { FONT_FAMILY } from './constants/theme';
import CursorGlow from './components/CursorGlow';
import ParticleField from './components/ParticleField';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';

const NAV_HEIGHT = 56;

function ScrollBackdrop({ scrollY }: { scrollY: Animated.Value }) {
  const { colors, isDark } = useTheme();
  const reduceMotion = usePrefersReducedMotion();
  const orbY = scrollY.interpolate({
    inputRange: [0, 1800],
    outputRange: [0, -120],
    extrapolate: 'clamp',
  });

  return (
    <View style={[backStyles.wrap, { backgroundColor: colors.bg, pointerEvents: 'none' } as any]}>
      <Animated.View
        style={[
          backStyles.blueOrb,
          { backgroundColor: isDark ? 'rgba(6,182,212,0.06)' : 'rgba(37,99,235,0.08)' },
          reduceMotion ? null : { transform: [{ translateY: orbY }] },
        ]}
      />
      <View
        style={[
          backStyles.greenOrb,
          { backgroundColor: isDark ? 'rgba(52,211,153,0.04)' : 'rgba(5,150,105,0.06)' },
          Platform.OS === 'web' && !reduceMotion ? webAnim.ambientDrift('18s', '0.5s') : null,
        ]}
      />
      <View
        style={[
          backStyles.warmOrb,
          { backgroundColor: isDark ? 'rgba(139,92,246,0.04)' : 'rgba(124,58,237,0.04)' },
          Platform.OS === 'web' && !reduceMotion ? webAnim.ambientDriftAlt('21s', '1.2s') : null,
        ]}
      />
      {/* Extra orb for depth */}
      <View
        style={[
          backStyles.cyanOrb,
          { backgroundColor: isDark ? 'rgba(34,211,238,0.03)' : 'rgba(14,165,233,0.04)' },
          Platform.OS === 'web' && !reduceMotion ? webAnim.ambientDrift('24s', '2s') : null,
        ]}
      />
    </View>
  );
}

function DotNav({
  active,
  onPress,
  sections,
}: {
  active: string;
  onPress: (s: string) => void;
  sections: Array<{ key: string; label: string; color: string }>;
}) {
  const { colors, isDark } = useTheme();
  const { width } = useWindowDimensions();
  if (Platform.OS !== 'web' || width < 1120) return null;

  return (
    <View style={dotStyles.wrap}>
      {sections.map((s) => {
        const isActive = active === s.key;
        return (
          <Pressable key={s.key} onPress={() => onPress(s.key)} style={dotStyles.dot} hitSlop={8}>
            <View
              style={[
                dotStyles.dotInner,
                isActive
                  ? { width: 10, height: 10, backgroundColor: s.color, borderRadius: 5 }
                  : { width: 6, height: 6, backgroundColor: isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)', borderRadius: 3 },
                Platform.OS === 'web' ? ({ transition: 'all 180ms ease' } as any) : {},
              ]}
            />
            {isActive && <Text style={[dotStyles.label, { color: s.color }]}>{s.label}</Text>}
          </Pressable>
        );
      })}
    </View>
  );
}

function SectionDivider() {
  const { isDark } = useTheme();
  const reduceMotion = usePrefersReducedMotion();
  const borderCol = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  return (
    <View style={[divStyles.wrap, { pointerEvents: 'none' } as any]}>
      <View
        style={[
          divStyles.grad,
          Platform.OS === 'web'
            ? ({ backgroundImage: `linear-gradient(90deg, transparent, ${borderCol}, transparent)` } as any)
            : { backgroundColor: borderCol },
        ]}
      />
      {Platform.OS === 'web' && !reduceMotion && (
        <View style={[divStyles.spark, webAnim.dividerScan()]} />
      )}
    </View>
  );
}

function MainApp() {
  const { colors, isDark } = useTheme();
  const { height: windowHeight } = useWindowDimensions();
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const sectionOffsets = useRef<Record<string, number>>({});
  const [contentHeight, setContentHeight] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoading, setIsLoading] = useState(true);

  const SECTIONS = [
    { key: 'hero', label: 'Home', color: colors.accent },
    { key: 'about', label: 'About', color: colors.accent },
    { key: 'skills', label: 'Skills', color: colors.emerald },
    { key: 'education', label: 'Education', color: colors.amber },
    { key: 'projects', label: 'Projects', color: colors.accent },
    { key: 'experience', label: 'Experience', color: colors.violet },
    { key: 'contact', label: 'Contact', color: colors.accent },
  ];

  useEffect(() => {
    injectGlobalStyles();
    if (typeof document !== 'undefined') {
      document.title = "CHHOY TOO | Portfolio - System Analyst & Web Developer";

      // Inject meta description for SEO
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', 'Portfolio of CHHOY TOO, System Analyst and Web Developer. Specialized in POS systems, reporting databases, and workflow automation.');
    }
  }, []);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (e: any) => {
        const y = e.nativeEvent.contentOffset.y;
        const offsets = sectionOffsets.current;
        let current = 'hero';
        for (const s of SECTIONS) {
          if (offsets[s.key] !== undefined && y + windowHeight * 0.4 >= offsets[s.key]) {
            current = s.key;
          }
        }
        setActiveSection(current);
      },
    },
  );

  const scrollToSection = useCallback((section: string) => {
    const y = sectionOffsets.current[section];
    if (y !== undefined) {
      scrollViewRef.current?.scrollTo({ y: Math.max(0, y - NAV_HEIGHT), animated: true });
    }
  }, []);

  const registerSection = (section: string) => (event: any) => {
    sectionOffsets.current[section] = event.nativeEvent.layout.y;
  };

  return (
    <ScrollAnimProvider windowHeight={windowHeight} scrollY={scrollY}>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
        <StatusBar style={isDark ? 'light' : 'dark'} />

        {/* Loading screen */}
        {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}

        <ScrollBackdrop scrollY={scrollY} />
        <ParticleField />
        <CursorGlow />
        <Navbar scrollY={scrollY} onNavPress={scrollToSection} />
        <ScrollProgress scrollY={scrollY} contentHeight={contentHeight} windowHeight={windowHeight} />
        <DotNav active={activeSection} onPress={scrollToSection} sections={SECTIONS} />

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
          <View onLayout={registerSection('hero')} style={[styles.sectionFull, { minHeight: windowHeight }]}>
            <HeroSection />
          </View>

          <SectionDivider />
          <View onLayout={registerSection('about')} style={styles.sectionBlock}>
            <AboutSection />
          </View>

          <SectionDivider />
          <View onLayout={registerSection('skills')} style={styles.sectionBlock}>
            <SkillsSection />
          </View>

          <SectionDivider />
          <View onLayout={registerSection('education')} style={styles.sectionBlock}>
            <EducationSection />
          </View>

          <SectionDivider />
          <View onLayout={registerSection('projects')} style={styles.sectionBlock}>
            <ProjectsSection />
          </View>

          <SectionDivider />
          <View onLayout={registerSection('experience')} style={styles.sectionBlock}>
            <ExperienceSection />
          </View>

          <SectionDivider />
          <View onLayout={registerSection('contact')} style={[styles.sectionFull, { minHeight: windowHeight * 0.72 }]}>
            <ContactSection />
          </View>

          <FooterSection />
        </ScrollView>
      </SafeAreaView>
    </ScrollAnimProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scroll: {
    flex: 1,
    backgroundColor: 'transparent',
    zIndex: 1,
    ...(Platform.OS === 'web' ? ({ marginTop: NAV_HEIGHT } as any) : {}),
  },
  content: { paddingBottom: 0 },
  sectionFull: {
    justifyContent: 'center',
    overflow: 'hidden',
  },
  sectionBlock: {
    paddingVertical: Platform.OS === 'web' ? 10 : 0,
  },
});

const backStyles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    zIndex: 0,
  },
  blueOrb: {
    position: 'absolute',
    top: -220,
    right: -160,
    width: 760,
    height: 760,
    borderRadius: 380,
    ...(Platform.OS === 'web' ? ({ filter: 'blur(120px)' } as any) : {}),
  },
  greenOrb: {
    position: 'absolute',
    top: 420,
    left: -220,
    width: 560,
    height: 560,
    borderRadius: 280,
    ...(Platform.OS === 'web' ? ({ filter: 'blur(120px)' } as any) : {}),
  },
  warmOrb: {
    position: 'absolute',
    bottom: -220,
    right: '16%',
    width: 520,
    height: 520,
    borderRadius: 260,
    ...(Platform.OS === 'web' ? ({ filter: 'blur(120px)' } as any) : {}),
  },
  cyanOrb: {
    position: 'absolute',
    top: '55%',
    right: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
    ...(Platform.OS === 'web' ? ({ filter: 'blur(100px)' } as any) : {}),
  },
});

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
  label: { fontSize: 11, fontWeight: '700', letterSpacing: 0.2, fontFamily: FONT_FAMILY.accent },
});

const divStyles = StyleSheet.create({
  wrap: { height: 1, overflow: 'hidden', position: 'relative' },
  grad: {
    height: 1,
    width: '100%',
  },
  spark: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '18%',
    height: 1,
    ...(Platform.OS === 'web'
      ? ({
          backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.75) 50%, transparent 100%)',
          boxShadow: '0 0 14px rgba(6,182,212,0.32)',
        } as any)
      : {}),
  },
});
