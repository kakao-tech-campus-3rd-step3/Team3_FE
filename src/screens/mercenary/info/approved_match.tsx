import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { Card } from '@/src/components/card/card';
import { colors } from '@/src/theme/colors';

import { styles } from './approved_match_style';

export default function ApprovedDetailScreen() {
  const { id } = useLocalSearchParams();

  // 승인된 매치 정보 (실제로는 API에서 가져와야 함)
  const approvedMatch = {
    id: id as string,
    teamName: '성균관대 킹스',
    opponent: '고려대 타이거즈',
    date: '2024-12-28',
    time: '15:00',
    location: '성균관대학교 축구장',
    position: '스트라이커',
    status: 'approved',
    appliedAt: '2024-12-26T14:20:00Z',
    approvedAt: '2024-12-27T09:15:00Z',
    message: '공격적인 플레이를 선호하며 골 결정력을 갖추고 있습니다.',
    teamInfo: {
      captain: '김민수',
      contact: '010-1234-5678',
      level: '세미프로',
      description: '열정적인 대학 축구팀입니다.',
      members: 11,
      formation: '4-4-2',
    },
    opponentInfo: {
      captain: '박지훈',
      level: '아마추어',
      description: '전통의 명문 대학 축구팀입니다.',
      members: 11,
      formation: '4-3-3',
    },
  };

  const handleStartMatch = () => {
    Alert.alert('매치 시작', '매치를 시작하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '시작',
        onPress: () => {
          router.push(`/mercenary/match-info/${id}`);
        },
      },
    ]);
  };

  const handleContactTeam = () => {
    Alert.alert(
      '팀 연락처',
      `팀장: ${approvedMatch.teamInfo.captain}\n연락처: ${approvedMatch.teamInfo.contact}`,
      [
        { text: '확인' },
        { text: '전화걸기', onPress: () => console.log('전화걸기') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.main} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>승인된 매치</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* 승인 상태 */}
        <Card style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusTitle}>승인 상태</Text>
            <View style={styles.approvedBadge}>
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={colors.white}
              />
              <Text style={styles.statusText}>승인됨</Text>
            </View>
          </View>
          <Text style={styles.approvedAt}>
            승인일: {new Date(approvedMatch.approvedAt).toLocaleString('ko-KR')}
          </Text>
        </Card>

        {/* 매치 정보 */}
        <Card style={styles.matchCard}>
          <Text style={styles.cardTitle}>매치 정보</Text>
          <View style={styles.matchInfo}>
            <View style={styles.matchRow}>
              <Text style={styles.matchLabel}>날짜:</Text>
              <Text style={styles.matchValue}>{approvedMatch.date}</Text>
            </View>
            <View style={styles.matchRow}>
              <Text style={styles.matchLabel}>시간:</Text>
              <Text style={styles.matchValue}>{approvedMatch.time}</Text>
            </View>
            <View style={styles.matchRow}>
              <Text style={styles.matchLabel}>장소:</Text>
              <Text style={styles.matchValue}>{approvedMatch.location}</Text>
            </View>
            <View style={styles.matchRow}>
              <Text style={styles.matchLabel}>포지션:</Text>
              <Text style={styles.matchValue}>{approvedMatch.position}</Text>
            </View>
          </View>
        </Card>

        {/* 신청한 팀 정보 */}
        <Card style={styles.teamCard}>
          <View style={styles.teamHeader}>
            <Ionicons name="people" size={20} color={colors.brand.main} />
            <Text style={styles.cardTitle}>신청한 팀 (성균관대 킹스)</Text>
          </View>
          <View style={styles.teamInfo}>
            <View style={styles.teamRow}>
              <Text style={styles.teamLabel}>팀장:</Text>
              <Text style={styles.teamValue}>
                {approvedMatch.teamInfo.captain}
              </Text>
            </View>
            <View style={styles.teamRow}>
              <Text style={styles.teamLabel}>연락처:</Text>
              <Text style={styles.teamValue}>
                {approvedMatch.teamInfo.contact}
              </Text>
            </View>
            <View style={styles.teamRow}>
              <Text style={styles.teamLabel}>수준:</Text>
              <Text style={styles.teamValue}>
                {approvedMatch.teamInfo.level}
              </Text>
            </View>
            <View style={styles.teamRow}>
              <Text style={styles.teamLabel}>팀원 수:</Text>
              <Text style={styles.teamValue}>
                {approvedMatch.teamInfo.members}명
              </Text>
            </View>
            <View style={styles.teamRow}>
              <Text style={styles.teamLabel}>포메이션:</Text>
              <Text style={styles.teamValue}>
                {approvedMatch.teamInfo.formation}
              </Text>
            </View>
            <View style={styles.teamDescription}>
              <Text style={styles.descriptionText}>
                {approvedMatch.teamInfo.description}
              </Text>
            </View>
          </View>
        </Card>

        {/* 상대팀 정보 */}
        <Card style={styles.opponentCard}>
          <View style={styles.teamHeader}>
            <Ionicons name="shield" size={20} color={colors.text.sub} />
            <Text style={styles.cardTitle}>상대팀 (고려대 타이거즈)</Text>
          </View>
          <View style={styles.teamInfo}>
            <View style={styles.teamRow}>
              <Text style={styles.teamLabel}>팀장:</Text>
              <Text style={styles.teamValue}>
                {approvedMatch.opponentInfo.captain}
              </Text>
            </View>
            <View style={styles.teamRow}>
              <Text style={styles.teamLabel}>수준:</Text>
              <Text style={styles.teamValue}>
                {approvedMatch.opponentInfo.level}
              </Text>
            </View>
            <View style={styles.teamRow}>
              <Text style={styles.teamLabel}>팀원 수:</Text>
              <Text style={styles.teamValue}>
                {approvedMatch.opponentInfo.members}명
              </Text>
            </View>
            <View style={styles.teamRow}>
              <Text style={styles.teamLabel}>포메이션:</Text>
              <Text style={styles.teamValue}>
                {approvedMatch.opponentInfo.formation}
              </Text>
            </View>
            <View style={styles.teamDescription}>
              <Text style={styles.descriptionText}>
                {approvedMatch.opponentInfo.description}
              </Text>
            </View>
          </View>
        </Card>

        {/* 신청 메시지 */}
        <Card style={styles.messageCard}>
          <View style={styles.messageHeader}>
            <Ionicons
              name="chatbubble-outline"
              size={20}
              color={colors.text.sub}
            />
            <Text style={styles.cardTitle}>신청 메시지</Text>
          </View>
          <Text style={styles.messageText}>{approvedMatch.message}</Text>
        </Card>

        {/* 매치 시작 대기 카드 */}
        <Card style={styles.waitingCard}>
          <View style={styles.waitingHeader}>
            <Ionicons name="time-outline" size={20} color={colors.info} />
            <Text style={styles.waitingTitle}>매치 시작 대기중</Text>
          </View>
          <Text style={styles.waitingText}>
            매치 시간({approvedMatch.time})이 되면 자동으로 시작됩니다.
          </Text>
          <Text style={styles.waitingSubtext}>
            매치 시작 전까지 팀과 연락을 유지해주세요.
          </Text>
        </Card>

        {/* 액션 버튼들 */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={handleContactTeam}
          >
            <Ionicons name="call" size={20} color={colors.brand.main} />
            <Text style={styles.contactButtonText}>팀 연락하기</Text>
          </TouchableOpacity>
        </View>

        {/* 안내 메시지 */}
        <Card style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Ionicons name="information-circle" size={20} color={colors.info} />
            <Text style={styles.infoTitle}>안내사항</Text>
          </View>
          <Text style={styles.infoText}>
            매치가 승인되었습니다! 매치 시작 전까지 팀과 연락을 유지하고, 매치
            당일 시간을 준수해주세요.
          </Text>
        </Card>
      </ScrollView>
    </View>
  );
}
