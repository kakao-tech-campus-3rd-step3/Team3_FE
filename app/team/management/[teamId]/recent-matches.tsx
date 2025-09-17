import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import TeamRecentMatchesScreen from '@/src/screens/team_management/components/TeamRecentMatchesScreen';

export default function RecentMatchesPage() {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();

  return <TeamRecentMatchesScreen teamId={teamId} />;
}
