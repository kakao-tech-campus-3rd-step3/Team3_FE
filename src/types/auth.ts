export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
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
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
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

export interface TokenRefreshRequest {
  refreshToken: string;
}

export interface TokenRefreshResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}

export interface SendPasswordResetCodeRequest {
  email: string;
}

export interface SendPasswordResetCodeResponse {
  message: string;
}

export interface VerifyCodeRequest {
  email: string;
  code: string;
}

export interface VerifyCodeResponse {
  token: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface ResetPasswordResponse {
  message: string;
}
