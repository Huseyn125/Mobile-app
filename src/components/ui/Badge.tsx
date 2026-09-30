import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { OrderStatus } from '../../types';

export interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  status?: OrderStatus;
  style?: StyleProp<ViewStyle>;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  status,
  style,
}) => {
  let resolvedVariant = variant;

  if (status) {
    switch (status) {
      case 'Completed':
        resolvedVariant = 'success';
        break;
      case 'Processing':
        resolvedVariant = 'info';
        break;
      case 'Pending':
        resolvedVariant = 'warning';
        break;
      case 'Confirmed':
        resolvedVariant = 'info';
        break;
      case 'Cancelled':
        resolvedVariant = 'danger';
        break;
    }
  }

  const getColors = () => {
    switch (resolvedVariant) {
      case 'success':
        return { bg: COLORS.successLight, text: COLORS.success };
      case 'warning':
        return { bg: COLORS.warningLight, text: '#B45309' };
      case 'danger':
        return { bg: COLORS.dangerLight, text: COLORS.danger };
      case 'info':
        return { bg: COLORS.infoLight, text: COLORS.info };
      case 'neutral':
        return { bg: COLORS.surfaceSubtle, text: COLORS.textSecondary };
      default:
        return { bg: COLORS.primaryLight, text: COLORS.primary };
    }
  };

  const { bg, text } = getColors();

  return (
    <View style={[styles.badge, { backgroundColor: bg }, style]}>
      <Text style={[styles.text, { color: text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...TYPOGRAPHY.badge,
    fontSize: 12,
  },
});
