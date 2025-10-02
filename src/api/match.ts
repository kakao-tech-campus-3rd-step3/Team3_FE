import {
  TEAM_MATCH_API,
  MATCH_CREATE_API,
  MATCH_REQUEST_API,
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
  getTeamMatchRequests: (teamId: string | number) => {
    return apiClient.get<{
      content: MatchRequestResponseDto[];
      empty: boolean;
      first: boolean;
      last: boolean;
      number: number;
      numberOfElements: number;
      pageable: {
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        sort: any;
        unpaged: boolean;
      };
      size: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
    }>(TEAM_MATCH_API.GET_TEAM_MATCH_REQUESTS(teamId));
  },
  updateMatchRequest: (
    teamId: string | number,
    requestId: string | number,
    status: 'APPROVED' | 'REJECTED',
    reason?: string
  ) => {
    return apiClient.put<MatchRequestResponseDto>(
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
