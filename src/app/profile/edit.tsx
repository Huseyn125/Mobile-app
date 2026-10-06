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
import { useApp } from '../../context/AppContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export default function EditProfileScreen() {
  const router = useRouter();
  const { user, updateProfile } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || '');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Enter a valid email address';
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
      Alert.alert('Profile Updated', 'Your profile details have been saved successfully.', [
        { text: 'OK', onPress: () => router.back() },
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
            <Text style={styles.avatarHint}>Live avatar preview</Text>
          </View>

          <Input
            label="Full Name *"
            placeholder="e.g. Huseyn Hasanzade"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
            }}
            error={errors.name}
            leftIcon="user"
          />

          <Input
            label="Email Address *"
            placeholder="owner@company.com"
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
            label="Avatar Image URL (Optional)"
            placeholder="https://images.unsplash.com/..."
            value={avatarUrl}
            onChangeText={setAvatarUrl}
            helperText="Enter a direct image link or leave empty for initials"
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
