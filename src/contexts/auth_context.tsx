import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState,
} from 'react';

import { apiClient } from '@/src/lib/api_client';
import { AuthService } from '@/src/services/auth_service';

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
  const authServiceRef = useRef<AuthService | null>(null);

  if (!authServiceRef.current) {
    authServiceRef.current = new AuthService({
      setToken: setTokenState,
      setRefreshToken: setRefreshTokenState,
    });
  }

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await authServiceRef.current!.initializeAuth();
      } catch (error) {
        console.error('인증 초기화 실패:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    if (isInitialized && refreshTokenState && !tokenState) {
      authServiceRef.current!.refreshAccessToken(refreshTokenState);
    }
  }, [isInitialized, refreshTokenState, tokenState]);

  useEffect(() => {
    apiClient.setOnTokenExpired(async () => {
      try {
        await authServiceRef.current!.refreshAccessToken(refreshTokenState);
      } catch (error) {
        console.error('토큰 갱신 실패:', error);
      }
    });
  }, [refreshTokenState]);

  useEffect(() => {
    return () => {
      authServiceRef.current?.cleanup();
    };
  }, []);

  const login = useCallback(
    (token: string, refreshToken: string, accessTokenExpiresIn?: number) =>
      authServiceRef.current!.login(token, refreshToken, accessTokenExpiresIn),
    []
  );

  const logout = useCallback(() => authServiceRef.current!.logout(), []);

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
