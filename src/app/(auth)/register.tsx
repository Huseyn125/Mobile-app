import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { useApp } from '../../context/AppContext';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export default function RegisterScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { login } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) errs.fullName = t('validation.fullNameRequired');
    if (!email.trim()) {
      errs.email = t('validation.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = t('validation.validEmail');
    }
    if (!businessName.trim()) errs.businessName = t('validation.businessNameRequired');
    if (!password) {
      errs.password = t('validation.passwordRequired');
    } else if (password.length < 6) {
      errs.password = t('validation.passwordMinLength');
    }
    if (password !== confirmPassword) {
      errs.confirmPassword = t('validation.passwordsDoNotMatch');
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleRegister = () => {
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(email);
      router.replace('/(tabs)');
    }, 600);
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
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={20} color={COLORS.textPrimary} />
          <Text style={styles.backText}>{t('auth.backToLogin')}</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>{t('auth.registerTitle')}</Text>
          <Text style={styles.subtitle}>{t('auth.registerSubtitle')}</Text>
        </View>

        <Card variant="outlined" style={styles.card}>
          <Input
            label={t('auth.fullName')}
            placeholder={t('auth.fullNamePlaceholder')}
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
              if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
            }}
            leftIcon="user"
            error={errors.fullName}
          />

          <Input
            label={t('auth.email')}
            placeholder={t('auth.emailPlaceholder')}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon="mail"
            error={errors.email}
          />

          <Input
            label={t('auth.businessName')}
            placeholder={t('auth.businessNamePlaceholder')}
            value={businessName}
            onChangeText={(text) => {
              setBusinessName(text);
              if (errors.businessName) setErrors((prev) => ({ ...prev, businessName: '' }));
            }}
            leftIcon="briefcase"
            error={errors.businessName}
          />

          <Input
            label={t('auth.businessCategoryOptional')}
            placeholder={t('auth.categoryPlaceholder')}
            value={category}
            onChangeText={setCategory}
            leftIcon="tag"
          />

          <Input
            label={t('auth.password')}
            placeholder="••••••••"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
            }}
            isPassword
            leftIcon="lock"
            error={errors.password}
          />

          <Input
            label={t('auth.confirmPassword')}
            placeholder="••••••••"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
            }}
            isPassword
            leftIcon="shield"
            error={errors.confirmPassword}
          />

          <Button
            title={t('auth.registerButton')}
            onPress={handleRegister}
            loading={loading}
            variant="primary"
            size="lg"
            style={styles.registerBtn}
          />
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
    paddingVertical: SPACING.xl,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.lg,
  },
  backText: {
    ...TYPOGRAPHY.bodySmallMedium,
    color: COLORS.textPrimary,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  card: {
    padding: SPACING.xl,
  },
  registerBtn: {
    marginTop: SPACING.md,
  },
});
