import { View, Text, ScrollView } from 'react-native';

import { teamQueries } from '@/src/api/queries/team/queries';
import MemberInfoCard from '@/src/components/team/cards/member_info_card';
import MemberDetailModal from '@/src/components/team/modals/member_detail_modal';
import RoleChangeModal from '@/src/components/team/modals/role_change_modal';
import MemberListSection from '@/src/components/team/sections/member_list_section';
import { CustomHeader } from '@/src/components/ui/custom_header';
import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';
import { LoadingState } from '@/src/components/ui/loading_state';
import { useTeamMemberManagement } from '@/src/hooks/team/useTeamMemberManagement';
import { queryClient } from '@/src/lib/query_client';
import { styles } from '@/src/screens/team/management/team_member_style';

interface MemberManagementScreenProps {
  teamId: string | number;
}

export default function MemberManagementScreen({
  teamId,
}: MemberManagementScreenProps) {
  const numericTeamId = teamId ? Number(teamId) : 0;

  const {
    teamMembers,
    sortedTeamMembers,
    currentUserMember,
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
  } = useTeamMemberManagement({ teamId: numericTeamId });

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
    return (
      <GlobalErrorFallback
        error={error}
        resetError={() => {
          queryClient.invalidateQueries({
            queryKey: teamQueries.teamMembers.key(numericTeamId),
          });
        }}
      />
    );
  }

  if (!teamMembers || !sortedTeamMembers) {
    return (
      <View style={styles.container}>
        <Text>팀원 정보를 불러오는 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader title="팀원 관리" />

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <MemberInfoCard />
          <MemberListSection
            teamMembers={sortedTeamMembers}
            currentUserMember={currentUserMember}
            onMemberPress={handleMemberPress}
            onRoleChange={handleRoleChange}
            onRemoveMember={handleRemoveMember}
            onDelegateLeadership={handleDelegateLeadership}
          />
        </View>
      </ScrollView>

      <MemberDetailModal
        visible={showMemberDetailModal}
        teamId={numericTeamId}
        userId={selectedMember?.userId || 0}
        onClose={closeMemberDetailModal}
      />

      <RoleChangeModal
        visible={showRoleModal}
        selectedMember={selectedMember}
        onClose={closeRoleModal}
        onUpdateRole={handleUpdateRole}
      />
    </View>
  );
}
