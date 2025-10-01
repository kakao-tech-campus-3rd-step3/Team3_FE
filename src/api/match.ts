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
  RecentMatchResponse,
} from '@/src/types/match';

export const teamMatchApi = {
  getTeamMatches: (teamId: string | number) => {
    return apiClient.get<{ [key: string]: Match[] }>(
      TEAM_MATCH_API.GET_TEAM_RECENT_MATCHES(teamId)
    );
  },
  getTeamRecentMatches: (teamId: string | number, status?: string) => {
    const url = status
      ? `${TEAM_MATCH_API.GET_TEAM_RECENT_MATCHES(teamId)}?status=${status}`
      : TEAM_MATCH_API.GET_TEAM_RECENT_MATCHES(teamId);
    return apiClient.get<RecentMatchResponse[]>(url);
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
