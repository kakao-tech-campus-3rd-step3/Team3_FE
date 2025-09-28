export interface UserProfile {
  id: string;
  name: string;
  email: string;
  university?: string;
  major?: string;
  studentId?: string;
  joinDate: string;
  level: string;
  teamId?: number | null;

  totalMatches: number;
  noShowCount: number;
  mannerScore: number;
  totalReviews: number;
  bio: string;
  phoneNumber: string;

  recentReviews: ReviewStatsType[];

  stats: MatchStats;
}

export interface ReviewStatsType {
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
  skillLevel?: string;
  position?: string;
  bio?: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  user: UserProfile;
}

export type SettingItem = {
  key: string;
  label: string;
  onPress?: () => void;
  color?: string;
  showChevron?: boolean;
  value?: string;
};
