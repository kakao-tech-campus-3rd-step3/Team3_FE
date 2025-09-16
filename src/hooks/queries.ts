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

export function useCreateTeamMutation() {
  return useMutation({
    mutationFn: async (
      teamData: CreateTeamRequest
    ): Promise<CreateTeamResponse> => {
      const data: CreateTeamResponse =
        await api.createTeamApi.createTeam(teamData);
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
