import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, View, ViewStyle } from 'react-native';
import { useScrollAnim } from '../context/ScrollAnimContext';
import { MOTION, usePrefersReducedMotion } from '../utils/motion';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'fade' | 'zoom' | 'down';
}

const APPLE = Easing.bezier(0.22, 1, 0.36, 1);
const DURATION = MOTION.duration.reveal;

export default function AnimatedSection({
  children, style, delay = 0, direction = 'up',
}: Props) {
  const { scrollY, windowHeight } = useScrollAnim();
  const reduceMotion = usePrefersReducedMotion();
  const [cssVisible, setCssVisible] = useState(false);
  const webRef = useRef<any>(null);
  const baseStyle = Array.isArray(style) ? Object.assign({}, ...style) : style;
  const offset = MOTION.offset.reveal;

  useEffect(() => {
    if (Platform.OS !== 'web' || reduceMotion) return;
    const el = webRef.current as unknown as Element;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        requestAnimationFrame(() => {
          setTimeout(() => setCssVisible(true), delay);
        });
        observer.disconnect();
      },
      { threshold: 0.08, rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, reduceMotion]);

  if (reduceMotion) {
    return <View style={baseStyle}>{children}</View>;
  }

  if (Platform.OS === 'web') {
    const hiddenTransform =
      direction === 'up' ? `translateY(${offset}px)` :
      direction === 'down' ? `translateY(-${offset}px)` :
      direction === 'left' ? `translateX(-${offset}px)` :
      direction === 'right' ? `translateX(${offset}px)` :
      direction === 'zoom' ? 'scale(0.97) translateY(8px)' :
      'translateY(8px)';

    const webStyle: any = {
      opacity: cssVisible ? 1 : 0,
      transform: cssVisible ? 'none' : hiddenTransform,
      transition: `opacity ${DURATION}ms ${MOTION.easing.standard}, `
        + `transform ${DURATION}ms ${MOTION.easing.standard}`,
      willChange: 'opacity, transform',
    };

    return (
      <View ref={webRef} style={[baseStyle, webStyle]}>
        {children}
      </View>
    );
  }

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
      style={[baseStyle, { opacity, transform: transformArr }]}
    >
      {children}
    </Animated.View>
  );
}
