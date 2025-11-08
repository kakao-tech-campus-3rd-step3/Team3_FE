import * as api from '@/src/api';
import type {
  CreateTeamRequest,
  TeamMemberRole,
  SkillLevel,
  TeamType,
  JoinWaitingRequest,
  JoinWaitingCancelRequest,
} from '@/src/types';

export const teamQueries = {
  universityTeamList: {
    key: ['university'] as const,
    fn: () => api.universityListApi.getUniversities(),
  },
  teamsByUniversity: {
    key: ['teams', 'university'] as const,
    fn: (university: string, page: number = 0, size: number = 10) =>
      api.teamListApi.getTeamsByUniversity(university, page, size),
  },
  team: {
    key: (teamId: string | number) => ['teams', teamId] as const,
    fn: (teamId: string | number) => api.myTeamApi.getTeamById(teamId),
  },
  teamMembers: {
    key: (teamId: string | number, page: number = 0, size: number = 10) =>
      ['teamMembers', teamId, page, size] as const,
    fn: (teamId: string | number, page: number = 0, size: number = 10) =>
      api.teamMemberApi.getTeamMembers(teamId, page, size),
  },
  teamMember: {
    key: (teamId: string | number, userId: string | number) =>
      ['teamMember', teamId, userId] as const,
    fn: (teamId: string | number, userId: string | number) =>
      api.teamMemberApi.getTeamMember(teamId, userId),
  },
  teamJoinRequests: {
    key: (teamId: string | number) => ['teamJoinRequests', teamId] as const,
    fn: (teamId: string | number) =>
      api.teamJoinRequestApi.getTeamJoinRequests(teamId),
  },
  teamMatches: {
    key: (teamId: string | number) => ['teamMatches', teamId] as const,
    fn: (teamId: string | number) => api.teamMatchApi.getTeamMatches(teamId),
  },
  teamRecentMatches: {
    key: (status?: string) => ['teamRecentMatches', status] as const,
    fn: (status?: string) => api.teamMatchApi.getTeamRecentMatches(status),
  },
  teamJoinWaitingList: {
    key: (
      teamId: string | number,
      status: string = 'PENDING',
      isMercenary: boolean = false,
      page: number = 0,
      size: number = 10,
      sort: string = 'audit.createdAt,desc'
    ) =>
      [
        'teamJoinWaitingList',
        teamId,
        status,
        isMercenary,
        page,
        size,
        sort,
      ] as const,
    fn: (
      teamId: string | number,
      status: string = 'PENDING',
      isMercenary: boolean = false,
      page: number = 0,
      size: number = 10,
      sort: string = 'audit.createdAt,desc'
    ) =>
      api.teamJoinRequestApi.getTeamJoinWaitingList(
        teamId,
        status,
        isMercenary,
        page,
        size,
        sort
      ),
  },
  createTeam: {
    key: ['createTeam'] as const,
    fn: (teamData: CreateTeamRequest) => api.createTeam(teamData),
  },
  joinTeam: {
    key: ['joinTeam'] as const,
    fn: (teamId: number) => api.joinTeamApi.joinTeam(teamId),
  },
  removeMember: {
    key: ['removeMember'] as const,
    fn: ({
      teamId,
      userId,
    }: {
      teamId: string | number;
      userId: string | number;
    }) => api.teamMemberApi.removeMember(teamId, userId),
  },
  updateMemberRole: {
    key: ['updateMemberRole'] as const,
    fn: ({
      teamId,
      userId,
      role,
    }: {
      teamId: string | number;
      userId: string | number;
      role: TeamMemberRole;
    }) => api.teamMemberApi.updateMemberRole(teamId, userId, role),
  },
  updateTeam: {
    key: ['updateTeam'] as const,
    fn: ({
      teamId,
      data,
    }: {
      teamId: string | number;
      data: {
        name: string;
        description: string;
        university: string;
        skillLevel: SkillLevel;
        teamType: TeamType;
      };
    }) => api.teamEditApi.updateTeam(teamId, data),
  },
  deleteTeam: {
    key: ['deleteTeam'] as const,
    fn: (teamId: string | number) => api.teamDeleteApi.deleteTeam(teamId),
  },
  exitTeam: {
    key: ['exitTeam'] as const,
    fn: (teamId: string | number) => api.teamExitApi.exitTeam(teamId),
  },
  delegateLeadership: {
    key: ['delegateLeadership'] as const,
    fn: ({
      teamId,
      memberId,
    }: {
      teamId: string | number;
      memberId: string | number;
    }) => api.teamMemberApi.delegateLeadership(teamId, memberId),
  },
  joinWaiting: {
    key: ['joinWaiting'] as const,
    fn: ({
      teamId,
      data,
    }: {
      teamId: string | number;
      data: JoinWaitingRequest;
    }) => api.teamJoinRequestApi.joinWaiting(teamId, data),
  },
  cancelJoinRequest: {
    key: ['cancelJoinRequest'] as const,
    fn: ({
      teamId,
      joinWaitingId,
      data,
    }: {
      teamId: string | number;
      joinWaitingId: string | number;
      data: JoinWaitingCancelRequest;
    }) => api.teamJoinRequestApi.cancelJoinRequest(teamId, joinWaitingId, data),
  },
  approveJoinRequest: {
    key: ['approveJoinRequest'] as const,
    fn: ({
      teamId,
      requestId,
      role,
    }: {
      teamId: string | number;
      requestId: string | number;
      role: '회장' | '부회장' | '일반멤버';
    }) =>
      api.teamJoinRequestApi.approveJoinRequest(teamId, requestId, { role }),
  },
  rejectJoinRequest: {
    key: ['rejectJoinRequest'] as const,
    fn: ({
      teamId,
      requestId,
      reason,
    }: {
      teamId: string | number;
      requestId: string | number;
      reason: string;
    }) =>
      api.teamJoinRequestApi.rejectJoinRequest(teamId, requestId, { reason }),
  },
  teamMembersSlice: {
    key: (teamId: string | number) => ['teamMembersSlice', teamId] as const,
    fn: ({
      teamId,
      cursorId,
      size,
    }: {
      teamId: string | number;
      cursorId?: number;
      size: number;
    }) => api.teamMemberApi.getTeamMembersSlice(teamId, cursorId, size),
  },
  myJoinWaitingList: {
    key: (
      page: number = 0,
      size: number = 10,
      sort: string = 'audit.createdAt,desc',
      isMercenary: boolean = false
    ) => ['myJoinWaitingList', page, size, sort, isMercenary] as const,
    fn: (
      page: number = 0,
      size: number = 10,
      sort: string = 'audit.createdAt,desc',
      isMercenary: boolean = false
    ) =>
      api.userJoinWaitingApi.getMyJoinWaitingList(
        page,
        size,
        sort,
        isMercenary
      ),
  },
} as const;
