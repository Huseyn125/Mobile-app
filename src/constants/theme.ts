export const COLORS = {
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  primaryLight: '#EFF6FF',
  
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceSubtle: '#F1F5F9',
  
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  
  success: '#16A34A',
  successLight: '#DCFCE7',
  
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  
  danger: '#DC2626',
  dangerLight: '#FEE2E2',
  
  info: '#0284C7',
  infoLight: '#E0F2FE',
  
  border: '#E2E8F0',
  borderDark: '#CBD5E1',
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
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const TYPOGRAPHY = {
  hero: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 34,
  },
  h1: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 30,
  },
  h2: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 26,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  bodyMedium: {
    fontSize: 15,
    fontWeight: '500' as const,
    lineHeight: 22,
  },
  caption: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
  },
  captionMedium: {
    fontSize: 13,
    fontWeight: '500' as const,
    lineHeight: 18,
  },
  badge: {
    fontSize: 12,
    fontWeight: '600' as const,
    lineHeight: 16,
  },
  kpiNumber: {
    fontSize: 26,
    fontWeight: '700' as const,
    lineHeight: 32,
  },
};

export const SHADOWS = {
  card: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  subtle: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
};
