import { useMutation } from '@tanstack/react-query';

import {
  createMatch,
  MatchCreateRequestDto,
  MatchCreateResponseDto,
} from '@/src/api/match';

export function useCreateMatch() {
  return useMutation<MatchCreateResponseDto, Error, MatchCreateRequestDto>({
    mutationFn: createMatch,
  });
}
