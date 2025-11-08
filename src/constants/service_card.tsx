import type { ReactNode } from 'react';
import { Image } from 'react-native';

import { colors } from '@/src/theme';

export interface ServiceCard {
  id: string;
  title: string;
  subtitle: string;
  icon: string | ReactNode;
  backgroundColor: string;
}

export const serviceCards: ServiceCard[] = [
  {
    id: 'team',
    title: '팀 관리',
    subtitle: '팀 정보 및 관리',
    icon: (
      <Image
        source={require('@/assets/images/team.png')}
        style={{ width: 28, height: 28 }}
      />
    ),
    backgroundColor: colors.blue[50],
  },
  {
    id: 'mercenary',
    title: '용병',
    subtitle: '용병 모집 리스트',
    icon: (
      <Image
        source={require('@/assets/images/mercenary.png')}
        style={{ width: 28, height: 28 }}
      />
    ),
    backgroundColor: colors.orange[50],
  },
];
