import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

import { ROUTES } from '@/src/constants/routes';
import { useAuth } from '@/src/contexts/auth_context';
import { useUserProfile } from '@/src/hooks/queries';

interface TeamGuardProps {
  children: React.ReactNode;
  fallbackMessage?: string;
}

export default function TeamGuard({
  children,
  fallbackMessage,
}: TeamGuardProps) {
  const router = useRouter();
  const { token } = useAuth();
  const isAuthenticated = !!token;
  const { data: userProfile, isLoading } = useUserProfile();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    if (!isLoading && (!userProfile?.teamId || userProfile.teamId === null)) {
      Alert.alert(
        '팀 참여 필요',
        fallbackMessage || '이 기능을 사용하려면 먼저 팀에 가입해야 합니다.',
        [
          {
            text: '팀 만들기',
            onPress: () => router.push(ROUTES.TEAM_CREATION),
          },
          {
            text: '팀 참여하기',
            onPress: () => router.push(ROUTES.TEAM_GUIDE),
          },
          {
            text: '취소',
            style: 'cancel',
            onPress: () => router.replace(ROUTES.TABS),
          },
        ]
      );
    }
  }, [
    userProfile?.teamId,
    isLoading,
    router,
    fallbackMessage,
    isAuthenticated,
  ]);

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>로딩 중...</Text>
      </View>
    );
  }

  if (!userProfile?.teamId || userProfile.teamId === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
          팀 참여가 필요합니다
        </Text>
        <Text style={{ textAlign: 'center', marginBottom: 30, color: '#666' }}>
          매치에 참여하려면 먼저 팀에 가입해야 합니다.
        </Text>

        <View style={{ gap: 12 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#4CAF50',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 8,
            }}
            onPress={() => router.push(ROUTES.TEAM_CREATION)}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>
              팀 만들기
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#374151',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 8,
            }}
            onPress={() => router.push(ROUTES.TEAM_GUIDE)}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>
              팀 참여하기
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace(ROUTES.TABS)}
            style={{
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#ddd',
            }}
          >
            <Text style={{ textAlign: 'center' }}>홈으로 이동</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return <>{children}</>;
}
