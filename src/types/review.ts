export enum ReviewType {
  BETTER = '수준보다 잘해요',
  SAME = '수준과 똑같아요',
  WORSE = '수준보다 아쉬워요',

  MANNER_GOOD = '매너가 좋았어요',
  MANNER_BAD = '매너가 아쉬워요',
  PUNCTUAL = '시간을 잘 지켜요',
  LATE = '시간을 안 지켜요',
  TEAM_PLAYER = '팀워크가 좋았어요',
  TEAMWORK_BAD = '팀워크가 아쉬워요',
}

export interface ReviewData {
  rating: number;
  reviewTypes: ReviewType[];
}

export interface ReviewProps {
  playerName?: string;
  playerLevel?: '아마추어' | '세미프로' | '프로';
  onSubmit: (reviewData: ReviewData) => void;
  onCancel?: () => void;
}

export interface TeamReview {
  id: number;
  teamId: number;
  reviewerName: string;
  reviewerTeam: string;
  rating: number;
  reviewTypes: ReviewType[];
  createdAt: string;
}
