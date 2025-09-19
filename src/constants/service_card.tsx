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
    id: 'tournament',
    title: '토너먼트',
    subtitle: '토너먼트 신청',
    icon: '🏆',
    backgroundColor: colors.blue[50],
  },
  {
    id: 'mercenary',
    title: '용병',
    subtitle: '용병으로 참여',
    icon: (
      <Image
        source={require('@/assets/images/mercenary.png')}
        style={{ width: 28, height: 28 }}
      />
    ),
    backgroundColor: colors.grass[50],
  },
  {
    id: 'team',
    title: '팀 관리',
    subtitle: '팀 관리 서비스',
    icon: (
      <Image
        source={require('@/assets/images/team.png')}
        style={{ width: 28, height: 28 }}
      />
    ),
    backgroundColor: colors.blue[50],
  },
];
