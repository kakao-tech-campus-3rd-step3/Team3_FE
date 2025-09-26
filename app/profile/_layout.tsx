import { Stack } from 'expo-router';

import { theme } from '@/src/theme';

export default function ProfileLayout() {
  const screens = [
    { name: 'edit', title: '개인정보 수정' },
    { name: 'privacy-policy', title: '개인정보 처리방침' },
    { name: 'terms-of-service', title: '서비스 이용약관' },
    { name: 'support', title: '고객 지원' },
    { name: 'data-deletion', title: '계정 탈퇴' },
  ];

  return (
    <Stack>
      {screens.map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,
            headerShown: true,
            headerStyle: {
              backgroundColor: theme.colors.background.main,
            },
            headerTintColor: theme.colors.text.main,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      ))}
    </Stack>
  );
}
