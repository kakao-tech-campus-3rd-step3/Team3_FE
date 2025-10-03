import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { useMyJoinWaitingList } from '@/src/hooks/useTeamJoinRequest';
import { colors } from '@/src/theme';
import type { UserJoinWaitingItem } from '@/src/types/team';
import { getUserJoinWaitingStatusDisplayName } from '@/src/utils/team';

import CancelModal from './cancel_modal';
import { styles } from './styles';

interface JoinWaitingListProps {
  onClose: () => void;
}

export default function JoinWaitingList({ onClose }: JoinWaitingListProps) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<UserJoinWaitingItem | null>(
    null
  );
  const { data, isLoading, error, refetch } = useMyJoinWaitingList(page, 10);

  const handleViewTeam = (teamId: number) => {
    router.push(`/team/management/${teamId}`);
    onClose();
  };

  const handleRefresh = () => {
    setPage(0);
    refetch();
  };

  const loadMore = () => {
    if (data && !data.last && !isLoading) {
      setPage(prev => prev + 1);
    }
  };

  const handleCancelRequest = (item: UserJoinWaitingItem) => {
    setSelectedItem(item);
    setShowCancelModal(true);
  };

  const handleCancelSuccess = () => {
    handleRefresh();
  };

  const renderJoinWaitingItem = ({ item }: { item: UserJoinWaitingItem }) => {
    const statusColor = getStatusColor(item.status);
    const statusText = getUserJoinWaitingStatusDisplayName(item.status);

    return (
      <View style={styles.joinWaitingItem}>
        <View style={styles.itemHeader}>
          <Text style={styles.teamIdText}>팀 ID: {item.teamId}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{statusText}</Text>
          </View>
        </View>

        {item.decisionReason && (
          <Text style={styles.decisionReason}>사유: {item.decisionReason}</Text>
        )}

        {item.decidedAt && (
          <Text style={styles.decidedAt}>
            처리일: {new Date(item.decidedAt).toLocaleDateString('ko-KR')}
          </Text>
        )}

        {item.status === 'APPROVED' && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.viewTeamButton}
              onPress={() => handleViewTeam(item.teamId)}
            >
              <Text style={styles.viewTeamButtonText}>팀 보기</Text>
            </TouchableOpacity>
          </View>
        )}

        {item.status === 'PENDING' && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleCancelRequest(item)}
            >
              <Text style={styles.cancelButtonText}>신청 취소</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const getStatusColor = (status: UserJoinWaitingItem['status']) => {
    switch (status) {
      case 'PENDING':
        return colors.orange[100];
      case 'APPROVED':
        return colors.green[100];
      case 'REJECTED':
        return colors.red[100];
      case 'CANCELED':
        return colors.gray[100];
      default:
        return colors.gray[100];
    }
  };

  if (isLoading && !data) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.blue[500]} />
        <Text style={styles.loadingText}>신청 목록을 불러오는 중...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons
          name="alert-circle-outline"
          size={48}
          color={colors.red[500]}
        />
        <Text style={styles.errorText}>신청 목록을 불러올 수 없습니다</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
          <Text style={styles.retryButtonText}>다시 시도</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!data || data.empty) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="document-outline" size={48} color={colors.gray[400]} />
        <Text style={styles.emptyText}>신청한 팀이 없습니다</Text>
        <Text style={styles.emptySubtext}>
          팀 참여하기를 통해 팀에 신청해보세요!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>나의 팀 가입 신청</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={colors.gray[600]} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data.content}
        renderItem={renderJoinWaitingItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshing={isLoading}
        onRefresh={handleRefresh}
        ListFooterComponent={
          isLoading && data ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" color={colors.blue[500]} />
            </View>
          ) : null
        }
      />

      <CancelModal
        visible={showCancelModal}
        joinWaitingItem={selectedItem}
        onClose={() => {
          setShowCancelModal(false);
          setSelectedItem(null);
        }}
        onSuccess={handleCancelSuccess}
        onOuterModalClose={onClose}
      />
    </View>
  );
}
