import * as api from '@/src/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/src/contexts/auth_context';
import type { LoginResponse } from '@/src/types/auth';
export const queries = {
  login: {
    key: ['login'] as const,
  },

  userProfile: {
    key: ['user', 'profile'] as const,
    fn: () => api.profileApi.getProfile(),
  },
  home: {
    key: ['home'] as const,
    fn: () => api.homeApi.getHome(),
  },

  recommendedMatch: {
    key: ['recommendedMatch'] as const,
    fn: () => api.recommendedMatchApi.getRecommendedMatch(),
  },
} as const;

export function useLoginMutation() {
  const { login } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { email: string; password: string }) =>
      api.authApi.login(params.email, params.password),
    onSuccess: (data: LoginResponse) => {
      login(data.authToken);

      queryClient.invalidateQueries({ queryKey: queries.login.key });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export function useLogout() {
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });
}

export function useUserInfo() {
  return useQuery({
    queryKey: queries.userProfile.key,
    queryFn: queries.userProfile.fn,
  });
}

export function useHome() {
  return useQuery({
    queryKey: queries.home.key,
    queryFn: queries.home.fn,
  });
}

export function useRecommendedMatch() {
  return useQuery({
    queryKey: queries.recommendedMatch.key,
    queryFn: queries.recommendedMatch.fn,
  });
}
