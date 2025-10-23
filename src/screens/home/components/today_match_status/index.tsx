import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { Text, View } from 'react-native';

import {
  useMyAppliedMatches,
  useMyCreatedMatches,
  useTeamRecentMatches,
  useUserProfile,
  useTeam,
} from '@/src/hooks/queries';
import { styles } from '@/src/screens/home/components/today_match_status/styles';
import { theme } from '@/src/theme';
import { formatDateForAPI } from '@/src/utils/timezone';

interface TodayMatchStatusProps {
  teamId: number | null;
}

export default memo(function TodayMatchStatus({
  teamId,
}: TodayMatchStatusProps) {
  const { data: appliedMatches = [], isLoading: appliedLoading } =
    useMyAppliedMatches();
  const { data: createdMatches = [], isLoading: createdLoading } =
    useMyCreatedMatches();
  const { data: recentMatches = [], isLoading: recentLoading } =
    useTeamRecentMatches('MATCHED');
  const { data: userProfile } = useUserProfile();
  const { data: team } = useTeam(userProfile?.teamId || 0);

  const isLoading = appliedLoading || createdLoading || recentLoading;

  const today = new Date();
  const todayString = formatDateForAPI(today);

  const todayAppliedMatch = appliedMatches.find(match => {
    const matchDate = new Date(match.requestAt).toISOString().split('T')[0];
    return matchDate === todayString && match.status === 'APPROVED';
  });

  const todayCreatedMatch = createdMatches.find(match => {
    const matchDate = new Date(match.preferredDate).toISOString().split('T')[0];
    return matchDate === todayString && match.status === 'MATCHED';
  });

  const todayRecentMatch = recentMatches.find(match => {
    const matchDate = new Date(match.matchDate).toISOString().split('T')[0];
    return matchDate === todayString && match.status === 'MATCHED';
  });

  const todayMatch = todayRecentMatch || todayAppliedMatch || todayCreatedMatch;

  const getOpponentTeamName = (match: any) => {
    if (!userProfile?.teamId || !team) return '상대팀';

    const currentTeamName = team.name || '';

    if (match.team1Name === currentTeamName) {
      return match.team2Name;
    } else if (match.team2Name === currentTeamName) {
      return match.team1Name;
    }

    return '상대팀';
  };

  if (!teamId) {
    return (
      <View style={styles.container}>
        <View style={[styles.statusCard, styles.noTeamCard]}>
          <View style={styles.statusContent}>
            <Ionicons
              name="people-outline"
              size={24}
              color={theme.colors.gray[500]}
            />
            <View style={styles.statusText}>
              <Text style={styles.statusTitle}>팀에 가입해보세요</Text>
              <Text style={styles.statusSubtitle}>
                매치 정보를 확인하려면 팀에 가입해야 합니다
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={[styles.statusCard, styles.loadingCard]}>
          <View style={styles.statusContent}>
            <Ionicons
              name="time-outline"
              size={24}
              color={theme.colors.blue[500]}
            />
            <View style={styles.statusText}>
              <Text style={styles.statusTitle}>매치 정보 확인 중...</Text>
              <Text style={styles.statusSubtitle}>잠시만 기다려주세요</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  if (todayMatch) {
    return (
      <View style={styles.container}>
        <View style={[styles.statusCard, styles.matchScheduledCard]}>
          <View style={styles.statusContent}>
            <Ionicons name="time" size={24} color={theme.colors.green[500]} />
            <View style={styles.statusText}>
              <Text style={styles.statusTitle}>오늘 매치가 있습니다!</Text>
              <Text style={styles.statusSubtitle}>
                {todayRecentMatch
                  ? `${getOpponentTeamName(todayRecentMatch)} 경기가 예정되어 있습니다`
                  : todayAppliedMatch
                    ? `${
                        typeof todayAppliedMatch.targetTeamName === 'string'
                          ? todayAppliedMatch.targetTeamName
                          : todayAppliedMatch.targetTeamName.name
                      }과의 경기가 예정되어 있습니다`
                    : todayCreatedMatch
                      ? `상대팀과의 경기가 예정되어 있습니다`
                      : '경기가 예정되어 있습니다'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.statusCard, styles.noMatchCard]}>
        <View style={styles.statusContent}>
          <Ionicons
            name="calendar-outline"
            size={24}
            color={theme.colors.gray[500]}
          />
          <View style={styles.statusText}>
            <Text style={styles.statusTitle}>오늘은 매치가 없습니다</Text>
            <Text style={styles.statusSubtitle}>새로운 매치를 찾아보세요</Text>
          </View>
        </View>
      </View>
    </View>
  );
});
