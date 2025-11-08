import { Stack, useLocalSearchParams } from 'expo-router';

import MemberManagementScreen from '@/src/screens/team/management/team_member_screen';

export default function TeamMembersRoute() {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <MemberManagementScreen teamId={teamId} />
    </>
  );
}
