import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import {
  getTeamManagementSettingsUrl,
  getTeamManagementRecentMatchesUrl,
} from '@/src/constants/routes';
import { colors } from '@/src/theme';
import type { TeamDetailResponse } from '@/src/types/team';

interface TeamInfoCardProps {
  team: TeamDetailResponse;
  canManageTeam: boolean;
  onExitTeam?: () => void;
  isTeamLeader?: boolean;
}

export default memo(function TeamInfoCard({
  team,
  canManageTeam,
  onExitTeam,
  isTeamLeader = false,
}: TeamInfoCardProps) {
  const { width } = useWindowDimensions();

  const dynamicStyles = StyleSheet.create({
    statCard: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.gray[50],
      borderRadius: Math.max(12, width * 0.04),
      padding: Math.max(8, width * 0.03),
      marginHorizontal: Math.max(2, width * 0.01),
    },
    statIconContainer: {
      width: Math.max(36, width * 0.12),
      height: Math.max(36, width * 0.12),
      borderRadius: Math.max(18, width * 0.06),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: Math.max(6, width * 0.02),
    },
    statValue: {
      fontSize: Math.max(10, width * 0.032),
      fontWeight: 'bold',
      color: colors.gray[900],
      marginBottom: Math.max(2, width * 0.005),
      textAlign: 'center',
    },
    statLabel: {
      fontSize: Math.max(9, width * 0.03),
      color: colors.gray[500],
      fontWeight: '500',
      textAlign: 'center',
    },
  });

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
          <View style={styles.headerButtonsContainer}>
            {onExitTeam && !isTeamLeader && (
              <TouchableOpacity
                style={styles.headerExitButton}
                onPress={onExitTeam}
              >
                <Ionicons
                  name="exit-outline"
                  size={16}
                  color={colors.orange[600]}
                />
                <Text
                  style={styles.headerExitButtonText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  팀 나가기
                </Text>
              </TouchableOpacity>
            )}
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
      </View>

      <View style={styles.mainContent}>
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionLabel}>팀 소개</Text>
          <Text style={styles.descriptionText}>{team.description}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={dynamicStyles.statCard}>
            <View
              style={[
                dynamicStyles.statIconContainer,
                { backgroundColor: colors.blue[50] },
              ]}
            >
              <Ionicons
                name="people-outline"
                size={24}
                color={colors.blue[700]}
              />
            </View>
            <Text
              style={dynamicStyles.statValue}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {team.memberCount}
            </Text>
            <Text style={dynamicStyles.statLabel}>멤버</Text>
          </View>

          <View style={dynamicStyles.statCard}>
            <View
              style={[
                dynamicStyles.statIconContainer,
                { backgroundColor: colors.orange[50] },
              ]}
            >
              <Ionicons
                name="star-outline"
                size={24}
                color={colors.orange[700]}
              />
            </View>
            <Text
              style={dynamicStyles.statValue}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {team.skillLevel}
            </Text>
            <Text style={dynamicStyles.statLabel}>실력</Text>
          </View>

          <View style={dynamicStyles.statCard}>
            <View
              style={[
                dynamicStyles.statIconContainer,
                { backgroundColor: colors.purple[50] },
              ]}
            >
              <Ionicons
                name="calendar-outline"
                size={24}
                color={colors.purple[700]}
              />
            </View>
            <Text
              style={dynamicStyles.statValue}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {new Date(team.createdAt).getFullYear()}.
              {String(new Date(team.createdAt).getMonth() + 1).padStart(2, '0')}
            </Text>
            <Text style={dynamicStyles.statLabel}>생성</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.recentMatchesButton}
          onPress={handleRecentMatches}
        >
          <View style={styles.recentMatchesButtonContent}>
            <Ionicons name="football-outline" size={20} color="white" />
            <Text
              style={styles.recentMatchesButtonText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              최근 경기 보기
            </Text>
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
    justifyContent: 'space-between',
  },
  teamTitleContainer: {
    flex: 1,
  },
  headerButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  headerExitButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerExitButtonText: {
    color: colors.orange[500],
    fontSize: 11,
    fontWeight: '500',
    flexShrink: 1,
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

  recentMatchesButton: {
    backgroundColor: colors.blue[500],
    borderRadius: 16,
    marginTop: 0,
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
    flexShrink: 1,
  },
});
