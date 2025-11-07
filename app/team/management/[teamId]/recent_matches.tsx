import { useLocalSearchParams } from 'expo-router';

import TeamRecentMatchesScreen from '@/src/components/team/cards/team_recent_matches_screen';

export default function RecentMatchesPage() {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();

  return <TeamRecentMatchesScreen teamId={teamId} />;
}
