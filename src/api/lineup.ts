import { LINEUP_API } from '@/src/constants/endpoints';
import { apiClient } from '@/src/lib/api_client';
import { FormatError } from '@/src/lib/errors';
import type {
  CreateLineupRequest,
  ApiCreateLineupResponse,
  CreateLineupResponse,
  ApiLineupItem,
} from '@/src/types/lineup';

const transformCreateLineupResponse = (
  apiResponse: ApiCreateLineupResponse
): CreateLineupResponse => {
  try {
    return apiResponse.map(item => ({
      id: item.id,
      lineupId: item.lineupId,
      teamMemberId: item.teamMemberId,
      position: item.position,
      isStarter: item.isStarter,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
  } catch (error) {
    if (error instanceof TypeError) {
      throw new FormatError('라인업 응답 데이터 형식이 올바르지 않습니다.');
    }
    throw error;
  }
};

export const lineupApi = {
  createLineups: async (
    data: CreateLineupRequest
  ): Promise<CreateLineupResponse> => {
    try {
      const apiResponse = await apiClient.post<ApiCreateLineupResponse>(
        LINEUP_API.CREATE,
        data
      );

      return transformCreateLineupResponse(apiResponse);
    } catch (error) {
      throw error;
    }
  },
};

export async function getLineupById(
  lineupId: number
): Promise<ApiLineupItem[]> {
  const res = await apiClient.get<ApiLineupItem[]>(
    LINEUP_API.GET_LINEUP(lineupId)
  );
  return res;
}
