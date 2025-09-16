export type TeamType = '중앙동아리' | '과동아리' | '기타';
export type SkillLevel = '아마추어' | '세미프로' | '프로';

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
  id: number;
  name: string;
  description: string;
  university: string;
  skillLevel: SkillLevel;
  teamType: TeamType;
  memberCount: number;
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
}

export interface JoinTeamRequest {
  teamId: number;
}

export interface JoinTeamResponse {
  success: boolean;
  message: string;
}
