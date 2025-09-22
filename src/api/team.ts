import {
  TEAM_API,
  TEAM_MEMBER_API,
  TEAM_REVIEW_API,
} from '@/src/constants/endpoints';
import { apiClient } from '@/src/lib/api_client';
import type { TeamReview } from '@/src/types/review';
import type {
  CreateTeamRequest,
  CreateTeamResponse,
  UpdateTeamRequest,
  TeamDetailResponse,
  JoinTeamResponse,
  PagedTeamListResponse,
  TeamMember,
  TeamMemberRole,
  JoinRequest,
} from '@/src/types/team';

export const createTeam = (data: CreateTeamRequest) =>
  apiClient.post<CreateTeamResponse>(TEAM_API.CREATE, data);

export const universityListApi = {
  getUniversities: () =>
    apiClient.get<{ id: number; name: string }[]>(TEAM_API.GET_UNIVERSITY_LIST),
};

export const teamListApi = {
  getTeamsByUniversity: (university: string, page = 0, size = 10) =>
    apiClient.get<PagedTeamListResponse>(
      `${TEAM_API.GET_TEAMS_BY_UNIVERSITY}?university=${encodeURIComponent(university)}&page=${page}&size=${size}`
    ),
};

export const myTeamApi = {
  getTeamById: (teamId: string | number) =>
    apiClient.get<TeamDetailResponse>(TEAM_API.DETAIL(teamId)),
};

export const teamMemberApi = {
  getTeamMembers: (teamId: string | number): Promise<TeamMember[]> => {
    return apiClient.get<TeamMember[]>(TEAM_MEMBER_API.GET_MEMBERS(teamId));
  },

  updateMemberRole: (
    memberId: number,
    role: TeamMemberRole
  ): Promise<TeamMember> => {
    return apiClient.put<TeamMember>(TEAM_MEMBER_API.UPDATE_ROLE(memberId), {
      role,
    });
  },

  removeMember: (
    memberId: number
  ): Promise<{ success: boolean; message: string }> => {
    return apiClient.delete<{ success: boolean; message: string }>(
      TEAM_MEMBER_API.REMOVE_MEMBER(memberId)
    );
  },
};

export const teamReviewApi = {
  getTeamReviews: (teamId: string | number) => {
    return apiClient.get<TeamReview[]>(TEAM_REVIEW_API.GET_REVIEWS(teamId));
  },
};

export const joinTeamApi = {
  joinTeam: (teamId: number) =>
    apiClient.post<JoinTeamResponse>(TEAM_API.JOIN_TEAM, { teamId }),
};

export const teamEditApi = {
  updateTeam: (
    teamId: string | number,
    data: UpdateTeamRequest
  ): Promise<TeamDetailResponse> => {
    return apiClient.put<TeamDetailResponse>(TEAM_API.UPDATE(teamId), data);
  },
};

export const teamJoinRequestApi = {
  getTeamJoinRequests: (teamId: string | number) => {
    return apiClient.get<JoinRequest[]>('/joinRequests');
  },
};
export const deleteTeam = (teamId: string | number) =>
  apiClient.delete(TEAM_API.DELETE(teamId));
