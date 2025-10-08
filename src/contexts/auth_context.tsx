import React, { createContext, useContext, useEffect, useRef } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { authApi } from '@/src/api/auth';
import { useStorageState } from '@/src/hooks/useStorageState';
import { apiClient } from '@/src/lib/api_client';
import { queryClient } from '@/src/lib/query_client';
import { theme } from '@/src/theme';

interface AuthContextType {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (
    token: string,
    refreshToken: string,
    accessTokenExpiresIn?: number
  ) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken, isLoading] = useStorageState<string | null>(
    'authToken',
    null
  );
  const [refreshToken, setRefreshToken] = useStorageState<string | null>(
    'refreshToken',
    null
  );
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 토큰 갱신 함수 (토큰 로테이션 포함)
  const refreshAccessToken = async () => {
    if (!refreshToken) {
      setToken(null);
      setRefreshToken(null);
      queryClient.clear();
      return;
    }

    try {
      const response = await authApi.refreshToken(refreshToken);
      const {
        accessToken,
        refreshToken: newRefreshToken,
        accessTokenExpiresIn,
      } = response.data;

      // 토큰 로테이션: 새 토큰들로 업데이트
      setToken(accessToken);
      setRefreshToken(newRefreshToken);
      apiClient.setToken(accessToken);

      // 다음 토큰 갱신을 위한 타이머 설정 (만료 5분 전에 갱신)
      const refreshTime = (accessTokenExpiresIn - 300) * 1000;
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
      refreshTimeoutRef.current = setTimeout(refreshAccessToken, refreshTime);
    } catch (error) {
      console.warn('토큰 갱신 실패:', error);
      // Refresh Token도 만료된 경우 완전 로그아웃
      setToken(null);
      setRefreshToken(null);
      queryClient.clear();
    }
  };

  // 앱 시작 시 자동 로그인 복원
  useEffect(() => {
    const initializeAuth = async () => {
      if (!isLoading && refreshToken && !token) {
        await refreshAccessToken();
      }
    };

    initializeAuth();
  }, [isLoading, refreshToken, token]);

  useEffect(() => {
    apiClient.setOnTokenExpired(() => {
      refreshAccessToken();
    });
  }, [refreshToken]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);

  const login = async (
    newToken: string,
    newRefreshToken: string,
    accessTokenExpiresIn?: number
  ) => {
    apiClient.setToken(newToken);
    setToken(newToken);
    setRefreshToken(newRefreshToken);

    // 토큰 갱신 타이머 설정 (만료 5분 전에 갱신)
    if (accessTokenExpiresIn) {
      const refreshTime = (accessTokenExpiresIn - 300) * 1000;
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
      refreshTimeoutRef.current = setTimeout(refreshAccessToken, refreshTime);
    }
  };

  const logout = async () => {
    try {
      await authApi.logoutAll();
    } catch (error) {
      console.warn('서버 로그아웃 API 호출 실패:', error);
    } finally {
      // 타이머 정리
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }

      // 로컬 토큰 삭제
      setToken(null);
      setRefreshToken(null);
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
        refreshToken,
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
