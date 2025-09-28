export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  authToken: string;
}

export interface RegisterRequest {
  name: string;
  skillLevel: string;
  email: string;
  universityEmail: string;
  password: string;
  kakaoId: string;
  position: string;
  university: string;
  department: string;
  studentYear: string;
  bio?: string;
}

export interface RegisterResponse {
  accessToken: string;
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
