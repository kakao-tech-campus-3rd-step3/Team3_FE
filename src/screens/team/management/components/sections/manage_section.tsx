import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { colors } from '@/src/theme';
import type { JoinRequest } from '@/src/types/team';

import { styles } from '../../styles/team_settings_styles';

interface ManageSectionProps {
  teamId: string | number;
  joinRequests: JoinRequest[];
  onShowJoinRequestsModal: () => void;
  onDeleteTeam: () => void;
}

export default function ManageSection({
  teamId,
  joinRequests,
  onShowJoinRequestsModal,
  onDeleteTeam,
}: ManageSectionProps) {
  return (
    <View style={styles.manageSection}>
      <Text style={styles.manageDescription}>
        팀 설정 및 관리 기능입니다. 주장만 접근할 수 있습니다.
      </Text>

      <View style={styles.manageActions}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={onShowJoinRequestsModal}
        >
          <Ionicons
            name="person-add-outline"
            size={20}
            color={colors.gray[700]}
          />
          <Text style={styles.secondaryButtonText}>
            가입 요청 관리
            {joinRequests.filter(req => req.status === 'pending').length >
              0 && (
              <Text style={styles.badgeText}>
                {' '}
                ({joinRequests.filter(req => req.status === 'pending').length})
              </Text>
            )}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push(`/team/management/${teamId}/edit`)}
        >
          <Ionicons
            name="settings-outline"
            size={20}
            color={colors.gray[700]}
          />
          <Text style={styles.secondaryButtonText}>팀 정보 수정</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push(`/team/management/${teamId}/members`)}
        >
          <Ionicons name="people-outline" size={20} color={colors.gray[700]} />
          <Text style={styles.secondaryButtonText}>팀원 관리</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dangerButton} onPress={onDeleteTeam}>
          <Ionicons name="trash-outline" size={20} color={colors.white} />
          <Text style={styles.dangerButtonText}>팀 삭제</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
