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

interface MatchApplicationScreenProps {
  teamId?: number;
}

export default function MatchApplicationScreen({
  teamId,
}: MatchApplicationScreenProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const { data: userProfile, refetch } = useUserProfile();

  const params: MatchWaitingListRequestDto = {
    teamId: teamId ?? userProfile?.teamId ?? 0,
    selectDate: selectedDate
      ? selectedDate.toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
    ...(selectedTime
      ? { startTime: selectedTime.toTimeString().split(' ')[0] }
      : {}),
  };

  const { data, isLoading, error } = useMatchWaitingList(params);

  const { mutate: requestMatch, isPending } = useMatchRequest();

  const handlePressRequest = async (waitingId: number) => {
    await refetch();

    const rawTeamId = userProfile?.teamId;

    if (!rawTeamId) {
      Alert.alert('알림', '팀 정보가 없습니다. 팀을 먼저 생성해주세요.');
      return;
    }

    const numericTeamId = Number(rawTeamId);

    if (isNaN(numericTeamId) || numericTeamId <= 0) {
      Alert.alert('알림', '유효하지 않은 팀 ID입니다.');
      return;
    }

    const payload: MatchRequestRequestDto = {
      requestMessage: `${userProfile.name}(${numericTeamId}) 팀이 매치 요청`,
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
            onPressRequest={() => handlePressRequest(item.waitingId)}
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
