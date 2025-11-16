import { View, ScrollView, RefreshControl } from 'react-native';

import TeamInfoCard from '@/src/components/team/cards/team_info_card';
import MemberDetailModal from '@/src/components/team/modals/member_detail_modal';
import MatchManagementSection from '@/src/components/team/sections/match_management_section';
import TeamMembersSection from '@/src/components/team/sections/team_members_section';
import TeamReviewsSection from '@/src/components/team/sections/team_reviews_section';
import EmptyState from '@/src/components/team/states/empty_state';
import LoadingState from '@/src/components/team/states/loading_state';
import { CustomHeader } from '@/src/components/ui/custom_header';
import { useTeamManagement } from '@/src/hooks/team/useTeamManagement';
import { styles } from '@/src/screens/team/management/management_styles';

interface ManagementScreenProps {
  teamId: string | number;
}

export default function ManagementScreen({ teamId }: ManagementScreenProps) {
  const numericTeamId = teamId ? Number(teamId) : 0;

  const {
    team,
    sortedTeamMembers,
    currentUserMember,
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
  } = useTeamManagement({ teamId: numericTeamId });

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

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <EmptyState
        icon="❌"
        title="팀 관리"
        subtitle="팀 정보를 불러올 수 없습니다"
        description="네트워크 연결을 확인하고\n다시 시도해주세요."
        showRetryButton
        onRetry={handleRefetch}
      />
    );
  }

  if (!team) {
    return (
      <EmptyState
        icon="🔍"
        title="팀 관리"
        subtitle="팀을 찾을 수 없습니다"
        description="요청하신 팀이 존재하지 않거나\n접근 권한이 없습니다."
      />
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader title="팀 정보" />

      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={isLoading || membersLoading}
            onRefresh={handleRefetch}
          />
        }
      >
        <View style={styles.contentContainer}>
          <TeamInfoCard
            team={team}
            canManageTeam={canManageTeam}
            onExitTeam={handleExitTeam}
            isTeamLeader={currentUserMember?.role === 'LEADER'}
          />
          <MatchManagementSection teamId={numericTeamId} />
          <TeamReviewsSection teamId={numericTeamId} />
          <TeamMembersSection
            teamMembers={sortedTeamMembers}
            membersLoading={membersLoading}
            onMemberPress={handleMemberPress}
          />
        </View>
      </ScrollView>

      <MemberDetailModal
        visible={showMemberDetailModal}
        teamId={numericTeamId}
        userId={selectedMember?.userId || 0}
        onClose={closeMemberDetailModal}
      />
    </View>
  );
}
