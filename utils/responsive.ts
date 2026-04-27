/**
 * Responsive breakpoint helpers
 * Mobile  : width < 640
 * Tablet  : 640 <= width < 1024
 * Desktop : width >= 1024
 */

export function sectionPadH(width: number): number {
  if (width >= 1024) return 64;
  if (width >= 640)  return 32;
  return 20;
}

export function sectionPadV(width: number): number {
  if (width >= 1024) return 100;
  if (width >= 640)  return 64;
  return 40;
}

export function titleSize(width: number): number {
  if (width >= 1024) return 68;
  if (width >= 768)  return 48;
  if (width >= 480)  return 38;
  return 32;
}

export function titleLineH(width: number): number {
  if (width >= 1024) return 76;
  if (width >= 768)  return 56;
  if (width >= 480)  return 46;
  return 40;
}

export function titleLetterSpacing(width: number): number {
  if (width >= 768) return -3;
  return -1;
}

export function numSize(width: number): number {
  if (width >= 1024) return 68;
  if (width >= 640)  return 48;
  return 34;
}

export function subSize(width: number): number {
  if (width >= 1024) return 18;
  if (width >= 640)  return 16;
  return 14;
}

export function bodySize(width: number): number {
  if (width >= 1024) return 17;
  return 15;
}

export function cardPad(width: number): number {
  if (width >= 1024) return 32;
  if (width >= 640)  return 24;
  return 18;
}

