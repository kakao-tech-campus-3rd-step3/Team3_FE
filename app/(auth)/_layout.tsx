import { Redirect, Stack } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

import { useAuth } from '@/src/contexts/auth_context';
import styles from '@/src/screens/auth/login/login_style';
import { theme } from '@/src/theme';

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
