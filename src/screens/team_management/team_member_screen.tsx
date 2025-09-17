import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';
import { useTeamMembers } from '@/src/hooks/queries';
import { theme } from '@/src/theme';
import type { TeamMember, TeamMemberRole } from '@/src/types/team';

import MemberInfoCard from './components/MemberInfoCard';
import MemberListSection from './components/MemberListSection';
import RoleChangeModal from './components/RoleChangeModal';
import { styles } from './team_member_style';

interface MemberManagementScreenProps {
  teamId: string | number;
}

export default function MemberManagementScreen({
  teamId,
}: MemberManagementScreenProps) {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const numericTeamId = Number(teamId);

  const {
    data: teamMembers,
    isLoading,
    error,
    refetch,
  } = useTeamMembers(numericTeamId);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.grass[500]} />
      </View>
    );
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

    const getRoleDisplayName = (role: TeamMemberRole): string => {
      switch (role) {
        case 'LEADER':
          return '회장';
        case 'VICE_LEADER':
          return '부회장';
        case 'MEMBER':
          return '일반멤버';
        default:
          return '일반멤버';
      }
    };

    Alert.alert(
      '역할 변경',
      `${selectedMember.user?.name}님의 역할을 ${getRoleDisplayName(newRole)}로 변경하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '확인',
          onPress: () => {
            Alert.alert('알림', '역할 변경 기능은 아직 구현 중입니다.');
            setShowRoleModal(false);
            setSelectedMember(null);
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

    Alert.alert(
      '팀원 강퇴',
      `${member.user?.name}님을 팀에서 강퇴하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '강퇴',
          style: 'destructive',
          onPress: () => {
            Alert.alert('알림', '팀원 강퇴 기능은 아직 구현 중입니다.');
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
            teamMembers={teamMembers}
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
