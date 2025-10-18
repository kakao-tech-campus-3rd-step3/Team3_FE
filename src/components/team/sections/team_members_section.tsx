import { Ionicons } from '@expo/vector-icons';
import { memo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from '@/src/components/team/sections/team_members_section_styles';
import { colors } from '@/src/theme';
import type { TeamMember } from '@/src/types/team';
import { getRoleDisplayName } from '@/src/utils/team';

interface TeamMembersSectionProps {
  teamMembers: TeamMember[] | undefined;
  membersLoading: boolean;
  onMemberPress?: (member: TeamMember) => void;
}

export default memo(function TeamMembersSection({
  teamMembers,
  membersLoading,
  onMemberPress,
}: TeamMembersSectionProps) {
  const [showAllMembers, setShowAllMembers] = useState(false);

  if (membersLoading) {
    return (
      <View style={styles.membersSection}>
        <Text style={styles.sectionTitle}>팀 멤버</Text>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>멤버 정보를 불러오는 중...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.membersSection}>
      <Text style={styles.sectionTitle}>팀 멤버</Text>
      <View style={styles.memberList}>
        {(showAllMembers
          ? Array.isArray(teamMembers)
            ? teamMembers
            : []
          : Array.isArray(teamMembers)
            ? teamMembers.slice(0, 6)
            : []
        ).map(member => (
          <TouchableOpacity
            key={member.id}
            style={styles.memberCard}
            onPress={() => onMemberPress?.(member)}
            activeOpacity={0.7}
          >
            <Ionicons
              name="shirt"
              size={24}
              color={colors.blue[500]}
              style={{ marginRight: 12 }}
            />
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>
                {member.name || '알 수 없음'}
              </Text>
              <Text style={styles.memberRole}>
                {getRoleDisplayName(member.role)}
              </Text>
            </View>
            {member.role === 'LEADER' && (
              <View style={styles.memberBadge}>
                <Text style={styles.memberBadgeText}>👑</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}

        {(!Array.isArray(teamMembers) || teamMembers.length === 0) && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>멤버가 없습니다</Text>
            <Text style={styles.emptyStateText}>
              아직 팀에 가입한 멤버가 없습니다.
            </Text>
          </View>
        )}

        {Array.isArray(teamMembers) && teamMembers.length > 6 && (
          <TouchableOpacity
            style={styles.showMoreButton}
            onPress={() => setShowAllMembers(!showAllMembers)}
          >
            <Text style={styles.showMoreText}>
              {showAllMembers
                ? '간단히 보기'
                : `전체 보기 (${Array.isArray(teamMembers) ? teamMembers.length : 0}명)`}
            </Text>
            <Ionicons
              name={showAllMembers ? 'chevron-up' : 'chevron-down'}
              size={16}
              color={colors.gray[500]}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});
