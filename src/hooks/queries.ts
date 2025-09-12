import * as api from '@/src/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/src/contexts/auth_context';
export const queries = {
  auth: {
    key: ['auth'] as const,
    fn: () => api.authApi.getAuth(),
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

export function useLogin() {
  const { login } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { email: string; password: string }) =>
      api.authApi.login(params.email, params.password),
    onSuccess: (data: any) => {
      login(data.token);
      queryClient.invalidateQueries({ queryKey: queries.auth.key });
    },
  });
}

export function useLogout() {
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => logout(),
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
