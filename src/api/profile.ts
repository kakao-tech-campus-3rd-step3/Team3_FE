import { PROFILE_API } from '@/src/constants/endpoints';
import { apiClient } from '@/src/lib/api_client';
import type {
  UserProfile,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from '@/src/types';

export const profileApi = {
  getProfile: (userId: string) =>
    apiClient.get<UserProfile>(PROFILE_API.GET_PROFILE(userId)),
  updateProfile: (data: UpdateProfileRequest) =>
    apiClient.put<UpdateProfileResponse>(PROFILE_API.UPDATE_PROFILE, data),
};
