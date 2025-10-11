import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { Suspense } from 'react';
import { ActivityIndicator, View } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import 'react-native-reanimated';

import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';
import { AuthProvider, useAuth } from '@/src/contexts/auth_context';
import { queryClient } from '@/src/lib/query_client';

function AppContent() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const { token, isInitialized } = useAuth();

  if (!isInitialized || !loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {token ? (
          // 토큰이 있으면 인증된 사용자용 스크린들 렌더링
          [
            <Stack.Screen key="tabs" name="(tabs)" />,
            <Stack.Screen key="team" name="team" />,
            <Stack.Screen key="profile" name="profile" />,
            <Stack.Screen key="match_info" name="match_making/match_info" />,
            <Stack.Screen
              key="match_application"
              name="match_application/index"
            />,
            <Stack.Screen
              key="check_created"
              name="check_created_matches/index"
            />,
            <Stack.Screen
              key="check_applied"
              name="check_applied_matches/index"
            />,
          ]
        ) : (
          // 토큰이 없으면 인증 화면만 렌더링
          <Stack.Screen name="(auth)" />
        )}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Suspense
            fallback={
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#2D5016',
                }}
              >
                <ActivityIndicator size="large" color="white" />
              </View>
            }
          >
            <AppContent />
          </Suspense>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
