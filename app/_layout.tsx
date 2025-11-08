import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Suspense } from 'react';
import { ActivityIndicator, View } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import 'react-native-reanimated';

import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';
import { ROUTES } from '@/src/constants/routes';
import { AuthProvider, useAuth } from '@/src/contexts/auth_context';
import { queryClient } from '@/src/lib/query_client';
SplashScreen.preventAutoHideAsync();

function AppContent() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  let token: string | null = null;
  let isInitialized = false;

  try {
    const authData = useAuth();
    token = authData.token;
    isInitialized = authData.isInitialized;

    if (!isInitialized || !loaded) {
      return null;
    }

    SplashScreen.hideAsync();
  } catch (error) {
    router.replace(ROUTES.LOGIN);
    console.error('AppContent 에러:', error);
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {token ? (
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
            <Stack.Screen key="match_set" name="match_set/index" />,
            <Stack.Screen key="team_review" name="review/team_review" />,
            <Stack.Screen key="mercenary" name="mercenary" />,
            <Stack.Screen key="member_ready" name="member_ready/index" />,
            <Stack.Screen
              key="team_formation"
              name="match_making/team_formation"
            />,
            <Stack.Screen key="lineup" name="match_application/lineup" />,
            <Stack.Screen
              key="create_lineup"
              name="match_application/create_lineup"
            />,
          ]
        ) : (
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
