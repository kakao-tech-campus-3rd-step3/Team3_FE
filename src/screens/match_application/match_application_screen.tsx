import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import { useUserProfile } from '@/src/hooks/queries';
import { useMatchRequest } from '@/src/hooks/useMatchRequest';
import { useMatchWaitingList } from '@/src/hooks/useMatchWaitingList';
import DateFilter from '@/src/screens/match_application/component/date_filter';
import TimeFilter from '@/src/screens/match_application/component/time_filter';
import type {
  MatchWaitingListRequestDto,
  MatchRequestRequestDto,
} from '@/src/types/match';

import MatchCard from './component/match_card';
import { styles } from './match_application_style';

// ✅ 추가

export default function MatchApplicationScreen() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const { data: userProfile } = useUserProfile();

  const params: MatchWaitingListRequestDto = {
    teamId: userProfile?.teamId ?? 0,
    selectDate: selectedDate
      ? selectedDate.toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
    ...(selectedTime
      ? { startTime: selectedTime.toTimeString().split(' ')[0] }
      : {}),
  };

  const { data, isLoading, error } = useMatchWaitingList(params);

  // ✅ 매치 요청 훅
  const { mutate: requestMatch, isPending } = useMatchRequest();

  const handlePressRequest = (waitingId: number) => {
    if (!userProfile?.teamId) {
      Alert.alert('알림', '팀 정보가 없습니다.');
      return;
    }

    // 메시지는 단순히 내 팀/내 유저 기준으로 생성
    const payload: MatchRequestRequestDto = {
      requestTeamId: userProfile.teamId,
      requestMessage: `${userProfile.name}(${userProfile.teamId}) 팀이 매치 요청`,
    };

    requestMatch(
      { waitingId, payload },
      {
        onSuccess: res => {
          Alert.alert(
            '✅ 신청 완료',
            `매치 요청이 전송되었습니다.\n상태: ${res.status}`
          );
        },
        onError: () => {
          Alert.alert('❌ 오류', '매치 요청 중 문제가 발생했습니다.');
        },
      }
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <CustomHeader title="매치 참여" />
        <Text>불러오는 중...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <CustomHeader title="매치 참여" />
        <Text>에러 발생: {String(error)}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader title="매치 참여" />

      <DateFilter onDateChange={setSelectedDate} />
      <TimeFilter onTimeChange={setSelectedTime} />

      {selectedDate && (
        <Text style={styles.selectedDateText}>
          선택된 날짜: {selectedDate.toLocaleDateString('ko-KR')}
        </Text>
      )}

      {selectedTime && (
        <View style={styles.timeFilterRow}>
          <Text style={styles.selectedDateText}>
            시작 시간 이후:{' '}
            {selectedTime.toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => setSelectedTime(null)}
          >
            <Text style={styles.resetButtonText}>시간 필터 초기화</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={data || []}
        keyExtractor={(item, index) => String(item.waitingId ?? index)}
        renderItem={({ item }) => (
          <MatchCard
            match={item}
            onPressRequest={() => handlePressRequest(item.waitingId)} // ✅ waitingId만 넘김
            disabled={isPending}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>조건에 맞는 경기가 없습니다.</Text>
        }
      />
    </View>
  );
}
