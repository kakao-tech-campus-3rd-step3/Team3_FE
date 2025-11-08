import * as api from '@/src/api';
import type { UpdateProfileRequest } from '@/src/types';

export const profileQueries = {
  userProfile: {
    key: ['user', 'profile'] as const,
    fn: () => api.profileApi.getProfile(),
  },
  userProfileById: {
    key: (userId: string | number) => ['user', 'profile', userId] as const,
    fn: (userId: string | number) => api.profileApi.getProfileById(userId),
  },
  user: {
    key: ['user'] as const,
  },
  updateProfile: {
    key: ['updateProfile'] as const,
    fn: (data: UpdateProfileRequest) => api.profileApi.updateProfile(data),
  },
  deleteProfile: {
    key: ['deleteProfile'] as const,
    fn: () => api.profileApi.deleteProfile(),
  },
} as const;
