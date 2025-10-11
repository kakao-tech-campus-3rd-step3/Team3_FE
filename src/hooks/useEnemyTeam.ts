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
    queryKey: ['enemy-team', matchId], // matchId별 캐싱
    queryFn: () => getEnemyTeam(matchId!), // 존재할 때만 호출
    enabled: !!matchId, // matchId 없으면 실행 안 함
  });
};
