import { useQuery } from '@tanstack/react-query';

import { MATCH_WAITING_API } from '@/src/constants/endpoints';
import { apiClient } from '@/src/lib/api_client';
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
      const res = await apiClient.post<{
        content: MatchWaitingResponseDto[];
      }>(MATCH_WAITING_API.GET_WAITING_LIST, params);

      return res.content; // ✅ content 배열만 반환
    },
    ...options,
  });
};
