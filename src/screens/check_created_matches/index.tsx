import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ScrollView, RefreshControl } from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import { useUserProfile } from '@/src/hooks/queries';
import { useMyCreatedMatches } from '@/src/hooks/useMyCreatedMatches';
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

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchProfile(), refetchMatches()]);
    setRefreshing(false);
  }, [refetchProfile, refetchMatches]);

  const renderMatchCard = ({ item }: { item: any }) => (
    <MatchCard match={item} showStatus={true} isCancellable={true} />
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
