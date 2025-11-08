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

import {
  BASIC_STATUS_LABELS,
  EXTENDED_STATUS_LABELS,
  KOREAN_TO_ENGLISH_STATUS_MAPPING,
} from './status_labels';

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

const ROLE_MAPPING: Record<TeamMemberRole, string> = {
  LEADER: '회장',
  VICE_LEADER: '부회장',
  MEMBER: '일반멤버',
  MERCENARY: '용병',
};

export const getRoleDisplayName = (role: TeamMemberRole): string => {
  return ROLE_MAPPING[role] || '일반멤버';
};

export const getRoleInKorean = (role: TeamMemberRole): string => {
  return ROLE_MAPPING[role] || '일반멤버';
};

export const getJoinRequestStatusInEnglish = (
  koreanStatus: string
): TeamJoinRequest['status'] => {
  return KOREAN_TO_ENGLISH_STATUS_MAPPING[koreanStatus] || 'PENDING';
};

export const transformTeamJoinRequestItem = (
  apiItem: ApiTeamJoinRequest
): TeamJoinRequest => {
  return {
    id: apiItem.id,
    applicantName: apiItem.applicantName,
    teamId: apiItem.teamId,
    teamName: apiItem.teamName,
    applicantId: apiItem.applicantId,
    message: apiItem.message,
    status: getJoinRequestStatusInEnglish(apiItem.status),
    decisionReason: apiItem.decisionReason,
    decidedBy: apiItem.decidedBy,
    decidedAt: apiItem.decidedAt,
    isMercenary: apiItem.isMercenary,
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
  return (
    EXTENDED_STATUS_LABELS[status as keyof typeof EXTENDED_STATUS_LABELS] ||
    '대기중'
  );
};

export const getUserJoinWaitingStatusInEnglish = (
  koreanStatus: string
): UserJoinWaitingItem['status'] => {
  return KOREAN_TO_ENGLISH_STATUS_MAPPING[koreanStatus] || 'PENDING';
};

export const transformUserJoinWaitingItem = (
  apiItem: ApiUserJoinWaitingItem
): UserJoinWaitingItem => {
  return {
    id: apiItem.id,
    applicantName: apiItem.applicantName,
    teamId: apiItem.teamId,
    teamName: apiItem.teamName,
    applicantId: apiItem.applicantId,
    status: getUserJoinWaitingStatusInEnglish(apiItem.status),
    decisionReason: apiItem.decisionReason,
    decidedBy: apiItem.decidedBy,
    decidedAt: apiItem.decidedAt,
    isMercenary: apiItem.isMercenary,
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
  return BASIC_STATUS_LABELS[status] || '대기중';
};
