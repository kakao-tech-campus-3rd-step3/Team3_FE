import { Stack, useLocalSearchParams } from 'expo-router';

import EditScreen from '@/src/screens/team/management/edit_screen';

export default function TeamEditRoute() {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <EditScreen teamId={teamId} />
    </>
  );
}
