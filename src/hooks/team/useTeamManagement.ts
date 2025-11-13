import { useState } from 'react';
import { Alert } from 'react-native';

import { teamQueries } from '@/src/api/queries/team/queries';
import {
  useTeam,
  useTeamMembers,
  useUserProfile,
  useTeamExitMutation,
} from '@/src/hooks/queries';
import { ApiError } from '@/src/lib/api_client';
import { queryClient } from '@/src/lib/query_client';
import type { TeamMember } from '@/src/types/team';

interface UseTeamManagementProps {
  teamId: number;
}

export function useTeamManagement({ teamId }: UseTeamManagementProps) {
  const [showMemberDetailModal, setShowMemberDetailModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const { data: userProfile } = useUserProfile();
  const { data: team, isLoading, error } = useTeam(teamId);
  const { data: teamMembersData, isLoading: membersLoading } = useTeamMembers(
    teamId,
    0,
    100
  );

  const exitTeamMutation = useTeamExitMutation();

  const handleApiError = (error: unknown) => {
    if (error instanceof ApiError) {
      const errorMessage = error.message || error.detail;
      Alert.alert('오류', errorMessage);
    } else if (error instanceof Error) {
      Alert.alert('오류', error.message);
    }
  };

  const handleMemberPress = (member: TeamMember) => {
    setSelectedMember(member);
    setShowMemberDetailModal(true);
  };

  const handleExitTeam = () => {
    const teamMembers = teamMembersData?.content || [];
    const currentUserMember = teamMembers.find(
      member => member.name === userProfile?.name
    );
    const isTeamLeader = currentUserMember?.role === 'LEADER';

    if (isTeamLeader) {
      Alert.alert(
        '팀장 탈퇴 불가',
        '팀장은 팀에서 나갈 수 없습니다.\n팀을 해산하려면 팀 설정에서 팀 삭제 기능을 사용해주세요.',
        [
          {
            text: '확인',
            style: 'default',
          },
        ]
      );
      return;
    }

    Alert.alert(
      '팀 나가기',
      '정말로 이 팀에서 나가시겠습니까?\n\n팀에서 나가면 모든 팀 관련 권한이 제거됩니다.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '나가기',
          style: 'destructive',
          onPress: () => {
            exitTeamMutation.mutate(teamId, {
              onSuccess: () => {
                Alert.alert('성공', '팀에서 성공적으로 나가졌습니다.');
              },
              onError: handleApiError,
            });
          },
        },
      ]
    );
  };

  const closeMemberDetailModal = () => {
    setShowMemberDetailModal(false);
  };

  const handleRefetch = () => {
    queryClient.invalidateQueries({
      queryKey: teamQueries.team.key(teamId),
    });
    queryClient.invalidateQueries({
      queryKey: teamQueries.teamMembers.key(teamId, 0, 100),
    });
  };

  const currentUserName = userProfile?.name;
  const teamMembers = teamMembersData?.content || [];
  const currentUserMember = teamMembers.find(
    member => member.name === currentUserName
  );
  const canManageTeam =
    currentUserMember?.role === 'LEADER' ||
    currentUserMember?.role === 'VICE_LEADER';

  const sortedTeamMembers = teamMembers.sort((a, b) => {
    const roleOrder = {
      LEADER: 1,
      VICE_LEADER: 2,
      MEMBER: 3,
      MERCENARY: 4,
    };
    const aOrder = roleOrder[a.role] || 4;
    const bOrder = roleOrder[b.role] || 4;

    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    return a.name.localeCompare(b.name);
  });

  return {
    team,
    teamMembers,
    sortedTeamMembers,
    currentUserMember,
    userProfile,
    isLoading,
    membersLoading,
    error,
    showMemberDetailModal,
    selectedMember,
    canManageTeam,
    handleRefetch,
    handleMemberPress,
    handleExitTeam,
    closeMemberDetailModal,
  };
}
