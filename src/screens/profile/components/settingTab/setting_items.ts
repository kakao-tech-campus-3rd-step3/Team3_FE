import { theme } from '@/src/theme';
import type { SettingItem } from '@/src/types';

export const defaultSettingsItems: SettingItem[] = [
  {
    key: 'notifications',
    label: '알림 설정',
    onPress: () => {},
    showChevron: true,
  },
  {
    key: 'edit-profile',
    label: '개인정보 수정',
    onPress: () => {},
    showChevron: true,
  },
  {
    key: 'logout',
    label: '로그아웃',
    color: theme.colors.error,
    onPress: () => {},
    showChevron: false,
  },
];
