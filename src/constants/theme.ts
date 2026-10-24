// Modern Dribbble / Emerald Minimalist Design System
export const COLORS = {
  // Emerald brand palette
  primary: '#00875A',          // Deep vibrant emerald green
  primaryDark: '#006644',      // Dark emerald
  primaryLight: '#E6F7F0',     // Soft mint highlight
  primaryHover: '#007A51',
  
  // Secondary / Accent
  secondary: '#18181B',        // Deep dark slate / black
  secondaryLight: '#F4F5F7',
  accentGreen: '#10B981',      // Bright mint
  accentYellow: '#F59E0B',     // Warm amber/gold from donut chart
  accentOrange: '#FB923C',
  accentSlate: '#94A3B8',      // Grey platform metric

  // Surfaces & Backgrounds
  background: '#F8FAF9',       // Clean, airy light grey/mint background
  surface: '#FFFFFF',          // Crisp white card surface
  surfaceSubtle: '#F1F5F3',    // Light divider / input background
  surfaceTint: '#E6F7F0',

  // Text
  textPrimary: '#18181B',      // High contrast dark text
  textSecondary: '#64748B',    // Slate grey body text
  textMuted: '#94A3B8',        // Faint caption text
  textInverse: '#FFFFFF',

  // Status colors
  success: '#00875A',
  successLight: '#E6F7F0',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  info: '#0284C7',
  infoLight: '#E0F2FE',

  // Borders & Dividers
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  borderDark: '#CBD5E1',

  // Legacy mappings for backwards compatibility
  onPrimary: '#FFFFFF',
  onSecondary: '#FFFFFF',
  surfaceContainer: '#FFFFFF',
  surfaceContainerLow: '#F8FAF9',
  surfaceContainerHigh: '#F1F5F3',
  primaryContainer: '#E6F7F0',
  outline: '#747686',
  onSurface: '#18181B',
  onSurfaceVariant: '#64748B',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const RADIUS = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 26,
  xxl: 32,
  full: 9999,
};

export const TYPOGRAPHY = {
  displayLg: { fontSize: 34, fontWeight: '800' as const, lineHeight: 40, letterSpacing: -1 },
  displayMd: { fontSize: 28, fontWeight: '700' as const, lineHeight: 34, letterSpacing: -0.6 },
  heroNumber: { fontSize: 38, fontWeight: '800' as const, lineHeight: 44, letterSpacing: -1.2 },
  headlineLg: { fontSize: 22, fontWeight: '700' as const, lineHeight: 28, letterSpacing: -0.4 },
  headlineMd: { fontSize: 18, fontWeight: '700' as const, lineHeight: 24, letterSpacing: -0.2 },
  titleSm: { fontSize: 15, fontWeight: '600' as const, lineHeight: 20 },
  bodyLg: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  body: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  bodyMedium: { fontSize: 14, fontWeight: '600' as const, lineHeight: 20 },
  bodySmall: { fontSize: 13, fontWeight: '400' as const, lineHeight: 18 },
  bodySmallMedium: { fontSize: 13, fontWeight: '600' as const, lineHeight: 18 },
  caption: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
  captionMedium: { fontSize: 12, fontWeight: '600' as const, lineHeight: 16 },
  badge: { fontSize: 11, fontWeight: '700' as const, lineHeight: 14 },
  labelCaps: { fontSize: 11, fontWeight: '700' as const, lineHeight: 14, letterSpacing: 0.8, textTransform: 'uppercase' as const },
  // Legacy aliases
  hero: { fontSize: 30, fontWeight: '800' as const, lineHeight: 36 },
  h1: { fontSize: 24, fontWeight: '700' as const, lineHeight: 30 },
  h2: { fontSize: 20, fontWeight: '700' as const, lineHeight: 26 },
  h3: { fontSize: 17, fontWeight: '600' as const, lineHeight: 22 },
  kpiNumber: { fontSize: 28, fontWeight: '800' as const, lineHeight: 34 },
};

export const SHADOWS = {
  card: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  elevated: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  subtle: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  lg: {
    shadowColor: '#00875A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 6,
  },
};
