import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { useTeamMember } from '@/src/hooks/queries';
import { colors, spacing, typography } from '@/src/theme';
import { getRoleDisplayName } from '@/src/utils/team';

interface MemberDetailModalProps {
  visible: boolean;
  teamId: string | number;
  userId: string | number;
  onClose: () => void;
}

export default function MemberDetailModal({
  visible,
  teamId,
  userId,
  onClose,
}: MemberDetailModalProps) {
  const { data: member, isLoading, error } = useTeamMember(teamId, userId);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>팀원 정보</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.gray[600]} />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.grass[500]} />
                <Text style={styles.loadingText}>
                  팀원 정보를 불러오는 중...
                </Text>
              </View>
            ) : error ? (
              <View style={styles.errorContainer}>
                <Ionicons
                  name="alert-circle-outline"
                  size={48}
                  color={colors.red[500]}
                />
                <Text style={styles.errorText}>
                  팀원 정보를 불러올 수 없습니다.
                </Text>
                <TouchableOpacity onPress={onClose} style={styles.retryButton}>
                  <Text style={styles.retryButtonText}>확인</Text>
                </TouchableOpacity>
              </View>
            ) : member ? (
              <View style={styles.memberInfo}>
                <View style={styles.avatarContainer}>
                  <View style={styles.avatar}>
                    <Ionicons
                      name="person"
                      size={40}
                      color={colors.gray[400]}
                    />
                  </View>
                  <View style={styles.roleBadge}>
                    <Text style={styles.roleText}>
                      {getRoleDisplayName(member.role)}
                    </Text>
                  </View>
                </View>

                <View style={styles.infoSection}>
                  <View style={styles.infoItem}>
                    <Ionicons
                      name="person-outline"
                      size={20}
                      color={colors.gray[500]}
                    />
                    <View style={styles.infoContent}>
                      <Text style={styles.infoLabel}>이름</Text>
                      <Text style={styles.infoValue}>{member.name}</Text>
                    </View>
                  </View>

                  <View style={styles.infoItem}>
                    <Ionicons
                      name="mail-outline"
                      size={20}
                      color={colors.gray[500]}
                    />
                    <View style={styles.infoContent}>
                      <Text style={styles.infoLabel}>이메일</Text>
                      <Text style={styles.infoValue}>{member.email}</Text>
                    </View>
                  </View>

                  <View style={styles.infoItem}>
                    <Ionicons
                      name="football-outline"
                      size={20}
                      color={colors.gray[500]}
                    />
                    <View style={styles.infoContent}>
                      <Text style={styles.infoLabel}>포지션</Text>
                      <Text style={styles.infoValue}>{member.position}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: spacing.spacing4,
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.spacing5,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  title: {
    fontSize: typography.fontSize.font5,
    fontWeight: typography.fontWeight.bold,
    color: colors.gray[900],
  },
  closeButton: {
    padding: spacing.spacing1,
  },
  content: {
    padding: spacing.spacing5,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: spacing.spacing10,
  },
  loadingText: {
    marginTop: spacing.spacing3,
    fontSize: typography.fontSize.font4,
    color: colors.gray[600],
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: spacing.spacing10,
  },
  errorText: {
    marginTop: spacing.spacing3,
    fontSize: typography.fontSize.font4,
    color: colors.red[500],
    textAlign: 'center',
  },
  retryButton: {
    marginTop: spacing.spacing4,
    backgroundColor: colors.grass[500],
    paddingHorizontal: spacing.spacing5,
    paddingVertical: spacing.spacing3,
    borderRadius: spacing.spacing3,
  },
  retryButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.medium,
  },
  memberInfo: {
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: spacing.spacing6,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.spacing3,
  },
  roleBadge: {
    backgroundColor: colors.grass[100],
    paddingHorizontal: spacing.spacing3,
    paddingVertical: spacing.spacing1,
    borderRadius: spacing.spacing2,
  },
  roleText: {
    fontSize: typography.fontSize.font3,
    color: colors.grass[700],
    fontWeight: typography.fontWeight.medium,
  },
  infoSection: {
    width: '100%',
    gap: spacing.spacing4,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing3,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: typography.fontSize.font3,
    color: colors.gray[500],
    marginBottom: spacing.spacing1,
  },
  infoValue: {
    fontSize: typography.fontSize.font4,
    color: colors.gray[900],
    fontWeight: typography.fontWeight.medium,
  },
});
