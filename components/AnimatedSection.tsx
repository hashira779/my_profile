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
  if (direction === 'fade') return { x: 0, y: 0.35 };
  if (direction === 'zoom') return { x: 0, y: 0.15 };
  return { x: 0, y: 1 };
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
  const offset = MOTION.offset.reveal + 14;

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    const el = webRef.current as unknown as HTMLElement | null;
    if (!el) return;

    const vector = directionVector(direction);
    const scaleInit = direction === 'zoom' ? 0.94 : 0.96;

    // ── Initial hidden state ─────────────────────────────────────────────────
    el.style.opacity = '0';
    el.style.filter = 'blur(3px)';
    el.style.transform = [
      `translate3d(${vector.x * offset}px, ${vector.y * offset}px, 0)`,
      `scale(${scaleInit})`,
    ].join(' ');
    el.style.willChange = 'transform, opacity, filter';
    el.style.backfaceVisibility = 'hidden';
    // Apply easing + delay inside the transition so the delay only fires once
    el.style.transition = [
      `opacity ${DURATION}ms ${MOTION.easing.standard} ${delay}ms`,
      `transform ${DURATION}ms ${MOTION.easing.standard} ${delay}ms`,
      `filter ${DURATION}ms ${MOTION.easing.standard} ${delay}ms`,
    ].join(', ');

    // ── One-shot reveal via IntersectionObserver ─────────────────────────────
    // Threshold 0.08 → trigger as soon as 8 % of the element is visible.
    // rootMargin bottom offset pushes the trigger line slightly up so cards
    // reveal before they hit the very bottom of the viewport.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.filter = 'blur(0px)';
          el.style.transform = 'translate3d(0, 0, 0) scale(1)';
          // Disconnect immediately — element stays revealed forever after this
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
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
