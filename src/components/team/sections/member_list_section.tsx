import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from '@/src/components/team/sections/member_list_section_styles';
import { theme } from '@/src/theme';
import type { TeamMember, TeamMemberRole } from '@/src/types/team';
import { getRoleDisplayName } from '@/src/utils/team';

interface MemberListSectionProps {
  teamMembers: TeamMember[];
  currentUserMember?: TeamMember | null;
  onMemberPress: (member: TeamMember) => void;
  onRoleChange: (member: TeamMember) => void;
  onRemoveMember: (member: TeamMember) => void;
  onDelegateLeadership: (member: TeamMember) => void;
}

export default memo(function MemberListSection({
  teamMembers,
  currentUserMember,
  onMemberPress,
  onRoleChange,
  onRemoveMember,
  onDelegateLeadership,
}: MemberListSectionProps) {
  const getRoleColor = (role: TeamMemberRole): string => {
    switch (role) {
      case 'LEADER':
        return theme.colors.red[600];
      case 'VICE_LEADER':
        return theme.colors.blue[600];
      case 'MEMBER':
        return theme.colors.green[600];
      case 'MERCENARY':
        return theme.colors.grass[600];
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
          <TouchableOpacity
            key={member.id}
            style={styles.memberCard}
            onPress={() => onMemberPress(member)}
            activeOpacity={0.7}
          >
            <View style={styles.memberInfo}>
              <View style={styles.memberAvatar}>
                <Ionicons name="person" size={20} color={theme.colors.white} />
              </View>
              <View style={styles.memberDetails}>
                <View style={styles.memberHeader}>
                  <Text style={styles.memberName}>
                    {member.name || '알 수 없음'}
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
                <Text style={styles.memberEmail}>{member.email || ''}</Text>
                <Text style={styles.memberUniversity}>{member.position}</Text>
              </View>
            </View>

            {currentUserMember && (
              <View style={styles.memberActions}>
                {currentUserMember.role === 'LEADER' &&
                  member.role !== 'LEADER' && (
                    <TouchableOpacity
                      style={[styles.actionButton, styles.delegateButton]}
                      onPress={() => onDelegateLeadership(member)}
                    >
                      <Text
                        style={[
                          styles.actionButtonText,
                          styles.delegateButtonText,
                        ]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        회장위임
                      </Text>
                    </TouchableOpacity>
                  )}

                {member.role !== 'LEADER' &&
                  (currentUserMember.role === 'LEADER' ||
                    (currentUserMember.role === 'VICE_LEADER' &&
                      member.role === 'MEMBER')) && (
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => onRoleChange(member)}
                    >
                      <Ionicons
                        name="swap-horizontal-outline"
                        size={18}
                        color={theme.colors.blue[600]}
                      />
                      <Text
                        style={styles.actionButtonText}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        역할변경
                      </Text>
                    </TouchableOpacity>
                  )}

                {member.role !== 'LEADER' &&
                  (currentUserMember.role === 'LEADER' ||
                    (currentUserMember.role === 'VICE_LEADER' &&
                      member.role === 'MEMBER')) && (
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
                        style={[
                          styles.actionButtonText,
                          styles.removeButtonText,
                        ]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        강퇴
                      </Text>
                    </TouchableOpacity>
                  )}
              </View>
            )}
          </TouchableOpacity>
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
