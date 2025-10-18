import { Ionicons } from '@expo/vector-icons';
import { memo, useMemo } from 'react';
import { View, Text } from 'react-native';

import Card from '@/src/components/card/card';
import { theme } from '@/src/theme';

import styles from '../../profile_style';

export default memo(function MannerCard({
  mannerScore,
  totalReviews,
  noShowCount,
}: {
  mannerScore: number;
  totalReviews: number;
  noShowCount: number;
}) {
  const stars = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => {
        const starIndex = i + 1;
        const isFilled = starIndex <= Math.floor(mannerScore);
        const isHalfFilled =
          starIndex === Math.ceil(mannerScore) && mannerScore % 1 !== 0;

        return (
          <Ionicons
            key={i}
            name={
              isFilled ? 'star' : isHalfFilled ? 'star-half' : 'star-outline'
            }
            size={16}
            color="#FFD700"
          />
        );
      }),
    [mannerScore]
  );
  return (
    <Card style={styles.mannerCard}>
      <View style={styles.mannerHeader}>
        <Text style={styles.sectionTitle}>매너 점수</Text>
        <View style={styles.mannerScoreContainer}>
          <Text
            style={[styles.mannerScore, { color: theme.colors.grass[500] }]}
          >
            {mannerScore}
          </Text>
          <View style={styles.starsContainer}>{stars}</View>
        </View>
      </View>
      <Text style={styles.reviewCount}>총 {totalReviews}개의 후기 기반</Text>
    </Card>
  );
});
