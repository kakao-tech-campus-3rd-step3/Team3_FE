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
  SendVerificationResponse,
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
} from '@/src/types';
import { formatDateForAPI } from '@/src/utils/date';

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
} as const;

export function useUserProfile() {
  const { token, isInitialized } = useAuth();

  return useQuery({
    queryKey: queries.userProfile.key,
    queryFn: queries.userProfile.fn,
    enabled: !!token && isInitialized,
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
  });
}

export function useMyAppliedMatches(
  options?: UseQueryOptions<MatchWaitingHistoryResponseDto[], Error>
) {
  return useQuery<MatchWaitingHistoryResponseDto[], Error>({
    queryKey: queries.myAppliedMatches.key,
    queryFn: queries.myAppliedMatches.fn,
    ...options,
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
    onSuccess: async () => {
      await queryClient.clear();
      router.replace('/(auth)/login');
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
      await queryClient.clear();
      router.replace('/(tabs)');
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
      await queryClient.clear();
      router.replace('/(tabs)');
    },
    onError: (error: unknown) => {
      console.error('회원가입 실패:', error);
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
    mutationFn: (teamId: string | number) => {
      return api.teamDeleteApi.deleteTeam(teamId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team'] });
      queryClient.invalidateQueries({ queryKey: ['teamMembers'] });
    },
    onError: (error: unknown) => {
      console.error('[팀 삭제 Mutation] API 실패:', error);
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

export function useDelegateLeadershipMutation() {
  return useMutation({
    mutationFn: ({
      teamId,
      memberId,
    }: {
      teamId: string | number;
      memberId: string | number;
    }) => api.teamMemberApi.delegateLeadership(teamId, memberId),
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
    mutationFn: (requestId: number | string) =>
      api.acceptMatchRequestApi(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queries.teamMatchRequests.key,
      });
    },
    onError: (error: unknown) => {
      console.error('매치 요청 승인 실패:', error);
    },
  });
}

export function useRejectMatchRequestMutation() {
  return useMutation({
    mutationFn: (requestId: number | string) =>
      api.rejectMatchRequestApi(requestId),
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

export function useApproveJoinRequestMutation() {
  return useMutation({
    mutationFn: ({
      teamId,
      requestId,
      role,
    }: {
      teamId: string | number;
      requestId: string | number;
      role: '회장' | '부회장' | '일반멤버';
    }) =>
      api.teamJoinRequestApi.approveJoinRequest(teamId, requestId, { role }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queries.teamJoinWaitingList.key(variables.teamId),
      });
      queryClient.invalidateQueries({
        queryKey: queries.teamMembers.key(variables.teamId),
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
    mutationFn: ({
      teamId,
      requestId,
      reason,
    }: {
      teamId: string | number;
      requestId: string | number;
      reason: string;
    }) =>
      api.teamJoinRequestApi.rejectJoinRequest(teamId, requestId, { reason }),
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

const fetchWaitingMatches = async (): Promise<MatchWaitingResponseDto[]> => {
  const today = new Date();
  const todayString = formatDateForAPI(today);

  try {
    let result = await api.getMatchWaitingList({
      selectDate: todayString,
      startTime: '00:00:00',
    });

    if (result.length === 0) {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const tomorrowString = formatDateForAPI(tomorrow);

      const tomorrowResult = await api.getMatchWaitingList({
        selectDate: tomorrowString,
        startTime: '00:00:00',
      });

      result = [...result, ...tomorrowResult];

      if (tomorrowResult.length === 0) {
        const dayAfterTomorrow = new Date(today);
        dayAfterTomorrow.setDate(today.getDate() + 2);
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
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(today.getDate() + 3);

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

export function useTeamJoinRequestMutation() {
  const joinWaitingMutation = useMutation({
    mutationFn: ({
      teamId,
      data,
    }: {
      teamId: string | number;
      data: JoinWaitingRequest;
    }) => api.teamJoinRequestApi.joinWaiting(teamId, data),
    onSuccess: (data, variables) => {
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

  const cancelJoinRequestMutation = useMutation({
    mutationFn: ({
      teamId,
      joinWaitingId,
      data,
    }: {
      teamId: string | number;
      joinWaitingId: string | number;
      data: JoinWaitingCancelRequest;
    }) => api.teamJoinRequestApi.cancelJoinRequest(teamId, joinWaitingId, data),
    onSuccess: (data, variables) => {
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

  return {
    joinWaiting: joinWaitingMutation.mutate,
    isJoining: joinWaitingMutation.isPending,
    joinError: joinWaitingMutation.error,
    joinSuccess: joinWaitingMutation.isSuccess,
    resetJoinState: joinWaitingMutation.reset,
    cancelJoinRequest: cancelJoinRequestMutation.mutate,
    isCanceling: cancelJoinRequestMutation.isPending,
    cancelError: cancelJoinRequestMutation.error,
    cancelSuccess: cancelJoinRequestMutation.isSuccess,
    resetCancelState: cancelJoinRequestMutation.reset,
  };
}

export function useMyJoinWaitingList(
  page: number = 0,
  size: number = 10,
  sort: string = 'createdAt,desc'
) {
  return useQuery({
    queryKey: ['myJoinWaitingList', page, size, sort],
    queryFn: () =>
      api.userJoinWaitingApi.getMyJoinWaitingList(page, size, sort),
  });
}
