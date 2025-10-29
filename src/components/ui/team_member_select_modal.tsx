import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  BackHandler,
} from 'react-native';

import { theme } from '@/src/theme';
import { TeamMember } from '@/src/types/team';

interface TeamMemberSelectModalProps {
  visible: boolean;
  members: TeamMember[];
  position: string | null;
  onClose: () => void;
  onSelect?: (memberId: number, memberName: string) => void;
  multiple?: boolean;
  onMultiSelect?: (members: { id: number; name: string }[]) => void;
  preselected?: { id: number; name: string }[];
}

export const TeamMemberSelectModal = ({
  visible,
  members,
  position,
  onClose,
  onSelect,
  multiple = false,
  onMultiSelect,
  preselected = [],
}: TeamMemberSelectModalProps) => {
  const [selected, setSelected] = useState<Record<number, boolean>>({});

  // ✅ preselected 초기화
  useEffect(() => {
    if (visible && multiple) {
      const initial = Object.fromEntries(preselected.map(m => [m.id, true]));
      setSelected(initial);
    }
  }, [visible, multiple, preselected]);

  // ✅ 안드로이드 뒤로가기 처리
  useEffect(() => {
    if (!visible) return;

    const handleBackPress = () => {
      onClose();
      return true; // 기본 앱 종료 방지
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    // 모달이 닫히면 이벤트 제거
    return () => {
      subscription.remove();
    };
  }, [visible, onClose]);

  const toggleSelect = (id: number) => {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const confirmSelection = () => {
    const selectedList = members
      .filter(m => selected[m.id])
      .map(m => ({ id: m.id, name: m.name }));
    onMultiSelect?.(selectedList);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {position ? `${position} 포지션 선택` : '팀원 선택'}
          </Text>

          <FlatList
            data={members}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              const isSelected = !!selected[item.id];
              return (
                <TouchableOpacity
                  style={[
                    styles.memberItem,
                    isSelected && { backgroundColor: theme.colors.gray[100] },
                  ]}
                  onPress={() =>
                    multiple
                      ? toggleSelect(item.id)
                      : onSelect?.(item.id, item.name)
                  }
                >
                  <Text style={styles.memberText}>
                    {item.name}
                    {multiple && isSelected ? ' ✓' : ''}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          {multiple ? (
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={confirmSelection}
            >
              <Text style={styles.modalCloseText}>선택 완료</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
              <Text style={styles.modalCloseText}>닫기</Text>
            </TouchableOpacity>
          )}
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
