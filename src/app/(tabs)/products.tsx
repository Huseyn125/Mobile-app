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
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';
import { SearchBar } from '../../components/ui/SearchBar';
import { Button } from '../../components/ui/Button';
import { ProductCard } from '../../components/products/ProductCard';
import { EmptyState } from '../../components/ui/FeedbackStates';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export default function ProductsScreen() {
  const router = useRouter();
  const { products } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ['All', ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Top Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Products</Text>
          <Text style={styles.subtitle}>{products.length} items in inventory</Text>
        </View>

        <Button
          title="Add"
          leftIcon={<Feather name="plus" size={16} color={COLORS.surface} />}
          onPress={() => router.push('/products/create')}
          size="sm"
          variant="primary"
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search products by name or category..."
          onClear={() => setSearch('')}
        />
      </View>

      {/* Category Filter Pills */}
      <View style={styles.categoryWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryPill, isSelected && styles.categoryPillActive]}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.7}
              >
                <Text
                  style={[styles.categoryText, isSelected && styles.categoryTextActive]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Products List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => router.push({ pathname: '/products/[id]', params: { id: item.id } })}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title="No Products Found"
            description={
              search
                ? `No products match "${search}". Try adjusting your filters.`
                : 'Your inventory is empty. Add your first product to get started.'
            }
            icon="package"
            actionTitle="Add Product"
            onAction={() => router.push('/products/create')}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginTop: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  categoryWrapper: {
    marginBottom: SPACING.sm,
  },
  categoryScroll: {
    paddingHorizontal: SPACING.base,
  },
  categoryPill: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: SPACING.sm,
  },
  categoryPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryText: {
    ...TYPOGRAPHY.captionMedium,
    color: COLORS.textSecondary,
  },
  categoryTextActive: {
    color: COLORS.surface,
  },
  listContainer: {
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.xxl,
    flexGrow: 1,
  },
});
