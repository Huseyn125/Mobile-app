import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '../../context/AppContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export default function CreateProductScreen() {
  const router = useRouter();
  const { addProduct } = useApp();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleCreate = () => {
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      addProduct({
        name: name.trim(),
        description: description.trim() || 'No description provided.',
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
          <Text style={styles.title}>New Product Information</Text>

          <Input
            label="Product Name *"
            placeholder="e.g. Wireless Ergonomic Mouse"
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
            placeholder="Detailed description of features and specifications..."
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
                placeholder="29.99"
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
                placeholder="50"
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
            placeholder="e.g. Electronics, Accessories, Home"
            value={category}
            onChangeText={(text) => {
              setCategory(text);
              if (errors.category) setErrors((prev) => ({ ...prev, category: '' }));
            }}
            error={errors.category}
            leftIcon="tag"
          />

          <Input
            label="Image URL (Optional)"
            placeholder="https://images.unsplash.com/..."
            value={image}
            onChangeText={setImage}
            leftIcon="image"
            helperText="Leave empty to use default category placeholder"
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
              title="Create Product"
              onPress={handleCreate}
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
