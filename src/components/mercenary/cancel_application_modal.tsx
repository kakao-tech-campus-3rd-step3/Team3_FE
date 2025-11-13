import { Ionicons } from '@expo/vector-icons';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { theme } from '@/src/theme';
import type { UserJoinWaitingItem } from '@/src/types/team';

import { styles } from './cancel_application_modal_styles';

interface CancelApplicationModalProps {
  visible: boolean;
  selectedApplication: UserJoinWaitingItem | null;
  cancelReason: string;
  isCanceling: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onReasonChange: (reason: string) => void;
}

export default function CancelApplicationModal({
  visible,
  selectedApplication,
  cancelReason,
  isCanceling,
  onClose,
  onConfirm,
  onReasonChange,
}: CancelApplicationModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>용병 신청 취소</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={theme.colors.text.main} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <Text style={styles.modalDescription}>
              정말로 이 용병 신청을 취소하시겠습니까?
            </Text>

            {selectedApplication && (
              <View style={styles.selectedTeamInfo}>
                <Text style={styles.teamLabel}>신청한 팀</Text>
                <Text style={styles.teamNameText}>
                  {selectedApplication.teamName}
                </Text>
              </View>
            )}

            <View style={styles.reasonSection}>
              <Text style={styles.reasonLabel}>취소 사유 (선택사항)</Text>
              <TextInput
                style={styles.reasonInput}
                placeholder="취소 사유를 입력해주세요"
                placeholderTextColor={theme.colors.text.sub}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={cancelReason}
                onChangeText={onReasonChange}
              />
            </View>
          </View>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={onClose}
              disabled={isCanceling}
            >
              <Text style={styles.modalCancelButtonText}>돌아가기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalConfirmButton,
                isCanceling && styles.buttonDisabled,
              ]}
              onPress={onConfirm}
              disabled={isCanceling}
            >
              <Text style={styles.modalConfirmButtonText}>
                {isCanceling ? '취소 중...' : '신청 취소'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
