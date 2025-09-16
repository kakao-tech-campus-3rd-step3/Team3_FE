import { Image } from 'react-native';
import type { ReactNode } from 'react';

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
    backgroundColor: '#F0F8FF',
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
    backgroundColor: '#E8F5E8',
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
    backgroundColor: '#F0F8FF',
  },
];
