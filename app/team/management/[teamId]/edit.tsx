import { Stack, useLocalSearchParams } from 'expo-router';

import TeamEditScreen from '@/src/screens/team/management/screens/team_edit_screen';

export default function TeamEdit() {
  const { teamId } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TeamEditScreen teamId={teamId as string} />
    </>
  );
}
