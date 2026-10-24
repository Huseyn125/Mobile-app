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
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export default function EditProfileScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user, updateProfile } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || '');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = t('validation.fullNameRequired');
    if (!email.trim()) {
      errs.email = t('validation.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = t('validation.validEmail');
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      updateProfile({
        name: name.trim(),
        email: email.trim(),
        avatarUrl: avatarUrl.trim() || undefined,
      });
      setLoading(false);
      Alert.alert(t('profile.profileUpdatedTitle'), t('profile.profileUpdatedMessage'), [
        { text: t('common.ok'), onPress: () => router.back() },
      ]);
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
          <View style={styles.avatarPreviewSection}>
            <Avatar
              source={avatarUrl.trim() || undefined}
              name={name || 'User'}
              size={72}
            />
            <Text style={styles.avatarHint}>{t('profile.liveAvatarPreview')}</Text>
          </View>

          <Input
            label={`${t('auth.fullName')} *`}
            placeholder={t('auth.fullNamePlaceholder')}
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
            }}
            error={errors.name}
            leftIcon="user"
          />

          <Input
            label={`${t('auth.email')} *`}
            placeholder={t('auth.emailPlaceholder')}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            leftIcon="mail"
          />

          <Input
            label={t('profile.avatarUrlOptional')}
            placeholder="https://images.unsplash.com/..."
            value={avatarUrl}
            onChangeText={setAvatarUrl}
            helperText={t('profile.avatarUrlHelper')}
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
  avatarPreviewSection: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  avatarHint: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs + 2,
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
