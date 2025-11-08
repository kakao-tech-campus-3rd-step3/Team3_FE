import { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import {
  useUserProfile,
  useMyAppliedMatches,
  useCancelMatchRequestMutation,
} from '@/src/hooks/queries';
import AppliedMatchCard from '@/src/screens/check_applied_matches/components/applied_match_card';
import { styles } from '@/src/screens/match_application/match_application_style';

export default function CheckAppliedMatchesScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);

  const { refetch: refetchProfile } = useUserProfile();
  const {
    data: appliedMatches,
    isLoading,
    error,
    refetch: refetchMatches,
  } = useMyAppliedMatches();

  const { mutate: cancelRequest, isPending } = useCancelMatchRequestMutation();

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchProfile(), refetchMatches()]);
    setRefreshing(false);
    setSelectedMatchId(null);
  }, [refetchProfile, refetchMatches]);

  const handleCancelPress = (id: number) => {
    setSelectedMatchId(id);
    setCancelModalVisible(true);
  };

  const handleCancelConfirm = () => {
    if (selectedMatchId) {
      cancelRequest(selectedMatchId, {
        onSuccess: () => {
          Alert.alert('성공', '매치 요청이 취소되었습니다.');
          setCancelModalVisible(false);
          setSelectedMatchId(null);
          refetchMatches();
        },
        onError: error => {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '매치 요청 취소 중 문제가 발생했습니다.';
          Alert.alert('오류', errorMessage);
        },
      });
    }
  };

  const handleCancelModalClose = () => {
    setCancelModalVisible(false);
    setSelectedMatchId(null);
  };

  const renderMatchCard = ({ item }: { item: any }) => (
    <AppliedMatchCard
      match={item}
      onCancel={handleCancelPress}
      isCanceling={isPending && selectedMatchId === item.requestId}
    />
  );

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <CustomHeader title="신청한 매치 보기" />

      <ScrollView
        style={[styles.scrollContainer, { flex: 1 }]}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 }]}
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

      <Modal
        visible={cancelModalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCancelModalClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>매치 요청 취소</Text>
            <Text style={styles.modalMessage}>
              이 매치 요청을 정말 취소하시겠습니까?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelModalButton]}
                onPress={handleCancelModalClose}
              >
                <Text style={styles.cancelModalButtonText}>아니요</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmModalButton]}
                onPress={handleCancelConfirm}
                disabled={isPending}
              >
                <Text style={styles.confirmModalButtonText}>
                  {isPending ? '취소 중...' : '예'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
