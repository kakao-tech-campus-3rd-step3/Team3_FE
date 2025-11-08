import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import StatusBadge from '@/src/components/ui/status_badge';
import {
  useTeamMatchRequests,
  useAcceptMatchRequestMutation,
  useRejectMatchRequestMutation,
} from '@/src/hooks/queries';
import { colors } from '@/src/theme';
import type { MatchRequestResponseDto } from '@/src/types/match';
import { convertUTCToKSTTime } from '@/src/utils/timezone';

import { styles } from './match_requests_screen_styles';

interface MatchRequestsScreenProps {
  teamId?: string | string[];
}

export default function MatchRequestsScreen({
  teamId,
}: MatchRequestsScreenProps) {
  const [processingRequestId, setProcessingRequestId] = useState<number | null>(
    null
  );

  const {
    data: matchRequestsData,
    isLoading,
    error,
    refetch: refetchMatchRequests,
  } = useTeamMatchRequests();

  const acceptMatchRequestMutation = useAcceptMatchRequestMutation();
  const rejectMatchRequestMutation = useRejectMatchRequestMutation();

  const matchRequests: MatchRequestResponseDto[] = matchRequestsData || [];

  useEffect(() => {
    if (acceptMatchRequestMutation.isSuccess) {
      const matchId = acceptMatchRequestMutation.data?.matchId;
      if (matchId) {
        Alert.alert('성공', '매치가 성사되었습니다!', [
          {
            text: '확인',
            onPress: () => {
              router.push(`/match_set?matchId=${matchId}`);
            },
          },
        ]);
      }
      refetchMatchRequests();
    }
  }, [
    acceptMatchRequestMutation.isSuccess,
    acceptMatchRequestMutation.data,
    refetchMatchRequests,
  ]);

  const handleMatchRequest = async (
    requestId: number,
    status: 'approved' | 'rejected'
  ) => {
    const action = status === 'approved' ? '수락' : '거절';

    Alert.alert(`매치 ${action}`, `이 매치 요청을 ${action}하시겠습니까?`, [
      { text: '취소', style: 'cancel' },
      {
        text: action,
        style: status === 'rejected' ? 'destructive' : 'default',
        onPress: () => {
          setProcessingRequestId(requestId);
          if (status === 'approved') {
            acceptMatchRequestMutation.mutate(requestId, {
              onSuccess: () => {
                setProcessingRequestId(null);
                refetchMatchRequests();
              },
              onError: () => {
                setProcessingRequestId(null);
                Alert.alert('오류', `${action} 처리 중 오류가 발생했습니다.`);
              },
            });
          } else {
            rejectMatchRequestMutation.mutate(requestId, {
              onSuccess: () => {
                setProcessingRequestId(null);
                Alert.alert('성공', `매치 요청을 ${action}했습니다.`);
                refetchMatchRequests();
              },
              onError: () => {
                setProcessingRequestId(null);
                Alert.alert('오류', `${action} 처리 중 오류가 발생했습니다.`);
              },
            });
          }
        },
      },
    ]);
  };

  const cleanMessage = (message: string) => {
    return message.replace(/\([0-9]+\)\s*팀이/, '팀이');
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '날짜 미정';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short',
      });
    } catch {
      return dateString;
    }
  };

  const formatTime = (
    timeStart?: string,
    timeEnd?: string,
    preferredDate?: string
  ) => {
    if (!timeStart || !timeEnd) return '시간 미정';
    try {
      if (!preferredDate) {
        const start = timeStart.slice(0, 5);
        const end = timeEnd.slice(0, 5);
        return `${start} ~ ${end}`;
      }
      const kstStart = convertUTCToKSTTime(`${preferredDate}T${timeStart}Z`);
      const kstEnd = convertUTCToKSTTime(`${preferredDate}T${timeEnd}Z`);
      return `${kstStart} ~ ${kstEnd}`;
    } catch {
      return `${timeStart} ~ ${timeEnd}`;
    }
  };

  const renderMatchRequestDetails = (request: MatchRequestResponseDto) => {
    return (
      <View style={styles.detailsContainer}>
        {/* 라인업 보기 버튼 */}
        {request.requestTeamLineupId && (
          <View style={styles.lineupButtonSection}>
            <TouchableOpacity
              style={styles.viewLineupButton}
              onPress={() => {
                router.push(
                  `/match_application/lineup?lineupId=${request.requestTeamLineupId}`
                );
              }}
            >
              <Ionicons
                name="football-outline"
                size={16}
                color={colors.blue[600]}
              />
              <Text style={styles.viewLineupButtonText}>라인업 보기</Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={colors.blue[600]}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* 매치 정보 카드 */}
        {(request.preferredDate ||
          request.preferredTimeStart ||
          request.venueName) && (
          <View style={styles.matchInfoCard}>
            <View style={styles.matchInfoHeader}>
              <Ionicons
                name="calendar-outline"
                size={18}
                color={colors.blue[600]}
              />
              <Text style={styles.matchInfoTitle}>매치 정보</Text>
            </View>

            <View style={styles.matchInfoGrid}>
              {request.preferredDate && (
                <View style={styles.matchInfoItem}>
                  <View style={styles.matchInfoItemIcon}>
                    <Ionicons
                      name="calendar"
                      size={16}
                      color={colors.blue[500]}
                    />
                  </View>
                  <View style={styles.matchInfoItemContent}>
                    <Text style={styles.matchInfoItemLabel}>경기 일정</Text>
                    <Text style={styles.matchInfoItemValue}>
                      {formatDate(request.preferredDate)}
                    </Text>
                  </View>
                </View>
              )}

              {(request.preferredTimeStart || request.preferredTimeEnd) && (
                <View style={styles.matchInfoItem}>
                  <View style={styles.matchInfoItemIcon}>
                    <Ionicons
                      name="time"
                      size={16}
                      color={colors.purple[500]}
                    />
                  </View>
                  <View style={styles.matchInfoItemContent}>
                    <Text style={styles.matchInfoItemLabel}>경기 시간</Text>
                    <Text style={styles.matchInfoItemValue}>
                      {formatTime(
                        request.preferredTimeStart,
                        request.preferredTimeEnd,
                        request.preferredDate
                      )}
                    </Text>
                  </View>
                </View>
              )}

              {request.venueName && (
                <View style={styles.matchInfoItem}>
                  <View style={styles.matchInfoItemIcon}>
                    <Ionicons
                      name="location"
                      size={16}
                      color={colors.green[500]}
                    />
                  </View>
                  <View style={styles.matchInfoItemContent}>
                    <Text style={styles.matchInfoItemLabel}>경기장</Text>
                    <Text style={styles.matchInfoItemValue}>
                      {request.venueName}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        )}

        {/* 요청 메시지 */}
        {request.requestMessage && (
          <View style={styles.messageSection}>
            <View style={styles.messageHeader}>
              <Ionicons
                name="chatbubble-outline"
                size={18}
                color={colors.gray[600]}
              />
              <Text style={styles.messageTitle}>요청 메시지</Text>
            </View>
            <View style={styles.messageContent}>
              <Text style={styles.messageText}>
                {cleanMessage(request.requestMessage)}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <CustomHeader title="매치 요청 관리" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.blue[600]} />
          <Text style={styles.loadingText}>매치 요청을 불러오는 중...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <CustomHeader title="매치 요청 관리" />
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={48}
            color={colors.red[500]}
          />
          <Text style={styles.errorText}>매치 요청을 불러올 수 없습니다.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader title="매치 요청 관리" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {matchRequests.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="football-outline"
              size={48}
              color={colors.gray[400]}
            />
            <Text style={styles.emptyStateTitle}>매치 요청이 없습니다</Text>
            <Text style={styles.emptyStateText}>
              다른 팀에서 매치를 요청하면 여기에 표시됩니다.
            </Text>
          </View>
        ) : (
          <View style={styles.requestsList}>
            {matchRequests.map(request => (
              <View key={request.requestId} style={styles.requestCard}>
                <View style={styles.requestHeader}>
                  <View style={styles.applicantInfo}>
                    <Text style={styles.requestTeamName}>
                      {typeof request.requestTeamName === 'object'
                        ? request.requestTeamName.name
                        : request.requestTeamName}
                    </Text>
                  </View>
                  <View style={styles.requestStatus}>
                    <StatusBadge status={request.status} />
                  </View>
                </View>

                {renderMatchRequestDetails(request)}

                {request.status === 'PENDING' && (
                  <View style={styles.requestActions}>
                    <TouchableOpacity
                      style={[
                        styles.approveButton,
                        processingRequestId === request.requestId &&
                          styles.buttonDisabled,
                      ]}
                      onPress={() =>
                        handleMatchRequest(request.requestId, 'approved')
                      }
                      disabled={processingRequestId === request.requestId}
                    >
                      <Ionicons
                        name="checkmark"
                        size={16}
                        color={colors.green[600]}
                      />
                      <Text style={styles.approveButtonText}>승인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.rejectButton,
                        processingRequestId === request.requestId &&
                          styles.buttonDisabled,
                      ]}
                      onPress={() =>
                        handleMatchRequest(request.requestId, 'rejected')
                      }
                      disabled={processingRequestId === request.requestId}
                    >
                      <Ionicons
                        name="close"
                        size={16}
                        color={colors.red[600]}
                      />
                      <Text style={styles.rejectButtonText}>거절</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
