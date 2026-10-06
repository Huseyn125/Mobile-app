import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '../ui/Card';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { CategorySales } from '../../types';
import { formatCurrency } from '../../utils/analytics';

export interface CategoryDonutChartProps {
  data: CategorySales[];
  title?: string;
}

const CATEGORY_COLORS = [
  COLORS.primaryContainer, // #1d4ed8 (Electronics / Blue)
  COLORS.surfaceTint,      // #2151da (Accessories / Indigo)
  COLORS.secondary,        // #006c49 (Clothing / Green)
  '#f59e0b',               // Amber (Home / Lifestyle)
  COLORS.outline,          // Grey (Other)
];

export const CategoryDonutChart: React.FC<CategoryDonutChartProps> = ({
  data,
  title = 'Sales by Category',
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const activeItem = selectedIndex !== null ? data[selectedIndex] : data[0];

  return (
    <Card variant="outlined" style={styles.card}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>Volume distribution by catalog dept</Text>
        </View>
        <Text style={styles.totalRevenue}>{formatCurrency(totalRevenue)}</Text>
      </View>

      {/* Donut Visualization Container */}
      <View style={styles.chartWrapper}>
        <View style={styles.donutContainer}>
          {/* Multi-layered segment ring */}
          <View style={styles.donutOuterRing}>
            {/* Slices represented through proportional quadrant arcs */}
            {data.slice(0, 4).map((item, idx) => {
              const color = CATEGORY_COLORS[idx % CATEGORY_COLORS.length];
              const isSelected = selectedIndex === idx;

              return (
                <View
                  key={item.category}
                  style={[
                    styles.ringSlice,
                    {
                      borderColor: color,
                      opacity: selectedIndex === null || isSelected ? 1 : 0.4,
                      transform: [{ rotate: `${idx * 88}deg` }],
                    },
                  ]}
                />
              );
            })}
          </View>

          {/* Inner Cutout Hole */}
          <View style={styles.donutHole}>
            {activeItem ? (
              <View style={styles.holeContent}>
                <Text style={styles.holePercentage}>{activeItem.percentage}%</Text>
                <Text style={styles.holeCategory} numberOfLines={1}>
                  {activeItem.category}
                </Text>
                <Text style={styles.holeRevenue}>{formatCurrency(activeItem.revenue)}</Text>
              </View>
            ) : (
              <View style={styles.holeContent}>
                <Text style={styles.holePercentage}>100%</Text>
                <Text style={styles.holeCategory}>Total</Text>
              </View>
            )}
          </View>
        </View>

        <Text style={styles.tapHint}>Tap a category to inspect volume share</Text>
      </View>

      {/* Category Breakdown Interactive Legend Grid */}
      <View style={styles.legendGrid}>
        {data.map((cat, idx) => {
          const color = CATEGORY_COLORS[idx % CATEGORY_COLORS.length];
          const isSelected = selectedIndex === idx;

          return (
            <TouchableOpacity
              key={cat.category}
              style={[
                styles.legendCard,
                isSelected && styles.legendCardActive,
              ]}
              onPress={() => setSelectedIndex(isSelected ? null : idx)}
              activeOpacity={0.7}
            >
              <View style={styles.legendTop}>
                <View style={[styles.colorDot, { backgroundColor: color }]} />
                <Text style={styles.catName} numberOfLines={1}>
                  {cat.category}
                </Text>
              </View>

              <View style={styles.legendBottom}>
                <Text style={styles.catRevenue}>{formatCurrency(cat.revenue)}</Text>
                <Text style={styles.catShare}>{cat.percentage}% ({cat.count} sold)</Text>
              </View>
            </TouchableOpacity>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.h3,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  subtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  totalRevenue: {
    ...TYPOGRAPHY.h3,
    fontSize: 16,
    color: COLORS.primaryContainer,
    fontWeight: '700',
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.md,
  },
  donutContainer: {
    width: 170,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  donutOuterRing: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: COLORS.surfaceSubtle,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringSlice: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 24,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  donutHole: {
    width: 116,
    height: 116,
    borderRadius: 58,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  holeContent: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  holePercentage: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
    lineHeight: 26,
  },
  holeCategory: {
    ...TYPOGRAPHY.captionMedium,
    color: COLORS.textSecondary,
    marginTop: 1,
    fontSize: 11,
  },
  holeRevenue: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 10,
    marginTop: 1,
  },
  tapHint: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    fontSize: 11,
    marginTop: SPACING.sm,
  },
  legendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  legendCard: {
    width: '48%',
    backgroundColor: COLORS.surfaceSubtle,
    borderRadius: RADIUS.md,
    padding: SPACING.sm + 2,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  legendCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.surface,
  },
  legendTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  colorDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
  },
  catName: {
    ...TYPOGRAPHY.captionMedium,
    fontWeight: '700',
    color: COLORS.textPrimary,
    flex: 1,
  },
  legendBottom: {
    marginTop: 2,
  },
  catRevenue: {
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontSize: 13,
  },
  catShare: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 1,
  },
});
