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

  const handleSubmitReview = () => {
    if (
      rating === 0 ||
      !punctualityReview ||
      !sportsmanshipReview ||
      !skillLevelReview
    ) {
      Alert.alert('모든 항목을 작성해 주세요.');
      return;
    }

    Alert.alert('리뷰가 성공적으로 등록되었습니다.');
  };

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
        <Card title="⏰ 시간 엄수" subtitle="약속된 시간에 맞춰 도착했나요?">
          <View style={styles.optionRow}>
            <TouchableOpacity
              style={
                punctualityReview === 'GOOD'
                  ? styles.selectedButton
                  : styles.button
              }
              onPress={() => setPunctualityReview('GOOD')}
            >
              <Text
                style={[
                  styles.buttonText,
                  punctualityReview === 'GOOD' && styles.selectedButtonText,
                ]}
              >
                GOOD
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                punctualityReview === 'BAD'
                  ? styles.selectedButton
                  : styles.button
              }
              onPress={() => setPunctualityReview('BAD')}
            >
              <Text
                style={[
                  styles.buttonText,
                  punctualityReview === 'BAD' && styles.selectedButtonText,
                ]}
              >
                BAD
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* 🤝 매너 */}
        <Card title="🤝 매너" subtitle="상대팀의 스포츠맨십은 어땠나요?">
          <View style={styles.optionRow}>
            <TouchableOpacity
              style={
                sportsmanshipReview === 'GOOD'
                  ? styles.selectedButton
                  : styles.button
              }
              onPress={() => setSportsmanshipReview('GOOD')}
            >
              <Text
                style={[
                  styles.buttonText,
                  sportsmanshipReview === 'GOOD' && styles.selectedButtonText,
                ]}
              >
                GOOD
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                sportsmanshipReview === 'BAD'
                  ? styles.selectedButton
                  : styles.button
              }
              onPress={() => setSportsmanshipReview('BAD')}
            >
              <Text
                style={[
                  styles.buttonText,
                  sportsmanshipReview === 'BAD' && styles.selectedButtonText,
                ]}
              >
                BAD
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* 📊 실력 일치도 */}
        <Card
          title="📊 실력 일치도"
          subtitle="팀의 실제 실력은 표시된 수준과 비슷했나요?"
        >
          <View style={styles.optionRow}>
            <TouchableOpacity
              style={
                skillLevelReview === 'LOWER'
                  ? styles.selectedButton
                  : styles.button
              }
              onPress={() => setSkillLevelReview('LOWER')}
            >
              <Text
                style={[
                  styles.buttonText,
                  skillLevelReview === 'LOWER' && styles.selectedButtonText,
                ]}
              >
                LOWER
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                skillLevelReview === 'SIMILAR'
                  ? styles.selectedButton
                  : styles.button
              }
              onPress={() => setSkillLevelReview('SIMILAR')}
            >
              <Text
                style={[
                  styles.buttonText,
                  skillLevelReview === 'SIMILAR' && styles.selectedButtonText,
                ]}
              >
                SIMILAR
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                skillLevelReview === 'HIGHER'
                  ? styles.selectedButton
                  : styles.button
              }
              onPress={() => setSkillLevelReview('HIGHER')}
            >
              <Text
                style={[
                  styles.buttonText,
                  skillLevelReview === 'HIGHER' && styles.selectedButtonText,
                ]}
              >
                HIGHER
              </Text>
            </TouchableOpacity>
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
