import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type MatchCardProps = {
  match: any; // 실제 타입으로 교체 필요
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
      <Text>{match?.location}</Text>
      <Text>{match?.time}</Text>

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
