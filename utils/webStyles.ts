import { Platform } from 'react-native';

export function injectGlobalStyles() {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;

  // Inject Google Fonts link tag
  if (!document.getElementById('ct-fonts')) {
    const link = document.createElement('link');
    link.id = 'ct-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&family=Syne:wght@700;800&display=swap';
    document.head.appendChild(link);
  }

  if (document.getElementById('ct-global')) return;

  const s = document.createElement('style');
  s.id = 'ct-global';
  s.textContent = `
    html { scroll-behavior: smooth; }
    body { margin: 0; font-family: "Inter", "SF Pro Display", "Segoe UI", system-ui, sans-serif; text-rendering: geometricPrecision; -webkit-font-smoothing: antialiased; }
    
    /* Matte Noise screen overlay */
    body::after {
      content: "";
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      opacity: 0.04;
      pointer-events: none;
      z-index: 9999;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

    * { box-sizing: border-box; }
    ::selection { background: rgba(6,182,212,0.28); }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(120, 120, 120, 0.3); border-radius: 6px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(120, 120, 120, 0.5); }

    #scroll-root {
      scroll-behavior: smooth;
    }

    @media (prefers-reduced-motion: reduce) {
      html,
      #scroll-root { scroll-behavior: auto; }
    }

    @keyframes ct-gradient-flow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes ct-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @keyframes ct-marquee-rev { from { transform: translateX(-50%); } to { transform: translateX(0); } }
    @keyframes ct-blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
    @keyframes ct-float {
      0%,100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.45; }
      33% { transform: translateY(-18px) translateX(10px) scale(1.04); opacity: 0.72; }
      66% { transform: translateY(-7px) translateX(-12px) scale(0.97); opacity: 0.55; }
    }
    @keyframes ct-ambient-drift {
      0%,100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.58; }
      35% { transform: translate3d(28px, -18px, 0) scale(1.05); opacity: 0.82; }
      70% { transform: translate3d(-16px, 20px, 0) scale(0.97); opacity: 0.66; }
    }
    @keyframes ct-ambient-drift-alt {
      0%,100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.48; }
      40% { transform: translate3d(-24px, 18px, 0) scale(1.04); opacity: 0.76; }
      78% { transform: translate3d(18px, -12px, 0) scale(0.98); opacity: 0.58; }
    }
    @keyframes ct-soft-breathe {
      0%,100% { opacity: 0.55; }
      50% { opacity: 1; }
    }
    @keyframes ct-avatar-float {
      0%,100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    @keyframes ct-avatar-pulse {
      0% { transform: scale(1); opacity: 0.28; }
      80%,100% { transform: scale(1.45); opacity: 0; }
    }
    @keyframes ct-scan {
      0% { transform: translateY(-100%); opacity: 0; }
      15%,85% { opacity: 0.35; }
      100% { transform: translateY(600%); opacity: 0; }
    }
    @keyframes ct-orbit {
      from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
      to { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
    }
    @keyframes ct-pulse-ring {
      0% { transform: scale(0.85); opacity: 0.7; }
      70% { transform: scale(2.2); opacity: 0; }
      100% { transform: scale(0.85); opacity: 0; }
    }
    @keyframes ct-shimmer {
      0% { transform: translateX(-150%) skewX(-12deg); }
      100% { transform: translateX(250%) skewX(-12deg); }
    }
    @keyframes ct-shiny-cta {
      0% { left: -100%; }
      50%, 100% { left: 150%; }
    }
    @keyframes ct-panel-sheen {
      0% { transform: translateX(-130%) skewX(-16deg); opacity: 0; }
      18%,55% { opacity: 0.42; }
      100% { transform: translateX(230%) skewX(-16deg); opacity: 0; }
    }
    @keyframes ct-glint {
      0% { transform: translateX(-220%) skewX(-18deg); opacity: 0; }
      25%,75% { opacity: 0.45; }
      100% { transform: translateX(220%) skewX(-18deg); opacity: 0; }
    }
    @keyframes ct-bounce-in {
      0% { transform: scale(0.55); opacity: 0; }
      55% { transform: scale(1.08); opacity: 1; }
      80% { transform: scale(0.97); }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes ct-spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes ct-spin-rev { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
    @keyframes ct-particle-rise {
      0% { transform: translateY(0px) scale(1); opacity: 0; }
      8% { opacity: 0.7; }
      85% { opacity: 0.42; }
      100% { transform: translateY(-90px) scale(0.2); opacity: 0; }
    }
    @keyframes ct-counter-up { from { transform: translateY(14px); opacity: 0; } to { transform: translateY(0px); opacity: 1; } }
    @keyframes ct-ripple { 0% { transform: scale(0); opacity: 0.35; } 100% { transform: scale(6); opacity: 0; } }
    @keyframes ct-text-slide { from { opacity: 0; letter-spacing: 0.6em; } to { opacity: 1; letter-spacing: normal; } }
    @keyframes ct-glow-pulse {
      0%,100% { box-shadow: 0 0 8px 1px rgba(6,182,212,0.22); }
      50% { box-shadow: 0 0 18px 4px rgba(34,211,238,0.34); }
    }
    @keyframes ct-border-glow {
      0%,100% { border-color: rgba(6,182,212,0.16); }
      50% { border-color: rgba(34,211,238,0.34); }
    }
    @keyframes ct-scroll-cue { 0%,100% { transform: translateY(0px); opacity: 0.45; } 50% { transform: translateY(8px); opacity: 1; } }
    @keyframes ct-page-sheen { 0%,100% { transform: translate3d(0%,0,0); opacity: 0.06; } 50% { transform: translate3d(390%,0,0); opacity: 0.12; } }
    @keyframes ct-progress-shine {
      0% { transform: translateX(-120%); opacity: 0; }
      15%,75% { opacity: 0.55; }
      100% { transform: translateX(220%); opacity: 0; }
    }
    @keyframes ct-divider-scan {
      0% { transform: translateX(-30%); opacity: 0; }
      20%,80% { opacity: 0.55; }
      100% { transform: translateX(520%); opacity: 0; }
    }
    @keyframes ct-line-expand { from { width: 0; } to { width: 60px; } }
    @keyframes ct-num-fade { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes ct-word-reveal { from { opacity: 0; transform: translateY(24px) scale(0.98); filter: blur(4px); } to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } }
    @keyframes ct-hero-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes ct-hero-left { from { opacity: 0; transform: translateX(-24px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes ct-hero-right { from { opacity: 0; transform: translateX(32px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes ct-hero-scale { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }

    .ct-outlined-indigo {
      color: transparent !important;
      -webkit-text-fill-color: transparent !important;
      -webkit-text-stroke: 1.5px var(--c-indigo) !important;
    }
    .ct-outlined-emerald {
      color: transparent !important;
      -webkit-text-fill-color: transparent !important;
      -webkit-text-stroke: 1.5px var(--c-emerald) !important;
    }
    .ct-outlined-violet {
      color: transparent !important;
      -webkit-text-fill-color: transparent !important;
      -webkit-text-stroke: 1.5px var(--c-violet) !important;
    }
    .ct-outlined-amber {
      color: transparent !important;
      -webkit-text-fill-color: transparent !important;
      -webkit-text-stroke: 1.5px var(--c-amber) !important;
    }
    .ct-outlined-accent {
      color: transparent !important;
      -webkit-text-fill-color: transparent !important;
      -webkit-text-stroke: 1.5px var(--c-accent) !important;
    }
  `;
  document.head.appendChild(s);
}
