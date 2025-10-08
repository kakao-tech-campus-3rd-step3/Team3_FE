import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import ErrorBoundary from 'react-native-error-boundary';
import 'react-native-reanimated';

import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';
import { AuthProvider, useAuth } from '@/src/contexts/auth_context';
import { queryClient } from '@/src/lib/query_client';

function AppContent() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const { isLoading } = useAuth();

  if (!loaded || isLoading) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="team" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="match_making/match_info" />
        <Stack.Screen name="match_application/index" />
        <Stack.Screen name="check_created_matches/index" />
        <Stack.Screen name="check_applied_matches/index" />
        <Stack.Screen name="match_set/index" />
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
          <AppContent />
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
