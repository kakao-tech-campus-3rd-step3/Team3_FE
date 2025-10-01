export interface UserProfile {
  name: string;
  skillLevel: string;
  email: string;
  kakaoTalkId: string;
  position: string;
  university: string;
  department: string;
  studentYear: string;
  bio: string;
  createdAt: string;
  teamId: number | null;
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
