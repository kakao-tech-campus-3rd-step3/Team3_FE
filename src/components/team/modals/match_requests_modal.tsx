import React, { useEffect } from 'react';
import { View, Text, BackHandler } from 'react-native';

import { colors } from '@/src/theme';

import RequestManagementModal, {
  type RequestItem,
} from './request_management_modal';

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
  requestMessage: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELED';
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

    return (
      <View style={{ marginBottom: 12 }}>
        {matchRequest && (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: colors.gray[600],
                  fontWeight: '500',
                }}
              >
                요청 팀:
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.gray[900],
                  flex: 1,
                  textAlign: 'right',
                }}
              >
                {matchRequest.requestTeamName.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: colors.gray[600],
                  fontWeight: '500',
                }}
              >
                대상 팀:
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.gray[900],
                  flex: 1,
                  textAlign: 'right',
                }}
              >
                {matchRequest.targetTeamName.name}
              </Text>
            </View>
          </>
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
              style={{
                fontSize: 14,
                color: colors.gray[600],
                fontWeight: '500',
              }}
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
              {cleanMessage(request.message)}
            </Text>
          </View>
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
    />
  );
}
