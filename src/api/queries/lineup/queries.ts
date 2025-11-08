import * as api from '@/src/api';
import { CreateLineupRequest } from '@/src/types/lineup';

export const lineupQueries = {
  lineup: {
    key: (lineupId: number) => ['lineup', lineupId] as const,
    fn: (lineupId: number) => api.getLineupById(lineupId),
  },
  createLineups: {
    key: ['createLineups'] as const,
    fn: (data: CreateLineupRequest) => api.lineupApi.createLineups(data),
  },
} as const;
