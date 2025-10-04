import { Redirect, Stack } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

import { useAuth } from '@/src/contexts/auth_context';
import styles from '@/src/screens/auth/login/login_style';
import { theme } from '@/src/theme';

export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  console.log('🔐 AuthLayout: 렌더링', { isAuthenticated, isLoading });

  if (isLoading) {
    console.log('⏳ AuthLayout: 로딩 중');
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.grass[500]} />
      </View>
    );
  }

  if (isAuthenticated) {
    console.log('✅ AuthLayout: 인증됨, 홈으로 리다이렉트');
    return <Redirect href="/(tabs)" />;
  }

  console.log('📝 AuthLayout: 인증 안됨, 인증 스택 렌더링');
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
