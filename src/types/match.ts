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

// API 명세서에 맞는 새로운 타입 정의
export interface RecentMatchResponse {
  matchId: number;
  team1Name: string;
  team2Name: string;
  matchDate: string;
  matchTime: string;
  venueName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface MatchWaitingListRequestDto {
  teamId: number; // 로그인한 사용자의 팀 ID (백엔드에서 필수)
  selectDate: string; // yyyy-MM-dd
  startTime?: string; // HH:mm:ss (없으면 필터 미적용)
}

export interface MatchWaitingResponseDto {
  waitingId: number;
  teamId: number;
  teamName: {
    name: string;
  };
  preferredDate: string;
  preferredTimeStart: string;
  preferredTimeEnd: string;
  preferredVenueId: number;
  skillLevelMin: 'AMATEUR' | 'SEMI_PRO' | 'PRO';
  skillLevelMax: 'AMATEUR' | 'SEMI_PRO' | 'PRO';
  universityOnly: boolean;
  message: string;
  status: 'WAITING' | 'MATCHED' | 'CANCELLED';
  expiresAt: string;
}

export interface MatchCreateRequestDto {
  teamId: number;
  preferredDate: string; // "YYYY-MM-DD"
  preferredTimeStart: string; // "HH:mm:ss"
  preferredTimeEnd: string; // "HH:mm:ss"
  preferredVenueId: number;
  skillLevelMin: string; // "AMATEUR" | "PRO" 등
  skillLevelMax: string;
  universityOnly: boolean;
  message: string;
}

export interface MatchCreateResponseDto {
  waitingId: number;
  teamId: number;
  status: string; // e.g. "WAITING"
  expiresAt: string;
}
export interface MatchRequestRequestDto {
  requestMessage: string;
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
  requestMessage: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELED';
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
