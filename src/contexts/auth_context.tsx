import React, { createContext, useContext, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { useStorageState } from '@/src/hooks/useStorageState';
import { apiClient } from '@/src/lib/api_client';
import { queryClient } from '@/src/lib/query_client';
import { theme } from '@/src/theme';

interface AuthContextType {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  login: (token: string, userId: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken, isLoading] = useStorageState<string | null>(
    'authToken',
    null
  );
  const [userId, setUserId, isUserIdLoading] = useStorageState<string | null>(
    'userId',
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

  const login = async (newToken: string, newUserId: string) => {
    setToken(newToken);
    setUserId(newUserId);
  };

  const logout = async () => {
    setToken(null);
    setUserId(null);
    queryClient.clear();
  };

  const isAuthLoading = isLoading || isUserIdLoading;
  if (isAuthLoading) {
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
        userId,
        isAuthenticated: !!token,
        login,
        logout,
        isLoading: isAuthLoading,
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
