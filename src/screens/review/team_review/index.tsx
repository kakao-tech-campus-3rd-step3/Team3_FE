import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';

import Card from '@/src/components/card/card';
import { CustomHeader } from '@/src/components/ui/custom_header';
import { styles } from '@/src/screens/review/team_review/styles';
import { theme } from '@/src/theme';

export default function TeamReviewScreen() {
  const [rating, setRating] = useState<number>(0);
  const [punctualityReview, setPunctualityReview] = useState<string | null>(
    null
  );
  const [sportsmanshipReview, setSportsmanshipReview] = useState<string | null>(
    null
  );
  const [skillLevelReview, setSkillLevelReview] = useState<string | null>(null);
  const [missingFields, setMissingFields] = useState<string[]>([]); // 🚨 누락 항목 추적

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

    setMissingFields([]);
    Alert.alert('리뷰가 성공적으로 등록되었습니다.');
  };

  const isMissing = (field: string) => missingFields.includes(field);

  return (
    <View style={styles.container}>
      <CustomHeader title="상대팀 리뷰 작성" />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: theme.spacing.spacing10 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ⚡ 경기 종합 점수 */}
        <Card
          title="⚡ 경기 종합 점수"
          subtitle="경기 전반적인 만족도를 평가해주세요."
          style={isMissing('rating') && styles.errorCard} // 🚨 누락된 항목 빨간 표시
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

        {/* ⏰ 시간 엄수 */}
        <Card
          title="⏰ 시간 엄수"
          subtitle="약속된 시간에 맞춰 도착했나요?"
          style={isMissing('punctualityReview') && styles.errorCard}
        >
          <View style={styles.optionRow}>
            {['GOOD', 'BAD'].map(option => (
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

        {/* 🤝 매너 */}
        <Card
          title="🤝 매너"
          subtitle="상대팀의 스포츠맨십은 어땠나요?"
          style={isMissing('sportsmanshipReview') && styles.errorCard}
        >
          <View style={styles.optionRow}>
            {['GOOD', 'BAD'].map(option => (
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

        {/* 📊 실력 일치도 */}
        <Card
          title="📊 실력 일치도"
          subtitle="팀의 실제 실력은 표시된 수준과 비슷했나요?"
          style={isMissing('skillLevelReview') && styles.errorCard}
        >
          <View style={styles.optionRow}>
            {['LOWER', 'SIMILAR', 'HIGHER'].map(option => (
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

        {/* 리뷰 등록 버튼 */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitReview}
        >
          <Text style={styles.submitButtonText}>리뷰 등록하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
