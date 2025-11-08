import { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import {
  useUserProfile,
  useMyCreatedMatches,
  useCancelMatchMutation,
} from '@/src/hooks/queries';
import MatchCard from '@/src/screens/match_application/components/match_card';
import { styles } from '@/src/screens/match_application/match_application_style';

export default function CheckCreatedMatchesScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const { refetch: refetchProfile } = useUserProfile();
  const {
    data: createdMatches,
    isLoading,
    error,
    refetch: refetchMatches,
  } = useMyCreatedMatches();

  const { mutate: cancelMatch, isPending } = useCancelMatchMutation();

  const handleCancelMatch = (waitingId: number) => {
    Alert.alert(
      '매치 취소',
      '이 매치를 취소하시겠습니까?',
      [
        { text: '아니요', style: 'cancel' },
        {
          text: '예',
          style: 'destructive',
          onPress: () => {
            cancelMatch(waitingId, {
              onSuccess: () => {
                Alert.alert('성공', '매치가 취소되었습니다.');
                refetchMatches();
              },
              onError: () => {
                Alert.alert('오류', '매치 취소 중 문제가 발생했습니다.');
              },
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchProfile(), refetchMatches()]);
    setRefreshing(false);
  }, [refetchProfile, refetchMatches]);

  const renderMatchCard = ({ item }: { item: any }) => (
    <MatchCard
      match={item}
      showStatus={true}
      isCancellable={true}
      onPressRequest={() => handleCancelMatch(item.waitingId)} // ✅ 취소 API 연결
      disabled={isPending}
    />
  );

  return (
    <View style={styles.container}>
      <CustomHeader title="생성한 매치 확인" />

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
        {isLoading ? (
          <View style={styles.loadingState}>
            <Text style={styles.loadingText}>매치를 불러오는 중...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorState}>
            <Text style={styles.errorText}>데이터를 불러올 수 없습니다</Text>
          </View>
        ) : (
          <FlatList
            data={createdMatches || []}
            keyExtractor={(item, index) => String(item.waitingId ?? index)}
            renderItem={renderMatchCard}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  생성된 매치가 없습니다
                </Text>
              </View>
            }
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        )}
      </ScrollView>
    </View>
  );
}
