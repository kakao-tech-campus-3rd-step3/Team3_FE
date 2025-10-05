import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cancelMatchRequestById } from '@/src/api/match';
import type { MatchRequestResponseDto } from '@/src/types/match';

export const useCancelMatchRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<MatchRequestResponseDto, Error, number | string>({
    mutationFn: async (requestId: number | string) => {
      return await cancelMatchRequestById(requestId);
    },
    onSuccess: () => {
      // 요청 목록 다시 갱신
      queryClient.invalidateQueries({ queryKey: ['my-applied-matches'] });
    },
  });
};
