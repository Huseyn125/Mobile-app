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
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export default function SettingsScreen() {
  const router = useRouter();

  const [pushNotifications, setPushNotifications] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [analyticsInterval, setAnalyticsInterval] = useState<'7D' | '30D' | '3M'>('30D');

  const handleExportData = () => {
    Alert.alert(
      'Export Store Data',
      'Generate a comprehensive CSV export containing products, transactions, and performance metrics?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Generate CSV',
          onPress: () => {
            Alert.alert(
              'Export Completed',
              'Report "nova-store-analytics-2026.csv" has been queued for download.'
            );
          },
        },
      ]
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Local Cache',
      'Purge cached images, temporary tokens, and offline computation files?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear Cache',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Cache Cleared', 'Local client cache freed successfully.');
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
      {/* Notifications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Notifications & Alerts</Text>
        <Card variant="outlined" style={styles.card}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleTitle}>Push Notifications</Text>
              <Text style={styles.toggleSubtitle}>Receive daily digest and operational updates</Text>
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
              <Text style={styles.toggleTitle}>Realtime Order Alerts</Text>
              <Text style={styles.toggleSubtitle}>Notify instantly when a customer submits an order</Text>
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
              <Text style={styles.toggleTitle}>Low Stock Warning</Text>
              <Text style={styles.toggleSubtitle}>Alert when inventory drops below 30 units</Text>
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
        <Text style={styles.sectionLabel}>Analytics Preferences</Text>
        <Card variant="outlined" style={styles.card}>
          <Text style={styles.prefTitle}>Default Reporting Window</Text>
          <Text style={styles.prefSubtitle}>Initial time frame applied to Dashboard KPI cards</Text>

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
        </Card>
      </View>

      {/* Data & Storage Section */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Data & Storage</Text>
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
                <Text style={styles.actionTitle}>Export Merchant Data</Text>
                <Text style={styles.actionSubtitle}>Download CSV tables of orders and products</Text>
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
                <Text style={[styles.actionTitle, { color: COLORS.danger }]}>Clear Cache</Text>
                <Text style={styles.actionSubtitle}>Free temporary memory and image buffers</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
        </Card>
      </View>

      <Button
        title="Done"
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
  prefTitle: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
    paddingTop: SPACING.base,
    paddingHorizontal: SPACING.base,
  },
  prefSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    paddingHorizontal: SPACING.base,
    marginTop: 2,
    marginBottom: SPACING.md,
  },
  intervalRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.base,
  },
  intervalBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  intervalBtnActive: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  intervalBtnText: {
    ...TYPOGRAPHY.captionMedium,
    color: COLORS.textSecondary,
  },
  intervalBtnTextActive: {
    color: COLORS.primaryDark,
    fontWeight: '700',
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
    flex: 1,
  },
  actionIconBox: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  dangerIconBox: {
    backgroundColor: COLORS.dangerLight,
  },
  actionTitle: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
  },
  actionSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  doneBtn: {
    marginTop: SPACING.xs,
  },
});
