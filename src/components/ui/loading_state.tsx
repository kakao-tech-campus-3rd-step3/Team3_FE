import { View, ActivityIndicator, Text } from 'react-native';

import { theme } from '@/src/theme';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = '로딩 중...' }: LoadingStateProps) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={theme.colors.grass[500]} />
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
}

const styles = {
  loadingContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: theme.spacing.spacing10,
  },
  loadingText: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.gray[500],
    marginTop: theme.spacing.spacing2,
  },
};
