import Constants from 'expo-constants';

import type { AppExtra } from '@/src/types';

const getEnvVars = () => {
  const extra = Constants.expoConfig?.extra as AppExtra;

  if (!extra) {
    throw new Error('환경 설정을 찾을 수 없습니다.');
  }

  return {
    API_BASE_URL: extra.apiBaseUrl,
    ENVIRONMENT: extra.environment,
  };
};

export default getEnvVars();
