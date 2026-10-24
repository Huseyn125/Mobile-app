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
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export default function BusinessInformationScreen() {
  const router = useRouter();
  const { t } = useTranslation();
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
    if (!businessName.trim()) errs.businessName = t('validation.businessNameRequired');
    if (!category.trim()) errs.category = t('validation.categoryRequired');
    if (!supportEmail.trim() || !/\S+@\S+\.\S+/.test(supportEmail)) {
      errs.supportEmail = t('validation.supportEmailRequired');
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
        t('profile.businessInfoSavedTitle'),
        t('profile.businessInfoSavedMessage'),
        [{ text: t('common.ok'), onPress: () => router.back() }]
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
            <Text style={styles.headerTitle}>{t('profile.merchantInfoTitle')}</Text>
            <Text style={styles.headerSubtitle}>
              {t('profile.merchantInfoSubtitle')}
            </Text>
          </View>

          <Input
            label={`${t('auth.businessName')} *`}
            placeholder={t('auth.businessNamePlaceholder')}
            value={businessName}
            onChangeText={(text) => {
              setBusinessName(text);
              if (errors.businessName) setErrors((prev) => ({ ...prev, businessName: '' }));
            }}
            error={errors.businessName}
            leftIcon="briefcase"
          />

          <Input
            label={`${t('auth.businessCategory')} *`}
            placeholder={t('auth.categoryPlaceholder')}
            value={category}
            onChangeText={(text) => {
              setCategory(text);
              if (errors.category) setErrors((prev) => ({ ...prev, category: '' }));
            }}
            error={errors.category}
            leftIcon="tag"
          />

          <Input
            label={t('profile.storeTaxId')}
            placeholder={t('profile.storeTaxIdPlaceholder')}
            value={storeTaxId}
            onChangeText={setStoreTaxId}
            leftIcon="file-text"
          />

          <Input
            label={t('profile.storeCurrency')}
            value={currency}
            editable={false}
            helperText={t('profile.storeCurrencyHelper')}
            leftIcon="dollar-sign"
          />

          <Input
            label={`${t('profile.customerSupportEmail')} *`}
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
    borderRadius: 28,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  headerTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textPrimary,
    marginBottom: 4,
    textAlign: 'center',
  },
  headerSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    textAlign: 'center',
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
