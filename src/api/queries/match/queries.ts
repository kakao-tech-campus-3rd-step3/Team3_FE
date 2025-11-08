import * as api from '@/src/api';
import type {
  MatchWaitingListRequestDto,
  MatchCreateRequestDto,
  MatchRequestRequestDto,
} from '@/src/types';

export const matchQueries = {
  recommendedMatch: {
    key: ['recommendedMatch'] as const,
    fn: () => api.recommendedMatchApi.getRecommendedMatch(),
  },
  teamMatchRequests: {
    key: ['teamMatchRequests'] as const,
    fn: async () => {
      const response = await api.teamMatchApi.getTeamMatchRequests();
      return response.content;
    },
  },
  myAppliedMatches: {
    key: ['my-applied-matches'] as const,
    fn: () => api.getMyAppliedMatches(),
  },
  myCreatedMatches: {
    key: ['my-created-matches'] as const,
    fn: () => api.getMyCreatedMatches(),
  },
  matchWaitingList: {
    key: (params: MatchWaitingListRequestDto) =>
      ['match-waiting-list', params] as const,
    fn: (params: MatchWaitingListRequestDto) => api.getMatchWaitingList(params),
  },
  venues: {
    key: ['venues'] as const,
    fn: () => api.getVenues(),
  },
  enemyTeam: {
    key: (matchId: number | string) => ['enemy-team', matchId] as const,
    fn: (matchId: number | string) => api.getEnemyTeam(matchId),
  },
  acceptMatchRequest: {
    key: ['acceptMatchRequest'] as const,
    fn: (requestId: number | string) => api.acceptMatchRequestApi(requestId),
  },
  rejectMatchRequest: {
    key: ['rejectMatchRequest'] as const,
    fn: (requestId: number | string) => api.rejectMatchRequestApi(requestId),
  },
  createMatch: {
    key: ['createMatch'] as const,
    fn: (payload: MatchCreateRequestDto) => api.createMatch(payload),
  },
  requestMatch: {
    key: ['requestMatch'] as const,
    fn: ({
      waitingId,
      payload,
    }: {
      waitingId: number | string;
      payload: MatchRequestRequestDto;
    }) => api.requestMatchApi(waitingId, payload),
  },
  cancelCreatedMatch: {
    key: ['cancelCreatedMatch'] as const,
    fn: (waitingId: number) => api.cancelCreatedMatchApi(waitingId),
  },
  cancelMatchRequest: {
    key: ['cancelMatchRequest'] as const,
    fn: (requestId: number | string) => api.cancelMatchRequestById(requestId),
  },
} as const;
