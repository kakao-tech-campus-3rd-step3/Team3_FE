import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';

import { authApi } from '@/src/api/auth';
import {
  updateSecureStoreResource,
  deleteSecureStoreResource,
} from '@/src/hooks/useSecureStoreResource';
import { apiClient } from '@/src/lib/api_client';
import { queryClient } from '@/src/lib/query_client';

interface AuthStateCallbacks {
  setToken: (token: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
}

export class AuthService {
  private refreshTimeoutRef: ReturnType<typeof setTimeout> | null = null;
  private refreshAttemptCountRef = { current: 0 };
  private callbacks: AuthStateCallbacks;

  constructor(callbacks: AuthStateCallbacks) {
    this.callbacks = callbacks;
  }

  cancelTokenRefresh(): void {
    if (this.refreshTimeoutRef) {
      clearTimeout(this.refreshTimeoutRef);
      this.refreshTimeoutRef = null;
    }
  }

  scheduleTokenRefresh(
    accessTokenExpiresIn: number,
    refreshFn: () => Promise<void>
  ): void {
    const MIN_LEAD_SECONDS = 10;
    const delayMs =
      Math.max(accessTokenExpiresIn - 300, MIN_LEAD_SECONDS) * 1000;

    this.cancelTokenRefresh();
    this.refreshTimeoutRef = setTimeout(refreshFn, delayMs);
  }

  private async clearAuthState(): Promise<void> {
    await deleteSecureStoreResource('authToken');
    await deleteSecureStoreResource('refreshToken');
    this.callbacks.setToken(null);
    this.callbacks.setRefreshToken(null);
    queryClient.clear();
    this.refreshAttemptCountRef.current = 0;
  }

  async refreshAccessToken(refreshToken: string | null): Promise<void> {
    if (this.refreshAttemptCountRef.current >= 3) {
      await this.clearAuthState();
      return;
    }

    try {
      this.refreshAttemptCountRef.current += 1;
      const response = await authApi.refreshToken(refreshToken || '');

      const {
        accessToken,
        refreshToken: newRefreshToken,
        accessTokenExpiresIn,
      } = response;

      await updateSecureStoreResource(
        'authToken',
        accessToken,
        value => value ?? ''
      );
      await updateSecureStoreResource(
        'refreshToken',
        newRefreshToken,
        value => value ?? ''
      );

      this.callbacks.setToken(accessToken);
      this.callbacks.setRefreshToken(newRefreshToken);
      apiClient.setToken(accessToken);

      this.refreshAttemptCountRef.current = 0;

      if (accessTokenExpiresIn) {
        this.scheduleTokenRefresh(accessTokenExpiresIn, () =>
          this.refreshAccessToken(newRefreshToken)
        );
      }
    } catch (error) {
      this.cancelTokenRefresh();
      await this.clearAuthState();
      SplashScreen.hideAsync();
      throw error;
    }
  }

  async initializeAuth(): Promise<void> {
    this.callbacks.setToken(null);

    try {
      const refreshToken = await SecureStore.getItemAsync('refreshToken').catch(
        () => null
      );
      this.callbacks.setRefreshToken(refreshToken);

      if (!refreshToken) {
        await this.clearAuthState();
        SplashScreen.hideAsync();
        return;
      }

      await this.refreshAccessToken(refreshToken);
    } catch (error) {
      this.cancelTokenRefresh();
      await this.clearAuthState();
      throw error;
    }
  }

  async login(
    token: string,
    refreshToken: string,
    accessTokenExpiresIn?: number
  ): Promise<void> {
    this.refreshAttemptCountRef.current = 0;

    apiClient.setToken(token);
    await updateSecureStoreResource('authToken', token, value => value ?? '');
    await updateSecureStoreResource(
      'refreshToken',
      refreshToken,
      value => value ?? ''
    );

    this.callbacks.setToken(token);
    this.callbacks.setRefreshToken(refreshToken);

    if (accessTokenExpiresIn) {
      this.scheduleTokenRefresh(accessTokenExpiresIn, () =>
        this.refreshAccessToken(refreshToken)
      );
    }
  }

  async logout(): Promise<void> {
    try {
      await authApi.logoutAll();
    } catch (error) {
      console.warn('서버 로그아웃 API 호출 실패:', error);
    } finally {
      this.cancelTokenRefresh();
      await this.clearAuthState();
    }
  }

  cleanup(): void {
    this.cancelTokenRefresh();
  }
}
