/**
 * Keyframe definitions for react-native-web `animationKeyframes`.
 *
 * IMPORTANT: react-native-web processes keyframe stop values through the same
 * React Native style preprocessor as regular styles. That means:
 *  ✓  transform: [{ rotate: '360deg' }]  ← RN array format  (WORKS)
 *  ✗  transform: 'rotate(360deg)'        ← CSS string        (IGNORED / broken)
 *
 * For animations that require CSS-only values (percentage translateX, backgroundPosition,
 * boxShadow, skewX…) we export helper functions that use `animationName` which references
 * the @keyframes already injected by injectGlobalStyles(). These show a harmless
 * dev-only console warning but work correctly in all environments.
 */

// ── Ring spins ────────────────────────────────────────────────────────────
export const KF_SPIN_SLOW: any = {
  from: { transform: [{ rotate: '0deg' }] },
  to:   { transform: [{ rotate: '360deg' }] },
};

export const KF_SPIN_COUNTER: any = {
  from: { transform: [{ rotate: '0deg' }] },
  to:   { transform: [{ rotate: '-360deg' }] },
};

// ── Avatar float / pulse ─────────────────────────────────────────────────
export const KF_AVATAR_FLOAT: any = {
  '0%':   { transform: [{ translateY: 0 }] },
  '30%':  { transform: [{ translateY: -6 }] },
  '60%':  { transform: [{ translateY: -14 }] },
  '80%':  { transform: [{ translateY: -10 }] },
  '100%': { transform: [{ translateY: 0 }] },
};

export const KF_AVATAR_PULSE: any = {
  '0%':   { transform: [{ scale: 1 }],   opacity: 0.55 },
  '80%':  { transform: [{ scale: 1.7 }], opacity: 0 },
  '100%': { transform: [{ scale: 1.7 }], opacity: 0 },
};

// ── Orb float ────────────────────────────────────────────────────────────
export const KF_FLOAT: any = {
  '0%':   { transform: [{ translateY: 0 },   { translateX: 0 },   { scale: 1 }],   opacity: 0.3 },
  '33%':  { transform: [{ translateY: -22 }, { translateX: 12 },  { scale: 1.1 }], opacity: 0.7 },
  '66%':  { transform: [{ translateY: -8 },  { translateX: -14 }, { scale: 0.9 }], opacity: 0.4 },
  '100%': { transform: [{ translateY: 0 },   { translateX: 0 },   { scale: 1 }],   opacity: 0.3 },
};

// ── Pulse ring ────────────────────────────────────────────────────────────
export const KF_PULSE_RING: any = {
  '0%':   { transform: [{ scale: 0.85 }], opacity: 0.9 },
  '70%':  { transform: [{ scale: 2.2 }],  opacity: 0 },
  '100%': { transform: [{ scale: 0.85 }], opacity: 0 },
};

// ── Scroll cue ────────────────────────────────────────────────────────────
export const KF_SCROLL_CUE: any = {
  '0%':   { transform: [{ translateY: 0 }],  opacity: 0.5 },
  '50%':  { transform: [{ translateY: 10 }], opacity: 1 },
  '100%': { transform: [{ translateY: 0 }],  opacity: 0.5 },
};

// ── Border glow (borderColor is a valid RN property) ─────────────────────
export const KF_BORDER_GLOW: any = {
  '0%':   { borderColor: 'rgba(37,99,235,0.2)' },
  '50%':  { borderColor: 'rgba(14,165,233,0.55)' },
  '100%': { borderColor: 'rgba(37,99,235,0.2)' },
};

// ── Hero entrance (opacity + pixel-translation) ───────────────────────────
export const KF_HERO_UP: any = {
  from: { opacity: 0, transform: [{ translateY: 20 }] },
  to:   { opacity: 1, transform: [{ translateY: 0 }] },
};

export const KF_HERO_LEFT: any = {
  from: { opacity: 0, transform: [{ translateX: -24 }] },
  to:   { opacity: 1, transform: [{ translateX: 0 }] },
};

export const KF_HERO_RIGHT: any = {
  from: { opacity: 0, transform: [{ translateX: 32 }] },
  to:   { opacity: 1, transform: [{ translateX: 0 }] },
};

export const KF_HERO_SCALE: any = {
  from: { opacity: 0, transform: [{ scale: 0.94 }] },
  to:   { opacity: 1, transform: [{ scale: 1 }] },
};

/** Map CSS keyframe name → keyframe object (used in HeroSection heroAnim) */
export const HERO_KF: Record<string, any> = {
  'ct-hero-up':    KF_HERO_UP,
  'ct-hero-left':  KF_HERO_LEFT,
  'ct-hero-right': KF_HERO_RIGHT,
  'ct-hero-scale': KF_HERO_SCALE,
};

// ─────────────────────────────────────────────────────────────────────────
// CSS-only / percentage-based animations
// These reference the @keyframes already injected by injectGlobalStyles().
// `animationName` shows a harmless dev-only RNW validation warning but
// will work correctly in all environments.
// ─────────────────────────────────────────────────────────────────────────

/** Marquee — uses translateX(-50%) */
export function marqueeAnim(duration = '40s', delay = '0s'): any {
  return {
    animationName: 'ct-marquee',
    animationDuration: duration,
    animationDelay: delay,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    willChange: 'transform',
  };
}

/** Reverse marquee — uses translateX(0 → -50%) */
export function marqueeRevAnim(duration = '36s', delay = '0s'): any {
  return {
    animationName: 'ct-marquee-rev',
    animationDuration: duration,
    animationDelay: delay,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    willChange: 'transform',
  };
}

/** Gradient text flow — animates background-position */
export function gradientFlowAnim(): any {
  return {
    animationName: 'ct-gradient-flow',
    animationDuration: '7s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
  };
}

/** Box-shadow glow pulse — uses CSS boxShadow */
export function glowPulseAnim(): any {
  return {
    animationName: 'ct-glow-pulse',
    animationDuration: '2.4s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  };
}

/** Progress-bar shine — uses translateX percentage */
export function progressShineAnim(): any {
  return {
    animationName: 'ct-progress-shine',
    animationDuration: '2.8s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  };
}

/** Card glint — uses skewX + translateX percentage */
export function glintAnim(): any {
  return {
    animationName: 'ct-glint',
    animationDuration: '900ms',
    animationTimingFunction: 'ease-out',
    animationFillMode: 'both',
  };
}

/** Page sheen — uses translate3d with percentage */
export function pageSheenAnim(): any {
  return {
    animationName: 'ct-page-sheen',
    animationDuration: '14s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  };
}

/** Divider scan line — uses translateX percentage */
export function dividerScanAnim(flip = false): any {
  return {
    animationName: 'ct-divider-scan',
    animationDuration: '3.8s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
    animationDirection: flip ? 'reverse' : 'normal',
  };
}
