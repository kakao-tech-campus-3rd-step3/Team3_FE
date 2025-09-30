import { TEAM_MATCH_API, MATCH_CREATE_API } from '@/src/constants/endpoints';
import { apiClient } from '@/src/lib/api_client';
import { Match } from '@/src/types/match';

export const teamMatchApi = {
  getTeamMatches: (teamId: string | number) => {
    return apiClient.get<{ [key: string]: Match[] }>(
      TEAM_MATCH_API.GET_TEAM_RECENT_MATCHES(teamId)
    );
  },
};

export interface MatchCreateRequestDto {
  teamId: number;
  preferredDate: string; // "YYYY-MM-DD"
  preferredTimeStart: string; // "HH:mm:ss"
  preferredTimeEnd: string; // "HH:mm:ss"
  preferredVenueId: number;
  skillLevelMin: string; // "AMATEUR" | "PRO" 등
  skillLevelMax: string;
  universityOnly: boolean;
  message: string;
}

export interface MatchCreateResponseDto {
  waitingId: number;
  teamId: number;
  status: string; // e.g. "WAITING"
  expiresAt: string;
}

export async function createMatch(
  payload: MatchCreateRequestDto
): Promise<MatchCreateResponseDto> {
  return apiClient.post<MatchCreateResponseDto>(
    MATCH_CREATE_API.CREATE,
    payload
  );
}
