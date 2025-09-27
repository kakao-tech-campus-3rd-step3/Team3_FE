import { Stack } from 'expo-router';

import { theme } from '@/src/theme';

export default function TeamLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.background.main,
        },
        headerTintColor: theme.colors.text.main,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="guide"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="creation"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="join-university"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="join-list"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="management/[teamId]"
        options={{
          headerShown: false, // 하위 레이아웃에서 처리
        }}
      />
    </Stack>
  );
}
