export interface CreateTeamRequest {
  name: string;
  description: string;
  university: string;
  skillLevel: string;
  teamType: string;
  memberCount: number;
}

export interface CreateTeamResponse {
  id: number;
  name: string;
  description: string;
  university: string;
  skillLevel: string;
  teamType: string;
  memberCount: number;
  captainId: number;
  createdAt: string;
}

export interface TeamListItem {
  id: number;
  name: string;
  description: string;
  university: string;
  skillLevel: string;
  teamType: string;
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
