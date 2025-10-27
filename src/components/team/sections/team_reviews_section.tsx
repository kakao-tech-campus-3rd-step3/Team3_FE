import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { getTeamReviews } from '@/src/api/mercenary';
import { TeamReviewsList } from '@/src/components/ui/reviews_list';
import { theme } from '@/src/theme';
import { MercenaryTeamReview } from '@/src/types/mercenary';

interface TeamReviewsSectionProps {
  teamId: number;
}

export default function TeamReviewsSection({
  teamId,
}: TeamReviewsSectionProps) {
  const [reviews, setReviews] = useState<MercenaryTeamReview[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const loadReviews = useCallback(async () => {
    setReviewsLoading(true);
    try {
      const reviewsData = await getTeamReviews(teamId);
      setReviews(reviewsData);
    } catch (error) {
      console.error('팀 리뷰 로드 실패:', error);
    } finally {
      setReviewsLoading(false);
    }
  }, [teamId]);

  useEffect(() => {
    if (reviews.length === 0) {
      loadReviews();
    }
  }, [reviews.length, loadReviews]);

  return (
    <View style={styles.reviewsSection}>
      <Text style={styles.sectionTitle}>팀 리뷰</Text>
      <TeamReviewsList reviews={reviews} isLoading={reviewsLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  reviewsSection: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.spacing4,
    padding: theme.spacing.spacing5,
    marginBottom: theme.spacing.spacing5,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing4,
  },
});
