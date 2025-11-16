import { router } from 'expo-router';
import { Alert } from 'react-native';

import { useUpdateProfileMutation } from '@/src/hooks/queries';
import { UpdateProfileRequest } from '@/src/types/profile';
import { handleApiError } from '@/src/utils/handle_api_error';

export function useProfileEdit() {
  const updateProfileMutation = useUpdateProfileMutation();

  const handleSave = async (formData: UpdateProfileRequest) => {
    try {
      const cleanData: UpdateProfileRequest = {
        name: formData.name?.trim() || '',
        skillLevel: formData.skillLevel?.trim() || '',
        position: formData.position?.trim() || '',
        bio: formData.bio?.trim() || '',
      };

      await updateProfileMutation.mutateAsync(cleanData);
      Alert.alert('성공', '프로필이 수정되었습니다.', [
        {
          text: '확인',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      handleApiError(error);
    }
  };

  return {
    handleSave,
    isPending: updateProfileMutation.isPending,
  };
}
