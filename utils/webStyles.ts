import { Platform } from 'react-native';
export function injectGlobalStyles() {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  if (document.getElementById('ct-global')) return;
  const s = document.createElement('style');
  s.id = 'ct-global';
  s.textContent = `
    html { scroll-behavior: smooth; }
    * { box-sizing: border-box; }
    ::selection { background: rgba(99,102,241,0.35); color: #f8fafc; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: #000; }
    ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #818cf8, #38bdf8); border-radius: 3px; }

    /* Apple-style scroll container */
    #scroll-root {
      scroll-behavior: smooth;
    }

    @media (prefers-reduced-motion: reduce) {
      html,
      #scroll-root {
        scroll-behavior: auto;
      }
    }

    /* ── Keyframes ───────────────────────────────── */
    @keyframes ct-gradient-flow {
      0%   { background-position: 0%   50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0%   50%; }
    }
    @keyframes ct-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @keyframes ct-marquee-rev { from { transform: translateX(-50%); } to { transform: translateX(0); } }
    @keyframes ct-blink { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes ct-float {
      0%,100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.3; }
      33%     { transform: translateY(-22px) translateX(12px) scale(1.1); opacity: 0.7; }
      66%     { transform: translateY(-8px) translateX(-14px) scale(0.9); opacity: 0.4; }
    }
    @keyframes ct-avatar-float {
      0%, 100% { transform: translateY(0px); }
      50%      { transform: translateY(-10px); }
    }
    @keyframes ct-scan {
      0%   { transform: translateY(-100%); opacity: 0; }
      15%  { opacity: 0.6; }
      85%  { opacity: 0.6; }
      100% { transform: translateY(600%);  opacity: 0; }
    }
    @keyframes ct-orbit {
      from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
      to   { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
    }
    @keyframes ct-pulse-ring {
      0%   { transform: scale(0.85); opacity: 0.9; }
      70%  { transform: scale(2.2);  opacity: 0; }
      100% { transform: scale(0.85); opacity: 0; }
    }
    @keyframes ct-shimmer {
      0%   { transform: translateX(-150%) skewX(-12deg); }
      100% { transform: translateX(250%)  skewX(-12deg); }
    }
    @keyframes ct-glint {
      0%   { transform: translateX(-220%) skewX(-18deg); opacity: 0; }
      25%  { opacity: 0.7; }
      75%  { opacity: 0.7; }
      100% { transform: translateX(220%)  skewX(-18deg); opacity: 0; }
    }
    @keyframes ct-bounce-in {
      0%   { transform: scale(0.55); opacity: 0; }
      55%  { transform: scale(1.08); opacity: 1; }
      80%  { transform: scale(0.97); }
      100% { transform: scale(1);    opacity: 1; }
    }
    @keyframes ct-spin-slow {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes ct-spin-rev {
      from { transform: rotate(0deg); }
      to   { transform: rotate(-360deg); }
    }
    @keyframes ct-particle-rise {
      0%   { transform: translateY(0px)   scale(1);   opacity: 0; }
      8%   { opacity: 0.9; }
      85%  { opacity: 0.6; }
      100% { transform: translateY(-90px) scale(0.2); opacity: 0; }
    }
    @keyframes ct-counter-up {
      from { transform: translateY(14px); opacity: 0; }
      to   { transform: translateY(0px);  opacity: 1; }
    }
    @keyframes ct-ripple {
      0%   { transform: scale(0); opacity: 0.6; }
      100% { transform: scale(6); opacity: 0; }
    }
    @keyframes ct-text-slide {
      from { opacity: 0; letter-spacing: 0.6em; }
      to   { opacity: 1; letter-spacing: normal; }
    }
    @keyframes ct-glow-pulse {
      0%, 100% { box-shadow: 0 0 8px 2px rgba(129,140,248,0.3); }
      50%       { box-shadow: 0 0 22px 6px rgba(129,140,248,0.7); }
    }
    @keyframes ct-border-glow {
      0%, 100% { border-color: rgba(99,102,241,0.2); }
      50%       { border-color: rgba(99,102,241,0.7); }
    }
    @keyframes ct-scroll-cue {
      0%,100% { transform: translateY(0px); opacity: 0.5; }
      50%      { transform: translateY(10px); opacity: 1; }
    }
    @keyframes ct-line-expand {
      from { width: 0; }
      to   { width: 60px; }
    }
    @keyframes ct-num-fade {
      from { opacity: 0; transform: translateX(-20px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes ct-word-reveal {
      from { opacity: 0; transform: translateY(24px) scale(0.98); filter: blur(4px); }
      to   { opacity: 1; transform: translateY(0)    scale(1);    filter: blur(0); }
    }
    /* ── Hero entrance (CSS, compositor-thread smooth) ── */
    @keyframes ct-hero-up {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes ct-hero-left {
      from { opacity: 0; transform: translateX(-24px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes ct-hero-right {
      from { opacity: 0; transform: translateX(32px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes ct-hero-scale {
      from { opacity: 0; transform: scale(0.94); }
      to   { opacity: 1; transform: scale(1); }
    }
  `;
  document.head.appendChild(s);
}
