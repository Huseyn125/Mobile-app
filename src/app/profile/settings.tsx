import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { changeLanguage, SUPPORTED_LANGUAGES, SupportedLanguage } from '../../i18n';

export default function SettingsScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const [pushNotifications, setPushNotifications] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [analyticsInterval, setAnalyticsInterval] = useState<'7D' | '30D' | '3M'>('30D');

  const currentLang = (i18n.language || 'ru') as SupportedLanguage;

  const handleLanguageChange = async (lang: SupportedLanguage) => {
    await changeLanguage(lang);
  };

  const handleExportData = () => {
    Alert.alert(
      t('settings.exportTitle'),
      t('settings.exportMessage'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('settings.generateCsv'),
          onPress: () => {
            Alert.alert(
              t('settings.exportCompletedTitle'),
              t('settings.exportCompletedMessage')
            );
          },
        },
      ]
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      t('settings.clearCacheTitle'),
      t('settings.clearCacheMessage'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('settings.clearCache'),
          style: 'destructive',
          onPress: () => {
            Alert.alert(t('settings.cacheClearedTitle'), t('settings.cacheClearedMessage'));
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Language Section */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>{t('settings.language')}</Text>
        <Card variant="outlined" style={styles.card}>
          <View style={styles.langHeader}>
            <Text style={styles.toggleTitle}>{t('settings.language')}</Text>
            <Text style={styles.toggleSubtitle}>{t('settings.languageSubtitle')}</Text>
          </View>
          <View style={styles.langRow}>
            {SUPPORTED_LANGUAGES.map((item) => {
              const active = currentLang.startsWith(item.code);
              return (
                <TouchableOpacity
                  key={item.code}
                  style={[styles.langBtn, active && styles.langBtnActive]}
                  onPress={() => handleLanguageChange(item.code)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.langFlag}>{item.flag}</Text>
                  <Text style={[styles.langText, active && styles.langTextActive]}>
                    {item.nativeName}
                  </Text>
                  {active && (
                    <Feather name="check" size={16} color={COLORS.surface} style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>
      </View>

      {/* Notifications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>{t('settings.notificationsAlerts')}</Text>
        <Card variant="outlined" style={styles.card}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleTitle}>{t('settings.pushNotifications')}</Text>
              <Text style={styles.toggleSubtitle}>{t('settings.pushNotificationsDesc')}</Text>
            </View>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: COLORS.surfaceSubtle, true: COLORS.primaryLight }}
              thumbColor={pushNotifications ? COLORS.primary : '#CBD5E1'}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleTitle}>{t('settings.orderAlerts')}</Text>
              <Text style={styles.toggleSubtitle}>{t('settings.orderAlertsDesc')}</Text>
            </View>
            <Switch
              value={orderAlerts}
              onValueChange={setOrderAlerts}
              trackColor={{ false: COLORS.surfaceSubtle, true: COLORS.primaryLight }}
              thumbColor={orderAlerts ? COLORS.primary : '#CBD5E1'}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleTitle}>{t('settings.lowStockWarning')}</Text>
              <Text style={styles.toggleSubtitle}>{t('settings.lowStockWarningDesc')}</Text>
            </View>
            <Switch
              value={lowStockAlerts}
              onValueChange={setLowStockAlerts}
              trackColor={{ false: COLORS.surfaceSubtle, true: COLORS.primaryLight }}
              thumbColor={lowStockAlerts ? COLORS.primary : '#CBD5E1'}
            />
          </View>
        </Card>
      </View>

      {/* Analytics Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>{t('settings.analyticsPreferences')}</Text>
        <Card variant="outlined" style={styles.card}>
          <View style={{ padding: SPACING.base }}>
            <Text style={styles.toggleTitle}>{t('settings.defaultReportingWindow')}</Text>
            <Text style={styles.toggleSubtitle}>{t('settings.defaultReportingWindowDesc')}</Text>
            <View style={styles.intervalRow}>
              {(['7D', '30D', '3M'] as const).map((int) => {
                const active = analyticsInterval === int;
                return (
                  <TouchableOpacity
                    key={int}
                    style={[styles.intervalBtn, active && styles.intervalBtnActive]}
                    onPress={() => setAnalyticsInterval(int)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.intervalBtnText, active && styles.intervalBtnTextActive]}>
                      {int}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </Card>
      </View>

      {/* Data & Storage Section */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>{t('settings.dataStorage')}</Text>
        <Card variant="outlined" style={styles.card}>
          <TouchableOpacity
            style={styles.actionRow}
            onPress={handleExportData}
            activeOpacity={0.7}
          >
            <View style={styles.actionLeft}>
              <View style={styles.actionIconBox}>
                <Feather name="download" size={18} color={COLORS.primary} />
              </View>
              <View>
                <Text style={styles.actionTitle}>{t('settings.exportMerchantData')}</Text>
                <Text style={styles.actionSubtitle}>{t('settings.exportMerchantDataDesc')}</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.actionRow}
            onPress={handleClearCache}
            activeOpacity={0.7}
          >
            <View style={styles.actionLeft}>
              <View style={[styles.actionIconBox, styles.dangerIconBox]}>
                <Feather name="trash-2" size={18} color={COLORS.danger} />
              </View>
              <View>
                <Text style={[styles.actionTitle, { color: COLORS.danger }]}>{t('settings.clearCache')}</Text>
                <Text style={styles.actionSubtitle}>{t('settings.clearCacheDesc')}</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
        </Card>
      </View>

      <Button
        title={t('common.done')}
        onPress={() => router.back()}
        variant="primary"
        size="lg"
        style={styles.doneBtn}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.base,
    paddingBottom: 60,
    backgroundColor: COLORS.background,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionLabel: {
    ...TYPOGRAPHY.captionMedium,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: SPACING.xs + 2,
    marginLeft: SPACING.xs,
  },
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  langHeader: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xs,
  },
  langRow: {
    padding: SPACING.base,
    gap: SPACING.xs,
  },
  langBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  langBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  langFlag: {
    fontSize: 20,
    marginRight: SPACING.sm,
  },
  langText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
    flex: 1,
  },
  langTextActive: {
    color: COLORS.surface,
    fontWeight: '600',
  },
  checkIcon: {
    marginLeft: SPACING.xs,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.base,
  },
  toggleInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  toggleTitle: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
  },
  toggleSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: SPACING.base,
  },
  intervalRow: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginTop: SPACING.sm,
  },
  intervalBtn: {
    flex: 1,
    paddingVertical: SPACING.xs + 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  intervalBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  intervalBtnText: {
    ...TYPOGRAPHY.bodySmallMedium,
    color: COLORS.textSecondary,
  },
  intervalBtnTextActive: {
    color: COLORS.surface,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.base,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    flex: 1,
  },
  actionIconBox: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerIconBox: {
    backgroundColor: '#FEE2E2',
  },
  actionTitle: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
  },
  actionSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  doneBtn: {
    marginTop: SPACING.sm,
  },
});
