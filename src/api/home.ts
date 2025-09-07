import { HomeData } from '@/src/types';
import { HOME_API } from '@/src/constants/endpoints';
import { apiClient } from '@/src/lib/api_client';

export const homeApi = {
  getHome: (): Promise<HomeData> => {
    return apiClient.get<HomeData>(HOME_API.GET_HOME);
  },
};
