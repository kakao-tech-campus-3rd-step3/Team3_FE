// 용병 모집 게시글 생성 요청
export interface RecruitmentCreateRequest {
  teamId: number;
  matchDate: string; // "2025-10-20" 형식
  matchTime: string; // "19:30:00" 형식
  message: string;
  position: string;
  skillLevel: string;
}

// 용병 모집 게시글 수정 요청
export interface RecruitmentUpdateRequest {
  matchDate: string; // "2025-10-20" 형식
  matchTime: string; // "19:30:00" 형식
  message: string;
  position: string;
  skillLevel: string;
}

// 용병 모집 게시글 응답 (백엔드 실제 구조에 맞게 수정)
export interface RecruitmentResponse {
  recruitmentId: number;
  teamId: number;
  teamName: string;
  matchDate: string;
  matchTime: string;
  message: string;
  position: string; // 포지션 코드 (예: "FW", "GK" 등)
  skillLevel: string; // 실력레벨 코드 (예: "AMATEUR", "PRO" 등)
  recruitmentStatus: string; // "모집중" 등
  createdAt: string;
  updatedAt: string;
}

// 페이지네이션 응답
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

// 용병 모집 게시글 목록 조회 응답
export type RecruitmentListResponse = PageResponse<RecruitmentResponse>;

// 용병 프로필
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

// 용병 신청
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
