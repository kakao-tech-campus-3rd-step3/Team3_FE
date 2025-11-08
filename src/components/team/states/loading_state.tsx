import { memo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { styles } from '@/src/components/team/states/loading_state_styles';

interface LoadingStateProps {
  message?: string;
}

export default memo(function LoadingState({
  message = '팀 정보를 불러오는 중...',
}: LoadingStateProps) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#3B82F6" />
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
});
