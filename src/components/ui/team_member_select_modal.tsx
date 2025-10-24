import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';

import { theme } from '@/src/theme';
import { TeamMember } from '@/src/types/team';

interface TeamMemberSelectModalProps {
  visible: boolean;
  members: TeamMember[];
  position: string | null;
  onClose: () => void;
  onSelect: (memberName: string) => void;
}

export const TeamMemberSelectModal = ({
  visible,
  members,
  position,
  onClose,
  onSelect,
}: TeamMemberSelectModalProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {position ? `${position} 포지션 선택` : '팀원 선택'}
          </Text>

          <FlatList
            data={members}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.memberItem}
                onPress={() => onSelect(item.name)}
              >
                <Text style={styles.memberText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
            <Text style={styles.modalCloseText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.spacing5,
  },
  modalContent: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.spacing4,
    width: '100%',
    maxWidth: 400,
    paddingVertical: theme.spacing.spacing6,
    paddingHorizontal: theme.spacing.spacing5,
    shadowColor: theme.colors.gray[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: theme.typography.fontSize.font5,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.gray[900],
    textAlign: 'center',
    marginBottom: theme.spacing.spacing4,
  },
  memberItem: {
    paddingVertical: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing3,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  memberText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.gray[800],
  },
  modalCloseButton: {
    marginTop: theme.spacing.spacing5,
    backgroundColor: theme.colors.blue[600],
    paddingVertical: theme.spacing.spacing4,
    borderRadius: theme.spacing.spacing3,
    alignItems: 'center',
  },
  modalCloseText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
