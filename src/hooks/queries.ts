import * as api from '@/src/api';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const queries = {
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
    fn: () => api.recommendedMatchApi.getRecommendedMatchData(),
  },
} as const;

export function useUserInfo() {
  return useQuery({
    queryKey: queries.userProfile.key,
    queryFn: queries.userProfile.fn,
  });
}

export function useSuspenseUserInfo() {
  return useSuspenseQuery({
    queryKey: queries.userProfile.key,
    queryFn: queries.userProfile.fn,
  });
}
export function useSuspenseHome() {
  return useSuspenseQuery({
    queryKey: queries.home.key,
    queryFn: queries.home.fn,
  });
}
