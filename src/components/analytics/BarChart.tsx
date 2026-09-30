import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../ui/Card';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { RevenueDataPoint } from '../../types';

export interface BarChartProps {
  data: RevenueDataPoint[];
  title?: string;
  isCurrency?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  isCurrency = true,
}) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <Card variant="outlined" style={styles.card}>
      {title ? <Text style={styles.title}>{title}</Text> : null}

      <View style={styles.chartContainer}>
        {data.map((item, index) => {
          const heightPercent = Math.max(8, Math.round((item.value / maxValue) * 100));

          return (
            <View key={`${item.label}-${index}`} style={styles.barColumn}>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { height: `${heightPercent}%` }]} />
              </View>
              <Text style={styles.label} numberOfLines={1}>
                {item.label}
              </Text>
              <Text style={styles.valueText} numberOfLines={1}>
                {isCurrency ? `$${item.value >= 1000 ? `${(item.value / 1000).toFixed(1)}k` : item.value}` : item.value}
              </Text>
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
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 150,
    paddingTop: SPACING.sm,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
    marginHorizontal: 3,
  },
  barTrack: {
    width: 22,
    flex: 1,
    backgroundColor: COLORS.surfaceSubtle,
    borderRadius: RADIUS.xs,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.xs,
    width: '100%',
  },
  label: {
    ...TYPOGRAPHY.captionMedium,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs + 2,
    fontSize: 11,
  },
  valueText: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 1,
  },
});
