import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { theme } from '@/src/theme';
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.grass[500],
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
            height: theme.spacing.spacing15,
            borderTopWidth: 1,
            borderTopColor: theme.colors.gray[400],
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '프로필',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
