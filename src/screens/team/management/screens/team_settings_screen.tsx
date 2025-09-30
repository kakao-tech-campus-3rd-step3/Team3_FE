import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';
import { LoadingState } from '@/src/components/ui/loading_state';
import {
  useTeamJoinWaitingList,
  useTeamMembers,
  useUserProfile,
} from '@/src/hooks/queries';
import { colors } from '@/src/theme';

import JoinRequestsModal from '../components/modals/join_requests_modal';
import ManageSection from '../components/sections/manage_section';
import { styles } from '../styles/team_settings_styles';
interface TeamSettingsScreenProps {
  teamId: string | number;
}

export default function TeamSettingsScreen({
  teamId,
}: TeamSettingsScreenProps) {
  const [showJoinRequestsModal, setShowJoinRequestsModal] = useState(false);
  const { data: userProfile } = useUserProfile();

  const numericTeamId = teamId ? Number(teamId) : 0;
  const {
    data: teamMembersData,
    isLoading: membersLoading,
    error: membersError,
  } = useTeamMembers(numericTeamId);
  const {
    data: joinRequestsData,
    isLoading,
    error,
    refetch,
  } = useTeamJoinWaitingList(teamId, 'PENDING', 0, 10);

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

  const currentUserName = userProfile?.name;
  const teamMembers = teamMembersData?.content || [];
  const currentUserMember = teamMembers.find(
    member => member.name === currentUserName
  );
  const canManageTeam =
    currentUserMember?.role === 'LEADER' ||
    currentUserMember?.role === 'VICE_LEADER';

  if (isLoading || membersLoading) {
    return <LoadingState message="팀 정보를 불러오는 중..." />;
  }

  if (error || membersError) {
    const errorToShow = error || membersError;
    return (
      <GlobalErrorFallback error={errorToShow!} resetError={() => refetch()} />
    );
  }

  if (!canManageTeam) {
    return (
      <View style={styles.container}>
        <CustomHeader title="팀 관리" />
        <View style={styles.loadingContainer}>
          <Text
            style={{
              textAlign: 'center',
              color: colors.red[500],
              fontSize: 16,
              marginBottom: 8,
            }}
          >
            접근 권한이 없습니다
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: colors.gray[600],
              fontSize: 14,
            }}
          >
            팀 관리 기능은 회장과 부회장만 사용할 수 있습니다.
          </Text>
        </View>
      </View>
    );
  }

  if (!joinRequestsData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>가입 요청 정보를 불러오는 중...</Text>
      </View>
    );
  }

  const joinRequests = joinRequestsData.content;

  const handleJoinRequest = (
    requestId: number,
    status: 'approved' | 'rejected'
  ) => {
    const action = status === 'approved' ? '승인' : '거절';
    Alert.alert('알림', `가입 요청 ${action} 기능은 아직 구현 중입니다.`);
  };

  const handleDeleteTeam = () => {
    Alert.alert(
      '팀 삭제',
      '정말로 팀을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            Alert.alert('알림', '팀 삭제 기능은 아직 구현 중입니다.');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="팀 관리" />

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <ManageSection
            teamId={teamId}
            joinRequests={joinRequests}
            onShowJoinRequestsModal={() => setShowJoinRequestsModal(true)}
            onDeleteTeam={handleDeleteTeam}
          />
        </View>
      </ScrollView>

      <JoinRequestsModal
        visible={showJoinRequestsModal}
        joinRequests={joinRequests}
        onClose={() => setShowJoinRequestsModal(false)}
        onJoinRequest={handleJoinRequest}
      />
    </View>
  );
}
