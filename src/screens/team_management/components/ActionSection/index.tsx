import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from '../../team_edit_styles';

interface ActionSectionProps {
  onSave: () => void;
}

export default function ActionSection({ onSave }: ActionSectionProps) {
  return (
    <View style={styles.actionSection}>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styles.cancelButtonText}>취소</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={onSave}>
        <Text style={styles.saveButtonText}>수정 완료</Text>
      </TouchableOpacity>
    </View>
  );
}
