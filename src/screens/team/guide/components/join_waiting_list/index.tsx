import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { getTeamManagementUrl } from '@/src/constants/routes';
import { useMyJoinWaitingList } from '@/src/hooks/queries';
import CancelModal from '@/src/screens/team/guide/components/join_waiting_list/cancel_modal';
import { styles } from '@/src/screens/team/guide/components/join_waiting_list/styles';
import { colors } from '@/src/theme';
import type { UserJoinWaitingItem } from '@/src/types/team';
import { getUserJoinWaitingStatusDisplayName } from '@/src/utils/team';

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
    router.push(getTeamManagementUrl(teamId));
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
    const statusIcon = getStatusIcon(item.status);

    return (
      <View style={styles.joinWaitingItem}>
        <View style={styles.cardHeader}>
          <View style={styles.teamInfoSection}>
            <View style={styles.teamIconContainer}>
              <Ionicons name="people" size={24} color={colors.blue[500]} />
            </View>
            <View style={styles.teamTextContainer}>
              <Text style={styles.teamNameText}>{item.teamName}</Text>
            </View>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Ionicons
              name={statusIcon}
              size={14}
              color={getStatusTextColor(item.status).color}
            />
            <Text style={[styles.statusText, getStatusTextColor(item.status)]}>
              {statusText}
            </Text>
          </View>
        </View>

        <View style={styles.applicantSection}>
          <View style={styles.applicantHeader}>
            <Ionicons
              name="person-circle-outline"
              size={20}
              color={colors.blue[400]}
            />
            <Text style={styles.applicantLabel}>신청자 정보</Text>
          </View>
          <View style={styles.applicantInfo}>
            <View style={styles.applicantDetails}>
              <Text style={styles.applicantName}>{item.applicantName}</Text>
              <Text style={styles.applicantSubtext}>
                팀 가입을 신청했습니다
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.statusMessageSection}>
          <View
            style={[styles.statusMessage, getStatusMessageStyle(item.status)]}
          >
            <Ionicons
              name={getStatusMessageIcon(item.status)}
              size={16}
              color={getStatusMessageColor(item.status)}
            />
            <Text
              style={[
                styles.statusMessageText,
                { color: getStatusMessageColor(item.status) },
              ]}
            >
              {getStatusMessage(item.status)}
            </Text>
          </View>
        </View>

        {item.status === 'APPROVED' && (
          <View style={styles.actionSection}>
            <TouchableOpacity
              style={styles.viewTeamButton}
              onPress={() => handleViewTeam(item.teamId)}
            >
              <Ionicons name="eye-outline" size={16} color={colors.white} />
              <Text style={styles.viewTeamButtonText}>팀 보기</Text>
            </TouchableOpacity>
          </View>
        )}

        {item.status === 'PENDING' && (
          <View style={styles.actionSection}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleCancelRequest(item)}
            >
              <Ionicons
                name="close-circle-outline"
                size={16}
                color={colors.white}
              />
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
        return colors.yellow[100];
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

  const getStatusTextColor = (status: UserJoinWaitingItem['status']) => {
    switch (status) {
      case 'PENDING':
        return { color: colors.yellow[600] };
      case 'APPROVED':
        return { color: colors.green[600] };
      case 'REJECTED':
        return { color: colors.red[600] };
      case 'CANCELED':
        return { color: colors.gray[600] };
      default:
        return { color: colors.gray[600] };
    }
  };

  const getStatusIcon = (status: UserJoinWaitingItem['status']) => {
    switch (status) {
      case 'PENDING':
        return 'time-outline';
      case 'APPROVED':
        return 'checkmark-circle-outline';
      case 'REJECTED':
        return 'close-circle-outline';
      case 'CANCELED':
        return 'ban-outline';
      default:
        return 'help-circle-outline';
    }
  };

  const getStatusMessage = (status: UserJoinWaitingItem['status']) => {
    switch (status) {
      case 'PENDING':
        return '회장의 승인을 기다리고 있습니다';
      case 'APPROVED':
        return '팀 가입이 승인되었습니다!';
      case 'REJECTED':
        return '팀 가입이 거절되었습니다';
      case 'CANCELED':
        return '신청이 취소되었습니다';
      default:
        return '알 수 없는 상태입니다';
    }
  };

  const getStatusMessageIcon = (status: UserJoinWaitingItem['status']) => {
    switch (status) {
      case 'PENDING':
        return 'hourglass-outline';
      case 'APPROVED':
        return 'checkmark-circle';
      case 'REJECTED':
        return 'close-circle';
      case 'CANCELED':
        return 'ban';
      default:
        return 'help-circle';
    }
  };

  const getStatusMessageColor = (status: UserJoinWaitingItem['status']) => {
    switch (status) {
      case 'PENDING':
        return colors.orange[600];
      case 'APPROVED':
        return colors.green[600];
      case 'REJECTED':
        return colors.red[600];
      case 'CANCELED':
        return colors.gray[600];
      default:
        return colors.gray[600];
    }
  };

  const getStatusMessageStyle = (status: UserJoinWaitingItem['status']) => {
    switch (status) {
      case 'PENDING':
        return { backgroundColor: colors.orange[50] };
      case 'APPROVED':
        return { backgroundColor: colors.green[50] };
      case 'REJECTED':
        return { backgroundColor: colors.red[50] };
      case 'CANCELED':
        return { backgroundColor: colors.gray[50] };
      default:
        return { backgroundColor: colors.gray[50] };
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
        <Ionicons name="people-outline" size={48} color={colors.gray[400]} />
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
