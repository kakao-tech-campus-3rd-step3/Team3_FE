import { RECOMMENDED_MATCH_API } from '@/src/constants/endpoints';
import { apiClient } from '@/src/lib/api_client';
import type {
  RecommendedMatch,
  RecommendedMatchListData,
} from '@/src/types/home';

export type { RecommendedMatch, RecommendedMatchListData };

export const recommendedMatchApi = {
  getRecommendedMatch: () =>
    apiClient.get<RecommendedMatchListData>(
      RECOMMENDED_MATCH_API.GET_RECOMMENDED_MATCH
    ),
};
