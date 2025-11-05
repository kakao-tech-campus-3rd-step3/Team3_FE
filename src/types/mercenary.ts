export interface RecruitmentCreateRequest {
  teamId: number;
  matchDate: string;
  matchTime: string;
  message: string;
  position: string;
  skillLevel: string;
}

export interface RecruitmentUpdateRequest {
  matchDate: string;
  matchTime: string;
  message: string;
  position: string;
  skillLevel: string;
}

export interface RecruitmentResponse {
  recruitmentId: number;
  teamId: number;
  teamName: string;
  universityName: string;
  matchDate: string;
  matchTime: string;
  message: string;
  position: string;
  skillLevel: string;
  recruitmentStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export type RecruitmentListResponse = PageResponse<RecruitmentResponse>;

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

export interface MercenaryReview {
  mercenaryReviewId: number;
  matchId: number;
  reviewerTeamId: number;
  userId: number;
  rating: number;
  punctualityReview: 'GOOD' | 'BAD';
  sportsmanshipReview: 'GOOD' | 'BAD';
  skillLevelReview: 'SIMILAR' | 'LOWER' | 'HIGHER';
}

export interface MercenaryTeamReview {
  teamReviewId: number;
  matchId: number;
  reviewerTeamId: number;
  reviewedTeamId: number;
  rating: number;
  punctualityReview: 'GOOD' | 'BAD';
  sportsmanshipReview: 'GOOD' | 'BAD';
  skillLevelReview: 'SIMILAR' | 'LOWER' | 'HIGHER';
}
