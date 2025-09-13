import { apiClient } from '@/src/lib/api_client';

export interface CreateTeamRequest {
  name: string; // 팀 이름
  description: string; // 팀 소개 (최대 1000자)
  university: string; // 소속 대학교
  skillLevel: string; // 실력 수준: "아마추어" | "세미프로" | "프로"
  teamType: string; // 팀 유형: "중앙동아리" | "과동아리" | "기타"
  memberCount: number; // 현재 팀원 수 (nullable → 기본 0)
}

export interface CreateTeamResponse {
  id: number;
  name: string;
  description: string;
  university: string;
  skillLevel: string;
  teamType: string;
  memberCount: number;
  captainId: number;
  createdAt: string;
}

export const createTeam = async (
  teamData: CreateTeamRequest
): Promise<CreateTeamResponse> => {
  return await apiClient.post<CreateTeamResponse>('/teams', teamData);
};
