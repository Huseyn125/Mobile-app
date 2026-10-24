import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Card } from './Card';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export interface KpiCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  subtitle?: string;
  icon?: keyof typeof Feather.glyphMap;
  variant?: 'primary' | 'standard';
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  subtitle,
  icon,
  variant = 'standard',
}) => {
  const isPrimary = variant === 'primary';

  return (
    <Card
      variant={isPrimary ? 'elevated' : 'outlined'}
      style={[styles.card, isPrimary && styles.primaryCard]}
    >
      <View style={styles.headerRow}>
        <Text style={[styles.title, isPrimary && styles.textLightSubtle]}>{title}</Text>
        {icon ? (
          <View style={[styles.iconBox, isPrimary && styles.iconBoxPrimary]}>
            <Feather
              name={icon}
              size={18}
              color={isPrimary ? COLORS.surface : COLORS.primary}
            />
          </View>
        ) : null}
      </View>

      <Text style={[styles.value, isPrimary && styles.textLight]}>{value}</Text>

      {change || subtitle ? (
        <View style={styles.footerRow}>
          {change ? (
            <View
              style={[
                styles.trendBadge,
                isPositive ? styles.trendPositive : styles.trendNegative,
              ]}
            >
              <Feather
                name={isPositive ? 'arrow-up-right' : 'arrow-down-right'}
                size={14}
                color={isPositive ? COLORS.success : COLORS.danger}
              />
              <Text
                style={[
                  styles.trendText,
                  { color: isPositive ? COLORS.success : COLORS.danger },
                ]}
              >
                {change}
              </Text>
            </View>
          ) : null}
          {subtitle ? (
            <Text
              style={[
                styles.subtitle,
                isPrimary && styles.textLightSubtle,
                change ? { marginLeft: SPACING.xs } : undefined,
              ]}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
      ) : null}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: SPACING.base,
  },
  primaryCard: {
    backgroundColor: COLORS.primary,
    borderColor: 'transparent',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  title: {
    ...TYPOGRAPHY.captionMedium,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxPrimary: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  value: {
    ...TYPOGRAPHY.kpiNumber,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs + 2,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  trendPositive: {
    backgroundColor: COLORS.successLight,
  },
  trendNegative: {
    backgroundColor: COLORS.dangerLight,
  },
  trendText: {
    ...TYPOGRAPHY.badge,
    marginLeft: 2,
  },
  subtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  textLight: {
    color: COLORS.surface,
  },
  textLightSubtle: {
    color: '#CBD5E1',
  },
});
