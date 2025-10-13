import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '@/src/components/card/card';
import { theme } from '@/src/theme';

export default function MercenaryApplyScreen() {
  const [selectedPosition, setSelectedPosition] = useState<string>('');

  const matchInfo = {
    teamName: '한림대 유나이티드',
    opponent: '강원대학교 축구팀',
    date: '2024-12-30',
    time: '14:00',
    location: '한림대학교 축구장',
    description: '친선 경기 - 용병 모집 중',
    maxMercenaries: 3,
    currentMercenaries: 1,
    skillLevel: '중급',
    matchType: '11vs11',
  };

  const positions = [
    '골키퍼',
    '센터백',
    '풀백',
    '미드필더',
    '윙어',
    '스트라이커',
  ];

  const handleApply = () => {
    if (!selectedPosition) {
      Alert.alert('알림', '포지션을 선택해주세요.');
      return;
    }

    Alert.alert(
      '용병 신청',
      `${matchInfo.teamName}에게 용병 신청을 보내시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '신청',
          onPress: () => {
            Alert.alert(
              '신청 완료',
              '용병 신청이 전송되었습니다.\n팀의 승인을 기다려주세요.'
            );
            router.push('/mercenary/pending');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={newStyles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={newStyles.header}>
        <TouchableOpacity
          style={newStyles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={theme.colors.text.main}
          />
        </TouchableOpacity>
        <Text style={newStyles.headerTitle}>용병 신청</Text>
        <View style={newStyles.placeholder} />
      </View>

      <ScrollView
        style={newStyles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={newStyles.scrollContent}
      >
        {/* 매치 정보 */}
        <Card style={newStyles.matchCard}>
          <Text style={newStyles.cardTitle}>매치 정보</Text>
          <View style={newStyles.matchInfo}>
            <View style={newStyles.matchRow}>
              <Text style={newStyles.matchLabel}>팀명:</Text>
              <Text style={newStyles.matchValue}>{matchInfo.teamName}</Text>
            </View>
            <View style={newStyles.matchRow}>
              <Text style={newStyles.matchLabel}>상대팀:</Text>
              <Text style={newStyles.matchValue}>{matchInfo.opponent}</Text>
            </View>
            <View style={newStyles.matchRow}>
              <Text style={newStyles.matchLabel}>날짜:</Text>
              <Text style={newStyles.matchValue}>{matchInfo.date}</Text>
            </View>
            <View style={newStyles.matchRow}>
              <Text style={newStyles.matchLabel}>시간:</Text>
              <Text style={newStyles.matchValue}>{matchInfo.time}</Text>
            </View>
            <View style={newStyles.matchRow}>
              <Text style={newStyles.matchLabel}>장소:</Text>
              <Text style={newStyles.matchValue}>{matchInfo.location}</Text>
            </View>
            <View style={newStyles.matchRow}>
              <Text style={newStyles.matchLabel}>경기 유형:</Text>
              <Text style={newStyles.matchValue}>{matchInfo.matchType}</Text>
            </View>
            <View style={newStyles.matchRow}>
              <Text style={newStyles.matchLabel}>실력 수준:</Text>
              <Text style={newStyles.matchValue}>{matchInfo.skillLevel}</Text>
            </View>
            <View style={newStyles.matchRow}>
              <Text style={newStyles.matchLabel}>용병 현황:</Text>
              <Text style={newStyles.matchValue}>
                {matchInfo.currentMercenaries}/{matchInfo.maxMercenaries}명
              </Text>
            </View>
          </View>
        </Card>

        {/* 포지션 선택 */}
        <Card style={newStyles.positionCard}>
          <Text style={newStyles.cardTitle}>희망 포지션</Text>
          <View style={newStyles.positionGrid}>
            {positions.map(position => (
              <TouchableOpacity
                key={position}
                style={[
                  newStyles.positionButton,
                  selectedPosition === position &&
                    newStyles.positionButtonSelected,
                ]}
                onPress={() => setSelectedPosition(position)}
              >
                <Text
                  style={[
                    newStyles.positionText,
                    selectedPosition === position &&
                      newStyles.positionTextSelected,
                  ]}
                >
                  {position}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* 메시지 입력 */}
        <Card style={newStyles.messageCard}>
          <Text style={newStyles.cardTitle}>팀에게 전할 메시지 (선택사항)</Text>
          <View style={newStyles.messageInput}>
            <Text style={newStyles.messagePlaceholder}>
              예: 경험이 풍부한 미드필더입니다. 팀워크를 중시하며 열심히
              뛰겠습니다.
            </Text>
          </View>
        </Card>

        {/* 신청 버튼 */}
        <TouchableOpacity style={newStyles.applyButton} onPress={handleApply}>
          <Text style={newStyles.applyButtonText}>용병 신청하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const newStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.spacing6,
    paddingVertical: theme.spacing.spacing4,
    backgroundColor: theme.colors.background.main,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.main,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.spacing6,
  },
  matchCard: {
    backgroundColor: theme.colors.background.sub,
    borderRadius: theme.spacing.spacing4,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    padding: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
  },
  matchInfo: {
    gap: theme.spacing.spacing2,
  },
  matchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  matchLabel: {
    fontSize: 14,
    color: theme.colors.text.sub,
    fontWeight: '500',
  },
  matchValue: {
    fontSize: 14,
    color: theme.colors.text.main,
    fontWeight: '600',
  },
  positionCard: {
    backgroundColor: theme.colors.background.sub,
    borderRadius: theme.spacing.spacing4,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    padding: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing4,
  },
  positionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.spacing2,
  },
  positionButton: {
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing2,
    borderRadius: theme.spacing.spacing6,
    backgroundColor: theme.colors.background.main,
    borderWidth: 1,
    borderColor: theme.colors.border.medium,
  },
  positionButtonSelected: {
    backgroundColor: theme.colors.brand.main,
    borderColor: theme.colors.brand.main,
  },
  positionText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text.sub,
  },
  positionTextSelected: {
    color: theme.colors.text.white,
  },
  messageCard: {
    backgroundColor: theme.colors.background.sub,
    borderRadius: theme.spacing.spacing4,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    padding: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing4,
  },
  messageInput: {
    backgroundColor: theme.colors.background.main,
    borderRadius: theme.spacing.spacing2,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    padding: theme.spacing.spacing4,
    minHeight: 100,
  },
  messagePlaceholder: {
    fontSize: 14,
    color: theme.colors.text.sub,
    lineHeight: 20,
  },
  applyButton: {
    backgroundColor: theme.colors.brand.main,
    borderRadius: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing4,
    alignItems: 'center',
    marginTop: theme.spacing.spacing4,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.white,
  },
});
