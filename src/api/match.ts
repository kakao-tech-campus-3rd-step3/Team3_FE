import {
  TEAM_MATCH_API,
  MATCH_CREATE_API,
  MATCH_REQUEST_API,
  MATCH_WAITING_API,
} from '@/src/constants/endpoints';
import { apiClient } from '@/src/lib/api_client';
import { FormatError, TeamMemberError } from '@/src/lib/errors';
import {
  Match,
  MatchCreateRequestDto,
  MatchCreateResponseDto,
  MatchRequestRequestDto,
  MatchRequestResponseDto,
  MatchConfirmedResponseDto,
  RecentMatchResponse,
  MatchWaitingResponseDto,
  MatchWaitingListRequestDto,
  MatchWaitingCancelResponseDto,
  MatchWaitingHistoryResponseDto,
  EnemyTeamResponseDto,
} from '@/src/types/match';
import { convertKSTToUTCTime } from '@/src/utils/timezone';

export const teamMatchApi = {
  getTeamMatches: (teamId: string | number) => {
    return apiClient.get<{ [key: string]: Match[] }>(
      TEAM_MATCH_API.GET_TEAM_RECENT_MATCHES()
    );
  },
  getTeamRecentMatches: (status?: string) => {
    const url = status
      ? `${TEAM_MATCH_API.GET_TEAM_RECENT_MATCHES()}?status=${status}`
      : TEAM_MATCH_API.GET_TEAM_RECENT_MATCHES();
    return apiClient.get<RecentMatchResponse[]>(url);
  },
  getTeamMatchRequests: () => {
    return apiClient.get<{
      content: MatchRequestResponseDto[];
      pageable: any;
      totalElements: number;
      totalPages: number;
      first: boolean;
      last: boolean;
      size: number;
      number: number;
      numberOfElements: number;
      empty: boolean;
    }>(TEAM_MATCH_API.GET_TEAM_MATCH_REQUESTS());
  },
  updateMatchRequest: (
    teamId: string | number,
    requestId: string | number,
    status: 'APPROVED' | 'REJECTED',
    reason?: string
  ) => {
    return apiClient.patch<MatchRequestResponseDto>(
      TEAM_MATCH_API.UPDATE_MATCH_REQUEST(teamId, requestId),
      { status, reason }
    );
  },
};

export async function createMatch(
  payload: MatchCreateRequestDto
): Promise<MatchCreateResponseDto> {
  return apiClient.post<MatchCreateResponseDto>(
    MATCH_CREATE_API.CREATE,
    payload
  );
}

export async function requestMatchApi(
  waitingId: number | string,
  payload: MatchRequestRequestDto
): Promise<MatchRequestResponseDto> {
  return apiClient.post<MatchRequestResponseDto>(
    MATCH_REQUEST_API.MATCH_REQUEST(waitingId),
    payload
  );
}

export async function acceptMatchRequestApi(
  requestId: number | string
): Promise<MatchConfirmedResponseDto> {
  const url = MATCH_REQUEST_API.ACCEPT_REQUEST(requestId);
  return apiClient.patch<MatchConfirmedResponseDto>(url);
}

export async function rejectMatchRequestApi(
  requestId: number | string
): Promise<MatchRequestResponseDto> {
  const url = MATCH_REQUEST_API.REJECT_REQUEST(requestId);
  return apiClient.patch<MatchRequestResponseDto>(url);
}

export async function getMatchWaitingList(
  params: MatchWaitingListRequestDto
): Promise<MatchWaitingResponseDto[]> {
  const queryParams = new URLSearchParams();
  queryParams.append('selectDate', params.selectDate);

  if (params.startTime && params.startTime.trim() !== '') {
    const kstDateTime = new Date(`${params.selectDate}T${params.startTime}`);
    if (isNaN(kstDateTime.getTime())) {
      queryParams.append('startTime', '00:00:00');
    } else {
      const utcTime = convertKSTToUTCTime(kstDateTime);
      queryParams.append('startTime', utcTime);
    }
  } else {
    queryParams.append('startTime', '00:00:00');
  }

  const url = `${MATCH_WAITING_API.GET_WAITING_LIST}?${queryParams.toString()}`;

  interface PageResponse {
    content: MatchWaitingResponseDto[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: any;
    size: number;
    sort: any;
  }

  try {
    const response = await apiClient.get<PageResponse>(url);
    return response.content || [];
  } catch (error: any) {
    throw error;
  }
}

export async function cancelMatchRequestApi(
  requestId: number | string
): Promise<MatchRequestResponseDto> {
  const url = MATCH_REQUEST_API.CANCEL_REQUEST(requestId);
  return apiClient.delete<MatchRequestResponseDto>(url);
}

export async function getMyCreatedMatches(): Promise<
  MatchWaitingResponseDto[]
> {
  try {
    const response = await apiClient.get<{
      content: MatchWaitingResponseDto[];
      empty: boolean;
      totalElements: number;
      totalPages: number;
      first: boolean;
      last: boolean;
    }>('/api/matches/waiting/me');

    return response.content || [];
  } catch (error) {
    throw error;
  }
}

export async function cancelCreatedMatchApi(
  waitingId: number | string
): Promise<MatchWaitingCancelResponseDto> {
  const url = MATCH_WAITING_API.CANCEL_WAITING(waitingId);
  return apiClient.patch<MatchWaitingCancelResponseDto>(url);
}

export async function getMyAppliedMatches(): Promise<
  MatchWaitingHistoryResponseDto[]
> {
  try {
    const response = await apiClient.get<
      | MatchWaitingHistoryResponseDto[]
      | {
          content: MatchWaitingHistoryResponseDto[];
          empty?: boolean;
          totalElements?: number;
          totalPages?: number;
          first?: boolean;
          last?: boolean;
        }
    >(MATCH_REQUEST_API.GET_MY_APPLIED_MATCHES);

    try {
      if (response && typeof response === 'object' && 'content' in response) {
        return response.content || [];
      }

      return Array.isArray(response) ? response : [];
    } catch (error) {
      if (error instanceof TypeError) {
        throw new FormatError(
          '매치 신청 내역 응답 데이터 형식이 올바르지 않습니다.'
        );
      }
      throw error;
    }
  } catch (error) {
    if (error instanceof FormatError) {
      return [];
    }
    if (error instanceof TeamMemberError) {
      return [];
    }
    throw error;
  }
}

export async function cancelMatchRequestById(
  requestId: number | string
): Promise<MatchRequestResponseDto> {
  try {
    const url = `${MATCH_REQUEST_API.CANCEL_REQUEST(requestId)}`;
    const response = await apiClient.delete<MatchRequestResponseDto>(url);
    return response;
  } catch (error) {
    throw error;
  }
}

export const getEnemyTeam = async (matchId: number | string) => {
  const response = await apiClient.get<EnemyTeamResponseDto>(
    MATCH_REQUEST_API.GET_ENEMY_TEAM(matchId)
  );
  return response;
};
