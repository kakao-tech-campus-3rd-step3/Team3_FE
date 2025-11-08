import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from '@/src/components/team/states/empty_state_styles';
import { colors } from '@/src/theme';

interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  showRetryButton?: boolean;
  onRetry?: () => void;
}

export default memo(function EmptyState({
  icon,
  title,
  subtitle,
  description,
  showRetryButton = false,
  onRetry,
}: EmptyStateProps) {
  return (
    <View style={styles.stateContainer}>
      <Text style={styles.stateIcon}>{icon}</Text>
      <Text style={styles.stateTitle}>{title}</Text>
      <Text style={styles.stateSubtitle}>{subtitle}</Text>
      <Text style={styles.stateDescription}>{description}</Text>
      {showRetryButton && onRetry && (
        <TouchableOpacity
          style={[styles.actionButton, { marginTop: 20 }]}
          onPress={onRetry}
        >
          <Ionicons name="refresh" size={18} color={colors.white} />
          <Text style={styles.actionButtonText}>다시 시도</Text>
        </TouchableOpacity>
      )}
    </View>
  );
});
