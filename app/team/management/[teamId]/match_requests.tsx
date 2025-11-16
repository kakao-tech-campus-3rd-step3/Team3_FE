import { Stack } from 'expo-router';

import MatchRequestsScreen from '@/src/screens/team/management/match_requests_screen';

export default function MatchRequestsRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <MatchRequestsScreen />
    </>
  );
}
