import { memo, useMemo } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/src/components/card/card';
import styles from '@/src/screens/profile/profile_style';
import { getMannerScoreColor } from '@/src/utils/manner';

export default memo(function MannerCard({
  mannerScore,
  totalReviews,
  noShowCount,
}: {
  mannerScore: number;
  totalReviews: number;
  noShowCount: number;
}) {
  const color = getMannerScoreColor(noShowCount);
  const filled = Math.floor(mannerScore);
  const stars = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => (
        <Ionicons
          key={i}
          name={i < filled ? 'star' : 'star-outline'}
          size={16}
          color="#FFD700"
        />
      )),
    [filled]
  );
  return (
    <Card style={styles.mannerCard}>
      <View style={styles.mannerHeader}>
        <Text style={styles.sectionTitle}>매너 점수</Text>
        <View style={styles.mannerScoreContainer}>
          <Text style={[styles.mannerScore, { color }]}>{mannerScore}</Text>
          <View style={styles.starsContainer}>{stars}</View>
        </View>
      </View>
      <Text style={styles.reviewCount}>총 {totalReviews}개의 후기 기반</Text>
    </Card>
  );
});
