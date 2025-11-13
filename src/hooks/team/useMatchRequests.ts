import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import { matchQueries } from '@/src/api/queries/match/queries';
import {
  useTeamMatchRequests,
  useAcceptMatchRequestMutation,
  useRejectMatchRequestMutation,
} from '@/src/hooks/queries';
import { ApiError } from '@/src/lib/api_client';
import { queryClient } from '@/src/lib/query_client';
import type { MatchRequestResponseDto } from '@/src/types/match';

export function useMatchRequests() {
  const [processingRequestId, setProcessingRequestId] = useState<number | null>(
    null
  );

  const { data: matchRequestsData, isLoading, error } = useTeamMatchRequests();

  const acceptMatchRequestMutation = useAcceptMatchRequestMutation();
  const rejectMatchRequestMutation = useRejectMatchRequestMutation();

  const handleApiError = (error: unknown) => {
    if (error instanceof ApiError) {
      const errorMessage = error.message || error.detail;
      Alert.alert('오류', errorMessage);
    } else if (error instanceof Error) {
      Alert.alert('오류', error.message);
    }
  };

  useEffect(() => {
    if (acceptMatchRequestMutation.isSuccess) {
      const matchId = acceptMatchRequestMutation.data?.matchId;
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
      queryClient.invalidateQueries({
        queryKey: matchQueries.teamMatchRequests.key,
      });
    }
  }, [acceptMatchRequestMutation.isSuccess, acceptMatchRequestMutation.data]);

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
          setProcessingRequestId(requestId);
          if (status === 'approved') {
            acceptMatchRequestMutation.mutate(requestId, {
              onSuccess: () => {
                setProcessingRequestId(null);
                queryClient.invalidateQueries({
                  queryKey: matchQueries.teamMatchRequests.key,
                });
              },
              onError: (error: unknown) => {
                setProcessingRequestId(null);
                handleApiError(error);
              },
            });
          } else {
            rejectMatchRequestMutation.mutate(requestId, {
              onSuccess: () => {
                setProcessingRequestId(null);
                Alert.alert('성공', `매치 요청을 ${action}했습니다.`);
                queryClient.invalidateQueries({
                  queryKey: matchQueries.teamMatchRequests.key,
                });
              },
              onError: (error: unknown) => {
                setProcessingRequestId(null);
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
    error,
    processingRequestId,
    handleMatchRequest,
  };
}
