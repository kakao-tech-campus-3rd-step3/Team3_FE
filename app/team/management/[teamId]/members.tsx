import { Stack, useLocalSearchParams } from 'expo-router';

import MemberManagementScreen from '@/src/screens/team/management/screens/team_member_screen';

export default function TeamMembers() {
  const { teamId } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <MemberManagementScreen teamId={teamId as string} />
    </>
  );
}
