import { apiClient } from '@/src/lib/api_client';
import { LoginResponse } from '@/src/types/auth';
import { AUTH_API } from '@/src/constants/endpoints';

export const authApi = {
  login: (email: string, password: string) =>
    apiClient.post<LoginResponse>(AUTH_API.GET_AUTH, {
      email,
      password,
    }),
  getAuth: () => apiClient.get<LoginResponse>(AUTH_API.GET_AUTH),
};
