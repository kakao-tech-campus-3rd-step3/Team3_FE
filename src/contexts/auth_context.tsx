import React, { createContext, useContext, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { authApi } from '@/src/api/auth';
import { useStorageState } from '@/src/hooks/useStorageState';
import { apiClient } from '@/src/lib/api_client';
import { queryClient } from '@/src/lib/query_client';
import { theme } from '@/src/theme';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken, isLoading] = useStorageState<string | null>(
    'authToken',
    null
  );

  useEffect(() => {
    apiClient.setOnTokenExpired(() => {
      console.log('🚨 AuthContext: 토큰 만료됨, 로그아웃 처리');
      console.log('🚨 AuthContext: 현재 토큰 상태', {
        currentToken: token ? '토큰 있음' : '토큰 없음',
        isAuthenticated: !!token,
      });
      console.log('🚨 AuthContext: 스택 트레이스', new Error().stack);
      setToken(null);
      queryClient.clear();
    });
  }, [setToken, token]);

  const login = async (newToken: string) => {
    console.log('🔐 AuthContext: login 함수 호출됨', {
      newToken: newToken ? '토큰 있음' : '토큰 없음',
    });
    // ✅ 1. apiClient에 먼저 토큰을 설정 (가장 중요!)
    console.log('🔧 AuthContext: API 클라이언트에 토큰 설정 중...');
    apiClient.setToken(newToken);
    console.log('✅ AuthContext: API 클라이언트 토큰 설정 완료');
    // ✅ 2. 그 다음 React 상태를 업데이트
    setToken(newToken);
  };

  const logout = async () => {
    console.log('🚪 AuthContext: logout 함수 호출됨');
    try {
      // 백엔드에 모든 기기 로그아웃 요청 (refreshToken 쿠키 불필요)
      console.log('📡 AuthContext: 백엔드 로그아웃 API 호출 중...');
      await authApi.logoutAll();
      console.log('✅ AuthContext: 백엔드 로그아웃 API 성공');
    } catch (error) {
      // 로그아웃 API 실패해도 클라이언트에서는 로그아웃 처리
      console.warn('⚠️ AuthContext: 로그아웃 API 호출 실패:', error);
    } finally {
      // 항상 클라이언트 상태 정리
      console.log('🧹 AuthContext: 클라이언트 상태 정리 중...');
      setToken(null);
      queryClient.clear();
      console.log('✅ AuthContext: 클라이언트 상태 정리 완료');
    }
  };

  if (isLoading) {
    console.log('⏳ AuthContext: 로딩 중...');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.grass[500]} />
      </View>
    );
  }

  console.log('🎯 AuthContext: Provider 렌더링', {
    token: token ? '토큰 있음' : '토큰 없음',
    isAuthenticated: !!token,
    isLoading,
  });

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth는 반드시 AuthProvider 내부에서 사용해야 합니다.');
  }
  return context;
}
