import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from 'react';
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
    null,
    {
      serialize: value => value ?? '',
      deserialize: value => (value === '' ? null : value),
    }
  );
  const [refreshToken, setRefreshToken] = useStorageState<string | null>(
    'refreshToken',
    null,
    {
      serialize: value => value ?? '',
      deserialize: value => (value === '' ? null : value),
    }
  );
  const refreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const refreshAccessToken = useCallback(async () => {
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
      } = response;

      setToken(accessToken);
      setRefreshToken(newRefreshToken);
      apiClient.setToken(accessToken);

      const MIN_LEAD_SECONDS = 10;
      const delayMs =
        Math.max(accessTokenExpiresIn - 300, MIN_LEAD_SECONDS) * 1000;
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
      refreshTimeoutRef.current = setTimeout(refreshAccessToken, delayMs);
    } catch (error) {
      console.warn('토큰 갱신 실패:', error);
      setToken(null);
      setRefreshToken(null);
      queryClient.clear();
    }
  }, [refreshToken, setToken, setRefreshToken]);

  useEffect(() => {
    const initializeAuth = async () => {
      if (!isLoading && refreshToken && !token) {
        await refreshAccessToken();
      }
    };

    initializeAuth();
  }, [isLoading, refreshToken, token, refreshAccessToken]);

  useEffect(() => {
    apiClient.setOnTokenExpired(async () => {
      await refreshAccessToken();
    });
  }, [refreshAccessToken]);

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

    if (accessTokenExpiresIn) {
      const MIN_LEAD_SECONDS = 10;
      const delayMs =
        Math.max(accessTokenExpiresIn - 300, MIN_LEAD_SECONDS) * 1000;
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
      refreshTimeoutRef.current = setTimeout(refreshAccessToken, delayMs);
    }
  };

  const logout = async () => {
    try {
      await authApi.logoutAll();
    } catch (error) {
      console.warn('서버 로그아웃 API 호출 실패:', error);
    } finally {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }

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
