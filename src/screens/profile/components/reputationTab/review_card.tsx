import { memo } from 'react';
import { View, Text } from 'react-native';

import { Card } from '@/src/components/card/card';
import { Badge } from '@/src/screens/profile/components/badge/badge';
import styles from '@/src/screens/profile/profile_style';
import { ReviewType } from '@/src/types';

export default memo(function ReviewCard({
  reviews,
}: {
  reviews: ReviewType[];
}) {
  return (
    <Card style={styles.reviewsCard}>
      <Text style={styles.sectionTitle}>받은 후기</Text>
      <View style={styles.reviewsList}>
        {reviews.map((r, idx) => (
          <View key={`${r.label}-${idx}`} style={styles.reviewItem}>
            <View style={styles.reviewContent}>
              <Text style={styles.reviewLabel}>{r.label}</Text>
              <Badge text={`${r.count}회`} variant="secondary" size="small" />
            </View>
          </View>
        ))}
      </View>
    </Card>
  );
});
