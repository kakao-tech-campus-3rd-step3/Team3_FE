import * as api from '@/src/api';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const queries = {
  userProfile: {
    key: ['user', 'profile'] as const,
    fn: () => api.profileApi.getProfile(),
  },
} as const;

export function useUserInfo() {
  return useQuery({
    queryKey: queries.userProfile.key,
    queryFn: queries.userProfile.fn,
    enabled: true,
  });
}

export function useSuspenseUserInfo() {
  return useSuspenseQuery({
    queryKey: queries.userProfile.key,
    queryFn: queries.userProfile.fn,
  });
}
