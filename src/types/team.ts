export type TeamType = '중앙동아리' | '과동아리' | '기타';
export type SkillLevel = '아마추어' | '세미프로' | '프로';
export type TeamMemberRole = 'LEADER' | 'VICE_LEADER' | 'MEMBER';

export const TEAM_TYPES: TeamType[] = ['중앙동아리', '과동아리', '기타'];
export const SKILL_LEVELS: SkillLevel[] = ['아마추어', '세미프로', '프로'];

export const DEFAULT_TEAM_TYPE: TeamType = '중앙동아리';
export const DEFAULT_SKILL_LEVEL: SkillLevel = '아마추어';

export interface CreateTeamRequest {
  name: string;
  description: string;
  university: string;
  skillLevel: SkillLevel;
  teamType: TeamType;
  memberCount: number;
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
  skillLevel: string;
  teamType: string;
  memberCount: number;
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
