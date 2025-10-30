import { Ionicons } from '@expo/vector-icons';
import { memo, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from '@/src/components/team/sections/team_members_section_styles';
import { TabSelector } from '@/src/components/ui/tab_selector';
import { colors } from '@/src/theme';
import type { TeamMember } from '@/src/types/team';
import { getRoleDisplayName } from '@/src/utils/team';

interface TeamMembersSectionProps {
  teamMembers: TeamMember[] | undefined;
  membersLoading: boolean;
  onMemberPress?: (member: TeamMember) => void;
}

type MemberTab = 'all' | 'members' | 'mercenaries';

export default memo(function TeamMembersSection({
  teamMembers,
  membersLoading,
  onMemberPress,
}: TeamMembersSectionProps) {
  const [activeTab, setActiveTab] = useState<MemberTab>('all');

  const tabs = [
    { key: 'all', label: '전체' },
    { key: 'members', label: '팀 멤버' },
    { key: 'mercenaries', label: '용병' },
  ];

  const filteredMembers = useMemo(() => {
    if (!Array.isArray(teamMembers)) return [];

    switch (activeTab) {
      case 'members':
        return teamMembers.filter(m => m.role !== 'MERCENARY');
      case 'mercenaries':
        return teamMembers.filter(m => m.role === 'MERCENARY');
      default:
        return teamMembers;
    }
  }, [teamMembers, activeTab]);

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
      <TabSelector
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={tabKey => setActiveTab(tabKey as MemberTab)}
      />
      <View style={styles.memberList}>
        {filteredMembers.map(member => (
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
            {member.role === 'MERCENARY' && (
              <View style={styles.mercenaryBadge}>
                <Text style={styles.mercenaryBadgeText}>용병</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}

        {filteredMembers.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>멤버가 없습니다</Text>
            <Text style={styles.emptyStateText}>
              {activeTab === 'members'
                ? '팀 멤버가 없습니다.'
                : activeTab === 'mercenaries'
                  ? '용병이 없습니다.'
                  : '아직 팀에 가입한 멤버가 없습니다.'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
});
