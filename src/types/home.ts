export interface HomeData {
  user: {
    name: string;
    teamLevel?: string;
    preferredPositions?: string[];
  };
  todayMatch: {
    hasMatch: boolean;
    matchInfo?: {
      time: string;
      location: string;
      type: 'team_match' | 'substitute_match';
      opponent?: string;
      teamName?: string;
    };
  };
}

export interface RecommendedMatch {
  id: number;
  location: string;
  time: string;
  currentPlayers: number;
  totalPlayers: number;
  level: string;
  popularity: string;
}

export interface RecommendedMatchListData {
  recommendedMatches: RecommendedMatch[];
}
