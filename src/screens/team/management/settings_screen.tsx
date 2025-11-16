import { View, Text, ScrollView } from 'react-native';

import JoinRequestsModal from '@/src/components/team/modals/join_requests_modal';
import ManageSection from '@/src/components/team/sections/manage_section';
import { CustomHeader } from '@/src/components/ui/custom_header';
import { LoadingState } from '@/src/components/ui/loading_state';
import { useTeamSettings } from '@/src/hooks/team/useTeamSettings';
import { styles } from '@/src/screens/team/management/settings_styles';
import { colors } from '@/src/theme';

interface SettingsScreenProps {
  teamId: string | number;
}

export default function SettingsScreen({ teamId }: SettingsScreenProps) {
  const numericTeamId = teamId ? Number(teamId) : 0;

  const {
    joinRequests,
    matchRequests,
    isLoading,
    membersLoading,
    matchRequestsLoading,
    showJoinRequestsModal,
    joinRequestsData,
    isProcessing,
    handleJoinRequest,
    handleDeleteTeam,
    openJoinRequestsModal,
    closeJoinRequestsModal,
  } = useTeamSettings({ teamId });

  if (isLoading || membersLoading || matchRequestsLoading) {
    return <LoadingState message="팀 정보를 불러오는 중..." />;
  }

  if (!joinRequestsData) {
    return <LoadingState message="가입 요청 정보를 불러오는 중..." />;
  }

  return (
    <View style={styles.container}>
      <CustomHeader title="팀 관리" />

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <ManageSection
            teamId={teamId}
            joinRequests={joinRequests}
            matchRequests={matchRequests}
            onShowJoinRequestsModal={openJoinRequestsModal}
            onDeleteTeam={handleDeleteTeam}
          />
        </View>
      </ScrollView>

      <JoinRequestsModal
        visible={showJoinRequestsModal}
        joinRequests={joinRequests}
        onClose={closeJoinRequestsModal}
        onJoinRequest={handleJoinRequest}
        isProcessing={isProcessing}
      />
    </View>
  );
}
