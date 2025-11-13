import { View, Text, ScrollView } from 'react-native';

import { matchQueries } from '@/src/api/queries/match/queries';
import { teamQueries } from '@/src/api/queries/team/queries';
import JoinRequestsModal from '@/src/components/team/modals/join_requests_modal';
import ManageSection from '@/src/components/team/sections/manage_section';
import { CustomHeader } from '@/src/components/ui/custom_header';
import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';
import { LoadingState } from '@/src/components/ui/loading_state';
import { useTeamSettings } from '@/src/hooks/team/useTeamSettings';
import { queryClient } from '@/src/lib/query_client';
import { styles } from '@/src/screens/team/management/team_settings_styles';
import { colors } from '@/src/theme';

interface TeamSettingsScreenProps {
  teamId: string | number;
}

export default function TeamSettingsScreen({
  teamId,
}: TeamSettingsScreenProps) {
  const numericTeamId = teamId ? Number(teamId) : 0;

  const {
    joinRequests,
    matchRequests,
    isLoading,
    membersLoading,
    matchRequestsLoading,
    error,
    membersError,
    matchRequestsError,
    showJoinRequestsModal,
    processingRequestId,
    joinRequestsData,
    handleRefetch,
    handleJoinRequest,
    handleDeleteTeam,
    openJoinRequestsModal,
    closeJoinRequestsModal,
  } = useTeamSettings({ teamId });

  if (!teamId || teamId === null || teamId === undefined) {
    return (
      <View style={styles.container}>
        <CustomHeader title="팀 관리" />
        <View style={styles.loadingContainer}>
          <Text style={{ textAlign: 'center', color: colors.red[500] }}>
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
        <CustomHeader title="팀 관리" />
        <View style={styles.loadingContainer}>
          <Text style={{ textAlign: 'center', color: colors.red[500] }}>
            유효하지 않은 팀 ID입니다.
          </Text>
        </View>
      </View>
    );
  }

  if (isLoading || membersLoading || matchRequestsLoading) {
    return <LoadingState message="팀 정보를 불러오는 중..." />;
  }

  if (error || membersError || matchRequestsError) {
    const errorToShow = error || membersError || matchRequestsError;
    return (
      <GlobalErrorFallback
        error={errorToShow!}
        resetError={() => {
          handleRefetch();
          queryClient.invalidateQueries({
            queryKey: teamQueries.teamMembers.key(numericTeamId, 0, 100),
          });
          queryClient.invalidateQueries({
            queryKey: matchQueries.teamMatchRequests.key,
          });
        }}
      />
    );
  }

  if (!joinRequestsData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>가입 요청 정보를 불러오는 중...</Text>
      </View>
    );
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
        processingRequestId={processingRequestId}
      />
    </View>
  );
}
