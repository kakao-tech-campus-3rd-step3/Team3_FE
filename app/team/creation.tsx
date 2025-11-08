import { useLocalSearchParams } from 'expo-router';

import TeamCreationScreen from '@/src/screens/team/creation/team_creation_screen';

export default function TeamCreationRoute() {
  const { university } = useLocalSearchParams<{ university?: string }>();

  return <TeamCreationScreen initialUniversity={university} />;
}
