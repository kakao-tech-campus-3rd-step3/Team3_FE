import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import Card from '@/src/components/card/card';
import { CustomHeader } from '@/src/components/ui/custom_header';
import {
  useUserProfile,
  useCreateTeamReviewMutation,
} from '@/src/hooks/queries';
import { styles } from '@/src/screens/review/team_review/styles';
import { theme } from '@/src/theme';
import { TeamReviewRequest } from '@/src/types';

type GoodBad = 'GOOD' | 'BAD';
type Skill = 'LOWER' | 'SIMILAR' | 'HIGHER';

const isGoodBad = (v: unknown): v is GoodBad => v === 'GOOD' || v === 'BAD';
const isSkill = (v: unknown): v is Skill =>
  v === 'LOWER' || v === 'SIMILAR' || v === 'HIGHER';

export default function TeamReviewScreen() {
  const { matchId, reviewedTeamId } = useLocalSearchParams<{
    matchId: string;
    reviewedTeamId: string;
  }>();
  const { data: profile } = useUserProfile();
  const { mutate: createReview, isPending } = useCreateTeamReviewMutation();

  const [rating, setRating] = useState<number>(0);
  const [punctualityReview, setPunctualityReview] = useState<
    GoodBad | undefined
  >(undefined);
  const [sportsmanshipReview, setSportsmanshipReview] = useState<
    GoodBad | undefined
  >(undefined);
  const [skillLevelReview, setSkillLevelReview] = useState<Skill | undefined>(
    undefined
  );
  const [missingFields, setMissingFields] = useState<string[]>([]);

  const isMissing = (field: string) => missingFields.includes(field);

  const handleSubmitReview = () => {
    const missing: string[] = [];
    if (rating === 0) missing.push('rating');
    if (!punctualityReview) missing.push('punctualityReview');
    if (!sportsmanshipReview) missing.push('sportsmanshipReview');
    if (!skillLevelReview) missing.push('skillLevelReview');

    if (missing.length > 0) {
      setMissingFields(missing);
      Alert.alert('모든 항목을 작성해 주세요.');
      return;
    }

    if (!profile?.teamId || !matchId || !reviewedTeamId) {
      Alert.alert('필수 정보가 누락되었습니다.');
      return;
    }

    if (
      !isGoodBad(punctualityReview) ||
      !isGoodBad(sportsmanshipReview) ||
      !isSkill(skillLevelReview)
    ) {
      Alert.alert('입력값 형식이 올바르지 않습니다.');
      return;
    }

    const payload: TeamReviewRequest = {
      matchId: Number(matchId),
      reviewerTeamId: profile.teamId,
      reviewedTeamId: Number(reviewedTeamId),
      rating,
      punctualityReview,
      sportsmanshipReview,
      skillLevelReview,
    };

    createReview(payload, {
      onSuccess: () => {
        Alert.alert('리뷰가 등록되었습니다.');
        router.back();
      },
      onError: () => {
        Alert.alert('리뷰 등록 중 오류가 발생했습니다.');
      },
    });
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="상대팀 리뷰 작성" />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: theme.spacing.spacing10 }}
        showsVerticalScrollIndicator={false}
      >
        <Card
          title="⚡ 경기 종합 점수"
          subtitle="경기 전반적인 만족도를 평가해주세요."
          style={isMissing('rating') && styles.errorCard}
        >
          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map(value => (
              <TouchableOpacity key={value} onPress={() => setRating(value)}>
                <Ionicons
                  name={value <= rating ? 'star' : 'star-outline'}
                  size={34}
                  color={
                    value <= rating
                      ? theme.colors.yellow[500]
                      : theme.colors.gray[400]
                  }
                />
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card
          title="⏰ 시간 엄수"
          subtitle="약속된 시간에 맞춰 도착했나요?"
          style={isMissing('punctualityReview') && styles.errorCard}
        >
          <View style={styles.optionRow}>
            {(['GOOD', 'BAD'] as GoodBad[]).map(option => (
              <TouchableOpacity
                key={option}
                style={
                  punctualityReview === option
                    ? styles.selectedButton
                    : styles.button
                }
                onPress={() => setPunctualityReview(option)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    punctualityReview === option && styles.selectedButtonText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card
          title="🤝 매너"
          subtitle="상대팀의 스포츠맨십은 어땠나요?"
          style={isMissing('sportsmanshipReview') && styles.errorCard}
        >
          <View style={styles.optionRow}>
            {(['GOOD', 'BAD'] as GoodBad[]).map(option => (
              <TouchableOpacity
                key={option}
                style={
                  sportsmanshipReview === option
                    ? styles.selectedButton
                    : styles.button
                }
                onPress={() => setSportsmanshipReview(option)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    sportsmanshipReview === option && styles.selectedButtonText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card
          title="📊 실력 일치도"
          subtitle="팀의 실제 실력은 표시된 수준과 비슷했나요?"
          style={isMissing('skillLevelReview') && styles.errorCard}
        >
          <View style={styles.optionRow}>
            {(['LOWER', 'SIMILAR', 'HIGHER'] as Skill[]).map(option => (
              <TouchableOpacity
                key={option}
                style={
                  skillLevelReview === option
                    ? styles.selectedButton
                    : styles.button
                }
                onPress={() => setSkillLevelReview(option)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    skillLevelReview === option && styles.selectedButtonText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <TouchableOpacity
          style={[
            styles.submitButton,
            (isPending ||
              rating === 0 ||
              !punctualityReview ||
              !sportsmanshipReview ||
              !skillLevelReview) &&
              styles.submitButtonDisabled,
          ]}
          onPress={handleSubmitReview}
          disabled={isPending}
        >
          {isPending ? (
            <ActivityIndicator color={theme.colors.white} />
          ) : (
            <Text style={styles.submitButtonText}>리뷰 등록하기</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
