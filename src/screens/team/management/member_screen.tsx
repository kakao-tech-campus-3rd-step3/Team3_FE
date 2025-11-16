import { View, Text, ScrollView } from 'react-native';

import { teamQueries } from '@/src/api/queries/team/queries';
import MemberInfoCard from '@/src/components/team/cards/member_info_card';
import MemberDetailModal from '@/src/components/team/modals/member_detail_modal';
import RoleChangeModal from '@/src/components/team/modals/role_change_modal';
import MemberListSection from '@/src/components/team/sections/member_list_section';
import { CustomHeader } from '@/src/components/ui/custom_header';
import { LoadingState } from '@/src/components/ui/loading_state';
import { useTeamMemberManagement } from '@/src/hooks/team/useTeamMemberManagement';
import { styles } from '@/src/screens/team/management/member_style';

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

  if (isLoading || !teamMembers || !sortedTeamMembers) {
    return <LoadingState message="팀원 정보를 불러오는 중..." />;
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
