import * as api from '@/src/api';
import type {
  RecruitmentCreateRequest,
  RecruitmentUpdateRequest,
} from '@/src/types';

export const mercenaryQueries = {
  mercenaryRecruitments: {
    key: (
      page: number = 0,
      size: number = 10,
      sort: string = 'matchDate,asc'
    ) => ['mercenaryRecruitments', page, size, sort] as const,
    fn: (page: number = 0, size: number = 10, sort: string = 'matchDate,asc') =>
      api.mercenaryApi.getMercenaryRecruitments(page, size, sort),
  },
  mercenaryRecruitment: {
    key: (id: number) => ['mercenaryRecruitment', id] as const,
    fn: (id: number) => api.mercenaryApi.getMercenaryRecruitmentById(id),
  },
  myMercenaryRecruitments: {
    key: (
      page: number = 0,
      size: number = 10,
      sort: string = 'matchDate,asc'
    ) => ['myMercenaryRecruitments', page, size, sort] as const,
    fn: (page: number = 0, size: number = 10, sort: string = 'matchDate,asc') =>
      api.mercenaryApi.getMyMercenaryRecruitments(page, size, sort),
  },
  createMercenaryRecruitment: {
    key: ['createMercenaryRecruitment'] as const,
    fn: (data: RecruitmentCreateRequest) =>
      api.createMercenaryRecruitment(data),
  },
  updateMercenaryRecruitment: {
    key: ['updateMercenaryRecruitment'] as const,
    fn: ({ id, data }: { id: number; data: RecruitmentUpdateRequest }) =>
      api.mercenaryApi.updateMercenaryRecruitment(id, data),
  },
  deleteMercenaryRecruitment: {
    key: ['deleteMercenaryRecruitment'] as const,
    fn: (id: number) => api.mercenaryApi.deleteMercenaryRecruitment(id),
  },
} as const;
