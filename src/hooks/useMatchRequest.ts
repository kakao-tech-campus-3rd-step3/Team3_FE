import { useMutation, useQueryClient } from '@tanstack/react-query';

import { requestMatchApi } from '@/src/api/match';
import type {
  MatchRequestRequestDto,
  MatchRequestResponseDto,
} from '@/src/types/match';

type Vars = {
  waitingId: number | string;
  payload: MatchRequestRequestDto;
};

export function useMatchRequest() {
  const qc = useQueryClient();

  return useMutation<MatchRequestResponseDto, unknown, Vars>({
    mutationFn: ({ waitingId, payload }) => requestMatchApi(waitingId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['match-waiting-list'] });
    },
  });
}
