import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
  leftIcon,
}) => {
  const isInteractive = !disabled && !loading;

  const getContainerStyle = (): StyleProp<ViewStyle> => {
    const list: ViewStyle[] = [styles.base];

    // Size
    if (size === 'sm') list.push(styles.sizeSm);
    else if (size === 'lg') list.push(styles.sizeLg);
    else list.push(styles.sizeMd);

    // Variant
    switch (variant) {
      case 'primary':
        list.push(styles.primary);
        break;
      case 'secondary':
        list.push(styles.secondary);
        break;
      case 'outline':
        list.push(styles.outline);
        break;
      case 'danger':
        list.push(styles.danger);
        break;
      case 'ghost':
        list.push(styles.ghost);
        break;
    }

    if (disabled) list.push(styles.disabled);

    return list;
  };

  const getTextStyle = (): StyleProp<TextStyle> => {
    const list: TextStyle[] = [styles.baseText];

    if (size === 'sm') list.push(styles.textSm);
    else if (size === 'lg') list.push(styles.textLg);

    switch (variant) {
      case 'primary':
      case 'danger':
        list.push(styles.textLight);
        break;
      case 'secondary':
        list.push(styles.textSecondary);
        break;
      case 'outline':
      case 'ghost':
        list.push(styles.textPrimaryColor);
        break;
    }

    if (disabled) list.push(styles.textDisabled);

    return list;
  };

  const loaderColor =
    variant === 'primary' || variant === 'danger'
      ? COLORS.surface
      : COLORS.primary;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ disabled: !isInteractive }}
      activeOpacity={0.75}
      disabled={!isInteractive}
      onPress={onPress}
      style={[getContainerStyle(), style]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={loaderColor} />
      ) : (
        <>
          {leftIcon ? <>{leftIcon}</> : null}
          <Text style={[getTextStyle(), leftIcon ? { marginLeft: SPACING.sm } : undefined, textStyle]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.md,
  },
  sizeSm: {
    paddingVertical: SPACING.xs + 2,
    paddingHorizontal: SPACING.md,
  },
  sizeMd: {
    paddingVertical: SPACING.md - 1,
    paddingHorizontal: SPACING.base,
    minHeight: 46,
  },
  sizeLg: {
    paddingVertical: SPACING.base - 2,
    paddingHorizontal: SPACING.xl,
    minHeight: 52,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.primaryLight,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  danger: {
    backgroundColor: COLORS.danger,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: COLORS.surfaceSubtle,
  },
  baseText: {
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '600',
    textAlign: 'center',
  },
  sizeSmText: {
    fontSize: 13,
  },
  sizeLgText: {
    fontSize: 16,
  },
  textLight: {
    color: COLORS.surface,
  },
  textSecondary: {
    color: COLORS.primaryDark,
  },
  textPrimaryColor: {
    color: COLORS.primary,
  },
  textDisabled: {
    color: COLORS.textMuted,
  },
  textSm: {
    fontSize: 13,
  },
  textLg: {
    fontSize: 16,
  },
});
