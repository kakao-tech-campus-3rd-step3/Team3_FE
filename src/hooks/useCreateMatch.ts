import { useMutation } from '@tanstack/react-query';

import { createMatch } from '@/src/api/match';

import { MatchCreateRequestDto, MatchCreateResponseDto } from '../types';

export function useCreateMatch() {
  return useMutation<MatchCreateResponseDto, Error, MatchCreateRequestDto>({
    mutationFn: createMatch,
  });
}
