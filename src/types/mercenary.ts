export interface MercenaryProfile {
  id: number;
  name: string;
  age: number;
  position: string;
  level: string;
  region: string;
  university: string;
  experience: number;
  noShowCount: number;
  totalMatches: number;
  feeCondition: string;
  availableTime: string;
  intro: string;
  profileImage?: string;
  kakaoId: string;
  createdAt: string;
}

export interface MercenaryApplication {
  id: number;
  matchId: number;
  matchTitle: string;
  matchDate: string;
  matchTime: string;
  location: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  fee: string;
}

export interface MercenaryMatch {
  id: string;
  teamName: string;
  opponent: string;
  date: string;
  time: string;
  location: string;
  positions: string[];
  level: string;
  description: string;
}

export interface MercenaryRequest {
  id: number;
  matchId: number;
  mercenaryId: number;
  position: string;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
}

export interface MercenaryMatchView {
  matchId: string;
  teamName: string;
  opponent: string;
  date: string;
  time: string;
  location: string;
  positions: string[];
  level: string;
  description: string;
  maxMercenaries: number;
  currentMercenaries: number;
  skillLevel: string;
  matchType: string;
  homeTeam: string;
  awayTeam: string;
  matchDetails: {
    date: string;
    time: string;
    location: string;
    description: string;
    status: string;
  };
  mercenaryPosition: string;
  relationshipStatus:
    | 'none'
    | 'applied'
    | 'approved'
    | 'rejected'
    | 'active'
    | 'completed'
    | 'terminated';
}
