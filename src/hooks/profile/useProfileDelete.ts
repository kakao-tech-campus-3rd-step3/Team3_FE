import { router } from 'expo-router';
import { Alert } from 'react-native';

import { ROUTES } from '@/src/constants/routes';
import { useAuth } from '@/src/contexts/auth_context';
import { useDeleteProfileMutation } from '@/src/hooks/queries';
import { handleApiError } from '@/src/utils/handle_api_error';

export function useProfileDelete() {
  const { token, logout } = useAuth();
  const deleteProfileMutation = useDeleteProfileMutation();

  const handleDelete = async () => {
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
              handleApiError(error);
            }
          },
        },
      ]
    );
  };

  return {
    handleDelete,
    isPending: deleteProfileMutation.isPending,
  };
}
