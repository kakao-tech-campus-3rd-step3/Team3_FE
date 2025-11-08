import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

import Card from '@/src/components/card/card';
import { theme } from '@/src/theme';
import { MercenaryReview, MercenaryTeamReview } from '@/src/types/mercenary';

interface BaseReview {
  rating: number;
  punctualityReview: 'GOOD' | 'BAD';
  sportsmanshipReview: 'GOOD' | 'BAD';
  skillLevelReview: 'SIMILAR' | 'LOWER' | 'HIGHER';
}

type IconName = 'chatbubbles-outline' | 'people-outline' | 'refresh-outline';

interface ReviewsListProps<T extends BaseReview> {
  reviews: T[];
  isLoading?: boolean;
  emptyIconName?: IconName;
  emptyMessage?: string;
}

interface ReviewStat {
  label: string;
  good?: number;
  bad?: number;
  high?: number;
  similar?: number;
  low?: number;
}

export function ReviewsList<T extends BaseReview>({
  reviews,
  isLoading = false,
  emptyIconName = 'chatbubbles-outline',
  emptyMessage = '받은 리뷰가 없습니다.',
}: ReviewsListProps<T>) {
  const getScoreColor = (rating: number) => {
    if (rating >= 4) return theme.colors.success;
    if (rating >= 3) return theme.colors.warning;
    return theme.colors.error;
  };

  const getRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return Array.from({ length: 5 }, (_, index) => {
      if (index < fullStars) {
        return (
          <Ionicons
            key={index}
            name="star"
            size={16}
            color={theme.colors.warning}
          />
        );
      } else if (index === fullStars && hasHalfStar) {
        return (
          <Ionicons
            key={index}
            name="star-half"
            size={16}
            color={theme.colors.warning}
          />
        );
      } else {
        return (
          <Ionicons
            key={index}
            name="star-outline"
            size={16}
            color={theme.colors.text.sub + '40'}
          />
        );
      }
    });
  };

  const getReviewStats = (): { averageRating: number; stats: ReviewStat[] } => {
    if (reviews.length === 0) {
      return {
        averageRating: 0,
        stats: [
          { label: '시간 준수', good: 0, bad: 0 },
          { label: '매너', good: 0, bad: 0 },
          { label: '실력', high: 0, similar: 0, low: 0 },
        ],
      };
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    const stats = [
      {
        label: '시간 준수',
        good: reviews.filter(r => r.punctualityReview === 'GOOD').length,
        bad: reviews.filter(r => r.punctualityReview === 'BAD').length,
      },
      {
        label: '매너',
        good: reviews.filter(r => r.sportsmanshipReview === 'GOOD').length,
        bad: reviews.filter(r => r.sportsmanshipReview === 'BAD').length,
      },
      {
        label: '실력',
        high: reviews.filter(r => r.skillLevelReview === 'HIGHER').length,
        similar: reviews.filter(r => r.skillLevelReview === 'SIMILAR').length,
        low: reviews.filter(r => r.skillLevelReview === 'LOWER').length,
      },
    ];

    return { averageRating, stats };
  };

  const { averageRating, stats } = getReviewStats();

  const reviewItems = [
    {
      key: 'punctuality-good',
      label: '시간을 잘 지켜요',
      count: stats[0]?.good ?? 0,
    },
    {
      key: 'sportsmanship-good',
      label: '매너가 좋아요',
      count: stats[1]?.good ?? 0,
    },
    {
      key: 'skill-high',
      label: '실력이 더 뛰어나요',
      count: stats[2]?.high ?? 0,
    },
    {
      key: 'skill-similar',
      label: '실력이 비슷해요',
      count: stats[2]?.similar ?? 0,
    },
    {
      key: 'punctuality-bad',
      label: '시간 약속이 아쉬워요',
      count: stats[0]?.bad ?? 0,
    },
    {
      key: 'sportsmanship-bad',
      label: '매너가 아쉬워요',
      count: stats[1]?.bad ?? 0,
    },
    {
      key: 'skill-low',
      label: '실력이 기대보다 낮아요',
      count: stats[2]?.low ?? 0,
    },
  ].filter(item => item.count > 0);

  if (isLoading) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons
          name="refresh-outline"
          size={64}
          color={theme.colors.text.sub + '60'}
        />
        <Text style={styles.emptyText}>리뷰를 불러오는 중...</Text>
      </View>
    );
  }

  if (reviews.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons
          name={emptyIconName}
          size={64}
          color={theme.colors.text.sub + '60'}
        />
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.scoreCard}>
        <View style={styles.scoreContent}>
          <Text style={styles.scoreTitle}>매너 점수</Text>
          <View style={styles.scoreRight}>
            <Text
              style={[
                styles.scoreValue,
                { color: getScoreColor(averageRating) },
              ]}
            >
              {averageRating.toFixed(1)}
            </Text>
            <View style={styles.starsContainer}>
              {getRatingStars(averageRating)}
            </View>
            <Text style={styles.scoreSubtext}>
              총 {reviews.length}개의 후기 기반
            </Text>
          </View>
        </View>
      </Card>

      {reviewItems.length > 0 && (
        <Card style={styles.statsCard}>
          <Text style={styles.statsTitle}>받은 후기</Text>
          <View style={styles.statsList}>
            {reviewItems.map(item => (
              <View key={item.key} style={styles.statItem}>
                <Text style={styles.statLabel}>{item.label}</Text>
                <Text style={styles.statValue}>{item.count}회</Text>
              </View>
            ))}
          </View>
        </Card>
      )}
    </View>
  );
}

export const MercenaryReviewsList = ({
  reviews,
  isLoading,
}: {
  reviews: MercenaryReview[];
  isLoading?: boolean;
}) => (
  <ReviewsList
    reviews={reviews}
    isLoading={isLoading}
    emptyIconName="chatbubbles-outline"
    emptyMessage="받은 리뷰가 없습니다."
  />
);

export const TeamReviewsList = ({
  reviews,
  isLoading,
}: {
  reviews: MercenaryTeamReview[];
  isLoading?: boolean;
}) => (
  <ReviewsList
    reviews={reviews}
    isLoading={isLoading}
    emptyIconName="people-outline"
    emptyMessage="받은 팀 리뷰가 없습니다."
  />
);

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.spacing4,
  },
  scoreCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.spacing3,
    padding: theme.spacing.spacing4,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: theme.colors.border.light + '40',
  },
  scoreContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.main,
  },
  scoreRight: {
    alignItems: 'flex-end',
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.error,
    marginBottom: theme.spacing.spacing1,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: theme.spacing.spacing1,
  },
  scoreSubtext: {
    fontSize: 12,
    color: theme.colors.text.sub,
  },
  statsCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.spacing3,
    padding: theme.spacing.spacing4,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: theme.colors.border.light + '40',
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing3,
  },
  statsList: {
    gap: theme.spacing.spacing2,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: theme.colors.text.main,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text.sub,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.spacing12,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.sub,
    marginTop: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing2,
  },
});
