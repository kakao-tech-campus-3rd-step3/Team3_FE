import { fromZonedTime } from 'date-fns-tz';

import {
  TEAM_MATCH_API,
  MATCH_CREATE_API,
  MATCH_REQUEST_API,
  MATCH_WAITING_API,
} from '@/src/constants/endpoints';
import { apiClient } from '@/src/lib/api_client';
import {
  Match,
  MatchCreateRequestDto,
  MatchCreateResponseDto,
  MatchRequestRequestDto,
  MatchRequestResponseDto,
  MatchConfirmedResponseDto,
  RecentMatchResponse,
  MatchWaitingResponseDto,
  MatchWaitingListRequestDto,
  MatchWaitingCancelResponseDto,
  MatchWaitingHistoryResponseDto,
  EnemyTeamResponseDto,
} from '@/src/types/match';

export const teamMatchApi = {
  getTeamMatches: (teamId: string | number) => {
    return apiClient.get<{ [key: string]: Match[] }>(
      TEAM_MATCH_API.GET_TEAM_RECENT_MATCHES()
    );
  },
  getTeamRecentMatches: (status?: string) => {
    const url = status
      ? `${TEAM_MATCH_API.GET_TEAM_RECENT_MATCHES()}?status=${status}`
      : TEAM_MATCH_API.GET_TEAM_RECENT_MATCHES();
    return apiClient.get<RecentMatchResponse[]>(url);
  },
  getTeamMatchRequests: () => {
    return apiClient.get<{
      content: MatchRequestResponseDto[];
      pageable: any;
      totalElements: number;
      totalPages: number;
      first: boolean;
      last: boolean;
      size: number;
      number: number;
      numberOfElements: number;
      empty: boolean;
    }>(TEAM_MATCH_API.GET_TEAM_MATCH_REQUESTS());
  },
  updateMatchRequest: (
    teamId: string | number,
    requestId: string | number,
    status: 'APPROVED' | 'REJECTED',
    reason?: string
  ) => {
    return apiClient.patch<MatchRequestResponseDto>(
      TEAM_MATCH_API.UPDATE_MATCH_REQUEST(teamId, requestId),
      { status, reason }
    );
  },
};

export async function createMatch(
  payload: MatchCreateRequestDto
): Promise<MatchCreateResponseDto> {
  return apiClient.post<MatchCreateResponseDto>(
    MATCH_CREATE_API.CREATE,
    payload
  );
}

export async function requestMatchApi(
  waitingId: number | string,
  payload: MatchRequestRequestDto
): Promise<MatchRequestResponseDto> {
  return apiClient.post<MatchRequestResponseDto>(
    MATCH_REQUEST_API.MATCH_REQUEST(waitingId),
    payload
  );
}

export async function acceptMatchRequestApi(
  requestId: number | string
): Promise<MatchConfirmedResponseDto> {
  const url = MATCH_REQUEST_API.ACCEPT_REQUEST(requestId);
  return apiClient.patch<MatchConfirmedResponseDto>(url);
}

export async function rejectMatchRequestApi(
  requestId: number | string
): Promise<MatchRequestResponseDto> {
  const url = MATCH_REQUEST_API.REJECT_REQUEST(requestId);
  return apiClient.patch<MatchRequestResponseDto>(url);
}

export async function getMatchWaitingList(
  params: MatchWaitingListRequestDto
): Promise<MatchWaitingResponseDto[]> {
  console.log('🌐 [API] getMatchWaitingList 파라미터:', params);

  const queryParams = new URLSearchParams();
  queryParams.append('selectDate', params.selectDate);

  // DB에 UTC로 저장되어 있으므로 KST 시간을 UTC로 변환하여 전송
  if (params.startTime && params.startTime.trim() !== '') {
    // KST 시간을 UTC로 변환
    const kstTime = params.startTime;
    const [hours, minutes, seconds] = kstTime.split(':').map(Number);

    // KST에서 UTC로 변환 (KST = UTC + 9시간, 따라서 UTC = KST - 9시간)
    let utcHours = hours - 9;
    if (utcHours < 0) {
      utcHours += 24; // 음수가 되면 24시간을 더함
    }

    const utcTime = `${String(utcHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    queryParams.append('startTime', utcTime);
    console.log('🌍 [시간대 변환] KST:', kstTime, '→ UTC:', utcTime);
  } else {
    // 시간을 선택하지 않았을 때는 UTC 00:00:00 (KST 09:00:00)
    queryParams.append('startTime', '00:00:00');
    console.log('🌍 [시간대 변환] 시간 미선택 시 UTC 00:00:00 사용');
  }

  const url = `${MATCH_WAITING_API.GET_WAITING_LIST}?${queryParams.toString()}`;
  console.log('🌐 [API] 요청 URL:', url);

  // 디버깅을 위해 다른 시간들도 테스트해보기
  console.log('🔍 [디버깅] 다른 시간들로 테스트 요청:');
  const testTimes = [
    '00:00:00',
    '01:00:00',
    '12:00:00',
    '14:00:00',
    '15:00:00',
    '20:00:00',
  ];
  for (const testTime of testTimes) {
    const testUrl = `${MATCH_WAITING_API.GET_WAITING_LIST}?selectDate=${params.selectDate}&startTime=${testTime}`;
    console.log(`  테스트 URL: ${testUrl}`);
  }

  interface PageResponse {
    content: MatchWaitingResponseDto[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: any;
    size: number;
    sort: any;
  }

  try {
    const response = await apiClient.get<PageResponse>(url);
    console.log(
      '🌐 [API] 응답 데이터:',
      response.content?.length || 0,
      '개 매치'
    );
    console.log('🌐 [API] 전체 응답:', JSON.stringify(response, null, 2));

    if (response.content && response.content.length > 0) {
      console.log('🌐 [API] 매치 상세 정보:');
      response.content.forEach((match, index) => {
        console.log(`  매치 ${index + 1}:`, {
          preferredDate: match.preferredDate,
          preferredTimeStart: match.preferredTimeStart,
          preferredTimeEnd: match.preferredTimeEnd,
          teamName: match.teamName,
        });
      });
    }

    return response.content || [];
  } catch (error) {
    console.error('🌐 [API] getMatchWaitingList 에러:', error);
    throw error;
  }
}

export async function cancelMatchRequestApi(
  requestId: number | string
): Promise<MatchRequestResponseDto> {
  const url = MATCH_REQUEST_API.CANCEL_REQUEST(requestId);
  return apiClient.delete<MatchRequestResponseDto>(url);
}

export async function getMyCreatedMatches(): Promise<
  MatchWaitingResponseDto[]
> {
  try {
    const response = await apiClient.get<{
      content: MatchWaitingResponseDto[];
      empty: boolean;
      totalElements: number;
      totalPages: number;
      first: boolean;
      last: boolean;
    }>('/api/matches/waiting/me');

    return response.content || [];
  } catch (error) {
    console.error('getMyCreatedMatches API 에러:', error);
    throw error;
  }
}

export async function cancelCreatedMatchApi(
  waitingId: number | string
): Promise<MatchWaitingCancelResponseDto> {
  const url = MATCH_WAITING_API.CANCEL_WAITING(waitingId);
  return apiClient.patch<MatchWaitingCancelResponseDto>(url);
}

export async function getMyAppliedMatches(): Promise<
  MatchWaitingHistoryResponseDto[]
> {
  try {
    const response = await apiClient.get<{
      content: MatchWaitingHistoryResponseDto[];
      empty: boolean;
      totalElements: number;
      totalPages: number;
      first: boolean;
      last: boolean;
    }>(MATCH_REQUEST_API.GET_MY_APPLIED_MATCHES);

    return response.content || [];
  } catch (error) {
    console.error('getMyAppliedMatches API 에러:', error);
    throw error;
  }
}

export async function cancelMatchRequestById(
  requestId: number | string
): Promise<MatchRequestResponseDto> {
  try {
    const url = `${MATCH_REQUEST_API.CANCEL_REQUEST(requestId)}`;
    const response = await apiClient.delete<MatchRequestResponseDto>(url);
    return response;
  } catch (error) {
    console.error('cancelMatchRequestById API 에러:', error);
    throw error;
  }
}

export const getEnemyTeam = async (matchId: number | string) => {
  const response = await apiClient.get<EnemyTeamResponseDto>(
    MATCH_REQUEST_API.GET_ENEMY_TEAM(matchId)
  );
  return response;
};
