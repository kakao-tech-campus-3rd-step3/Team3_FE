import { TEAM_MATCH_API } from '@/src/constants/endpoints';
import { apiClient } from '@/src/lib/api_client';
import { Match } from '@/src/types/match';

export const teamMatchApi = {
  getTeamMatches: (teamId: string | number) => {
    return apiClient.get<{ [key: string]: Match[] }>(
      TEAM_MATCH_API.GET_TEAM_RECENT_MATCHES(teamId)
    );
  },
};
