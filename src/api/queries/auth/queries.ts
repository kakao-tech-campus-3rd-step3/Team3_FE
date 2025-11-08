import * as api from '@/src/api';
import type {
  LoginRequest,
  RegisterRequest,
  VerifyEmailRequest,
  VerifyCodeRequest,
  ResetPasswordRequest,
  VerifyCodeRequestSignup,
} from '@/src/types';

export const authQueries = {
  login: {
    key: ['login'] as const,
    fn: (loginData: LoginRequest) =>
      api.authApi.login(loginData.email, loginData.password),
  },
  register: {
    key: ['register'] as const,
    fn: (registerData: RegisterRequest) => api.authApi.register(registerData),
  },
  sendVerification: {
    key: ['sendVerification'] as const,
    fn: (email: string) => api.authApi.sendVerification(email),
  },
  verifyEmail: {
    key: ['verifyEmail'] as const,
    fn: (verifyEmailCode: VerifyEmailRequest) =>
      api.authApi.verifyEmail(verifyEmailCode),
  },
  sendPasswordResetCode: {
    key: ['sendPasswordResetCode'] as const,
    fn: (email: string) => api.passwordResetApi.sendCode(email),
  },
  verifyCode: {
    key: ['verifyCode'] as const,
    fn: (data: VerifyCodeRequest) => api.passwordResetApi.verifyCode(data),
  },
  resetPassword: {
    key: ['resetPassword'] as const,
    fn: (data: ResetPasswordRequest) => api.passwordResetApi.confirm(data),
  },
  sendCode: {
    key: ['sendCode'] as const,
    fn: (email: string) => api.authApi.sendCode(email),
  },
  verifyCodeSignup: {
    key: ['verifyCodeSignup'] as const,
    fn: (data: VerifyCodeRequestSignup) => api.authApi.verifyCode(data),
  },
} as const;
