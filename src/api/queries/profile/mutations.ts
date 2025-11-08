import { useMutation, useQuery } from '@tanstack/react-query';

import { useAuth } from '@/src/contexts/auth_context';
import { queryClient } from '@/src/lib/query_client';

import { profileQueries } from './queries';

export function useUserProfile() {
  const { token, isInitialized } = useAuth();

  return useQuery({
    queryKey: profileQueries.userProfile.key,
    queryFn: profileQueries.userProfile.fn,
    enabled: !!token && isInitialized,
  });
}

export function useUserProfileById(userId: string | number | undefined) {
  const { token, isInitialized } = useAuth();

  return useQuery({
    queryKey: userId
      ? profileQueries.userProfileById.key(userId)
      : ['user', 'profile', 'undefined'],
    queryFn: () => profileQueries.userProfileById.fn(userId as string | number),
    enabled: !!token && isInitialized && !!userId,
  });
}

export function useUpdateProfileMutation() {
  return useMutation({
    mutationFn: profileQueries.updateProfile.fn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: profileQueries.userProfile.key,
      });
    },
    onError: (error: unknown) => {
      console.error('프로필 수정 실패:', error);
    },
  });
}

export function useDeleteProfileMutation() {
  return useMutation({
    mutationFn: profileQueries.deleteProfile.fn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: profileQueries.userProfile.key,
      });
    },
    onError: (error: unknown) => {
      console.error('계정 탈퇴 실패:', error);
    },
  });
}
