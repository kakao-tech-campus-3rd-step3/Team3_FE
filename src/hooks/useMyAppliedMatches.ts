import { useQuery } from '@tanstack/react-query';

import { getMyAppliedMatches } from '@/src/api/match';
import type { MatchWaitingHistoryResponseDto } from '@/src/types/match';

export const useMyAppliedMatches = (options?: any) => {
  return useQuery<MatchWaitingHistoryResponseDto[]>({
    queryKey: ['my-applied-matches'],
    queryFn: async () => {
      const result = await getMyAppliedMatches();
      return result;
    },
    ...options,
  });
};
