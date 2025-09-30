import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import { useMatchWaitingList } from '@/src/hooks/useMatchWaitingList';
import DateFilter from '@/src/screens/match_application/component/date_filter';
import TimeFilter from '@/src/screens/match_application/component/time_filter';
import type { MatchWaitingListRequestDto } from '@/src/types/match';

import MatchCard from './component/match_card';
import { styles } from './match_application_style';

export default function MatchApplicationScreen() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  // ✅ params 구성 (시간 없으면 제외)
  const params: MatchWaitingListRequestDto = {
    teamId: 2, // TODO: 로그인 유저의 실제 팀 ID로 교체
    selectDate: selectedDate
      ? selectedDate.toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
    ...(selectedTime
      ? { startTime: selectedTime.toTimeString().split(' ')[0] }
      : {}),
  };

  const { data, isLoading, error } = useMatchWaitingList(params);

  useEffect(() => {
    console.log('📡 요청 Params:', params);
    console.log('📡 응답 Data:', data);
    console.log('📡 에러:', error);
  }, [data, error]);

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

      {/* 날짜 필터 */}
      <DateFilter onDateChange={setSelectedDate} />

      {/* 시간 필터 */}
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
        renderItem={({ item }) => <MatchCard match={item} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>조건에 맞는 경기가 없습니다.</Text>
        }
      />
    </View>
  );
}
