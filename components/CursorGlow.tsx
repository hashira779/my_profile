import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { usePrefersReducedMotion } from '../utils/motion';

export default function CursorGlow() {
  const { colors, isDark } = useTheme();
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (
      Platform.OS !== 'web' ||
      typeof document === 'undefined' ||
      typeof window === 'undefined' ||
      reduceMotion ||
      typeof window.matchMedia !== 'function'
    ) {
      return;
    }

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer || window.innerWidth < 1024) return;

    // Convert hex color to rgba helper
    const hexToRgba = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const accentColor = colors.accent;
    const orbColor1 = hexToRgba(accentColor, 0.10);
    const orbColor2 = hexToRgba(accentColor, 0.04);
    const orbColor3 = hexToRgba(accentColor, 0.02);
    const ringColor = hexToRgba(accentColor, 0.24);
    const activeRingColor = hexToRgba(accentColor, 0.48);
    const shadowColor = hexToRgba(accentColor, 0.42);
    const rippleColor = hexToRgba(accentColor, 0.22);
    const trailColor = hexToRgba(accentColor, 0.08);

    const orb = document.createElement('div');
    orb.style.cssText = `
      position: fixed; top: 0; left: 0; width: 380px; height: 380px; border-radius: 50%;
      background: radial-gradient(circle, ${orbColor1} 0%, ${orbColor2} 38%, ${orbColor3} 58%, transparent 72%);
      pointer-events: none; z-index: 9990; opacity: 0.85; will-change: transform;
      mix-blend-mode: ${isDark ? 'screen' : 'multiply'};
    `;

    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed; top: 0; left: 0; width: 6px; height: 6px; border-radius: 50%;
      background: ${accentColor}; pointer-events: none; z-index: 9999;
      box-shadow: 0 0 14px ${shadowColor}, 0 0 4px ${hexToRgba(accentColor, 0.6)};
      transition: width 0.18s cubic-bezier(0.22, 1, 0.36, 1), height 0.18s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.24s ease;
      will-change: transform;
    `;

    const ring = document.createElement('div');
    ring.style.cssText = `
      position: fixed; top: 0; left: 0; width: 32px; height: 32px; border-radius: 50%;
      border: 1.5px solid ${ringColor}; pointer-events: none; z-index: 9998;
      transition: width 0.22s cubic-bezier(0.22, 1, 0.36, 1), height 0.22s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.18s ease, border-width 0.18s ease;
      will-change: transform;
      backdrop-filter: blur(0.5px);
    `;

    document.body.appendChild(orb);
    document.body.appendChild(ring);
    document.body.appendChild(dot);

    let mx = -1000;
    let my = -1000;
    let ox = -1000;
    let oy = -1000;
    let rx = -1000;
    let ry = -1000;
    let raf = 0;
    let velocity = { x: 0, y: 0 };
    let prevMx = -1000;
    let prevMy = -1000;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const setPosition = (el: HTMLElement, x: number, y: number) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };
    const getInteractive = (target: EventTarget | null) => (
      target instanceof Element ? target.closest('a, button, [role="button"]') : null
    );
    const setInteractiveState = (active: boolean) => {
      dot.style.width = active ? '12px' : '6px';
      dot.style.height = active ? '12px' : '6px';
      dot.style.opacity = active ? '0.8' : '1';
      ring.style.width = active ? '48px' : '32px';
      ring.style.height = active ? '48px' : '32px';
      ring.style.borderColor = active ? activeRingColor : ringColor;
      ring.style.borderWidth = active ? '2px' : '1.5px';
    };

    const onMove = (e: MouseEvent) => {
      velocity.x = e.clientX - prevMx;
      velocity.y = e.clientY - prevMy;
      prevMx = mx;
      prevMy = my;
      mx = e.clientX;
      my = e.clientY;
      setPosition(dot, mx, my);
    };
    const onOver = (e: MouseEvent) => { if (getInteractive(e.target)) setInteractiveState(true); };
    const onOut = (e: MouseEvent) => {
      const from = getInteractive(e.target);
      const to = getInteractive(e.relatedTarget);
      if (from && from !== to) setInteractiveState(false);
    };
    const onClick = (e: MouseEvent) => {
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: fixed; left: 0; top: 0; width: 12px; height: 12px; border-radius: 50%;
        background: ${rippleColor}; pointer-events: none; z-index: 9997;
        animation: ct-ripple 0.55s ease-out forwards;
      `;
      setPosition(ripple, e.clientX, e.clientY);
      document.body.appendChild(ripple);
      window.setTimeout(() => {
        if (document.body.contains(ripple)) document.body.removeChild(ripple);
      }, 650);
    };

    const animate = () => {
      ox = lerp(ox, mx, 0.07);
      oy = lerp(oy, my, 0.07);
      rx = lerp(rx, mx, 0.16);
      ry = lerp(ry, my, 0.16);

      setPosition(orb, ox, oy);
      setPosition(ring, rx, ry);

      // Dynamic ring scaling based on velocity
      const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
      const stretch = Math.min(speed * 0.3, 6);
      if (speed > 1) {
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${1 + stretch * 0.02})`;
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    window.addEventListener('click', onClick);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      window.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
      [orb, ring, dot].forEach((el) => {
        if (document.body.contains(el)) document.body.removeChild(el);
      });
    };
  }, [reduceMotion, colors]);

  return null;
}
