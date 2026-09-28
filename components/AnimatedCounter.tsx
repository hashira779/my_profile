import React, { useEffect, useRef, useState } from 'react';
import { Animated, Platform, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { FONT_FAMILY } from '../constants/theme';
import { usePrefersReducedMotion } from '../utils/motion';

interface Props {
  targetValue: string;
  duration?: number;
  style?: any;
  suffix?: string;
}

/**
 * Animated counter that counts up from 0 to the target value
 * when it becomes visible in the viewport (web) or on mount (native).
 */
export default function AnimatedCounter({
  targetValue,
  duration = 2000,
  style,
  suffix = '',
}: Props) {
  const { colors } = useTheme();
  const reduceMotion = usePrefersReducedMotion();
  const [displayValue, setDisplayValue] = useState('0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<any>(null);

  // Parse numeric value
  const numericStr = targetValue.replace(/[^\d.]/g, '');
  const numericVal = parseFloat(numericStr) || 0;
  const hasPlus = targetValue.includes('+');
  const isYear = numericVal > 2000; // e.g., "2026"

  useEffect(() => {
    if (reduceMotion) {
      setDisplayValue(targetValue);
      return;
    }

    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const el = containerRef.current as unknown as HTMLElement | null;
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCount();
            observer.disconnect();
          }
        },
        { threshold: 0.3 },
      );

      observer.observe(el);
      return () => observer.disconnect();
    } else {
      // Native: animate on mount
      if (!hasAnimated) {
        setHasAnimated(true);
        animateCount();
      }
    }
  }, [reduceMotion, hasAnimated]);

  const animateCount = () => {
    if (isYear) {
      // For year values, just display directly
      setDisplayValue(targetValue);
      return;
    }

    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(numericVal * eased);

      if (progress < 1) {
        setDisplayValue(`${current}${hasPlus ? '+' : ''}${suffix}`);
        requestAnimationFrame(tick);
      } else {
        setDisplayValue(targetValue);
      }
    };
    requestAnimationFrame(tick);
  };

  return (
    <View ref={containerRef}>
      <Text style={style}>{displayValue}</Text>
    </View>
  );
}
