import { MERCENARY_API } from '@/src/constants/endpoints';
import { apiClient } from '@/src/lib/api_client';
import type {
  RecruitmentCreateRequest,
  RecruitmentResponse,
  RecruitmentListResponse,
  RecruitmentUpdateRequest,
} from '@/src/types';

export const getMercenaryRecruitments = async (
  page: number = 0,
  size: number = 10,
  sort: string = 'matchDate,asc'
): Promise<RecruitmentListResponse> => {
  const response = await apiClient.get<RecruitmentListResponse>(
    MERCENARY_API.GET_RECRUITMENTS,
    {
      params: { page, size, sort },
    }
  );
  return response;
};

export const getMercenaryRecruitmentById = async (
  id: number
): Promise<RecruitmentResponse> => {
  const response = await apiClient.get<RecruitmentResponse>(
    MERCENARY_API.GET_RECRUITMENT_BY_ID(id)
  );
  return response;
};

export const createMercenaryRecruitment = async (
  data: RecruitmentCreateRequest
): Promise<RecruitmentResponse> => {
  const response = await apiClient.post<RecruitmentResponse>(
    MERCENARY_API.CREATE_RECRUITMENT,
    data
  );
  return response;
};

export const updateMercenaryRecruitment = async (
  id: number,
  data: RecruitmentUpdateRequest
): Promise<RecruitmentResponse> => {
  const response = await apiClient.put<RecruitmentResponse>(
    MERCENARY_API.UPDATE_RECRUITMENT(id),
    data
  );
  return response;
};

export const deleteMercenaryRecruitment = async (id: number): Promise<void> => {
  await apiClient.delete(MERCENARY_API.DELETE_RECRUITMENT(id));
};

export const mercenaryApi = {
  getMercenaryRecruitments,
  getMercenaryRecruitmentById,
  createMercenaryRecruitment,
  updateMercenaryRecruitment,
  deleteMercenaryRecruitment,
};
