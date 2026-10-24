import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { DateRangeFilter } from '../../components/analytics/DateRangeFilter';
import { InsightSegmentedTabs } from '../../components/analytics/InsightSegmentedTabs';
import { InsightBarChart } from '../../components/analytics/InsightBarChart';
import { PerformanceBannerCard } from '../../components/analytics/PerformanceBannerCard';
import { PlatformDonutCard } from '../../components/analytics/PlatformDonutCard';
import { ProductCard } from '../../components/products/ProductCard';
import { OrderCard } from '../../components/orders/OrderCard';
import { Avatar } from '../../components/ui/Avatar';
import {
  formatCurrency,
  getDashboardMetrics,
  getRevenueByPeriod,
  getTopProducts,
} from '../../utils/analytics';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export default function DashboardScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user, products, orders } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'revenue' | 'orders'>('revenue');
  const [dateRange, setDateRange] = useState('Jun 2026 - Nov 2026');

  const metrics = getDashboardMetrics(orders);
  const revenueChartData = getRevenueByPeriod(orders, '7D');
  const topProducts = getTopProducts(products, 3);
  const recentOrders = orders.slice(0, 3);

  const tabs = [
    { key: 'all', label: t('common.all') || 'All' },
    { key: 'revenue', label: t('dashboard.totalRevenue') || 'Revenue' },
    { key: 'orders', label: t('dashboard.orders') || 'Orders' },
  ];

  const handleExport = () => {
    Alert.alert(
      t('settings.exportTitle') || 'Export Data',
      t('settings.exportCompletedMessage') || 'Report has been queued for download.'
    );
  };

  // Convert revenue chart data to insight chart format
  const chartPoints = revenueChartData.map((pt, idx) => ({
    label: pt.label,
    value: Math.round(pt.value),
  }));

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Top Header matching mockup */}
      <View style={styles.topHeader}>
        <View style={styles.brandRow}>
          <View style={styles.logoBadge}>
            <Feather name="shopping-bag" size={18} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.brandName}>Usaha</Text>
            <Text style={styles.merchantSubtitle}>{user.businessName}</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.exportBtn}
            onPress={handleExport}
            activeOpacity={0.8}
          >
            <Text style={styles.exportBtnText}>Export</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(tabs)/profile')}
            style={styles.avatarBtn}
            activeOpacity={0.8}
          >
            <Avatar
              source={user.avatarUrl}
              name={user.name}
              size={36}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Date Filter Pill */}
        <DateRangeFilter
          dateLabel={dateRange}
          onPress={() =>
            Alert.alert(
              'Период отчетов',
              'Выберите диапазон дат:',
              [
                { text: 'Jun 2026 - Nov 2026', onPress: () => setDateRange('Jun 2026 - Nov 2026') },
                { text: 'Jan 2026 - May 2026', onPress: () => setDateRange('Jan 2026 - May 2026') },
                { text: t('common.cancel') || 'Cancel', style: 'cancel' },
              ]
            )
          }
        />

        {/* Segmented Tabs: All | Revenue | Orders */}
        <InsightSegmentedTabs
          tabs={tabs}
          activeKey={activeTab}
          onSelectTab={(key) => setActiveTab(key as any)}
        />

        {/* Hero Insight Metric + Bar Chart */}
        <InsightBarChart
          heroValue={formatCurrency(metrics.totalRevenue)}
          heroSubtitle={`+${metrics.revenueGrowth}% ${t('dashboard.vsLastMonth')}`}
          data={chartPoints.length > 0 ? chartPoints : [
            { label: '01', value: 80 },
            { label: '02', value: 160 },
            { label: '03', value: 340 },
            { label: '04', value: 480 },
            { label: '05', value: 240 },
            { label: '06', value: 400 },
            { label: '07', value: 210 },
          ]}
          highlightIndex={chartPoints.length > 2 ? chartPoints.length - 2 : 5}
          highlightTooltipText={`↑ +${metrics.revenueGrowth}%`}
        />

        {/* Emerald Performance Banner Card */}
        <PerformanceBannerCard
          sectionTitle="Your chat performance"
          value="100%"
          subtitle="Message response speed"
          onHelpPress={() =>
            Alert.alert(
              'Performance Score',
              'Скорость обработки входящих запросов клиентов составляет 100% за последний отчетный период.'
            )
          }
          onPress={() => router.push('/(tabs)/analytics')}
        />

        {/* Platform / Categories Donut Breakdown */}
        <PlatformDonutCard
          title="The platform the user is using"
          items={[
            {
              color: COLORS.primary,
              count: `${metrics.totalOrders}`,
              percentage: 50,
              label: 'Using Business App',
            },
            {
              color: COLORS.accentYellow,
              count: `${metrics.totalCustomers}`,
              percentage: 35,
              label: 'Using Messenger App',
            },
            {
              color: '#CBD5E1',
              count: '24',
              percentage: 15,
              label: 'Another App Platform',
            },
          ]}
        />

        {/* Top Performing Products Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeading}>{t('dashboard.topPerformingProducts')}</Text>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/products')}
            activeOpacity={0.7}
          >
            <Text style={styles.seeAllText}>{t('common.seeAll')}</Text>
          </TouchableOpacity>
        </View>

        {topProducts.map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
            onPress={() => router.push({ pathname: '/products/[id]', params: { id: prod.id } })}
          />
        ))}

        {/* Recent Orders Section */}
        <View style={[styles.sectionHeader, { marginTop: SPACING.md }]}>
          <Text style={styles.sectionHeading}>{t('dashboard.recentOrders')}</Text>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/orders')}
            activeOpacity={0.7}
          >
            <Text style={styles.seeAllText}>{t('common.viewAll')}</Text>
          </TouchableOpacity>
        </View>

        {recentOrders.map((ord) => (
          <OrderCard
            key={ord.id}
            order={ord}
            onPress={() => router.push({ pathname: '/orders/[id]', params: { id: ord.id } })}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    ...TYPOGRAPHY.h2,
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  merchantSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  exportBtn: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
  },
  exportBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  avatarBtn: {
    marginLeft: 2,
  },
  scrollContent: {
    paddingHorizontal: SPACING.base,
    paddingBottom: 110,
    paddingTop: SPACING.xs,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
    marginTop: SPACING.xs,
    paddingHorizontal: 2,
  },
  sectionHeading: {
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  seeAllText: {
    ...TYPOGRAPHY.captionMedium,
    color: COLORS.primary,
    fontWeight: '600',
  },
});
