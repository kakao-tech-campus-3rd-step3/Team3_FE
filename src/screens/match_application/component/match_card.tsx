import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { MatchWaitingResponseDto } from '@/src/types/match';

type MatchCardProps = {
  match: MatchWaitingResponseDto;
  onPressRequest?: () => void;
  disabled?: boolean;
};

export default function MatchCard({
  match,
  onPressRequest,
  disabled,
}: MatchCardProps) {
  return (
    <View style={{ padding: 16, borderBottomWidth: 1, borderColor: '#ddd' }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>
        {match?.teamName?.name || '팀명 없음'}
      </Text>

      <Text style={{ marginBottom: 4 }}>📅 날짜: {match?.preferredDate}</Text>

      <Text style={{ marginBottom: 4 }}>
        ⏰ 시간: {match?.preferredTimeStart} - {match?.preferredTimeEnd}
      </Text>

      <Text style={{ marginBottom: 4 }}>
        🏟️ 장소 ID: {match?.preferredVenueId}
      </Text>

      <Text style={{ marginBottom: 4 }}>
        🎯 실력: {match?.skillLevelMin} ~ {match?.skillLevelMax}
      </Text>

      <Text style={{ marginBottom: 4 }}>
        🎓 대학만: {match?.universityOnly ? '예' : '아니오'}
      </Text>

      {match?.message && (
        <Text style={{ marginBottom: 4, fontStyle: 'italic' }}>
          💬 메시지: {match.message}
        </Text>
      )}

      <Text style={{ marginBottom: 8, color: '#666' }}>
        상태: {match?.status} | 만료: {match?.expiresAt}
      </Text>

      <TouchableOpacity
        onPress={onPressRequest}
        disabled={disabled}
        style={{
          marginTop: 8,
          padding: 10,
          borderRadius: 8,
          backgroundColor: disabled ? '#ccc' : '#007AFF',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>
          {disabled ? '요청 중...' : '신청하기'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
