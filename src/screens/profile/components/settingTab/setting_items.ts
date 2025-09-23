import { router } from 'expo-router';
import { Linking } from 'react-native';

import { EXTERNAL_LINKS } from '@/src/constants/external_links';
import { ROUTES } from '@/src/constants/routes';
import { theme } from '@/src/theme';
import type { SettingItem } from '@/src/types';

export const defaultSettingsItems: SettingItem[] = [
  {
    key: 'edit-profile',
    label: '개인정보 수정',
    onPress: () => router.push(ROUTES.EDIT_PROFILE),
    showChevron: true,
  },

  {
    key: 'privacy-policy',
    label: '개인정보 처리방침',
    onPress: () => Linking.openURL(EXTERNAL_LINKS.PRIVACY_POLICY),
    showChevron: true,
  },
  {
    key: 'terms-of-service',
    label: '서비스 이용약관',
    onPress: () => Linking.openURL(EXTERNAL_LINKS.TERMS_OF_SERVICE),
    showChevron: true,
  },
  {
    key: 'support',
    label: '고객 지원',
    onPress: () => router.push(ROUTES.SUPPORT),
    showChevron: true,
  },
  {
    key: 'data-deletion',
    label: '계정 탈퇴',
    onPress: () => router.push(ROUTES.DATA_DELETION),
    showChevron: true,
  },

  {
    key: 'app-version',
    label: '앱 버전',
    value: '1.0.0',
    showChevron: false,
  },

  {
    key: 'logout',
    label: '로그아웃',
    color: theme.colors.error,
    onPress: () => {},
    showChevron: false,
  },
];
