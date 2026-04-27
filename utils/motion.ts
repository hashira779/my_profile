import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export const MOTION = {
  duration: {
    hover: 180,
    reveal: 620,
    hero: 680,
  },
  easing: {
    standard: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  offset: {
    reveal: 18,
    hero: 20,
  },
};

export function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (
      Platform.OS !== 'web' ||
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updatePreference);
      return () => mediaQuery.removeEventListener('change', updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  return reducedMotion;
}
