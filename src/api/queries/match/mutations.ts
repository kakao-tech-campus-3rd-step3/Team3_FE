import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';

import { useAuth } from '@/src/contexts/auth_context';
import { queryClient } from '@/src/lib/query_client';
import type {
  MatchWaitingHistoryResponseDto,
  MatchWaitingResponseDto,
  MatchWaitingListRequestDto,
  EnemyTeamResponseDto,
  RecommendedMatch,
} from '@/src/types';
import { addDaysToDate, formatDateForAPI } from '@/src/utils/date';

import { useUserProfile } from '../profile/mutations';
import { profileQueries } from '../profile/queries';

import { matchQueries } from './queries';

export function useTeamMatchRequests() {
  const { token, isInitialized } = useAuth();

  return useQuery({
    queryKey: matchQueries.teamMatchRequests.key,
    queryFn: matchQueries.teamMatchRequests.fn,
    enabled: !!token && isInitialized,
  });
}

export function useRecommendedMatch() {
  return useQuery({
    queryKey: matchQueries.recommendedMatch.key,
    queryFn: matchQueries.recommendedMatch.fn,
  });
}

export function useMyAppliedMatches(
  options?: Partial<UseQueryOptions<MatchWaitingHistoryResponseDto[], Error>>
) {
  const { data: userProfile } = useUserProfile();

  return useQuery<MatchWaitingHistoryResponseDto[], Error>({
    queryKey: matchQueries.myAppliedMatches.key,
    queryFn: matchQueries.myAppliedMatches.fn,
    enabled: !!userProfile?.teamId,
    ...options,
  });
}

export function useMyCreatedMatches(
  options?: Partial<UseQueryOptions<MatchWaitingResponseDto[], Error>>
) {
  return useQuery<MatchWaitingResponseDto[], Error>({
    queryKey: matchQueries.myCreatedMatches.key,
    queryFn: matchQueries.myCreatedMatches.fn,
    ...options,
  });
}

export function useMatchWaitingList(
  params: MatchWaitingListRequestDto,
  options?: UseQueryOptions<MatchWaitingResponseDto[], Error>
) {
  return useQuery<MatchWaitingResponseDto[], Error>({
    queryKey: matchQueries.matchWaitingList.key(params),
    queryFn: () => matchQueries.matchWaitingList.fn(params),
    ...options,
  });
}

export function useVenues() {
  return useQuery({
    queryKey: matchQueries.venues.key,
    queryFn: matchQueries.venues.fn,
  });
}

export function useEnemyTeam(matchId: number | string | undefined) {
  return useQuery<EnemyTeamResponseDto>({
    queryKey: matchQueries.enemyTeam.key(matchId!),
    queryFn: () => matchQueries.enemyTeam.fn(matchId!),
    enabled: !!matchId,
  });
}

export function useMyMatchRequests() {
  const { token, isInitialized } = useAuth();

  return useQuery<MatchWaitingHistoryResponseDto[], Error>({
    queryKey: matchQueries.myAppliedMatches.key,
    queryFn: matchQueries.myAppliedMatches.fn,
    enabled: !!token && isInitialized,
  });
}

const fetchWaitingMatches = async (): Promise<MatchWaitingResponseDto[]> => {
  const today = new Date();
  const todayString = formatDateForAPI(today);

  try {
    let result = await matchQueries.matchWaitingList.fn({
      selectDate: todayString,
      startTime: '00:00:00',
    });

    if (result.length === 0) {
      const tomorrow = addDaysToDate(today, 1);
      const tomorrowString = formatDateForAPI(tomorrow);

      const tomorrowResult = await matchQueries.matchWaitingList.fn({
        selectDate: tomorrowString,
        startTime: '00:00:00',
      });

      result = [...result, ...tomorrowResult];

      if (tomorrowResult.length === 0) {
        const dayAfterTomorrow = addDaysToDate(today, 2);
        const dayAfterTomorrowString = formatDateForAPI(dayAfterTomorrow);

        const dayAfterTomorrowResult = await matchQueries.matchWaitingList.fn({
          selectDate: dayAfterTomorrowString,
          startTime: '00:00:00',
        });

        result = [...result, ...dayAfterTomorrowResult];
      }
    }

    return result;
  } catch (error) {
    console.error('[추천매치] API 호출 실패:', error);
    throw error;
  }
};

const transformToRecommendedMatch = (
  match: MatchWaitingResponseDto
): RecommendedMatch => {
  const teamName =
    typeof match.teamName === 'string' ? match.teamName : match.teamName.name;

  return {
    id: match.waitingId,
    teamName,
    university: '',
    skillLevel: `${match.skillLevelMin} - ${match.skillLevelMax}`,
    matchDate: match.preferredDate,
    location: `장소 ID: ${match.preferredVenueId}`,
  };
};

const getRecommendedMatches = (
  matches: MatchWaitingResponseDto[]
): RecommendedMatch[] => {
  const today = new Date();
  const threeDaysLater = addDaysToDate(today, 3);

  const upcomingMatches = matches.filter(match => {
    const matchDate = new Date(match.preferredDate);
    return matchDate >= today && matchDate <= threeDaysLater;
  });

  const shuffled = [...upcomingMatches].sort(() => 0.5 - Math.random());
  const selectedMatches = shuffled.slice(0, 1);

  return selectedMatches.map(transformToRecommendedMatch);
};

export function useRecommendedMatches() {
  const { data: userProfile } = useUserProfile();

  return useQuery({
    queryKey: ['recommendedMatches'],
    queryFn: fetchWaitingMatches,
    select: getRecommendedMatches,
    enabled: !!userProfile?.teamId,
  });
}

export function useAcceptMatchRequestMutation() {
  return useMutation({
    mutationFn: matchQueries.acceptMatchRequest.fn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: matchQueries.teamMatchRequests.key,
      });
      queryClient.invalidateQueries({
        queryKey: matchQueries.myAppliedMatches.key,
      });
    },
    onError: (error: unknown) => {
      console.error('매치 요청 승인 실패:', error);
    },
  });
}

export function useRejectMatchRequestMutation() {
  return useMutation({
    mutationFn: matchQueries.rejectMatchRequest.fn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: matchQueries.teamMatchRequests.key,
      });
    },
    onError: (error: unknown) => {
      console.error('매치 요청 거절 실패:', error);
    },
  });
}

export function useCreateMatchMutation() {
  return useMutation({
    mutationFn: matchQueries.createMatch.fn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: matchQueries.myCreatedMatches.key,
      });
    },
    onError: (error: unknown) => {
      console.error('매치 생성 실패:', error);
    },
  });
}

export function useMatchRequestMutation() {
  return useMutation({
    mutationFn: matchQueries.requestMatch.fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['match-waiting-list'] });
      queryClient.invalidateQueries({
        queryKey: matchQueries.myAppliedMatches.key,
      });
    },
    onError: (error: unknown) => {
      console.error('매치 요청 실패:', error);
    },
  });
}

export function useCancelMatchMutation() {
  return useMutation({
    mutationFn: matchQueries.cancelCreatedMatch.fn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: matchQueries.myCreatedMatches.key,
      });
      queryClient.invalidateQueries({
        queryKey: profileQueries.userProfile.key,
      });
    },
    onError: (error: unknown) => {
      console.error('매치 취소 실패:', error);
    },
  });
}

export function useCancelMatchRequestMutation() {
  return useMutation({
    mutationFn: matchQueries.cancelMatchRequest.fn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: matchQueries.myAppliedMatches.key,
      });
      queryClient.invalidateQueries({
        queryKey: profileQueries.userProfile.key,
      });
    },
    onError: (error: unknown) => {
      console.error('매치 요청 취소 실패:', error);
    },
  });
}
