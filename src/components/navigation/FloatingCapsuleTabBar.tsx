import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { COLORS, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export interface TabBarProps {
  state: {
    index: number;
    routes: Array<{ key: string; name: string; params?: object }>;
  };
  descriptors: Record<string, { options: { title?: string; tabBarAccessibilityLabel?: string } }>;
  navigation: {
    emit: (event: { type: string; target: string; canPreventDefault?: boolean }) => { defaultPrevented: boolean };
    navigate: (name: string, params?: object) => void;
  };
}

interface TabConfig {
  label: string;
  icon: keyof typeof Feather.glyphMap;
}

const TAB_CONFIG: Record<string, TabConfig> = {
  index: { label: 'Home', icon: 'home' },
  products: { label: 'Products', icon: 'package' },
  orders: { label: 'Orders', icon: 'shopping-bag' },
  analytics: { label: 'Analytics', icon: 'bar-chart-2' },
  profile: { label: 'Profile', icon: 'user' },
};

export const FloatingCapsuleTabBar: React.FC<any> = ({
  state,
  descriptors,
  navigation,
}: TabBarProps) => {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 12);

  return (
    <View
      style={[
        styles.outerContainer,
        { paddingBottom: bottomPadding },
      ]}
      pointerEvents="box-none"
    >
      <View style={styles.islandContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const config = TAB_CONFIG[route.name] || {
            label: (options.title || route.name) as string,
            icon: 'circle' as keyof typeof Feather.glyphMap,
          };

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel || config.label}
              onPress={onPress}
              onLongPress={onLongPress}
              activeOpacity={0.7}
              style={[
                styles.tabButton,
                isFocused ? styles.tabButtonActive : styles.tabButtonInactive,
              ]}
            >
              <Feather
                name={config.icon}
                size={19}
                color={isFocused ? '#FFFFFF' : '#0F172A'}
              />
              {isFocused && (
                <Text style={styles.activeLabel} numberOfLines={1}>
                  {config.label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingHorizontal: SPACING.base,
    backgroundColor: 'transparent',
  },
  islandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.full,
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    width: '100%',
    maxWidth: 420,
    ...SHADOWS.card,
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.full,
    paddingVertical: 9,
  },
  tabButtonActive: {
    backgroundColor: '#18181B', // Dark charcoal/black capsule as shown in reference design
    paddingHorizontal: 16,
    flexShrink: 0,
  },
  tabButtonInactive: {
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
  },
  activeLabel: {
    ...TYPOGRAPHY.badge,
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 6,
  },
});
