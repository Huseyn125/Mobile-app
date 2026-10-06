import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS } from '../../constants/theme';

export interface AvatarProps {
  source?: string;
  name?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  borderColor?: string;
  onPress?: () => void;
  accessibilityLabel?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name = 'User',
  size = 40,
  style,
  textStyle,
  borderColor = COLORS.primaryLight,
  onPress,
  accessibilityLabel,
}) => {
  const borderRadius = Math.round(size / 2);
  const fontSize = Math.max(12, Math.round(size * 0.42));

  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || name.charAt(0).toUpperCase() || 'U';

  const containerStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius,
    borderWidth: 1.5,
    borderColor,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryLight,
  };

  const content = source ? (
    <Image
      source={{ uri: source }}
      style={{ width: '100%', height: '100%', borderRadius }}
      resizeMode="cover"
    />
  ) : (
    <Text
      style={[
        styles.initialText,
        { fontSize, color: COLORS.primary },
        textStyle,
      ]}
    >
      {initials}
    </Text>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || `Avatar for ${name}`}
        style={[containerStyle, style]}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={[containerStyle, style]}>{content}</View>;
};

const styles = StyleSheet.create({
  initialText: {
    fontWeight: '700',
    textAlign: 'center',
  },
});
