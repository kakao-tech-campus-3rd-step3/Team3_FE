import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { useAuth } from '@/src/contexts/auth_context';
import { theme } from '@/src/theme';

export default function TabLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  console.log('🏠 TabLayout: 렌더링', { isAuthenticated, isLoading });

  // 로딩 중일 때는 아무것도 렌더링하지 않음
  if (isLoading) {
    console.log('⏳ TabLayout: 로딩 중');
    return null;
  }

  // 로그인되지 않은 상태라면 로그인 화면으로 리다이렉트
  if (!isAuthenticated) {
    console.log('❌ TabLayout: 인증 안됨, 로그인으로 리다이렉트');
    return <Redirect href="/(auth)/login" />;
  }

  console.log('✅ TabLayout: 인증됨, 탭 스택 렌더링');

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
            paddingTop: 8,
            paddingBottom: 8,
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
