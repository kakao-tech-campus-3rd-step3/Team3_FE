import {
  useQuery,
  useMutation,
  keepPreviousData,
  useInfiniteQuery,
  UseQueryOptions,
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
  VerifyEmailRequest,
  UpdateProfileRequest,
  TeamMemberRole,
  SkillLevel,
  TeamType,
  VerifyCodeRequest,
  ResetPasswordRequest,
  VerifyCodeRequestSignup,
  MatchWaitingHistoryResponseDto,
  MatchWaitingResponseDto,
  MatchWaitingListRequestDto,
  EnemyTeamResponseDto,
  TeamListPageResponse,
  MatchCreateRequestDto,
  MatchRequestRequestDto,
  RecommendedMatch,
  JoinWaitingRequest,
  JoinWaitingCancelRequest,
  TeamMember,
  RecruitmentCreateRequest,
  RecruitmentUpdateRequest,
  TeamReviewRequest,
  TeamMemberSliceResponse,
} from '@/src/types';
import {
  ApiLineupItem,
  CreateLineupRequest,
  CreateLineupResponse,
} from '@/src/types/lineup';
import { addDaysToDate, formatDateForAPI } from '@/src/utils/date';

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
  sendPasswordResetCode: {
    key: ['sendPasswordResetCode'] as const,
    fn: (email: string) => api.passwordResetApi.sendCode(email),
  },
  verifyCode: {
    key: ['verifyCode'] as const,
    fn: (data: VerifyCodeRequest) => api.passwordResetApi.verifyCode(data),
  },
  resetPassword: {
    key: ['resetPassword'] as const,
    fn: (data: ResetPasswordRequest) => api.passwordResetApi.confirm(data),
  },
  sendCode: {
    key: ['sendCode'] as const,
    fn: (email: string) => api.authApi.sendCode(email),
  },
  verifyCodeSignup: {
    key: ['verifyCodeSignup'] as const,
    fn: (data: VerifyCodeRequestSignup) => api.authApi.verifyCode(data),
  },
  userProfile: {
    key: ['user', 'profile'] as const,
    fn: () => api.profileApi.getProfile(),
  },
  userProfileById: {
    key: (userId: string | number) => ['user', 'profile', userId] as const,
    fn: (userId: string | number) => api.profileApi.getProfileById(userId),
  },
  updateProfile: {
    key: ['updateProfile'] as const,
    fn: (data: UpdateProfileRequest) => api.profileApi.updateProfile(data),
  },
  deleteProfile: {
    key: ['deleteProfile'] as const,
    fn: () => api.profileApi.deleteProfile(),
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
  removeMember: {
    key: ['removeMember'] as const,
    fn: ({
      teamId,
      userId,
    }: {
      teamId: string | number;
      userId: string | number;
    }) => api.teamMemberApi.removeMember(teamId, userId),
  },
  updateMemberRole: {
    key: ['updateMemberRole'] as const,
    fn: ({
      teamId,
      userId,
      role,
    }: {
      teamId: string | number;
      userId: string | number;
      role: TeamMemberRole;
    }) => api.teamMemberApi.updateMemberRole(teamId, userId, role),
  },
  delegateLeadership: {
    key: ['delegateLeadership'] as const,
    fn: ({
      teamId,
      memberId,
    }: {
      teamId: string | number;
      memberId: string | number;
    }) => api.teamMemberApi.delegateLeadership(teamId, memberId),
  },
  updateTeam: {
    key: ['updateTeam'] as const,
    fn: ({
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
  },
  deleteTeam: {
    key: ['deleteTeam'] as const,
    fn: (teamId: string | number) => api.teamDeleteApi.deleteTeam(teamId),
  },
  exitTeam: {
    key: ['exitTeam'] as const,
    fn: (teamId: string | number) => api.teamExitApi.exitTeam(teamId),
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
  acceptMatchRequest: {
    key: ['acceptMatchRequest'] as const,
    fn: (requestId: number | string) => api.acceptMatchRequestApi(requestId),
  },
  rejectMatchRequest: {
    key: ['rejectMatchRequest'] as const,
    fn: (requestId: number | string) => api.rejectMatchRequestApi(requestId),
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
  approveJoinRequest: {
    key: ['approveJoinRequest'] as const,
    fn: ({
      teamId,
      requestId,
      role,
    }: {
      teamId: string | number;
      requestId: string | number;
      role: '회장' | '부회장' | '일반멤버';
    }) =>
      api.teamJoinRequestApi.approveJoinRequest(teamId, requestId, { role }),
  },
  rejectJoinRequest: {
    key: ['rejectJoinRequest'] as const,
    fn: ({
      teamId,
      requestId,
      reason,
    }: {
      teamId: string | number;
      requestId: string | number;
      reason: string;
    }) =>
      api.teamJoinRequestApi.rejectJoinRequest(teamId, requestId, { reason }),
  },
  joinWaiting: {
    key: ['joinWaiting'] as const,
    fn: ({
      teamId,
      data,
    }: {
      teamId: string | number;
      data: JoinWaitingRequest;
    }) => api.teamJoinRequestApi.joinWaiting(teamId, data),
  },
  cancelJoinRequest: {
    key: ['cancelJoinRequest'] as const,
    fn: ({
      teamId,
      joinWaitingId,
      data,
    }: {
      teamId: string | number;
      joinWaitingId: string | number;
      data: JoinWaitingCancelRequest;
    }) => api.teamJoinRequestApi.cancelJoinRequest(teamId, joinWaitingId, data),
  },
  teamMatchRequests: {
    key: ['teamMatchRequests'] as const,
    fn: async () => {
      const response = await api.teamMatchApi.getTeamMatchRequests();
      return response.content;
    },
  },
  myAppliedMatches: {
    key: ['my-applied-matches'] as const,
    fn: () => api.getMyAppliedMatches(),
  },
  myCreatedMatches: {
    key: ['my-created-matches'] as const,
    fn: () => api.getMyCreatedMatches(),
  },
  matchWaitingList: {
    key: (params: MatchWaitingListRequestDto) =>
      ['match-waiting-list', params] as const,
    fn: (params: MatchWaitingListRequestDto) => api.getMatchWaitingList(params),
  },
  venues: {
    key: ['venues'] as const,
    fn: () => api.getVenues(),
  },
  enemyTeam: {
    key: (matchId: number | string) => ['enemy-team', matchId] as const,
    fn: (matchId: number | string) => api.getEnemyTeam(matchId),
  },
  mercenaryRecruitments: {
    key: (
      page: number = 0,
      size: number = 10,
      sort: string = 'matchDate,asc'
    ) => ['mercenaryRecruitments', page, size, sort] as const,
    fn: (page: number = 0, size: number = 10, sort: string = 'matchDate,asc') =>
      api.mercenaryApi.getMercenaryRecruitments(page, size, sort),
  },
  mercenaryRecruitment: {
    key: (id: number) => ['mercenaryRecruitment', id] as const,
    fn: (id: number) => api.mercenaryApi.getMercenaryRecruitmentById(id),
  },
  myMercenaryRecruitments: {
    key: (
      page: number = 0,
      size: number = 10,
      sort: string = 'matchDate,asc'
    ) => ['myMercenaryRecruitments', page, size, sort] as const,
    fn: (page: number = 0, size: number = 10, sort: string = 'matchDate,asc') =>
      api.mercenaryApi.getMyMercenaryRecruitments(page, size, sort),
  },
  myJoinWaitingList: {
    key: (
      page: number = 0,
      size: number = 10,
      sort: string = 'audit.createdAt,desc'
    ) => ['myJoinWaitingList', page, size, sort] as const,
    fn: (
      page: number = 0,
      size: number = 10,
      sort: string = 'audit.createdAt,desc'
    ) => api.userJoinWaitingApi.getMyJoinWaitingList(page, size, sort),
  },
  createMercenaryRecruitment: {
    key: ['createMercenaryRecruitment'] as const,
    fn: (data: RecruitmentCreateRequest) =>
      api.createMercenaryRecruitment(data),
  },
  updateMercenaryRecruitment: {
    key: ['updateMercenaryRecruitment'] as const,
    fn: ({ id, data }: { id: number; data: RecruitmentUpdateRequest }) =>
      api.mercenaryApi.updateMercenaryRecruitment(id, data),
  },
  deleteMercenaryRecruitment: {
    key: ['deleteMercenaryRecruitment'] as const,
    fn: (id: number) => api.mercenaryApi.deleteMercenaryRecruitment(id),
  },
  createTeamReview: {
    key: ['createTeamReview'] as const,
    fn: (data: TeamReviewRequest) => api.teamReviewApi.createReview(data),
  },
} as const;

export function useUserProfile() {
  const { token, isInitialized } = useAuth();

  return useQuery({
    queryKey: queries.userProfile.key,
    queryFn: queries.userProfile.fn,
    enabled: !!token && isInitialized,
  });
}

export function useUserProfileById(userId: string | number | undefined) {
  const { token, isInitialized } = useAuth();

  return useQuery({
    queryKey: userId
      ? queries.userProfileById.key(userId)
      : ['user', 'profile', 'undefined'],
    queryFn: () => queries.userProfileById.fn(userId as string | number),
    enabled: !!token && isInitialized && !!userId,
  });
}

export function useTeamMatchRequests() {
  const { token, isInitialized } = useAuth();

  return useQuery({
    queryKey: queries.teamMatchRequests.key,
    queryFn: queries.teamMatchRequests.fn,
    enabled: !!token && isInitialized,
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
    getNextPageParam: (lastPage: TeamListPageResponse, allPages) => {
      if (lastPage.last) return undefined;
      return allPages.length;
    },
    initialPageParam: 0,
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

export function useTeamMembers(
  teamId: string | number,
  page: number = 0,
  size: number = 10
) {
  const query = useQuery({
    queryKey: queries.teamMembers.key(teamId, page, size),
    queryFn: () => queries.teamMembers.fn(teamId, page, size),
    enabled: !!teamId,
  });
  const members = query.data?.content ?? [];
  return { ...query, members };
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

export function useTeamRecentMatches(
  status?: string,
  options?: UseQueryOptions<unknown, Error>
) {
  return useQuery({
    queryKey: queries.teamRecentMatches.key(status),
    queryFn: () => queries.teamRecentMatches.fn(status),
    enabled: true,
    ...options,
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
  });
}

export function useMyAppliedMatches() {
  const { data: userProfile } = useUserProfile();

  return useQuery<MatchWaitingHistoryResponseDto[], Error>({
    queryKey: queries.myAppliedMatches.key,
    queryFn: queries.myAppliedMatches.fn,
    enabled: !!userProfile?.teamId,
  });
}

export function useMyCreatedMatches(
  options?: UseQueryOptions<MatchWaitingResponseDto[], Error>
) {
  return useQuery<MatchWaitingResponseDto[], Error>({
    queryKey: queries.myCreatedMatches.key,
    queryFn: queries.myCreatedMatches.fn,
    ...options,
  });
}

export function useMatchWaitingList(
  params: MatchWaitingListRequestDto,
  options?: UseQueryOptions<MatchWaitingResponseDto[], Error>
) {
  return useQuery<MatchWaitingResponseDto[], Error>({
    queryKey: queries.matchWaitingList.key(params),
    queryFn: () => queries.matchWaitingList.fn(params),
    ...options,
  });
}

export function useVenues() {
  return useQuery({
    queryKey: queries.venues.key,
    queryFn: queries.venues.fn,
  });
}

export function useEnemyTeam(matchId: number | string | undefined) {
  return useQuery<EnemyTeamResponseDto>({
    queryKey: queries.enemyTeam.key(matchId!),
    queryFn: () => queries.enemyTeam.fn(matchId!),
    enabled: !!matchId,
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
    onSuccess: () => {
      router.replace(ROUTES.LOGIN);
    },
    onError: (error: unknown) => {
      console.error('로그아웃 실패:', error);
    },
  });
}

export function useLoginMutation() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: queries.login.fn,
    onSuccess: async (data: LoginResponse) => {
      await login(
        data.accessToken,
        data.refreshToken,
        data.accessTokenExpiresIn
      );
      queryClient.clear();
      router.replace(ROUTES.HOME);
    },
    onError: (error: unknown) => {
      console.error('로그인 실패:', error);
    },
  });
}

export function useRegisterMutation() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: queries.register.fn,
    onSuccess: async (data: RegisterResponse) => {
      await login(
        data.accessToken,
        data.refreshToken,
        data.accessTokenExpiresIn
      );
      queryClient.clear();
      router.replace(ROUTES.HOME);
    },
    onError: (error: unknown) => {
      console.error('회원가입 실패:', error);
    },
  });
}

export function useSendPasswordResetCodeMutation() {
  return useMutation({
    mutationFn: queries.sendPasswordResetCode.fn,
    onError: (error: unknown) => {
      console.error('인증번호 발송 실패:', error);
    },
  });
}

export function useVerifyCodeMutation() {
  return useMutation({
    mutationFn: queries.verifyCode.fn,
    onError: (error: unknown) => {
      console.error('인증코드 검증 실패:', error);
    },
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: queries.resetPassword.fn,
    onError: (error: unknown) => {
      console.error('비밀번호 변경 실패:', error);
    },
  });
}

export function useSendCodeMutation() {
  return useMutation({
    mutationFn: queries.sendCode.fn,
    onError: (error: unknown) => {
      console.error('인증번호 발송 실패:', error);
    },
  });
}

export function useVerifyCodeSignupMutation() {
  return useMutation({
    mutationFn: queries.verifyCodeSignup.fn,
    onError: (error: unknown) => {
      console.error('인증코드 검증 실패:', error);
    },
  });
}

export function useUpdateProfileMutation() {
  return useMutation({
    mutationFn: queries.updateProfile.fn,
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
    mutationFn: queries.deleteProfile.fn,
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
    mutationFn: queries.removeMember.fn,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['teamMembers', variables.teamId],
      });
      queryClient.invalidateQueries({
        queryKey: queries.team.key(variables.teamId),
      });
    },
    onError: (error: unknown) => {
      console.error('멤버 삭제 실패:', error);
    },
  });
}

export function useUpdateMemberRoleMutation() {
  return useMutation({
    mutationFn: queries.updateMemberRole.fn,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['teamMembers', variables.teamId],
      });
      queryClient.invalidateQueries({
        queryKey: queries.team.key(variables.teamId),
      });
    },
    onError: (error: unknown) => {
      console.error('멤버 역할 수정 실패:', error);
    },
  });
}

export function useUpdateTeamMutation() {
  return useMutation({
    mutationFn: queries.updateTeam.fn,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queries.team.key(variables.teamId),
      });
    },
    onError: (error: unknown) => {
      console.error('팀 정보 수정 실패:', error);
    },
  });
}

export function useDeleteTeamMutation() {
  return useMutation({
    mutationFn: queries.deleteTeam.fn,
    onSuccess: (_, teamId) => {
      queryClient.invalidateQueries({ queryKey: queries.team.key(teamId) });
      queryClient.invalidateQueries({
        queryKey: ['teamMembers', teamId],
      });
      queryClient.invalidateQueries({ queryKey: queries.userProfile.key });
    },
    onError: (error: unknown) => {
      console.error('[팀 삭제 Mutation] API 실패:', error);
    },
  });
}

export function useTeamExitMutation() {
  return useMutation({
    mutationFn: queries.exitTeam.fn,
    onSuccess: (_, teamId) => {
      queryClient.invalidateQueries({ queryKey: queries.team.key(teamId) });
      queryClient.invalidateQueries({
        queryKey: ['teamMembers', teamId],
      });
      queryClient.invalidateQueries({ queryKey: queries.userProfile.key });
    },
    onError: (error: unknown) => {
      console.error('팀 나가기 실패:', error);
    },
  });
}

export function useDelegateLeadershipMutation() {
  return useMutation({
    mutationFn: queries.delegateLeadership.fn,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['teamMembers', variables.teamId],
      });
      queryClient.invalidateQueries({
        queryKey: queries.team.key(variables.teamId),
      });
    },
    onError: (error: unknown) => {
      console.error('리더십 위임 실패:', error);
    },
  });
}

export function useAcceptMatchRequestMutation() {
  return useMutation({
    mutationFn: queries.acceptMatchRequest.fn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queries.teamMatchRequests.key,
      });
      queryClient.invalidateQueries({
        queryKey: ['teamRecentMatches'],
      });
    },
    onError: (error: unknown) => {
      console.error('매치 요청 승인 실패:', error);
    },
  });
}

export function useRejectMatchRequestMutation() {
  return useMutation({
    mutationFn: queries.rejectMatchRequest.fn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queries.teamMatchRequests.key,
      });
    },
    onError: (error: unknown) => {
      console.error('매치 요청 거절 실패:', error);
    },
  });
}
export function useJoinWaitingMutation() {
  return useMutation({
    mutationFn: queries.joinWaiting.fn,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['myJoinWaitingList'],
      });
      queryClient.invalidateQueries({
        queryKey: queries.teamJoinWaitingList.key(variables.teamId),
      });
      queryClient.invalidateQueries({
        queryKey: queries.team.key(variables.teamId),
      });
    },
    onError: (error: unknown) => {
      console.error('팀 가입 요청 실패:', error);
    },
  });
}

export function useCancelJoinRequestMutation() {
  return useMutation({
    mutationFn: queries.cancelJoinRequest.fn,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['myJoinWaitingList'],
      });
      queryClient.invalidateQueries({
        queryKey: queries.teamJoinWaitingList.key(variables.teamId),
      });
    },
    onError: (error: unknown) => {
      console.error('팀 가입 요청 취소 실패:', error);
    },
  });
}

export function useApproveJoinRequestMutation() {
  return useMutation({
    mutationFn: queries.approveJoinRequest.fn,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queries.teamJoinWaitingList.key(variables.teamId),
      });
      queryClient.invalidateQueries({
        queryKey: ['teamMembers', variables.teamId],
      });
      queryClient.invalidateQueries({
        queryKey: queries.team.key(variables.teamId),
      });
    },
    onError: (error: unknown) => {
      console.error('가입 요청 승인 실패:', error);
    },
  });
}

export function useRejectJoinRequestMutation() {
  return useMutation({
    mutationFn: queries.rejectJoinRequest.fn,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queries.teamJoinWaitingList.key(variables.teamId),
      });
    },
    onError: (error: unknown) => {
      console.error('가입 요청 거절 실패:', error);
    },
  });
}

export function useCreateMatchMutation() {
  return useMutation({
    mutationFn: (payload: MatchCreateRequestDto) => api.createMatch(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queries.myCreatedMatches.key });
    },
    onError: (error: unknown) => {
      console.error('매치 생성 실패:', error);
    },
  });
}

export function useMatchRequestMutation() {
  return useMutation({
    mutationFn: ({
      waitingId,
      payload,
    }: {
      waitingId: number | string;
      payload: MatchRequestRequestDto;
    }) => api.requestMatchApi(waitingId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['match-waiting-list'] });
    },
    onError: (error: unknown) => {
      console.error('매치 요청 실패:', error);
    },
  });
}

export function useCancelMatchMutation() {
  return useMutation({
    mutationFn: (waitingId: number) => api.cancelCreatedMatchApi(waitingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queries.myCreatedMatches.key });
      queryClient.invalidateQueries({ queryKey: queries.userProfile.key });
    },
    onError: (error: unknown) => {
      console.error('매치 취소 실패:', error);
    },
  });
}

export function useCancelMatchRequestMutation() {
  return useMutation({
    mutationFn: (requestId: number | string) =>
      api.cancelMatchRequestById(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queries.myAppliedMatches.key });
      queryClient.invalidateQueries({ queryKey: queries.userProfile.key });
    },
    onError: (error: unknown) => {
      console.error('매치 요청 취소 실패:', error);
    },
  });
}

export function useCreateTeamReviewMutation() {
  return useMutation({
    mutationFn: queries.createTeamReview.fn,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['teamReviews', variables.reviewedTeamId],
      });
      queryClient.invalidateQueries({
        queryKey: ['teamReviews', variables.reviewerTeamId],
      });
    },
    onError: (error: unknown) => {
      console.error('팀 리뷰 등록 실패:', error);
    },
  });
}

const fetchWaitingMatches = async (): Promise<MatchWaitingResponseDto[]> => {
  const today = new Date();
  const todayString = formatDateForAPI(today);

  try {
    let result = await api.getMatchWaitingList({
      selectDate: todayString,
      startTime: '00:00:00',
    });

    if (result.length === 0) {
      const tomorrow = addDaysToDate(today, 1);
      const tomorrowString = formatDateForAPI(tomorrow);

      const tomorrowResult = await api.getMatchWaitingList({
        selectDate: tomorrowString,
        startTime: '00:00:00',
      });

      result = [...result, ...tomorrowResult];

      if (tomorrowResult.length === 0) {
        const dayAfterTomorrow = addDaysToDate(today, 2);
        const dayAfterTomorrowString = formatDateForAPI(dayAfterTomorrow);

        const dayAfterTomorrowResult = await api.getMatchWaitingList({
          selectDate: dayAfterTomorrowString,
          startTime: '00:00:00',
        });

        result = [...result, ...dayAfterTomorrowResult];
      }
    }

    return result;
  } catch (error) {
    console.error('[추천매치] API 호출 실패:', error);
    throw error;
  }
};

const transformToRecommendedMatch = (
  match: MatchWaitingResponseDto
): RecommendedMatch => {
  const teamName =
    typeof match.teamName === 'string' ? match.teamName : match.teamName.name;

  return {
    id: match.waitingId,
    teamName,
    university: '',
    skillLevel: `${match.skillLevelMin} - ${match.skillLevelMax}`,
    matchDate: match.preferredDate,
    location: `장소 ID: ${match.preferredVenueId}`,
  };
};

const getRecommendedMatches = (
  matches: MatchWaitingResponseDto[]
): RecommendedMatch[] => {
  const today = new Date();
  const threeDaysLater = addDaysToDate(today, 3);

  const upcomingMatches = matches.filter(match => {
    const matchDate = new Date(match.preferredDate);
    return matchDate >= today && matchDate <= threeDaysLater;
  });

  const shuffled = [...upcomingMatches].sort(() => 0.5 - Math.random());
  const selectedMatches = shuffled.slice(0, 1);

  return selectedMatches.map(transformToRecommendedMatch);
};

export function useRecommendedMatches() {
  const { data: userProfile } = useUserProfile();

  return useQuery({
    queryKey: ['recommendedMatches'],
    queryFn: fetchWaitingMatches,
    select: getRecommendedMatches,
    enabled: !!userProfile?.teamId,
  });
}

export function useMyJoinWaitingList(
  page: number = 0,
  size: number = 10,
  sort: string = 'audit.createdAt,desc'
) {
  return useQuery({
    queryKey: queries.myJoinWaitingList.key(page, size, sort),
    queryFn: () => queries.myJoinWaitingList.fn(page, size, sort),
  });
}

export function useCreateMercenaryRecruitment() {
  return useMutation({
    mutationFn: queries.createMercenaryRecruitment.fn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['mercenaryRecruitments'],
      });
    },
    onError: (error: unknown) => {
      console.error('용병 모집 게시글 생성 실패:', error);
    },
  });
}

export function useMercenaryRecruitments(
  page: number = 0,
  size: number = 10,
  sort: string = 'matchDate,asc'
) {
  return useQuery({
    queryKey: queries.mercenaryRecruitments.key(page, size, sort),
    queryFn: () => queries.mercenaryRecruitments.fn(page, size, sort),
  });
}

export function useMercenaryRecruitment(id: number) {
  return useQuery({
    queryKey: queries.mercenaryRecruitment.key(id),
    queryFn: () => queries.mercenaryRecruitment.fn(id),
    enabled: !!id,
  });
}

export function useMyMercenaryRecruitments(
  page: number = 0,
  size: number = 10,
  sort: string = 'matchDate,asc'
) {
  return useQuery({
    queryKey: queries.myMercenaryRecruitments.key(page, size, sort),
    queryFn: () => queries.myMercenaryRecruitments.fn(page, size, sort),
  });
}

export function useUpdateMercenaryRecruitment() {
  return useMutation({
    mutationFn: queries.updateMercenaryRecruitment.fn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['mercenaryRecruitments'],
      });
      queryClient.invalidateQueries({
        queryKey: ['mercenaryRecruitment'],
      });
      queryClient.invalidateQueries({
        queryKey: ['myMercenaryRecruitments'],
      });
    },
    onError: (error: unknown) => {
      console.error('용병 모집 게시글 수정 실패:', error);
    },
  });
}

export function useDeleteMercenaryRecruitment() {
  return useMutation({
    mutationFn: queries.deleteMercenaryRecruitment.fn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['mercenaryRecruitments'],
      });
      queryClient.invalidateQueries({
        queryKey: ['mercenaryRecruitment'],
      });
      queryClient.invalidateQueries({
        queryKey: ['myMercenaryRecruitments'],
      });
    },
    onError: (error: unknown) => {
      console.error('용병 모집 게시글 삭제 실패:', error);
    },
  });
}

export function useTeamMembersInfinite(
  teamId: string | number,
  size: number = 10
) {
  return useInfiniteQuery<TeamMemberSliceResponse>({
    queryKey: ['teamMembersSlice', teamId],
    queryFn: ({ pageParam }) =>
      api.teamMemberApi.getTeamMembersSlice(
        teamId,
        pageParam ? Number(pageParam) : undefined,
        size
      ),
    getNextPageParam: lastPage => {
      if (lastPage.hasNext && lastPage.members.length > 0) {
        return lastPage.members[lastPage.members.length - 1].id;
      }
      return undefined;
    },
    enabled: !!teamId,
    initialPageParam: undefined,
  });
}

export function useCreateLineupsMutation() {
  return useMutation<CreateLineupResponse, Error, CreateLineupRequest>({
    mutationFn: data => api.lineupApi.createLineups(data),

    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['teamMembers'] });
      queryClient.invalidateQueries({ queryKey: ['team'] });
    },

    onError: error => {
      console.error('❌ 라인업 생성 실패:', error);
    },
  });
}

export function useLineupDetail(lineupId?: number) {
  return useQuery<ApiLineupItem[]>({
    queryKey: ['lineup', lineupId],
    queryFn: () => api.getLineupById(lineupId as number),
    enabled: !!lineupId,
    staleTime: 1000 * 30,
  });
}

export function useMyMatchRequests() {
  const { token, isInitialized } = useAuth();

  return useQuery<MatchWaitingHistoryResponseDto[], Error>({
    queryKey: ['myMatchRequests'],
    queryFn: async () => {
      const response = await api.getMyMatchRequests();
      return response;
    },
    enabled: !!token && isInitialized,
  });
}
