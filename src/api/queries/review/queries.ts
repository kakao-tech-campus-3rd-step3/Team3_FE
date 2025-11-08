import * as api from '@/src/api';
import type { TeamReviewRequest } from '@/src/types';

export const reviewQueries = {
  createTeamReview: {
    key: ['createTeamReview'] as const,
    fn: (data: TeamReviewRequest) => api.teamReviewApi.createReview(data),
  },
} as const;
