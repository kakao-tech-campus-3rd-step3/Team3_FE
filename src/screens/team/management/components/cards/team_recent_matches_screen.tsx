import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import GlobalErrorFallback from '@/src/components/ui/global_error_fallback';
import { useTeamMatches, useTeam } from '@/src/hooks/queries';
import { colors, spacing, typography, theme } from '@/src/theme';
import type { Match } from '@/src/types/match';
import { formatDate, formatTime } from '@/src/utils/date';

interface TeamRecentMatchesScreenProps {
  teamId: string;
}

export default memo(function TeamRecentMatchesScreen({
  teamId,
}: TeamRecentMatchesScreenProps) {
  const { data: matches, isLoading, error, refetch } = useTeamMatches(teamId);
  const { data: team } = useTeam(teamId);

  const getOpponentTeam = (match: Match, currentTeamId: number) => {
    return match.team1.teamId === currentTeamId ? match.team2 : match.team1;
  };

  const getResultIcon = (match: Match, currentTeamId: number) => {
    return {
      icon: 'football-outline' as const,
      color: colors.gray[500],
      text: '경기 완료',
    };
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.grass[500]} />
      </View>
    );
  }

  if (error) {
    return <GlobalErrorFallback error={error} resetError={() => refetch()} />;
  }

  const teamMatches = matches as { [key: string]: Match[] } | undefined;
  const currentTeamMatches = teamMatches?.[teamId] || [];

  if (!matches) {
    return (
      <View style={styles.container}>
        <Text>매치 정보를 불러오는 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader title="최근 경기" />

      <View style={styles.teamInfoSection}>
        <View style={styles.teamInfoCard}>
          <Ionicons
            name="football-outline"
            size={24}
            color={colors.green[600]}
          />
          <Text style={styles.teamName}>{team?.name || '팀 정보 없음'}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!currentTeamMatches || currentTeamMatches.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="football-outline"
              size={64}
              color={colors.gray[300]}
            />
            <Text style={styles.emptyStateTitle}>
              아직 경기 기록이 없습니다
            </Text>
            <Text style={styles.emptyStateText}>
              다른 팀과 경기를 하면 기록이 표시됩니다.
            </Text>
          </View>
        ) : (
          <View style={styles.matchesList}>
            {currentTeamMatches.map(match => {
              const opponent = getOpponentTeam(match, parseInt(teamId));
              const result = getResultIcon(match, parseInt(teamId));

              return (
                <View key={match.matchId} style={styles.matchCard}>
                  <View style={styles.matchHeader}>
                    <View style={styles.opponentInfo}>
                      <Text style={styles.opponentTeamName}>
                        {opponent.name}
                      </Text>
                      <Text style={styles.opponentUniversity}>
                        {opponent.university}
                      </Text>
                    </View>
                    <View style={styles.resultContainer}>
                      <Ionicons
                        name={result.icon}
                        size={20}
                        color={result.color}
                      />
                      <Text
                        style={[styles.resultText, { color: result.color }]}
                      >
                        {result.text}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.matchDetails}>
                    <View style={styles.matchInfo}>
                      <View style={styles.matchInfoItem}>
                        <Ionicons
                          name="calendar-outline"
                          size={16}
                          color={colors.gray[500]}
                        />
                        <Text style={styles.matchInfoText}>
                          {formatDate(match.matchDate)}
                        </Text>
                      </View>
                      <View style={styles.matchInfoItem}>
                        <Ionicons
                          name="time-outline"
                          size={16}
                          color={colors.gray[500]}
                        />
                        <Text style={styles.matchInfoText}>
                          {formatTime(match.matchTime)}
                        </Text>
                      </View>
                      <View style={styles.matchInfoItem}>
                        <Ionicons
                          name="location-outline"
                          size={16}
                          color={colors.gray[500]}
                        />
                        <Text style={styles.matchInfoText}>
                          {match.venue.name}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  teamInfoSection: {
    padding: spacing.spacing5,
  },
  teamInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.spacing4,
    borderRadius: spacing.spacing3,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    gap: spacing.spacing3,
  },
  teamName: {
    fontSize: typography.fontSize.font5,
    fontWeight: typography.fontWeight.bold,
    color: colors.gray[900],
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.spacing5,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.spacing15,
  },
  emptyStateTitle: {
    fontSize: typography.fontSize.font5,
    fontWeight: typography.fontWeight.bold,
    color: colors.gray[700],
    marginTop: spacing.spacing4,
    marginBottom: spacing.spacing2,
  },
  emptyStateText: {
    fontSize: typography.fontSize.font3,
    color: colors.gray[500],
    textAlign: 'center',
    lineHeight: typography.lineHeight.line5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.spacing15,
  },
  loadingText: {
    fontSize: typography.fontSize.font4,
    color: colors.gray[600],
    fontWeight: typography.fontWeight.medium,
  },
  matchesList: {
    gap: spacing.spacing4,
    paddingBottom: spacing.spacing5,
  },
  matchCard: {
    backgroundColor: colors.white,
    borderRadius: spacing.spacing4,
    padding: spacing.spacing5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.spacing4,
  },
  opponentInfo: {
    flex: 1,
  },
  opponentTeamName: {
    fontSize: typography.fontSize.font5,
    fontWeight: typography.fontWeight.bold,
    color: colors.gray[900],
    marginBottom: spacing.spacing1,
  },
  opponentUniversity: {
    fontSize: typography.fontSize.font3,
    color: colors.gray[500],
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing1,
  },
  resultText: {
    fontSize: typography.fontSize.font4,
    fontWeight: typography.fontWeight.bold,
  },
  matchDetails: {
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingTop: spacing.spacing4,
  },
  matchInfo: {
    gap: spacing.spacing3,
  },
  matchInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spacing2,
  },
  matchInfoText: {
    fontSize: typography.fontSize.font3,
    color: colors.gray[600],
    flex: 1,
  },
});
