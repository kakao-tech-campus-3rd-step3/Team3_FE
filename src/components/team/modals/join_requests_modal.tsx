import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/src/theme';
import type { TeamJoinRequest } from '@/src/types/team';
import { getJoinRequestStatusDisplayName } from '@/src/utils/team';

import { styles } from './join_requests_modal_styles';

interface JoinRequestsModalProps {
  visible: boolean;
  joinRequests: TeamJoinRequest[];
  onClose: () => void;
  onJoinRequest: (requestId: number, status: 'approved' | 'rejected') => void;
}

export default function JoinRequestsModal({
  visible,
  joinRequests,
  onClose,
  onJoinRequest,
}: JoinRequestsModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
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
                <View key={request.id} style={styles.requestCard}>
                  <View style={styles.requestHeader}>
                    <View style={styles.applicantInfo}>
                      <Text style={styles.applicantName}>
                        {request.applicantName ||
                          `사용자 ${request.applicantId}`}
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

                  <View style={styles.requestDetails}>
                    {request.decisionReason && (
                      <View style={styles.requestDetailRow}>
                        <Text style={styles.requestDetailLabel}>
                          결정 사유:
                        </Text>
                        <Text style={styles.requestDetailValue}>
                          {request.decisionReason}
                        </Text>
                      </View>
                    )}
                    {request.decidedBy && (
                      <View style={styles.requestDetailRow}>
                        <Text style={styles.requestDetailLabel}>결정자:</Text>
                        <Text style={styles.requestDetailValue}>
                          {request.decidedBy}
                        </Text>
                      </View>
                    )}
                    {request.decidedAt && (
                      <View style={styles.requestDetailRow}>
                        <Text style={styles.requestDetailLabel}>결정일:</Text>
                        <Text style={styles.requestDetailValue}>
                          {new Date(request.decidedAt).toLocaleDateString(
                            'ko-KR'
                          )}
                        </Text>
                      </View>
                    )}
                  </View>

                  {request.status === 'PENDING' && (
                    <View style={styles.requestActions}>
                      <TouchableOpacity
                        style={styles.approveButton}
                        onPress={() => onJoinRequest(request.id, 'approved')}
                      >
                        <Ionicons
                          name="checkmark"
                          size={16}
                          color={colors.white}
                        />
                        <Text
                          style={styles.approveButtonText}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          승인
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.rejectButton}
                        onPress={() => onJoinRequest(request.id, 'rejected')}
                      >
                        <Ionicons name="close" size={16} color={colors.white} />
                        <Text
                          style={styles.rejectButtonText}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          거절
                        </Text>
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
