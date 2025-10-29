import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  BackHandler,
  Alert,
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

  /** ✅ 이미 선발에 배정된 선수 (포지션: 이름 매핑) */
  assignedMembers?: Record<string, string | null>;

  /** ✅ 후보 명단 */
  benchMembers?: { id: number; name: string }[];

  /** ✅ 후보 추가 시 선발 중복 제거 */
  onRemoveFromFormation?: (memberName: string) => void;

  /** ✅ 선발 추가 시 후보 중복 제거 */
  onRemoveFromBench?: (memberName: string) => void;
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
  assignedMembers = {},
  benchMembers = [],
  onRemoveFromFormation,
  onRemoveFromBench,
}: TeamMemberSelectModalProps) => {
  const [selected, setSelected] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (visible && multiple) {
      const initial = Object.fromEntries(preselected.map(m => [m.id, true]));
      setSelected(initial);
    }
  }, [visible, multiple, preselected]);

  useEffect(() => {
    if (!visible) return;

    const handleBackPress = () => {
      onClose();
      return true;
    };
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );
    return () => subscription.remove();
  }, [visible, onClose]);

  const toggleSelect = (id: number, name: string) => {
    const isAssigned = Object.values(assignedMembers).includes(name);
    const isBench = benchMembers.some(b => b.name === name);

    // 이미 선발 or 후보에 있는 경우
    if (isAssigned && !multiple) {
      Alert.alert(
        '중복 선택 불가',
        `${name} 선수는 이미 다른 포지션에 배정되어 있습니다.`
      );
      return;
    }

    if (multiple && isAssigned) {
      Alert.alert(
        '선발 선수 추가',
        `${name} 선수는 현재 선발 라인업에 포함되어 있습니다.\n후보로 등록 시 선발에서 제외됩니다.`,
        [
          {
            text: '예',
            onPress: () => onRemoveFromFormation?.(name),
          },
          { text: '아니오', style: 'cancel' },
        ]
      );
    }

    // 후보 중복 방지
    if (multiple && isBench && !selected[id]) {
      Alert.alert('중복 선택', `${name} 선수는 이미 후보로 등록되어 있습니다.`);
      return;
    }

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
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingBottom: theme.spacing.spacing6 }}
            renderItem={({ item }) => {
              const isSelected = !!selected[item.id];
              const isAssigned = Object.values(assignedMembers).includes(
                item.name
              );
              const assignedPosition = Object.keys(assignedMembers).find(
                k => assignedMembers[k] === item.name
              );
              const isBench = benchMembers.some(b => b.name === item.name);

              return (
                <TouchableOpacity
                  // ✅ 이제 비활성화하지 않는다.
                  style={[
                    styles.memberItem,
                    isSelected && { backgroundColor: theme.colors.gray[100] },
                  ]}
                  onPress={() => {
                    if (multiple) {
                      toggleSelect(item.id, item.name);
                    } else {
                      // ✅ 이미 다른 포지션에 있던 선수라면, 이동 처리
                      if (isAssigned && assignedPosition !== position) {
                        onRemoveFromFormation?.(item.name);
                      }

                      // ✅ 후보에도 있던 선수면 후보 명단에서 제거
                      if (isBench) {
                        onRemoveFromBench?.(item.name);
                      }

                      onSelect?.(item.id, item.name);
                    }
                  }}
                >
                  <View style={styles.memberRow}>
                    <Text style={styles.memberText}>
                      {item.name}
                      {multiple && isSelected ? ' ✓' : ''}
                    </Text>

                    {/* ✅ 상태 배지 */}
                    {isAssigned && (
                      <Text style={styles.assignedTag}>
                        선발 ({assignedPosition || '?'})
                      </Text>
                    )}
                    {isBench && !isAssigned && (
                      <Text style={styles.benchTag}>후보</Text>
                    )}
                  </View>
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
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  memberText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.gray[800],
  },
  assignedTag: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.blue[600],
    fontWeight: theme.typography.fontWeight.semibold,
  },
  benchTag: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.orange[600],
    fontWeight: theme.typography.fontWeight.semibold,
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
