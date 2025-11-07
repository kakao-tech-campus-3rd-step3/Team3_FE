import { router } from 'expo-router';
import { Text, View, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Card from '@/src/components/card/card';
import { useUserProfile, useUpdateProfileMutation } from '@/src/hooks/queries';
import { styles } from '@/src/screens/profile/edit/edit_profile_style';
import ProfileForm from '@/src/screens/profile/edit/profile_form';
import { theme } from '@/src/theme';
import { UpdateProfileRequest } from '@/src/types/profile';

export default function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  const { data: userInfo, refetch } = useUserProfile();
  const updateProfileMutation = useUpdateProfileMutation();

  const handleSave = async (formData: UpdateProfileRequest) => {
    try {
      const cleanData: UpdateProfileRequest = {
        name: formData.name?.trim() || '',
        skillLevel: formData.skillLevel?.trim() || '',
        position: formData.position?.trim() || '',
        bio: formData.bio?.trim() || '',
      };

      if (!cleanData.name || !cleanData.name.trim()) {
        Alert.alert('오류', '이름을 입력해주세요.');
        return;
      }

      await updateProfileMutation.mutateAsync(cleanData);
      Alert.alert('성공', '프로필이 수정되었습니다.', [
        {
          text: '확인',
          onPress: () => router.back(),
        },
      ]);
      refetch();
    } catch (error) {
      console.error('프로필 수정 실패:', error);
      Alert.alert('오류', '프로필 수정에 실패했습니다.');
    }
  };

  if (!userInfo) {
    return (
      <View style={styles.container}>
        <Text>사용자 정보를 불러오는 중...</Text>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      style={styles.scrollContainer}
      contentContainerStyle={{
        paddingBottom: insets.bottom + theme.spacing.spacing7,
      }}
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Card style={styles.formCard}>
          <ProfileForm
            initialData={userInfo}
            onSave={handleSave}
            isLoading={updateProfileMutation.isPending}
          />
        </Card>
      </View>
    </KeyboardAwareScrollView>
  );
}
