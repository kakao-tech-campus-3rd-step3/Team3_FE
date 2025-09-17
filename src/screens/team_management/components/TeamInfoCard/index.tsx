import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { getTeamManagementSettingsUrl } from '@/src/constants/routes';
import type { TeamDetailResponse } from '@/src/types/team';

import { styles } from '../../team_management_styles';

interface TeamInfoCardProps {
  team: TeamDetailResponse;
  canManageTeam: boolean;
}

export default memo(function TeamInfoCard({
  team,
  canManageTeam,
}: TeamInfoCardProps) {
  const handleTeamManagement = () => {
    router.push(getTeamManagementSettingsUrl(team.id));
  };

  const teamInfoFields = [
    { icon: '📝', label: '설명', value: team.description },
    { icon: '🏫', label: '대학교', value: team.university },
    { icon: '⚽', label: '팀 유형', value: team.teamType },
    { icon: '⭐', label: '실력', value: team.skillLevel },
    { icon: '👥', label: '멤버 수', value: `${team.memberCount}명` },
    {
      icon: '📅',
      label: '생성일',
      value: new Date(team.createdAt).toLocaleDateString('ko-KR'),
    },
  ];

  return (
    <View style={styles.teamCard}>
      <View style={styles.teamNameRow}>
        <Text style={styles.teamName}>{team.name}</Text>
        {canManageTeam && (
          <TouchableOpacity
            style={styles.teamSettingsButton}
            onPress={handleTeamManagement}
          >
            <Ionicons name="settings-outline" size={20} color="#6b7280" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.teamInfoGrid}>
        {teamInfoFields.map((field, index) => (
          <View
            key={field.label}
            style={[
              styles.teamInfoRow,
              index === teamInfoFields.length - 1 && {
                borderBottomWidth: 0,
              },
            ]}
          >
            <Text style={styles.teamInfoIcon}>{field.icon}</Text>
            <Text style={styles.teamInfoLabel}>{field.label}</Text>
            <Text style={styles.teamInfoValue}>{field.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
});
