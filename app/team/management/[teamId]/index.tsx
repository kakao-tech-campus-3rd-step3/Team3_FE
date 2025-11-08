import { useLocalSearchParams } from 'expo-router';

import TeamManagementScreen from '@/src/screens/team/management/team_management_screen';

export default function TeamManagementRoute() {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();

  return <TeamManagementScreen teamId={teamId} />;
}
