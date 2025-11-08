import { Stack, useLocalSearchParams } from 'expo-router';

import TeamEditScreen from '@/src/screens/team/management/team_edit_screen';

export default function TeamEditRoute() {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TeamEditScreen teamId={teamId} />
    </>
  );
}
