import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { UserProfile } from '../../types';

export interface HeaderProps {
  user: UserProfile;
  greeting?: string;
  onNotificationPress?: () => void;
  onAvatarPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  greeting,
  onNotificationPress,
  onAvatarPress,
}) => {
  const { t } = useTranslation();

  const currentHour = new Date().getHours();
  const defaultGreeting =
    currentHour < 12
      ? t('dashboard.greetingMorning')
      : currentHour < 18
      ? t('dashboard.greetingAfternoon')
      : t('dashboard.greetingEvening');

  const displayGreeting = greeting || defaultGreeting;

  return (
    <View style={styles.container}>
      <View style={styles.leftCol}>
        <TouchableOpacity
          onPress={onAvatarPress}
          activeOpacity={0.8}
          style={styles.avatarButton}
          accessibilityRole="button"
          accessibilityLabel={t('dashboard.openProfile')}
        >
          {user.avatarUrl ? (
            <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>{user.name.charAt(0)}</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.greeting} numberOfLines={1}>
            {displayGreeting}, {user.name.split(' ')[0]} 👋
          </Text>
          <Text style={styles.businessName} numberOfLines={1}>
            {user.businessName}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={onNotificationPress}
        style={styles.notificationButton}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={t('dashboard.notifications')}
      >
        <Feather name="bell" size={20} color={COLORS.textPrimary} />
        <View style={styles.notificationDot} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.background,
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarButton: {
    marginRight: SPACING.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: COLORS.primaryLight,
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primary,
  },
  textContainer: {
    flex: 1,
  },
  greeting: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  businessName: {
    ...TYPOGRAPHY.h3,
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginLeft: SPACING.md,
  },
  notificationDot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: COLORS.primary,
  },
});
