import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';

import { acceptMatchRequestApi, rejectMatchRequestApi } from '@/src/api/match';
import { teamJoinRequestApi } from '@/src/api/team';
import JoinRequestsModal from '@/src/components/team/modals/join_requests_modal';
import MatchRequestsModal, {
  type MatchRequest,
} from '@/src/components/team/modals/match_requests_modal';
import ManageSection from '@/src/components/team/sections/manage_section';
import { CustomHeader } from '@/src/components/ui/custom_header';
import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';
import { LoadingState } from '@/src/components/ui/loading_state';
import { ROUTES } from '@/src/constants/routes';
import {
  useTeamJoinWaitingList,
  useTeamMembers,
  useUserProfile,
  useDeleteTeamMutation,
  useTeam,
  useTeamMatchRequests,
} from '@/src/hooks/queries';
import { colors } from '@/src/theme';

import { styles } from './team_settings_styles';
interface TeamSettingsScreenProps {
  teamId: string | number;
}

export default function TeamSettingsScreen({
  teamId,
}: TeamSettingsScreenProps) {
  const [showJoinRequestsModal, setShowJoinRequestsModal] = useState(false);
  const [showMatchRequestsModal, setShowMatchRequestsModal] = useState(false);
  const [matchAccepted, setMatchAccepted] = useState(false);
  const [acceptedMatchId, setAcceptedMatchId] = useState<number | null>(null);
  const { data: userProfile } = useUserProfile();

  const deleteTeamMutation = useDeleteTeamMutation();

  const numericTeamId = teamId ? Number(teamId) : 0;
  const {
    data: matchRequestsData,
    isLoading: matchRequestsLoading,
    error: matchRequestsError,
    refetch: refetchMatchRequests,
  } = useTeamMatchRequests();

  const matchRequests: MatchRequest[] = matchRequestsData || [];
  const { refetch: refetchTeam } = useTeam(numericTeamId);
  const {
    data: teamMembersData,
    isLoading: membersLoading,
    error: membersError,
    refetch: refetchMembers,
  } = useTeamMembers(numericTeamId);
  const {
    data: joinRequestsData,
    isLoading,
    error,
    refetch,
  } = useTeamJoinWaitingList(teamId, 'PENDING', 0, 10);

  const currentUserName = userProfile?.name;
  const teamMembers = teamMembersData?.content || [];
  const currentUserMember = teamMembers.find(
    member => member.name === currentUserName
  );
  const canManageTeam =
    currentUserMember?.role === 'LEADER' ||
    currentUserMember?.role === 'VICE_LEADER';

  // 권한 체크: 회장/부회장이 아니면 알림 표시하고 팀 정보로 이동
  useEffect(() => {
    if (currentUserMember && !canManageTeam) {
      Alert.alert(
        '권한 없음',
        '팀 설정에 접근할 권한이 없습니다. 회장과 부회장만 접근할 수 있습니다.',
        [
          {
            text: '확인',
            onPress: () => {
              // 네비게이션 스택을 완전히 초기화하고 팀 정보 화면으로 이동
              router.dismissAll();
              router.replace(`/team/management/${numericTeamId}`);
            },
          },
        ]
      );
    }
  }, [currentUserMember, canManageTeam, numericTeamId]);

  // 모달 닫힌 후 alert 실행행
  useEffect(() => {
    if (!showMatchRequestsModal && matchAccepted && acceptedMatchId) {
      // 모달이 실제로 언마운트된 이후 실행
      requestAnimationFrame(() => {
        Alert.alert('성공', '매치가 성사되었습니다!', [
          {
            text: '확인',
            onPress: () => {
              router.push(`${ROUTES.MATCH_SET}?matchId=${acceptedMatchId}`);
              setMatchAccepted(false);
              setAcceptedMatchId(null);
            },
          },
        ]);
        setMatchAccepted(false);
      });
    }
  }, [showMatchRequestsModal, matchAccepted, acceptedMatchId]);

  if (!teamId || teamId === null || teamId === undefined) {
    return (
      <View style={styles.container}>
        <CustomHeader title="팀 관리" />
        <View style={styles.loadingContainer}>
          <Text style={{ textAlign: 'center', color: colors.red[500] }}>
            유효하지 않은 팀 ID입니다.
          </Text>
        </View>
      </View>
    );
  }

  if (
    isNaN(numericTeamId) ||
    !Number.isInteger(numericTeamId) ||
    numericTeamId <= 0
  ) {
    return (
      <View style={styles.container}>
        <CustomHeader title="팀 관리" />
        <View style={styles.loadingContainer}>
          <Text style={{ textAlign: 'center', color: colors.red[500] }}>
            유효하지 않은 팀 ID입니다.
          </Text>
        </View>
      </View>
    );
  }

  if (isLoading || membersLoading || matchRequestsLoading) {
    return <LoadingState message="팀 정보를 불러오는 중..." />;
  }

  if (error || membersError || matchRequestsError) {
    const errorToShow = error || membersError || matchRequestsError;
    return (
      <GlobalErrorFallback error={errorToShow!} resetError={() => refetch()} />
    );
  }

  if (!joinRequestsData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>가입 요청 정보를 불러오는 중...</Text>
      </View>
    );
  }

  const joinRequests = joinRequestsData.content;

  const handleJoinRequest = async (
    requestId: number,
    status: 'approved' | 'rejected'
  ) => {
    const action = status === 'approved' ? '승인' : '거절';

    Alert.alert(`가입 ${action}`, `이 사용자의 가입을 ${action}하시겠습니까?`, [
      { text: '취소', style: 'cancel' },
      {
        text: action,
        style: status === 'rejected' ? 'destructive' : 'default',
        onPress: async () => {
          try {
            if (status === 'approved') {
              await teamJoinRequestApi.approveJoinRequest(teamId, requestId, {
                role: '일반멤버',
              });
            } else {
              await teamJoinRequestApi.rejectJoinRequest(teamId, requestId, {
                reason: '가입 거절',
              });
            }

            Alert.alert('성공', `가입을 ${action}했습니다.`);
            refetch();
            if (status === 'approved') {
              refetchMembers();
              refetchTeam();
            }
          } catch {
            Alert.alert('오류', `${action} 처리 중 오류가 발생했습니다.`);
          }
        },
      },
    ]);
  };

  const handleMatchRequest = async (
    requestId: number,
    status: 'approved' | 'rejected'
  ) => {
    const action = status === 'approved' ? '수락' : '거절';

    Alert.alert(`매치 ${action}`, `이 매치 요청을 ${action}하시겠습니까?`, [
      { text: '취소', style: 'cancel' },
      {
        text: action,
        style: status === 'rejected' ? 'destructive' : 'default',
        onPress: async () => {
          try {
            if (status === 'approved') {
              // ✅ 1️⃣ 매치 요청 수락 API 호출 → matchId 반환
              const response = await acceptMatchRequestApi(requestId);
              const { matchId } = response;

              // ✅ 2️⃣ matchId 저장 → 모달 닫힘 트리거
              setAcceptedMatchId(matchId);
              setMatchAccepted(true);
              setShowMatchRequestsModal(false);
            } else {
              await rejectMatchRequestApi(requestId);
              Alert.alert('성공', `매치 요청을 ${action}했습니다.`);
            }

            refetchMatchRequests();
          } catch {
            Alert.alert('오류', `${action} 처리 중 오류가 발생했습니다.`);
          }
        },
      },
    ]);
  };

  const handleDeleteTeam = async () => {
    Alert.alert(
      '팀 삭제',
      '정말로 팀을 삭제하시겠습니까?\n\n 이 작업은 되돌릴 수 없습니다.\n\n 관련된 작업이 있다면 팀 삭제가 제한 될 수 있습니다.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            deleteTeamMutation.mutate(numericTeamId, {
              onSuccess: () => {
                Alert.alert('성공', '팀이 성공적으로 삭제되었습니다.', [
                  {
                    text: '확인',
                    onPress: () => {
                      router.replace('/team/guide');
                    },
                  },
                ]);
              },
              onError: error => {
                console.error('팀 삭제 실패:', error);
                let errorMessage = '팀 삭제에 실패했습니다. 다시 시도해주세요.';

                if (error && typeof error === 'object' && 'status' in error) {
                  const apiError = error as {
                    status: number;
                    message?: string;
                    data?: any;
                  };

                  if (apiError.status === 401) {
                    errorMessage = '인증이 필요합니다. 다시 로그인해주세요.';
                  } else if (apiError.status === 403) {
                    errorMessage = '팀장만 팀을 삭제할 수 있습니다.';
                  } else if (apiError.status === 404) {
                    errorMessage = '팀을 찾을 수 없습니다.';
                  } else if (apiError.status === 500) {
                    errorMessage =
                      '팀 삭제 중 서버 오류가 발생했습니다.\n\n다음 데이터들이 남아있어 팀을 삭제할 수 없습니다:\n• 팀 가입 대기 목록\n• 진행 중인 매치 요청\n• 팀 관련 업무 데이터\n\n팀에서 먼저 이러한 데이터들을 정리해주세요.';
                  } else if (apiError.message) {
                    errorMessage = apiError.message;
                  }
                }

                Alert.alert('오류', errorMessage);
              },
            });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="팀 관리" />

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <ManageSection
            teamId={teamId}
            joinRequests={joinRequests}
            matchRequests={matchRequests}
            onShowJoinRequestsModal={() => setShowJoinRequestsModal(true)}
            onShowMatchRequestsModal={() => setShowMatchRequestsModal(true)}
            onDeleteTeam={handleDeleteTeam}
          />
        </View>
      </ScrollView>

      <JoinRequestsModal
        visible={showJoinRequestsModal}
        joinRequests={joinRequests}
        onClose={() => setShowJoinRequestsModal(false)}
        onJoinRequest={handleJoinRequest}
      />

      <MatchRequestsModal
        visible={showMatchRequestsModal}
        matchRequests={matchRequests}
        onClose={() => setShowMatchRequestsModal(false)}
        onMatchRequest={handleMatchRequest}
      />
    </View>
  );
}
