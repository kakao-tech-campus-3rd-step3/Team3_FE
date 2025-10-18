import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import { ROUTES } from '@/src/constants/routes';
import {
  useUserProfile,
  useMatchWaitingList,
  useMatchRequestMutation,
} from '@/src/hooks/queries';
import FilterCard from '@/src/screens/match_application/components/filter_card';
import MatchCard from '@/src/screens/match_application/components/match_card';
import { styles } from '@/src/screens/match_application/match_application_style';
import type {
  MatchWaitingListRequestDto,
  MatchRequestRequestDto,
} from '@/src/types/match';
import { formatDateForAPI, formatTimeForAPI } from '@/src/utils/date';

interface MatchApplicationScreenProps {
  teamId?: number;
}

export default function MatchApplicationScreen({
  teamId,
}: MatchApplicationScreenProps) {
  const router = useRouter();
  const { date } = useLocalSearchParams<{
    date?: string;
  }>();

  const initialDate = date ? new Date(date) : null;
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const { data: userProfile, error: profileError, refetch } = useUserProfile();

  const params: MatchWaitingListRequestDto = {
    selectDate: selectedDate
      ? formatDateForAPI(selectedDate)
      : formatDateForAPI(new Date()),
    startTime: selectedTime ? formatTimeForAPI(selectedTime) : '00:00:00',
  };

  const {
    data,
    isLoading,
    error,
    refetch: refetchData,
  } = useMatchWaitingList(params);
  const { mutate: requestMatch, isPending } = useMatchRequestMutation();

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetch(), refetchData()]);
    setRefreshing(false);
  };

  const handlePressRequest = async (waitingId: number) => {
    await refetch();

    const rawTeamId = userProfile?.teamId;

    if (!rawTeamId) {
      Alert.alert('알림', '팀 정보가 없습니다. 팀을 먼저 생성해주세요.');
      return;
    }

    const numericTeamId = Number(rawTeamId);

    if (isNaN(numericTeamId) || numericTeamId <= 0) {
      Alert.alert('알림', '유효하지 않는 팀 ID입니다.');
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
            '신청 완료',
            `매치 요청이 전송되었습니다.\n상태: ${res.status}`,
            [
              {
                text: '확인',
                style: 'default',
                onPress: () => router.push(ROUTES.HOME),
              },
            ]
          );
        },
        onError: () => {
          Alert.alert('오류', '매치 요청 중 문제가 발생했습니다.');
        },
      }
    );
  };

  const renderMatchCard = ({ item }: { item: any }) => (
    <MatchCard
      match={item}
      onPressRequest={() => handlePressRequest(item.waitingId)}
      disabled={isPending}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: '#f3f4f6',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            color: '#9ca3af',
            fontWeight: '600',
          }}
        >
          ?
        </Text>
      </View>
      <Text style={styles.emptyStateText}>조건에 맞는 매치가 없습니다</Text>
      <Text style={styles.emptyStateSubtext}>
        필터를 조정하여 다른 조건으로 검색해보세요
      </Text>
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingState}>
      <Text style={styles.loadingText}>매치를 불러오는 중...</Text>
    </View>
  );

  const renderErrorState = () => (
    <View style={styles.errorState}>
      <Text style={styles.errorText}>데이터를 불러올 수 없습니다</Text>
      <Text style={styles.errorSubtext}>
        네트워크 연결을 확인하고 다시 시도해주세요
      </Text>
    </View>
  );

  const renderSelectedFilters = () => {
    const hasFilters = selectedDate || selectedTime;
    if (!hasFilters) return null;

    return (
      <View style={styles.filterCard}>
        <View style={styles.filterCardHeader}>
          <Text style={styles.filterCardTitle}>선택된 필터</Text>
        </View>
        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          {selectedDate && (
            <Text style={styles.selectedFilterText}>
              날짜: {selectedDate.toLocaleDateString('ko-KR')}
            </Text>
          )}
          {selectedTime && (
            <Text style={styles.selectedFilterText}>
              시간:{' '}
              {selectedTime.toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              이후
            </Text>
          )}
          {(selectedDate || selectedTime) && (
            <Text style={[styles.selectedFilterText, { color: 'gray' }]}>
              필터를 초기화하려면 필터 버튼을 다시 선택하세요
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="매치 참여" />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
      >
        <FilterCard
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onDateChange={setSelectedDate}
          onTimeChange={setSelectedTime}
        />

        {renderSelectedFilters()}

        {profileError && (
          <View style={[styles.errorState, { marginBottom: 16 }]}>
            <Text style={styles.errorText}>
              사용자 정보를 불러올 수 없습니다
            </Text>
            <Text style={styles.errorSubtext}>
              네트워크 연결을 확인하고 새로고침해주세요
            </Text>
          </View>
        )}

        {isLoading && !refreshing ? (
          renderLoadingState()
        ) : error ? (
          renderErrorState()
        ) : (
          <FlatList
            data={data || []}
            keyExtractor={(item, index) => String(item.waitingId ?? index)}
            renderItem={renderMatchCard}
            ListEmptyComponent={renderEmptyState}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        )}
      </ScrollView>

      <View style={styles.bottomSpacing} />
    </View>
  );
}
