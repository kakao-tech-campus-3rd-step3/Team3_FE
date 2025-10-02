import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import MatchApplicationScreen from '@/src/screens/match_application/match_application_screen';

export default function MatchApplicationRoute() {
  const { teamId } = useLocalSearchParams<{ teamId?: string }>();

  return (
    <MatchApplicationScreen teamId={teamId ? Number(teamId) : undefined} />
  );
}
