import { ScrollView, Text, View, TouchableOpacity } from 'react-native';

import { useDataDeletion } from '@/src/hooks/useDataDeletion';
import { styles } from '@/src/screens/profile/data_deletion/styles';

export default function DataDeletionScreen() {
  const { handleDelete, isPending } = useDataDeletion();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>계정 탈퇴</Text>
        <Text style={styles.subtitle}>
          계정을 탈퇴하면 모든 개인정보와 데이터가 영구적으로 삭제됩니다.
        </Text>

        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>⚠️ 주의사항</Text>
          <Text style={styles.warningText}>
            • 탈퇴 시 모든 개인정보, 팀 정보, 매치 기록이 삭제됩니다{'\n'}•
            삭제된 데이터는 복구할 수 없습니다{'\n'}• 팀 가입 대기 목록이나 다른
            연관 데이터가 있으면 먼저 정리해주세요
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            isPending && styles.submitButtonDisabled,
          ]}
          onPress={handleDelete}
          disabled={isPending}
        >
          <Text style={styles.submitButtonText}>
            {isPending ? '처리 중...' : '계정 탈퇴'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
