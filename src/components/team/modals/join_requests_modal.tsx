import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from '@/src/components/team/modals/join_requests_modal_styles';
import InfoRow from '@/src/components/ui/info_row';
import StatusBadge from '@/src/components/ui/status_badge';
import { convertPositionToKorean } from '@/src/constants/positions';
import { useUserProfileById } from '@/src/hooks/queries';
import { colors } from '@/src/theme';
import type { TeamJoinRequest } from '@/src/types/team';
import { getSkillLevelInKorean } from '@/src/utils/team';

interface JoinRequestsModalProps {
  visible: boolean;
  joinRequests: TeamJoinRequest[];
  onClose: () => void;
  onJoinRequest: (requestId: number, status: 'approved' | 'rejected') => void;
  processingRequestId?: number | null;
}

export default function JoinRequestsModal({
  visible,
  joinRequests,
  onClose,
  onJoinRequest,
  processingRequestId = null,
}: JoinRequestsModalProps) {
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
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer} edges={['top']}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>가입 요청 관리</Text>
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <Ionicons name="close" size={24} color={colors.gray[500]} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          {joinRequests.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons
                name="person-add-outline"
                size={48}
                color={colors.gray[400]}
              />
              <Text style={styles.emptyStateTitle}>가입 요청이 없습니다</Text>
              <Text style={styles.emptyStateText}>
                팀에 가입하고 싶어하는 사람들이 요청을 보내면 여기에 표시됩니다.
              </Text>
            </View>
          ) : (
            <View style={styles.requestsList}>
              {joinRequests.map(request => (
                <JoinRequestCard
                  key={request.id}
                  request={request}
                  onJoinRequest={onJoinRequest}
                  isProcessing={processingRequestId === request.id}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

function JoinRequestCard({
  request,
  onJoinRequest,
  isProcessing = false,
}: {
  request: TeamJoinRequest;
  onJoinRequest: (requestId: number, status: 'approved' | 'rejected') => void;
  isProcessing?: boolean;
}) {
  const { data: profile } = useUserProfileById(request.applicantId);

  const detailRows = profile
    ? [
        { label: '이메일:', value: profile.email },
        { label: '카카오톡:', value: profile.kakaoTalkId },
        { label: '포지션:', value: convertPositionToKorean(profile.position) },
        { label: '실력:', value: getSkillLevelInKorean(profile.skillLevel) },
        { label: '대학:', value: profile.university },
      ].filter(row => !!row.value)
    : [];

  return (
    <View style={styles.requestCard}>
      <View style={styles.requestHeader}>
        <View style={styles.applicantInfo}>
          <View style={styles.applicantNameRow}>
            <Text style={styles.applicantName}>
              {profile?.name ||
                request.applicantName ||
                `사용자 ${request.applicantId}`}
            </Text>
            {request.isMercenary && (
              <View style={styles.mercenaryBadge}>
                <Text style={styles.mercenaryBadgeText}>용병</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.requestStatus}>
          <StatusBadge status={request.status} />
        </View>
      </View>

      <View style={styles.requestDetails}>
        {[
          request.message && {
            label: '가입 메시지:',
            value: request.message,
          },
          ...detailRows,
          request.decisionReason && {
            label: '결정 사유:',
            value: request.decisionReason,
          },
          request.decidedBy && {
            label: '결정자:',
            value: String(request.decidedBy),
          },
          request.decidedAt && {
            label: '결정일:',
            value: new Date(request.decidedAt).toLocaleDateString('ko-KR'),
          },
        ]
          .filter((row): row is { label: string; value: string } =>
            Boolean(row)
          )
          .map(row => (
            <InfoRow
              key={`${row.label}${row.value}`}
              label={row.label}
              value={row.value}
              containerStyle={styles.requestDetailRow}
              labelStyle={styles.requestDetailLabel}
              valueStyle={styles.requestDetailValue}
            />
          ))}
      </View>

      {request.status === 'PENDING' && (
        <View style={styles.requestActions}>
          <TouchableOpacity
            style={[
              styles.approveButton,
              isProcessing && styles.buttonDisabled,
            ]}
            onPress={() => onJoinRequest(request.id, 'approved')}
            disabled={isProcessing}
          >
            <Ionicons name="checkmark" size={16} color={colors.white} />
            <Text
              style={styles.approveButtonText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {isProcessing ? '처리 중...' : '승인'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.rejectButton, isProcessing && styles.buttonDisabled]}
            onPress={() => onJoinRequest(request.id, 'rejected')}
            disabled={isProcessing}
          >
            <Ionicons name="close" size={16} color={colors.white} />
            <Text
              style={styles.rejectButtonText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {isProcessing ? '처리 중...' : '거절'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
