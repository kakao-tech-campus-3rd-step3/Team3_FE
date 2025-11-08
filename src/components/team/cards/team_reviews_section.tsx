import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { View, Text } from 'react-native';

import { styles } from '@/src/components/team/cards/team_reviews_section_styles';
import { colors } from '@/src/theme';
import type { TeamReview } from '@/src/types/review';
import { ReviewType } from '@/src/types/review';

interface TeamReviewsSectionProps {
  teamReviews: TeamReview[] | undefined;
  reviewsLoading: boolean;
}

export default memo(function TeamReviewsSection({
  teamReviews,
  reviewsLoading,
}: TeamReviewsSectionProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starRating = i;
      const isFilled = starRating <= Math.floor(rating);
      const isHalfFilled = starRating === Math.ceil(rating) && rating % 1 !== 0;

      stars.push(
        <Ionicons
          key={i}
          name={isFilled ? 'star' : isHalfFilled ? 'star-half' : 'star-outline'}
          size={14}
          color={
            isFilled || isHalfFilled ? colors.yellow[500] : colors.gray[300]
          }
        />
      );
    }
    return stars;
  };

  const getReviewTypeText = (reviewTypeKey: string) => {
    return (
      ReviewType[reviewTypeKey as keyof typeof ReviewType] || reviewTypeKey
    );
  };

  const getReviewSummary = () => {
    if (!Array.isArray(teamReviews) || teamReviews.length === 0) {
      return { averageRating: 0, reviewTypeCounts: {} };
    }

    const totalRating = teamReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating =
      Math.round((totalRating / teamReviews.length) * 10) / 10;

    const reviewTypeCounts: { [key: string]: number } = {};
    teamReviews.forEach(review => {
      review.reviewTypes.forEach(reviewType => {
        const koreanText = getReviewTypeText(reviewType);
        reviewTypeCounts[koreanText] = (reviewTypeCounts[koreanText] || 0) + 1;
      });
    });

    return { averageRating, reviewTypeCounts };
  };

  const { averageRating, reviewTypeCounts } = getReviewSummary();

  if (reviewsLoading) {
    return (
      <View style={styles.reviewsCard}>
        <Text style={styles.sectionTitle}>받은 후기</Text>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>리뷰 정보를 불러오는 중...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.reviewsCard}>
      <Text style={styles.sectionTitle}>받은 후기</Text>

      {!Array.isArray(teamReviews) || teamReviews.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>아직 받은 후기가 없습니다</Text>
          <Text style={styles.emptyStateText}>
            다른 팀과 경기를 하면 후기를 받을 수 있습니다.
          </Text>
        </View>
      ) : (
        <View style={styles.reviewsSummary}>
          <View style={styles.averageRatingContainer}>
            <View style={styles.averageRatingCard}>
              <View style={styles.averageRatingHeader}>
                <Ionicons name="star" size={20} color={colors.yellow[500]} />
                <Text style={styles.averageRatingLabel}>평균 별점</Text>
              </View>
              <View style={styles.averageRatingContent}>
                <View style={styles.starContainer}>
                  {renderStars(averageRating)}
                </View>
                <Text style={styles.averageRatingText}>{averageRating}</Text>
                <Text style={styles.averageRatingSubtext}>
                  ({Array.isArray(teamReviews) ? teamReviews.length : 0}개 후기)
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.reviewTypeSummary}>
            <View style={styles.reviewTypeSummaryHeader}>
              <Ionicons
                name="chatbubbles-outline"
                size={20}
                color={colors.blue[500]}
              />
              <Text style={styles.reviewTypeSummaryLabel}>후기 요약</Text>
            </View>
            <View style={styles.reviewTypeSummaryList}>
              {Object.entries(reviewTypeCounts)
                .sort(([, a], [, b]) => b - a)
                .map(([reviewType, count]) => (
                  <View key={reviewType} style={styles.reviewTypeSummaryItem}>
                    <View style={styles.reviewTypeSummaryContent}>
                      <Text style={styles.reviewTypeSummaryText}>
                        {reviewType}
                      </Text>
                      <View style={styles.reviewTypeCountBadge}>
                        <Text style={styles.reviewTypeCountText}>{count}</Text>
                      </View>
                    </View>
                  </View>
                ))}
            </View>
          </View>
        </View>
      )}
    </View>
  );
});
