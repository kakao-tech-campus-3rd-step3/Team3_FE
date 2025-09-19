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

  recentReviews: ProfileReviewType[];

  stats: MatchStats;

  teamId: number | null;
}

export interface ProfileReviewType {
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

export type SettingItem = {
  key: string;
  label: string;
  onPress?: () => void;
  color?: string;
  showChevron?: boolean;
};
