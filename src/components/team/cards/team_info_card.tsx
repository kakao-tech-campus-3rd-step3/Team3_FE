import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import {
  getTeamManagementSettingsUrl,
  getTeamManagementRecentMatchesUrl,
} from '@/src/constants/routes';
import { colors } from '@/src/theme';
import type { TeamDetailResponse } from '@/src/types/team';

interface TeamInfoCardProps {
  team: TeamDetailResponse;
  canManageTeam: boolean;
}

export default memo(function TeamInfoCard({
  team,
  canManageTeam,
}: TeamInfoCardProps) {
  const handleTeamManagement = () => {
    router.push(getTeamManagementSettingsUrl(team.id.toString()));
  };

  const handleRecentMatches = () => {
    router.push(getTeamManagementRecentMatchesUrl(team.id.toString()));
  };

  return (
    <View style={styles.container}>
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

      <View style={styles.mainContent}>
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionLabel}>팀 소개</Text>
          <Text style={styles.descriptionText}>{team.description}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View
              style={[
                styles.statIconContainer,
                { backgroundColor: colors.blue[50] },
              ]}
            >
              <Ionicons
                name="people-outline"
                size={24}
                color={colors.blue[700]}
              />
            </View>
            <Text style={styles.statValue}>{team.memberCount}</Text>
            <Text style={styles.statLabel}>멤버</Text>
          </View>

          <View style={styles.statCard}>
            <View
              style={[
                styles.statIconContainer,
                { backgroundColor: colors.orange[50] },
              ]}
            >
              <Ionicons
                name="star-outline"
                size={24}
                color={colors.orange[700]}
              />
            </View>
            <Text style={styles.statValue}>{team.skillLevel}</Text>
            <Text style={styles.statLabel}>실력</Text>
          </View>

          <View style={styles.statCard}>
            <View
              style={[
                styles.statIconContainer,
                { backgroundColor: colors.purple[50] },
              ]}
            >
              <Ionicons
                name="calendar-outline"
                size={24}
                color={colors.purple[700]}
              />
            </View>
            <Text style={styles.statValue}>
              {new Date(team.createdAt).getFullYear()}.
              {String(new Date(team.createdAt).getMonth() + 1).padStart(2, '0')}
            </Text>
            <Text style={styles.statLabel}>생성</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.recentMatchesButton}
          onPress={handleRecentMatches}
        >
          <View style={styles.recentMatchesButtonContent}>
            <Ionicons name="football-outline" size={20} color="white" />
            <Text style={styles.recentMatchesButtonText}>최근 경기 보기</Text>
            <Ionicons name="chevron-forward" size={16} color="white" />
          </View>
        </TouchableOpacity>
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
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    overflow: 'hidden',
  },
  headerGradient: {
    backgroundColor: colors.gray[400],
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
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray[500],
    fontWeight: '500',
  },

  recentMatchesButton: {
    backgroundColor: colors.blue[500],
    borderRadius: 16,
    marginTop: 16,
    shadowColor: colors.blue[300],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    opacity: 0.9,
  },
  recentMatchesButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 8,
  },
  recentMatchesButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
});
