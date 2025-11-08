import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';

import { ROUTES } from '@/src/constants/routes';
import { useAuth } from '@/src/contexts/auth_context';
import { queryClient } from '@/src/lib/query_client';
import type {
  LoginResponse,
  RegisterResponse,
  SendVerificationResponse,
} from '@/src/types';

import { authQueries } from './queries';

export function useLoginMutation() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: authQueries.login.fn,
    onSuccess: async (data: LoginResponse) => {
      await login(
        data.accessToken,
        data.refreshToken,
        data.accessTokenExpiresIn
      );
      await queryClient.clear();
      router.replace(ROUTES.HOME);
    },
    onError: (error: unknown) => {
      console.error('로그인 실패:', error);
    },
  });
}

export function useRegisterMutation() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: authQueries.register.fn,
    onSuccess: async (data: RegisterResponse) => {
      await login(
        data.accessToken,
        data.refreshToken,
        data.accessTokenExpiresIn
      );
      await queryClient.clear();
      router.replace(ROUTES.HOME);
    },
    onError: (error: unknown) => {
      console.error('회원가입 실패:', error);
    },
  });
}

export function useSendVerificationMutation() {
  return useMutation({
    mutationFn: authQueries.sendVerification.fn,
    onSuccess: (data: SendVerificationResponse) => {},
    onError: (error: unknown) => {
      console.error('이메일 인증번호 전송 실패:', error);
    },
  });
}

export function useSendPasswordResetCodeMutation() {
  return useMutation({
    mutationFn: authQueries.sendPasswordResetCode.fn,
    onError: (error: unknown) => {
      console.error('인증번호 발송 실패:', error);
    },
  });
}

export function useVerifyCodeMutation() {
  return useMutation({
    mutationFn: authQueries.verifyCode.fn,
    onError: (error: unknown) => {
      console.error('인증코드 검증 실패:', error);
    },
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: authQueries.resetPassword.fn,
    onError: (error: unknown) => {
      console.error('비밀번호 변경 실패:', error);
    },
  });
}

export function useSendCodeMutation() {
  return useMutation({
    mutationFn: authQueries.sendCode.fn,
    onError: (error: unknown) => {
      console.error('인증번호 발송 실패:', error);
    },
  });
}

export function useVerifyCodeSignupMutation() {
  return useMutation({
    mutationFn: authQueries.verifyCodeSignup.fn,
    onError: (error: unknown) => {
      console.error('인증코드 검증 실패:', error);
    },
  });
}

export function useLogout() {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.clear();
      router.replace(ROUTES.LOGIN);
    },
    onError: (error: unknown) => {
      console.error('로그아웃 실패:', error);
    },
  });
}
