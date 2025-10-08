import { useQuery } from '@tanstack/react-query';

import { getEnemyTeam } from '@/src/api/match';
import type { EnemyTeamResponseDto } from '@/src/types/match';

/**
 * ✅ 상대 팀 정보 조회 훅
 * @param matchId 매치 ID (string 또는 number)
 * @returns React Query useQuery 객체
 */
export const useEnemyTeam = (matchId: number | string | undefined) => {
  return useQuery<EnemyTeamResponseDto>({
    queryKey: ['enemy-team', matchId], // 캐싱 key (matchId별로 분리)
    queryFn: () => getEnemyTeam(matchId!), // matchId가 존재할 때만 호출
    enabled: !!matchId, // matchId가 있을 때만 API 실행
    staleTime: 1000 * 60 * 5, // (선택) 5분간 캐싱 유지
    retry: 1, // 실패 시 재시도 1회
  });
};
