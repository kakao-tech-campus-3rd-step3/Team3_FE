import { Stack, useLocalSearchParams } from 'expo-router';

import MatchRequestsScreen from '@/src/screens/team/management/match_requests_screen';

export default function MatchRequestsRoute() {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <MatchRequestsScreen teamId={teamId} />
    </>
  );
}
