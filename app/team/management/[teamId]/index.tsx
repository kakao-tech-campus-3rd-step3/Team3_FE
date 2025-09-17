import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import TeamManagementScreen from '@/src/screens/team_management/team_management_screen';

export default function TeamManagementRoute() {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();

  const currentTeamId = teamId;

  if (!currentTeamId) {
    return <TeamManagementScreen teamId={null} />;
  }

  return <TeamManagementScreen teamId={currentTeamId} />;
}
