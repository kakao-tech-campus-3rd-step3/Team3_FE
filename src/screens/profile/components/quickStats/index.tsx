import { memo } from 'react';
import { View, Text } from 'react-native';

import { UserProfile } from '@/src/types/profile';
import { getMannerScoreColor } from '@/src/utils/manner';

import styles from '../../profile_style';

export default memo(function QuickStats({ user }: { user: UserProfile }) {
  const color = getMannerScoreColor(user.noShowCount);
  return (
    <View style={styles.quickStats}>
      <View style={styles.quickStatItem}>
        <Text style={styles.quickStatValue}>{user.totalMatches}</Text>
        <Text style={styles.quickStatLabel}>총 경기</Text>
      </View>
      <View style={styles.quickStatItem}>
        <Text style={[styles.quickStatValue, { color }]}>
          {user.mannerScore}
        </Text>
        <Text style={styles.quickStatLabel}>매너 점수</Text>
      </View>
    </View>
  );
});
