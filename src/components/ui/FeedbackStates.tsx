import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Button } from './Button';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: keyof typeof Feather.glyphMap;
  actionTitle?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = 'inbox',
  actionTitle,
  onAction,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Feather name={icon} size={32} color={COLORS.textMuted} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
      {actionTitle && onAction ? (
        <Button
          title={actionTitle}
          onPress={onAction}
          variant="outline"
          size="sm"
          style={styles.actionBtn}
        />
      ) : null}
    </View>
  );
};

export interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading data...',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
};

export interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Something went wrong. Please try again.',
  onRetry,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, styles.errorIconCircle]}>
        <Feather name="alert-triangle" size={32} color={COLORS.danger} />
      </View>
      <Text style={styles.title}>Error</Text>
      <Text style={styles.description}>{message}</Text>
      {onRetry ? (
        <Button
          title="Try Again"
          onPress={onRetry}
          variant="primary"
          size="sm"
          style={styles.actionBtn}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 220,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  errorIconCircle: {
    backgroundColor: COLORS.dangerLight,
  },
  title: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  description: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    textAlign: 'center',
    maxWidth: 260,
    lineHeight: 18,
  },
  actionBtn: {
    marginTop: SPACING.base,
  },
  loadingText: {
    ...TYPOGRAPHY.captionMedium,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
  },
});
