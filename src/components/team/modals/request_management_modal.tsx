import { Ionicons } from '@expo/vector-icons';
import { type ReactNode } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from '@/src/components/team/modals/join_requests_modal_styles';
import InfoRow from '@/src/components/ui/info_row';
import StatusBadge from '@/src/components/ui/status_badge';
import { colors } from '@/src/theme';

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
  renderRequestDetails?: (request: RequestItem) => ReactNode;
  processingRequestId?: number | null;
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
  processingRequestId,
}: RequestManagementModalProps) {
  const defaultRenderRequestDetails = (request: RequestItem) => (
    <View style={styles.requestDetails}>
      {request.teamId && (
        <InfoRow
          label="팀 ID:"
          value={String(request.teamId)}
          containerStyle={styles.requestDetailRow}
          labelStyle={styles.requestDetailLabel}
          valueStyle={styles.requestDetailValue}
        />
      )}
      {request.decisionReason && (
        <InfoRow
          label="결정 사유:"
          value={request.decisionReason}
          containerStyle={styles.requestDetailRow}
          labelStyle={styles.requestDetailLabel}
          valueStyle={styles.requestDetailValue}
        />
      )}
      {request.decidedBy && (
        <InfoRow
          label="결정자:"
          value={String(request.decidedBy)}
          containerStyle={styles.requestDetailRow}
          labelStyle={styles.requestDetailLabel}
          valueStyle={styles.requestDetailValue}
        />
      )}
      {request.decidedAt && (
        <InfoRow
          label="결정일:"
          value={new Date(request.decidedAt).toLocaleDateString('ko-KR')}
          containerStyle={styles.requestDetailRow}
          labelStyle={styles.requestDetailLabel}
          valueStyle={styles.requestDetailValue}
        />
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
                    <View style={styles.applicantInfo}></View>
                    <View style={styles.requestStatus}>
                      <StatusBadge status={request.status} />
                    </View>
                  </View>

                  {renderRequestDetails
                    ? renderRequestDetails(request)
                    : defaultRenderRequestDetails(request)}

                  {request.status === 'PENDING' && (
                    <View style={styles.requestActions}>
                      <TouchableOpacity
                        style={[
                          styles.approveButton,
                          processingRequestId === request.id &&
                            styles.buttonDisabled,
                        ]}
                        onPress={() => onRequestAction(request.id, 'approved')}
                        disabled={processingRequestId === request.id}
                      >
                        <Ionicons
                          name="checkmark"
                          size={16}
                          color={colors.white}
                        />
                        <Text style={styles.approveButtonText}>승인</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.rejectButton,
                          processingRequestId === request.id &&
                            styles.buttonDisabled,
                        ]}
                        onPress={() => onRequestAction(request.id, 'rejected')}
                        disabled={processingRequestId === request.id}
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
