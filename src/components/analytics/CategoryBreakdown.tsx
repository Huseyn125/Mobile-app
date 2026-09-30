import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../ui/Card';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { CategorySales } from '../../types';
import { formatCurrency } from '../../utils/analytics';

export interface CategoryBreakdownProps {
  data: CategorySales[];
}

const CATEGORY_COLORS = [
  COLORS.primary,
  '#0284C7', // Sky
  '#0D9488', // Teal
  '#E11D48', // Rose
  '#D97706', // Amber
];

export const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({ data }) => {
  return (
    <Card variant="outlined" style={styles.card}>
      <Text style={styles.title}>Sales by Category</Text>

      {/* Stacked bar preview */}
      <View style={styles.stackedBar}>
        {data.map((cat, idx) => (
          <View
            key={cat.category}
            style={[
              styles.stackedBarSegment,
              {
                width: `${cat.percentage}%`,
                backgroundColor: CATEGORY_COLORS[idx % CATEGORY_COLORS.length],
              },
            ]}
          />
        ))}
      </View>

      {/* Category list with percentages */}
      <View style={styles.list}>
        {data.map((cat, idx) => {
          const color = CATEGORY_COLORS[idx % CATEGORY_COLORS.length];
          return (
            <View key={cat.category} style={styles.row}>
              <View style={styles.leftCol}>
                <View style={[styles.dot, { backgroundColor: color }]} />
                <Text style={styles.categoryName}>{cat.category}</Text>
              </View>

              <View style={styles.rightCol}>
                <Text style={styles.revenue}>{formatCurrency(cat.revenue)}</Text>
                <Text style={styles.percentage}>{cat.percentage}%</Text>
              </View>
            </View>
          );
        })}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: SPACING.base,
    marginBottom: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.h3,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  stackedBar: {
    height: 12,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: COLORS.surfaceSubtle,
    marginBottom: SPACING.base,
  },
  stackedBarSegment: {
    height: '100%',
  },
  list: {
    marginTop: SPACING.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.xs + 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceSubtle,
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.sm,
  },
  categoryName: {
    ...TYPOGRAPHY.body,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  rightCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  revenue: {
    ...TYPOGRAPHY.bodyMedium,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginRight: SPACING.md,
  },
  percentage: {
    ...TYPOGRAPHY.captionMedium,
    color: COLORS.textSecondary,
    minWidth: 32,
    textAlign: 'right',
  },
});
