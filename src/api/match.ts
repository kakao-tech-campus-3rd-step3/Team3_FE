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
  MatchWaitingCancelResponseDto,
  MatchWaitingHistoryResponseDto,
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

export async function getMatchWaitingList(
  params: MatchWaitingListRequestDto
): Promise<MatchWaitingResponseDto[]> {
  const queryParams = new URLSearchParams();
  queryParams.append('selectDate', params.selectDate);

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

  try {
    const response = await apiClient.get<PageResponse>(url);

    return response.content || [];
  } catch (error) {
    console.error('API 에러:', error);
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

    // content 배열만 리턴
    return response.content || [];
  } catch (error) {
    console.error('❌ getMyCreatedMatches API 에러:', error);
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
    const response = await apiClient.get<{
      content: MatchWaitingHistoryResponseDto[];
      empty: boolean;
      totalElements: number;
      totalPages: number;
      first: boolean;
      last: boolean;
    }>(MATCH_REQUEST_API.GET_MY_APPLIED_MATCHES);

    // content 배열만 리턴
    return response.content || [];
  } catch (error) {
    console.error('❌ getMyAppliedMatches API 에러:', error);
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
    console.error('❌ cancelMatchRequestById API 에러:', error);
    throw error;
  }
}
