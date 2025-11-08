import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/src/lib/query_client';

import { reviewQueries } from './queries';

export function useCreateTeamReviewMutation() {
  return useMutation({
    mutationFn: reviewQueries.createTeamReview.fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamRecentMatches'] });
    },
    onError: (error: unknown) => {
      console.error('팀 리뷰 등록 실패:', error);
    },
  });
}
