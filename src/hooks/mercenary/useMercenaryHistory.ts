import { router } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

import { mercenaryQueries } from '@/src/api/queries/mercenary/queries';
import { teamQueries } from '@/src/api/queries/team/queries';
import { ROUTES } from '@/src/constants/routes';
import {
  useMyJoinWaitingList,
  useMyMercenaryRecruitments,
  useDeleteMercenaryRecruitment,
  useCancelJoinRequestMutation,
} from '@/src/hooks/queries';
import { queryClient } from '@/src/lib/query_client';
import type {
  UserJoinWaitingItem,
  JoinWaitingCancelRequest,
} from '@/src/types/team';
import { handleApiError } from '@/src/utils/handle_api_error';

export function useMercenaryHistory() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [recruitmentsPage, setRecruitmentsPage] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<UserJoinWaitingItem | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const pageSize = 10;

  const activeTab: 'applications' | 'myRecruitments' =
    selectedIndex === 0 ? 'applications' : 'myRecruitments';

  const { data: joinWaitingData, isLoading } = useMyJoinWaitingList(
    currentPage,
    pageSize,
    'audit.createdAt,desc',
    true
  );

  const { data: recruitmentsData, isLoading: isRecruitmentsLoading } =
    useMyMercenaryRecruitments(recruitmentsPage, pageSize, 'matchDate,asc');

  const { deleteRecruitment } = useDeleteMercenaryRecruitment();
  const { mutate: cancelJoinRequest, isPending: isCanceling } =
    useCancelJoinRequestMutation();

  const applicationsData = joinWaitingData?.content || [];
  const myRecruitmentsData = recruitmentsData?.content || [];

  const handleEdit = (recruitmentId: number) => {
    router.push(`${ROUTES.MERCENARY_EDIT}?id=${recruitmentId}`);
  };

  const handleDelete = (recruitmentId: number) => {
    Alert.alert(
      '게시글 삭제',
      '정말로 이 용병 모집 게시글을 삭제하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            deleteRecruitment(recruitmentId, {
              onSuccess: () => {
                Alert.alert('성공', '용병 모집 게시글이 삭제되었습니다.');
                queryClient.invalidateQueries({
                  queryKey: mercenaryQueries.myMercenaryRecruitments.key(
                    recruitmentsPage,
                    pageSize,
                    'matchDate,asc'
                  ),
                });
              },
              onError: (error: unknown) => {
                console.error('용병 모집 게시글 삭제 실패:', error);
                handleApiError(error);
              },
            });
          },
        },
      ]
    );
  };

  const handleCancel = (item: UserJoinWaitingItem) => {
    setSelectedApplication(item);
    setCancelReason('');
    setCancelModalVisible(true);
  };

  const confirmCancel = () => {
    if (!selectedApplication) return;

    const cancelData: JoinWaitingCancelRequest = {
      decisionReason: cancelReason.trim() || undefined,
    };

    cancelJoinRequest(
      {
        teamId: selectedApplication.teamId,
        joinWaitingId: selectedApplication.id,
        data: cancelData,
      },
      {
        onSuccess: () => {
          setCancelModalVisible(false);
          setSelectedApplication(null);
          setCancelReason('');
          Alert.alert('취소 완료', '용병 신청이 취소되었습니다.');
          queryClient.invalidateQueries({
            queryKey: teamQueries.myJoinWaitingList.key(
              currentPage,
              pageSize,
              'audit.createdAt,desc',
              true
            ),
          });
        },
        onError: (error: unknown) => {
          handleApiError(error);
        },
      }
    );
  };

  const handleCloseCancelModal = () => {
    setCancelModalVisible(false);
    setCancelReason('');
  };

  const handleApplicationsLoadMore = () => {
    if (joinWaitingData && !joinWaitingData.last) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleApplicationsRefresh = () => {
    setCurrentPage(0);
    queryClient.invalidateQueries({
      queryKey: teamQueries.myJoinWaitingList.key(
        0,
        pageSize,
        'audit.createdAt,desc',
        true
      ),
    });
  };

  const handleRecruitmentsLoadMore = () => {
    if (recruitmentsData && !recruitmentsData.last) {
      setRecruitmentsPage(prev => prev + 1);
    }
  };

  const handleRecruitmentsRefresh = () => {
    setRecruitmentsPage(0);
    queryClient.invalidateQueries({
      queryKey: mercenaryQueries.myMercenaryRecruitments.key(
        0,
        pageSize,
        'matchDate,asc'
      ),
    });
  };

  return {
    selectedIndex,
    activeTab,
    cancelModalVisible,
    selectedApplication,
    cancelReason,
    applicationsData,
    myRecruitmentsData,
    joinWaitingData,
    recruitmentsData,
    isLoading,
    isRecruitmentsLoading,
    isCanceling,
    setSelectedIndex,
    handleEdit,
    handleDelete,
    handleCancel,
    confirmCancel,
    handleCloseCancelModal,
    setCancelReason,
    handleApplicationsLoadMore,
    handleApplicationsRefresh,
    handleRecruitmentsLoadMore,
    handleRecruitmentsRefresh,
  };
}
