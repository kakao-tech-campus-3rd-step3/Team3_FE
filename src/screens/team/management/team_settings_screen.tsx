import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';

import * as api from '@/src/api';
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
  const { data: team, refetch: refetchTeam } = useTeam(numericTeamId);
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

  const currentUserName = userProfile?.name;
  const teamMembers = teamMembersData?.content || [];
  const currentUserMember = teamMembers.find(
    member => member.name === currentUserName
  );
  const canManageTeam =
    currentUserMember?.role === 'LEADER' ||
    currentUserMember?.role === 'VICE_LEADER';

  if (isLoading || membersLoading || matchRequestsLoading) {
    return <LoadingState message="팀 정보를 불러오는 중..." />;
  }

  if (error || membersError || matchRequestsError) {
    const errorToShow = error || membersError || matchRequestsError;
    return (
      <GlobalErrorFallback error={errorToShow!} resetError={() => refetch()} />
    );
  }

  // 권한 충분하지 않은 경우에도 일반 멤버는 팀 탈퇴 기능만 사용 가능하도록 허용

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
            refetch(); // 가입 신청 목록 새로고침
            if (status === 'approved') {
              refetchMembers(); // 팀 멤버 목록 새로고침
              refetchTeam(); // 팀 정보 새로고침 (멤버 수 업데이트)
            }
          } catch (error) {
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
              await acceptMatchRequestApi(requestId);
            } else {
              await rejectMatchRequestApi(requestId);
            }

            Alert.alert('성공', `매치 요청을 ${action}했습니다.`);
            refetchMatchRequests(); // 매치 요청 목록 새로고침
          } catch (error) {
            Alert.alert('오류', `${action} 처리 중 오류가 발생했습니다.`);
          }
        },
      },
    ]);
  };

  const handleDeleteTeam = async () => {
    // 팀과 관련된 매치 데이터 확인
    console.log(`=== 팀 ${numericTeamId} 삭제 전 매치 데이터 확인 ===`);
    try {
      const matchData: any =
        await api.teamDeleteApi.getTeamMatches(numericTeamId);
      console.log('매치 관련 데이터:', matchData);

      // 매치 데이터가 있는지 확인하고 로그 출력
      if (
        matchData.matchRequests &&
        matchData.matchRequests.content &&
        matchData.matchRequests.content.length > 0
      ) {
        console.log(
          `대기 중인 매치 요청 ${matchData.matchRequests.content.length}개 발견`
        );
      }

      if (matchData.recentMatches && matchData.recentMatches.length > 0) {
        console.log(
          `완료된 매치 기록 ${matchData.recentMatches.length}개 발견`
        );
      }

      if (matchData.matchWaiting && matchData.matchWaiting.length > 0) {
        console.log(`매치 생성 대기 ${matchData.matchWaiting.length}개 발견`);
      }
    } catch (error) {
      console.log('매치 데이터 조회 중 오류:', error);
    }

    Alert.alert(
      '팀 삭제',
      '정말로 팀을 삭제하시겠습니까?\n\n⚠️ 이 작업은 되돌릴 수 없습니다.\n\n💡 매치를 생성했다면 팀 삭제가 막힐 수 있습니다.\n백엔드에서 cascade 삭제가 구현되어야 합니다.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            console.log(`=== 팀 ${numericTeamId} 삭제 요청 시작 ===`);
            deleteTeamMutation.mutate(numericTeamId, {
              onSuccess: () => {
                Alert.alert('성공', '팀이 성공적으로 삭제되었습니다.', [
                  {
                    text: '확인',
                    onPress: () => {
                      router.replace('/');
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

                  if (apiError.status === 500) {
                    errorMessage =
                      '팀 삭제 중 데이터베이스 오류가 발생했습니다.\n\n다음 데이터들이 남아있어 팀을 삭제할 수 없습니다:\n• 팀 가입 대기 목록\n• 진행 중인 매치 요청\n• 팀 관련 업무 데이터\n\n팀에서 먼저 이러한 데이터들을 정리해주세요.';
                  } else if (apiError.status === 404) {
                    errorMessage = '팀을 찾을 수 없습니다.';
                  } else if (apiError.status === 403) {
                    errorMessage = '팀 삭제 권한이 없습니다.';
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
