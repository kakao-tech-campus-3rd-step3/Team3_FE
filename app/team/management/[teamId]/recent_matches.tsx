import { Stack, useLocalSearchParams } from 'expo-router';

import TeamRecentMatchesScreen from '@/src/components/team/cards/team_recent_matches_screen';

export default function RecentMatchesRoute() {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TeamRecentMatchesScreen teamId={teamId} />
    </>
  );
}
