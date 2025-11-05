import { LINEUP_API } from '@/src/constants/endpoints';
import { apiClient } from '@/src/lib/api_client';
import type {
  CreateLineupRequest,
  ApiCreateLineupResponse,
  CreateLineupResponse,
  ApiLineupItem,
} from '@/src/types/lineup';

/**
 * 서버 응답을 클라이언트 모델로 변환하는 함수
 * (현재는 구조 동일, 필요 시 날짜 포맷/정렬 등 추가 가능)
 */
const transformCreateLineupResponse = (
  apiResponse: ApiCreateLineupResponse
): CreateLineupResponse => {
  return apiResponse.map(item => ({
    id: item.id,
    lineupId: item.lineupId,
    teamMemberId: item.teamMemberId,
    position: item.position,
    isStarter: item.isStarter,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));
};

/**
 * 라인업 생성 API
 * - POST /api/lineups
 * - 요청: 11명 이상 CreateLineupItem[] 배열
 * - 응답: 생성된 라인업 배열
 */
export const lineupApi = {
  createLineups: async (
    data: CreateLineupRequest
  ): Promise<CreateLineupResponse> => {
    try {
      const apiResponse = await apiClient.post<ApiCreateLineupResponse>(
        LINEUP_API.CREATE,
        data
      );

      // 변환 함수로 클라이언트 모델로 매핑
      return transformCreateLineupResponse(apiResponse);
    } catch (error) {
      console.error('❌ [API ERROR] createLineups 실패:', error);
      throw error;
    }
  },
};

export async function getLineupById(
  lineupId: number
): Promise<ApiLineupItem[]> {
  // 서버는 배열을 반환
  const res = await apiClient.get<ApiLineupItem[]>(
    LINEUP_API.GET_LINEUP(lineupId)
  );
  return res;
}
