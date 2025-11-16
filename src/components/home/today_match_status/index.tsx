import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

import { useTeamRecentMatches } from '@/src/hooks/queries';
import { theme } from '@/src/theme';
import { RecentMatchResponse } from '@/src/types/match';
import type { TeamDetailResponse } from '@/src/types/team';
import { formatDateForAPI, convertUTCToKSTTime } from '@/src/utils/timezone';

import { styles } from './styles';

interface TodayMatchStatusProps {
  teamId: number | null;
  team: TeamDetailResponse | null;
}

export default memo(function TodayMatchStatus({
  teamId,
  team,
}: TodayMatchStatusProps) {
  const { data: recentMatches = [], isLoading } = useTeamRecentMatches(
    'MATCHED',
    teamId
  );

  const today = new Date();
  const todayString = formatDateForAPI(today);

  const isMatchTodayAndNotExpired = (matchDate: string, matchTime?: string) => {
    const matchDateTime = new Date(matchDate);

    if (matchDateTime.toISOString().split('T')[0] !== todayString) {
      return false;
    }

    if (!matchTime) {
      return true;
    }

    const now = new Date();
    const kstNow = convertUTCToKSTTime(now.toISOString());
    const kstMatchTime = convertUTCToKSTTime(`${matchDate}T${matchTime}Z`);

    return kstNow < kstMatchTime;
  };

  const todayMatch = (recentMatches as RecentMatchResponse[]).find(
    (match: RecentMatchResponse) => {
      const matchDate = new Date(match.matchDate).toISOString().split('T')[0];
      return (
        isMatchTodayAndNotExpired(matchDate, match.matchTime) &&
        match.status === 'MATCHED'
      );
    }
  );

  const getOpponentTeamName = (match: RecentMatchResponse) => {
    if (!teamId || !team) return '상대팀';

    const currentTeamName = team.name || '';

    if (match.createTeamName === currentTeamName) {
      return match.requestTeamName || '상대팀';
    } else if (match.requestTeamName === currentTeamName) {
      return match.createTeamName || '상대팀';
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
              <Text style={styles.statusTitle}>오늘은 매치가 없습니다</Text>
              <Text style={styles.statusSubtitle}>
                새로운 매치를 찾아보세요
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
        <ActivityIndicator size="small" color={theme.colors.grass[500]} />
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
                {String(getOpponentTeamName(todayMatch))}과의 경기가 예정되어
                있습니다
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
