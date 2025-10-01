export interface RecommendedMatch {
  id: number;
  teamName: string;
  university: string;
  skillLevel: string;
  matchDate: string;
  location: string;
}

export interface RecommendedMatchListData {
  matches: RecommendedMatch[];
  totalCount: number;
}

export interface HomeData {
  userName: string;
  teamName?: string;
  upcomingMatches: number;
  pendingRequests: number;
  todayMatch: {
    hasMatch: boolean;
    matchInfo?: {
      time: string;
      location: string;
    };
  };
}
