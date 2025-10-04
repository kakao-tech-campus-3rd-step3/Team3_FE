import {
  TEAM_API,
  TEAM_MEMBER_API,
  USER_JOIN_WAITING_API,
} from '@/src/constants/endpoints';
import { apiClient } from '@/src/lib/api_client';
import type {
  CreateTeamRequest,
  CreateTeamResponse,
  TeamDetailResponse,
  ApiTeamDetailResponse,
  JoinTeamResponse,
  TeamListPageResponse,
  ApiTeamListPageResponse,
  TeamMember,
  ApiTeamMember,
  TeamMemberPageResponse,
  ApiTeamMemberPageResponse,
  TeamMemberRole,
  SkillLevel,
  TeamType,
  JoinRequest,
  TeamJoinRequestPageResponse,
  ApiTeamJoinRequestPageResponse,
  JoinWaitingRequest,
  JoinWaitingResponse,
  JoinWaitingApproveRequest,
  JoinWaitingRejectRequest,
  JoinWaitingCancelRequest,
  ApiUserJoinWaitingPageResponse,
  UserJoinWaitingPageResponse,
  ApiUserJoinWaitingItem,
  UserJoinWaitingItem,
} from '@/src/types/team';
import {
  transformTeamListPageResponse,
  transformTeamDetailResponse,
  transformTeamMemberPageResponse,
  transformTeamMemberItem,
  transformTeamJoinRequestPageResponse,
  transformUserJoinWaitingPageResponse,
  getTeamTypeInEnglish,
  getSkillLevelInEnglish,
} from '@/src/utils/team';

export const createTeam = (data: CreateTeamRequest) => {
  const apiData = {
    ...data,
    teamType: getTeamTypeInEnglish(data.teamType),
    skillLevel: getSkillLevelInEnglish(data.skillLevel),
  };
  return apiClient.post<CreateTeamResponse>(TEAM_API.CREATE, apiData);
};

export const universityListApi = {
  getUniversities: () =>
    apiClient.get<{ id: number; name: string }[]>(TEAM_API.GET_UNIVERSITY_LIST),
};

export const teamListApi = {
  getTeamsByUniversity: async (
    university: string,
    page: number = 0,
    size: number = 10
  ): Promise<TeamListPageResponse> => {
    const params = new URLSearchParams({
      university: university,
      page: page.toString(),
      size: size.toString(),
    });
    const apiResponse = await apiClient.get<ApiTeamListPageResponse>(
      `${TEAM_API.GET_TEAMS_BY_UNIVERSITY}?${params.toString()}`
    );
    return transformTeamListPageResponse(apiResponse);
  },
};

export const myTeamApi = {
  getTeamById: async (teamId: string | number): Promise<TeamDetailResponse> => {
    const apiResponse = await apiClient.get<ApiTeamDetailResponse>(
      TEAM_API.DETAIL(teamId)
    );
    return transformTeamDetailResponse(apiResponse);
  },
};

export const teamMemberApi = {
  getTeamMembers: async (
    teamId: string | number,
    page: number = 0,
    size: number = 10
  ): Promise<TeamMemberPageResponse> => {
    const apiResponse = await apiClient.get<ApiTeamMemberPageResponse>(
      TEAM_MEMBER_API.GET_MEMBERS(teamId, page, size)
    );
    return transformTeamMemberPageResponse(apiResponse);
  },

  getTeamMember: async (
    teamId: string | number,
    userId: string | number
  ): Promise<TeamMember> => {
    const apiResponse = await apiClient.get<ApiTeamMember>(
      TEAM_MEMBER_API.GET_MEMBER(teamId, userId)
    );
    return transformTeamMemberItem(apiResponse);
  },

  updateMemberRole: (
    teamId: string | number,
    userId: string | number,
    role: TeamMemberRole
  ): Promise<TeamMember> => {
    return apiClient.put<TeamMember>(
      TEAM_MEMBER_API.UPDATE_ROLE(teamId, userId),
      {
        role,
      }
    );
  },

  removeMember: (
    teamId: string | number,
    userId: string | number
  ): Promise<{ success: boolean; message: string }> => {
    return apiClient.delete<{ success: boolean; message: string }>(
      TEAM_MEMBER_API.REMOVE_MEMBER(teamId, userId)
    );
  },
};

export const joinTeamApi = {
  joinTeam: (teamId: number) =>
    apiClient.post<JoinTeamResponse>(TEAM_API.JOIN_TEAM, { teamId }),
};

export const teamExitApi = {
  exitTeam: (teamId: string | number): Promise<void> => {
    return apiClient.delete<void>(TEAM_API.EXIT_TEAM(teamId));
  },
};

export const teamEditApi = {
  updateTeam: async (
    teamId: string | number,
    data: {
      name: string;
      description: string;
      university: string;
      skillLevel: SkillLevel;
      teamType: TeamType;
    }
  ): Promise<TeamDetailResponse> => {
    const apiData = {
      name: data.name,
      description: data.description,
      university: data.university,
      skillLevel: getSkillLevelInEnglish(data.skillLevel),
      teamType: getTeamTypeInEnglish(data.teamType),
    };
    const apiResponse = await apiClient.put<ApiTeamDetailResponse>(
      TEAM_API.UPDATE(teamId),
      apiData
    );
    return transformTeamDetailResponse(apiResponse);
  },
};

export const teamJoinRequestApi = {
  getTeamJoinRequests: (teamId: string | number) => {
    return apiClient.get<JoinRequest[]>(TEAM_API.GET_JOIN_REQUESTS(teamId));
  },

  getTeamJoinWaitingList: async (
    teamId: string | number,
    status: string = 'PENDING',
    page: number = 0,
    size: number = 10,
    sort: string = 'createdAt,desc'
  ): Promise<TeamJoinRequestPageResponse> => {
    const params = new URLSearchParams({
      status,
      page: page.toString(),
      size: size.toString(),
      sort,
    });
    const apiResponse = await apiClient.get<ApiTeamJoinRequestPageResponse>(
      `${TEAM_API.GET_JOIN_WAITING_LIST(teamId)}?${params.toString()}`
    );

    return transformTeamJoinRequestPageResponse(apiResponse);
  },

  joinWaiting: (teamId: string | number, data: JoinWaitingRequest) => {
    return apiClient.post<JoinWaitingResponse>(
      TEAM_API.JOIN_WAITING(teamId),
      data
    );
  },

  approveJoinRequest: (
    teamId: string | number,
    requestId: string | number,
    data: JoinWaitingApproveRequest
  ) => {
    return apiClient.post<JoinWaitingResponse>(
      TEAM_API.APPROVE_JOIN_REQUEST(teamId, requestId),
      data
    );
  },

  rejectJoinRequest: (
    teamId: string | number,
    requestId: string | number,
    data: JoinWaitingRejectRequest
  ) => {
    return apiClient.post<JoinWaitingResponse>(
      TEAM_API.REJECT_JOIN_REQUEST(teamId, requestId),
      data
    );
  },

  cancelJoinRequest: (
    teamId: string | number,
    joinWaitingId: string | number,
    data: JoinWaitingCancelRequest
  ) => {
    return apiClient.post<JoinWaitingResponse>(
      TEAM_API.CANCEL_JOIN_REQUEST(teamId, joinWaitingId),
      data
    );
  },
};
export const teamDeleteApi = {
  deleteTeam: (
    teamId: string | number
  ): Promise<{ success: boolean; message: string }> => {
    return apiClient.delete<{ success: boolean; message: string }>(
      TEAM_API.DELETE(teamId)
    );
  },

  getTeamMatches: async (teamId: string | number) => {
    try {
      let matchRequests = null;
      try {
        matchRequests = await apiClient.get('/api/matches/receive/me/pending');
      } catch {
        // 매치 요청 조회 실패
      }

      let recentMatches = null;
      try {
        recentMatches = await apiClient.get('/api/teams/me/matches');
      } catch {
        // 최근 매치 조회 실패
      }

      let matchWaiting = null;
      try {
        matchWaiting = await apiClient.get(
          `/api/matches/waiting?teamId=${teamId}`
        );
      } catch {
        // 매치 대기 목록 조회 실패
      }

      const result = {
        matchRequests,
        recentMatches,
        matchWaiting,
      };

      return result;
    } catch {
      return {
        matchRequests: null,
        recentMatches: null,
        matchWaiting: null,
      };
    }
  },
};

export const userJoinWaitingApi = {
  getMyJoinWaitingList: async (
    page: number = 0,
    size: number = 10,
    sort: string = 'createdAt,desc'
  ): Promise<UserJoinWaitingPageResponse> => {
    const apiResponse = await apiClient.get<ApiUserJoinWaitingPageResponse>(
      USER_JOIN_WAITING_API.GET_MY_JOIN_WAITING(page, size, sort)
    );
    return transformUserJoinWaitingPageResponse(apiResponse);
  },
};
