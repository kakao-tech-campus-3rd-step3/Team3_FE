// src/hooks/useCreateMatch.ts
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
      // ✅ 새로 생성된 매치가 바로 반영되도록 무효화
      queryClient.invalidateQueries({ queryKey: ['my-created-matches'] });
    },
  });
};
