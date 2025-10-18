import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createMatch } from '@/src/api/match';
import type {
  MatchCreateRequestDto,
  MatchCreateResponseDto,
} from '@/src/types/match';

export const useCreateMatch = () => {
  const queryClient = useQueryClient();

  return useMutation<MatchCreateResponseDto, Error, MatchCreateRequestDto>({
    mutationFn: createMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-created-matches'] });
    },
  });
};
