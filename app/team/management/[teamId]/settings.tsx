import { Stack, useLocalSearchParams } from 'expo-router';

import TeamSettingsScreen from '@/src/screens/team/management/team_settings_screen';

export default function TeamSettingsRoute() {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TeamSettingsScreen teamId={teamId} />
    </>
  );
}
