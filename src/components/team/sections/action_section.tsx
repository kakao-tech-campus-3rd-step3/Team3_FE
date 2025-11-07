import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from '@/src/components/team/sections/action_section_styles';

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
        <Text
          style={styles.cancelButtonText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          취소
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={onSave}>
        <Text
          style={styles.saveButtonText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          수정 완료
        </Text>
      </TouchableOpacity>
    </View>
  );
}
