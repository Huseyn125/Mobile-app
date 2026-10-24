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
import { useTranslation } from 'react-i18next';
import { useApp } from '../../../context/AppContext';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { EmptyState } from '../../../components/ui/FeedbackStates';
import { COLORS, SPACING, TYPOGRAPHY } from '../../../constants/theme';

export default function EditProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation();
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
          title={t('products.productNotFound')}
          description={t('products.cannotEditNotFound')}
          icon="alert-circle"
          actionTitle={t('common.back')}
          onAction={() => router.back()}
        />
      </View>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!name.trim()) errs.name = t('validation.productNameRequired');
    if (!price.trim() || isNaN(Number(price)) || Number(price) <= 0) {
      errs.price = t('validation.validPositivePrice');
    }
    if (!category.trim()) errs.category = t('validation.categoryRequired');
    if (!stock.trim() || isNaN(Number(stock)) || Number(stock) < 0) {
      errs.stock = t('validation.validStock');
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
          <Text style={styles.title}>{t('products.editProductDetails')}</Text>

          <Input
            label={`${t('products.productName')} *`}
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
            }}
            error={errors.name}
            leftIcon="package"
          />

          <Input
            label={t('products.description')}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            style={styles.multilineInput}
          />

          <View style={styles.row}>
            <View style={styles.col}>
              <Input
                label={`${t('products.price')} *`}
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
                label={`${t('products.stock')} *`}
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
            label={`${t('products.category')} *`}
            value={category}
            onChangeText={(text) => {
              setCategory(text);
              if (errors.category) setErrors((prev) => ({ ...prev, category: '' }));
            }}
            error={errors.category}
            leftIcon="tag"
          />

          <Input
            label={t('products.imageUrl')}
            value={image}
            onChangeText={setImage}
            leftIcon="image"
          />

          <View style={styles.buttonRow}>
            <Button
              title={t('common.cancel')}
              onPress={() => router.back()}
              variant="outline"
              size="lg"
              style={styles.cancelBtn}
            />
            <Button
              title={t('common.saveChanges')}
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
    paddingBottom: 60,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  card: {
    padding: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  row: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  col: {
    flex: 1,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
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
