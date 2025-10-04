import {
  useQuery,
  useMutation,
  keepPreviousData,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { router } from 'expo-router';

import * as api from '@/src/api';
import { ROUTES } from '@/src/constants/routes';
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
  SkillLevel,
  TeamType,
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
    key: ['user', 'profile'] as const,
    fn: () => api.profileApi.getProfile(),
  },
  user: {
    key: ['user'] as const,
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
    fn: (university: string, page: number = 0, size: number = 10) =>
      api.teamListApi.getTeamsByUniversity(university, page, size),
  },
  team: {
    key: (teamId: string | number) => ['teams', teamId] as const,
    fn: (teamId: string | number) => api.myTeamApi.getTeamById(teamId),
  },
  teamMembers: {
    key: (teamId: string | number, page: number = 0, size: number = 10) =>
      ['teamMembers', teamId, page, size] as const,
    fn: (teamId: string | number, page: number = 0, size: number = 10) =>
      api.teamMemberApi.getTeamMembers(teamId, page, size),
  },
  teamMember: {
    key: (teamId: string | number, userId: string | number) =>
      ['teamMember', teamId, userId] as const,
    fn: (teamId: string | number, userId: string | number) =>
      api.teamMemberApi.getTeamMember(teamId, userId),
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
  teamRecentMatches: {
    key: (status?: string) => ['teamRecentMatches', status] as const,
    fn: (status?: string) => api.teamMatchApi.getTeamRecentMatches(status),
  },
  teamJoinWaitingList: {
    key: (
      teamId: string | number,
      status: string = 'PENDING',
      page: number = 0,
      size: number = 10
    ) => ['teamJoinWaitingList', teamId, status, page, size] as const,
    fn: (
      teamId: string | number,
      status: string = 'PENDING',
      page: number = 0,
      size: number = 10
    ) =>
      api.teamJoinRequestApi.getTeamJoinWaitingList(teamId, status, page, size),
  },
  teamMatchRequests: {
    key: ['teamMatchRequests'] as const,
    fn: async () => {
      const response = await api.teamMatchApi.getTeamMatchRequests();
      return response.content; // content 배열만 반환
    },
  },
} as const;

export function useUserProfile() {
  const { token } = useAuth();

  console.log('👤 useUserProfile: 쿼리 실행', {
    hasToken: !!token,
    token: token ? '토큰 있음' : '토큰 없음',
  });

  return useQuery({
    queryKey: queries.userProfile.key,
    queryFn: queries.userProfile.fn,
    enabled: !!token,
  });
}

export function useTeamMatchRequests() {
  const { token } = useAuth();

  return useQuery({
    queryKey: queries.teamMatchRequests.key,
    queryFn: queries.teamMatchRequests.fn,
    enabled: !!token,
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

export function useTeamsByUniversity(
  university: string,
  page: number = 0,
  size: number = 10
) {
  return useQuery({
    queryKey: [...queries.teamsByUniversity.key, university, page, size],
    queryFn: () => queries.teamsByUniversity.fn(university, page, size),
    enabled: !!university,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
}

export function useTeamsByUniversityInfinite(
  university: string,
  size: number = 10
) {
  return useInfiniteQuery({
    queryKey: [...queries.teamsByUniversity.key, university, 'infinite'],
    queryFn: ({ pageParam = 0 }) =>
      queries.teamsByUniversity.fn(university, pageParam as number, size),
    getNextPageParam: (lastPage: any, allPages) => {
      if (lastPage.last) return undefined;
      return allPages.length;
    },
    initialPageParam: 0,
    enabled: !!university,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}

export function useTeam(teamId: string | number) {
  return useQuery({
    queryKey: queries.team.key(teamId),
    queryFn: () => queries.team.fn(teamId),
    enabled: !!teamId,
  });
}

export function useTeamMembers(
  teamId: string | number,
  page: number = 0,
  size: number = 10
) {
  return useQuery({
    queryKey: queries.teamMembers.key(teamId, page, size),
    queryFn: () => queries.teamMembers.fn(teamId, page, size),
    enabled: !!teamId,
  });
}

export function useTeamMember(
  teamId: string | number,
  userId: string | number
) {
  return useQuery({
    queryKey: queries.teamMember.key(teamId, userId),
    queryFn: () => queries.teamMember.fn(teamId, userId),
    enabled: !!teamId && !!userId,
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

export function useTeamRecentMatches(status?: string) {
  return useQuery({
    queryKey: queries.teamRecentMatches.key(status),
    queryFn: () => queries.teamRecentMatches.fn(status),
    enabled: true,
  });
}

export function useTeamJoinWaitingList(
  teamId: string | number,
  status: string = 'PENDING',
  page: number = 0,
  size: number = 10
) {
  return useQuery({
    queryKey: queries.teamJoinWaitingList.key(teamId, status, page, size),
    queryFn: () => queries.teamJoinWaitingList.fn(teamId, status, page, size),
    enabled: !!teamId,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
}

export function useCreateTeamMutation() {
  return useMutation({
    mutationFn: (teamData: CreateTeamRequest): Promise<CreateTeamResponse> =>
      api.createTeam(teamData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queries.userProfile.key });
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
      queryClient.invalidateQueries({ queryKey: queries.userProfile.key });
    },
    onError: (error: unknown) => {
      console.error('팀 참여 실패:', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queries.userProfile.key });
    },
  });
}

export function useLogout() {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      console.log('🚪 useLogout: 로그아웃 성공!');
      console.log('🧹 useLogout: 캐시 정리 중...');
      await queryClient.clear(); // 비동기 캐시 정리 확실히
      console.log('✅ useLogout: 캐시 정리 완료');
      console.log('🔙 useLogout: 로그인 화면으로 이동 중...');
      router.replace('/(auth)/login'); // 명시적으로 로그인 화면으로
      console.log('✅ useLogout: 로그인 화면 이동 완료');
    },
    onError: (error: unknown) => {
      console.error('❌ useLogout: 로그아웃 실패', error);
    },
  });
}

export function useLoginMutation() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: queries.login.fn,
    onSuccess: async (data: LoginResponse) => {
      console.log('🎉 useLoginMutation: 로그인 성공!', {
        hasAccessToken: !!data.accessToken,
        accessToken: data.accessToken ? '토큰 있음' : '토큰 없음',
      });

      console.log('🔐 useLoginMutation: AuthContext login 호출 중...');
      await login(data.accessToken);

      console.log('🧹 useLoginMutation: 다른 사용자 데이터 정리 중...');
      await queryClient.clear();

      console.log('🏠 useLoginMutation: 홈으로 이동 중...');
      router.replace('/(tabs)');
      console.log('✅ useLoginMutation: 홈 이동 완료');
    },
    onError: (error: unknown) => {
      console.error('❌ useLoginMutation: 로그인 실패', error);
    },
  });
}

export function useRegisterMutation() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: queries.register.fn,
    onSuccess: async (data: RegisterResponse) => {
      console.log('🎉 useRegisterMutation: 회원가입 성공!', {
        hasAccessToken: !!data.accessToken,
        accessToken: data.accessToken ? '토큰 있음' : '토큰 없음',
      });

      console.log('🔐 useRegisterMutation: AuthContext login 호출 중...');
      await login(data.accessToken);

      console.log('🧹 useRegisterMutation: 다른 사용자 데이터 정리 중...');
      await queryClient.clear();

      console.log('🏠 useRegisterMutation: 홈으로 이동 중...');
      router.replace('/(tabs)');
      console.log('✅ useRegisterMutation: 홈 이동 완료');
    },
    onError: (error: unknown) => {
      console.error('❌ useRegisterMutation: 회원가입 실패', error);
    },
  });
}

export function useSendVerificationMutation() {
  return useMutation({
    mutationFn: queries.sendVerification.fn,
    onSuccess: (data: SendVerificationResponse) => {},
    onError: (error: unknown) => {
      console.error('이메일 인증번호 전송 실패:', error);
    },
  });
}

export function useVerifyEmailMutation() {
  return useMutation({
    mutationFn: queries.verifyEmail.fn,
    onSuccess: (data: VerifyEmailResponse) => {},
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
      queryClient.invalidateQueries({ queryKey: queries.userProfile.key });
    },
    onError: (error: unknown) => {
      console.error('프로필 수정 실패:', error);
    },
  });
}

export function useDeleteProfileMutation() {
  return useMutation({
    mutationFn: () => api.profileApi.deleteProfile(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queries.userProfile.key });
    },
    onError: (error: unknown) => {
      console.error('계정 탈퇴 실패:', error);
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

export function useUpdateTeamMutation() {
  return useMutation({
    mutationFn: ({
      teamId,
      data,
    }: {
      teamId: string | number;
      data: {
        name: string;
        description: string;
        university: string;
        skillLevel: SkillLevel;
        teamType: TeamType;
      };
    }) => api.teamEditApi.updateTeam(teamId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queries.team.key(variables.teamId),
      });
      queryClient.invalidateQueries({ queryKey: queries.userProfile.key });
    },
    onError: (error: unknown) => {
      console.error('팀 정보 수정 실패:', error);
    },
  });
}

export function useDeleteTeamMutation() {
  return useMutation({
    mutationFn: (teamId: string | number) =>
      api.teamDeleteApi.deleteTeam(teamId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queries.userProfile.key });
    },
    onError: (error: unknown) => {
      console.error('팀 삭제 실패:', error);
    },
  });
}

export function useTeamExitMutation() {
  return useMutation({
    mutationFn: (teamId: string | number) => api.teamExitApi.exitTeam(teamId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      queryClient.invalidateQueries({ queryKey: ['teamMembers'] });
      queryClient.invalidateQueries({ queryKey: queries.userProfile.key });
      router.replace(ROUTES.TEAM_GUIDE);
    },
    onError: (error: unknown) => {
      console.error('팀 나가기 실패:', error);
    },
  });
}
