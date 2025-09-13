import { apiClient } from '@/src/lib/api_client';
import type { UserProfile } from '@/src/types';
import { PROFILE_API } from '@/src/constants/endpoints';

export const profileApi = {
  getProfile: () => apiClient.get<UserProfile>(PROFILE_API.GET_PROFILE),
};
