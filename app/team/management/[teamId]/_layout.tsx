import { Stack } from 'expo-router';

export default function TeamManagementLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: '팀 관리',
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: false,
          title: '팀 설정',
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          headerShown: false,
          title: '팀 정보 수정',
        }}
      />
      <Stack.Screen
        name="members"
        options={{
          headerShown: false,
          title: '팀원 관리',
        }}
      />
      <Stack.Screen
        name="recent-matches"
        options={{
          headerShown: false,
          title: '최근 경기',
        }}
      />
    </Stack>
  );
}
