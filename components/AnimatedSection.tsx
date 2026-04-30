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
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const easeOut = (value: number) => 1 - Math.pow(1 - value, 3);

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

    const root = document.getElementById('scroll-root');
    const getScrollTop = () => (
      root instanceof HTMLElement
        ? root.scrollTop
        : window.scrollY || document.documentElement.scrollTop || 0
    );

    const vector = directionVector(direction);
    const origin =
      direction === 'left' ? 'left center' :
      direction === 'right' ? 'right center' :
      direction === 'down' ? 'center top' :
      'center bottom';

    let raf = 0;
    let ready = false;
    let lastScroll = getScrollTop();
    let scrollDir = 1;

    el.style.opacity = '0';
    el.style.transform = `translate3d(${vector.x * offset}px, ${vector.y * offset}px, 0) scale(0.96)`;
    el.style.transformOrigin = origin;
    el.style.transformStyle = 'preserve-3d';
    el.style.willChange = 'transform, opacity, filter';
    el.style.transition = `opacity ${DURATION}ms ${MOTION.easing.standard}, transform ${DURATION}ms ${MOTION.easing.standard}, filter ${DURATION}ms ${MOTION.easing.standard}`;
    el.style.backfaceVisibility = 'hidden';

    const update = () => {
      raf = 0;
      if (!ready) return;

      const currentScroll = getScrollTop();
      if (Math.abs(currentScroll - lastScroll) > 0.5) {
        scrollDir = currentScroll > lastScroll ? 1 : -1;
      }
      lastScroll = currentScroll;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const center = rect.top + rect.height * 0.5;
      const viewportCenter = vh * 0.52;
      const distance = Math.abs(center - viewportCenter);
      const activeRange = Math.max(vh * 0.74, rect.height * 0.9);
      const progress = easeOut(clamp(1 - distance / activeRange, 0, 1));
      const hidden = 1 - progress;
      const side = center < viewportCenter ? -1 : 1;
      const x = vector.x * hidden * (offset + 12);
      const y = (vector.y * hidden * offset) + (side * hidden * 12) + (scrollDir * hidden * 7);
      const scaleBase = direction === 'zoom' ? 0.94 : 0.975;
      const scale = scaleBase + (1 - scaleBase) * progress;
      const rotateX = direction === 'fade' ? 0 : scrollDir * hidden * -3.2;
      const rotateZ = vector.x ? vector.x * hidden * -2.4 : 0;
      const opacity = clamp(0.28 + progress * 0.72, 0, 1);
      const blur = hidden * 1.6;

      el.style.opacity = opacity.toFixed(3);
      el.style.filter = `blur(${blur.toFixed(2)}px)`;
      el.style.transform = [
        `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`,
        `scale(${scale.toFixed(4)})`,
        `rotateX(${rotateX.toFixed(2)}deg)`,
        `rotateZ(${rotateZ.toFixed(2)}deg)`,
      ].join(' ');
    };

    const schedule = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    const timer = window.setTimeout(() => {
      ready = true;
      schedule();
    }, delay);

    const options: AddEventListenerOptions = { passive: true };
    (root ?? window).addEventListener('scroll', schedule, options);
    window.addEventListener('resize', schedule, options);
    schedule();

    return () => {
      window.clearTimeout(timer);
      if (raf) window.cancelAnimationFrame(raf);
      (root ?? window).removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
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
