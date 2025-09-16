import { memo } from 'react';
import { Image, Text, View } from 'react-native';

import { Card } from '@/src/components/card/card';
import { theme } from '@/src/theme';
import { HomeData } from '@/src/types/home';
import { UserProfile } from '@/src/types/profile';

import styles from '../../home_style';
import MatchStatusCard from '../matchstatus_card';

interface GreetingSectionProps {
  homeData: HomeData;
  userInfo: UserProfile;
}

export default memo(function GreetingSection({
  homeData,
  userInfo,
}: GreetingSectionProps) {
  return (
    <View style={styles.greetingSection}>
      <Text style={styles.greetingText}>
        {homeData?.user.name}님, 반갑습니다
      </Text>
      <Text style={styles.greetingSubtext}>
        편리해진 <Text style={styles.highlightText}>축구 매칭</Text>을
        이용해보세요
      </Text>

      <View style={styles.activityStatsContainer}>
        <View style={styles.statsHeader}>
          <Image
            source={require('@/assets/images/memo.png')}
            style={{ width: 32, height: 32 }}
          />
          <Text style={styles.statsTitle}>내 축구 활동</Text>
        </View>

        <Card style={styles.statsCard}>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {userInfo?.totalMatches || 0}
              </Text>
              <Text style={styles.statLabel}>총 경기</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.success }]}>
                {userInfo?.stats.wins || 0}
              </Text>
              <Text style={styles.statLabel}>승리</Text>
            </View>
            <View style={styles.statItem}>
              <Text
                style={[styles.statValue, { color: theme.colors.orange[500] }]}
              >
                {userInfo?.stats.draws || 0}
              </Text>
              <Text style={styles.statLabel}>무승부</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.colors.error }]}>
                {userInfo?.stats.losses || 0}
              </Text>
              <Text style={styles.statLabel}>패배</Text>
            </View>
          </View>

          <View style={styles.additionalStats}>
            <View style={styles.additionalStatItem}>
              <Text style={styles.footballIcon}>⚽</Text>
              <Text style={styles.additionalStatText}>
                {userInfo?.stats.goals || 0}G
              </Text>
            </View>
            <View style={styles.additionalStatItem}>
              <Text style={styles.footballIcon}>👟</Text>
              <Text style={styles.additionalStatText}>
                {userInfo?.stats.assists || 0}A
              </Text>
            </View>
            <View style={styles.additionalStatItem}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.additionalStatText}>
                주포지션: {userInfo?.stats.favoritePosition || '미설정'}
              </Text>
            </View>
          </View>
        </Card>
      </View>

      <MatchStatusCard homeData={homeData} />
    </View>
  );
});
