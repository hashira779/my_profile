import React from 'react';
import { Linking, Platform, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, RADIUS } from '../constants/theme';
import { CONTACT, PROFILE_STATS, SERVICES } from '../constants/data';
import AnimatedSection from './AnimatedSection';
import { sectionPadH, sectionPadV, titleSize, titleLineH, titleLetterSpacing, numSize, subSize, bodySize, cardPad } from '../utils/responsive';

function SectionLabel({ label, num }: { label: string; num: string; }) {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.labelRow}>
      <Text style={[styles.sectionNum, { fontSize: numSize(width), lineHeight: numSize(width) }]}>{num}</Text>
      <LinearGradient colors={GRADIENTS.accent} style={styles.labelLine} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
}

export default function AboutSection() {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;
  const ph = sectionPadH(width);
  const pv = sectionPadV(width);
  const ts = titleSize(width);
  const tlh = titleLineH(width);
  const tls = titleLetterSpacing(width);
  const ss = subSize(width);
  const bs = bodySize(width);
  const cp = cardPad(width);

  return (
    <View style={[styles.wrapper, { paddingHorizontal: ph, paddingVertical: pv }]}>
      <AnimatedSection>
        <SectionLabel label="WHO I AM" num="01" />
        <Text style={[styles.sectionTitle, { fontSize: ts, lineHeight: tlh, letterSpacing: tls }]}>About Me</Text>
        <Text style={[styles.sectionSub, { fontSize: ss }]}>The story behind the systems I build.</Text>
      </AnimatedSection>
      <AnimatedSection delay={80} direction="zoom">
        <View style={styles.metricsGrid}>
          {PROFILE_STATS.map((stat, i) => (
            <View key={stat.label} style={[styles.metricCard, isWide && { width: '23.5%' }]}>
              <Text style={[styles.metricValue, { color: SERVICES[i % SERVICES.length].color }]}>{stat.value}</Text>
              <Text style={styles.metricLabel}>{stat.label}</Text>
              <Text style={styles.metricDetail}>{stat.detail}</Text>
            </View>
          ))}
        </View>
      </AnimatedSection>
      <View style={[styles.grid, isWide && { flexDirection: 'row' }]}>
        <AnimatedSection style={[styles.card, isWide && { flex: 3 }, { padding: cp }]} delay={100} direction="left">
          <Text style={[styles.cardTitle, { fontSize: bs + 3 }]}>Background</Text>
          <Text style={[styles.bodyText, { fontSize: bs }]}>
            As a System Analyst at PTT (Cambodia) LTD, I connect technical infrastructure with business operations. I specialize in POS ecosystems, workflow automation, reporting systems, and internal web tools that improve team efficiency.
          </Text>
          <Text style={[styles.bodyText, { fontSize: bs, marginTop: 14 }]}>
            My approach is practical: I focus on solutions that work reliably in production, choosing the right tools over the trendiest ones.
          </Text>
          <View style={styles.tagRow}>
            {['System Analysis', 'Web Dev', 'Database', 'Automation', 'IT Support'].map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </AnimatedSection>
        <AnimatedSection style={[styles.card, isWide && { flex: 2 }, { padding: cp }]} delay={200} direction="right">
          <Text style={[styles.cardTitle, { fontSize: bs + 3 }]}>Contact Info</Text>
          {[
            { icon: 'Email', value: CONTACT.email, url: `mailto:${CONTACT.email}` },
            { icon: 'Phone', value: CONTACT.phone, url: `tel:${CONTACT.phone}` },
            { icon: 'Telegram', value: '@chhoy_too', url: CONTACT.telegram },
            { icon: 'Location', value: CONTACT.location },
          ].map((item) => (
            <View key={item.icon} style={styles.contactItem}>
              <Text style={styles.contactIcon}>{item.icon}</Text>
              <Text
                style={[styles.contactValue, { fontSize: bs - 1 }, item.url && styles.contactLink]}
                onPress={item.url ? () => Linking.openURL(item.url!) : undefined}
                numberOfLines={2}
              >
                {item.value}
              </Text>
            </View>
          ))}
          <View style={styles.divider} />
          <Text style={[styles.cardTitle, { fontSize: bs + 3 }]}>Languages</Text>
          {CONTACT.languages.map((lang) => (
            <View key={lang} style={styles.langRow}>
              <View style={styles.langDot} />
              <Text style={[styles.bodyText, { fontSize: bs - 1 }]}>{lang}</Text>
            </View>
          ))}
        </AnimatedSection>
      </View>
      <AnimatedSection delay={240} direction="up">
        <View style={styles.servicesHeader}>
          <Text style={styles.subTitle}>What I Can Help With</Text>
          <View style={styles.servicesLine} />
        </View>
        <View style={[styles.servicesGrid, isWide && { flexDirection: 'row', flexWrap: 'wrap' }]}>
          {SERVICES.map((service, i) => (
            <AnimatedSection
              key={service.title}
              delay={280 + i * 70}
              direction={i % 2 === 0 ? 'left' : 'right'}
              style={[styles.serviceCard, isWide && { width: '48.8%' }]}
            >
              <View style={[styles.serviceIcon, { backgroundColor: `${service.color}18`, borderColor: `${service.color}44` }]}>
                <Text style={[styles.serviceIconText, { color: service.color }]}>{`0${i + 1}`}</Text>
              </View>
              <View style={styles.serviceBody}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDesc}>{service.description}</Text>
                <View style={styles.servicePoints}>
                  {service.points.map((point) => (
                    <View key={point} style={styles.servicePoint}>
                      <View style={[styles.pointDot, { backgroundColor: service.color }]} />
                      <Text style={styles.pointText}>{point}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </AnimatedSection>
          ))}
        </View>
      </AnimatedSection>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 36, maxWidth: 1200, alignSelf: 'center', width: '100%' },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  sectionNum: { color: 'rgba(37,99,235,0.18)', fontWeight: '900', letterSpacing: -3, marginRight: 4 },
  labelLine: { width: 32, height: 2, borderRadius: 1 },
  labelText: { color: COLORS.indigo, fontSize: 12, fontWeight: '700', letterSpacing: 3 },
  sectionTitle: { color: COLORS.textPrimary, fontWeight: '900' },
  sectionSub: { color: COLORS.textSecondary, marginTop: 10, lineHeight: 26 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metricCard: {
    width: '48%',
    minWidth: 150,
    flexGrow: 1,
    padding: 16,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: 'rgba(15,23,42,0.72)',
    gap: 6,
    ...(Platform.OS === 'web'
      ? ({ backdropFilter: 'blur(12px)', boxShadow: '0 10px 28px rgba(0,0,0,0.18)' } as any)
      : {}),
  },
  metricValue: { fontSize: 30, lineHeight: 34, fontWeight: '900' },
  metricLabel: { color: COLORS.textPrimary, fontSize: 13, fontWeight: '800' },
  metricDetail: { color: COLORS.textMuted, fontSize: 11, lineHeight: 17 },
  grid: { gap: 20, flexDirection: 'column' },
  card: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xl,
    gap: 14,
    ...(Platform.OS === 'web' ? ({ backdropFilter: 'blur(12px)' } as any) : {}),
  },
  cardTitle: { color: COLORS.textPrimary, fontWeight: '700', marginBottom: 4 },
  bodyText: { color: COLORS.textSecondary, lineHeight: 24 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  tag: {
    paddingVertical: 6, paddingHorizontal: 14, borderRadius: RADIUS.full,
    backgroundColor: 'rgba(37,99,235,0.1)', borderWidth: 1, borderColor: 'rgba(37,99,235,0.24)',
  },
  tagText: { color: COLORS.indigo, fontSize: 13, fontWeight: '600' },
  contactItem: { flexDirection: 'row', gap: 10, alignItems: 'flex-start', marginBottom: 6 },
  contactIcon: { color: COLORS.indigo, fontSize: 12, fontWeight: '700', width: 55 },
  contactValue: { color: COLORS.textSecondary, flex: 1 },
  contactLink: { color: COLORS.sky },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 10 },
  langRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  langDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.indigo },
  servicesHeader: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 },
  subTitle: { color: COLORS.textPrimary, fontWeight: '800', fontSize: 20 },
  servicesLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  servicesGrid: { gap: 14, flexDirection: 'column' },
  serviceCard: {
    flexDirection: 'row',
    gap: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.card,
    ...(Platform.OS === 'web'
      ? ({
          backdropFilter: 'blur(12px)',
          transition: 'transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
        } as any)
      : {}),
  },
  serviceIcon: {
    width: 46,
    height: 46,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceIconText: { fontSize: 13, fontWeight: '900' },
  serviceBody: { flex: 1, gap: 8 },
  serviceTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '800' },
  serviceDesc: { color: COLORS.textSecondary, fontSize: 13, lineHeight: 21 },
  servicePoints: { gap: 6, marginTop: 2 },
  servicePoint: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pointDot: { width: 5, height: 5, borderRadius: 3 },
  pointText: { color: COLORS.textMuted, fontSize: 12, fontWeight: '600' },
});
