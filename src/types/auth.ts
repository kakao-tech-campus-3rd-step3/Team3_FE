export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string; // 백엔드에서 쿠키로 설정되지만 응답에도 포함
}

export interface RegisterRequest {
  name: string;
  skillLevel: string;
  email: string;
  universityEmail: string;
  password: string;
  kakaoTalkId: string;
  position: string;
  university: string;
  department: string;
  studentYear: string;
  bio?: string;
}

export interface RegisterResponse {
  accessToken: string;
  refreshToken: string; // 백엔드에서 쿠키로 설정되지만 응답에도 포함
}

export interface SendVerificationResponse {
  success: boolean;
}

export interface VerifyEmailResponse {
  success: boolean;
}

export interface VerifyEmailRequest {
  universityEmail: string;
  code: string;
}
