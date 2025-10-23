import { Ionicons } from '@expo/vector-icons';
import { UseQueryOptions } from '@tanstack/react-query';
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
import {
  MatchWaitingHistoryResponseDto,
  MatchWaitingResponseDto,
  RecentMatchResponse,
} from '@/src/types/match';
import { formatDateForAPI, convertUTCToKSTTime } from '@/src/utils/timezone';

interface TodayMatchStatusProps {
  teamId: number | null;
}

export default memo(function TodayMatchStatus({
  teamId,
}: TodayMatchStatusProps) {
  const { data: userProfile } = useUserProfile();
  const { data: team } = useTeam(userProfile?.teamId || 0);

  const {
    data: appliedMatches = [],
    isLoading: appliedLoading,
    error: appliedError,
  } = useMyAppliedMatches({ enabled: !!teamId } as UseQueryOptions<
    MatchWaitingHistoryResponseDto[],
    Error
  >);
  const {
    data: createdMatches = [],
    isLoading: createdLoading,
    error: createdError,
  } = useMyCreatedMatches({ enabled: !!teamId } as UseQueryOptions<
    MatchWaitingResponseDto[],
    Error
  >);
  const {
    data: recentMatches = [],
    isLoading: recentLoading,
    error: recentError,
  } = useTeamRecentMatches('MATCHED', { enabled: !!teamId } as UseQueryOptions<
    RecentMatchResponse[],
    Error
  >);

  const isLoading = appliedLoading || createdLoading || recentLoading;
  const hasError = appliedError || createdError || recentError;

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

  const todayAppliedMatch = appliedMatches.find(
    (match: MatchWaitingHistoryResponseDto) => {
      const matchDate = new Date(match.requestAt).toISOString().split('T')[0];
      return (
        isMatchTodayAndNotExpired(matchDate) && match.status === 'APPROVED'
      );
    }
  );

  const todayCreatedMatch = createdMatches.find(
    (match: MatchWaitingResponseDto) => {
      const matchDate = new Date(match.preferredDate)
        .toISOString()
        .split('T')[0];
      return (
        isMatchTodayAndNotExpired(matchDate, match.preferredTimeEnd) &&
        match.status === 'MATCHED'
      );
    }
  );

  const todayRecentMatch = recentMatches.find((match: RecentMatchResponse) => {
    const matchDate = new Date(match.matchDate).toISOString().split('T')[0];
    return (
      isMatchTodayAndNotExpired(matchDate, match.matchTime) &&
      match.status === 'MATCHED'
    );
  });

  const todayMatch = todayRecentMatch || todayAppliedMatch || todayCreatedMatch;

  const getOpponentTeamName = (
    match:
      | MatchWaitingHistoryResponseDto
      | MatchWaitingResponseDto
      | RecentMatchResponse
  ) => {
    if (!userProfile?.teamId || !team) return '상대팀';

    const currentTeamName = team.name || '';

    if ('team1Name' in match && 'team2Name' in match) {
      if (match.team1Name === currentTeamName) {
        return match.team2Name || '상대팀';
      } else if (match.team2Name === currentTeamName) {
        return match.team1Name || '상대팀';
      }
    }

    if ('targetTeamName' in match) {
      if (typeof match.targetTeamName === 'string') {
        return match.targetTeamName;
      } else if (
        match.targetTeamName &&
        typeof match.targetTeamName === 'object' &&
        'name' in match.targetTeamName
      ) {
        return match.targetTeamName.name;
      }
    }

    if ('teamName' in match) {
      if (typeof match.teamName === 'string') {
        return match.teamName;
      } else if (
        match.teamName &&
        typeof match.teamName === 'object' &&
        'name' in match.teamName
      ) {
        return match.teamName.name;
      }
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

  if (hasError) {
    return (
      <View style={styles.container}>
        <View style={[styles.statusCard, styles.errorCard]}>
          <View style={styles.statusContent}>
            <Ionicons
              name="warning-outline"
              size={24}
              color={theme.colors.orange[500]}
            />
            <View style={styles.statusText}>
              <Text style={styles.statusTitle}>
                팀 정보를 확인할 수 없습니다
              </Text>
              <Text style={styles.statusSubtitle}>
                팀 멤버 정보를 다시 확인해주세요
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
