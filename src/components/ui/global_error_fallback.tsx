import { router } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native';

import { ROUTES } from '@/src/constants/routes';
import { useAuth } from '@/src/contexts/auth_context';
import { ApiError } from '@/src/lib/api_client';
import { queryClient } from '@/src/lib/query_client';

type Props = {
  error: Error;
  resetError: () => void;
};

export default function GlobalErrorFallback({ error }: Props) {
  const { logout } = useAuth();

  useEffect(() => {
    // 모든 API 오류인 경우 자동으로 처리
    if (error instanceof ApiError) {
      const handleLogout = async () => {
        try {
          await logout();
          await queryClient.clear();
          router.replace(ROUTES.LOGIN);
        } catch (logoutError) {
          console.error('로그아웃 실패:', logoutError);
        }
      };

      handleLogout();
    }
  }, [error, logout]);

  // API 오류인 경우
  if (error instanceof ApiError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, marginBottom: 12 }}>
          API 오류가 발생했습니다
        </Text>
        <Text style={{ marginBottom: 8, color: 'red', fontWeight: 'bold' }}>
          상태 코드: {error.status}
        </Text>
        <Text style={{ marginBottom: 16, color: 'red' }}>{error.message}</Text>
        <Text style={{ marginBottom: 16, color: 'gray' }}>
          로그인 페이지로 이동합니다...
        </Text>
      </View>
    );
  }

  // 일반 에러인 경우
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>
        예상치 못한 오류가 발생했습니다 ⚠️
      </Text>
      <Text style={{ marginBottom: 16, color: 'red' }}>{error.message}</Text>
    </View>
  );
}
