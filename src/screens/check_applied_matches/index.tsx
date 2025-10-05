import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import { useUserProfile } from '@/src/hooks/queries';
import { useMyAppliedMatches } from '@/src/hooks/useMyAppliedMatches';
import { checkAppliedMatchesStyles } from '@/src/screens/check_applied_matches/check_applied_matches_style'; // ✅ 추가
import AppliedMatchCard from '@/src/screens/check_applied_matches/components/applied_match_card';
import { styles } from '@/src/screens/match_application/match_application_style';

export default function CheckAppliedMatchesScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);

  const { refetch: refetchProfile } = useUserProfile();
  const {
    data: appliedMatches,
    isLoading,
    error,
    refetch: refetchMatches,
  } = useMyAppliedMatches();

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchProfile(), refetchMatches()]);
    setRefreshing(false);
    setSelectedMatchId(null);
  }, [refetchProfile, refetchMatches]);

  const handleSelect = (id: number) => {
    setSelectedMatchId(prev => (prev === id ? null : id)); // 선택 토글
  };

  const handleCancel = () => {
    console.log('🧨 취소 버튼 클릭 - requestId:', selectedMatchId);
    // 이후 useCancelRequest 훅 연결 예정
  };

  const renderMatchCard = ({ item }: { item: any }) => (
    <AppliedMatchCard
      match={item}
      onSelect={handleSelect}
      isSelected={selectedMatchId === item.requestId}
    />
  );

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <CustomHeader title="신청한 매치 보기" />

      <ScrollView
        style={[styles.scrollContainer, { flex: 1 }]}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 }]} // 버튼 영역 확보
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
            data={appliedMatches || []}
            keyExtractor={(item, index) => String(item.requestId ?? index)}
            renderItem={renderMatchCard}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  신청한 매치가 없습니다
                </Text>
              </View>
            }
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        )}
      </ScrollView>

      {/* ✅ 선택된 매치 있을 때만 하단 버튼 표시 */}
      {selectedMatchId && (
        <View style={checkAppliedMatchesStyles.footer}>
          <TouchableOpacity
            style={checkAppliedMatchesStyles.cancelButton}
            onPress={handleCancel}
          >
            <Text style={checkAppliedMatchesStyles.cancelText}>
              매치 요청 취소하기
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
