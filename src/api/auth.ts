import { AUTH_API } from '@/src/constants/endpoints';
import { apiClient } from '@/src/lib/api_client';
import {
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  SendVerificationResponse,
  VerifyEmailResponse,
  VerifyEmailRequest,
} from '@/src/types';

export const authApi = {
  login: (email: string, password: string) =>
    apiClient.post<LoginResponse>(AUTH_API.LOGIN, {
      email,
      password,
    }),
  register: (registerData: RegisterRequest) =>
    apiClient.post<RegisterResponse>(AUTH_API.REGISTER, registerData),

  logout: () => apiClient.post(AUTH_API.LOGOUT, {}),

  logoutAll: () => apiClient.post(AUTH_API.LOGOUT_ALL, {}),

  refreshToken: () => apiClient.post<LoginResponse>(AUTH_API.REFRESH, {}),

  verifyEmail: (verifyEmailCode: VerifyEmailRequest) =>
    apiClient.post<VerifyEmailResponse>(AUTH_API.VERIFY_EMAIL, verifyEmailCode),

  sendVerification: (email: string) =>
    apiClient.post<SendVerificationResponse>(AUTH_API.SEND_VERIFICATION, {
      email,
    }),
};
