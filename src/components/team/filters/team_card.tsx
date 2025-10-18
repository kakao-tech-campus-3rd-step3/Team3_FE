import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from '@/src/components/team/filters/team_card_styles';
import type { TeamListItem } from '@/src/types';

interface TeamCardProps {
  team: TeamListItem;
  onJoin: (teamId: number) => void;
}

interface TeamInfoItem {
  label: string;
  value: string;
}

export default function TeamCard({ team, onJoin }: TeamCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
    });
  };

  const teamInfoItems: TeamInfoItem[] = useMemo(
    () => [
      { label: '실력', value: team.skillLevel },
      { label: '멤버', value: `${team.memberCount}명` },
      { label: '생성일', value: formatDate(team.createdAt) },
    ],
    [team.skillLevel, team.memberCount, team.createdAt]
  );

  return (
    <TouchableOpacity style={styles.teamCard} onPress={() => onJoin(team.id)}>
      <View style={styles.teamHeader}>
        <View style={styles.teamTitleSection}>
          <Text style={styles.teamName}>{team.name}</Text>
          <Text style={styles.universityName}>{team.university}</Text>
        </View>
        <View style={styles.teamTypeBadge}>
          <Text style={styles.teamTypeText}>{team.teamType}</Text>
        </View>
      </View>

      <Text style={styles.teamDescription} numberOfLines={2}>
        {team.description}
      </Text>

      <View style={styles.teamInfo}>
        {teamInfoItems.map((item, index) => (
          <View key={index} style={styles.infoItem}>
            <Text style={styles.infoLabel}>{item.label}</Text>
            <Text style={styles.infoValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.joinButton}>
        <Text style={styles.joinButtonText}>신청하기</Text>
      </View>
    </TouchableOpacity>
  );
}
