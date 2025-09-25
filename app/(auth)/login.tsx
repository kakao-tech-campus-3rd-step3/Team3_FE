import { router } from 'expo-router';
import React from 'react';

import LoginScreen from '@/src/screens/auth/login/login_screen';

export default function LoginRoute() {
  return (
    <LoginScreen onSwitchToRegister={() => router.push('/(auth)/register')} />
  );
}
