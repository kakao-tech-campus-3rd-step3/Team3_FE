import React from 'react';
import { ScrollView, Text, View, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card } from '@/src/components/card/card';
import { useAuth } from '@/src/contexts/auth_context';
import { useUserProfile, useUpdateProfileMutation } from '@/src/hooks/queries';
import { theme } from '@/src/theme';
import { UpdateProfileRequest } from '@/src/types/profile';

import { styles } from './edit_profile_style';
import { ProfileForm } from './ProfileForm';

export default function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  const { token } = useAuth();
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

      // 필수 필드 검증
      if (!cleanData.name || !cleanData.name.trim()) {
        Alert.alert('오류', '이름을 입력해주세요.');
        return;
      }

      await updateProfileMutation.mutateAsync(cleanData);
      Alert.alert('성공', '프로필이 수정되었습니다.');
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
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={{
        paddingBottom: insets.bottom + theme.spacing.spacing7,
      }}
      showsVerticalScrollIndicator={false}
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
    </ScrollView>
  );
}
