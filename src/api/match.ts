import { TEAM_MATCH_API } from '@/src/constants/endpoints';
import { apiClient } from '@/src/lib/api_client';
import { Match, RecentMatchResponse } from '@/src/types/match';

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
