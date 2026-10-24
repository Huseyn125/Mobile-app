import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export interface PerformanceBannerCardProps {
  sectionTitle?: string;
  value?: string;
  subtitle?: string;
  onHelpPress?: () => void;
  onPress?: () => void;
}

export const PerformanceBannerCard: React.FC<PerformanceBannerCardProps> = ({
  sectionTitle = 'Your chat performance',
  value = '100%',
  subtitle = 'Message response speed',
  onHelpPress,
  onPress,
}) => {
  return (
    <View style={styles.wrapper}>
      {/* Section Header with Help icon */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{sectionTitle}</Text>
        <TouchableOpacity
          onPress={onHelpPress}
          activeOpacity={0.7}
          style={styles.helpIconBox}
        >
          <Feather name="help-circle" size={16} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Solid Emerald Card */}
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <View style={styles.content}>
          <Text style={styles.valueText}>{value}</Text>
          <Text style={styles.subtitleText}>{subtitle}</Text>
        </View>

        {/* Decorative Chat Bubble Motif on right */}
        <View style={styles.decorArea}>
          <View style={styles.bubbleLarge}>
            <View style={styles.bubbleSmall} />
          </View>
          <Feather name="chevron-down" size={20} color="rgba(255,255,255,0.7)" style={styles.chevron} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs + 2,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
    fontWeight: '700',
    marginRight: 6,
  },
  helpIconBox: {
    padding: 2,
  },
  card: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
    ...SHADOWS.elevated,
  },
  content: {
    flex: 1,
    zIndex: 2,
  },
  valueText: {
    ...TYPOGRAPHY.heroNumber,
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitleText: {
    ...TYPOGRAPHY.bodySmall,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  decorArea: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  bubbleLarge: {
    width: 68,
    height: 52,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    position: 'relative',
    marginRight: SPACING.xs,
  },
  bubbleSmall: {
    position: 'absolute',
    bottom: -6,
    left: 12,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  chevron: {
    marginLeft: SPACING.xs,
  },
});
