import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from '../../styles/team_edit_styles';

interface ActionSectionProps {
  onSave: () => void;
  isLoading?: boolean;
}

export default function ActionSection({
  onSave,
  isLoading = false,
}: ActionSectionProps) {
  return (
    <View style={styles.actionSection}>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.back()}
        disabled={isLoading}
      >
        <Text style={styles.cancelButtonText}>취소</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.saveButton, isLoading && styles.disabledButton]}
        onPress={onSave}
        disabled={isLoading}
      >
        <Text style={styles.saveButtonText}>
          {isLoading ? '수정 중...' : '수정 완료'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
