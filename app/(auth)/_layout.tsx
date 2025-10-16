import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useAuth } from '@/src/contexts/auth_context';

export default function AuthLayout() {
  const { token } = useAuth();
  const isAuthenticated = !!token;

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgot_password" />
    </Stack>
  );
}
