import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import type { MatchWaitingResponseDto } from '@/src/types/match';

import { styles } from '../match_application_style';

export default function MatchCard({
  match,
}: {
  match: MatchWaitingResponseDto;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>
        🕒 {match.preferredTimeStart} ~ {match.preferredTimeEnd}
      </Text>
      <Text style={styles.cardText}>📍 장소 ID: {match.preferredVenueId}</Text>
      <Text style={styles.cardText}>👥 팀 ID: {match.teamId}</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>신청하기</Text>
      </TouchableOpacity>
    </View>
  );
}
