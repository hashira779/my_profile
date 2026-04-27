import React, { createContext, useContext } from 'react';
import { Animated } from 'react-native';
interface ScrollAnimContextType {
  scrollY: Animated.Value;
  windowHeight: number;
}
const ScrollAnimContext = createContext<ScrollAnimContextType | null>(null);
export function ScrollAnimProvider({
  children,
  windowHeight,
  scrollY,
}: {
  children: React.ReactNode;
  windowHeight: number;
  scrollY: Animated.Value;
}) {
  return (
    <ScrollAnimContext.Provider value={{ scrollY, windowHeight }}>
      {children}
    </ScrollAnimContext.Provider>
  );
}
export function useScrollAnim() {
  const ctx = useContext(ScrollAnimContext);
  if (!ctx) throw new Error('useScrollAnim must be used within ScrollAnimProvider');
  return ctx;
}
