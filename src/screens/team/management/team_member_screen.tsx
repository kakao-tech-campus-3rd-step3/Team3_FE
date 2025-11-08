import { useState } from 'react';
import { View, Text, ScrollView, Alert, RefreshControl } from 'react-native';

import MemberInfoCard from '@/src/components/team/cards/member_info_card';
import MemberDetailModal from '@/src/components/team/modals/member_detail_modal';
import RoleChangeModal from '@/src/components/team/modals/role_change_modal';
import MemberListSection from '@/src/components/team/sections/member_list_section';
import { CustomHeader } from '@/src/components/ui/custom_header';
import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';
import { LoadingState } from '@/src/components/ui/loading_state';
import {
  useTeamMembers,
  useRemoveMemberMutation,
  useUpdateMemberRoleMutation,
  useDelegateLeadershipMutation,
  useUserProfile,
} from '@/src/hooks/queries';
import { styles } from '@/src/screens/team/management/team_member_style';
import type { TeamMember, TeamMemberRole } from '@/src/types/team';
import {
  ERROR_MESSAGES,
  getErrorMessageByStatus,
} from '@/src/utils/error_messages';
import { getRoleDisplayName } from '@/src/utils/team';

interface MemberManagementScreenProps {
  teamId: string | number;
}

export default function MemberManagementScreen({
  teamId,
}: MemberManagementScreenProps) {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showMemberDetailModal, setShowMemberDetailModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const numericTeamId = teamId ? Number(teamId) : 0;
  const { data: userProfile } = useUserProfile();
  const {
    data: teamMembers,
    isLoading,
    error,
    refetch,
  } = useTeamMembers(numericTeamId, 0, 100);

  const removeMemberMutation = useRemoveMemberMutation();
  const updateMemberRoleMutation = useUpdateMemberRoleMutation();
  const delegateLeadershipMutation = useDelegateLeadershipMutation();

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
    return <GlobalErrorFallback error={error} resetError={() => refetch()} />;
  }

  if (!teamMembers) {
    return (
      <View style={styles.container}>
        <Text>팀원 정보를 불러오는 중...</Text>
      </View>
    );
  }

  const handleMemberPress = (member: TeamMember) => {
    setSelectedMember(member);
    setShowMemberDetailModal(true);
  };

  const handleRoleChange = (member: TeamMember) => {
    const teamMembersData = teamMembers?.content || [];
    const currentUserMember = teamMembersData.find(
      m => m.name === userProfile?.name
    );

    if (!currentUserMember) {
      Alert.alert('오류', '현재 사용자 정보를 찾을 수 없습니다.');
      return;
    }

    if (
      currentUserMember.role !== 'LEADER' &&
      currentUserMember.role !== 'VICE_LEADER'
    ) {
      Alert.alert(
        '권한 없음',
        '회장과 부회장만 팀원의 역할을 변경할 수 있습니다.'
      );
      return;
    }

    if (member.userId === currentUserMember.userId) {
      Alert.alert(
        '알림',
        '회장/부회장은 자신의 역할을 직접 변경할 수 없습니다.'
      );
      return;
    }

    if (member.role === 'LEADER') {
      Alert.alert('알림', '회장의 역할은 변경할 수 없습니다.');
      return;
    }

    setSelectedMember(member);
    setShowRoleModal(true);
  };

  const handleUpdateRole = (newRole: TeamMemberRole) => {
    if (!selectedMember) return;

    if (!numericTeamId || !selectedMember.userId) {
      Alert.alert('오류', '팀 정보 또는 사용자 정보가 올바르지 않습니다.');
      return;
    }

    Alert.alert(
      '역할 변경',
      `${selectedMember.name}님의 역할을 ${getRoleDisplayName(newRole)}로 변경하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '확인',
          onPress: () => {
            updateMemberRoleMutation.mutate(
              {
                teamId: numericTeamId,
                userId: selectedMember.userId,
                role: newRole,
              },
              {
                onSuccess: () => {
                  Alert.alert('성공', '역할이 성공적으로 변경되었습니다.');
                  setShowRoleModal(false);
                  setSelectedMember(null);
                  refetch();
                },
                onError: error => {
                  console.error('역할 변경 실패:', error);

                  let errorMessage =
                    '역할 변경에 실패했습니다. 다시 시도해주세요.';

                  if (error && typeof error === 'object' && 'status' in error) {
                    const apiError = error as {
                      status: number;
                      message?: string;
                      data?: any;
                    };

                    if (apiError.status === 401) {
                      errorMessage = '인증이 필요합니다. 다시 로그인해주세요.';
                    } else {
                      const statusBasedMessage = getErrorMessageByStatus(
                        apiError.status,
                        apiError.message
                      );
                      if (statusBasedMessage) {
                        errorMessage = statusBasedMessage;
                      } else if (apiError.status === 403) {
                        if (apiError.message?.includes('NO_PERMISSION')) {
                          errorMessage =
                            ERROR_MESSAGES.ROLE_CHANGE_PERMISSION_DENIED_DETAIL;
                        } else if (
                          apiError.message?.includes(
                            'SELF_DELEGATION_NOT_ALLOWED'
                          )
                        ) {
                          errorMessage =
                            '회장/부회장은 자신의 역할을 직접 변경할 수 없습니다.';
                        } else {
                          errorMessage =
                            ERROR_MESSAGES.ROLE_CHANGE_PERMISSION_DENIED;
                        }
                      } else if (apiError.message) {
                        errorMessage = apiError.message;
                      }
                    }
                  }

                  Alert.alert('오류', errorMessage);
                },
              }
            );
          },
        },
      ]
    );
  };

  const handleRemoveMember = (member: TeamMember) => {
    const teamMembersData = teamMembers?.content || [];
    const currentUserMember = teamMembersData.find(
      m => m.name === userProfile?.name
    );

    if (!currentUserMember) {
      Alert.alert('오류', ERROR_MESSAGES.USER_INFO_NOT_FOUND);
      return;
    }

    if (
      currentUserMember.role !== 'LEADER' &&
      currentUserMember.role !== 'VICE_LEADER'
    ) {
      Alert.alert('권한 없음', '팀장과 부팀장만 팀원을 강퇴할 수 있습니다.');
      return;
    }

    if (member.role === 'LEADER') {
      Alert.alert('알림', '회장은 강퇴할 수 없습니다.');
      return;
    }

    if (currentUserMember.role === 'VICE_LEADER') {
      if (member.role !== 'MEMBER') {
        Alert.alert('권한 없음', '부회장은 일반 멤버만 강퇴할 수 있습니다.');
        return;
      }
    }

    if (!numericTeamId || !member.userId) {
      Alert.alert(
        '오류',
        '팀 정보 또는 사용자 정보가 올바르지 않을 수 없습니다.'
      );
      return;
    }

    Alert.alert(
      '팀원 강퇴',
      `${member.name}님을 팀에서 강퇴하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '강퇴',
          style: 'destructive',
          onPress: () => {
            removeMemberMutation.mutate(
              {
                teamId: numericTeamId,
                userId: member.userId,
              },
              {
                onSuccess: () => {
                  Alert.alert('성공', '팀원이 성공적으로 강퇴되었습니다.');
                  refetch();
                },
                onError: error => {
                  console.error('팀원 강퇴 실패:', error);

                  let errorMessage =
                    '팀원 강퇴에 실패했습니다. 다시 시도해주세요.';

                  if (error && typeof error === 'object' && 'status' in error) {
                    const apiError = error as {
                      status: number;
                      message?: string;
                      data?: any;
                    };

                    const statusBasedMessage = getErrorMessageByStatus(
                      apiError.status,
                      apiError.message
                    );
                    if (statusBasedMessage) {
                      errorMessage = statusBasedMessage;
                    } else if (apiError.status === 403) {
                      errorMessage =
                        ERROR_MESSAGES.MEMBER_REMOVE_PERMISSION_DENIED;
                    } else if (apiError.message) {
                      errorMessage = apiError.message;
                    }
                  }

                  Alert.alert('오류', errorMessage);
                },
              }
            );
          },
        },
      ]
    );
  };

  const handleDelegateLeadership = (member: TeamMember) => {
    const teamMembersData = teamMembers?.content || [];
    const currentUserMember = teamMembersData.find(
      m => m.name === userProfile?.name
    );

    if (!currentUserMember) {
      Alert.alert('오류', ERROR_MESSAGES.USER_INFO_NOT_FOUND);
      return;
    }

    if (currentUserMember.role !== 'LEADER') {
      Alert.alert('권한 없음', '회장만 리더십을 위임할 수 있습니다.');
      return;
    }

    if (member.userId === currentUserMember.userId) {
      Alert.alert('알림', '자기 자신에게는 리더십을 위임할 수 없습니다.');
      return;
    }

    if (member.role === 'LEADER') {
      Alert.alert('알림', '이미 회장인 멤버에게는 위임할 수 없습니다.');
      return;
    }

    if (!numericTeamId || !member.userId) {
      Alert.alert('오류', '팀 정보 또는 사용자 정보가 올바르지 않습니다.');
      return;
    }

    Alert.alert(
      '리더십 위임',
      `${member.name}님에게 회장 자리를 위임하시겠습니까?\n\n위임 후 현재 회장은 일반 멤버가 되고, ${member.name}님이 새로운 회장이 됩니다.`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '위임',
          style: 'destructive',
          onPress: () => {
            delegateLeadershipMutation.mutate(
              {
                teamId: numericTeamId,
                memberId: member.id,
              },
              {
                onSuccess: () => {
                  Alert.alert('성공', '리더십이 성공적으로 위임되었습니다.');
                  refetch();
                },
                onError: error => {
                  console.error('리더십 위임 실패:', error);

                  let errorMessage =
                    '리더십 위임에 실패했습니다. 다시 시도해주세요.';

                  if (error && typeof error === 'object' && 'status' in error) {
                    const apiError = error as {
                      status: number;
                      message?: string;
                      data?: any;
                    };

                    const statusBasedMessage = getErrorMessageByStatus(
                      apiError.status,
                      apiError.message
                    );
                    if (statusBasedMessage) {
                      errorMessage = statusBasedMessage;
                    } else if (apiError.status === 403) {
                      errorMessage =
                        ERROR_MESSAGES.LEADERSHIP_DELEGATE_PERMISSION_DENIED;
                    } else if (apiError.status === 409) {
                      errorMessage =
                        '자기 자신에게는 리더십을 위임할 수 없습니다.';
                    } else if (apiError.status === 400) {
                      errorMessage = '대상 멤버가 다른 팀에 속해있습니다.';
                    } else if (apiError.message) {
                      errorMessage = apiError.message;
                    }
                  }

                  Alert.alert('오류', errorMessage);
                },
              }
            );
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
            teamMembers={teamMembers.content.sort((a, b) => {
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
            })}
            currentUserMember={teamMembers.content.find(
              m => m.name === userProfile?.name
            )}
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
        onClose={() => setShowMemberDetailModal(false)}
      />

      <RoleChangeModal
        visible={showRoleModal}
        selectedMember={selectedMember}
        onClose={() => setShowRoleModal(false)}
        onUpdateRole={handleUpdateRole}
      />
    </View>
  );
}
