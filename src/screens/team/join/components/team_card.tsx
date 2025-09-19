import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import type { TeamListItem } from '@/src/types';

import { styles } from '../university_team_list_style';

interface TeamCardProps {
  team: TeamListItem;
  onJoin: (teamId: number) => void;
}

interface TeamInfoItem {
  label: string;
  value: string;
}

export default function TeamCard({ team, onJoin }: TeamCardProps) {
  const teamInfoItems: TeamInfoItem[] = useMemo(
    () => [
      { label: '실력', value: team.skillLevel },
      { label: '멤버', value: `${team.memberCount}명` },
      { label: '회장', value: team.captainName },
    ],
    [team.skillLevel, team.memberCount, team.captainName]
  );
  return (
    <TouchableOpacity style={styles.teamCard} onPress={() => onJoin(team.id)}>
      <View style={styles.teamHeader}>
        <Text style={styles.teamName}>{team.name}</Text>
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
