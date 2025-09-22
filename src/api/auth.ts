import { AUTH_API } from '@/src/constants/endpoints';
import { apiClient } from '@/src/lib/api_client';
import { LoginResponse } from '@/src/types';

export const authApi = {
  login: (email: string, password: string) =>
    apiClient.post<LoginResponse>(AUTH_API.LOGIN, {
      email,
      password,
    }),
};
