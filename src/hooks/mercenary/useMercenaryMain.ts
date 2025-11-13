import { router } from 'expo-router';
import { useState, useMemo } from 'react';
import { Alert } from 'react-native';

import { mercenaryQueries } from '@/src/api/queries/mercenary/queries';
import { teamQueries } from '@/src/api/queries/team/queries';
import { ROUTES } from '@/src/constants/routes';
import {
  useMercenaryRecruitments,
  useMercenaryRecruitment,
  useUserProfile,
  useTeamJoinRequestMutation,
  useMyJoinWaitingList,
} from '@/src/hooks/queries';
import { queryClient } from '@/src/lib/query_client';
import type { RecruitmentResponse } from '@/src/types';
import type { JoinWaitingRequest } from '@/src/types/team';
import { handleApiError } from '@/src/utils/handle_api_error';

export function useMercenaryMain() {
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [selectedRecruitmentId, setSelectedRecruitmentId] = useState<
    number | null
  >(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [selectedRecruitment, setSelectedRecruitment] =
    useState<RecruitmentResponse | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pageSize = 10;

  const { data: userProfile } = useUserProfile();
  const { joinWaiting, isJoining } = useTeamJoinRequestMutation();
  const { data: recruitmentsData, isLoading } = useMercenaryRecruitments(
    currentPage,
    pageSize,
    'matchDate,asc'
  );
  const { data: myJoinWaitingData } = useMyJoinWaitingList(
    0,
    1000,
    'audit.createdAt,desc',
    true
  );

  const {
    data: recruitmentDetail,
    isLoading: isDetailLoading,
    error: detailError,
  } = useMercenaryRecruitment(selectedRecruitmentId || 0);

  const filteredRecruitments = useMemo(() => {
    const list = recruitmentsData?.content || [];
    if (!selectedUniversity || selectedUniversity === '전체') return list;
    return list.filter(r => r.universityName === selectedUniversity);
  }, [recruitmentsData?.content, selectedUniversity]);

  const formatTime = (time: string) => {
    return time.slice(0, 5);
  };

  const handleApplication = (recruitmentId: number, message: string) => {
    const selectedRecruitment = recruitmentsData?.content.find(
      r => r.recruitmentId === recruitmentId
    );

    if (!selectedRecruitment) {
      Alert.alert('오류', '모집 게시글을 찾을 수 없습니다.');
      return;
    }

    const requestData: JoinWaitingRequest = {
      message: message.trim() || undefined,
      isMercenary: true,
    };

    joinWaiting(
      {
        teamId: selectedRecruitment.teamId,
        data: requestData,
      },
      {
        onSuccess: () => {
          setIsApplicationModalOpen(false);
          setSelectedRecruitment(null);
          Alert.alert('신청 완료', '용병 신청이 완료되었습니다.');
          queryClient.invalidateQueries({
            queryKey: teamQueries.myJoinWaitingList.key(
              0,
              1000,
              'audit.createdAt,desc',
              true
            ),
          });
        },
        onError: handleApiError,
      }
    );
  };

  const handleRecruitmentPress = (recruitmentId: number) => {
    setSelectedRecruitmentId(recruitmentId);
    setIsDetailModalOpen(true);
  };

  const handleApplyPress = (recruitment: RecruitmentResponse) => {
    setSelectedRecruitment(recruitment);
    setIsApplicationModalOpen(true);
  };

  const handleCreatePress = () => {
    if (!userProfile?.teamId) {
      Alert.alert(
        '팀 참여 필요',
        '용병 모집을 하려면 먼저 팀에 가입해야 합니다.'
      );
      return;
    }
    router.push(ROUTES.MERCENARY_CREATE);
  };

  const handleUniversitySelect = (universityName: string) => {
    setSelectedUniversity(universityName);
    setIsModalOpen(false);
  };

  const handleUniversityClear = () => {
    setSelectedUniversity('');
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  const handleCloseApplicationModal = () => {
    setIsApplicationModalOpen(false);
    setSelectedRecruitment(null);
  };

  const handleOpenUniversityModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseUniversityModal = () => {
    setIsModalOpen(false);
  };

  const handleLoadMore = () => {
    if (recruitmentsData && !recruitmentsData.last) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleRefresh = () => {
    setCurrentPage(0);
    queryClient.invalidateQueries({
      queryKey: mercenaryQueries.mercenaryRecruitments.key(
        0,
        pageSize,
        'matchDate,asc'
      ),
    });
  };

  const isMyRecruitment = (recruitment: RecruitmentResponse) => {
    return userProfile?.teamId === recruitment.teamId;
  };

  const hasApplied = (recruitment: RecruitmentResponse) => {
    return myJoinWaitingData?.content?.some(
      application =>
        application.teamId === recruitment.teamId &&
        application.status === 'PENDING'
    );
  };

  return {
    selectedUniversity,
    isModalOpen,
    isDetailModalOpen,
    isApplicationModalOpen,
    selectedRecruitment,
    currentPage,
    recruitmentsData,
    filteredRecruitments,
    recruitmentDetail,
    myJoinWaitingData,
    userProfile,
    isLoading,
    isDetailLoading,
    isJoining,
    detailError,
    handleApplication,
    handleRecruitmentPress,
    handleApplyPress,
    handleCreatePress,
    handleUniversitySelect,
    handleUniversityClear,
    handleCloseDetailModal,
    handleCloseApplicationModal,
    handleOpenUniversityModal,
    handleCloseUniversityModal,
    handleLoadMore,
    handleRefresh,
    formatTime,
    isMyRecruitment,
    hasApplied,
  };
}
