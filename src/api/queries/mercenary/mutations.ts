import { useMutation, useQuery } from '@tanstack/react-query';

import { queryClient } from '@/src/lib/query_client';

import { mercenaryQueries } from './queries';

export function useMercenaryRecruitments(
  page: number = 0,
  size: number = 10,
  sort: string = 'matchDate,asc'
) {
  return useQuery({
    queryKey: mercenaryQueries.mercenaryRecruitments.key(page, size, sort),
    queryFn: () => mercenaryQueries.mercenaryRecruitments.fn(page, size, sort),
  });
}

export function useMercenaryRecruitment(id: number) {
  return useQuery({
    queryKey: mercenaryQueries.mercenaryRecruitment.key(id),
    queryFn: () => mercenaryQueries.mercenaryRecruitment.fn(id),
    enabled: !!id,
  });
}

export function useMyMercenaryRecruitments(
  page: number = 0,
  size: number = 10,
  sort: string = 'matchDate,asc'
) {
  return useQuery({
    queryKey: mercenaryQueries.myMercenaryRecruitments.key(page, size, sort),
    queryFn: () =>
      mercenaryQueries.myMercenaryRecruitments.fn(page, size, sort),
  });
}

export function useCreateMercenaryRecruitment() {
  const createRecruitmentMutation = useMutation({
    mutationFn: mercenaryQueries.createMercenaryRecruitment.fn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['mercenaryRecruitments'],
      });
    },
    onError: (error: unknown) => {
      console.error('용병 모집 게시글 생성 실패:', error);
    },
  });

  return {
    createRecruitment: createRecruitmentMutation.mutate,
    isCreating: createRecruitmentMutation.isPending,
    createError: createRecruitmentMutation.error,
    createSuccess: createRecruitmentMutation.isSuccess,
    resetCreateState: createRecruitmentMutation.reset,
  };
}

export function useUpdateMercenaryRecruitment() {
  const updateRecruitmentMutation = useMutation({
    mutationFn: mercenaryQueries.updateMercenaryRecruitment.fn,
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

  return {
    updateRecruitment: updateRecruitmentMutation.mutate,
    isUpdating: updateRecruitmentMutation.isPending,
    updateError: updateRecruitmentMutation.error,
    updateSuccess: updateRecruitmentMutation.isSuccess,
    resetUpdateState: updateRecruitmentMutation.reset,
  };
}

export function useDeleteMercenaryRecruitment() {
  const deleteRecruitmentMutation = useMutation({
    mutationFn: mercenaryQueries.deleteMercenaryRecruitment.fn,
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

  return {
    deleteRecruitment: deleteRecruitmentMutation.mutate,
    isDeleting: deleteRecruitmentMutation.isPending,
    deleteError: deleteRecruitmentMutation.error,
    deleteSuccess: deleteRecruitmentMutation.isSuccess,
    resetDeleteState: deleteRecruitmentMutation.reset,
  };
}
