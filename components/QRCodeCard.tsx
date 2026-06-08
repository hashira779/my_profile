import React, { useEffect, useState } from 'react';
import { Image, Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import QRCode from 'qrcode';
import { useTheme } from '../context/ThemeContext';
import { RADIUS, FONT_FAMILY } from '../constants/theme';

interface Props {
  label: string;
  value?: string;
  url: string;
  size?: number;
  compact?: boolean;
}

export default function QRCodeCard({ label, value, url, size = 118, compact = false }: Props) {
  const { colors, isDark } = useTheme();
  const [qrUri, setQrUri] = useState<string>('');
  const styles = getStyles(colors, isDark, size, compact);

  useEffect(() => {
    let mounted = true;

    QRCode.toDataURL(url, {
      width: size * 2,
      margin: 1,
      errorCorrectionLevel: 'M',
      color: {
        dark: '#020617',
        light: '#FFFFFF',
      },
    })
      .then((uri) => {
        if (mounted) setQrUri(uri);
      })
      .catch(() => {
        if (mounted) setQrUri('');
      });

    return () => {
      mounted = false;
    };
  }, [size, url]);

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={`Open ${label}`}
      onPress={() => Linking.openURL(url)}
      style={({ pressed, hovered }: any) => [styles.card, (pressed || hovered) && styles.cardHover]}
    >
      <View style={styles.qrBox}>
        {qrUri ? (
          <Image source={{ uri: qrUri }} style={styles.qrImage} resizeMode="contain" />
        ) : (
          <View style={styles.qrFallback}>
            <Text style={styles.qrFallbackText}>QR</Text>
          </View>
        )}
      </View>
      <View style={styles.copy}>
        <Text style={styles.label}>{label}</Text>
        {value ? <Text style={styles.value} numberOfLines={compact ? 1 : 2}>{value}</Text> : null}
        {!compact ? <Text style={styles.scanText}>Scan with phone</Text> : null}
      </View>
    </Pressable>
  );
}

const getStyles = (colors: any, isDark: boolean, size: number, compact: boolean) => StyleSheet.create({
  card: {
    flexDirection: compact ? 'column' : 'row',
    alignItems: compact ? 'center' : 'center',
    gap: compact ? 8 : 12,
    padding: compact ? 10 : 12,
    borderRadius: compact ? 18 : 22,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: isDark ? 'rgba(255,255,255,0.045)' : 'rgba(255,255,255,0.72)',
    ...(Platform.OS === 'web' ? ({ transition: 'all 180ms ease', cursor: 'pointer' } as any) : {}),
  },
  cardHover: {
    borderColor: colors.accent,
    transform: [{ translateY: -2 }],
    backgroundColor: isDark ? 'rgba(6,182,212,0.08)' : 'rgba(37,99,235,0.07)',
  },
  qrBox: {
    width: size,
    height: size,
    borderRadius: compact ? 12 : 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Math.max(7, Math.round(size * 0.06)),
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.10)',
  },
  qrImage: {
    width: '100%',
    height: '100%',
  },
  qrFallback: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
  },
  qrFallbackText: {
    color: '#020617',
    fontSize: 13,
    fontWeight: '900',
    fontFamily: FONT_FAMILY.accent,
  },
  copy: {
    flex: 1,
    alignItems: compact ? 'center' : 'flex-start',
    minWidth: compact ? undefined : 120,
  },
  label: {
    color: colors.textPrimary,
    fontSize: compact ? 12 : 14,
    fontWeight: '900',
    letterSpacing: -0.2,
    textAlign: compact ? 'center' : 'left',
    fontFamily: FONT_FAMILY.header,
  },
  value: {
    color: colors.textMuted,
    fontSize: compact ? 10 : 12,
    lineHeight: compact ? 14 : 18,
    fontWeight: '700',
    marginTop: 3,
    textAlign: compact ? 'center' : 'left',
    fontFamily: FONT_FAMILY.body,
  },
  scanText: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginTop: 6,
    textAlign: compact ? 'center' : 'left',
    fontFamily: FONT_FAMILY.accent,
  },
});
