import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { View, Text } from 'react-native';

import { Card } from '@/src/components/card/card';
import { theme } from '@/src/theme';

import styles from '../../profile_style';

export default memo(function NoShowCard({
  noShowCount,
}: {
  noShowCount: number;
}) {
  const isClean = noShowCount === 0;
  return (
    <Card
      level={isClean ? 0 : noShowCount >= 2 ? 2 : 1}
      style={styles.warningCard}
    >
      <View style={styles.warningHeader}>
        <Ionicons
          name={isClean ? 'checkmark-circle' : 'warning'}
          size={24}
          color={isClean ? theme.colors.success : theme.colors.error}
        />
        <Text
          style={[
            styles.warningTitle,
            isClean && { color: theme.colors.success },
          ]}
        >
          노쇼 기록
        </Text>
      </View>
      {isClean ? (
        <Text style={[styles.warningText, { color: theme.colors.text.sub }]}>
          노쇼 기록이 없습니다. 좋은 매너를 유지하고 있습니다!
        </Text>
      ) : (
        <>
          <Text style={styles.warningText}>
            총 {noShowCount}회의 노쇼가 신고되었습니다.
          </Text>
          <Text style={styles.warningSubtext}>
            노쇼 횟수가 많으면 매치 참여에 제한이 있을 수 있습니다.
          </Text>
        </>
      )}
    </Card>
  );
});
