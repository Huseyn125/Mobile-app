import React from 'react';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { FloatingCapsuleTabBar } from '../../components/navigation/FloatingCapsuleTabBar';

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      tabBar={(props) => <FloatingCapsuleTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('navigation.dashboard'),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: t('navigation.products'),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: t('navigation.orders'),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: t('navigation.analytics'),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('navigation.profile'),
        }}
      />
    </Tabs>
  );
}

