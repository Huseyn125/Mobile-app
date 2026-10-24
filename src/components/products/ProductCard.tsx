import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Card } from '../ui/Card';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/analytics';

export interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  variant?: 'list' | 'compact';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  variant = 'list',
}) => {
  const { t } = useTranslation();
  const isCompact = variant === 'compact';

  return (
    <Card onPress={onPress} variant="outlined" style={[styles.card, isCompact && styles.cardCompact]}>
      <View style={styles.imageContainer}>
        {product.image ? (
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>{product.name.charAt(0)}</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>
            {product.name}
          </Text>
          <Text style={styles.price}>{formatCurrency(product.price)}</Text>
        </View>

        <Text style={styles.category}>{product.category}</Text>

        <View style={styles.footerRow}>
          <Text style={[styles.stock, product.stock < 30 ? styles.stockLow : undefined]}>
            {t('products.stockSummary', { stock: product.stock })}
          </Text>
          <Text style={styles.sales}>
            {t('products.salesSummary', {
              sales: product.totalSales,
              revenue: formatCurrency(product.totalRevenue),
            })}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    marginBottom: SPACING.sm + 2,
  },
  cardCompact: {
    padding: SPACING.sm + 2,
  },
  imageContainer: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    backgroundColor: COLORS.surfaceSubtle,
    marginRight: SPACING.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primary,
  },
  content: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  name: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: SPACING.sm,
  },
  price: {
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  category: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stock: {
    ...TYPOGRAPHY.captionMedium,
    color: COLORS.textSecondary,
  },
  stockLow: {
    color: COLORS.warning,
  },
  sales: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
  },
});
