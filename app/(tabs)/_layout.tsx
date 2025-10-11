import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { useAuth } from '@/src/contexts/auth_context';
import { theme } from '@/src/theme';

export default function TabLayout() {
  const { token } = useAuth();
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.grass[300],
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: theme.colors.background.main,
            height: theme.spacing.spacing18,
            borderTopWidth: 1,
            borderTopColor: theme.colors.gray[300],
          },
          default: {
            backgroundColor: theme.colors.background.main,
            height: 100,
            borderTopWidth: 1,
            borderTopColor: theme.colors.gray[400],
            paddingTop: 4,
            paddingBottom: 16,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '프로필',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
