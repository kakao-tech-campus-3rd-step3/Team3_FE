import React from 'react';
import { View, Text } from 'react-native';

import { colors } from '@/src/theme';

import RequestManagementModal, {
  type RequestItem,
} from './request_management_modal';

export interface MatchRequest {
  id: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requesterId: number;
  teamId: number;
  matchId?: number;
  message?: string;
  decisionReason?: string;
  decidedBy?: number;
  decidedAt?: string;
  createdAt: string;
}

interface MatchRequestsModalProps {
  visible: boolean;
  matchRequests: MatchRequest[];
  onClose: () => void;
  onMatchRequest: (requestId: number, status: 'approved' | 'rejected') => void;
}

export default function MatchRequestsModal({
  visible,
  matchRequests,
  onClose,
  onMatchRequest,
}: MatchRequestsModalProps) {
  // MatchRequest를 RequestItem으로 변환
  const requests: RequestItem[] = matchRequests.map(request => ({
    id: request.id,
    status: request.status,
    applicantId: request.requesterId,
    teamId: request.teamId,
    matchId: request.matchId,
    message: request.message,
    decisionReason: request.decisionReason,
    decidedBy: request.decidedBy,
    decidedAt: request.decidedAt,
    createdAt: request.createdAt,
  }));

  // 매치 요청 전용 상세 정보 렌더링
  const renderMatchRequestDetails = (request: RequestItem) => (
    <View style={{ marginBottom: 12 }}>
      {request.matchId && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 6,
          }}
        >
          <Text
            style={{ fontSize: 14, color: colors.gray[600], fontWeight: '500' }}
          >
            매치 ID:
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: colors.gray[900],
              flex: 1,
              textAlign: 'right',
            }}
          >
            {request.matchId}
          </Text>
        </View>
      )}
      {request.message && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 6,
          }}
        >
          <Text
            style={{ fontSize: 14, color: colors.gray[600], fontWeight: '500' }}
          >
            메시지:
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: colors.gray[900],
              flex: 1,
              textAlign: 'right',
            }}
          >
            {request.message}
          </Text>
        </View>
      )}
      {request.decisionReason && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 6,
          }}
        >
          <Text
            style={{ fontSize: 14, color: colors.gray[600], fontWeight: '500' }}
          >
            결정 사유:
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: colors.gray[900],
              flex: 1,
              textAlign: 'right',
            }}
          >
            {request.decisionReason}
          </Text>
        </View>
      )}
      {request.decidedBy && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 6,
          }}
        >
          <Text
            style={{ fontSize: 14, color: colors.gray[600], fontWeight: '500' }}
          >
            결정자:
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: colors.gray[900],
              flex: 1,
              textAlign: 'right',
            }}
          >
            {request.decidedBy}
          </Text>
        </View>
      )}
      {request.decidedAt && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 6,
          }}
        >
          <Text
            style={{ fontSize: 14, color: colors.gray[600], fontWeight: '500' }}
          >
            결정일:
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: colors.gray[900],
              flex: 1,
              textAlign: 'right',
            }}
          >
            {new Date(request.decidedAt).toLocaleDateString('ko-KR')}
          </Text>
        </View>
      )}
    </View>
  );

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
    />
  );
}
