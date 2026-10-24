import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/FeedbackStates';
import { formatCurrency, formatDate } from '../../utils/analytics';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const { products, deleteProduct } = useApp();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <View style={styles.notFoundContainer}>
        <EmptyState
          title={t('products.productNotFound')}
          description={t('products.productNotFoundDesc')}
          icon="alert-circle"
          actionTitle={t('products.backToProducts')}
          onAction={() => router.back()}
        />
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      t('products.deleteConfirmTitle'),
      t('products.deleteConfirmMessage', { name: product.name }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: () => {
            deleteProduct(product.id);
            router.back();
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
      {/* Product Image / Hero */}
      <View style={styles.imageContainer}>
        {product.image ? (
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Feather name="package" size={48} color={COLORS.primary} />
          </View>
        )}
      </View>

      <Card variant="outlined" style={styles.mainCard}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{product.category}</Text>
        </View>

        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{formatCurrency(product.price)}</Text>

        <Text style={styles.sectionHeading}>{t('products.description')}</Text>
        <Text style={styles.description}>{product.description}</Text>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>{t('products.availableStock')}</Text>
            <Text style={[styles.statValue, product.stock < 30 ? styles.stockLow : undefined]}>
              {t('products.stockUnits_many', { count: product.stock })}
            </Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>{t('products.totalSales')}</Text>
            <Text style={styles.statValue}>
              {t('products.salesCount_many', { count: product.totalSales })}
            </Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>{t('products.totalRevenue')}</Text>
            <Text style={styles.statValue}>{formatCurrency(product.totalRevenue)}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>{t('products.dateAdded')}</Text>
            <Text style={styles.statValue}>{formatDate(product.createdAt)}</Text>
          </View>
        </View>
      </Card>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <Button
          title={t('products.editProduct')}
          leftIcon={<Feather name="edit-2" size={16} color={COLORS.surface} />}
          onPress={() => router.push({ pathname: '/products/edit/[id]', params: { id: product.id } })}
          variant="primary"
          size="lg"
          style={styles.actionBtn}
        />

        <Button
          title={t('products.deleteProduct')}
          leftIcon={<Feather name="trash-2" size={16} color={COLORS.danger} />}
          onPress={handleDelete}
          variant="outline"
          size="lg"
          style={styles.deleteBtn}
          textStyle={{ color: COLORS.danger }}
        />
      </View>
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
  imageContainer: {
    height: 240,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: COLORS.surfaceSubtle,
    marginBottom: SPACING.base,
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
  mainCard: {
    padding: SPACING.xl,
    marginBottom: SPACING.base,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    marginBottom: SPACING.sm,
  },
  categoryText: {
    ...TYPOGRAPHY.captionMedium,
    color: COLORS.primary,
  },
  name: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  price: {
    ...TYPOGRAPHY.h2,
    color: COLORS.primary,
    marginBottom: SPACING.lg,
  },
  sectionHeading: {
    ...TYPOGRAPHY.captionMedium,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: SPACING.xs,
  },
  description: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: SPACING.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.surfaceSubtle,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  statValue: {
    ...TYPOGRAPHY.bodyMedium,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  stockLow: {
    color: COLORS.warning,
  },
  actionsContainer: {
    gap: SPACING.sm,
  },
  actionBtn: {
    marginBottom: SPACING.xs,
  },
  deleteBtn: {
    borderColor: '#FEE2E2',
    backgroundColor: '#FEF2F2',
  },
});
