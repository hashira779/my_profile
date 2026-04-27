import React from 'react';
import { Linking, Platform, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, RADIUS } from '../constants/theme';
import { CONTACT } from '../constants/data';
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
      <View style={[styles.grid, isWide && { flexDirection: 'row' }]}>
        <AnimatedSection style={[styles.card, isWide && { flex: 3 }, { padding: cp }]} delay={100} direction="left">
          <Text style={[styles.cardTitle, { fontSize: bs + 3 }]}>Background</Text>
          <Text style={[styles.bodyText, { fontSize: bs }]}>
            As a System Analyst at PTT (Cambodia) LTD, I bridge technical infrastructure and business
            operations. I specialize in designing POS ecosystems, automating workflows, and building
            internal web tools that improve team efficiency.
          </Text>
          <Text style={[styles.bodyText, { fontSize: bs, marginTop: 14 }]}>
            My approach is pragmatic — I focus on what actually ships and works in production, choosing
            the right tools over the trendiest ones.
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
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 36, maxWidth: 1200, alignSelf: 'center', width: '100%' },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  sectionNum: { color: 'rgba(129,140,248,0.22)', fontWeight: '900', letterSpacing: -3, marginRight: 4 },
  labelLine: { width: 32, height: 2, borderRadius: 1 },
  labelText: { color: COLORS.indigo, fontSize: 12, fontWeight: '700', letterSpacing: 3 },
  sectionTitle: { color: COLORS.textPrimary, fontWeight: '900' },
  sectionSub: { color: COLORS.textSecondary, marginTop: 10, lineHeight: 26 },
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
    backgroundColor: 'rgba(99,102,241,0.12)', borderWidth: 1, borderColor: 'rgba(99,102,241,0.25)',
  },
  tagText: { color: COLORS.indigo, fontSize: 13, fontWeight: '600' },
  contactItem: { flexDirection: 'row', gap: 10, alignItems: 'flex-start', marginBottom: 6 },
  contactIcon: { color: COLORS.indigo, fontSize: 12, fontWeight: '700', width: 55 },
  contactValue: { color: COLORS.textSecondary, flex: 1 },
  contactLink: { color: COLORS.sky },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 10 },
  langRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  langDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.indigo },
});


