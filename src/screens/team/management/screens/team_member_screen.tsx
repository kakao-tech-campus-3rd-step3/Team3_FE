import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, RefreshControl } from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';
import { LoadingState } from '@/src/components/ui/loading_state';
import {
  useTeamMembers,
  useRemoveMemberMutation,
  useUpdateMemberRoleMutation,
} from '@/src/hooks/queries';
import type { TeamMember, TeamMemberRole } from '@/src/types/team';
import { getRoleDisplayName } from '@/src/utils/team';

import MemberInfoCard from '../components/cards/member_info_card';
import RoleChangeModal from '../components/modals/role_change_modal';
import MemberListSection from '../components/sections/member_list_section';
import { styles } from '../styles/team_member_style';

interface MemberManagementScreenProps {
  teamId: string | number;
}

export default function MemberManagementScreen({
  teamId,
}: MemberManagementScreenProps) {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const numericTeamId = teamId ? Number(teamId) : 0;
  const {
    data: teamMembers,
    isLoading,
    error,
    refetch,
  } = useTeamMembers(numericTeamId);

  const removeMemberMutation = useRemoveMemberMutation();
  const updateMemberRoleMutation = useUpdateMemberRoleMutation();

  if (!teamId || teamId === null || teamId === undefined) {
    return (
      <View style={styles.container}>
        <CustomHeader title="팀원 관리" />
        <View style={styles.contentContainer}>
          <Text style={{ textAlign: 'center', color: '#ff4444' }}>
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
        <CustomHeader title="팀원 관리" />
        <View style={styles.contentContainer}>
          <Text style={{ textAlign: 'center', color: '#ff4444' }}>
            유효하지 않은 팀 ID입니다.
          </Text>
        </View>
      </View>
    );
  }

  if (isLoading) {
    return <LoadingState message="팀원 정보를 불러오는 중..." />;
  }

  if (error) {
    return <GlobalErrorFallback error={error} resetError={() => refetch()} />;
  }

  if (!teamMembers) {
    return (
      <View style={styles.container}>
        <Text>팀원 정보를 불러오는 중...</Text>
      </View>
    );
  }

  const handleRoleChange = (member: TeamMember) => {
    if (member.role === 'LEADER') {
      Alert.alert('알림', '회장의 역할은 변경할 수 없습니다.');
      return;
    }
    setSelectedMember(member);
    setShowRoleModal(true);
  };

  const handleUpdateRole = (newRole: TeamMemberRole) => {
    if (!selectedMember) return;

    if (!numericTeamId || !selectedMember.userId) {
      Alert.alert('오류', '팀 정보 또는 사용자 정보가 올바르지 않습니다.');
      return;
    }

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
                teamId: numericTeamId,
                userId: selectedMember.userId,
                role: newRole,
              },
              {
                onSuccess: () => {
                  Alert.alert('성공', '역할이 성공적으로 변경되었습니다.');
                  setShowRoleModal(false);
                  setSelectedMember(null);
                  refetch();
                },
                onError: error => {
                  console.error('역할 변경 실패:', error);
                  Alert.alert(
                    '오류',
                    '역할 변경에 실패했습니다. 다시 시도해주세요.'
                  );
                },
              }
            );
          },
        },
      ]
    );
  };

  const handleRemoveMember = (member: TeamMember) => {
    if (member.role === 'LEADER') {
      Alert.alert('알림', '회장은 강퇴할 수 없습니다.');
      return;
    }

    if (!numericTeamId || !member.userId) {
      Alert.alert('오류', '팀 정보 또는 사용자 정보가 올바르지 않습니다.');
      return;
    }

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
                teamId: numericTeamId,
                userId: member.userId,
              },
              {
                onSuccess: () => {
                  Alert.alert('성공', '팀원이 성공적으로 강퇴되었습니다.');
                  refetch();
                },
                onError: error => {
                  console.error('팀원 강퇴 실패:', error);
                  Alert.alert(
                    '오류',
                    '팀원 강퇴에 실패했습니다. 다시 시도해주세요.'
                  );
                },
              }
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="팀원 관리" />

      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={() => refetch()} />
        }
      >
        <View style={styles.contentContainer}>
          <MemberInfoCard />
          <MemberListSection
            teamMembers={teamMembers.content}
            onRoleChange={handleRoleChange}
            onRemoveMember={handleRemoveMember}
          />
        </View>
      </ScrollView>

      <RoleChangeModal
        visible={showRoleModal}
        selectedMember={selectedMember}
        onClose={() => setShowRoleModal(false)}
        onUpdateRole={handleUpdateRole}
      />
    </View>
  );
}
