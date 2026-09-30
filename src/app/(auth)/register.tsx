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
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { useApp } from '../../context/AppContext';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export default function RegisterScreen() {
  const router = useRouter();
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

    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!businessName.trim()) errs.businessName = 'Business name is required';
    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Must be at least 6 characters';
    }
    if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
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
          <Text style={styles.backText}>Back to login</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Start monitoring your business analytics today.</Text>
        </View>

        <Card variant="outlined" style={styles.card}>
          <Input
            label="Full Name"
            placeholder="e.g. Huseyn Hasanzade"
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
              if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
            }}
            leftIcon="user"
            error={errors.fullName}
          />

          <Input
            label="Email Address"
            placeholder="owner@company.com"
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
            label="Business Name"
            placeholder="e.g. Nova Store"
            value={businessName}
            onChangeText={(text) => {
              setBusinessName(text);
              if (errors.businessName) setErrors((prev) => ({ ...prev, businessName: '' }));
            }}
            leftIcon="briefcase"
            error={errors.businessName}
          />

          <Input
            label="Business Category (Optional)"
            placeholder="e.g. Retail, Electronics, Cafe"
            value={category}
            onChangeText={setCategory}
            leftIcon="tag"
          />

          <Input
            label="Password"
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
            label="Confirm Password"
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
            title="Create Account"
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
    flexGrow: 1,
    padding: SPACING.xl,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  backText: {
    ...TYPOGRAPHY.captionMedium,
    color: COLORS.textPrimary,
    marginLeft: SPACING.xs,
  },
  header: {
    marginBottom: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.hero,
    fontSize: 26,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  card: {
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  registerBtn: {
    marginTop: SPACING.md,
  },
});
