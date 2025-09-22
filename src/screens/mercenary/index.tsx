import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { Card } from '@/src/components/card/card';
import { CustomHeader } from '@/src/components/ui/custom_header';
import { colors } from '@/src/theme/colors';

import { styles } from './mercenary_style';

export default function MercenaryMainScreen() {
  const [activeMatches] = useState([
    {
      id: '1',
      teamName: '한림대 유나이티드',
      opponent: '강원대학교 축구팀',
      date: '2024-12-30',
      time: '14:00',
      location: '한림대학교 축구장',
      position: '미드필더',
      status: 'upcoming',
    },
    {
      id: '2',
      teamName: '성균관대 킹스',
      opponent: '고려대 타이거즈',
      date: '2024-12-28',
      time: '15:00',
      location: '성균관대학교 축구장',
      position: '스트라이커',
      status: 'in_progress',
    },
  ]);

  const [pendingApplications] = useState([
    {
      id: '1',
      teamName: '연세대 라이온즈',
      opponent: '서울대 이글스',
      date: '2024-12-29',
      time: '16:00',
      location: '연세대학교 축구장',
      position: '골키퍼',
      status: 'pending',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return colors.warning;
      case 'upcoming':
        return colors.info;
      case 'in_progress':
        return colors.warning;
      case 'completed':
        return colors.success;
      default:
        return colors.gray[500];
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '승인 대기';
      case 'upcoming':
        return '예정됨';
      case 'in_progress':
        return '진행중';
      case 'completed':
        return '완료됨';
      default:
        return '알 수 없음';
    }
  };

  const handleMatchPress = (match: any) => {
    if (match.status === 'pending') {
      router.push('/mercenary/pending');
    } else {
      router.push(`/mercenary/match-info/${match.id}`);
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="용병 서비스" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Card style={styles.introCard}>
          <View style={styles.introHeader}>
            <View style={styles.introIcon}>
              <Ionicons
                name="football-outline"
                size={32}
                color={colors.brand.main}
              />
            </View>
            <View style={styles.introContent}>
              <Text style={styles.introTitle}>용병으로 참여하세요</Text>
              <Text style={styles.introSubtitle}>
                팀의 부족한 포지션을 보완하고 새로운 경험을 쌓아보세요
              </Text>
            </View>
          </View>
        </Card>

        <TouchableOpacity
          style={styles.applyButton}
          activeOpacity={0.7}
          onPress={() => router.push('/mercenary/find')}
        >
          <View style={styles.applyButtonContent}>
            <Ionicons
              name="add-circle-outline"
              size={24}
              color={colors.white}
            />
            <Text style={styles.applyButtonText}>용병 매치 신청하기</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.statusButton}
          activeOpacity={0.7}
          onPress={() => router.push('/mercenary/pending')}
        >
          <View style={styles.statusButtonContent}>
            <View style={styles.statusIcon}>
              <Ionicons name="time-outline" size={24} color={colors.warning} />
            </View>
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusTitle}>신청 현황</Text>
              <Text style={styles.statusSubtitle}>
                용병 신청 내역 및 상태 확인
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.text.sub}
            />
          </View>
        </TouchableOpacity>

        {/* 승인된 매치 */}
        {activeMatches.length > 0 && (
          <View style={styles.matchesSection}>
            <Text style={styles.sectionTitle}>승인된 매치</Text>
            {activeMatches.map(match => (
              <TouchableOpacity
                key={match.id}
                activeOpacity={0.7}
                onPress={() => handleMatchPress(match)}
              >
                <Card style={styles.matchCard}>
                  <View style={styles.matchHeader}>
                    <View style={styles.matchInfo}>
                      <Text style={styles.matchTitle}>{match.teamName}</Text>
                      <Text style={styles.matchOpponent}>
                        vs {match.opponent}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusColor(match.status) },
                      ]}
                    >
                      <Text style={styles.statusText}>
                        {getStatusText(match.status)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.matchDetails}>
                    <View style={styles.detailRow}>
                      <Ionicons
                        name="calendar-outline"
                        size={16}
                        color={colors.text.sub}
                      />
                      <Text style={styles.detailText}>{match.date}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Ionicons
                        name="time-outline"
                        size={16}
                        color={colors.text.sub}
                      />
                      <Text style={styles.detailText}>{match.time}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Ionicons
                        name="location-outline"
                        size={16}
                        color={colors.text.sub}
                      />
                      <Text style={styles.detailText}>{match.location}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Ionicons
                        name="football-outline"
                        size={16}
                        color={colors.text.sub}
                      />
                      <Text style={styles.detailText}>{match.position}</Text>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Card style={styles.guideCard}>
          <View style={styles.guideHeader}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={colors.info}
            />
            <Text style={styles.guideTitle}>용병이란?</Text>
          </View>
          <View style={styles.guideContent}>
            <Text style={styles.guideText}>
              특정 매치에만 참여하는 임시 선수입니다. 매치 완료 후 팀에 대한
              리뷰만 작성 가능하며, 매치 종료 후 관계가 자동으로 해제됩니다.
            </Text>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
