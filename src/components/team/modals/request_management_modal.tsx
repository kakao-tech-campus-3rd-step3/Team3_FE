import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from '@/src/components/team/modals/join_requests_modal_styles';
import { colors } from '@/src/theme';
import { getJoinRequestStatusDisplayName } from '@/src/utils/team';

export interface RequestItem {
  id: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ACCEPTED' | 'CANCELED';
  applicantId?: number;
  teamId?: number;
  matchId?: number;
  message?: string;
  decisionReason?: string;
  decidedBy?: number;
  decidedAt?: string;
}

interface RequestManagementModalProps {
  visible: boolean;
  title: string;
  requests: RequestItem[];
  emptyStateIcon?: string;
  emptyStateTitle: string;
  emptyStateText: string;
  onClose: () => void;
  onRequestAction: (requestId: number, status: 'approved' | 'rejected') => void;
  renderRequestDetails?: (request: RequestItem) => React.ReactNode;
}

export default function RequestManagementModal({
  visible,
  title,
  requests,
  emptyStateIcon = 'person-add-outline',
  emptyStateTitle,
  emptyStateText,
  onClose,
  onRequestAction,
  renderRequestDetails,
}: RequestManagementModalProps) {
  const defaultRenderRequestDetails = (request: RequestItem) => (
    <View style={styles.requestDetails}>
      {request.teamId && (
        <View style={styles.requestDetailRow}>
          <Text style={styles.requestDetailLabel}>팀 ID:</Text>
          <Text style={styles.requestDetailValue}>{request.teamId}</Text>
        </View>
      )}
      {request.decisionReason && (
        <View style={styles.requestDetailRow}>
          <Text style={styles.requestDetailLabel}>결정 사유:</Text>
          <Text style={styles.requestDetailValue}>
            {request.decisionReason}
          </Text>
        </View>
      )}
      {request.decidedBy && (
        <View style={styles.requestDetailRow}>
          <Text style={styles.requestDetailLabel}>결정자:</Text>
          <Text style={styles.requestDetailValue}>{request.decidedBy}</Text>
        </View>
      )}
      {request.decidedAt && (
        <View style={styles.requestDetailRow}>
          <Text style={styles.requestDetailLabel}>결정일:</Text>
          <Text style={styles.requestDetailValue}>
            {new Date(request.decidedAt).toLocaleDateString('ko-KR')}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer} edges={['top']}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{title}</Text>
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <Ionicons name="close" size={24} color={colors.gray[500]} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          {requests.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons
                name={emptyStateIcon as any}
                size={48}
                color={colors.gray[400]}
              />
              <Text style={styles.emptyStateTitle}>{emptyStateTitle}</Text>
              <Text style={styles.emptyStateText}>{emptyStateText}</Text>
            </View>
          ) : (
            <View style={styles.requestsList}>
              {requests.map(request => (
                <View key={request.id} style={styles.requestCard}>
                  <View style={styles.requestHeader}>
                    <View style={styles.applicantInfo}>
                      {request.applicantId && (
                        <Text style={styles.applicantName}>
                          신청자 ID: {request.applicantId}
                        </Text>
                      )}
                      <Text style={styles.applicantEmail}>
                        신청 ID: {request.id}
                      </Text>
                    </View>
                    <View style={styles.requestStatus}>
                      <View
                        style={[
                          styles.statusBadge,
                          request.status === 'PENDING' && styles.statusPending,
                          request.status === 'APPROVED' &&
                            styles.statusApproved,
                          request.status === 'REJECTED' &&
                            styles.statusRejected,
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusText,
                            request.status === 'PENDING' &&
                              styles.statusTextPending,
                            request.status === 'APPROVED' &&
                              styles.statusTextApproved,
                            request.status === 'REJECTED' &&
                              styles.statusTextRejected,
                          ]}
                        >
                          {getJoinRequestStatusDisplayName(request.status)}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {renderRequestDetails
                    ? renderRequestDetails(request)
                    : defaultRenderRequestDetails(request)}

                  {request.status === 'PENDING' && (
                    <View style={styles.requestActions}>
                      <TouchableOpacity
                        style={styles.approveButton}
                        onPress={() => onRequestAction(request.id, 'approved')}
                      >
                        <Ionicons
                          name="checkmark"
                          size={16}
                          color={colors.white}
                        />
                        <Text style={styles.approveButtonText}>승인</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.rejectButton}
                        onPress={() => onRequestAction(request.id, 'rejected')}
                      >
                        <Ionicons name="close" size={16} color={colors.white} />
                        <Text style={styles.rejectButtonText}>거절</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
