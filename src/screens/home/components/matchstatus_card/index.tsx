import { memo } from 'react';
import { Text, View } from 'react-native';

import { styles } from '@/src/screens/home/home_style';
import { HomeData } from '@/src/types/home';

interface MatchStatusCardProps {
  homeData: HomeData;
}

export default memo(function MatchStatusCard({
  homeData,
}: MatchStatusCardProps) {
  return (
    <View style={styles.matchStatusCard}>
      {homeData.todayMatch.hasMatch ? (
        <View style={styles.matchScheduledContainer}>
          <View style={styles.matchScheduledText}>
            <Text style={styles.matchScheduledTitle}>
              축구 경기가 예정된 날입니다!
            </Text>
            <Text style={styles.matchScheduledSubtitle}>
              오늘 {homeData.todayMatch.matchInfo?.time}{' '}
              {homeData.todayMatch.matchInfo?.location}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.noMatchContainer}>
          <View style={styles.noMatchText}>
            <Text style={styles.noMatchTitle}>
              오늘 예정되어 있는 경기가 없습니다
            </Text>
            <Text style={styles.noMatchSubtitle}>매치를 생성해보세요!</Text>
          </View>
        </View>
      )}
    </View>
  );
});
