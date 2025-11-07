import { Stack, useLocalSearchParams, Redirect } from 'expo-router';

import { ROUTES } from '@/src/constants/routes';

export default function TeamManagementLayout() {
  const { teamId } = useLocalSearchParams<{ teamId: string }>();

  if (!teamId) {
    return <Redirect href={ROUTES.TEAM_GUIDE} />;
  }

  const screens = [
    { name: 'index', title: '팀 관리' },
    { name: 'settings', title: '팀 설정' },
    { name: 'edit', title: '팀 정보 수정' },
    { name: 'members', title: '팀원 관리' },
    { name: 'recent_matches', title: '최근 경기' },
    { name: 'match_requests', title: '매치 요청' },
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
