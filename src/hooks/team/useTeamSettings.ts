import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import { ROUTES, getTeamManagementUrl } from '@/src/constants/routes';
import { useUserProfileContext } from '@/src/contexts/user_profile_context';
import {
  useTeamJoinWaitingList,
  useTeamMembers,
  useDeleteTeamMutation,
  useTeam,
  useTeamMatchRequests,
  useApproveJoinRequestMutation,
  useRejectJoinRequestMutation,
} from '@/src/hooks/queries';
import type { MatchRequestResponseDto } from '@/src/types/match';
import { handleApiError } from '@/src/utils/handle_api_error';

interface UseTeamSettingsProps {
  teamId: string | number;
}

export function useTeamSettings({ teamId }: UseTeamSettingsProps) {
  const [showJoinRequestsModal, setShowJoinRequestsModal] = useState(false);

  const { userProfile } = useUserProfileContext();
  const numericTeamId = teamId ? Number(teamId) : 0;

  const { data: matchRequestsData, isLoading: matchRequestsLoading } =
    useTeamMatchRequests();

  const { data: teamMembersData, isLoading: membersLoading } = useTeamMembers(
    numericTeamId,
    0,
    100
  );

  const { data: regularMemberRequestsData, isLoading: isLoadingRegular } =
    useTeamJoinWaitingList(teamId, 'PENDING', false, 0, 100);

  const { data: mercenaryRequestsData, isLoading: isLoadingMercenary } =
    useTeamJoinWaitingList(teamId, 'PENDING', true, 0, 100);

  const deleteTeamMutation = useDeleteTeamMutation();
  const approveJoinRequestMutation = useApproveJoinRequestMutation();
  const rejectJoinRequestMutation = useRejectJoinRequestMutation();

  const isLoading = isLoadingRegular || isLoadingMercenary;

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
                  Alert.alert('성공', `가입을 ${action}했습니다.`);
                },
                onError: (error: unknown) => {
                  handleApiError(error);
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
                  Alert.alert('성공', `가입을 ${action}했습니다.`);
                },
                onError: (error: unknown) => {
                  handleApiError(error);
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
              onError: (error: unknown) => {
                handleApiError(error);
              },
            });
          },
        },
      ]
    );
  };

  const closeJoinRequestsModal = () => {
    setShowJoinRequestsModal(false);
  };

  const openJoinRequestsModal = () => {
    setShowJoinRequestsModal(true);
  };

  const matchRequests: MatchRequestResponseDto[] = matchRequestsData || [];
  const joinRequests = joinRequestsData?.content || [];

  const isProcessing =
    approveJoinRequestMutation.isPending || rejectJoinRequestMutation.isPending;

  return {
    joinRequests,
    matchRequests,
    isLoading,
    membersLoading,
    matchRequestsLoading,
    showJoinRequestsModal,
    canManageTeam,
    joinRequestsData,
    isProcessing,
    handleJoinRequest,
    handleDeleteTeam,
    openJoinRequestsModal,
    closeJoinRequestsModal,
  };
}
