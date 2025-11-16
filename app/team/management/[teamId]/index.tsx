import { useLocalSearchParams } from 'expo-router';

import ManagementScreen from '@/src/screens/team/management/management_screen';

export default function TeamManagementRoute() {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();

  return <ManagementScreen teamId={teamId} />;
}
