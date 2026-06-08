import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, Easing, Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useScrollAnim } from '../context/ScrollAnimContext';
import { MOTION, usePrefersReducedMotion } from '../utils/motion';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'fade' | 'zoom' | 'down';
}

const APPLE = Easing.bezier(0.22, 1, 0.36, 1);
const DURATION = MOTION.duration.reveal;

function directionVector(direction: Props['direction']) {
  if (direction === 'left') return { x: -1, y: 0 };
  if (direction === 'right') return { x: 1, y: 0 };
  if (direction === 'down') return { x: 0, y: -1 };
  if (direction === 'fade') return { x: 0, y: 0.28 };
  if (direction === 'zoom') return { x: 0, y: 0.12 };
  return { x: 0, y: 1 };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function AnimatedSection({
  children, style, delay = 0, direction = 'up',
}: Props) {
  const reduceMotion = usePrefersReducedMotion();
  const baseStyle = StyleSheet.flatten(style) as ViewStyle | undefined;

  if (reduceMotion) {
    return <View style={baseStyle}>{children}</View>;
  }

  if (Platform.OS === 'web') {
    return (
      <WebScrollSection style={baseStyle} delay={delay} direction={direction}>
        {children}
      </WebScrollSection>
    );
  }

  return (
    <NativeRevealSection style={baseStyle} delay={delay} direction={direction}>
      {children}
    </NativeRevealSection>
  );
}

function WebScrollSection({
  children,
  style,
  delay,
  direction,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  delay: number;
  direction: NonNullable<Props['direction']>;
}) {
  const webRef = useRef<any>(null);
  const offset = MOTION.offset.reveal + 16;

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    const el = webRef.current as unknown as HTMLElement | null;
    if (!el) return;

    const vector = directionVector(direction);
    const initialScale = direction === 'zoom' ? 0.95 : 0.985;
    const scrollTarget: HTMLElement | Window = document.getElementById('scroll-root') ?? window;
    let revealed = false;
    let raf = 0;
    let revealTimer: ReturnType<typeof setTimeout> | undefined;

    const initialTransform = [
      `translate3d(${vector.x * offset}px, ${vector.y * offset}px, 0)`,
      `scale(${initialScale})`,
    ].join(' ');

    el.style.opacity = '0';
    el.style.transform = initialTransform;
    el.style.filter = 'blur(10px)';
    el.style.willChange = 'transform, opacity, filter';
    el.style.backfaceVisibility = 'hidden';
    el.style.transition = [
      `opacity ${DURATION}ms ${MOTION.easing.standard} ${delay}ms`,
      `transform ${DURATION}ms ${MOTION.easing.standard} ${delay}ms`,
      `filter ${DURATION}ms ${MOTION.easing.standard} ${delay}ms`,
    ].join(', ');

    const updateScrollScrub = () => {
      if (!revealed || raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight || 1;
        if (rect.bottom < -140 || rect.top > viewportHeight + 140) return;

        const centerOffset = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
        const progress = clamp(centerOffset, -1, 1);
        const translateY = -progress * 8;
        const scale = 1 - Math.abs(progress) * 0.006;
        el.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      });
    };

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      el.style.opacity = '1';
      el.style.transform = 'translate3d(0, 0, 0) scale(1)';
      el.style.filter = 'blur(0px)';

      revealTimer = setTimeout(() => {
        el.style.transition = 'opacity 180ms ease-out, filter 180ms ease-out';
        updateScrollScrub();
      }, DURATION + delay + 40);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(el);
    scrollTarget.addEventListener('scroll', updateScrollScrub, { passive: true });
    window.addEventListener('resize', updateScrollScrub);

    return () => {
      observer.disconnect();
      scrollTarget.removeEventListener('scroll', updateScrollScrub);
      window.removeEventListener('resize', updateScrollScrub);
      if (raf) window.cancelAnimationFrame(raf);
      if (revealTimer) clearTimeout(revealTimer);
    };
  }, [delay, direction, offset]);

  return (
    <View ref={webRef} style={style}>
      {children}
    </View>
  );
}

function NativeRevealSection({
  children,
  style,
  delay,
  direction,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  delay: number;
  direction: NonNullable<Props['direction']>;
}) {
  const { scrollY, windowHeight } = useScrollAnim();
  const offset = MOTION.offset.reveal;

  const isX = direction === 'left' || direction === 'right';
  const initV = direction === 'up' ? offset :
                direction === 'down' ? -offset :
                direction === 'left' ? -offset :
                direction === 'right' ? offset : 8;
  const initS = direction === 'zoom' ? 0.97 : 1;

  const opacity = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(initV)).current;
  const scale = useRef(new Animated.Value(initS)).current;
  const hasTriggered = useRef(false);
  const viewRef = useRef<View>(null);
  const layoutY = useRef(-1);

  const triggerNative = useCallback(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;

    const animations = [
      Animated.timing(opacity, {
        toValue: 1,
        duration: DURATION,
        delay,
        easing: APPLE,
        useNativeDriver: true,
      }),
      Animated.timing(translate, {
        toValue: 0,
        duration: DURATION,
        delay,
        easing: APPLE,
        useNativeDriver: true,
      }),
    ];

    if (direction === 'zoom') {
      animations.push(Animated.timing(scale, {
        toValue: 1,
        duration: DURATION,
        delay,
        easing: APPLE,
        useNativeDriver: true,
      }));
    }

    Animated.parallel(animations).start();
  }, [delay, direction, opacity, scale, translate]);

  useEffect(() => {
    const id = scrollY.addListener(({ value }) => {
      if (layoutY.current < 0) return;
      if (value + windowHeight > layoutY.current + 60) {
        triggerNative();
      }
    });

    return () => scrollY.removeListener(id);
  }, [scrollY, triggerNative, windowHeight]);

  const transformArr: any[] = isX
    ? [{ translateX: translate }]
    : [{ translateY: translate }];

  if (direction === 'zoom') {
    transformArr.push({ scale });
  }

  return (
    <Animated.View
      ref={viewRef as any}
      onLayout={(e) => {
        layoutY.current = e.nativeEvent.layout.y;
        if (layoutY.current < windowHeight * 0.85) {
          triggerNative();
        }
      }}
      style={[style, { opacity, transform: transformArr }]}
    >
      {children}
    </Animated.View>
  );
}
