import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, TouchableOpacity } from 'react-native';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../../constants/theme';

export interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  variant?: 'elevated' | 'outlined' | 'subtle';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'outlined',
}) => {
  const getContainerStyle = (): StyleProp<ViewStyle> => {
    const list: ViewStyle[] = [styles.base];

    if (variant === 'elevated') {
      list.push(styles.elevated);
    } else if (variant === 'subtle') {
      list.push(styles.subtle);
    } else {
      list.push(styles.outlined);
    }

    return list;
  };

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[getContainerStyle(), style]}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[getContainerStyle(), style]}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    borderRadius: RADIUS.lg,
    padding: SPACING.base,
    backgroundColor: COLORS.surface,
  },
  outlined: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  elevated: {
    ...SHADOWS.card,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.6)',
  },
  subtle: {
    backgroundColor: COLORS.surfaceSubtle,
  },
});
