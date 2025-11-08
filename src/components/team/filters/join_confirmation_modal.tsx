import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';

import { colors } from '@/src/theme';

interface JoinConfirmationModalProps {
  visible: boolean;
  teamName: string;
  teamType: string;
  onConfirm: () => void;
  onCancel: () => void;
  slideAnim: Animated.Value;
}

const { height: screenHeight } = Dimensions.get('window');

export default function JoinConfirmationModal({
  visible,
  teamName,
  teamType,
  onConfirm,
  onCancel,
  slideAnim,
}: JoinConfirmationModalProps) {
  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [screenHeight, 0],
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onCancel}
        />

        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <View style={styles.dragHandle} />

          <View style={styles.modalHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="people" size={32} color={colors.white} />
            </View>
            <Text style={styles.modalTitle}>팀 신청 확인</Text>
            <Text style={styles.modalSubtitle}>
              선택한 팀에 신청하시겠습니까?
            </Text>
          </View>

          <View style={styles.teamInfoContainer}>
            <View style={styles.teamInfoCard}>
              <View style={styles.teamInfoHeader}>
                <Text style={styles.teamName}>{teamName}</Text>
                <View style={styles.teamTypeBadge}>
                  <Text style={styles.teamTypeText}>{teamType}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Ionicons name="checkmark" size={20} color={colors.white} />
              <Text style={styles.confirmButtonText}>신청하기</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: colors.gray[300],
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  modalHeader: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.blue[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: colors.blue[500],
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: colors.gray[600],
    textAlign: 'center',
    lineHeight: 20,
  },
  teamInfoContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  teamInfoCard: {
    backgroundColor: colors.gray[50],
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  teamInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  teamName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.gray[900],
    flex: 1,
  },
  teamTypeBadge: {
    backgroundColor: colors.blue[50],
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  teamTypeText: {
    fontSize: 12,
    color: colors.blue[500],
    fontWeight: '500',
  },
  teamDetails: {
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.gray[600],
    fontWeight: '500',
    minWidth: 40,
  },
  detailValue: {
    fontSize: 14,
    color: colors.gray[900],
    fontWeight: '600',
  },
  modalActions: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.gray[100],
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray[700],
  },
  confirmButton: {
    flex: 1,
    backgroundColor: colors.blue[500],
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    shadowColor: colors.blue[500],
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});
