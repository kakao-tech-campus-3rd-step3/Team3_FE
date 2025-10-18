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
      queryClient.invalidateQueries({ queryKey: ['my-applied-matches'] });
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
    },
  });
};
