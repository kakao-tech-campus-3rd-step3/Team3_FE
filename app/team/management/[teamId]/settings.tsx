import { Stack, useLocalSearchParams } from 'expo-router';

import SettingsScreen from '@/src/screens/team/management/settings_screen';

export default function TeamSettingsRoute() {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SettingsScreen teamId={teamId} />
    </>
  );
}
