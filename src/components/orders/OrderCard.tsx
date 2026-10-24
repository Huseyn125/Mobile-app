import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { Order, OrderStatus } from '../../types';
import { formatCurrency, formatDate } from '../../utils/analytics';

export interface OrderCardProps {
  order: Order;
  onPress?: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => {
  const { t } = useTranslation();
  const itemCount = order.items.reduce((acc, item) => acc + item.quantity, 0);

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

  return (
    <Card onPress={onPress} variant="outlined" style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderId}>#{order.id}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.customerName}>{order.customerName}</Text>
        </View>
        <Badge label={getStatusLabel(order.status)} status={order.status} />
      </View>

      <View style={styles.itemsSummary}>
        <Text style={styles.itemsText} numberOfLines={1}>
          {order.items.map((i) => `${i.productName} (${i.quantity})`).join(', ')}
        </Text>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.metaRow}>
          <Feather name="calendar" size={13} color={COLORS.textMuted} style={styles.metaIcon} />
          <Text style={styles.dateText}>{formatDate(order.createdAt)}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.itemCountText}>
            {t('common.items_many', { count: itemCount })}
          </Text>
        </View>

        <Text style={styles.total}>{formatCurrency(order.total)}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: SPACING.base,
    marginBottom: SPACING.sm + 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: SPACING.sm,
  },
  orderId: {
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  dot: {
    marginHorizontal: SPACING.xs,
    color: COLORS.textMuted,
  },
  customerName: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
    flexShrink: 1,
  },
  itemsSummary: {
    marginBottom: SPACING.sm,
  },
  itemsText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    marginRight: 4,
  },
  dateText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
  },
  itemCountText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
  },
  total: {
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});
