import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/dashboard/Header';
import { KpiCard } from '../../components/ui/KpiCard';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { BarChart } from '../../components/analytics/BarChart';
import { ProductCard } from '../../components/products/ProductCard';
import { OrderCard } from '../../components/orders/OrderCard';
import {
  formatCurrency,
  getDashboardMetrics,
  getRevenueByPeriod,
  getTopProducts,
} from '../../utils/analytics';
import { COLORS, SPACING } from '../../constants/theme';

export default function DashboardScreen() {
  const router = useRouter();
  const { user, products, orders } = useApp();

  const metrics = getDashboardMetrics(orders);
  const revenueChartData = getRevenueByPeriod(orders, '7D');
  const topProducts = getTopProducts(products, 3);
  const recentOrders = orders.slice(0, 3);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Header
          user={user}
          onNotificationPress={() => {}}
          onAvatarPress={() => router.push('/(tabs)/profile')}
        />

        {/* Hero Revenue Card */}
        <View style={styles.section}>
          <KpiCard
            title="Total Revenue"
            value={formatCurrency(metrics.totalRevenue)}
            change={`+${metrics.revenueGrowth}%`}
            subtitle="vs last month"
            isPositive
            icon="dollar-sign"
            variant="primary"
          />
        </View>

        {/* 3 KPI Cards Grid */}
        <View style={styles.kpiGrid}>
          <View style={styles.kpiCol}>
            <KpiCard
              title="Orders"
              value={metrics.totalOrders.toString()}
              change={`+${metrics.ordersGrowth}%`}
              isPositive
              icon="shopping-bag"
            />
          </View>
          <View style={styles.kpiCol}>
            <KpiCard
              title="Customers"
              value={metrics.totalCustomers.toString()}
              change={`+${metrics.customersGrowth}%`}
              isPositive
              icon="users"
            />
          </View>
        </View>

        <View style={styles.section}>
          <KpiCard
            title="Average Order Value"
            value={formatCurrency(metrics.averageOrderValue)}
            subtitle="Per customer transaction"
            icon="trending-up"
          />
        </View>

        {/* Revenue 7D Chart */}
        <View style={styles.section}>
          <SectionHeader
            title="Revenue Overview"
            actionTitle="Analytics"
            onAction={() => router.push('/(tabs)/analytics')}
          />
          <BarChart data={revenueChartData} title="Last 7 Days Revenue" isCurrency />
        </View>

        {/* Top Products */}
        <View style={styles.section}>
          <SectionHeader
            title="Top Performing Products"
            actionTitle="See All"
            onAction={() => router.push('/(tabs)/products')}
          />
          {topProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onPress={() => router.push({ pathname: '/products/[id]', params: { id: prod.id } })}
            />
          ))}
        </View>

        {/* Recent Orders */}
        <View style={styles.section}>
          <SectionHeader
            title="Recent Orders"
            actionTitle="View All"
            onAction={() => router.push('/(tabs)/orders')}
          />
          {recentOrders.map((ord) => (
            <OrderCard
              key={ord.id}
              order={ord}
              onPress={() => router.push({ pathname: '/orders/[id]', params: { id: ord.id } })}
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
