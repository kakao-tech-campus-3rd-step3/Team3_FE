import {
  useMutation,
  useQuery,
  useInfiniteQuery,
  keepPreviousData,
  UseQueryOptions,
} from '@tanstack/react-query';
import { router } from 'expo-router';

import { ROUTES } from '@/src/constants/routes';
import { queryClient } from '@/src/lib/query_client';
import type {
  TeamListPageResponse,
  TeamMemberSliceResponse,
} from '@/src/types';

import { profileQueries } from '../profile/queries';

import { teamQueries } from './queries';

export function useUniversityTeamList() {
  return useQuery({
    queryKey: teamQueries.universityTeamList.key,
    queryFn: teamQueries.universityTeamList.fn,
  });
}

export function useTeamsByUniversity(
  university: string,
  page: number = 0,
  size: number = 10
) {
  return useQuery({
    queryKey: [...teamQueries.teamsByUniversity.key, university, page, size],
    queryFn: () => teamQueries.teamsByUniversity.fn(university, page, size),
    enabled: !!university,
    placeholderData: keepPreviousData,
  });
}

export function useTeamsByUniversityInfinite(
  university: string,
  size: number = 10
) {
  return useInfiniteQuery({
    queryKey: [...teamQueries.teamsByUniversity.key, university, 'infinite'],
    queryFn: ({ pageParam = 0 }) =>
      teamQueries.teamsByUniversity.fn(university, pageParam as number, size),
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
    queryKey: teamQueries.team.key(teamId),
    queryFn: () => teamQueries.team.fn(teamId),
    enabled: !!teamId,
  });
}

export function useTeamMembers(
  teamId: string | number,
  page: number = 0,
  size: number = 10
) {
  const query = useQuery({
    queryKey: teamQueries.teamMembers.key(teamId, page, size),
    queryFn: () => teamQueries.teamMembers.fn(teamId, page, size),
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
    queryKey: teamQueries.teamMember.key(teamId, userId),
    queryFn: () => teamQueries.teamMember.fn(teamId, userId),
    enabled: !!teamId && !!userId,
  });
}

export function useTeamJoinRequests(teamId: string | number) {
  return useQuery({
    queryKey: teamQueries.teamJoinRequests.key(teamId),
    queryFn: () => teamQueries.teamJoinRequests.fn(teamId),
    enabled: !!teamId,
  });
}

export function useTeamMatches(teamId: string | number) {
  return useQuery({
    queryKey: teamQueries.teamMatches.key(teamId),
    queryFn: () => teamQueries.teamMatches.fn(teamId),
    enabled: !!teamId,
  });
}

export function useTeamRecentMatches(
  status?: string,
  options?: Partial<UseQueryOptions<unknown, Error>>
) {
  return useQuery({
    queryKey: teamQueries.teamRecentMatches.key(status),
    queryFn: () => teamQueries.teamRecentMatches.fn(status),
    enabled: true,
    ...options,
  });
}

export function useTeamJoinWaitingList(
  teamId: string | number,
  status: string = 'PENDING',
  isMercenary: boolean = false,
  page: number = 0,
  size: number = 10,
  sort: string = 'audit.createdAt,desc'
) {
  return useQuery({
    queryKey: teamQueries.teamJoinWaitingList.key(
      teamId,
      status,
      isMercenary,
      page,
      size,
      sort
    ),
    queryFn: () =>
      teamQueries.teamJoinWaitingList.fn(
        teamId,
        status,
        isMercenary,
        page,
        size,
        sort
      ),
    enabled: !!teamId,
    placeholderData: keepPreviousData,
  });
}

export function useMyJoinWaitingList(
  page: number = 0,
  size: number = 10,
  sort: string = 'audit.createdAt,desc',
  isMercenary: boolean = false
) {
  return useQuery({
    queryKey: teamQueries.myJoinWaitingList.key(page, size, sort, isMercenary),
    queryFn: () =>
      teamQueries.myJoinWaitingList.fn(page, size, sort, isMercenary),
  });
}

export function useTeamMembersInfinite(
  teamId: string | number,
  size: number = 10
) {
  return useInfiniteQuery<TeamMemberSliceResponse>({
    queryKey: teamQueries.teamMembersSlice.key(teamId),
    queryFn: ({ pageParam }) =>
      teamQueries.teamMembersSlice.fn({
        teamId,
        cursorId: pageParam ? Number(pageParam) : undefined,
        size,
      }),
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

export function useCreateTeamMutation() {
  return useMutation({
    mutationFn: teamQueries.createTeam.fn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: profileQueries.userProfile.key,
      });
    },
    onError: (error: unknown) => {
      console.error('팀 생성 실패:', error);
    },
  });
}

export function useJoinTeamMutation() {
  return useMutation({
    mutationFn: teamQueries.joinTeam.fn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: profileQueries.userProfile.key,
      });
    },
    onError: (error: unknown) => {
      console.error('팀 참여 실패:', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: profileQueries.userProfile.key,
      });
    },
  });
}

export function useRemoveMemberMutation() {
  return useMutation({
    mutationFn: teamQueries.removeMember.fn,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: teamQueries.teamMembers.key(variables.teamId, 0, 10),
      });
      queryClient.invalidateQueries({
        queryKey: teamQueries.team.key(variables.teamId),
      });
    },
    onError: (error: unknown) => {
      console.error('멤버 삭제 실패:', error);
    },
  });
}

export function useUpdateMemberRoleMutation() {
  return useMutation({
    mutationFn: teamQueries.updateMemberRole.fn,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: teamQueries.teamMembers.key(variables.teamId, 0, 10),
      });
      queryClient.invalidateQueries({
        queryKey: teamQueries.team.key(variables.teamId),
      });
    },
    onError: (error: unknown) => {
      console.error('멤버 역할 수정 실패:', error);
    },
  });
}

export function useUpdateTeamMutation() {
  return useMutation({
    mutationFn: teamQueries.updateTeam.fn,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: teamQueries.team.key(variables.teamId),
      });
      queryClient.invalidateQueries({
        queryKey: profileQueries.userProfile.key,
      });
    },
    onError: (error: unknown) => {
      console.error('팀 정보 수정 실패:', error);
    },
  });
}

export function useDeleteTeamMutation() {
  return useMutation({
    mutationFn: teamQueries.deleteTeam.fn,
    onSuccess: (_, teamId) => {
      queryClient.invalidateQueries({ queryKey: teamQueries.team.key(teamId) });
      queryClient.invalidateQueries({
        queryKey: teamQueries.teamMembers.key(teamId, 0, 10),
      });
    },
    onError: (error: unknown) => {
      console.error('[팀 삭제 Mutation] API 실패:', error);
    },
  });
}

export function useTeamExitMutation() {
  return useMutation({
    mutationFn: teamQueries.exitTeam.fn,
    onSuccess: (_, teamId) => {
      queryClient.invalidateQueries({ queryKey: teamQueries.team.key(teamId) });
      queryClient.invalidateQueries({
        queryKey: teamQueries.teamMembers.key(teamId, 0, 10),
      });
      queryClient.invalidateQueries({
        queryKey: profileQueries.userProfile.key,
      });
      router.replace(ROUTES.TEAM_GUIDE);
    },
    onError: (error: unknown) => {
      console.error('팀 나가기 실패:', error);
    },
  });
}

export function useDelegateLeadershipMutation() {
  return useMutation({
    mutationFn: teamQueries.delegateLeadership.fn,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['teamMembers', variables.teamId],
      });
      queryClient.invalidateQueries({
        queryKey: teamQueries.team.key(variables.teamId),
      });
    },
    onError: (error: unknown) => {
      console.error('리더십 위임 실패:', error);
    },
  });
}

export function useApproveJoinRequestMutation() {
  return useMutation({
    mutationFn: teamQueries.approveJoinRequest.fn,
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['teamJoinWaitingList', variables.teamId],
      });
      queryClient.invalidateQueries({
        queryKey: teamQueries.teamMembers.key(variables.teamId),
      });
      queryClient.invalidateQueries({
        queryKey: teamQueries.team.key(variables.teamId),
      });
    },
    onError: (error: unknown) => {
      console.error('가입 요청 승인 실패:', error);
    },
  });
}

export function useRejectJoinRequestMutation() {
  return useMutation({
    mutationFn: teamQueries.rejectJoinRequest.fn,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['teamJoinWaitingList', variables.teamId],
      });
    },
    onError: (error: unknown) => {
      console.error('가입 요청 거절 실패:', error);
    },
  });
}

export function useTeamJoinRequestMutation() {
  const joinWaitingMutation = useMutation({
    mutationFn: teamQueries.joinWaiting.fn,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['myJoinWaitingList'],
      });
      queryClient.invalidateQueries({
        queryKey: ['teamJoinWaitingList', variables.teamId],
      });
      queryClient.invalidateQueries({
        queryKey: teamQueries.team.key(variables.teamId),
      });
    },
    onError: (error: unknown) => {
      console.error('팀 가입 요청 실패:', error);
    },
  });

  const cancelJoinRequestMutation = useMutation({
    mutationFn: teamQueries.cancelJoinRequest.fn,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['myJoinWaitingList'],
      });
      queryClient.invalidateQueries({
        queryKey: ['teamJoinWaitingList', variables.teamId],
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
