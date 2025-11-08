import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from '@/src/components/team/sections/manage_section_styles';
import {
  getTeamManagementEditUrl,
  getTeamManagementMembersUrl,
  getTeamManagementMatchRequestsUrl,
} from '@/src/constants/routes';
import { colors } from '@/src/theme';
import type { TeamJoinRequest } from '@/src/types/team';

interface ManageSectionProps {
  teamId: string | number;
  joinRequests: TeamJoinRequest[];
  matchRequests?: any[]; // 매치 요청 타입은 추후 정의
  onShowJoinRequestsModal: () => void;
  onDeleteTeam: () => void;
}

export default function ManageSection({
  teamId,
  joinRequests,
  matchRequests = [],
  onShowJoinRequestsModal,
  onDeleteTeam,
}: ManageSectionProps) {
  return (
    <View style={styles.manageSection}>
      <Text style={styles.manageDescription}>
        팀 설정 및 관리 기능입니다. 회장만 접근할 수 있습니다.
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
          <Text
            style={styles.secondaryButtonText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            가입 요청 관리
            {joinRequests.filter(req => req.status === 'PENDING').length >
              0 && (
              <Text style={styles.badgeText}>
                {' '}
                ({joinRequests.filter(req => req.status === 'PENDING').length})
              </Text>
            )}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push(getTeamManagementMatchRequestsUrl(teamId))}
        >
          <Ionicons
            name="football-outline"
            size={20}
            color={colors.gray[700]}
          />
          <Text
            style={styles.secondaryButtonText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            매치 요청 관리
            {matchRequests.filter(req => req.status === 'PENDING').length >
              0 && (
              <Text style={styles.badgeText}>
                {' '}
                ({matchRequests.filter(req => req.status === 'PENDING').length})
              </Text>
            )}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push(getTeamManagementEditUrl(teamId))}
        >
          <Ionicons
            name="settings-outline"
            size={20}
            color={colors.gray[700]}
          />
          <Text
            style={styles.secondaryButtonText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            팀 정보 수정
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push(getTeamManagementMembersUrl(teamId))}
        >
          <Ionicons name="people-outline" size={20} color={colors.gray[700]} />
          <Text
            style={styles.secondaryButtonText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            팀원 관리
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dangerButton} onPress={onDeleteTeam}>
          <Ionicons name="trash-outline" size={20} color={colors.white} />
          <Text
            style={styles.dangerButtonText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            팀 삭제
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
