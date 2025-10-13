import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';

import { Card } from '@/src/components/card/card';
import { colors } from '@/src/theme/colors';

import { styles } from './pedding_style';

export default function MercenaryPendingScreen() {
  const [applications] = useState([
    {
      id: '1',
      teamName: '한림대 유나이티드',
      opponent: '강원대학교 축구팀',
      date: '2024-12-30',
      time: '14:00',
      location: '한림대학교 축구장',
      position: '미드필더',
      status: 'pending',
      appliedAt: '2024-12-27T10:30:00Z',
      message:
        '경험이 풍부한 미드필더입니다. 팀워크를 중시하며 열심히 뛰겠습니다.',
    },
    {
      id: '2',
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
      },
      opponentInfo: {
        captain: '박지훈',
        level: '아마추어',
        description: '전통의 명문 대학 축구팀입니다.',
      },
    },
    {
      id: '3',
      teamName: '연세대 이글스',
      opponent: '서울대 라이온즈',
      date: '2024-12-29',
      time: '16:00',
      location: '연세대학교 축구장',
      position: '수비수',
      status: 'rejected',
      appliedAt: '2024-12-25T11:45:00Z',
      rejectedAt: '2024-12-26T16:30:00Z',
      message: '안정적인 수비를 제공하겠습니다.',
    },
  ]);

  const statusConfig = {
    pending: {
      color: colors.warning,
      text: '승인 대기중',
    },
    approved: {
      color: colors.success,
      text: '승인됨',
    },
    rejected: {
      color: colors.error,
      text: '거절됨',
    },
  } as const;

  const getStatusInfo = (status: string) => {
    return (
      statusConfig[status as keyof typeof statusConfig] || {
        color: colors.gray[500],
        text: '알 수 없음',
      }
    );
  };

  const handleApplicationPress = (application: any) => {
    if (application.status === 'approved') {
      // 승인된 매치 상세 정보 화면으로 이동
      router.push({
        pathname: '/mercenary/approved-detail/[id]',
        params: { id: application.id },
      });
    } else if (application.status === 'rejected') {
      Alert.alert(
        '매치 거절됨',
        `${application.teamName}의 매치 신청이 거절되었습니다.`,
        [{ text: '확인' }]
      );
    }
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
        <Text style={styles.headerTitle}>용병 신청 현황</Text>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={() => Alert.alert('알림', '새로고침되었습니다.')}
        >
          <Ionicons name="refresh" size={24} color={colors.text.main} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {applications.length > 0 ? (
          applications.map(application => (
            <TouchableOpacity
              key={application.id}
              onPress={() => handleApplicationPress(application)}
            >
              <Card style={styles.applicationCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.teamInfo}>
                    <Text style={styles.teamName}>{application.teamName}</Text>
                    <Text style={styles.opponent}>
                      vs {application.opponent}
                    </Text>
                  </View>
                  {(() => {
                    const statusInfo = getStatusInfo(application.status);
                    return (
                      <View
                        style={[
                          styles.statusBadge,
                          { backgroundColor: statusInfo.color },
                        ]}
                      >
                        <Text style={styles.statusText}>{statusInfo.text}</Text>
                      </View>
                    );
                  })()}
                </View>

                <View style={styles.matchDetails}>
                  <View style={styles.detailRow}>
                    <Ionicons
                      name="calendar-outline"
                      size={16}
                      color={colors.text.sub}
                    />
                    <Text style={styles.detailText}>{application.date}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons
                      name="time-outline"
                      size={16}
                      color={colors.text.sub}
                    />
                    <Text style={styles.detailText}>{application.time}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons
                      name="location-outline"
                      size={16}
                      color={colors.text.sub}
                    />
                    <Text style={styles.detailText}>
                      {application.location}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons
                      name="football-outline"
                      size={16}
                      color={colors.text.sub}
                    />
                    <Text style={styles.detailText}>
                      {application.position}
                    </Text>
                  </View>
                </View>

                {application.message && (
                  <View style={styles.messageSection}>
                    <Text style={styles.messageLabel}>신청 메시지:</Text>
                    <Text style={styles.messageText}>
                      {application.message}
                    </Text>
                  </View>
                )}

                <View style={styles.footer}>
                  <Text style={styles.appliedAt}>
                    신청일:{' '}
                    {new Date(application.appliedAt).toLocaleString('ko-KR')}
                  </Text>
                  {application.status === 'pending' && (
                    <Text style={styles.waitingText}>
                      팀의 승인을 기다리고 있습니다...
                    </Text>
                  )}
                </View>
              </Card>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>⚽</Text>
            <Text style={styles.emptyTitle}>용병 신청이 없습니다</Text>
            <Text style={styles.emptySubtitle}>
              새로운 용병 기회를 찾아보세요
            </Text>
            <TouchableOpacity
              style={styles.findButton}
              onPress={() => router.push('/mercenary/find')}
            >
              <Text style={styles.findButtonText}>용병 찾기</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
