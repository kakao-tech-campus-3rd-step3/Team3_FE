import { useMutation, useQuery } from '@tanstack/react-query';

import { queryClient } from '@/src/lib/query_client';
import type {
  CreateLineupRequest,
  CreateLineupResponse,
  ApiLineupItem,
} from '@/src/types/lineup';

import { lineupQueries } from './queries';

export function useLineupDetail(lineupId?: number) {
  return useQuery<ApiLineupItem[]>({
    queryKey: lineupId
      ? lineupQueries.lineup.key(lineupId)
      : ['lineup', undefined],
    queryFn: () => lineupQueries.lineup.fn(lineupId as number),
    enabled: !!lineupId,
  });
}

export function useCreateLineupsMutation() {
  return useMutation<CreateLineupResponse, Error, CreateLineupRequest>({
    mutationFn: lineupQueries.createLineups.fn,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['teamMembers'] });
      queryClient.invalidateQueries({ queryKey: ['team'] });
    },
    onError: error => {
      console.error('라인업 생성 실패:', error);
    },
  });
}
