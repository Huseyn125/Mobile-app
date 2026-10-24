import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export interface InsightBarPoint {
  label: string;
  value: number;
}

export interface InsightBarChartProps {
  heroValue: string | number;
  heroSubtitle: string;
  data: InsightBarPoint[];
  highlightIndex?: number;
  highlightTooltipText?: string;
}

export const InsightBarChart: React.FC<InsightBarChartProps> = ({
  heroValue = '4.488',
  heroSubtitle = 'messages sent through your business profile',
  data = [
    { label: '01', value: 80 },
    { label: '02', value: 160 },
    { label: '03', value: 340 },
    { label: '04', value: 480 },
    { label: '05', value: 240 },
    { label: '06', value: 400 },
    { label: '07', value: 210 },
  ],
  highlightIndex = 5,
  highlightTooltipText = '↑ 400',
}) => {
  const maxValue = Math.max(...data.map((d) => d.value), 500);

  return (
    <View style={styles.card}>
      {/* Big Hero Metric */}
      <Text style={styles.heroNumber}>{heroValue}</Text>
      <Text style={styles.heroSubtitle}>{heroSubtitle}</Text>

      {/* Chart Section with Y-Axis */}
      <View style={styles.chartWrapper}>
        {/* Y Axis Guide Numbers */}
        <View style={styles.yAxis}>
          <Text style={styles.axisLabel}>500</Text>
          <Text style={styles.axisLabel}>400</Text>
          <Text style={styles.axisLabel}>300</Text>
          <Text style={styles.axisLabel}>200</Text>
          <Text style={styles.axisLabel}>0</Text>
        </View>

        {/* Bars Container */}
        <View style={styles.barsArea}>
          {data.map((item, index) => {
            const isHighlighted = index === highlightIndex;
            const barHeight = Math.max(12, Math.round((item.value / maxValue) * 140));

            return (
              <View key={`${item.label}-${index}`} style={styles.columnWrapper}>
                {/* Floating Tooltip Pill for highlighted bar */}
                {isHighlighted && (
                  <View style={styles.tooltipContainer}>
                    <View style={styles.tooltipBadge}>
                      <Text style={styles.tooltipText}>{highlightTooltipText}</Text>
                    </View>
                    <View style={styles.tooltipArrow} />
                  </View>
                )}

                {/* Pill Bar */}
                <View
                  style={[
                    styles.bar,
                    { height: barHeight },
                    isHighlighted ? styles.highlightedBar : styles.normalBar,
                  ]}
                />
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.subtle,
  },
  heroNumber: {
    ...TYPOGRAPHY.heroNumber,
    color: COLORS.textPrimary,
  },
  heroSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginTop: 4,
    marginBottom: SPACING.xl,
  },
  chartWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 190,
  },
  yAxis: {
    height: 160,
    justifyContent: 'space-between',
    paddingBottom: 4,
    marginRight: SPACING.md,
  },
  axisLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    fontSize: 11,
  },
  barsArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: '100%',
    paddingBottom: 4,
  },
  columnWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
    flex: 1,
  },
  bar: {
    width: 18,
    borderRadius: RADIUS.full,
  },
  normalBar: {
    backgroundColor: '#C7EEDC', // Soft mint from design
  },
  highlightedBar: {
    backgroundColor: COLORS.primary, // Deep emerald
  },
  tooltipContainer: {
    alignItems: 'center',
    marginBottom: 4,
  },
  tooltipBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltipText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  tooltipArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 5,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: COLORS.primary,
  },
});
