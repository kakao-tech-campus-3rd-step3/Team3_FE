import { useQuery } from '@tanstack/react-query';

import { getMatchWaitingList } from '@/src/api/match';
import type {
  MatchWaitingListRequestDto,
  MatchWaitingResponseDto,
} from '@/src/types/match';

export const useMatchWaitingList = (
  params: MatchWaitingListRequestDto,
  options?: any
) => {
  return useQuery<MatchWaitingResponseDto[]>({
    queryKey: ['match-waiting-list', params],
    queryFn: async () => {
      return getMatchWaitingList(params);
    },
    ...options,
  });
};
