import { router } from 'expo-router';
import { Alert } from 'react-native';

import {
  useTeamMatchRequests,
  useAcceptMatchRequestMutation,
  useRejectMatchRequestMutation,
} from '@/src/hooks/queries';
import type { MatchRequestResponseDto } from '@/src/types/match';
import { handleApiError } from '@/src/utils/handle_api_error';

export function useMatchRequests() {
  const { data: matchRequestsData, isLoading } = useTeamMatchRequests();

  const acceptMatchRequestMutation = useAcceptMatchRequestMutation();
  const rejectMatchRequestMutation = useRejectMatchRequestMutation();

  const handleMatchRequest = async (
    requestId: number,
    status: 'approved' | 'rejected'
  ) => {
    const action = status === 'approved' ? '수락' : '거절';

    Alert.alert(`매치 ${action}`, `이 매치 요청을 ${action}하시겠습니까?`, [
      { text: '취소', style: 'cancel' },
      {
        text: action,
        style: status === 'rejected' ? 'destructive' : 'default',
        onPress: () => {
          if (status === 'approved') {
            acceptMatchRequestMutation.mutate(requestId, {
              onSuccess: data => {
                const matchId = data?.matchId;
                if (matchId) {
                  Alert.alert('성공', '매치가 성사되었습니다!', [
                    {
                      text: '확인',
                      onPress: () => {
                        router.push(`/match_set?matchId=${matchId}`);
                      },
                    },
                  ]);
                }
              },
              onError: (error: unknown) => {
                handleApiError(error);
              },
            });
          } else {
            rejectMatchRequestMutation.mutate(requestId, {
              onSuccess: () => {
                Alert.alert('성공', `매치 요청을 ${action}했습니다.`);
              },
              onError: (error: unknown) => {
                handleApiError(error);
              },
            });
          }
        },
      },
    ]);
  };

  const matchRequests: MatchRequestResponseDto[] = matchRequestsData || [];

  return {
    matchRequests,
    isLoading,
    handleMatchRequest,
  };
}
