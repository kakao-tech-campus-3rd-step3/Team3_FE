import { AUTH_API, PASSWORD_RESET_API } from '@/src/constants/endpoints';
import { apiClient } from '@/src/lib/api_client';
import {
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  SendVerificationResponse,
  VerifyEmailResponse,
  VerifyEmailRequest,
  TokenRefreshResponse,
  VerifyCodeRequest,
  VerifyCodeResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  SendPasswordResetCodeResponse,
  VerifyCodeRequestSignup,
} from '@/src/types';

export const authApi = {
  login: (email: string, password: string) =>
    apiClient.post<LoginResponse>(
      AUTH_API.LOGIN,
      {
        email,
        password,
      },
      { authRequired: false }
    ),
  register: (registerData: RegisterRequest) =>
    apiClient.post<RegisterResponse>(AUTH_API.REGISTER, registerData, {
      authRequired: false,
    }),

  logout: () => apiClient.post(AUTH_API.LOGOUT, {}),

  logoutAll: () => apiClient.post(AUTH_API.LOGOUT_ALL, {}),

  refreshToken: (refreshToken: string) =>
    apiClient.post<TokenRefreshResponse>(
      AUTH_API.REFRESH,
      {
        refreshToken,
      },
      { authRequired: false }
    ),

  verifyEmail: (verifyEmailCode: VerifyEmailRequest) =>
    apiClient.post<VerifyEmailResponse>(
      AUTH_API.VERIFY_EMAIL,
      verifyEmailCode,
      { authRequired: false }
    ),

  sendVerification: (email: string) =>
    apiClient.post<SendVerificationResponse>(
      AUTH_API.SEND_VERIFICATION,
      {
        email,
      },
      { authRequired: false }
    ),

  sendCode: (email: string) =>
    apiClient.post(AUTH_API.SEND_CODE, { email }, { authRequired: false }),

  verifyCode: (data: VerifyCodeRequestSignup) =>
    apiClient.post(AUTH_API.VERIFY_CODE, data, { authRequired: false }),
};

export const passwordResetApi = {
  sendCode: (email: string) =>
    apiClient.post<SendPasswordResetCodeResponse>(
      PASSWORD_RESET_API.SEND_CODE,
      { email },
      { authRequired: false }
    ),

  verifyCode: (data: VerifyCodeRequest) =>
    apiClient.post<VerifyCodeResponse>(PASSWORD_RESET_API.VERIFY_CODE, data, {
      authRequired: false,
    }),

  confirm: (data: ResetPasswordRequest) =>
    apiClient.post<ResetPasswordResponse>(PASSWORD_RESET_API.CONFIRM, data, {
      authRequired: false,
    }),
};
