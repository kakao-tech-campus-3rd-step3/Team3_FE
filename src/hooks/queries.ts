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
  userProfile: {
    key: ['user', 'profile'] as const,
    fn: () => api.profileApi.getProfile(),
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

export function useUserInfo() {
  return useQuery({
    queryKey: queries.userProfile.key,
    queryFn: queries.userProfile.fn,
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
      queryClient.clear();
    },
  });
}

export function useLoginMutation() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: queries.login.fn,
    onSuccess: (data: LoginResponse) => {
      login(data.authToken);

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
      login(data.accessToken);

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
