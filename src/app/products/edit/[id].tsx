import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useApp } from '../../../context/AppContext';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { EmptyState } from '../../../components/ui/FeedbackStates';
import { COLORS, SPACING, TYPOGRAPHY } from '../../../constants/theme';

export default function EditProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { products, updateProduct } = useApp();

  const product = products.find((p) => p.id === id);

  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product ? product.price.toString() : '');
  const [category, setCategory] = useState(product?.category || '');
  const [stock, setStock] = useState(product ? product.stock.toString() : '');
  const [image, setImage] = useState(product?.image || '');

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!product) {
    return (
      <View style={styles.notFoundContainer}>
        <EmptyState
          title="Product Not Found"
          description="Cannot edit a product that does not exist."
          icon="alert-circle"
          actionTitle="Back"
          onAction={() => router.back()}
        />
      </View>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!name.trim()) errs.name = 'Product name is required';
    if (!price.trim() || isNaN(Number(price)) || Number(price) <= 0) {
      errs.price = 'Enter a valid positive price';
    }
    if (!category.trim()) errs.category = 'Category is required';
    if (!stock.trim() || isNaN(Number(stock)) || Number(stock) < 0) {
      errs.stock = 'Enter a valid stock number';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      updateProduct(product.id, {
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price),
        category: category.trim(),
        stock: parseInt(stock, 10),
        image: image.trim() || undefined,
      });
      setLoading(false);
      router.back();
    }, 400);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboardView}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Card variant="outlined" style={styles.card}>
          <Text style={styles.title}>Edit Product Details</Text>

          <Input
            label="Product Name *"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
            }}
            error={errors.name}
            leftIcon="package"
          />

          <Input
            label="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            style={styles.multilineInput}
          />

          <View style={styles.row}>
            <View style={styles.col}>
              <Input
                label="Price ($) *"
                value={price}
                onChangeText={(text) => {
                  setPrice(text);
                  if (errors.price) setErrors((prev) => ({ ...prev, price: '' }));
                }}
                keyboardType="decimal-pad"
                error={errors.price}
                leftIcon="dollar-sign"
              />
            </View>
            <View style={styles.col}>
              <Input
                label="Stock Quantity *"
                value={stock}
                onChangeText={(text) => {
                  setStock(text);
                  if (errors.stock) setErrors((prev) => ({ ...prev, stock: '' }));
                }}
                keyboardType="number-pad"
                error={errors.stock}
                leftIcon="archive"
              />
            </View>
          </View>

          <Input
            label="Category *"
            value={category}
            onChangeText={(text) => {
              setCategory(text);
              if (errors.category) setErrors((prev) => ({ ...prev, category: '' }));
            }}
            error={errors.category}
            leftIcon="tag"
          />

          <Input
            label="Image URL"
            value={image}
            onChangeText={setImage}
            leftIcon="image"
          />

          <View style={styles.buttonRow}>
            <Button
              title="Cancel"
              onPress={() => router.back()}
              variant="outline"
              size="lg"
              style={styles.cancelBtn}
            />
            <Button
              title="Save Changes"
              onPress={handleSave}
              loading={loading}
              variant="primary"
              size="lg"
              style={styles.submitBtn}
            />
          </View>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.base,
    paddingBottom: SPACING.xxl,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  card: {
    padding: SPACING.base,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    marginBottom: SPACING.base,
  },
  multilineInput: {
    height: 70,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -SPACING.xs,
  },
  col: {
    flex: 1,
    paddingHorizontal: SPACING.xs,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  cancelBtn: {
    flex: 1,
  },
  submitBtn: {
    flex: 2,
  },
});
