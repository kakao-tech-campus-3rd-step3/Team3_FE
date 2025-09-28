import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';

import { style } from './match_making_success_style';

type Stadium = {
  id: string;
  name: string;
};

export default function MatchMakingSuccessScreen() {
  const router = useRouter();
  const { stadium, date } = useLocalSearchParams<{
    stadium: string;
    date: string;
  }>();

  const parsedStadium: Stadium | null = stadium ? JSON.parse(stadium) : null;
  const parsedDate: Date | null = date ? new Date(date) : null;

  return (
    <View style={style.container}>
      <CustomHeader title="매치 생성 완료" />

      <View style={style.content}>
        <Text style={style.successText}>
          ✅ 매치가 성공적으로 생성되었습니다!
        </Text>

        <View style={style.infoBox}>
          {parsedStadium && (
            <Text style={style.infoText}>📍 장소: {parsedStadium.name}</Text>
          )}
          {parsedDate && (
            <Text style={style.infoText}>
              🗓 일정: {parsedDate.toLocaleDateString()}{' '}
              {parsedDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          )}
        </View>
      </View>

      {/* 하단 버튼 */}
      <View style={style.bottomBar}>
        <TouchableOpacity
          style={style.homeButton}
          onPress={() => router.push('/')}
        >
          <Text style={style.homeButtonText}>홈으로 돌아가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
