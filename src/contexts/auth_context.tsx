import * as SplashScreen from 'expo-splash-screen';
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
  isInitialized: boolean;
  login: (
    token: string,
    refreshToken: string,
    accessTokenExpiresIn?: number
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProviderInner({ children }: { children: React.ReactNode }) {
  const [tokenState, setTokenState] = useState<string | null>(null);
  const [refreshTokenState, setRefreshTokenState] = useState<string | null>(
    null
  );
  const [isInitialized, setIsInitialized] = useState(false);
  const refreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const refreshAttemptCountRef = useRef(0);

  const initializeAuth = useCallback(async () => {
    const handleTokenInitialization = (
      token: string | null,
      refreshToken: string | null
    ) => {
      if (refreshToken) {
        setTokenState(null);
        setRefreshTokenState(refreshToken);
        setIsInitialized(true);
      } else {
        setTokenState(null);
        setRefreshTokenState(null);
        setIsInitialized(true);
      }
    };

    try {
      const tokenResource = createTokenResource();
      const refreshTokenResource = createRefreshTokenResource();

      const token = tokenResource.read();
      const refreshToken = refreshTokenResource.read();

      handleTokenInitialization(token, refreshToken);
    } catch (error) {
      if (error instanceof Promise) {
        try {
          const token = await error;
          const refreshTokenResource = createRefreshTokenResource();
          const refreshToken = refreshTokenResource.read();

          handleTokenInitialization(token, refreshToken);
        } catch (refreshError) {
          if (refreshError instanceof Promise) {
            const refreshToken = await refreshError;
            handleTokenInitialization(null, refreshToken);
          } else {
            handleTokenInitialization(null, null);
          }
        }
      } else {
        handleTokenInitialization(null, null);
      }
    }
  }, []);

  const refreshAccessToken = useCallback(async () => {
    if (refreshAttemptCountRef.current >= 3) {
      deleteSecureStoreResource('authToken');
      deleteSecureStoreResource('refreshToken');
      setTokenState(null);
      setRefreshTokenState(null);
      queryClient.clear();
      refreshAttemptCountRef.current = 0;
      return;
    }

    if (!refreshTokenState) {
      deleteSecureStoreResource('authToken');
      deleteSecureStoreResource('refreshToken');
      setTokenState(null);
      setRefreshTokenState(null);
      queryClient.clear();
      refreshAttemptCountRef.current = 0;
      return;
    }

    try {
      refreshAttemptCountRef.current += 1;
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

      refreshAttemptCountRef.current = 0;

      const MIN_LEAD_SECONDS = 10;
      const delayMs =
        Math.max(accessTokenExpiresIn - 300, MIN_LEAD_SECONDS) * 1000;

      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
      refreshTimeoutRef.current = setTimeout(refreshAccessToken, delayMs);
    } catch (error) {
      console.warn('토큰 갱신 실패:', error);

      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }

      deleteSecureStoreResource('authToken');
      deleteSecureStoreResource('refreshToken');
      setTokenState(null);
      setRefreshTokenState(null);
      queryClient.clear();

      refreshAttemptCountRef.current = 0;

      SplashScreen.hideAsync();
    }
  }, [refreshTokenState]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (isInitialized && refreshTokenState && !tokenState) {
      refreshAccessToken();
    }
  }, [isInitialized, refreshTokenState, tokenState, refreshAccessToken]);

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
    refreshAttemptCountRef.current = 0;

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
        isInitialized,
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
