import { StyleSheet } from 'react-native';

/**
 * Web animation helpers for react-native-web.
 *
 * IMPORTANT: RNW 0.21 only supports `animationKeyframes` when the style is
 * compiled through `StyleSheet.create(...)`. Inline style objects silently drop
 * the property in the inline compiler path, which makes every animation appear
 * frozen. These helpers therefore memoize compiled styles and return the
 * generated style objects.
 */

const cache = new Map<string, any>();

/** Build a base web animation style object. */
function wa(
  name: string,
  duration: string,
  timing = 'ease',
  delay = '0s',
  iteration = 'infinite',
  fill = 'both',
  direction?: string,
): any {
  const key = [name, duration, timing, delay, iteration, fill, direction ?? ''].join('|');
  const hit = cache.get(key);
  if (hit) return hit;

  const compiled = StyleSheet.create({
    anim: {
      animationKeyframes: name,
      animationDuration: duration,
      animationTimingFunction: timing,
      animationDelay: delay,
      animationIterationCount: iteration,
      animationFillMode: fill,
      ...(direction ? { animationDirection: direction } : {}),
    } as any,
  }).anim;

  cache.set(key, compiled);
  return compiled;
}

// ── Avatar ────────────────────────────────────────────────────────────────
export const webAnim = {
  /** Main container float */
  avatarFloat: () =>
    wa('ct-avatar-float', '7s', 'ease-in-out'),

  /** Inner gradient ring (clockwise) */
  spinSlow: () =>
    wa('ct-spin-slow', '16s', 'linear', '0s', 'infinite', 'none'),

  /** Outer gradient ring (counter-clockwise) */
  spinRev: () =>
    wa('ct-spin-rev', '26s', 'linear', '0s', 'infinite', 'none'),

  /** Expanding avatar pulse ring (staggered via delay) */
  avatarPulse: (delay = '0s') =>
    wa('ct-avatar-pulse', '3.2s', 'ease-out', delay),

  // ── Hero section ───────────────────────────────────────────────────────
  /** Hero entrance — slide up */
  heroUp: (delayMs: number) =>
    wa('ct-hero-up', '0.72s', 'cubic-bezier(0.22,1,0.36,1)', `${delayMs}ms`, '1'),

  /** Hero entrance — slide from left */
  heroLeft: (delayMs: number) =>
    wa('ct-hero-left', '0.72s', 'cubic-bezier(0.22,1,0.36,1)', `${delayMs}ms`, '1'),

  /** Hero entrance — slide from right */
  heroRight: (delayMs: number) =>
    wa('ct-hero-right', '0.72s', 'cubic-bezier(0.22,1,0.36,1)', `${delayMs}ms`, '1'),

  /** Hero entrance — scale up */
  heroScale: (delayMs: number) =>
    wa('ct-hero-scale', '0.72s', 'cubic-bezier(0.22,1,0.36,1)', `${delayMs}ms`, '1'),

  /** Floating decorative orbs */
  float: (duration: string, delay: string) =>
    wa('ct-float', duration, 'ease-in-out', delay),

  /** Status-dot pulse ring */
  pulseRing: (duration = '2.2s') =>
    wa('ct-pulse-ring', duration, 'ease-out'),

  /** Scroll cue arrow bounce */
  scrollCue: () =>
    wa('ct-scroll-cue', '1.8s', 'ease-in-out'),

  // ── Marquee ────────────────────────────────────────────────────────────
  marquee: (duration = '40s') =>
    wa('ct-marquee', duration, 'linear', '0s', 'infinite', 'none'),

  marqueeRev: (duration = '36s') =>
    wa('ct-marquee-rev', duration, 'linear', '0s', 'infinite', 'none'),

  // ── Background / layout ────────────────────────────────────────────────
  gradientFlow: () =>
    wa('ct-gradient-flow', '7s', 'linear'),

  pageSheen: () =>
    wa('ct-page-sheen', '14s', 'ease-in-out'),

  dividerScan: (flip = false) =>
    wa('ct-divider-scan', '3.8s', 'ease-in-out', '0s', 'infinite', 'both',
      flip ? 'reverse' : 'normal'),

  // ── UI chrome ──────────────────────────────────────────────────────────
  glowPulse: () =>
    wa('ct-glow-pulse', '2.4s', 'ease-in-out'),

  progressShine: () =>
    wa('ct-progress-shine', '2.8s', 'ease-in-out'),

  glint: () =>
    wa('ct-glint', '900ms', 'ease-out', '0s', '1'),

  borderGlow: () =>
    wa('ct-border-glow', '3s', 'ease-in-out'),
};

/** Map animation name string → heroAnim builder (used by heroAnim helper). */
const HERO_MAP: Record<string, (d: number) => any> = {
  'ct-hero-up':    webAnim.heroUp,
  'ct-hero-left':  webAnim.heroLeft,
  'ct-hero-right': webAnim.heroRight,
  'ct-hero-scale': webAnim.heroScale,
};

/**
 * Returns a CSS animation style for hero entrance elements on web.
 * @param name   CSS keyframe name ('ct-hero-up' | 'ct-hero-left' | etc.)
 * @param delayMs  Animation start delay in milliseconds
 */
export function heroAnimStyle(name: string, delayMs: number): any {
  const builder = HERO_MAP[name] ?? webAnim.heroUp;
  return builder(delayMs);
}
