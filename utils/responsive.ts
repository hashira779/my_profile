/**
 * Responsive helpers tuned for a clean product-page portfolio layout.
 */
export function sectionPadH(width: number): number {
  if (width >= 1180) return 64;
  if (width >= 768) return 40;
  return 20;
}

export function sectionPadV(width: number): number {
  if (width >= 1180) return 88;
  if (width >= 768) return 64;
  return 44;
}

export function titleSize(width: number): number {
  if (width >= 1180) return 56;
  if (width >= 768) return 44;
  if (width >= 480) return 36;
  return 31;
}

export function titleLineH(width: number): number {
  if (width >= 1180) return 62;
  if (width >= 768) return 50;
  if (width >= 480) return 42;
  return 37;
}

export function titleLetterSpacing(width: number): number {
  if (width >= 768) return -2.2;
  return -1;
}

export function numSize(width: number): number {
  if (width >= 1180) return 18;
  if (width >= 768) return 17;
  return 15;
}

export function subSize(width: number): number {
  if (width >= 1024) return 19;
  if (width >= 640) return 17;
  return 15;
}

export function bodySize(width: number): number {
  if (width >= 1024) return 17;
  return 15;
}

export function cardPad(width: number): number {
  if (width >= 1024) return 32;
  if (width >= 640) return 24;
  return 18;
}
