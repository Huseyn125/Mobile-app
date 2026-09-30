import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';
import { KpiCard } from '../../components/ui/KpiCard';
import { BarChart } from '../../components/analytics/BarChart';
import { CategoryBreakdown } from '../../components/analytics/CategoryBreakdown';
import { ProductCard } from '../../components/products/ProductCard';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { AnalyticsPeriod } from '../../types';
import {
  formatCurrency,
  getCategorySales,
  getDashboardMetrics,
  getOrdersByPeriod,
  getRevenueByPeriod,
  getTopProducts,
} from '../../utils/analytics';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { useRouter } from 'expo-router';

const PERIODS: AnalyticsPeriod[] = ['7D', '30D', '3M', '1Y'];

export default function AnalyticsScreen() {
  const router = useRouter();
  const { products, orders } = useApp();
  const [period, setPeriod] = useState<AnalyticsPeriod>('7D');

  const metrics = getDashboardMetrics(orders);
  const revenueChartData = getRevenueByPeriod(orders, period);
  const ordersChartData = getOrdersByPeriod(orders, period);
  const categorySales = getCategorySales(products);
  const rankedProducts = getTopProducts(products, 5);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header & Period Selector */}
        <View style={styles.header}>
          <Text style={styles.title}>Analytics</Text>
          <Text style={styles.subtitle}>Performance overview & business insights</Text>
        </View>

        {/* Period Selector Segmented Control */}
        <View style={styles.segmentedContainer}>
          {PERIODS.map((p) => {
            const isSelected = period === p;
            return (
              <TouchableOpacity
                key={p}
                onPress={() => setPeriod(p)}
                style={[
                  styles.segmentButton,
                  isSelected && styles.segmentButtonActive,
                ]}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.segmentText,
                    isSelected && styles.segmentTextActive,
                  ]}
                >
                  {p}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Key Metrics Grid */}
        <View style={styles.kpiGrid}>
          <View style={styles.kpiCol}>
            <KpiCard
              title="Total Revenue"
              value={formatCurrency(metrics.totalRevenue)}
              change={`+${metrics.revenueGrowth}%`}
              isPositive
            />
          </View>
          <View style={styles.kpiCol}>
            <KpiCard
              title="Total Orders"
              value={metrics.totalOrders.toString()}
              change={`+${metrics.ordersGrowth}%`}
              isPositive
            />
          </View>
        </View>

        <View style={styles.kpiGrid}>
          <View style={styles.kpiCol}>
            <KpiCard
              title="Customers"
              value={metrics.totalCustomers.toString()}
              change={`+${metrics.customersGrowth}%`}
              isPositive
            />
          </View>
          <View style={styles.kpiCol}>
            <KpiCard
              title="Avg Order Value"
              value={formatCurrency(metrics.averageOrderValue)}
            />
          </View>
        </View>

        {/* Revenue Over Time Chart */}
        <View style={styles.section}>
          <BarChart
            data={revenueChartData}
            title={`Revenue (${period})`}
            isCurrency
          />
        </View>

        {/* Orders Over Time Chart */}
        <View style={styles.section}>
          <BarChart
            data={ordersChartData}
            title={`Orders Volume (${period})`}
            isCurrency={false}
          />
        </View>

        {/* Category Breakdown */}
        <View style={styles.section}>
          <CategoryBreakdown data={categorySales} />
        </View>

        {/* Top Performing Products Ranking */}
        <View style={styles.section}>
          <SectionHeader
            title="Ranked by Revenue"
            actionTitle="All Products"
            onAction={() => router.push('/(tabs)/products')}
          />
          {rankedProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onPress={() => router.push({ pathname: '/products/[id]', params: { id: prod.id } })}
            />
          ))}
        </View>
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
    paddingBottom: SPACING.xxl,
  },
  header: {
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textPrimary,
  },
  subtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surfaceSubtle,
    borderRadius: RADIUS.md,
    padding: 4,
    marginBottom: SPACING.base,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: SPACING.xs + 2,
    alignItems: 'center',
    borderRadius: RADIUS.sm,
  },
  segmentButtonActive: {
    backgroundColor: COLORS.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  segmentText: {
    ...TYPOGRAPHY.captionMedium,
    color: COLORS.textSecondary,
  },
  segmentTextActive: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  section: {
    marginBottom: SPACING.sm,
  },
  kpiGrid: {
    flexDirection: 'row',
    marginHorizontal: -SPACING.xs,
    marginBottom: SPACING.sm,
  },
  kpiCol: {
    flex: 1,
    paddingHorizontal: SPACING.xs,
  },
});
