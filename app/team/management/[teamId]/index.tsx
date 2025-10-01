import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import TeamManagementScreen from '@/src/screens/team/management/team_management_screen';

export default function TeamManagementRoute() {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();

  return <TeamManagementScreen teamId={teamId} />;
}
