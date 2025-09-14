import { apiClient } from '@/src/lib/api_client';
import { TEAM_API } from '@/src/constants/endpoints';
import type {
  CreateTeamRequest,
  CreateTeamResponse,
  JoinTeamResponse,
  TeamListItem,
} from '@/src/types';

export const createTeamApi = {
  createTeam: (teamData: CreateTeamRequest) =>
    apiClient.post<CreateTeamResponse>(TEAM_API.CREATE_TEAM, teamData),
};

export const universityListApi = {
  getUniversities: () =>
    apiClient.get<{ id: number; name: string }[]>(TEAM_API.GET_UNIVERSITY_LIST),
};

export const teamListApi = {
  getTeamsByUniversity: (university: string) =>
    apiClient.get<TeamListItem[]>(
      `${TEAM_API.GET_TEAMS_BY_UNIVERSITY}?university=${encodeURIComponent(university)}`
    ),
};

export const joinTeamApi = {
  joinTeam: (teamId: number) =>
    apiClient.post<JoinTeamResponse>(TEAM_API.JOIN_TEAM, { teamId }),
};
