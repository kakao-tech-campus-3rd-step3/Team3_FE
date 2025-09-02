/// <reference types="expo-constants" />

export type AppExtra = {
  apiBaseUrl: string;
  environment: 'development' | 'production' | 'test';
};

declare module 'expo-constants' {
  export interface ExpoConfig {
    extra: AppExtra;
  }
}
