import React, { createContext, useContext, useEffect } from 'react';

import { useStorageState } from '@/src/hooks/useStorageState';
import { apiClient } from '@/src/lib/api_client';
import { queryClient } from '@/src/lib/query_client';

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
    setToken(null);
    queryClient.clear();
  };

  // 로딩 중일 때 스플래시 같은 화면을 보여줄 수 있음
  if (isLoading) {
    return <></>; // TODO: 여기서 SplashScreen 컴포넌트 렌더링 가능
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
