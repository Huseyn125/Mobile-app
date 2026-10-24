import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { SearchBar } from '../../components/ui/SearchBar';
import { OrderCard } from '../../components/orders/OrderCard';
import { EmptyState } from '../../components/ui/FeedbackStates';
import { OrderStatus } from '../../types';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

const STATUS_FILTERS: Array<'All' | OrderStatus> = [
  'All',
  'Pending',
  'Confirmed',
  'Processing',
  'Completed',
  'Cancelled',
];

export default function OrdersScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { orders } = useApp();

  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'All' | OrderStatus>('All');

  const getStatusLabel = (status: 'All' | OrderStatus) => {
    switch (status) {
      case 'All':
        return t('orders.all');
      case 'Pending':
        return t('orders.statusPending');
      case 'Confirmed':
        return t('orders.statusConfirmed');
      case 'Processing':
        return t('orders.statusProcessing');
      case 'Completed':
        return t('orders.statusCompleted');
      case 'Cancelled':
        return t('orders.statusCancelled');
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      const query = search.toLowerCase();
      const matchesSearch =
        ord.id.toLowerCase().includes(query) ||
        ord.customerName.toLowerCase().includes(query) ||
        ord.customerEmail.toLowerCase().includes(query);
      const matchesStatus =
        selectedStatus === 'All' || ord.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [orders, search, selectedStatus]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{t('orders.title')}</Text>
        <Text style={styles.subtitle}>
          {t('orders.totalOrdersRecorded_many', { count: orders.length })}
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder={t('orders.searchPlaceholder')}
          onClear={() => setSearch('')}
        />
      </View>

      {/* Status Filter Horizontal Pills */}
      <View style={styles.filterWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {STATUS_FILTERS.map((status) => {
            const isSelected = selectedStatus === status;
            return (
              <TouchableOpacity
                key={status}
                style={[styles.statusPill, isSelected && styles.statusPillActive]}
                onPress={() => setSelectedStatus(status)}
                activeOpacity={0.7}
              >
                <Text
                  style={[styles.statusText, isSelected && styles.statusTextActive]}
                >
                  {getStatusLabel(status)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Orders List */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            onPress={() => router.push({ pathname: '/orders/[id]', params: { id: item.id } })}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title={t('orders.noOrdersFound')}
            description={
              search
                ? t('orders.noOrdersMatch', { query: search })
                : t('orders.noOrdersFilter')
            }
            icon="shopping-bag"
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.base,
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
  searchContainer: {
    paddingHorizontal: SPACING.base,
    marginBottom: SPACING.sm,
  },
  filterWrapper: {
    marginBottom: SPACING.sm,
  },
  filterScroll: {
    paddingHorizontal: SPACING.base,
    gap: SPACING.xs,
  },
  statusPill: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statusPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  statusText: {
    ...TYPOGRAPHY.bodySmallMedium,
    color: COLORS.textSecondary,
  },
  statusTextActive: {
    color: COLORS.surface,
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: SPACING.base,
    paddingBottom: 110,
    gap: SPACING.xs,
  },
});
