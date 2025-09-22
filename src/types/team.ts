export type TeamType = '중앙동아리' | '과동아리' | '기타';
export type SkillLevel = '아마추어' | '세미프로' | '프로';

// API 응답용 영문 코드 타입
export type TeamTypeCode = 'CENTRAL_CLUB' | 'DEPARTMENT_CLUB' | 'OTHER';
export type SkillLevelCode = 'AMATEUR' | 'SEMI_PRO' | 'PRO';
export type TeamMemberRole = 'LEADER' | 'VICE_LEADER' | 'MEMBER';

export const TEAM_TYPES: TeamType[] = ['중앙동아리', '과동아리', '기타'];
export const SKILL_LEVELS: SkillLevel[] = ['아마추어', '세미프로', '프로'];

export const DEFAULT_TEAM_TYPE: TeamType = '중앙동아리';
export const DEFAULT_SKILL_LEVEL: SkillLevel = '아마추어';

// 영문 코드와 한글 표시값 간의 매핑
export const SKILL_LEVEL_CODE_MAP: Record<SkillLevelCode, SkillLevel> = {
  AMATEUR: '아마추어',
  SEMI_PRO: '세미프로',
  PRO: '프로',
};

export const TEAM_TYPE_CODE_MAP: Record<TeamTypeCode, TeamType> = {
  CENTRAL_CLUB: '중앙동아리',
  DEPARTMENT_CLUB: '과동아리',
  OTHER: '기타',
};

// 영문 코드를 한글 표시값으로 변환하는 함수들
export const getSkillLevelDisplay = (code: SkillLevelCode): SkillLevel =>
  SKILL_LEVEL_CODE_MAP[code];

export const getTeamTypeDisplay = (code: TeamTypeCode): TeamType =>
  TEAM_TYPE_CODE_MAP[code];

// 한글 표시값을 영문 코드로 변환하는 함수들
export const getSkillLevelCode = (display: SkillLevel): SkillLevelCode => {
  const reverseMap = Object.fromEntries(
    Object.entries(SKILL_LEVEL_CODE_MAP).map(([code, display]) => [
      display,
      code,
    ])
  ) as Record<SkillLevel, SkillLevelCode>;
  return reverseMap[display];
};

export const getTeamTypeCode = (display: TeamType): TeamTypeCode => {
  const reverseMap = Object.fromEntries(
    Object.entries(TEAM_TYPE_CODE_MAP).map(([code, display]) => [display, code])
  ) as Record<TeamType, TeamTypeCode>;
  return reverseMap[display];
};

export interface CreateTeamRequest {
  name: string;
  description: string;
  university: string;
  skillLevel: SkillLevel;
  teamType: TeamType;
}

export interface UpdateTeamRequest {
  name?: string;
  description?: string;
  university?: string;
  skillLevel?: SkillLevel;
  teamType?: TeamType;
}

export interface CreateTeamResponse {
  teamId: number;
  message: string;
  teamUrl: string;
}

export interface TeamDetailResponse {
  id: number;
  name: string;
  description: string;
  university: string;
  skillLevel: SkillLevelCode;
  teamType: TeamTypeCode;
  memberCount: number;
  createdAt: string;
}

export interface TeamListItem {
  id: number;
  name: string;
  description: string;
  university: string;
  skillLevel: SkillLevelCode;
  teamType: TeamTypeCode;
  memberCount: number;
  captainName: string;
  captainId: number;
}

export interface PagedTeamListResponse {
  content: TeamListItem[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  empty: boolean;
}

export interface TeamMember {
  id: number;
  teamId: number;
  userId: number;
  role: TeamMemberRole;
  joinedAt: string;
  updatedAt?: string;
  user?: {
    id: number;
    name: string;
    email: string;
    university: string;
    major: string;
  };
}

export interface TeamManagementData {
  team: {
    id: number;
    name: string;
    description: string;
    university: string;
    skillLevel: SkillLevel;
    teamType: TeamType;
    memberCount: number;
    captainId: number;
    createdAt: string;
  };
  members: TeamMember[];
  upcomingMatches: {
    id: number;
    opponent: string;
    date: string;
    time: string;
    location: string;
    type: 'friendly' | 'league' | 'tournament';
  }[];
  recentActivities: {
    id: number;
    type: 'member_joined' | 'member_left' | 'match_result' | 'announcement';
    message: string;
    date: string;
  }[];
}

export interface JoinTeamRequest {
  teamId: number;
}

export interface JoinTeamResponse {
  success: boolean;
  message: string;
}

export interface JoinRequest {
  id: string;
  applicantName: string;
  applicantEmail: string;
  position: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}
