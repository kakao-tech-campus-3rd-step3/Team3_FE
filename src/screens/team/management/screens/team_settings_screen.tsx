import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';
import { LoadingState } from '@/src/components/ui/loading_state';
import { ROUTES } from '@/src/constants/routes';
import {
  useDeleteTeamMutation,
  useTeamJoinRequests,
} from '@/src/hooks/queries';

import JoinRequestsModal from '../components/modals/join_requests_modal';
import ManageSection from '../components/sections/manage_section';
import { styles } from '../styles/team_settings_styles';
interface TeamSettingsScreenProps {
  teamId: string | number;
}

export default function TeamSettingsScreen({
  teamId,
}: TeamSettingsScreenProps) {
  const router = useRouter();
  const [showJoinRequestsModal, setShowJoinRequestsModal] = useState(false);

  const {
    data: joinRequests,
    isLoading,
    error,
    refetch,
  } = useTeamJoinRequests(teamId);

  const deleteTeamMutation = useDeleteTeamMutation();

  if (isLoading) {
    return <LoadingState message="가입 요청 정보를 불러오는 중..." />;
  }

  if (error) {
    return <GlobalErrorFallback error={error} resetError={() => refetch()} />;
  }

  if (!joinRequests) {
    return (
      <View style={styles.loadingContainer}>
        <Text>가입 요청 정보를 불러오는 중...</Text>
      </View>
    );
  }

  const handleJoinRequest = (
    requestId: string,
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
            deleteTeamMutation.mutate(teamId, {
              onSuccess: () => {
                Alert.alert('팀 삭제 완료', '팀이 성공적으로 삭제되었습니다.', [
                  {
                    text: '확인',
                    onPress: () => router.push(ROUTES.HOME_TABS),
                  },
                ]);
              },
              onError: error => {
                console.error('팀 삭제 실패:', error);
                Alert.alert(
                  '팀 삭제 실패',
                  '팀 삭제 중 오류가 발생했습니다. 다시 시도해주세요.',
                  [{ text: '확인' }]
                );
              },
            });
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
            isDeleting={deleteTeamMutation.isPending}
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
