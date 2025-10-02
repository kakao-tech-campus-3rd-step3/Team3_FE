import {
  TEAM_MATCH_API,
  MATCH_CREATE_API,
  MATCH_REQUEST_API,
  MATCH_WAITING_API,
} from '@/src/constants/endpoints';
import { apiClient } from '@/src/lib/api_client';
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
} from '@/src/types/match';

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

// 매치 대기 목록 조회 API (GET 방식, Query 파라미터)
export async function getMatchWaitingList(
  params: MatchWaitingListRequestDto
): Promise<MatchWaitingResponseDto[]> {
  const queryParams = new URLSearchParams();
  queryParams.append('teamId', params.teamId.toString());
  queryParams.append('selectDate', params.selectDate);
  // 백엔드에서 startTime이 필수이므로 기본값 제공
  queryParams.append('startTime', params.startTime || '00:00:00');

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

  const response = await apiClient.get<PageResponse>(url);
  return response.content || [];
}

// 매치 요청 취소 API
export async function cancelMatchRequestApi(
  requestId: number | string
): Promise<MatchRequestResponseDto> {
  const url = MATCH_REQUEST_API.CANCEL_REQUEST(requestId);
  return apiClient.delete<MatchRequestResponseDto>(url);
}
