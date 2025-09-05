export interface UserProfile {
  id: string;
  name: string;
  email: string;
  university?: string;
  major?: string;
  studentId?: string;
  joinDate: string;

  totalMatches: number;
  noShowCount: number;
  mannerScore: number;
  totalReviews: number;

  recentReviews: ReviewType[];

  stats: MatchStats;
}

export interface ReviewType {
  type: 'good_play' | 'good_manner' | 'team_player' | 'punctual' | 'bad_manner';
  count: number;
  label: string;
}

export interface MatchStats {
  wins: number;
  draws: number;
  losses: number;
  goals: number;
  assists: number;
  favoritePosition: string;
}

export interface UpdateProfileRequest {
  name?: string;
  university?: string;
  major?: string;
  studentId?: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  user: UserProfile;
}
