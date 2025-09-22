import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
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
import { MercenaryMatchView } from '@/src/types/mercenary';

import { styles } from './match_style';

export default function MercenaryMatchInfoScreen() {
  const { matchId } = useLocalSearchParams();
  const [matchInfo, setMatchInfo] = useState<MercenaryMatchView>({
    matchId: matchId as string,
    homeTeam: '한림대 유나이티드',
    awayTeam: '강원대학교 축구팀',
    mercenaryPosition: '미드필더',
    matchDetails: {
      date: '2024-12-30',
      time: '14:00',
      location: '한림대학교 축구장',
      status: 'scheduled',
    },
    canReview: false,
    reviewTarget: null,
    relationshipStatus: 'active',
  });

  useEffect(() => {
    const checkMatchTime = () => {
      const now = new Date();
      const matchDate = new Date(
        `${matchInfo.matchDetails.date} ${matchInfo.matchDetails.time}`
      );

      if (now >= matchDate && matchInfo.matchDetails.status === 'scheduled') {
        setMatchInfo(prev => ({
          ...prev,
          matchDetails: {
            ...prev.matchDetails,
            status: 'in_progress',
          },
        }));

        Alert.alert(
          '매치 시작',
          '매치 시간이 되었습니다! 매치가 자동으로 시작되었습니다.',
          [{ text: '확인' }]
        );
      }
    };

    const interval = setInterval(checkMatchTime, 60000);

    return () => clearInterval(interval);
  }, [
    matchInfo.matchDetails.date,
    matchInfo.matchDetails.time,
    matchInfo.matchDetails.status,
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return colors.info;
      case 'in_progress':
        return colors.warning;
      case 'completed':
        return colors.success;
      case 'cancelled':
        return colors.error;
      default:
        return colors.gray[500];
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled':
        return '예정됨';
      case 'in_progress':
        return '진행중';
      case 'completed':
        return '완료됨';
      case 'cancelled':
        return '취소됨';
      default:
        return '알 수 없음';
    }
  };

  const handleStartMatch = () => {
    Alert.alert('매치 시작', '매치를 시작하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '시작',
        onPress: () => {
          // 매치 상태를 in_progress로 변경
          Alert.alert('매치 시작', '매치가 시작되었습니다!');
        },
      },
    ]);
  };

  const handleCompleteMatch = () => {
    Alert.alert('매치 완료', '매치를 완료하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '완료',
        onPress: () => {
          // 매치 완료 후 자동으로 리뷰 화면으로 이동
          setTimeout(() => {
            router.push(`/review/team/${matchId}`);
          }, 1000); // 1초 후 자동 이동
        },
      },
    ]);
  };

  const handleLeaveMatch = () => {
    Alert.alert(
      '매치 관계 종료',
      '이 매치와의 관계를 종료하시겠습니까?\n\n종료 후에는 팀과의 연결이 끊어지고, 리뷰 작성이 불가능합니다.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '종료',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              '관계 종료 완료',
              '매치 관계가 종료되었습니다.\n팀과의 연결이 끊어졌습니다.',
              [
                {
                  text: '확인',
                  onPress: () => router.push('/mercenary/pending'),
                },
              ]
            );
          },
        },
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
        <Text style={styles.headerTitle}>매치 정보</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* 매치 상태 */}
        <Card style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusTitle}>매치 상태</Text>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: getStatusColor(
                    matchInfo.matchDetails.status
                  ),
                },
              ]}
            >
              <Text style={styles.statusText}>
                {getStatusText(matchInfo.matchDetails.status)}
              </Text>
            </View>
          </View>
        </Card>

        {/* 매치 정보 */}
        <Card style={styles.matchCard}>
          <Text style={styles.cardTitle}>매치 정보</Text>
          <View style={styles.matchInfo}>
            <View style={styles.matchRow}>
              <Text style={styles.matchLabel}>홈팀:</Text>
              <Text style={styles.matchValue}>{matchInfo.homeTeam}</Text>
            </View>
            <View style={styles.matchRow}>
              <Text style={styles.matchLabel}>어웨이팀:</Text>
              <Text style={styles.matchValue}>{matchInfo.awayTeam}</Text>
            </View>
            <View style={styles.matchRow}>
              <Text style={styles.matchLabel}>날짜:</Text>
              <Text style={styles.matchValue}>
                {matchInfo.matchDetails.date}
              </Text>
            </View>
            <View style={styles.matchRow}>
              <Text style={styles.matchLabel}>시간:</Text>
              <Text style={styles.matchValue}>
                {matchInfo.matchDetails.time}
              </Text>
            </View>
            <View style={styles.matchRow}>
              <Text style={styles.matchLabel}>장소:</Text>
              <Text style={styles.matchValue}>
                {matchInfo.matchDetails.location}
              </Text>
            </View>
            <View style={styles.matchRow}>
              <Text style={styles.matchLabel}>포지션:</Text>
              <Text style={styles.matchValue}>
                {matchInfo.mercenaryPosition}
              </Text>
            </View>
          </View>
        </Card>

        {/* 용병 역할 안내 */}
        <Card style={styles.roleCard}>
          <View style={styles.roleHeader}>
            <Ionicons name="information-circle" size={20} color={colors.info} />
            <Text style={styles.roleTitle}>용병 역할</Text>
          </View>
          <Text style={styles.roleText}>
            • {matchInfo.homeTeam}의 용병으로 참여합니다
          </Text>
          <Text style={styles.roleText}>
            • 매치 완료 후 {matchInfo.homeTeam}에 대한 리뷰만 작성 가능합니다
          </Text>
          <Text style={styles.roleText}>
            • 상대팀({matchInfo.awayTeam})에 대한 리뷰는 작성할 수 없습니다
          </Text>
          <Text style={styles.roleText}>
            • 매치 종료 후 관계가 자동으로 해제됩니다
          </Text>
        </Card>

        {/* 매치 시작 대기 카드 */}
        {matchInfo.matchDetails.status === 'scheduled' && (
          <Card style={styles.waitingCard}>
            <View style={styles.waitingHeader}>
              <Ionicons name="time-outline" size={20} color={colors.info} />
              <Text style={styles.waitingTitle}>매치 시작 대기중</Text>
            </View>
            <Text style={styles.waitingText}>
              매치 시간({matchInfo.matchDetails.time})이 되면 자동으로
              시작됩니다.
            </Text>
            <Text style={styles.waitingSubtext}>
              매치 시작 전까지 팀과 연락을 유지해주세요.
            </Text>
          </Card>
        )}

        {/* 액션 버튼들 */}
        <View style={styles.actionSection}>
          {matchInfo.matchDetails.status === 'in_progress' && (
            <TouchableOpacity
              style={styles.completeButton}
              onPress={handleCompleteMatch}
            >
              <Ionicons name="checkmark" size={20} color={colors.white} />
              <Text style={styles.buttonText}>매치 완료</Text>
            </TouchableOpacity>
          )}

          {matchInfo.matchDetails.status === 'completed' &&
            matchInfo.canReview && (
              <TouchableOpacity
                style={styles.reviewButton}
                onPress={() => router.push(`/review/team/${matchId}`)}
              >
                <Ionicons name="star" size={20} color={colors.white} />
                <Text style={styles.buttonText}>팀 리뷰 작성</Text>
              </TouchableOpacity>
            )}

          {matchInfo.relationshipStatus === 'active' && (
            <TouchableOpacity
              style={styles.leaveButton}
              onPress={handleLeaveMatch}
            >
              <Ionicons name="exit-outline" size={20} color={colors.white} />
              <Text style={styles.buttonText}>관계 종료</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* 관계 상태 */}
        <Card style={styles.relationshipCard}>
          <View style={styles.relationshipHeader}>
            <Ionicons name="link" size={20} color={colors.text.sub} />
            <Text style={styles.relationshipTitle}>관계 상태</Text>
          </View>
          <Text style={styles.relationshipText}>
            {matchInfo.relationshipStatus === 'active' &&
              `${matchInfo.homeTeam}과의 용병 관계가 활성화되어 있습니다.`}
            {matchInfo.relationshipStatus === 'completed' &&
              '매치가 완료되어 관계가 종료되었습니다.'}
            {matchInfo.relationshipStatus === 'terminated' &&
              '용병 관계가 종료되었습니다.'}
          </Text>
        </Card>
      </ScrollView>
    </View>
  );
}
