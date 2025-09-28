import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';

import { Card } from '@/src/components/card/card';
import { colors } from '@/src/theme/colors';

import { styles } from './mercenary_request_style';

export default function MercenaryApplyScreen() {
  const [selectedPosition, setSelectedPosition] = useState<string>('');

  const matchInfo = {
    teamName: '한림대 유나이티드',
    opponent: '강원대학교 축구팀',
    date: '2024-12-30',
    time: '14:00',
    location: '한림대학교 축구장',
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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.main} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>용병 신청</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.matchCard}>
          <Text style={styles.cardTitle}>매치 정보</Text>
          <View style={styles.matchInfo}>
            <View style={styles.matchRow}>
              <Text style={styles.matchLabel}>팀명:</Text>
              <Text style={styles.matchValue}>{matchInfo.teamName}</Text>
            </View>
            <View style={styles.matchRow}>
              <Text style={styles.matchLabel}>상대팀:</Text>
              <Text style={styles.matchValue}>{matchInfo.opponent}</Text>
            </View>
            <View style={styles.matchRow}>
              <Text style={styles.matchLabel}>날짜:</Text>
              <Text style={styles.matchValue}>{matchInfo.date}</Text>
            </View>
            <View style={styles.matchRow}>
              <Text style={styles.matchLabel}>시간:</Text>
              <Text style={styles.matchValue}>{matchInfo.time}</Text>
            </View>
            <View style={styles.matchRow}>
              <Text style={styles.matchLabel}>장소:</Text>
              <Text style={styles.matchValue}>{matchInfo.location}</Text>
            </View>
          </View>
        </Card>

        {/* 포지션 선택 */}
        <Card style={styles.positionCard}>
          <Text style={styles.cardTitle}>희망 포지션</Text>
          <View style={styles.positionGrid}>
            {positions.map(position => (
              <TouchableOpacity
                key={position}
                style={[
                  styles.positionButton,
                  selectedPosition === position &&
                    styles.positionButtonSelected,
                ]}
                onPress={() => setSelectedPosition(position)}
              >
                <Text
                  style={[
                    styles.positionText,
                    selectedPosition === position &&
                      styles.positionTextSelected,
                  ]}
                >
                  {position}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card style={styles.messageCard}>
          <Text style={styles.cardTitle}>팀에게 전할 메시지 (선택사항)</Text>
          <View style={styles.messageInput}>
            <Text style={styles.messagePlaceholder}>
              예: 경험이 풍부한 미드필더입니다. 팀워크를 중시하며 열심히
              뛰겠습니다.
            </Text>
          </View>
        </Card>

        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>용병 신청하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
