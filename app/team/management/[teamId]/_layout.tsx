import { Stack, useLocalSearchParams } from 'expo-router';

export default function TeamManagementLayout() {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();

  const screens = [
    { name: 'index', title: '팀 관리' },
    { name: 'settings', title: '팀 설정' },
    { name: 'edit', title: '팀 정보 수정' },
    { name: 'members', title: '팀원 관리' },
    { name: 'recent-matches', title: '최근 경기' },
  ];

  return (
    <Stack>
      {screens.map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          options={{
            headerShown: false,
            title: screen.title,
          }}
          initialParams={{ teamId }}
        />
      ))}
    </Stack>
  );
}
