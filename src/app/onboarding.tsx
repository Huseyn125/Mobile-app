import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../constants/theme';

export default function OnboardingScreen() {
  const router = useRouter();

  const handleStart = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <View style={styles.brandRow}>
          <View style={styles.logoBadge}>
            <Feather name="shopping-bag" size={18} color="#FFFFFF" />
          </View>
          <Text style={styles.brandTitle}>Usaha</Text>
        </View>

        <TouchableOpacity
          style={styles.skipBtn}
          onPress={handleStart}
          activeOpacity={0.8}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Mock Phone Frame in Center */}
        <View style={styles.phoneFrame}>
          <View style={styles.phoneInner}>
            {/* Inner Phone Mini Top */}
            <View style={styles.miniHeader}>
              <View style={styles.miniBackCircle}>
                <Feather name="arrow-left" size={10} color="#18181B" />
              </View>
              <Text style={styles.miniTitle}>Insight</Text>
              <View style={styles.miniExport}>
                <Text style={styles.miniExportText}>Export</Text>
              </View>
            </View>

            {/* Mini Date Pill */}
            <View style={styles.miniDatePill}>
              <View style={styles.miniCalIcon} />
              <Text style={styles.miniDateText}>Jun 2026 - Nov 2026</Text>
            </View>

            {/* Mini Tabs */}
            <View style={styles.miniTabsRow}>
              <Text style={styles.miniTabInactive}>All</Text>
              <View style={styles.miniTabActive}>
                <Text style={styles.miniTabActiveText}>Messages</Text>
              </View>
              <Text style={styles.miniTabInactive}>Review</Text>
            </View>

            {/* Mini Hero */}
            <Text style={styles.miniHeroNum}>4.488</Text>
            <Text style={styles.miniHeroSub}>messages sent through profile</Text>

            {/* Mini Bars */}
            <View style={styles.miniBarsRow}>
              {[40, 70, 110, 140, 80, 130, 90].map((h, i) => (
                <View key={i} style={styles.miniBarCol}>
                  {i === 5 && (
                    <View style={styles.miniTooltip}>
                      <Text style={styles.miniTooltipText}>↑400</Text>
                    </View>
                  )}
                  <View
                    style={[
                      styles.miniBar,
                      { height: h * 0.45 },
                      i === 5 ? styles.miniBarActive : styles.miniBarNormal,
                    ]}
                  />
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Hero Title & Subtitle */}
        <View style={styles.textSection}>
          <Text style={styles.mainTitle}>Grow your business</Text>
          <Text style={styles.mainTitle}>with our App</Text>

          <Text style={styles.subtitle}>
            Get more customers and good insight with this app
          </Text>
        </View>

        {/* Dual Split Pill Button */}
        <TouchableOpacity
          style={styles.splitButton}
          onPress={handleStart}
          activeOpacity={0.9}
        >
          <View style={styles.splitLeft}>
            <Text style={styles.splitStepText}>Onboarding</Text>
            <Text style={styles.splitCountText}>5 / 5</Text>
          </View>
          <View style={styles.splitRight}>
            <Text style={styles.splitActionText}>Get Started</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xs,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    ...TYPOGRAPHY.h2,
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  skipBtn: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xl,
    alignItems: 'center',
  },
  phoneFrame: {
    width: 260,
    height: 330,
    backgroundColor: '#FFFFFF',
    borderRadius: 36,
    borderWidth: 8,
    borderColor: '#1E293B',
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
    padding: SPACING.sm,
    ...SHADOWS.elevated,
    overflow: 'hidden',
  },
  phoneInner: {
    flex: 1,
    backgroundColor: '#F8FAF9',
    borderRadius: 24,
    padding: SPACING.sm,
  },
  miniHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  miniBackCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#18181B',
  },
  miniExport: {
    backgroundColor: '#18181B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  miniExportText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '600',
  },
  miniDatePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.full,
    padding: 3,
    marginBottom: 8,
  },
  miniCalIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#18181B',
    marginRight: 4,
  },
  miniDateText: {
    fontSize: 8,
    color: '#64748B',
  },
  miniTabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  miniTabInactive: {
    fontSize: 9,
    color: '#94A3B8',
  },
  miniTabActive: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  miniTabActiveText: {
    fontSize: 9,
    color: COLORS.primary,
    fontWeight: '700',
  },
  miniHeroNum: {
    fontSize: 20,
    fontWeight: '800',
    color: '#18181B',
  },
  miniHeroSub: {
    fontSize: 8,
    color: '#64748B',
    marginBottom: 8,
  },
  miniBarsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 90,
  },
  miniBarCol: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  miniBar: {
    width: 10,
    borderRadius: 5,
  },
  miniBarNormal: {
    backgroundColor: '#C7EEDC',
  },
  miniBarActive: {
    backgroundColor: COLORS.primary,
  },
  miniTooltip: {
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    paddingHorizontal: 3,
    marginBottom: 2,
  },
  miniTooltipText: {
    color: '#FFFFFF',
    fontSize: 6,
    fontWeight: '700',
  },
  textSection: {
    width: '100%',
    marginBottom: SPACING.xl,
  },
  mainTitle: {
    ...TYPOGRAPHY.displayLg,
    color: COLORS.textPrimary,
    lineHeight: 38,
  },
  subtitle: {
    ...TYPOGRAPHY.bodyLg,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
  },
  splitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
    width: '100%',
    overflow: 'hidden',
    ...SHADOWS.lg,
  },
  splitLeft: {
    backgroundColor: COLORS.primaryDark,
    paddingVertical: 14,
    paddingHorizontal: SPACING.lg,
    borderTopLeftRadius: RADIUS.full,
    borderBottomLeftRadius: RADIUS.full,
  },
  splitStepText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
    fontWeight: '500',
  },
  splitCountText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  splitRight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingRight: SPACING.sm,
  },
  splitActionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
