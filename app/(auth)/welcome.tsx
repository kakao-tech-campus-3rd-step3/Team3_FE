import { router } from 'expo-router';

import { ROUTES } from '@/src/constants/routes';
import WelcomeScreen from '@/src/screens/auth/register/welcome_screen';

export default function WelcomeRoute() {
  return <WelcomeScreen onSwitchToLogin={() => router.push(ROUTES.LOGIN)} />;
}
