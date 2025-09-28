import { useQuery, useMutation } from '@tanstack/react-query';

import * as api from '@/src/api';
import { useAuth } from '@/src/contexts/auth_context';
import { queryClient } from '@/src/lib/query_client';
import type {
  JoinTeamResponse,
  CreateTeamResponse,
  CreateTeamRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  SendVerificationResponse,
  VerifyEmailResponse,
  VerifyEmailRequest,
  UpdateProfileRequest,
  TeamMemberRole,
} from '@/src/types';

export const queries = {
  login: {
    key: ['login'] as const,
    fn: (loginData: LoginRequest) =>
      api.authApi.login(loginData.email, loginData.password),
  },
  register: {
    key: ['register'] as const,
    fn: (registerData: RegisterRequest) => api.authApi.register(registerData),
  },
  sendVerification: {
    key: ['sendVerification'] as const,
    fn: (email: string) => api.authApi.sendVerification(email),
  },
  verifyEmail: {
    key: ['verifyEmail'] as const,
    fn: (verifyEmailCode: VerifyEmailRequest) =>
      api.authApi.verifyEmail(verifyEmailCode),
  },
  userProfile: {
    key: (userId: string) => ['user', 'profile', userId] as const,
    fn: (userId: string) => api.profileApi.getProfile(userId),
  },
  user: {
    key: ['user'] as const,
  },
  home: {
    key: ['home'] as const,
    fn: () => api.homeApi.getHome(),
  },
  recommendedMatch: {
    key: ['recommendedMatch'] as const,
    fn: () => api.recommendedMatchApi.getRecommendedMatch(),
  },
  universityTeamList: {
    key: ['university'] as const,
    fn: () => api.universityListApi.getUniversities(),
  },
  teamsByUniversity: {
    key: ['teams', 'university'] as const,
    fn: (university: string) =>
      api.teamListApi.getTeamsByUniversity(university),
  },
  team: {
    key: (teamId: string | number) => ['teams', teamId] as const,
    fn: (teamId: string | number) => api.myTeamApi.getTeamById(teamId),
  },
  teamMembers: {
    key: (teamId: string | number) => ['teamMembers', teamId] as const,
    fn: (teamId: string | number) => api.teamMemberApi.getTeamMembers(teamId),
  },
  teamReviews: {
    key: (teamId: string | number) => ['teamReviews', teamId] as const,
    fn: (teamId: string | number) => api.teamReviewApi.getTeamReviews(teamId),
  },
  teamJoinRequests: {
    key: (teamId: string | number) => ['teamJoinRequests', teamId] as const,
    fn: (teamId: string | number) =>
      api.teamJoinRequestApi.getTeamJoinRequests(teamId),
  },
  teamMatches: {
    key: (teamId: string | number) => ['teamMatches', teamId] as const,
    fn: (teamId: string | number) => api.teamMatchApi.getTeamMatches(teamId),
  },
} as const;

export function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => api.profileApi.getProfile(userId),
    enabled: !!userId,
  });
}

export function useHome() {
  return useQuery({
    queryKey: queries.home.key,
    queryFn: queries.home.fn,
  });
}

export function useRecommendedMatch() {
  return useQuery({
    queryKey: queries.recommendedMatch.key,
    queryFn: queries.recommendedMatch.fn,
  });
}

export function useUniversityTeamList() {
  return useQuery({
    queryKey: queries.universityTeamList.key,
    queryFn: queries.universityTeamList.fn,
  });
}

export function useTeamsByUniversity(university: string) {
  return useQuery({
    queryKey: [...queries.teamsByUniversity.key, university],
    queryFn: () => queries.teamsByUniversity.fn(university),
    enabled: !!university,
  });
}

export function useTeam(teamId: string | number) {
  return useQuery({
    queryKey: queries.team.key(teamId),
    queryFn: () => queries.team.fn(teamId),
    enabled: !!teamId,
  });
}

export function useTeamMembers(teamId: string | number) {
  return useQuery({
    queryKey: queries.teamMembers.key(teamId),
    queryFn: () => queries.teamMembers.fn(teamId),
    enabled: !!teamId,
  });
}

export function useTeamReviews(teamId: string | number) {
  return useQuery({
    queryKey: queries.teamReviews.key(teamId),
    queryFn: () => queries.teamReviews.fn(teamId),
    enabled: !!teamId,
  });
}

export function useTeamJoinRequests(teamId: string | number) {
  return useQuery({
    queryKey: queries.teamJoinRequests.key(teamId),
    queryFn: () => queries.teamJoinRequests.fn(teamId),
    enabled: !!teamId,
  });
}

export function useTeamMatches(teamId: string | number) {
  return useQuery({
    queryKey: queries.teamMatches.key(teamId),
    queryFn: () => queries.teamMatches.fn(teamId),
    enabled: !!teamId,
  });
}

// --- Mutations ---

export function useCreateTeamMutation() {
  return useMutation({
    mutationFn: (teamData: CreateTeamRequest): Promise<CreateTeamResponse> =>
      api.createTeam(teamData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
    onError: (error: unknown) => {
      console.error('팀 생성 실패:', error);
    },
  });
}

export function useJoinTeamMutation() {
  return useMutation({
    mutationFn: (teamId: number): Promise<JoinTeamResponse> =>
      api.joinTeamApi.joinTeam(teamId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
    onError: (error: unknown) => {
      console.error('팀 참여 실패:', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });
}

export function useLogout() {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });
}

export function useLoginMutation() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: queries.login.fn,
    onSuccess: (data: LoginResponse) => {
      login(data.authToken, data.userId);

      queryClient.invalidateQueries({ queryKey: queries.login.key });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export function useRegisterMutation() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: queries.register.fn,
    onSuccess: (data: RegisterResponse) => {
      login(data.accessToken, data.userId);

      queryClient.invalidateQueries({ queryKey: queries.login.key });
      queryClient.invalidateQueries({
        queryKey: [{ queryKey: queries.user.key }],
      });
    },
    onError: (error: unknown) => {
      console.error('회원가입 실패:', error);
    },
  });
}

export function useSendVerificationMutation() {
  return useMutation({
    mutationFn: queries.sendVerification.fn,
    onSuccess: (data: SendVerificationResponse) => {
      console.log('이메일 인증번호 전송 성공:', data);
    },
    onError: (error: unknown) => {
      console.error('이메일 인증번호 전송 실패:', error);
    },
  });
}

export function useVerifyEmailMutation() {
  return useMutation({
    mutationFn: queries.verifyEmail.fn,
    onSuccess: (data: VerifyEmailResponse) => {
      console.log('이메일 인증 성공:', data);
    },
    onError: (error: unknown) => {
      console.error('이메일 인증 실패:', error);
    },
  });
}

export function useUpdateProfileMutation() {
  return useMutation({
    mutationFn: (data: UpdateProfileRequest) =>
      api.profileApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
    onError: (error: unknown) => {
      console.error('프로필 수정 실패:', error);
    },
  });
}

export function useRemoveMemberMutation() {
  return useMutation({
    mutationFn: ({
      teamId,
      userId,
    }: {
      teamId: string | number;
      userId: string | number;
    }) => api.teamMemberApi.removeMember(teamId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamMembers'] });
    },
    onError: (error: unknown) => {
      console.error('멤버 삭제 실패:', error);
    },
  });
}

export function useUpdateMemberRoleMutation() {
  return useMutation({
    mutationFn: ({
      teamId,
      userId,
      role,
    }: {
      teamId: string | number;
      userId: string | number;
      role: TeamMemberRole;
    }) => api.teamMemberApi.updateMemberRole(teamId, userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamMembers'] });
    },
    onError: (error: unknown) => {
      console.error('멤버 역할 수정 실패:', error);
    },
  });
}
