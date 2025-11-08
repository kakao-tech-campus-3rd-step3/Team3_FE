import {
  TEAM_API,
  TEAM_MATCH_API,
  TEAM_MEMBER_API,
  USER_JOIN_WAITING_API,
  MATCH_WAITING_API,
} from '@/src/constants/endpoints';
import { apiClient } from '@/src/lib/api_client';
import { FormatError } from '@/src/lib/errors';
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
  TeamMemberSliceResponse,
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
  getRoleInKorean,
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
    size: number = 10,
    includedDeleted: boolean = false
  ): Promise<TeamListPageResponse> => {
    const params = new URLSearchParams({
      university: university,
      page: page.toString(),
      size: size.toString(),
      includedDeleted: includedDeleted.toString(),
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

    const transformed = transformTeamMemberPageResponse(apiResponse);

    return transformed;
  },

  getTeamMembersSlice: async (
    teamId: string | number,
    cursorId?: number,
    size: number = 10
  ): Promise<TeamMemberSliceResponse> => {
    try {
      const apiResponse = await apiClient.get<ApiTeamMemberPageResponse>(
        TEAM_MEMBER_API.GET_MEMBERS_SLICE(teamId, cursorId, size)
      );

      const members = apiResponse.content ?? [];
      const hasNext = apiResponse.last === false;

      try {
        return {
          members: members.map(transformTeamMemberItem),
          hasNext,
        };
      } catch (error) {
        if (error instanceof TypeError) {
          throw new FormatError('팀 멤버 데이터 형식이 올바르지 않습니다.');
        }
        throw error;
      }
    } catch (error) {
      if (error instanceof FormatError) {
        return { members: [], hasNext: false };
      }
      return { members: [], hasNext: false };
    }
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
        role: getRoleInKorean(role),
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

  delegateLeadership: (
    teamId: string | number,
    memberId: string | number
  ): Promise<TeamMember> => {
    return apiClient.post<TeamMember>(
      TEAM_MEMBER_API.DELEGATE_LEADERSHIP(teamId, memberId),
      {}
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
    isMercenary: boolean = false,
    page: number = 0,
    size: number = 10,
    sort: string = 'audit.createdAt,desc'
  ): Promise<TeamJoinRequestPageResponse> => {
    const params = new URLSearchParams({
      status,
      isMercenary: isMercenary.toString(),
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
        matchRequests = await apiClient.get(
          TEAM_MATCH_API.GET_TEAM_MATCH_REQUESTS()
        );
      } catch {}

      let recentMatches = null;
      try {
        recentMatches = await apiClient.get(
          TEAM_MATCH_API.GET_TEAM_RECENT_MATCHES()
        );
      } catch {}

      let matchWaiting = null;
      try {
        matchWaiting = await apiClient.get(
          MATCH_WAITING_API.GET_WAITING_LIST_BY_TEAM(teamId)
        );
      } catch {}

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
    sort: string = 'audit.createdAt,desc',
    isMercenary: boolean = false
  ): Promise<UserJoinWaitingPageResponse> => {
    const apiResponse = await apiClient.get<ApiUserJoinWaitingPageResponse>(
      USER_JOIN_WAITING_API.GET_MY_JOIN_WAITING(page, size, sort, isMercenary)
    );
    return transformUserJoinWaitingPageResponse(apiResponse);
  },
};
