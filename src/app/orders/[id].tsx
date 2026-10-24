import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/FeedbackStates';
import { formatCurrency, formatDate } from '../../utils/analytics';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { OrderStatus } from '../../types';

const STATUS_OPTIONS: OrderStatus[] = [
  'Pending',
  'Confirmed',
  'Processing',
  'Completed',
  'Cancelled',
];

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const { orders, updateOrderStatus } = useApp();

  const order = orders.find((o) => o.id === id);

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
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
      default:
        return status;
    }
  };

  if (!order) {
    return (
      <View style={styles.notFoundContainer}>
        <EmptyState
          title={t('orders.orderNotFound')}
          description={t('orders.orderNotFoundDesc')}
          icon="alert-circle"
          actionTitle={t('orders.backToOrders')}
          onAction={() => router.back()}
        />
      </View>
    );
  }

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Header Card */}
      <Card variant="outlined" style={styles.headerCard}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.orderTitle}>
              {t('orders.orderNumber', { id: order.id })}
            </Text>
            <Text style={styles.dateText}>
              {t('orders.placedOn', { date: formatDate(order.createdAt) })}
            </Text>
          </View>
          <Badge label={getStatusLabel(order.status)} status={order.status} />
        </View>
      </Card>

      {/* Customer Info Card */}
      <Card variant="outlined" style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Feather name="user" size={16} color={COLORS.primary} style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>{t('orders.customerInfo')}</Text>
        </View>

        <View style={styles.customerRow}>
          <Text style={styles.customerLabel}>{t('orders.customerName')}</Text>
          <Text style={styles.customerValue}>{order.customerName}</Text>
        </View>

        <View style={styles.customerRow}>
          <Text style={styles.customerLabel}>{t('orders.customerEmail')}</Text>
          <Text style={styles.customerValue}>{order.customerEmail}</Text>
        </View>
      </Card>

      {/* Items Breakdown Card */}
      <Card variant="outlined" style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Feather name="shopping-bag" size={16} color={COLORS.primary} style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>
            {t('orders.purchasedItems', { count: order.items.length })}
          </Text>
        </View>

        {order.items.map((item, idx) => (
          <View key={`${item.productId}-${idx}`} style={styles.itemRow}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.productName}</Text>
              <Text style={styles.itemQuantity}>
                {item.quantity} × {formatCurrency(item.price)}
              </Text>
            </View>
            <Text style={styles.itemTotal}>
              {formatCurrency(item.quantity * item.price)}
            </Text>
          </View>
        ))}

        {/* Pricing Summary */}
        <View style={styles.priceDivider} />

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>{t('orders.subtotal')}</Text>
          <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>{t('orders.shippingTax')}</Text>
          <Text style={styles.summaryValue}>$0.00</Text>
        </View>

        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>{t('orders.totalAmount')}</Text>
          <Text style={styles.totalValue}>{formatCurrency(order.total)}</Text>
        </View>
      </Card>

      {/* Update Status Interactive Controls */}
      <Card variant="outlined" style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>{t('orders.updateStatus')}</Text>
        <Text style={styles.statusSubtitle}>
          {t('orders.updateStatusSubtitle')}
        </Text>

        <View style={styles.statusPickerRow}>
          {STATUS_OPTIONS.map((st) => {
            const isCurrent = order.status === st;
            return (
              <TouchableOpacity
                key={st}
                onPress={() => updateOrderStatus(order.id, st)}
                style={[
                  styles.statusOption,
                  isCurrent && styles.statusOptionActive,
                ]}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.statusOptionText,
                    isCurrent && styles.statusOptionTextActive,
                  ]}
                >
                  {getStatusLabel(st)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Card>

      <Button
        title={t('orders.backToOrders')}
        onPress={() => router.back()}
        variant="outline"
        size="lg"
        style={styles.backBtn}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.base,
    paddingBottom: SPACING.xxl,
    backgroundColor: COLORS.background,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  headerCard: {
    padding: SPACING.base,
    marginBottom: SPACING.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
  },
  dateText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  sectionCard: {
    padding: SPACING.base,
    marginBottom: SPACING.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionIcon: {
    marginRight: SPACING.xs + 2,
  },
  sectionTitle: {
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  customerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.xs + 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  customerLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  customerValue: {
    ...TYPOGRAPHY.bodySmallMedium,
    color: COLORS.textPrimary,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  itemInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  itemName: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  itemQuantity: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  itemTotal: {
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  priceDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  summaryLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    ...TYPOGRAPHY.bodySmallMedium,
    color: COLORS.textPrimary,
  },
  totalRow: {
    marginTop: SPACING.xs,
    paddingTop: SPACING.xs,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalLabel: {
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  totalValue: {
    ...TYPOGRAPHY.h2,
    color: COLORS.primary,
  },
  statusSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  statusPickerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  statusOption: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statusOptionActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  statusOptionText: {
    ...TYPOGRAPHY.captionMedium,
    color: COLORS.textSecondary,
  },
  statusOptionTextActive: {
    color: COLORS.surface,
  },
  backBtn: {
    marginTop: SPACING.xs,
  },
});
