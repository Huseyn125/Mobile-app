import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export default function ProfileScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user, logout } = useApp();

  const handleLogout = () => {
    Alert.alert(
      t('profile.logoutConfirmTitle'),
      t('profile.logoutConfirmMessage'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('profile.logout'),
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/(auth)/login');
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.headerTitle}>{t('profile.title')}</Text>

        {/* User Info Card */}
        <Card variant="outlined" style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            {user.avatarUrl ? (
              <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitial}>{user.name.charAt(0)}</Text>
              </View>
            )}
          </View>

          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>

          <View style={styles.badgeRow}>
            <View style={styles.storeBadge}>
              <Feather name="briefcase" size={12} color={COLORS.primary} />
              <Text style={styles.storeText}>{user.businessName}</Text>
            </View>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{user.category}</Text>
            </View>
          </View>
        </Card>

        {/* Account Menu */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionLabel}>{t('profile.account')}</Text>

          <Card variant="outlined" style={styles.menuCard}>
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => router.push('/profile/edit')}
            >
              <View style={styles.menuLeft}>
                <View style={styles.iconCircle}>
                  <Feather name="user" size={18} color={COLORS.textPrimary} />
                </View>
                <Text style={styles.menuText}>{t('profile.editProfile')}</Text>
              </View>
              <Feather name="chevron-right" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => router.push('/profile/business')}
            >
              <View style={styles.menuLeft}>
                <View style={styles.iconCircle}>
                  <Feather name="shield" size={18} color={COLORS.textPrimary} />
                </View>
                <Text style={styles.menuText}>{t('profile.businessInformation')}</Text>
              </View>
              <Feather name="chevron-right" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => router.push('/profile/settings')}
            >
              <View style={styles.menuLeft}>
                <View style={styles.iconCircle}>
                  <Feather name="settings" size={18} color={COLORS.textPrimary} />
                </View>
                <Text style={styles.menuText}>{t('profile.settings')}</Text>
              </View>
              <Feather name="chevron-right" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
          </Card>
        </View>

        {/* Logout Action */}
        <View style={styles.menuSection}>
          <Card variant="outlined" style={styles.menuCard}>
            <TouchableOpacity
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={handleLogout}
            >
              <View style={styles.menuLeft}>
                <View style={[styles.iconCircle, styles.logoutIconCircle]}>
                  <Feather name="log-out" size={18} color={COLORS.danger} />
                </View>
                <Text style={styles.logoutText}>{t('profile.logout')}</Text>
              </View>
              <Feather name="chevron-right" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
          </Card>
        </View>

        <Text style={styles.versionText}>{t('profile.versionText')}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SPACING.base,
    paddingBottom: 110,
  },
  headerTitle: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textPrimary,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.base,
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    marginBottom: SPACING.base,
  },
  avatarWrapper: {
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: COLORS.primaryLight,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    ...TYPOGRAPHY.h1,
    fontSize: 32,
    color: COLORS.primary,
  },
  name: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  email: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  storeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.surfaceSubtle,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  storeText: {
    ...TYPOGRAPHY.captionMedium,
    color: COLORS.textPrimary,
  },
  categoryBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  categoryText: {
    ...TYPOGRAPHY.captionMedium,
    color: COLORS.primary,
  },
  menuSection: {
    marginBottom: SPACING.base,
  },
  sectionLabel: {
    ...TYPOGRAPHY.captionMedium,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: SPACING.xs,
    marginLeft: SPACING.xs,
  },
  menuCard: {
    padding: 0,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.base,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIconCircle: {
    backgroundColor: '#FEE2E2',
  },
  menuText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
  },
  logoutText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.danger,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: 56,
  },
  versionText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
});
