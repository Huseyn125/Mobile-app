import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { AppProvider } from '../context/AppContext';
import { COLORS } from '../constants/theme';
import { initI18n } from '../i18n';

function AppNavigation() {
  const { t } = useTranslation();

  useEffect(() => {
    initI18n();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.surface,
        },
        headerTintColor: COLORS.textPrimary,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 17,
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: COLORS.background,
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen
        name="products/[id]"
        options={{
          title: t('products.productDetails'),
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="products/create"
        options={{
          title: t('products.addNewProduct'),
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="products/edit/[id]"
        options={{
          title: t('products.editProduct'),
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="orders/[id]"
        options={{
          title: t('orders.orderDetails'),
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="profile/edit"
        options={{
          title: t('profile.editProfile'),
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="profile/business"
        options={{
          title: t('profile.businessInformation'),
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="profile/settings"
        options={{
          title: t('profile.settings'),
          presentation: 'card',
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="dark" />
        <AppNavigation />
      </AppProvider>
    </SafeAreaProvider>
  );
}
