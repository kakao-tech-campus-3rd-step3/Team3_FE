export interface MatchParticipant {
  id: string;
  matchId: string;
  participantId: string;
  participantType: 'team' | 'mercenary';
  participantName: string;
  role: 'home' | 'away' | 'mercenary';
  position?: string; // 용병의 경우 포지션
  status: 'active' | 'completed' | 'cancelled';
  joinedAt: string;
  leftAt?: string;
}

export interface MatchWithParticipants {
  id: string;
  homeTeam: {
    id: string;
    name: string;
    participants: MatchParticipant[];
  };
  awayTeam: {
    id: string;
    name: string;
    participants: MatchParticipant[];
  };
  mercenaries: MatchParticipant[];
  matchDetails: {
    date: string;
    time: string;
    location: string;
    status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  };
  createdAt: string;
  completedAt?: string;
}

export interface MercenaryMatchView {
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  mercenaryPosition: string;
  matchDetails: {
    date: string;
    time: string;
    location: string;
    status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  };
  canReview: boolean;
  reviewTarget: 'team' | null; // 용병은 팀에 대한 리뷰만 가능
  relationshipStatus: 'active' | 'completed' | 'terminated';
}
