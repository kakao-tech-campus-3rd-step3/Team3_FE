import { TEAM_REVIEW_API } from '@/src/constants/endpoints';
import { apiClient } from '@/src/lib/api_client';
import { TeamReviewRequest } from '@/src/types';

export const teamReviewApi = {
  createReview: (data: TeamReviewRequest) =>
    apiClient.post(TEAM_REVIEW_API.CREATE, data),

  getReviewsByTeamId: (reviewedTeamId: number) =>
    apiClient.get(TEAM_REVIEW_API.LIST(reviewedTeamId)),

  getReviewById: (reviewId: number) =>
    apiClient.get(TEAM_REVIEW_API.DETAIL(reviewId)),

  updateReview: (reviewId: number, data: TeamReviewRequest) =>
    apiClient.put(TEAM_REVIEW_API.DETAIL(reviewId), data),

  deleteReview: (reviewId: number) =>
    apiClient.delete(TEAM_REVIEW_API.DETAIL(reviewId)),
};
