import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export interface InsightTopBarProps {
  title?: string;
  onBackPress?: () => void;
  onExportPress?: () => void;
  exportTitle?: string;
  showBack?: boolean;
}

export const InsightTopBar: React.FC<InsightTopBarProps> = ({
  title = 'Insight',
  onBackPress,
  onExportPress,
  exportTitle = 'Export',
  showBack = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftCol}>
        {showBack ? (
          <TouchableOpacity
            style={styles.circleBtn}
            onPress={onBackPress}
            activeOpacity={0.7}
          >
            <Feather name="arrow-left" size={18} color={COLORS.textPrimary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.brandBadge}>
            <Feather name="bar-chart-2" size={18} color={COLORS.primary} />
          </View>
        )}
      </View>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity
        style={styles.exportPill}
        onPress={onExportPress}
        activeOpacity={0.8}
      >
        <Text style={styles.exportText}>{exportTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm + 2,
    marginBottom: SPACING.xs,
  },
  leftCol: {
    width: 68,
    alignItems: 'flex-start',
  },
  circleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...TYPOGRAPHY.h2,
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  exportPill: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exportText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});
