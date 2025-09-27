import { Platform } from 'react-native';

export const UI_CONSTANTS = {
  KEYBOARD_VERTICAL_OFFSET: Platform.OS === 'ios' ? 50 : 50,
} as const;
