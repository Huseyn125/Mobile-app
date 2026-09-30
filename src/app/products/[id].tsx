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
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/FeedbackStates';
import { formatCurrency, formatDate } from '../../utils/analytics';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { products, deleteProduct } = useApp();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <View style={styles.notFoundContainer}>
        <EmptyState
          title="Product Not Found"
          description="The product you are looking for does not exist or has been removed."
          icon="alert-circle"
          actionTitle="Back to Products"
          onAction={() => router.back()}
        />
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Product',
      `Are you sure you want to delete "${product.name}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
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

        <Text style={styles.sectionHeading}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Available Stock</Text>
            <Text style={[styles.statValue, product.stock < 30 ? styles.stockLow : undefined]}>
              {product.stock} units
            </Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Sales</Text>
            <Text style={styles.statValue}>{product.totalSales} items</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Revenue</Text>
            <Text style={styles.statValue}>{formatCurrency(product.totalRevenue)}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Date Added</Text>
            <Text style={styles.statValue}>{formatDate(product.createdAt)}</Text>
          </View>
        </View>
      </Card>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <Button
          title="Edit Product"
          leftIcon={<Feather name="edit-2" size={16} color={COLORS.surface} />}
          onPress={() => router.push({ pathname: '/products/edit/[id]', params: { id: product.id } })}
          variant="primary"
          size="lg"
          style={styles.actionBtn}
        />

        <Button
          title="Delete Product"
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
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.sm + 2,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
    marginBottom: SPACING.sm,
  },
  categoryText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.primary,
  },
  name: {
    ...TYPOGRAPHY.hero,
    fontSize: 22,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  price: {
    ...TYPOGRAPHY.hero,
    fontSize: 24,
    color: COLORS.primary,
    marginBottom: SPACING.base,
  },
  sectionHeading: {
    ...TYPOGRAPHY.h3,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  description: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.base,
    lineHeight: 22,
  },
  statsGrid: {
    flexDirection: 'row',
    marginHorizontal: -SPACING.xs,
    marginBottom: SPACING.sm,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.surfaceSubtle,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginHorizontal: SPACING.xs,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
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
    borderColor: COLORS.danger,
    backgroundColor: COLORS.surface,
  },
});
