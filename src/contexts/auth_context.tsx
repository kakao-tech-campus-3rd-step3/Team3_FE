import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState,
} from 'react';

import { authApi } from '@/src/api/auth';
import {
  createTokenResource,
  createRefreshTokenResource,
  updateSecureStoreResource,
  deleteSecureStoreResource,
} from '@/src/hooks/useSecureStoreResource';
import { apiClient } from '@/src/lib/api_client';
import { queryClient } from '@/src/lib/query_client';

interface AuthContextType {
  token: string | null;
  refreshToken: string | null;
  login: (
    token: string,
    refreshToken: string,
    accessTokenExpiresIn?: number
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProviderInner({ children }: { children: React.ReactNode }) {
  const tokenResource = createTokenResource();
  const refreshTokenResource = createRefreshTokenResource();

  const token = tokenResource.read();
  const refreshToken = refreshTokenResource.read();

  const [tokenState, setTokenState] = useState(token);
  const [refreshTokenState, setRefreshTokenState] = useState(refreshToken);
  const refreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const refreshAccessToken = useCallback(async () => {
    if (!refreshTokenState) {
      deleteSecureStoreResource('authToken');
      deleteSecureStoreResource('refreshToken');
      setTokenState(null);
      setRefreshTokenState(null);
      queryClient.clear();
      return;
    }

    try {
      const response = await authApi.refreshToken(refreshTokenState);
      const {
        accessToken,
        refreshToken: newRefreshToken,
        accessTokenExpiresIn,
      } = response;

      updateSecureStoreResource('authToken', accessToken, value => value ?? '');
      updateSecureStoreResource(
        'refreshToken',
        newRefreshToken,
        value => value ?? ''
      );
      setTokenState(accessToken);
      setRefreshTokenState(newRefreshToken);
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
      deleteSecureStoreResource('authToken');
      deleteSecureStoreResource('refreshToken');
      setTokenState(null);
      setRefreshTokenState(null);
      queryClient.clear();
    }
  }, [refreshTokenState]);

  useEffect(() => {
    const initializeAuth = async () => {
      if (refreshTokenState && !tokenState) {
        await refreshAccessToken();
      }
    };

    initializeAuth();
  }, [refreshTokenState, tokenState, refreshAccessToken]);

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
    updateSecureStoreResource('authToken', newToken, value => value ?? '');
    updateSecureStoreResource(
      'refreshToken',
      newRefreshToken,
      value => value ?? ''
    );
    setTokenState(newToken);
    setRefreshTokenState(newRefreshToken);

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

      deleteSecureStoreResource('authToken');
      deleteSecureStoreResource('refreshToken');
      setTokenState(null);
      setRefreshTokenState(null);
      queryClient.clear();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: tokenState,
        refreshToken: refreshTokenState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthProviderInner>{children}</AuthProviderInner>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth는 반드시 AuthProvider 내부에서 사용해야 합니다.');
  }
  return context;
}
