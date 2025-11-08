import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';

import JoinRequestsModal from '@/src/components/team/modals/join_requests_modal';
import ManageSection from '@/src/components/team/sections/manage_section';
import { CustomHeader } from '@/src/components/ui/custom_header';
import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';
import { LoadingState } from '@/src/components/ui/loading_state';
import { ROUTES, getTeamManagementUrl } from '@/src/constants/routes';
import {
  useTeamJoinWaitingList,
  useTeamMembers,
  useUserProfile,
  useDeleteTeamMutation,
  useTeam,
  useTeamMatchRequests,
  useApproveJoinRequestMutation,
  useRejectJoinRequestMutation,
} from '@/src/hooks/queries';
import { styles } from '@/src/screens/team/management/team_settings_styles';
import { colors } from '@/src/theme';
import type { MatchRequestResponseDto } from '@/src/types/match';
import {
  ERROR_MESSAGES,
  translateErrorMessage,
} from '@/src/utils/error_messages';

interface TeamSettingsScreenProps {
  teamId: string | number;
}

export default function TeamSettingsScreen({
  teamId,
}: TeamSettingsScreenProps) {
  const [showJoinRequestsModal, setShowJoinRequestsModal] = useState(false);
  const [processingRequestId, setProcessingRequestId] = useState<number | null>(
    null
  );
  const { data: userProfile } = useUserProfile();

  const deleteTeamMutation = useDeleteTeamMutation();
  const approveJoinRequestMutation = useApproveJoinRequestMutation();
  const rejectJoinRequestMutation = useRejectJoinRequestMutation();

  const numericTeamId = teamId ? Number(teamId) : 0;
  const {
    data: matchRequestsData,
    isLoading: matchRequestsLoading,
    error: matchRequestsError,
  } = useTeamMatchRequests();

  const matchRequests: MatchRequestResponseDto[] = matchRequestsData || [];
  const { refetch: refetchTeam } = useTeam(numericTeamId);
  const {
    data: teamMembersData,
    isLoading: membersLoading,
    error: membersError,
    refetch: refetchMembers,
  } = useTeamMembers(numericTeamId, 0, 100);
  const {
    data: regularMemberRequestsData,
    isLoading: isLoadingRegular,
    error: errorRegular,
    refetch: refetchRegular,
  } = useTeamJoinWaitingList(teamId, 'PENDING', false, 0, 100);

  const {
    data: mercenaryRequestsData,
    isLoading: isLoadingMercenary,
    error: errorMercenary,
    refetch: refetchMercenary,
  } = useTeamJoinWaitingList(teamId, 'PENDING', true, 0, 100);

  const isLoading = isLoadingRegular || isLoadingMercenary;
  const error = errorRegular || errorMercenary;
  const refetch = () => {
    refetchRegular();
    refetchMercenary();
  };

  const joinRequestsData = (() => {
    if (!regularMemberRequestsData && !mercenaryRequestsData) {
      return null;
    }

    const regularContent = regularMemberRequestsData?.content || [];
    const mercenaryContent = mercenaryRequestsData?.content || [];
    const mergedContent = [...regularContent, ...mercenaryContent];

    const baseData = regularMemberRequestsData || mercenaryRequestsData;
    return {
      ...baseData,
      content: mergedContent,
      totalElements:
        (regularMemberRequestsData?.totalElements || 0) +
        (mercenaryRequestsData?.totalElements || 0),
      numberOfElements: mergedContent.length,
      empty: mergedContent.length === 0,
    };
  })();

  const currentUserName = userProfile?.name;
  const teamMembers = teamMembersData?.content || [];

  const currentUserMember = teamMembers.find(
    member => member.name === currentUserName
  );
  const canManageTeam =
    currentUserMember?.role === 'LEADER' ||
    currentUserMember?.role === 'VICE_LEADER';

  useEffect(() => {
    if (currentUserMember && !canManageTeam) {
      Alert.alert(
        '권한 없음',
        '팀 설정에 접근할 권한이 없습니다. 회장과 부회장만 접근할 수 있습니다.',
        [
          {
            text: '확인',
            onPress: () => {
              router.dismissAll();
              router.replace(getTeamManagementUrl(numericTeamId));
            },
          },
        ]
      );
    }
  }, [currentUserMember, canManageTeam, numericTeamId]);

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
        onPress: () => {
          setProcessingRequestId(requestId);
          if (status === 'approved') {
            const role: '회장' | '부회장' | '일반멤버' = '일반멤버';
            approveJoinRequestMutation.mutate(
              {
                teamId,
                requestId,
                role,
              },
              {
                onSuccess: () => {
                  setProcessingRequestId(null);
                  Alert.alert('성공', `가입을 ${action}했습니다.`);
                  refetch();
                  refetchMembers();
                  refetchTeam();
                },
                onError: (error: unknown) => {
                  setProcessingRequestId(null);
                  let errorMessage = `${action} 처리 중 오류가 발생했습니다.`;
                  if (
                    error &&
                    typeof error === 'object' &&
                    'message' in error
                  ) {
                    const message = (error as any).message;
                    if (message && typeof message === 'string') {
                      errorMessage = translateErrorMessage(message, {
                        endpoint: `/api/teams/${teamId}/join-waiting/${requestId}/approve`,
                        method: 'POST',
                      });
                    }
                  }
                  Alert.alert('오류', errorMessage);
                },
              }
            );
          } else {
            rejectJoinRequestMutation.mutate(
              {
                teamId,
                requestId,
                reason: '가입 거절',
              },
              {
                onSuccess: () => {
                  setProcessingRequestId(null);
                  Alert.alert('성공', `가입을 ${action}했습니다.`);
                  refetch();
                },
                onError: () => {
                  setProcessingRequestId(null);
                  Alert.alert('오류', `${action} 처리 중 오류가 발생했습니다.`);
                },
              }
            );
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
                      router.replace(ROUTES.TEAM_GUIDE);
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
                    errorMessage = ERROR_MESSAGES.TEAM_NOT_FOUND;
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
            onDeleteTeam={handleDeleteTeam}
          />
        </View>
      </ScrollView>

      <JoinRequestsModal
        visible={showJoinRequestsModal}
        joinRequests={joinRequests}
        onClose={() => setShowJoinRequestsModal(false)}
        onJoinRequest={handleJoinRequest}
        processingRequestId={processingRequestId}
      />
    </View>
  );
}
