import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

import { getTeamManagementSettingsUrl } from '@/src/constants/routes';
import { colors, spacing, typography } from '@/src/theme';
import type { TeamDetailResponse } from '@/src/types/team';

const { width } = Dimensions.get('window');

interface TeamInfoCardProps {
  team: TeamDetailResponse;
  canManageTeam: boolean;
}

export default memo(function TeamInfoCard({
  team,
  canManageTeam,
}: TeamInfoCardProps) {
  const handleTeamManagement = () => {
    router.push(getTeamManagementSettingsUrl(team.id));
  };

  return (
    <View style={styles.container}>
      {/* 헤더 섹션 */}
      <View style={styles.headerGradient}>
        <View style={styles.headerContent}>
          <View style={styles.teamTitleContainer}>
            <Text style={styles.teamTitle}>{team.name}</Text>
            <Text style={styles.teamSubtitle}>{team.university}</Text>
          </View>
          {canManageTeam && (
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={handleTeamManagement}
            >
              <Ionicons name="settings-outline" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* 메인 정보 섹션 */}
      <View style={styles.mainContent}>
        {/* 설명 섹션 */}
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionLabel}>팀 소개</Text>
          <Text style={styles.descriptionText}>{team.description}</Text>
        </View>

        {/* 통계 카드들 */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View
              style={[styles.statIconContainer, { backgroundColor: '#E3F2FD' }]}
            >
              <Ionicons name="people-outline" size={24} color="#1976D2" />
            </View>
            <Text style={styles.statValue}>{team.memberCount}</Text>
            <Text style={styles.statLabel}>멤버</Text>
          </View>

          <View style={styles.statCard}>
            <View
              style={[styles.statIconContainer, { backgroundColor: '#FFF3E0' }]}
            >
              <Ionicons name="star-outline" size={24} color="#F57C00" />
            </View>
            <Text style={styles.statValue}>{team.skillLevel}</Text>
            <Text style={styles.statLabel}>실력</Text>
          </View>

          <View style={styles.statCard}>
            <View
              style={[styles.statIconContainer, { backgroundColor: '#F3E5F5' }]}
            >
              <Ionicons name="calendar-outline" size={24} color="#7B1FA2" />
            </View>
            <Text style={styles.statValue}>
              {new Date(team.createdAt).getFullYear()}.
              {String(new Date(team.createdAt).getMonth() + 1).padStart(2, '0')}
            </Text>
            <Text style={styles.statLabel}>생성</Text>
          </View>
        </View>

        {/* 축구 팀 배지 */}
        <View style={styles.badgeContainer}>
          <View style={styles.teamTypeBadge}>
            <Text style={styles.teamTypeIcon}>⚽</Text>
            <Text style={styles.teamTypeText}>축구팀</Text>
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 0,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    overflow: 'hidden',
  },
  headerGradient: {
    backgroundColor: '#16a34a',
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamTitleContainer: {
    flex: 1,
  },
  teamTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  teamSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  settingsButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    padding: 20,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray[700],
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 15,
    color: colors.gray[600],
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.gray[50],
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray[500],
    fontWeight: '500',
  },
  badgeContainer: {
    alignItems: 'center',
  },
  teamTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.blue[50],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.blue[200],
  },
  teamTypeIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  teamTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.blue[700],
  },
});
