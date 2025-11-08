export enum MatchStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  FINISHED = 'FINISHED',
  MATCHED = 'MATCHED',
}

export interface Team {
  teamId: number;
  name: string;
  university: string;
}

export interface Venue {
  venueId: number;
  name: string;
  address: string;
}

export interface Match {
  matchId: number;
  team1: Team;
  team2: Team;
  matchDate: string;
  matchTime: string;
  venue: Venue;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface RecentMatchResponse {
  matchId: number;
  createTeamId: number;
  createTeamName: string;
  requestTeamId: number;
  requestTeamName: string;
  matchDate: string;
  matchTime: string;
  venueName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface MatchWaitingListRequestDto {
  selectDate: string;
  startTime: string;
  teamId?: number;
}

export interface MatchWaitingResponseDto {
  waitingId: number;
  teamId: number;
  teamName: string | { name: string };
  preferredDate: string;
  preferredTimeStart: string;
  preferredTimeEnd: string;
  preferredVenueId: number;
  skillLevelMin: 'AMATEUR' | 'SEMI_PRO' | 'PRO';
  skillLevelMax: 'AMATEUR' | 'SEMI_PRO' | 'PRO';
  universityOnly: boolean;
  message: string;
  status: 'WAITING' | 'MATCHED' | 'CANCELED' | 'EXPIRED';
  expiresAt: string;
  lineup1Id: number;
}

export interface MatchCreateRequestDto {
  teamId: number;
  preferredDate: string;
  preferredTimeStart: string;
  preferredTimeEnd: string;
  preferredVenueId: number;
  skillLevelMin: string;
  skillLevelMax: string;
  universityOnly: boolean;
  message: string;
  lineupId: number;
}

export interface MatchCreateResponseDto {
  waitingId: number;
  teamId: number;
  status: string;
  expiresAt: string;
}
export interface MatchRequestRequestDto {
  requestMessage: string;
  lineupId: number;
}

export type MatchRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface MatchRequestResponseDto {
  requestId: number;
  requestTeamId: number;
  requestTeamName: {
    name: string;
  };
  targetTeamId: number;
  targetTeamName: {
    name: string;
  };
  preferredDate?: string;
  preferredTimeStart?: string;
  preferredTimeEnd?: string;
  venueName?: string;
  requestMessage: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELED';
  requestTeamLineupId?: number;
}

export interface MatchConfirmedResponseDto {
  matchId: number;
  team1Id: number;
  team1Name: {
    name: string;
  };
  team2Id: number;
  team2Name: {
    name: string;
  };
  matchDate: string;
  matchTime: string;
  venueId: number;
  status: string;
}

export interface MatchWaitingCancelResponseDto {
  waitingId: number;
  teamId: number;
  teamName: string;
  status: 'WAITING' | 'MATCHED' | 'REJECTED' | 'CANCELLED';
  expiresAt: string;
}

export interface MatchWaitingHistoryResponseDto {
  requestId: number;
  requestTeamId: number;
  requestTeamName: string | { name: string };
  targetTeamId: number;
  targetTeamName: string | { name: string };
  requestMessage: string;
  status: MatchRequestStatus;
  requestAt: string;
}

export interface EnemyTeamResponseDto {
  teamId: number;
  teamName: string;
  captainId: number;
  captainName: string;
  universityName: string;
  teamType: 'CENTRAL_CLUB' | 'DEPARTMENT_CLUB' | 'OTHER';
  memberCount: number;
  skillLevel: 'PRO' | 'SEMI_PRO' | 'AMATEUR';
  description: string;
}
