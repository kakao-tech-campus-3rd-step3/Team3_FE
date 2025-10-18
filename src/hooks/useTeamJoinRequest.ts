import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { teamJoinRequestApi, userJoinWaitingApi } from '@/src/api/team';
import type {
  JoinWaitingRequest,
  JoinWaitingCancelRequest,
} from '@/src/types/team';

export const useTeamJoinRequest = () => {
  const queryClient = useQueryClient();

  const joinWaitingMutation = useMutation({
    mutationFn: ({
      teamId,
      data,
    }: {
      teamId: string | number;
      data: JoinWaitingRequest;
    }) => teamJoinRequestApi.joinWaiting(teamId, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['myJoinWaitingList'],
      });
      queryClient.invalidateQueries({
        queryKey: ['teamJoinWaitingList', variables.teamId],
      });
      queryClient.invalidateQueries({
        queryKey: ['teamDetail', variables.teamId],
      });
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
    }) => teamJoinRequestApi.cancelJoinRequest(teamId, joinWaitingId, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['myJoinWaitingList'],
      });
      queryClient.invalidateQueries({
        queryKey: ['teamJoinWaitingList', variables.teamId],
      });
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
};

export const useMyJoinWaitingList = (
  page: number = 0,
  size: number = 10,
  sort: string = 'createdAt,desc'
) => {
  return useQuery({
    queryKey: ['myJoinWaitingList', page, size, sort],
    queryFn: () => userJoinWaitingApi.getMyJoinWaitingList(page, size, sort),
  });
};
