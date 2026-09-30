import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from '../context/AppContext';
import { COLORS } from '../constants/theme';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="dark" />
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
          <Stack.Screen
            name="products/[id]"
            options={{
              title: 'Product Details',
              presentation: 'card',
            }}
          />
          <Stack.Screen
            name="products/create"
            options={{
              title: 'Add New Product',
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="products/edit/[id]"
            options={{
              title: 'Edit Product',
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="orders/[id]"
            options={{
              title: 'Order Details',
              presentation: 'card',
            }}
          />
        </Stack>
      </AppProvider>
    </SafeAreaProvider>
  );
}
