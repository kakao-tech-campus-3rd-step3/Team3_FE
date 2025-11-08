import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

import { styles } from '@/src/components/team/modals/role_change_modal_styles';
import { theme } from '@/src/theme';
import type { TeamMember, TeamMemberRole } from '@/src/types/team';

interface RoleChangeModalProps {
  visible: boolean;
  selectedMember: TeamMember | null;
  onClose: () => void;
  onUpdateRole: (newRole: TeamMemberRole) => void;
}

export default memo(function RoleChangeModal({
  visible,
  selectedMember,
  onClose,
  onUpdateRole,
}: RoleChangeModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>역할 변경</Text>
            <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
              <Ionicons name="close" size={24} color={theme.colors.gray[700]} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <Text style={styles.modalMemberName}>
              {selectedMember?.name}님의 역할을 선택해주세요
            </Text>

            <View style={styles.roleOptions}>
              <TouchableOpacity
                style={[
                  styles.roleOption,
                  selectedMember?.role === 'VICE_LEADER' &&
                    styles.roleOptionSelected,
                ]}
                onPress={() => onUpdateRole('VICE_LEADER')}
              >
                <Text style={styles.roleOptionText}>부회장</Text>
                <Text style={styles.roleOptionDescription}>
                  팀 관리 권한을 가집니다
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roleOption,
                  selectedMember?.role === 'MEMBER' &&
                    styles.roleOptionSelected,
                ]}
                onPress={() => onUpdateRole('MEMBER')}
              >
                <Text style={styles.roleOptionText}>일반멤버</Text>
                <Text style={styles.roleOptionDescription}>
                  기본 팀원 권한을 가집니다
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
});
