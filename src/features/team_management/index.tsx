import React, { useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';

import TeamInfoCard from '@/src/components/team/cards/team_info_card';
import MemberDetailModal from '@/src/components/team/modals/member_detail_modal';
import TeamMembersSection from '@/src/components/team/sections/team_members_section';
import EmptyState from '@/src/components/team/states/empty_state';
import LoadingState from '@/src/components/team/states/loading_state';
import { CustomHeader } from '@/src/components/ui/custom_header';
import { styles } from '@/src/features/team_management/styles';
import { useTeam, useTeamMembers, useUserProfile } from '@/src/hooks/queries';
import type { TeamMember } from '@/src/types/team';

interface TeamManagementScreenProps {
  teamId: string | number;
}

export default function TeamManagementScreen({
  teamId,
}: TeamManagementScreenProps) {
  const [showMemberDetailModal, setShowMemberDetailModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const { data: userProfile } = useUserProfile();

  const numericTeamId = teamId ? Number(teamId) : 0;
  const { data: team, isLoading, error, refetch } = useTeam(numericTeamId);
  const {
    data: teamMembersData,
    isLoading: membersLoading,
    error: membersError,
    refetch: refetchMembers,
  } = useTeamMembers(numericTeamId);

  if (!teamId || teamId === null || teamId === undefined) {
    return (
      <EmptyState
        icon="⚠️"
        title="잘못된 팀 ID"
        subtitle="유효하지 않은 팀 ID입니다"
        description="올바른 팀 ID로 다시 시도해주세요."
      />
    );
  }

  if (
    isNaN(numericTeamId) ||
    !Number.isInteger(numericTeamId) ||
    numericTeamId <= 0
  ) {
    return (
      <EmptyState
        icon="⚠️"
        title="잘못된 팀 ID"
        subtitle="유효하지 않은 팀 ID입니다"
        description="올바른 팀 ID로 다시 시도해주세요."
      />
    );
  }

  if (isLoading || membersLoading) {
    return <LoadingState />;
  }

  if (error || membersError) {
    return (
      <EmptyState
        icon="❌"
        title="팀 관리"
        subtitle="팀 정보를 불러올 수 없습니다"
        description="네트워크 연결을 확인하고\n다시 시도해주세요."
        showRetryButton
        onRetry={() => refetch()}
      />
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

  if (!team || !teamMembersData) {
    return (
      <EmptyState
        icon="🔍"
        title="팀 관리"
        subtitle="팀을 찾을 수 없습니다"
        description="요청하신 팀이 존재하지 않거나\n접근 권한이 없습니다."
      />
    );
  }

  const handleMemberPress = (member: TeamMember) => {
    setSelectedMember(member);
    setShowMemberDetailModal(true);
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="팀 정보" />

      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={isLoading || membersLoading}
            onRefresh={() => {
              refetch();
              refetchMembers();
            }}
          />
        }
      >
        <View style={styles.contentContainer}>
          <TeamInfoCard team={team} canManageTeam={canManageTeam} />
          <TeamMembersSection
            teamMembers={teamMembers}
            membersLoading={membersLoading}
            onMemberPress={handleMemberPress}
          />
        </View>
      </ScrollView>

      <MemberDetailModal
        visible={showMemberDetailModal}
        teamId={numericTeamId}
        userId={selectedMember?.userId || 0}
        onClose={() => setShowMemberDetailModal(false)}
      />
    </View>
  );
}
