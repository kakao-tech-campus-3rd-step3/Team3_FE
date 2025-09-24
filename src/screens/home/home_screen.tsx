import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '@/src/theme';
import { HomeData } from '@/src/types/home';
import { UserProfile } from '@/src/types/profile';

import BenefitsSection from './components/benefit_section';
import EnvelopeSection from './components/envelope_section';
import GreetingSection from './components/greeting_section';
import HomeHeader from './components/home_header';
import RecommendedMatchCard from './components/recommended_match_card';
import styles from './home_style';

// 임시 데이터
const mockHomeData: HomeData = {
  user: {
    name: '김축구',
    teamLevel: '아마추어',
    preferredPositions: ['공격수', '미드필더'],
    teamId: 1,
  },
  todayMatch: {
    hasMatch: true,
    matchInfo: {
      time: '오후 2시',
      location: '강원대학교 운동장',
      type: 'team_match',
      opponent: '춘천교대',
      teamName: '강원대학교 축구팀',
    },
  },
};

const mockUserInfo: UserProfile = {
  id: '1',
  name: '김축구',
  email: 'kim@example.com',
  university: '강원대학교',
  major: '컴퓨터공학과',
  studentId: '2020123456',
  joinDate: '2024-01-01',
  level: '아마추어',
  totalMatches: 15,
  noShowCount: 0,
  mannerScore: 4.8,
  totalReviews: 12,
  bio: '열정적인 축구를 사랑하는 학생입니다!',
  phoneNumber: '010-1234-5678',
  recentReviews: [
    { type: 'good_play', count: 8, label: '실력 좋음' },
    { type: 'good_manner', count: 6, label: '매너 좋음' },
    { type: 'team_player', count: 5, label: '팀워크 좋음' },
    { type: 'punctual', count: 4, label: '시간 준수' },
    { type: 'bad_manner', count: 0, label: '매너 나쁨' },
  ],
  stats: {
    wins: 8,
    draws: 3,
    losses: 4,
    goals: 12,
    assists: 7,
    favoritePosition: '공격수',
  },
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <HomeHeader />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + theme.spacing.spacing10 },
        ]}
      >
        {/* 메인 환영 섹션 */}
        <View style={styles.mainSection}>
          <GreetingSection homeData={mockHomeData} userInfo={mockUserInfo} />
        </View>

        {/* 추천 매치 섹션 */}
        <View style={styles.matchSection}>
          <RecommendedMatchCard />
        </View>

        {/* 서비스 카드 섹션 */}
        <View style={styles.serviceSection}>
          <EnvelopeSection />
          <BenefitsSection homeData={mockHomeData} />
        </View>
      </ScrollView>
    </View>
  );
}
