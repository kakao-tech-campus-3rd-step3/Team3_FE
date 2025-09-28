import { Stack } from 'expo-router';

import { theme } from '@/src/theme';

export default function TeamLayout() {
  const screensWithoutHeader = [
    'guide',
    'creation',
    'join-university',
    'join-list',
    'management/[teamId]',
  ];

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
      {screensWithoutHeader.map(screenName => (
        <Stack.Screen
          key={screenName}
          name={screenName}
          options={{
            headerShown: false,
            ...(screenName === 'management/[teamId]' && {}),
          }}
        />
      ))}
    </Stack>
  );
}
