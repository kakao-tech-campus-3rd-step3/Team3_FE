import { router } from 'expo-router';

import { ROUTES } from '@/src/constants/routes';
import LoginScreen from '@/src/screens/auth/login/login_screen';

export default function LoginRoute() {
  return <LoginScreen onSwitchToRegister={() => router.push(ROUTES.WELCOME)} />;
}
