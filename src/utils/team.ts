import type {
  TeamType,
  SkillLevel,
  TeamMemberRole,
  ApiTeamListItem,
  TeamListItem,
  ApiTeamListPageResponse,
  TeamListPageResponse,
  ApiTeamDetailResponse,
  TeamDetailResponse,
  ApiTeamMember,
  TeamMember,
  ApiTeamMemberPageResponse,
  TeamMemberPageResponse,
  ApiTeamJoinRequest,
  TeamJoinRequest,
  ApiTeamJoinRequestPageResponse,
  TeamJoinRequestPageResponse,
  ApiUserJoinWaitingItem,
  UserJoinWaitingItem,
  ApiUserJoinWaitingPageResponse,
  UserJoinWaitingPageResponse,
} from '@/src/types/team';

export const TEAM_TYPE_MAPPING: Record<string, TeamType> = {
  CENTRAL_CLUB: '중앙동아리',
  DEPARTMENT_CLUB: '과동아리',
  OTHER: '기타',
};

export const SKILL_LEVEL_MAPPING: Record<string, SkillLevel> = {
  AMATEUR: '아마추어',
  SEMI_PRO: '세미프로',
  PRO: '프로',
};

export const getTeamTypeInKorean = (apiType: string): TeamType => {
  return TEAM_TYPE_MAPPING[apiType] || '기타';
};

export const getSkillLevelInKorean = (apiLevel: string): SkillLevel => {
  return SKILL_LEVEL_MAPPING[apiLevel] || '아마추어';
};

export const getTeamTypeInEnglish = (koreanType: TeamType): string => {
  return koreanType;
};

export const getSkillLevelInEnglish = (koreanLevel: SkillLevel): string => {
  return koreanLevel;
};

export const transformTeamListItem = (
  apiItem: ApiTeamListItem
): TeamListItem => {
  return {
    ...apiItem,
    skillLevel: getSkillLevelInKorean(apiItem.skillLevel),
    teamType: getTeamTypeInKorean(apiItem.teamType),
  };
};

export const transformTeamListPageResponse = (
  apiResponse: ApiTeamListPageResponse
): TeamListPageResponse => {
  return {
    ...apiResponse,
    content: apiResponse.content.map(transformTeamListItem),
  };
};

export const transformTeamDetailResponse = (
  apiResponse: ApiTeamDetailResponse
): TeamDetailResponse => {
  return {
    id: apiResponse.id,
    name: apiResponse.name,
    description: apiResponse.description,
    university: apiResponse.university,
    skillLevel: getSkillLevelInKorean(apiResponse.skillLevel),
    teamType: getTeamTypeInKorean(apiResponse.teamType),
    memberCount: apiResponse.memberCount,
    createdAt: apiResponse.createdAt,
  };
};

export const transformTeamMemberItem = (apiItem: ApiTeamMember): TeamMember => {
  return {
    id: apiItem.id,
    userId: apiItem.userId,
    name: apiItem.name,
    email: apiItem.email,
    position: apiItem.position,
    role: apiItem.role,
    joinedAt: apiItem.joinedAt,
  };
};

export const transformTeamMemberPageResponse = (
  apiResponse: ApiTeamMemberPageResponse
): TeamMemberPageResponse => {
  return {
    ...apiResponse,
    content: apiResponse.content.map(transformTeamMemberItem),
  };
};

export const getRoleDisplayName = (role: TeamMemberRole): string => {
  const roleMapping: Record<TeamMemberRole, string> = {
    LEADER: '회장',
    VICE_LEADER: '부회장',
    MEMBER: '팀원',
  };
  return roleMapping[role] || '팀원';
};

export const JOIN_REQUEST_STATUS_MAPPING: Record<
  string,
  TeamJoinRequest['status']
> = {
  대기중: 'PENDING',
  승인: 'APPROVED',
  거절: 'REJECTED',
  취소: 'CANCELED',
};

export const getJoinRequestStatusInEnglish = (
  koreanStatus: string
): TeamJoinRequest['status'] => {
  return JOIN_REQUEST_STATUS_MAPPING[koreanStatus] || 'PENDING';
};

export const transformTeamJoinRequestItem = (
  apiItem: ApiTeamJoinRequest
): TeamJoinRequest => {
  return {
    id: apiItem.id,
    teamId: apiItem.teamId,
    applicantId: apiItem.applicantId,
    status: getJoinRequestStatusInEnglish(apiItem.status),
    decisionReason: apiItem.decisionReason,
    decidedBy: apiItem.decidedBy,
    decidedAt: apiItem.decidedAt,
  };
};

export const transformTeamJoinRequestPageResponse = (
  apiResponse: ApiTeamJoinRequestPageResponse
): TeamJoinRequestPageResponse => {
  return {
    ...apiResponse,
    content: apiResponse.content.map(transformTeamJoinRequestItem),
  };
};

export const getJoinRequestStatusDisplayName = (
  status: TeamJoinRequest['status'] | 'ACCEPTED'
): string => {
  const statusMapping: Record<TeamJoinRequest['status'] | 'ACCEPTED', string> =
    {
      PENDING: '대기중',
      APPROVED: '승인',
      REJECTED: '거절',
      CANCELED: '취소',
      ACCEPTED: '수락',
    };
  return statusMapping[status] || '대기중';
};

// 사용자별 가입 신청 목록 조회 관련 변환 함수들
export const USER_JOIN_WAITING_STATUS_MAPPING: Record<
  string,
  UserJoinWaitingItem['status']
> = {
  대기중: 'PENDING',
  승인: 'APPROVED',
  거절: 'REJECTED',
  취소: 'CANCELED',
};

export const getUserJoinWaitingStatusInEnglish = (
  koreanStatus: string
): UserJoinWaitingItem['status'] => {
  return USER_JOIN_WAITING_STATUS_MAPPING[koreanStatus] || 'PENDING';
};

export const transformUserJoinWaitingItem = (
  apiItem: ApiUserJoinWaitingItem
): UserJoinWaitingItem => {
  return {
    id: apiItem.id,
    teamId: apiItem.teamId,
    applicantId: apiItem.applicantId,
    status: getUserJoinWaitingStatusInEnglish(apiItem.status),
    decisionReason: apiItem.decisionReason,
    decidedBy: apiItem.decidedBy,
    decidedAt: apiItem.decidedAt,
  };
};

export const transformUserJoinWaitingPageResponse = (
  apiResponse: ApiUserJoinWaitingPageResponse
): UserJoinWaitingPageResponse => {
  return {
    ...apiResponse,
    content: apiResponse.content.map(transformUserJoinWaitingItem),
  };
};

export const getUserJoinWaitingStatusDisplayName = (
  status: UserJoinWaitingItem['status']
): string => {
  const statusMapping: Record<UserJoinWaitingItem['status'], string> = {
    PENDING: '대기중',
    APPROVED: '승인',
    REJECTED: '거절',
    CANCELED: '취소',
  };
  return statusMapping[status] || '대기중';
};
