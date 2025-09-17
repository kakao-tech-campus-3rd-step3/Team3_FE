import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';

import type { JoinRequest } from '@/src/types/team';

import { styles } from '../../team_settings_styles';

interface JoinRequestsModalProps {
  visible: boolean;
  joinRequests: JoinRequest[];
  onClose: () => void;
  onJoinRequest: (requestId: string, status: 'approved' | 'rejected') => void;
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
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>가입 요청 관리</Text>
          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          {joinRequests.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="person-add-outline" size={48} color="#9ca3af" />
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
                        {request.applicantName}
                      </Text>
                      <Text style={styles.applicantEmail}>
                        {request.applicantEmail}
                      </Text>
                    </View>
                    <View style={styles.requestStatus}>
                      <View
                        style={[
                          styles.statusBadge,
                          request.status === 'pending' && styles.statusPending,
                          request.status === 'approved' &&
                            styles.statusApproved,
                          request.status === 'rejected' &&
                            styles.statusRejected,
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusText,
                            request.status === 'pending' &&
                              styles.statusTextPending,
                            request.status === 'approved' &&
                              styles.statusTextApproved,
                            request.status === 'rejected' &&
                              styles.statusTextRejected,
                          ]}
                        >
                          {request.status === 'pending'
                            ? '대기중'
                            : request.status === 'approved'
                              ? '승인됨'
                              : '거절됨'}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.requestDetails}>
                    <View style={styles.requestDetailRow}>
                      <Text style={styles.requestDetailLabel}>포지션:</Text>
                      <Text style={styles.requestDetailValue}>
                        {request.position}
                      </Text>
                    </View>
                    <View style={styles.requestDetailRow}>
                      <Text style={styles.requestDetailLabel}>경력:</Text>
                      <Text style={styles.requestDetailValue}>
                        {request.experience}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.requestMessage}>{request.message}</Text>

                  {request.status === 'pending' && (
                    <View style={styles.requestActions}>
                      <TouchableOpacity
                        style={styles.approveButton}
                        onPress={() => onJoinRequest(request.id, 'approved')}
                      >
                        <Ionicons name="checkmark" size={16} color="#ffffff" />
                        <Text style={styles.approveButtonText}>승인</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.rejectButton}
                        onPress={() => onJoinRequest(request.id, 'rejected')}
                      >
                        <Ionicons name="close" size={16} color="#ffffff" />
                        <Text style={styles.rejectButtonText}>거절</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  <Text style={styles.requestDate}>
                    {new Date(request.createdAt).toLocaleDateString('ko-KR')}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}
