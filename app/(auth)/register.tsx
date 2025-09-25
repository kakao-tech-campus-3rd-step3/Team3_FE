import { router } from 'expo-router';
import React from 'react';

import RegisterScreen from '@/src/screens/auth/register_screen';

export default function RegisterRoute() {
  return (
    <RegisterScreen onSwitchToLogin={() => router.push('/(auth)/login')} />
  );
}
