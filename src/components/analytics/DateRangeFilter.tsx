import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export interface DateRangeFilterProps {
  dateLabel?: string;
  onPress?: () => void;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  dateLabel = 'Jun 2026 - Nov 2026',
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.calendarCircle}>
        <Feather name="calendar" size={14} color="#FFFFFF" />
      </View>

      <Text style={styles.dateText}>{dateLabel}</Text>

      <View style={styles.divider} />

      <Feather name="chevron-down" size={16} color={COLORS.textSecondary} style={styles.chevron} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.full,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.subtle,
    marginBottom: SPACING.md,
  },
  calendarCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  dateText: {
    ...TYPOGRAPHY.bodySmallMedium,
    color: COLORS.textPrimary,
    flex: 1,
  },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.sm,
  },
  chevron: {
    marginRight: 4,
  },
});
