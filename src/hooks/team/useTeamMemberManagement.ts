import { useState } from 'react';
import { Alert } from 'react-native';

import { teamQueries } from '@/src/api/queries/team/queries';
import {
  useTeamMembers,
  useRemoveMemberMutation,
  useUpdateMemberRoleMutation,
  useDelegateLeadershipMutation,
  useUserProfile,
} from '@/src/hooks/queries';
import { ApiError } from '@/src/lib/api_client';
import { queryClient } from '@/src/lib/query_client';
import type { TeamMember, TeamMemberRole } from '@/src/types/team';
import { getRoleDisplayName } from '@/src/utils/team';

interface UseTeamMemberManagementProps {
  teamId: number;
}

export function useTeamMemberManagement({
  teamId,
}: UseTeamMemberManagementProps) {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showMemberDetailModal, setShowMemberDetailModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const { data: userProfile } = useUserProfile();
  const {
    data: teamMembers,
    isLoading,
    error,
  } = useTeamMembers(teamId, 0, 100);

  const removeMemberMutation = useRemoveMemberMutation();
  const updateMemberRoleMutation = useUpdateMemberRoleMutation();
  const delegateLeadershipMutation = useDelegateLeadershipMutation();

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

  const handleRoleChange = (member: TeamMember) => {
    setSelectedMember(member);
    setShowRoleModal(true);
  };

  const handleUpdateRole = (newRole: TeamMemberRole) => {
    if (!selectedMember) return;

    Alert.alert(
      '역할 변경',
      `${selectedMember.name}님의 역할을 ${getRoleDisplayName(newRole)}로 변경하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '확인',
          onPress: () => {
            updateMemberRoleMutation.mutate(
              {
                teamId,
                userId: selectedMember.userId,
                role: newRole,
              },
              {
                onSuccess: () => {
                  Alert.alert('성공', '역할이 성공적으로 변경되었습니다.');
                  setShowRoleModal(false);
                  setSelectedMember(null);
                  queryClient.invalidateQueries({
                    queryKey: teamQueries.teamMembers.key(teamId),
                  });
                },
                onError: handleApiError,
              }
            );
          },
        },
      ]
    );
  };

  const handleRemoveMember = (member: TeamMember) => {
    Alert.alert(
      '팀원 강퇴',
      `${member.name}님을 팀에서 강퇴하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '강퇴',
          style: 'destructive',
          onPress: () => {
            removeMemberMutation.mutate(
              {
                teamId,
                userId: member.userId,
              },
              {
                onSuccess: () => {
                  Alert.alert('성공', '팀원이 성공적으로 강퇴되었습니다.');
                  queryClient.invalidateQueries({
                    queryKey: teamQueries.teamMembers.key(teamId),
                  });
                },
                onError: handleApiError,
              }
            );
          },
        },
      ]
    );
  };

  const handleDelegateLeadership = (member: TeamMember) => {
    Alert.alert(
      '리더십 위임',
      `${member.name}님에게 회장 자리를 위임하시겠습니까?\n\n위임 후 현재 회장은 일반 멤버가 되고, ${member.name}님이 새로운 회장이 됩니다.`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '위임',
          style: 'destructive',
          onPress: () => {
            delegateLeadershipMutation.mutate(
              {
                teamId,
                memberId: member.id,
              },
              {
                onSuccess: () => {
                  Alert.alert('성공', '리더십이 성공적으로 위임되었습니다.');
                  queryClient.invalidateQueries({
                    queryKey: teamQueries.teamMembers.key(teamId),
                  });
                  queryClient.invalidateQueries({
                    queryKey: teamQueries.team.key(teamId),
                  });
                },
                onError: handleApiError,
              }
            );
          },
        },
      ]
    );
  };

  const closeRoleModal = () => {
    setShowRoleModal(false);
    setSelectedMember(null);
  };

  const closeMemberDetailModal = () => {
    setShowMemberDetailModal(false);
  };

  const sortedTeamMembers = teamMembers?.content.sort((a, b) => {
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

  const currentUserMember = teamMembers?.content.find(
    m => m.name === userProfile?.name
  );

  return {
    teamMembers,
    sortedTeamMembers,
    currentUserMember,
    userProfile,
    isLoading,
    error,
    showRoleModal,
    showMemberDetailModal,
    selectedMember,
    handleMemberPress,
    handleRoleChange,
    handleUpdateRole,
    handleRemoveMember,
    handleDelegateLeadership,
    closeRoleModal,
    closeMemberDetailModal,
  };
}
