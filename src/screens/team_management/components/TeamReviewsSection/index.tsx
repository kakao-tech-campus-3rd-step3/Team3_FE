import { Ionicons } from '@expo/vector-icons';
import { memo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import type { TeamReview } from '@/src/types/review';

import { styles } from '../../team_management_styles';

interface TeamReviewsSectionProps {
  teamReviews: TeamReview[] | undefined;
  reviewsLoading: boolean;
}

export default memo(function TeamReviewsSection({
  teamReviews,
  reviewsLoading,
}: TeamReviewsSectionProps) {
  const [showAllReviews, setShowAllReviews] = useState(false);

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
      <View style={styles.reviewsList}>
        {(showAllReviews
          ? teamReviews || []
          : teamReviews?.slice(0, 3) || []
        ).map((review, idx) => (
          <View key={`${review.id}-${idx}`} style={styles.reviewItem}>
            <View style={styles.reviewContent}>
              <Text style={styles.reviewLabel}>
                {review.reviewerName} ({review.reviewerTeam})
              </Text>
              <Text style={styles.reviewCount}>{review.rating}점</Text>
            </View>
            <View style={styles.reviewTypesContainer}>
              {review.reviewTypes.map((reviewType, typeIdx) => (
                <View key={typeIdx} style={styles.reviewTypeBadge}>
                  <Text style={styles.reviewTypeText}>{reviewType}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.reviewDate}>
              {new Date(review.createdAt).toLocaleDateString('ko-KR')}
            </Text>
          </View>
        ))}

        {(!teamReviews || teamReviews.length === 0) && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>
              아직 받은 후기가 없습니다
            </Text>
            <Text style={styles.emptyStateText}>
              다른 팀과 경기를 하면 후기를 받을 수 있습니다.
            </Text>
          </View>
        )}

        {teamReviews && teamReviews.length > 3 && (
          <TouchableOpacity
            style={styles.showMoreButton}
            onPress={() => setShowAllReviews(!showAllReviews)}
          >
            <Text style={styles.showMoreText}>
              {showAllReviews ? '간단히 보기' : '전체 보기'}
            </Text>
            <Ionicons
              name={showAllReviews ? 'chevron-up' : 'chevron-down'}
              size={16}
              color="#475569"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});
