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
  const { orders, updateOrderStatus } = useApp();

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <View style={styles.notFoundContainer}>
        <EmptyState
          title="Order Not Found"
          description="The order you requested could not be located."
          icon="alert-circle"
          actionTitle="Back to Orders"
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
            <Text style={styles.orderTitle}>Order #{order.id}</Text>
            <Text style={styles.dateText}>Placed on {formatDate(order.createdAt)}</Text>
          </View>
          <Badge label={order.status} status={order.status} />
        </View>
      </Card>

      {/* Customer Info Card */}
      <Card variant="outlined" style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Feather name="user" size={16} color={COLORS.primary} style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>Customer Information</Text>
        </View>

        <View style={styles.customerRow}>
          <Text style={styles.customerLabel}>Customer Name:</Text>
          <Text style={styles.customerValue}>{order.customerName}</Text>
        </View>

        <View style={styles.customerRow}>
          <Text style={styles.customerLabel}>Email Address:</Text>
          <Text style={styles.customerValue}>{order.customerEmail}</Text>
        </View>
      </Card>

      {/* Items Breakdown Card */}
      <Card variant="outlined" style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Feather name="shopping-bag" size={16} color={COLORS.primary} style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>Purchased Items ({order.items.length})</Text>
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
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping / Tax</Text>
          <Text style={styles.summaryValue}>$0.00</Text>
        </View>

        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>{formatCurrency(order.total)}</Text>
        </View>
      </Card>

      {/* Update Status Interactive Controls */}
      <Card variant="outlined" style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Update Order Status</Text>
        <Text style={styles.statusSubtitle}>
          Select status to update this order's processing phase:
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
                  {st}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Card>

      <Button
        title="Back to Orders"
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
    ...TYPOGRAPHY.h3,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  customerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.xs + 2,
  },
  customerLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  customerValue: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs + 2,
  },
  itemInfo: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  itemName: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
  },
  itemQuantity: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  itemTotal: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
  },
  priceDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  summaryLabel: {
    ...TYPOGRAPHY.body,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    ...TYPOGRAPHY.bodyMedium,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  totalRow: {
    marginTop: SPACING.xs,
    paddingTop: SPACING.xs,
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceSubtle,
  },
  totalLabel: {
    ...TYPOGRAPHY.h3,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  totalValue: {
    ...TYPOGRAPHY.h3,
    fontSize: 18,
    color: COLORS.primary,
  },
  statusSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    marginTop: 2,
  },
  statusPickerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs + 2,
  },
  statusOption: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  statusOptionActive: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  statusOptionText: {
    ...TYPOGRAPHY.captionMedium,
    color: COLORS.textSecondary,
  },
  statusOptionTextActive: {
    color: COLORS.primaryDark,
    fontWeight: '700',
  },
  backBtn: {
    marginTop: SPACING.xs,
  },
});
