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

const LABELS = {
  GOOD: '좋음',
  BAD: '나쁨',
  LOWER: '약함',
  SIMILAR: '비슷함',
  HIGHER: '강함',
};

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

  const clearMissingField = (field: string) => {
    setMissingFields(prev => prev.filter(f => f !== field));
  };

  const handleSetRating = (value: number) => {
    setRating(value);
    clearMissingField('rating');
  };

  const handleSetPunctualityReview = (value: GoodBad) => {
    setPunctualityReview(value);
    clearMissingField('punctualityReview');
  };

  const handleSetSportsmanshipReview = (value: GoodBad) => {
    setSportsmanshipReview(value);
    clearMissingField('sportsmanshipReview');
  };

  const handleSetSkillLevelReview = (value: Skill) => {
    setSkillLevelReview(value);
    clearMissingField('skillLevelReview');
  };

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
        <View
          style={[styles.section, isMissing('rating') && styles.sectionError]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>경기 종합 점수</Text>
            <Text style={styles.sectionSubtitle}>
              경기 전반적인 만족도를 평가해주세요
            </Text>
          </View>
          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map(value => (
              <TouchableOpacity
                key={value}
                onPress={() => handleSetRating(value)}
                style={styles.starButton}
              >
                <Ionicons
                  name={value <= rating ? 'star' : 'star-outline'}
                  size={36}
                  color={
                    value <= rating
                      ? theme.colors.yellow[500]
                      : theme.colors.gray[300]
                  }
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View
          style={[
            styles.section,
            isMissing('punctualityReview') && styles.sectionError,
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>시간 엄수</Text>
            <Text style={styles.sectionSubtitle}>
              약속된 시간에 맞춰 도착했나요?
            </Text>
          </View>
          <View style={styles.optionRow}>
            {(['GOOD', 'BAD'] as GoodBad[]).map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  punctualityReview === option && styles.optionButtonSelected,
                ]}
                onPress={() => handleSetPunctualityReview(option)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    punctualityReview === option &&
                      styles.optionButtonTextSelected,
                  ]}
                >
                  {LABELS[option]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View
          style={[
            styles.section,
            isMissing('sportsmanshipReview') && styles.sectionError,
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>매너</Text>
            <Text style={styles.sectionSubtitle}>
              상대팀의 스포츠맨십은 어땠나요?
            </Text>
          </View>
          <View style={styles.optionRow}>
            {(['GOOD', 'BAD'] as GoodBad[]).map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  sportsmanshipReview === option && styles.optionButtonSelected,
                ]}
                onPress={() => handleSetSportsmanshipReview(option)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    sportsmanshipReview === option &&
                      styles.optionButtonTextSelected,
                  ]}
                >
                  {LABELS[option]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View
          style={[
            styles.section,
            isMissing('skillLevelReview') && styles.sectionError,
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>실력 일치도</Text>
            <Text style={styles.sectionSubtitle}>
              팀의 실제 실력은 표시된 수준과 비슷했나요?
            </Text>
          </View>
          <View style={styles.optionRow}>
            {(['LOWER', 'SIMILAR', 'HIGHER'] as Skill[]).map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  skillLevelReview === option && styles.optionButtonSelected,
                ]}
                onPress={() => handleSetSkillLevelReview(option)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    skillLevelReview === option &&
                      styles.optionButtonTextSelected,
                  ]}
                >
                  {LABELS[option]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

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
