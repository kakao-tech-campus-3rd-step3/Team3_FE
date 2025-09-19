import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import TeamRecentMatchesScreen from '@/src/screens/team/management/components/cards/team_recent_matches_screen';

export default function RecentMatchesPage() {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();

  return <TeamRecentMatchesScreen teamId={teamId} />;
}
