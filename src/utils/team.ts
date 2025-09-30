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
} from '@/src/types/team';

// 팀 타입 매핑
export const TEAM_TYPE_MAPPING: Record<string, TeamType> = {
  CENTRAL_CLUB: '중앙동아리',
  DEPARTMENT_CLUB: '과동아리',
  OTHER: '기타',
};

// 실력 레벨 매핑
export const SKILL_LEVEL_MAPPING: Record<string, SkillLevel> = {
  AMATEUR: '아마추어',
  SEMI_PRO: '세미프로',
  PRO: '프로',
};

// 팀 타입을 한글로 변환
export const getTeamTypeInKorean = (apiType: string): TeamType => {
  return TEAM_TYPE_MAPPING[apiType] || '기타';
};

// 실력 레벨을 한글로 변환
export const getSkillLevelInKorean = (apiLevel: string): SkillLevel => {
  return SKILL_LEVEL_MAPPING[apiLevel] || '아마추어';
};

// 한글 팀 타입을 영문 코드로 변환 (API 전송용)
export const getTeamTypeInEnglish = (koreanType: TeamType): string => {
  return koreanType;
};

// 한글 실력 레벨을 영문 코드로 변환 (API 전송용)
export const getSkillLevelInEnglish = (koreanLevel: SkillLevel): string => {
  return koreanLevel;
};

// API 팀 리스트 아이템을 프론트엔드 타입으로 변환
export const transformTeamListItem = (
  apiItem: ApiTeamListItem
): TeamListItem => {
  return {
    ...apiItem,
    skillLevel: getSkillLevelInKorean(apiItem.skillLevel),
    teamType: getTeamTypeInKorean(apiItem.teamType),
  };
};

// API 페이지 응답을 프론트엔드 타입으로 변환
export const transformTeamListPageResponse = (
  apiResponse: ApiTeamListPageResponse
): TeamListPageResponse => {
  return {
    ...apiResponse,
    content: apiResponse.content.map(transformTeamListItem),
  };
};

// API 팀 상세 응답을 프론트엔드 타입으로 변환
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

// API 팀 멤버 아이템을 프론트엔드 타입으로 변환
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

// API 팀 멤버 페이지 응답을 프론트엔드 타입으로 변환
export const transformTeamMemberPageResponse = (
  apiResponse: ApiTeamMemberPageResponse
): TeamMemberPageResponse => {
  return {
    ...apiResponse,
    content: apiResponse.content.map(transformTeamMemberItem),
  };
};

// 팀 멤버 역할을 한글로 변환
export const getRoleDisplayName = (role: TeamMemberRole): string => {
  const roleMapping: Record<TeamMemberRole, string> = {
    LEADER: '회장',
    VICE_LEADER: '부회장',
    MEMBER: '팀원',
  };
  return roleMapping[role] || '팀원';
};

// 팀 가입 신청 상태 매핑
export const JOIN_REQUEST_STATUS_MAPPING: Record<
  string,
  TeamJoinRequest['status']
> = {
  대기중: 'PENDING',
  승인: 'APPROVED',
  거절: 'REJECTED',
  취소: 'CANCELED',
};

// 팀 가입 신청 상태를 영문 코드로 변환
export const getJoinRequestStatusInEnglish = (
  koreanStatus: string
): TeamJoinRequest['status'] => {
  return JOIN_REQUEST_STATUS_MAPPING[koreanStatus] || 'PENDING';
};

// API 팀 가입 신청 아이템을 프론트엔드 타입으로 변환
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

// API 팀 가입 신청 페이지 응답을 프론트엔드 타입으로 변환
export const transformTeamJoinRequestPageResponse = (
  apiResponse: ApiTeamJoinRequestPageResponse
): TeamJoinRequestPageResponse => {
  return {
    ...apiResponse,
    content: apiResponse.content.map(transformTeamJoinRequestItem),
  };
};

// 팀 가입 신청 상태를 한글로 변환
export const getJoinRequestStatusDisplayName = (
  status: TeamJoinRequest['status']
): string => {
  const statusMapping: Record<TeamJoinRequest['status'], string> = {
    PENDING: '대기중',
    APPROVED: '승인',
    REJECTED: '거절',
    CANCELED: '취소',
  };
  return statusMapping[status] || '대기중';
};
