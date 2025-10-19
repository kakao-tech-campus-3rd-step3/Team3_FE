import { router } from 'expo-router';
import React from 'react';

import { WelcomeScreen } from '@/src/screens/auth/register/welcome_screen';

export default function WelcomeRoute() {
  return <WelcomeScreen onSwitchToLogin={() => router.push('/(auth)/login')} />;
}
