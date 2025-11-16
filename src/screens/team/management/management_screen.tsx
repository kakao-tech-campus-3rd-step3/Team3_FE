import { useState } from 'react';
import { View, ScrollView } from 'react-native';

import TeamInfoCard from '@/src/components/team/cards/team_info_card';
import MemberDetailModal from '@/src/components/team/modals/member_detail_modal';
import MatchManagementSection from '@/src/components/team/sections/match_management_section';
import TeamMembersSection from '@/src/components/team/sections/team_members_section';
import TeamReviewsSection from '@/src/components/team/sections/team_reviews_section';
import LoadingState from '@/src/components/team/states/loading_state';
import { CustomHeader } from '@/src/components/ui/custom_header';
import { useUserProfileContext } from '@/src/contexts/user_profile_context';
import { useTeam, useTeamMembers } from '@/src/hooks/queries';
import { useTeamManagement } from '@/src/hooks/team/useTeamManagement';
import { styles } from '@/src/screens/team/management/management_styles';
import type { TeamMember } from '@/src/types/team';

interface ManagementScreenProps {
  teamId: string | number;
}

export default function ManagementScreen({ teamId }: ManagementScreenProps) {
  const numericTeamId = teamId ? Number(teamId) : 0;
  const [showMemberDetailModal, setShowMemberDetailModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const { userProfile } = useUserProfileContext();
  const { data: team, isLoading } = useTeam(numericTeamId);
  const { data: teamMembersData, isLoading: membersLoading } = useTeamMembers(
    numericTeamId,
    0,
    100
  );

  const { handleExitTeam } = useTeamManagement({ teamId: numericTeamId });

  const teamMembers = teamMembersData?.content || [];
  const currentUserMember = teamMembers.find(
    member => member.email === userProfile?.email
  );
  const canManageTeam =
    currentUserMember?.role === 'LEADER' ||
    currentUserMember?.role === 'VICE_LEADER';

  const sortedTeamMembers = [...teamMembers].sort((a, b) => {
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

  const handleMemberPress = (member: TeamMember) => {
    setSelectedMember(member);
    setShowMemberDetailModal(true);
  };

  const closeMemberDetailModal = () => {
    setShowMemberDetailModal(false);
    setSelectedMember(null);
  };

  if (isLoading || !team) {
    return <LoadingState />;
  }

  return (
    <View style={styles.container}>
      <CustomHeader title="팀 정보" />

      <ScrollView style={styles.scrollContainer}>
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
