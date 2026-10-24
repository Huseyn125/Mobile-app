import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export interface PlatformItem {
  color: string;
  count: number | string;
  percentage: number;
  label: string;
}

export interface PlatformDonutCardProps {
  title?: string;
  items?: PlatformItem[];
}

export const PlatformDonutCard: React.FC<PlatformDonutCardProps> = ({
  title = 'The platform the user is using',
  items = [
    {
      color: COLORS.primary,
      count: '480',
      percentage: 25,
      label: 'Using Business App',
    },
    {
      color: COLORS.accentYellow,
      count: '880',
      percentage: 50,
      label: 'Using Messenger App',
    },
    {
      color: COLORS.accentSlate,
      count: '610',
      percentage: 25,
      label: 'Another App Platform',
    },
  ],
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.bodyRow}>
        {/* Modern Donut Ring */}
        <View style={styles.donutWrapper}>
          <View style={styles.donutRing}>
            {/* Emerald Slice */}
            <View style={[styles.arcSegment, styles.arcGreen]} />
            {/* Yellow Slice */}
            <View style={[styles.arcSegment, styles.arcYellow]} />
            {/* Grey Slice */}
            <View style={[styles.arcSegment, styles.arcGrey]} />

            {/* Inner Cutout */}
            <View style={styles.cutoutCircle} />
          </View>
        </View>

        {/* Legend List */}
        <View style={styles.legendContainer}>
          {items.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.colorDot, { backgroundColor: item.color }]} />
              <View style={styles.legendTextCol}>
                <Text style={styles.metricRow}>
                  <Text style={styles.metricBold}>{item.count} </Text>
                  <Text style={styles.metricPercent}>/ {item.percentage}%</Text>
                </Text>
                <Text style={styles.legendLabel} numberOfLines={1}>
                  {item.label}
                </Text>
              </View>
            </View>
          ))}
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
  title: {
    ...TYPOGRAPHY.bodySmallMedium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  bodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  donutWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  donutRing: {
    width: 90,
    height: 90,
    borderRadius: 45,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  arcSegment: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  arcGreen: {
    borderWidth: 12,
    borderColor: COLORS.primary,
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  arcYellow: {
    borderWidth: 12,
    borderColor: COLORS.accentYellow,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '-45deg' }],
  },
  arcGrey: {
    borderWidth: 12,
    borderColor: '#E2E8F0',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '135deg' }],
  },
  cutoutCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: COLORS.surface,
  },
  legendContainer: {
    flex: 1,
    gap: SPACING.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
    marginRight: SPACING.sm,
  },
  legendTextCol: {
    flex: 1,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricBold: {
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  metricPercent: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  legendLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    marginTop: 1,
  },
});
