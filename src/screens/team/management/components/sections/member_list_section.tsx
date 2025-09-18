import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { theme } from '@/src/theme';
import type { TeamMember, TeamMemberRole } from '@/src/types/team';

import { styles } from '../../styles/team_member_style';

interface MemberListSectionProps {
  teamMembers: TeamMember[];
  onRoleChange: (member: TeamMember) => void;
  onRemoveMember: (member: TeamMember) => void;
}

export default memo(function MemberListSection({
  teamMembers,
  onRoleChange,
  onRemoveMember,
}: MemberListSectionProps) {
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

  const getRoleColor = (role: TeamMemberRole): string => {
    switch (role) {
      case 'LEADER':
        return theme.colors.red[600];
      case 'VICE_LEADER':
        return theme.colors.blue[600];
      case 'MEMBER':
        return theme.colors.green[600];
      default:
        return theme.colors.gray[500];
    }
  };

  return (
    <View style={styles.membersSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>팀원 목록</Text>
        <Text style={styles.memberCount}>총 {teamMembers.length}명</Text>
      </View>

      <View style={styles.memberList}>
        {teamMembers.map(member => (
          <View key={member.id} style={styles.memberCard}>
            <View style={styles.memberInfo}>
              <View style={styles.memberAvatar}>
                <Ionicons name="person" size={20} color={theme.colors.white} />
              </View>
              <View style={styles.memberDetails}>
                <View style={styles.memberHeader}>
                  <Text style={styles.memberName}>
                    {member.user?.name || '알 수 없음'}
                  </Text>
                  <View
                    style={[
                      styles.roleBadge,
                      { backgroundColor: getRoleColor(member.role) },
                    ]}
                  >
                    <Text style={styles.roleBadgeText}>
                      {getRoleDisplayName(member.role)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.memberEmail}>
                  {member.user?.email || ''}
                </Text>
                <Text style={styles.memberUniversity}>
                  {member.user?.university} • {member.user?.major}
                </Text>
                <Text style={styles.joinDate}>
                  가입일:{' '}
                  {new Date(member.joinedAt).toLocaleDateString('ko-KR')}
                </Text>
              </View>
            </View>

            {member.role !== 'LEADER' && (
              <View style={styles.memberActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => onRoleChange(member)}
                >
                  <Ionicons
                    name="swap-horizontal-outline"
                    size={18}
                    color={theme.colors.blue[600]}
                  />
                  <Text style={styles.actionButtonText}>역할변경</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.removeButton]}
                  onPress={() => onRemoveMember(member)}
                >
                  <Ionicons
                    name="trash-outline"
                    size={18}
                    color={theme.colors.red[600]}
                  />
                  <Text
                    style={[styles.actionButtonText, styles.removeButtonText]}
                  >
                    강퇴
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}

        {teamMembers.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons
              name="people-outline"
              size={48}
              color={theme.colors.gray[500]}
            />
            <Text style={styles.emptyStateTitle}>팀원이 없습니다</Text>
            <Text style={styles.emptyStateText}>
              아직 팀에 가입한 멤버가 없습니다.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
});
