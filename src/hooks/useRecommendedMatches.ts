import { useQuery } from '@tanstack/react-query';

import { getMatchWaitingList } from '@/src/api/match';
import { RecommendedMatch } from '@/src/types/home';
import { MatchWaitingResponseDto } from '@/src/types/match';

import { useUserProfile } from './queries';

const fetchWaitingMatches = async (): Promise<MatchWaitingResponseDto[]> => {
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  try {
    let result = await getMatchWaitingList({
      selectDate: todayString,
      startTime: '00:00:00',
    });

    if (result.length === 0) {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const tomorrowString = tomorrow.toISOString().split('T')[0];

      const tomorrowResult = await getMatchWaitingList({
        selectDate: tomorrowString,
        startTime: '00:00:00',
      });

      result = [...result, ...tomorrowResult];

      if (tomorrowResult.length === 0) {
        const dayAfterTomorrow = new Date(today);
        dayAfterTomorrow.setDate(today.getDate() + 2);
        const dayAfterTomorrowString = dayAfterTomorrow
          .toISOString()
          .split('T')[0];

        const dayAfterTomorrowResult = await getMatchWaitingList({
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
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(today.getDate() + 3);

  const upcomingMatches = matches.filter(match => {
    const matchDate = new Date(match.preferredDate);
    return matchDate >= today && matchDate <= threeDaysLater;
  });

  const shuffled = [...upcomingMatches].sort(() => 0.5 - Math.random());
  const selectedMatches = shuffled.slice(0, 1);

  return selectedMatches.map(transformToRecommendedMatch);
};

export const useRecommendedMatches = () => {
  const { data: userProfile } = useUserProfile();

  return useQuery({
    queryKey: ['recommendedMatches'],
    queryFn: fetchWaitingMatches,
    select: getRecommendedMatches,
    enabled: !!userProfile?.teamId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
