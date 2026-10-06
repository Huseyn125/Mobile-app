import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export default function BusinessInformationScreen() {
  const router = useRouter();
  const { user, updateProfile } = useApp();

  const [businessName, setBusinessName] = useState(user.businessName);
  const [category, setCategory] = useState(user.category);
  const [currency] = useState('USD ($)');
  const [storeTaxId, setStoreTaxId] = useState('TX-89210-NV');
  const [supportEmail, setSupportEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!businessName.trim()) errs.businessName = 'Business name is required';
    if (!category.trim()) errs.category = 'Category is required';
    if (!supportEmail.trim() || !/\S+@\S+\.\S+/.test(supportEmail)) {
      errs.supportEmail = 'Valid support email is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      updateProfile({
        businessName: businessName.trim(),
        category: category.trim(),
      });
      setLoading(false);
      Alert.alert(
        'Business Info Saved',
        'Your commercial business information has been successfully updated.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
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
          <View style={styles.headerBox}>
            <View style={styles.iconCircle}>
              <Feather name="briefcase" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.headerTitle}>Merchant Information</Text>
            <Text style={styles.headerSubtitle}>
              Configure your store credentials and official business details
            </Text>
          </View>

          <Input
            label="Business Name *"
            placeholder="e.g. Nova Store"
            value={businessName}
            onChangeText={(text) => {
              setBusinessName(text);
              if (errors.businessName) setErrors((prev) => ({ ...prev, businessName: '' }));
            }}
            error={errors.businessName}
            leftIcon="briefcase"
          />

          <Input
            label="Business Category *"
            placeholder="e.g. Retail & Electronics"
            value={category}
            onChangeText={(text) => {
              setCategory(text);
              if (errors.category) setErrors((prev) => ({ ...prev, category: '' }));
            }}
            error={errors.category}
            leftIcon="tag"
          />

          <Input
            label="Store Tax / Registration ID"
            placeholder="e.g. TX-12345"
            value={storeTaxId}
            onChangeText={setStoreTaxId}
            leftIcon="file-text"
          />

          <Input
            label="Store Currency"
            value={currency}
            editable={false}
            helperText="Default operational currency for catalog and orders"
            leftIcon="dollar-sign"
          />

          <Input
            label="Customer Support Email *"
            placeholder="support@company.com"
            value={supportEmail}
            onChangeText={(text) => {
              setSupportEmail(text);
              if (errors.supportEmail) setErrors((prev) => ({ ...prev, supportEmail: '' }));
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.supportEmail}
            leftIcon="mail"
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
              title="Save Details"
              onPress={handleSave}
              loading={loading}
              variant="primary"
              size="lg"
              style={styles.saveBtn}
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
  card: {
    padding: SPACING.xl,
  },
  headerBox: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  headerTitle: {
    ...TYPOGRAPHY.h2,
    fontSize: 20,
    color: COLORS.textPrimary,
  },
  headerSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 2,
    maxWidth: 260,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  cancelBtn: {
    flex: 1,
  },
  saveBtn: {
    flex: 2,
  },
});
