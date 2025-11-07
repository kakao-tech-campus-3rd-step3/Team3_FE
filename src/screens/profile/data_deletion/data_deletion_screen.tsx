import { router } from 'expo-router';
import { ScrollView, Text, View, TouchableOpacity, Alert } from 'react-native';

import { ROUTES } from '@/src/constants/routes';
import { useAuth } from '@/src/contexts/auth_context';
import { useDeleteProfileMutation } from '@/src/hooks/queries';
import { styles } from '@/src/screens/profile/data_deletion/data_deletion_style';

export default function DataDeletionScreen() {
  const { token, logout } = useAuth();
  const deleteProfileMutation = useDeleteProfileMutation();

  const handleSubmit = async () => {
    if (!token) {
      Alert.alert('오류', '로그인이 필요합니다.');
      return;
    }

    Alert.alert(
      '계정 탈퇴 확인',
      '정말로 계정을 탈퇴하시겠습니까?\n\n탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '탈퇴',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteProfileMutation.mutateAsync();

              Alert.alert('탈퇴 완료', '계정이 성공적으로 탈퇴되었습니다.', [
                {
                  text: '확인',
                  onPress: async () => {
                    await logout();
                    router.replace(ROUTES.LOGIN);
                  },
                },
              ]);
            } catch (error) {
              let errorMessage = '계정 탈퇴 중 오류가 발생했습니다.';

              if (error && typeof error === 'object' && 'status' in error) {
                const apiError = error as {
                  status: number;
                  message?: string;
                  data?: any;
                };

                if (apiError.status === 404) {
                  errorMessage = '사용자를 찾을 수 없습니다.';
                } else if (apiError.status === 401) {
                  errorMessage = '인증이 필요합니다. 다시 로그인해주세요.';
                } else if (apiError.status === 403) {
                  errorMessage = '계정 탈퇴 권한이 없습니다.';
                } else if (apiError.status === 405) {
                  errorMessage =
                    '계정 탈퇴 기능이 아직 구현되지 않았습니다. 관리자에게 문의해주세요.';
                } else if (apiError.status === 500) {
                  errorMessage =
                    '계정 탈퇴 중 데이터베이스 오류가 발생했습니다. 팀 가입 대기 목록이나 다른 연관 데이터를 먼저 정리해주세요.';
                } else if (apiError.status === 204) {
                  errorMessage = '';
                } else if (apiError.message) {
                  errorMessage = apiError.message;
                }
              }

              if (errorMessage) {
                Alert.alert('오류', errorMessage);
              }
            }
          },
        },
      ]
    );
  };

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
            deleteProfileMutation.isPending && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={deleteProfileMutation.isPending}
        >
          <Text style={styles.submitButtonText}>
            {deleteProfileMutation.isPending ? '처리 중...' : '계정 탈퇴'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
