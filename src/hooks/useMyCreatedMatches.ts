import { useQuery } from '@tanstack/react-query';

import { getMyCreatedMatches } from '@/src/api/match';
import type { MatchWaitingResponseDto } from '@/src/types/match';

export const useMyCreatedMatches = (options?: any) => {
  return useQuery<MatchWaitingResponseDto[]>({
    queryKey: ['my-created-matches'],
    queryFn: async () => {
      const result = await getMyCreatedMatches();
      return result;
    },
    ...options,
  });
};
