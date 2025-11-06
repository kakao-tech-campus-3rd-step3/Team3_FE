import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { View, Text, BackHandler, StyleSheet } from 'react-native';

import RequestManagementModal, {
  type RequestItem,
} from '@/src/components/team/modals/request_management_modal';
import { colors, spacing, typography } from '@/src/theme';
import { convertUTCToKSTTime, convertUTCToKSTDate } from '@/src/utils/timezone';

export interface MatchRequest {
  requestId: number;
  requestTeamId: number;
  requestTeamName: {
    name: string;
  };
  targetTeamId: number;
  targetTeamName: {
    name: string;
  };
  preferredDate?: string;
  preferredTimeStart?: string;
  preferredTimeEnd?: string;
  venueName?: string;
  requestMessage: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELED';
  requestTeamLineupId?: number;
}

interface MatchRequestsModalProps {
  visible: boolean;
  matchRequests: MatchRequest[];
  onClose: () => void;
  onMatchRequest: (requestId: number, status: 'approved' | 'rejected') => void;
  processingRequestId?: number | null;
}

export default function MatchRequestsModal({
  visible,
  matchRequests,
  onClose,
  onMatchRequest,
  processingRequestId,
}: MatchRequestsModalProps) {
  const requests: RequestItem[] = matchRequests.map(request => ({
    id: request.requestId,
    status: request.status,
    applicantId: request.requestTeamId,
    teamId: request.targetTeamId,
    matchId: undefined,
    message: request.requestMessage,
    decisionReason: undefined,
    decidedBy: undefined,
    decidedAt: undefined,
    createdAt: new Date().toISOString(),
  }));

  const renderMatchRequestDetails = (request: RequestItem) => {
    const matchRequest = matchRequests.find(mr => mr.requestId === request.id);

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

    const formatTime = (timeStart?: string, timeEnd?: string) => {
      if (!timeStart || !timeEnd) return '시간 미정';
      try {
        const start = timeStart.slice(0, 5);
        const end = timeEnd.slice(0, 5);
        return `${start} ~ ${end}`;
      } catch {
        return `${timeStart} ~ ${timeEnd}`;
      }
    };

    return (
      <View style={styles.detailsContainer}>
        {matchRequest && (
          <>
            {/* 매치 정보 카드 */}
            {(matchRequest.preferredDate ||
              matchRequest.preferredTimeStart ||
              matchRequest.venueName) && (
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
                  {matchRequest.preferredDate && (
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
                          {formatDate(matchRequest.preferredDate)}
                        </Text>
                      </View>
                    </View>
                  )}

                  {(matchRequest.preferredTimeStart ||
                    matchRequest.preferredTimeEnd) && (
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
                            matchRequest.preferredTimeStart,
                            matchRequest.preferredTimeEnd
                          )}
                        </Text>
                      </View>
                    </View>
                  )}

                  {matchRequest.venueName && (
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
                          {matchRequest.venueName}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            )}

            {/* 요청 메시지 */}
            {request.message && (
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
                    {cleanMessage(request.message)}
                  </Text>
                </View>
              </View>
            )}
          </>
        )}
      </View>
    );
  };

  useEffect(() => {
    const backAction = () => {
      if (visible) {
        onClose();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [visible, onClose]);

  return (
    <RequestManagementModal
      visible={visible}
      title="매치 요청 관리"
      requests={requests}
      emptyStateIcon="football-outline"
      emptyStateTitle="매치 요청이 없습니다"
      emptyStateText="다른 팀에서 매치를 요청하면 여기에 표시됩니다."
      onClose={onClose}
      onRequestAction={onMatchRequest}
      renderRequestDetails={renderMatchRequestDetails}
      processingRequestId={processingRequestId}
    />
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    marginBottom: spacing.spacing3,
  },
  matchInfoCard: {
    backgroundColor: colors.blue[50],
    borderRadius: spacing.spacing3,
    padding: spacing.spacing4,
    marginBottom: spacing.spacing4,
    borderLeftWidth: 4,
    borderLeftColor: colors.blue[500],
  },
  matchInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing2,
    marginBottom: spacing.spacing3,
  },
  matchInfoTitle: {
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
    color: colors.gray[900],
  },
  matchInfoGrid: {
    gap: spacing.spacing3,
  },
  matchInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.spacing3,
    borderRadius: spacing.spacing2,
    gap: spacing.spacing2,
  },
  matchInfoItemIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gray[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchInfoItemContent: {
    flex: 1,
  },
  matchInfoItemLabel: {
    fontSize: typography.fontSize.font2,
    color: colors.gray[600],
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.spacing1,
  },
  matchInfoItemValue: {
    fontSize: typography.fontSize.font3,
    fontWeight: typography.fontWeight.semibold,
    color: colors.gray[900],
  },
  messageSection: {
    marginTop: spacing.spacing2,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing2,
    marginBottom: spacing.spacing2,
  },
  messageTitle: {
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.semibold,
    color: colors.gray[900],
  },
  messageContent: {
    backgroundColor: colors.gray[50],
    borderRadius: spacing.spacing2,
    padding: spacing.spacing3,
  },
  messageText: {
    fontSize: typography.fontSize.font3,
    color: colors.gray[700],
    lineHeight: typography.lineHeight.line5,
  },
});
