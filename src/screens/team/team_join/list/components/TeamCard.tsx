import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { TeamListItem } from '@/src/types';
import { styles } from '../university_team_list_style';

interface TeamCardProps {
  team: TeamListItem;
  onJoin: (teamId: number) => void;
}

export default function TeamCard({ team, onJoin }: TeamCardProps) {
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
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>실력</Text>
          <Text style={styles.infoValue}>{team.skillLevel}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>멤버</Text>
          <Text style={styles.infoValue}>{team.memberCount}명</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>주장</Text>
          <Text style={styles.infoValue}>{team.captainName}</Text>
        </View>
      </View>

      <View style={styles.joinButton}>
        <Text style={styles.joinButtonText}>참여하기</Text>
      </View>
    </TouchableOpacity>
  );
}
