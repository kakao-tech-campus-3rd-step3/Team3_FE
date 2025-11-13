import { Alert } from 'react-native';

import { ApiError } from '@/src/lib/api_client';

export function handleApiError(error: unknown): void {
  if (error instanceof ApiError) {
    const errorMessage = error.message || error.detail;
    Alert.alert('오류', errorMessage);
  } else if (error instanceof Error) {
    Alert.alert('오류', error.message);
  } else {
    Alert.alert('오류', '처리 중 알 수 없는 오류가 발생했습니다.');
  }
}
