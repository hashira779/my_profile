import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { LIGHT_COLORS, DARK_COLORS, getGradients } from '../constants/theme';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  colors: typeof DARK_COLORS;
  gradients: ReturnType<typeof getGradients>;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>('dark'); // Default to dark first

  useEffect(() => {
    if (systemScheme) {
      setTheme(systemScheme);
    }
  }, [systemScheme]);

  const colors = theme === 'dark' ? DARK_COLORS : LIGHT_COLORS;
  const gradients = getGradients(theme === 'dark');
  const isDark = theme === 'dark';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.backgroundColor = colors.bg;
      document.documentElement.style.backgroundColor = colors.bg;
      document.body.style.color = colors.textPrimary;
      document.documentElement.style.colorScheme = theme;

      // Inject theme-aware CSS variables for web styles
      document.documentElement.style.setProperty('--c-accent', colors.accent);
      document.documentElement.style.setProperty('--c-indigo', colors.indigo);
      document.documentElement.style.setProperty('--c-emerald', colors.emerald);
      document.documentElement.style.setProperty('--c-violet', colors.violet);
      document.documentElement.style.setProperty('--c-amber', colors.amber);
    }
  }, [theme, colors]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, colors, gradients, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
