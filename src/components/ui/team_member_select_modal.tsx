import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  BackHandler,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { useUserProfileContext } from '@/src/contexts/user_profile_context';
import { useTeamMembersInfinite } from '@/src/hooks/queries';
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
  assignedMembers: Record<string, number | null>;
  benchMembers?: { id: number; name: string }[];
  onRemoveFromFormation?: (memberId: number) => void;
  onRemoveFromBench?: (memberId: number) => void;
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
  const [filter, setFilter] = useState<string>('전체');

  const { userProfile } = useUserProfileContext();
  const teamId = userProfile?.teamId ?? 0;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useTeamMembersInfinite(teamId, 10);

  const allMembers = useMemo(
    () => (data ? data.pages.flatMap(page => page.members) : members),
    [data, members]
  );
  const positionFilters = ['전체', 'GK', 'DF', 'MF', 'FW'];

  const filteredMembers = useMemo(() => {
    return filter === '전체'
      ? allMembers
      : allMembers.filter(m => m.position?.toUpperCase().startsWith(filter));
  }, [filter, allMembers]);

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
    const isAssigned = Object.values(assignedMembers).includes(id);
    const isBench = benchMembers.some(b => b.id === id);

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
            onPress: () => {
              onRemoveFromFormation?.(id);
              setSelected(prev => ({ ...prev, [id]: !prev[id] }));
            },
          },
          { text: '아니오', style: 'cancel' },
        ]
      );
      return;
    }

    if (multiple && isBench && !selected[id]) {
      Alert.alert('중복 선택', `${name} 선수는 이미 후보로 등록되어 있습니다.`);
      return;
    }

    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const confirmSelection = () => {
    const selectedList = allMembers
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

          <View style={styles.filterRow}>
            {positionFilters.map(f => (
              <TouchableOpacity
                key={f}
                style={[
                  styles.filterButton,
                  filter === f && styles.filterButtonActive,
                ]}
                onPress={() => setFilter(f)}
              >
                <Text
                  style={[
                    styles.filterText,
                    filter === f && styles.filterTextActive,
                  ]}
                >
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <FlatList
            data={filteredMembers}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator
            style={{ maxHeight: '70%' }}
            contentContainerStyle={{ paddingBottom: theme.spacing.spacing6 }}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.3}
            renderItem={({ item }) => {
              const isSelected = !!selected[item.id];
              const isAssigned = Object.values(assignedMembers).includes(
                item.id
              );
              const assignedPosition = Object.keys(assignedMembers).find(
                k => assignedMembers[k] === item.id
              );
              const isBench = benchMembers.some(b => b.id === item.id);

              return (
                <TouchableOpacity
                  style={[
                    styles.memberItem,
                    isSelected && { backgroundColor: theme.colors.gray[100] },
                  ]}
                  onPress={() => {
                    if (multiple) toggleSelect(item.id, item.name);
                    else {
                      if (isAssigned && assignedPosition !== position) {
                        onRemoveFromFormation?.(item.id);
                      }
                      if (isBench) onRemoveFromBench?.(item.id);
                      onSelect?.(item.id, item.name);
                    }
                  }}
                >
                  <View style={styles.memberRow}>
                    <View>
                      <Text style={styles.memberText}>
                        {item.name}
                        {multiple && isSelected ? ' ✓' : ''}
                      </Text>
                      <Text style={styles.memberPosition}>
                        {item.position || '포지션 미등록'}
                      </Text>
                    </View>
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
            ListFooterComponent={
              isFetchingNextPage ? (
                <ActivityIndicator
                  style={{ marginVertical: 10 }}
                  size="small"
                  color={theme.colors.gray[400]}
                />
              ) : null
            }
            ListEmptyComponent={
              isLoading ? (
                <ActivityIndicator style={{ marginTop: 20 }} />
              ) : (
                <View style={{ paddingVertical: 20 }}>
                  <Text style={styles.emptyText}>
                    선택 가능한 팀원이 없습니다.
                  </Text>
                </View>
              )
            }
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
    maxHeight: '80%',
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
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing.spacing3,
    flexWrap: 'wrap',
  },
  filterButton: {
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing3,
    paddingVertical: theme.spacing.spacing2,
    marginHorizontal: theme.spacing.spacing1,
    marginBottom: theme.spacing.spacing2,
    backgroundColor: theme.colors.white,
  },
  filterButtonActive: {
    backgroundColor: theme.colors.blue[50],
    borderColor: theme.colors.blue[400],
  },
  filterText: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.gray[700],
  },
  filterTextActive: {
    color: theme.colors.blue[600],
    fontWeight: theme.typography.fontWeight.bold,
  },
  memberPosition: {
    fontSize: theme.typography.fontSize.font2,
    color: theme.colors.gray[600],
    marginTop: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: theme.colors.gray[500],
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.medium,
  },
});
