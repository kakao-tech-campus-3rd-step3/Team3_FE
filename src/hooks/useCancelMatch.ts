import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cancelCreatedMatchApi } from '@/src/api/match';
import type { MatchWaitingCancelResponseDto } from '@/src/types/match';

export const useCancelMatch = () => {
  const queryClient = useQueryClient();

  return useMutation<
    MatchWaitingCancelResponseDto,
    Error,
    number // waitingId
  >({
    mutationFn: (waitingId: number) => cancelCreatedMatchApi(waitingId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['my-created-matches'], // ✅ v5 호환 문법
      });
    },
  });
};
