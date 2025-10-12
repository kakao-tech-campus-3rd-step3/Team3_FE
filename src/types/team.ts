export type TeamType = '중앙동아리' | '과동아리' | '기타';
export type SkillLevel = '아마추어' | '세미프로' | '프로';
export type TeamMemberRole = 'LEADER' | 'VICE_LEADER' | 'MEMBER';

export const TEAM_TYPES: TeamType[] = ['중앙동아리', '과동아리', '기타'];
export const SKILL_LEVELS: SkillLevel[] = ['아마추어', '세미프로', '프로'];

export const DEFAULT_TEAM_TYPE: TeamType = '중앙동아리';
export const DEFAULT_SKILL_LEVEL: SkillLevel = '아마추어';

export interface CreateTeamRequest {
  name: string;
  description?: string;
  university: string;
  skillLevel: SkillLevel;
  teamType: TeamType;
}

export interface CreateTeamResponse {
  teamId: number;
  message: string;
  teamUrl: string;
}

export interface ApiTeamDetailResponse {
  id: number;
  name: string;
  description: string;
  university: string;
  skillLevel: string;
  teamType: string;
  memberCount: number;
  createdAt: string;
}

export interface TeamDetailResponse {
  id: number;
  name: string;
  description: string;
  university: string;
  skillLevel: SkillLevel;
  teamType: TeamType;
  memberCount: number;
  createdAt: string;
}

export interface ApiTeamListItem {
  id: number;
  name: string;
  description: string;
  university: string;
  skillLevel: string;
  teamType: string;
  memberCount: number;
  captainName: string;
  captainId: number;
  createdAt: string;
}

export interface TeamListItem {
  id: number;
  name: string;
  description: string;
  university: string;
  skillLevel: SkillLevel;
  teamType: TeamType;
  memberCount: number;
  captainName: string;
  captainId: number;
  createdAt: string;
}

export interface Pageable {
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
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface ApiTeamListPageResponse {
  content: ApiTeamListItem[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  sort: Sort;
  empty: boolean;
}

export interface TeamListPageResponse {
  content: TeamListItem[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  sort: Sort;
  empty: boolean;
}

export interface ApiTeamMember {
  id: number;
  userId: number;
  name: string;
  email: string;
  position: string;
  role: TeamMemberRole;
  joinedAt: string;
}

export interface TeamMember {
  id: number;
  userId: number;
  name: string;
  email: string;
  position: string;
  role: TeamMemberRole;
  joinedAt: string;
}

export interface ApiTeamMemberPageResponse {
  content: ApiTeamMember[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  sort: Sort;
  first: boolean;
  empty: boolean;
}

export interface TeamMemberPageResponse {
  content: TeamMember[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  sort: Sort;
  first: boolean;
  empty: boolean;
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

export interface ApiTeamJoinRequest {
  id: number;
  applicantName: string;
  teamId: number;
  applicantId: number;
  status: string;
  decisionReason: string | null;
  decidedBy: number | null;
  decidedAt: string | null;
}

export interface TeamJoinRequest {
  id: number;
  applicantName: string;
  teamId: number;
  applicantId: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELED';
  decisionReason: string | null;
  decidedBy: number | null;
  decidedAt: string | null;
}

export interface ApiTeamJoinRequestPageResponse {
  content: ApiTeamJoinRequest[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  sort: Sort;
  empty: boolean;
}

export interface TeamJoinRequestPageResponse {
  content: TeamJoinRequest[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  sort: Sort;
  empty: boolean;
}

export interface JoinWaitingRequest {
  message?: string;
}

export interface JoinWaitingResponse {
  id: number;
  teamId: number;
  applicantId: number;
  status: string;
  decisionReason: string | null;
  decidedBy: number | null;
  decidedAt: string | null;
}

export interface JoinWaitingApproveRequest {
  role: '회장' | '부회장' | '일반멤버';
  decisionReason?: string;
}

export interface JoinWaitingRejectRequest {
  reason: string;
}

export interface JoinWaitingCancelRequest {
  decisionReason?: string;
}

export interface ApiUserJoinWaitingItem {
  id: number;
  applicantName: string;
  teamId: number;
  teamName: string;
  applicantId: number;
  status: string;
  decisionReason: string | null;
  decidedBy: number | null;
  decidedAt: string | null;
}

export interface UserJoinWaitingItem {
  id: number;
  applicantName: string;
  teamId: number;
  teamName: string;
  applicantId: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELED';
  decisionReason: string | null;
  decidedBy: number | null;
  decidedAt: string | null;
}

export interface ApiUserJoinWaitingPageResponse {
  content: ApiUserJoinWaitingItem[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  sort: Sort;
  empty: boolean;
}

export interface UserJoinWaitingPageResponse {
  content: UserJoinWaitingItem[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  sort: Sort;
  empty: boolean;
}
