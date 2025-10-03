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
    apiClient.setToken(token);
  }, [token]);

  useEffect(() => {
    apiClient.setOnTokenExpired(() => {
      setToken(null);
      queryClient.clear();
    });
  }, [setToken]);

  const login = async (newToken: string) => {
    setToken(newToken);
  };

  const logout = async () => {
    try {
      // 백엔드에 모든 기기 로그아웃 요청 (refreshToken 쿠키 불필요)
      await authApi.logoutAll();
    } catch (error) {
      // 로그아웃 API 실패해도 클라이언트에서는 로그아웃 처리
      console.warn('로그아웃 API 호출 실패:', error);
    } finally {
      // 항상 클라이언트 상태 정리
      setToken(null);
      queryClient.clear();
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.grass[500]} />
      </View>
    );
  }

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
