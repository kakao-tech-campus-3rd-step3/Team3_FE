import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';

import { style } from './match_making_success_style';

type Stadium = {
  id: string;
  name: string;
};

export default function MatchMakingSuccessScreen() {
  const router = useRouter();
  const {
    stadium,
    date,
    timeStart,
    timeEnd,
    skillLevelMin,
    skillLevelMax,
    message,
    universityOnly,
  } = useLocalSearchParams<{
    stadium: string;
    date: string;
    timeStart: string;
    timeEnd: string;
    skillLevelMin: string;
    skillLevelMax: string;
    message: string;
    universityOnly: string;
  }>();

  const parsedStadium: Stadium | null = stadium ? JSON.parse(stadium) : null;
  const parsedDate: Date | null = date ? new Date(date) : null;
  const parsedTimeStart: Date | null = timeStart ? new Date(timeStart) : null;
  const parsedTimeEnd: Date | null = timeEnd ? new Date(timeEnd) : null;

  // 뒤로가기 버튼 완전히 비활성화
  useEffect(() => {
    const backAction = () => {
      return true; // 뒤로가기 동작 완전히 차단
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

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
              🗓 날짜: {parsedDate.toLocaleDateString()}
            </Text>
          )}

          {parsedTimeStart && parsedTimeEnd && (
            <Text style={style.infoText}>
              ⏰ 시간:{' '}
              {parsedTimeStart.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              ~{' '}
              {parsedTimeEnd.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          )}

          <Text style={style.infoText}>
            💪 실력 수준: {skillLevelMin} ~ {skillLevelMax}
          </Text>

          {message ? (
            <Text style={style.infoText}>💬 메시지: {message}</Text>
          ) : null}

          <Text style={style.infoText}>
            🎓 동일 대학 상대 여부:{' '}
            {universityOnly === 'true' ? '예' : '아니오'}
          </Text>
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
