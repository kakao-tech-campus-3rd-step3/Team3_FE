import { useQuery, useMutation } from '@tanstack/react-query';

import * as api from '@/src/api';
import { queryClient } from '@/src/lib/query_client';
import type {
  JoinTeamResponse,
  CreateTeamResponse,
  CreateTeamRequest,
} from '@/src/types';
export const queries = {
  userProfile: {
    key: ['user', 'profile'] as const,
    fn: () => api.profileApi.getProfile(),
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

export function useCreateTeamMutation() {
  return useMutation({
    mutationFn: async (
      teamData: CreateTeamRequest
    ): Promise<CreateTeamResponse> => {
      const data: CreateTeamResponse = await api.createTeam(teamData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queries.userProfile.key });
    },
    onError: (error: unknown) => {
      console.error('팀 생성 실패:', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queries.userProfile.key });
    },
  });
}

export function useJoinTeamMutation() {
  return useMutation({
    mutationFn: async (teamId: number): Promise<JoinTeamResponse> => {
      const data: JoinTeamResponse = await api.joinTeamApi.joinTeam(teamId);
      return data;
    },
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
