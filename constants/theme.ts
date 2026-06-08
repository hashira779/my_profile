export const LIGHT_COLORS = {
  bg: '#FAF9F6', // Alabaster / Premium warm white
  bgWarm: '#F5F5F3',
  bgDeep: '#EFEFEA',
  surface: 'rgba(0,0,0,0.03)',
  surfaceSoft: 'rgba(0,0,0,0.02)',
  card: 'rgba(0,0,0,0.03)',
  cardSolid: '#F5F5F3',
  cardHover: 'rgba(0,0,0,0.05)',
  border: 'rgba(0,0,0,0.08)',
  borderBright: 'rgba(0,0,0,0.15)',

  accent: '#2563EB', // Cobalt blue for light theme
  accentDark: '#1D4ED8',
  indigo: '#2563EB',
  indigoDark: '#1D4ED8',
  sky: '#0EA5E9',
  violet: '#7C3AED',
  emerald: '#059669',
  rose: '#E11D48',
  amber: '#D97706',
  graphite: '#1F2937',

  textPrimary: '#1D1D1F', // Dark charcoal
  textSecondary: 'rgba(0,0,0,0.68)',
  textMuted: 'rgba(0,0,0,0.44)',
  textDim: 'rgba(0,0,0,0.28)',

  navBg: 'rgba(250,249,246,0.76)',
  navBorder: 'rgba(0,0,0,0.06)',
  shadow: 'rgba(0,0,0,0.10)',
};

export const DARK_COLORS = {
  bg: '#000000',
  bgWarm: '#060606',
  bgDeep: '#0A0A0A',
  surface: 'rgba(255,255,255,0.04)',
  surfaceSoft: 'rgba(255,255,255,0.03)',
  card: 'rgba(255,255,255,0.04)',
  cardSolid: '#0D0D0D',
  cardHover: 'rgba(255,255,255,0.07)',
  border: 'rgba(255,255,255,0.08)',
  borderBright: 'rgba(255,255,255,0.16)',

  accent: '#06B6D4', // Teal/Cyan for dark theme
  accentDark: '#0891B2',
  indigo: '#06B6D4',
  indigoDark: '#0891B2',
  sky: '#22D3EE',
  violet: '#8B5CF6',
  emerald: '#34D399',
  rose: '#FB7185',
  amber: '#FBBF24',
  graphite: '#E5E7EB',

  textPrimary: '#F5F5F7', // Off-white
  textSecondary: 'rgba(255,255,255,0.65)',
  textMuted: 'rgba(255,255,255,0.40)',
  textDim: 'rgba(255,255,255,0.25)',

  navBg: 'rgba(0,0,0,0.72)',
  navBorder: 'rgba(255,255,255,0.06)',
  shadow: 'rgba(0,0,0,0.40)',
};

// Fallback COLORS object pointing to dark colors by default for safety
export const COLORS = DARK_COLORS;

export const getGradients = (isDark: boolean) => ({
  heroOrb1: isDark ? ['rgba(6,182,212,0.12)', 'transparent'] as [string, string] : ['rgba(37,99,235,0.08)', 'transparent'] as [string, string],
  heroOrb2: isDark ? ['rgba(52,211,153,0.08)', 'transparent'] as [string, string] : ['rgba(5,150,105,0.06)', 'transparent'] as [string, string],
  heroOrb3: isDark ? ['rgba(139,92,246,0.06)', 'transparent'] as [string, string] : ['rgba(124,58,237,0.05)', 'transparent'] as [string, string],
  accent: isDark ? ['#06B6D4', '#22D3EE'] as [string, string] : ['#2563EB', '#0EA5E9'] as [string, string],
  accentReverse: isDark ? ['#22D3EE', '#06B6D4'] as [string, string] : ['#0EA5E9', '#2563EB'] as [string, string],
  card: isDark ? ['rgba(255,255,255,0.04)', 'rgba(255,255,255,0.02)'] as [string, string] : ['rgba(0,0,0,0.02)', 'rgba(0,0,0,0.01)'] as [string, string],
  button: isDark ? ['#06B6D4', '#22D3EE'] as [string, string] : ['#2563EB', '#0EA5E9'] as [string, string],
  buttonHover: isDark ? ['#0891B2', '#06B6D4'] as [string, string] : ['#1D4ED8', '#2563EB'] as [string, string],
  skillBar: isDark ? ['#06B6D4', '#34D399'] as [string, string] : ['#2563EB', '#059669'] as [string, string],
  section: isDark ? ['transparent', 'rgba(6,182,212,0.03)', 'transparent'] as [string, string, string] : ['transparent', 'rgba(37,99,235,0.03)', 'transparent'] as [string, string, string],
});

export const GRADIENTS = getGradients(true);

export const RADIUS = {
  sm: 10,
  md: 16,
  lg: 24,
  xl: 34,
  full: 9999,
};

export const FONT_SIZE = {
  heroTitle: 72,
  sectionTitle: 56,
  cardTitle: 21,
  body: 17,
  small: 13,
  badge: 11,
};

export const FONT_FAMILY = {
  header: 'Inter',
  accent: 'Inter',
  body: 'Inter',
};
