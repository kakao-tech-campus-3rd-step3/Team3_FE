import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import TeamCreationScreen from '@/src/screens/team/creation/team_creation_screen';

export default function TeamCreationRoute() {
  const { university } = useLocalSearchParams();

  return <TeamCreationScreen initialUniversity={university as string} />;
}
