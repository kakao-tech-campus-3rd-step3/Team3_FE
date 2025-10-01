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
      // ✅ 신청 성공 시 관련 데이터 갱신
      qc.invalidateQueries({ queryKey: ['match-waiting-list'] });
    },
  });
}
