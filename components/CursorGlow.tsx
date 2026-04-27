import { useEffect } from 'react';
import { Platform } from 'react-native';
import { usePrefersReducedMotion } from '../utils/motion';

export default function CursorGlow() {
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
    if (!finePointer || window.innerWidth < 1024) {
      return;
    }

    const orb = document.createElement('div');
    orb.style.cssText = `
      position: fixed; top: 0; left: 0; width: 360px; height: 360px; border-radius: 50%;
      background: radial-gradient(circle, rgba(99,102,241,0.11) 0%, rgba(56,189,248,0.06) 42%, transparent 72%);
      pointer-events: none; z-index: 9990; mix-blend-mode: screen; opacity: 0.9;
      will-change: transform;
    `;

    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed; top: 0; left: 0; width: 7px; height: 7px; border-radius: 50%;
      background: #818CF8; pointer-events: none; z-index: 9999;
      box-shadow: 0 0 12px rgba(129,140,248,0.9), 0 0 24px rgba(129,140,248,0.45);
      transition: width 0.16s ease, height 0.16s ease, background-color 0.16s ease, opacity 0.24s ease;
      will-change: transform;
    `;

    const ring = document.createElement('div');
    ring.style.cssText = `
      position: fixed; top: 0; left: 0; width: 30px; height: 30px; border-radius: 50%;
      border: 1px solid rgba(129,140,248,0.45); pointer-events: none; z-index: 9998;
      transition: width 0.2s ease, height 0.2s ease, border-color 0.16s ease;
      will-change: transform;
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

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const setPosition = (el: HTMLElement, x: number, y: number) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };
    const getInteractive = (target: EventTarget | null) => (
      target instanceof Element
        ? target.closest('a, button, [role="button"]')
        : null
    );
    const setInteractiveState = (active: boolean) => {
      dot.style.width = active ? '12px' : '7px';
      dot.style.height = active ? '12px' : '7px';
      dot.style.backgroundColor = active ? '#38BDF8' : '#818CF8';
      ring.style.width = active ? '46px' : '30px';
      ring.style.height = active ? '46px' : '30px';
      ring.style.borderColor = active ? 'rgba(56,189,248,0.7)' : 'rgba(129,140,248,0.45)';
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      setPosition(dot, mx, my);
    };

    const onOver = (e: MouseEvent) => {
      if (getInteractive(e.target)) {
        setInteractiveState(true);
      }
    };

    const onOut = (e: MouseEvent) => {
      const from = getInteractive(e.target);
      const to = getInteractive(e.relatedTarget);
      if (from && from !== to) {
        setInteractiveState(false);
      }
    };

    const onClick = (e: MouseEvent) => {
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: fixed; left: 0; top: 0; width: 12px; height: 12px; border-radius: 50%;
        background: rgba(129,140,248,0.45); pointer-events: none; z-index: 9997;
        animation: ct-ripple 0.55s ease-out forwards;
      `;
      setPosition(ripple, e.clientX, e.clientY);
      document.body.appendChild(ripple);
      window.setTimeout(() => {
        if (document.body.contains(ripple)) {
          document.body.removeChild(ripple);
        }
      }, 650);
    };

    const animate = () => {
      ox = lerp(ox, mx, 0.08);
      oy = lerp(oy, my, 0.08);
      rx = lerp(rx, mx, 0.18);
      ry = lerp(ry, my, 0.18);
      setPosition(orb, ox, oy);
      setPosition(ring, rx, ry);
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
        if (document.body.contains(el)) {
          document.body.removeChild(el);
        }
      });
    };
  }, [reduceMotion]);

  return null;
}
