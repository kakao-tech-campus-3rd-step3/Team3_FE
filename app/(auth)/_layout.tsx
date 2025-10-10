import { Redirect, Stack } from 'expo-router';

import { useAuth } from '@/src/contexts/auth_context';

export default function AuthLayout() {
  const { token } = useAuth();
  const isAuthenticated = !!token;

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
