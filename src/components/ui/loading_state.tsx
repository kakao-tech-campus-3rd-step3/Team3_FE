import { memo } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

import { theme } from '@/src/theme';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = memo(function LoadingState({
  message = '로딩 중...',
}: LoadingStateProps) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={theme.colors.grass[500]} />
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.spacing10,
  },
  loadingText: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.gray[500],
    marginTop: theme.spacing.spacing2,
  },
});
