import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { usePrefersReducedMotion } from '../utils/motion';

/**
 * Constellation / particle field background effect.
 * Renders a canvas with floating dots and connection lines on web.
 */
export default function ParticleField() {
  const { colors, isDark } = useTheme();
  const reduceMotion = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (
      Platform.OS !== 'web' ||
      typeof document === 'undefined' ||
      typeof window === 'undefined' ||
      reduceMotion
    ) {
      return;
    }

    // Don't run on mobile or touch-only
    if (window.innerWidth < 768) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'ct-particle-field';
    canvas.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      pointer-events: none; z-index: 1; opacity: ${isDark ? 0.4 : 0.2};
    `;
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = window.innerWidth;
    let H = window.innerHeight;
    let mouseX = W / 2;
    let mouseY = H / 2;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();

    const PARTICLE_COUNT = Math.min(Math.floor((W * H) / 18000), 80);
    const CONNECTION_DIST = 140;
    const MOUSE_RADIUS = 180;

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      size: number; opacity: number;
      baseOpacity: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const baseOpacity = 0.15 + Math.random() * 0.45;
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 1 + Math.random() * 2,
        opacity: baseOpacity,
        baseOpacity,
      });
    }

    const accent = isDark ? [6, 182, 212] : [37, 99, 235];
    const secondary = isDark ? [139, 92, 246] : [124, 58, 237];

    let raf = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        // Mouse repulsion
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS) {
          const force = (1 - dist / MOUSE_RADIUS) * 0.02;
          p.vx += dx * force * 0.1;
          p.vy += dy * force * 0.1;
          p.opacity = Math.min(1, p.baseOpacity + (1 - dist / MOUSE_RADIUS) * 0.5);
        } else {
          p.opacity += (p.baseOpacity - p.opacity) * 0.02;
        }

        // Dampen velocity
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Draw dot
        const col = i % 3 === 0 ? secondary : accent;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col[0]}, ${col[1]}, ${col[2]}, ${p.opacity})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const ddx = p.x - q.x;
          const ddy = p.y - q.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < CONNECTION_DIST) {
            const alpha = (1 - d / CONNECTION_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas);
      }
    };
  }, [reduceMotion, isDark, colors]);

  return null;
}
