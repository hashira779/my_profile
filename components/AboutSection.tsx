import React, { useState } from 'react';
import { Linking, Platform, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { RADIUS, FONT_FAMILY } from '../constants/theme';
import { CONTACT, PROFILE, PROFILE_STATS, SERVICES } from '../constants/data';
import AnimatedSection from './AnimatedSection';
import ProfileAvatar from './ProfileAvatar';
import { bodySize, cardPad, sectionPadH, sectionPadV, subSize, titleLetterSpacing, titleLineH, titleSize } from '../utils/responsive';

const ABOUT_TAGS = ['System Analysis', 'POS Support', 'Internal Tools', 'Automation', 'Docker', 'Ubuntu'];

export default function AboutSection() {
  const { colors, isDark } = useTheme();
  const { width } = useWindowDimensions();
  const isWide = width >= 860;
  const isDesktop = width >= 1080;
  const ph = sectionPadH(width);
  const pv = sectionPadV(width);
  const ts = titleSize(width);
  const tlh = titleLineH(width);
  const tls = titleLetterSpacing(width);
  const ss = subSize(width);
  const bs = bodySize(width);
  const cp = cardPad(width);
  const avatarSize = width >= 1180 ? 136 : width >= 768 ? 118 : 102;
  const styles = getStyles(colors, isDark);

  return (
    <View style={[styles.wrapper, { paddingHorizontal: ph, paddingVertical: pv }]}>
      <AnimatedSection>
        <View style={[styles.header, isWide && styles.headerWide]}>
          <View style={styles.headerCopy}>
            <View style={styles.eyebrowRow}>
              <View style={styles.eyebrowDot} />
              <Text style={styles.eyebrow}>About</Text>
            </View>
            <Text style={[styles.sectionTitle, { fontSize: ts, lineHeight: tlh, letterSpacing: tls }]}>Systems thinking for daily operations.</Text>
            <Text style={[styles.sectionSub, { fontSize: ss }]}>I connect business workflows, support issues, databases, and web tools into practical systems teams can use every day.</Text>
          </View>
          <View style={styles.availabilityCard}>
            <Text style={styles.availabilityLabel}>Current focus</Text>
            <Text style={styles.availabilityText}>System support, internal tools, automation, and AI-assisted delivery.</Text>
          </View>
        </View>
      </AnimatedSection>

      <View style={[styles.heroGrid, isWide && styles.heroGridWide]}>
        <AnimatedSection delay={80} direction="left" style={[styles.profileWrap, isWide && { flex: 1.45 }]}>
          <IntroCard avatarSize={avatarSize} padding={cp} bodySize={bs} isDesktop={isDesktop} styles={styles} colors={colors} isDark={isDark} />
        </AnimatedSection>

        <AnimatedSection delay={130} direction="right" style={[styles.contactWrap, isWide && { flex: 0.85 }]}>
          <ContactPanel padding={cp} styles={styles} colors={colors} />
        </AnimatedSection>
      </View>

      <AnimatedSection delay={190} direction="up">
        <View style={styles.statsGrid}>
          {PROFILE_STATS.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} styles={styles} colors={colors} isDark={isDark} />
          ))}
        </View>
      </AnimatedSection>

      <AnimatedSection delay={260} direction="up">
        <View style={styles.servicesHeader}>
          <View>
            <Text style={styles.subKicker}>What I can help with</Text>
            <Text style={styles.subTitle}>Practical service areas</Text>
          </View>
          <View style={styles.servicesLine} />
        </View>
        <View style={[styles.servicesGrid, isWide && styles.servicesGridWide]}>
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} width={isWide ? '48.8%' : '100%'} styles={styles} colors={colors} isDark={isDark} />
          ))}
        </View>
      </AnimatedSection>
    </View>
  );
}

function IntroCard({
  avatarSize,
  padding,
  bodySize,
  isDesktop,
  styles,
  colors,
  isDark,
}: {
  avatarSize: number;
  padding: number;
  bodySize: number;
  isDesktop: boolean;
  styles: any;
  colors: any;
  isDark: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Pressable
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={[
        styles.introCard,
        { padding },
        Platform.OS === 'web' && {
          borderColor: hovered ? `${colors.accent}55` : colors.border,
          transform: [{ translateY: hovered ? -6 : 0 }],
          boxShadow: hovered
            ? isDark ? '0 34px 100px rgba(0,0,0,0.54)' : '0 30px 80px rgba(15,23,42,0.12)'
            : isDark ? '0 24px 80px rgba(0,0,0,0.40)' : '0 24px 64px rgba(15,23,42,0.08)',
          transition: 'all 240ms cubic-bezier(0.22, 1, 0.36, 1)',
        } as any,
      ]}
    >
      <View style={styles.cardGridPattern} />
      <View style={styles.cardGlowA} />
      <View style={styles.cardGlowB} />

      <View style={[styles.introTop, isDesktop && styles.introTopWide]}>
        <View style={styles.avatarFrame}>
          <ProfileAvatar size={avatarSize} />
        </View>
        <View style={styles.introCopy}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{PROFILE.name}</Text>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Available</Text>
            </View>
          </View>
          <Text style={styles.role}>{PROFILE.title}</Text>
          <Text style={[styles.bio, { fontSize: bodySize }]}>As a System Analyst at PTT (Cambodia) LTD, I turn station operations, reporting needs, and support issues into reliable internal systems. My work sits between users, data, infrastructure, and practical delivery.</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <Pressable style={({ pressed, hovered: h }: any) => [styles.primaryAction, (pressed || h) && styles.primaryActionHover]} onPress={() => Linking.openURL(`mailto:${CONTACT.email}`)}>
          <Text style={styles.primaryActionText}>{'Contact me ->'}</Text>
        </Pressable>
        <Pressable style={({ pressed, hovered: h }: any) => [styles.secondaryAction, (pressed || h) && styles.secondaryActionHover]} onPress={() => Linking.openURL(CONTACT.telegram)}>
          <Text style={styles.secondaryActionText}>Telegram</Text>
        </Pressable>
      </View>

      <View style={styles.tagRow}>
        {ABOUT_TAGS.map((tag) => (
          <View key={tag} style={styles.tag}>
            <View style={styles.tagDot} />
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}

function ContactPanel({ padding, styles, colors }: { padding: number; styles: any; colors: any }) {
  const [hovered, setHovered] = useState(false);
  const items = [
    { label: 'Email', value: CONTACT.email, url: `mailto:${CONTACT.email}` },
    { label: 'Phone', value: CONTACT.phone, url: `tel:${CONTACT.phone}` },
    { label: 'Telegram', value: '@chhoy_too', url: CONTACT.telegram },
    { label: 'Location', value: CONTACT.location },
  ];

  return (
    <Pressable
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={[
        styles.contactCard,
        { padding },
        Platform.OS === 'web' && {
          borderColor: hovered ? `${colors.accent}50` : colors.border,
          transform: [{ translateY: hovered ? -6 : 0 }],
          transition: 'all 240ms cubic-bezier(0.22, 1, 0.36, 1)',
        } as any,
      ]}
    >
      <View style={styles.contactHeader}>
        <Text style={styles.panelKicker}>Contact</Text>
        <Text style={styles.panelTitle}>Quick details</Text>
      </View>

      <View style={styles.contactList}>
        {items.map((item) => (
          <Pressable key={item.label} onPress={item.url ? () => Linking.openURL(item.url!) : undefined} disabled={!item.url} style={styles.contactItem}>
            <Text style={styles.contactLabel}>{item.label}</Text>
            <Text style={[styles.contactValue, item.url && styles.contactLink]} numberOfLines={2}>{item.value}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.languageBox}>
        <Text style={styles.panelKicker}>Languages</Text>
        <View style={styles.languageList}>
          {CONTACT.languages.map((lang) => (
            <View key={lang} style={styles.languagePill}>
              <View style={styles.languageDot} />
              <Text style={styles.languageText}>{lang}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
}

function StatCard({ stat, index, styles, colors, isDark }: { stat: typeof PROFILE_STATS[number]; index: number; styles: any; colors: any; isDark: boolean }) {
  const [hovered, setHovered] = useState(false);
  const accents = [colors.accent, colors.emerald, colors.violet, colors.amber];
  const accent = accents[index % accents.length];

  return (
    <Pressable
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={[
        styles.statCard,
        Platform.OS === 'web' && {
          borderColor: hovered ? `${accent}55` : colors.border,
          transform: [{ translateY: hovered ? -5 : 0 }],
          boxShadow: hovered ? (isDark ? '0 24px 70px rgba(0,0,0,0.42)' : '0 22px 56px rgba(15,23,42,0.10)') : 'none',
          transition: 'all 220ms cubic-bezier(0.22, 1, 0.36, 1)',
        } as any,
      ]}
    >
      <View style={styles.statTopRow}>
        <Text style={[styles.statValue, { color: accent }]}>{stat.value}</Text>
        <View style={[styles.statMark, { backgroundColor: `${accent}18`, borderColor: `${accent}35` }]} />
      </View>
      <Text style={styles.statLabel}>{stat.label}</Text>
      <Text style={styles.statDetail}>{stat.detail}</Text>
    </Pressable>
  );
}

function ServiceCard({
  service,
  index,
  width,
  styles,
  colors,
  isDark,
}: {
  service: any;
  index: number;
  width: string;
  styles: any;
  colors: any;
  isDark: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const accent = service.color || colors.accent;

  return (
    <AnimatedSection delay={310 + index * 60} direction="up" style={{ width } as any}>
      <Pressable
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}
        style={[
          styles.serviceCard,
          Platform.OS === 'web' && {
            borderColor: hovered ? `${accent}55` : colors.border,
            transform: [{ translateY: hovered ? -6 : 0 }],
            boxShadow: hovered ? (isDark ? '0 24px 70px rgba(0,0,0,0.42)' : '0 22px 56px rgba(15,23,42,0.10)') : 'none',
            transition: 'all 220ms cubic-bezier(0.22, 1, 0.36, 1)',
          } as any,
        ]}
      >
        <View style={styles.serviceTop}>
          <View style={[styles.serviceIndexWrap, { backgroundColor: `${accent}12`, borderColor: `${accent}35` }]}>
            <Text style={[styles.serviceIndex, { color: accent }]}>{String(index + 1).padStart(2, '0')}</Text>
          </View>
          <Text style={styles.serviceTitle}>{service.title}</Text>
        </View>
        <Text style={styles.serviceDesc}>{service.description}</Text>
        <View style={styles.servicePoints}>
          {service.points.map((point: string) => (
            <View key={point} style={styles.servicePoint}>
              <View style={[styles.pointDot, { backgroundColor: accent }]} />
              <Text style={styles.pointText}>{point}</Text>
            </View>
          ))}
        </View>
      </Pressable>
    </AnimatedSection>
  );
}

const getStyles = (colors: any, isDark: boolean) => {
  const surfaceStrong = isDark ? 'rgba(255,255,255,0.045)' : 'rgba(255,255,255,0.76)';
  const surfaceSoft = isDark ? 'rgba(255,255,255,0.030)' : 'rgba(255,255,255,0.58)';
  const cardShadow = Platform.OS === 'web'
    ? ({ boxShadow: isDark ? '0 24px 80px rgba(0,0,0,0.40)' : '0 24px 64px rgba(15,23,42,0.08)' } as any)
    : {};

  return StyleSheet.create({
    wrapper: {
      gap: 28,
      maxWidth: 1180,
      alignSelf: 'center',
      width: '100%',
    },
    header: {
      gap: 18,
      alignItems: 'flex-start',
    },
    headerWide: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    headerCopy: {
      maxWidth: 760,
      gap: 10,
    },
    eyebrowRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 9,
    },
    eyebrowDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: colors.accent,
    },
    eyebrow: {
      color: colors.accent,
      fontSize: 12,
      fontWeight: '900',
      letterSpacing: 2,
      textTransform: 'uppercase',
      fontFamily: FONT_FAMILY.accent,
    },
    sectionTitle: {
      color: colors.textPrimary,
      fontWeight: '900',
      maxWidth: 820,
      fontFamily: FONT_FAMILY.header,
    },
    sectionSub: {
      color: colors.textMuted,
      lineHeight: 28,
      maxWidth: 680,
      fontWeight: '600',
      fontFamily: FONT_FAMILY.body,
    },
    availabilityCard: {
      width: 260,
      padding: 16,
      borderRadius: 22,
      backgroundColor: surfaceSoft,
      borderWidth: 1,
      borderColor: colors.border,
    },
    availabilityLabel: {
      color: colors.textDim,
      fontSize: 11,
      fontWeight: '900',
      letterSpacing: 1.2,
      textTransform: 'uppercase',
      fontFamily: FONT_FAMILY.accent,
    },
    availabilityText: {
      color: colors.textSecondary,
      fontSize: 13,
      lineHeight: 20,
      fontWeight: '700',
      marginTop: 7,
      fontFamily: FONT_FAMILY.body,
    },
    heroGrid: {
      gap: 16,
      flexDirection: 'column',
    },
    heroGridWide: {
      flexDirection: 'row',
      alignItems: 'stretch',
    },
    profileWrap: {
      width: '100%',
    },
    contactWrap: {
      width: '100%',
    },
    introCard: {
      minHeight: 360,
      borderRadius: 34,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: surfaceStrong,
      overflow: 'hidden',
      gap: 20,
      ...cardShadow,
    },
    cardGridPattern: {
      ...StyleSheet.absoluteFillObject,
      opacity: isDark ? 0.10 : 0.18,
      ...(Platform.OS === 'web'
        ? ({
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
          } as any)
        : {}),
    },
    cardGlowA: {
      position: 'absolute',
      top: -110,
      right: -100,
      width: 260,
      height: 260,
      borderRadius: 130,
      backgroundColor: isDark ? 'rgba(6,182,212,0.12)' : 'rgba(37,99,235,0.10)',
      ...(Platform.OS === 'web' ? ({ filter: 'blur(58px)' } as any) : {}),
    },
    cardGlowB: {
      position: 'absolute',
      bottom: -130,
      left: -100,
      width: 280,
      height: 280,
      borderRadius: 140,
      backgroundColor: isDark ? 'rgba(52,211,153,0.08)' : 'rgba(5,150,105,0.08)',
      ...(Platform.OS === 'web' ? ({ filter: 'blur(64px)' } as any) : {}),
    },
    introTop: {
      gap: 18,
      zIndex: 2,
    },
    introTopWide: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatarFrame: {
      alignSelf: 'flex-start',
      marginLeft: -26,
      marginTop: -22,
      marginBottom: -22,
    },
    introCopy: {
      flex: 1,
      minWidth: 220,
    },
    nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 10,
    },
    name: {
      color: colors.textPrimary,
      fontSize: 25,
      lineHeight: 30,
      fontWeight: '900',
      letterSpacing: -0.8,
      fontFamily: FONT_FAMILY.header,
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: RADIUS.full,
      backgroundColor: isDark ? 'rgba(52,211,153,0.10)' : 'rgba(5,150,105,0.10)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(52,211,153,0.24)' : 'rgba(5,150,105,0.22)',
    },
    statusDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.emerald,
    },
    statusText: {
      color: colors.emerald,
      fontSize: 10,
      fontWeight: '900',
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      fontFamily: FONT_FAMILY.accent,
    },
    role: {
      color: colors.textSecondary,
      fontSize: 14,
      lineHeight: 21,
      fontWeight: '800',
      marginTop: 6,
      fontFamily: FONT_FAMILY.body,
    },
    bio: {
      color: colors.textSecondary,
      lineHeight: 26,
      fontWeight: '600',
      marginTop: 16,
      maxWidth: 720,
      fontFamily: FONT_FAMILY.body,
    },
    actionRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      zIndex: 2,
    },
    primaryAction: {
      paddingVertical: 12,
      paddingHorizontal: 18,
      borderRadius: RADIUS.full,
      backgroundColor: colors.textPrimary,
      ...(Platform.OS === 'web' ? ({ transition: 'all 180ms ease' } as any) : {}),
    },
    primaryActionHover: {
      transform: [{ translateY: -2 }],
      backgroundColor: isDark ? '#FFFFFF' : '#000000',
    },
    primaryActionText: {
      color: colors.bg,
      fontSize: 13,
      fontWeight: '900',
      fontFamily: FONT_FAMILY.accent,
    },
    secondaryAction: {
      paddingVertical: 12,
      paddingHorizontal: 18,
      borderRadius: RADIUS.full,
      borderWidth: 1,
      borderColor: colors.borderBright,
      backgroundColor: colors.surface,
      ...(Platform.OS === 'web' ? ({ transition: 'all 180ms ease' } as any) : {}),
    },
    secondaryActionHover: {
      transform: [{ translateY: -2 }],
      borderColor: colors.accent,
    },
    secondaryActionText: {
      color: colors.textPrimary,
      fontSize: 13,
      fontWeight: '900',
      fontFamily: FONT_FAMILY.accent,
    },
    tagRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      zIndex: 2,
    },
    tag: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      paddingVertical: 7,
      paddingHorizontal: 11,
      borderRadius: RADIUS.full,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    tagDot: {
      width: 5,
      height: 5,
      borderRadius: 3,
      backgroundColor: colors.accent,
    },
    tagText: {
      color: colors.textSecondary,
      fontSize: 11,
      fontWeight: '900',
      fontFamily: FONT_FAMILY.accent,
    },
    contactCard: {
      flex: 1,
      minHeight: 360,
      borderRadius: 34,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: surfaceStrong,
      gap: 18,
      ...cardShadow,
    },
    contactHeader: {
      gap: 5,
    },
    panelKicker: {
      color: colors.accent,
      fontSize: 11,
      fontWeight: '900',
      letterSpacing: 1.8,
      textTransform: 'uppercase',
      fontFamily: FONT_FAMILY.accent,
    },
    panelTitle: {
      color: colors.textPrimary,
      fontSize: 24,
      lineHeight: 29,
      fontWeight: '900',
      letterSpacing: -0.8,
      fontFamily: FONT_FAMILY.header,
    },
    contactList: {
      gap: 8,
    },
    contactItem: {
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 18,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 3,
    },
    contactLabel: {
      color: colors.textDim,
      fontSize: 10,
      fontWeight: '900',
      letterSpacing: 1.1,
      textTransform: 'uppercase',
      fontFamily: FONT_FAMILY.accent,
    },
    contactValue: {
      color: colors.textSecondary,
      fontSize: 13,
      lineHeight: 19,
      fontWeight: '800',
      fontFamily: FONT_FAMILY.body,
    },
    contactLink: {
      color: colors.accent,
    },
    languageBox: {
      marginTop: 'auto',
      gap: 10,
      paddingTop: 14,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    languageList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    languagePill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      paddingVertical: 7,
      paddingHorizontal: 10,
      borderRadius: RADIUS.full,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    languageDot: {
      width: 5,
      height: 5,
      borderRadius: 3,
      backgroundColor: colors.emerald,
    },
    languageText: {
      color: colors.textSecondary,
      fontSize: 12,
      fontWeight: '800',
      fontFamily: FONT_FAMILY.body,
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    statCard: {
      minWidth: 190,
      flex: 1,
      padding: 18,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: surfaceSoft,
      gap: 7,
    },
    statTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
    },
    statValue: {
      fontSize: 34,
      lineHeight: 38,
      fontWeight: '900',
      letterSpacing: -1.2,
      fontFamily: FONT_FAMILY.header,
    },
    statMark: {
      width: 28,
      height: 28,
      borderRadius: 14,
      borderWidth: 1,
    },
    statLabel: {
      color: colors.textPrimary,
      fontSize: 13,
      lineHeight: 18,
      fontWeight: '900',
      fontFamily: FONT_FAMILY.header,
    },
    statDetail: {
      color: colors.textMuted,
      fontSize: 12,
      lineHeight: 18,
      fontWeight: '600',
      fontFamily: FONT_FAMILY.body,
    },
    servicesHeader: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: 18,
      marginBottom: 16,
    },
    subKicker: {
      color: colors.accent,
      fontSize: 11,
      fontWeight: '900',
      letterSpacing: 1.6,
      textTransform: 'uppercase',
      fontFamily: FONT_FAMILY.accent,
    },
    subTitle: {
      color: colors.textPrimary,
      fontSize: 25,
      lineHeight: 31,
      fontWeight: '900',
      letterSpacing: -0.8,
      marginTop: 5,
      fontFamily: FONT_FAMILY.header,
    },
    servicesLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
      marginBottom: 8,
    },
    servicesGrid: {
      gap: 14,
      flexDirection: 'column',
    },
    servicesGridWide: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    serviceCard: {
      minHeight: 178,
      padding: 20,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 26,
      backgroundColor: surfaceSoft,
      gap: 12,
    },
    serviceTop: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    serviceIndexWrap: {
      width: 34,
      height: 34,
      borderRadius: 17,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    serviceIndex: {
      fontSize: 11,
      fontWeight: '900',
      fontFamily: FONT_FAMILY.accent,
    },
    serviceTitle: {
      color: colors.textPrimary,
      fontSize: 18,
      lineHeight: 23,
      fontWeight: '900',
      letterSpacing: -0.4,
      flex: 1,
      fontFamily: FONT_FAMILY.header,
    },
    serviceDesc: {
      color: colors.textSecondary,
      fontSize: 13,
      lineHeight: 21,
      fontWeight: '600',
      fontFamily: FONT_FAMILY.body,
    },
    servicePoints: {
      gap: 7,
      marginTop: 2,
    },
    servicePoint: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    pointDot: {
      width: 5,
      height: 5,
      borderRadius: 3,
    },
    pointText: {
      color: colors.textMuted,
      fontSize: 12,
      fontWeight: '800',
      fontFamily: FONT_FAMILY.body,
    },
  });
};
