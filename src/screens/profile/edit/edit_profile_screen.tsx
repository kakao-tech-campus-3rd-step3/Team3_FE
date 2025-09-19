import React, { useState } from 'react';
import { ScrollView, Text, View, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card } from '@/src/components/card/card';
import { useUserInfo } from '@/src/hooks/queries';
import { theme } from '@/src/theme';

import { styles } from './edit_profile_style';
import { ProfileForm } from './ProfileForm';

export default function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  const { data: userInfo, refetch } = useUserInfo();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (formData: any) => {
    try {
      setIsLoading(true);
      console.log('저장할 데이터:', formData);

      Alert.alert('성공', '프로필이 수정되었습니다.');
      refetch();
    } catch {
      Alert.alert('오류', '프로필 수정에 실패했습니다.');
    } finally {
      setIsLoading(false);
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
            isLoading={isLoading}
          />
        </Card>
      </View>
    </ScrollView>
  );
}
