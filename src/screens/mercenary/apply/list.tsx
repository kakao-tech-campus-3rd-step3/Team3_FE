import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';

import { Card } from '@/src/components/card/card';
import { colors } from '@/src/theme/colors';
import { getDateOptions } from '@/src/utils/date';

import { styles } from './list_style';

export default function MercenaryFindScreen() {
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('all');
  const dateOptions = getDateOptions(new Date());

  const positions = [
    '골키퍼',
    '센터백',
    '풀백',
    '미드필더',
    '윙어',
    '스트라이커',
  ];

  const availableMatches = [
    {
      id: '1',
      teamName: '한림대 유나이티드',
      opponent: '강원대학교 축구팀',
      date: '2024-12-30',
      time: '14:00',
      location: '한림대학교 축구장',
      positions: ['미드필더', '윙어'],
      level: '세미프로',
      description: '경험이 풍부한 선수들을 찾고 있습니다.',
    },
    {
      id: '2',
      teamName: '성균관대 킹스',
      opponent: '고려대 타이거즈',
      date: '2024-12-28',
      time: '15:00',
      location: '성균관대학교 축구장',
      positions: ['스트라이커'],
      level: '프로',
      description: '공격적인 플레이를 선호하는 선수를 찾습니다.',
    },
    {
      id: '3',
      teamName: '연세대 라이온즈',
      opponent: '서울대 이글스',
      date: '2024-12-29',
      time: '16:00',
      location: '연세대학교 축구장',
      positions: ['골키퍼', '센터백'],
      level: '아마추어',
      description: '수비진을 보강하고 싶습니다.',
    },
  ];

  const handleApply = (matchId: string) => {
    Alert.alert('용병 신청', '이 매치에 용병으로 신청하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '신청',
        onPress: () => router.push(`/mercenary/apply?matchId=${matchId}`),
      },
    ]);
  };

  const filteredMatches = availableMatches.filter(match => {
    if (selectedPosition && !match.positions.includes(selectedPosition)) {
      return false;
    }
    if (selectedDate !== 'all' && match.date !== selectedDate) {
      return false;
    }
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.main} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>용병 찾기</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.dateFilterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateFilterContent}
        >
          <TouchableOpacity
            style={[
              styles.allViewButton,
              selectedDate === 'all' && styles.selectedAllViewButton,
            ]}
            onPress={() => setSelectedDate('all')}
          >
            <Text
              style={[
                styles.allViewButtonText,
                selectedDate === 'all' && styles.selectedAllViewButtonText,
              ]}
            >
              전체 보기
            </Text>
          </TouchableOpacity>

          {dateOptions.map(dateOption => (
            <TouchableOpacity
              key={dateOption.value}
              style={[
                styles.dateButton,
                selectedDate === dateOption.value && styles.selectedDateButton,
              ]}
              onPress={() => setSelectedDate(dateOption.value)}
            >
              <Text
                style={[
                  styles.dateButtonText,
                  selectedDate === dateOption.value &&
                    styles.selectedDateButtonText,
                ]}
              >
                {dateOption.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.filterSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedPosition === '' && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedPosition('')}
          >
            <Text
              style={[
                styles.filterText,
                selectedPosition === '' && styles.filterTextActive,
              ]}
            >
              전체
            </Text>
          </TouchableOpacity>
          {positions.map(position => (
            <TouchableOpacity
              key={position}
              style={[
                styles.filterButton,
                selectedPosition === position && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedPosition(position)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedPosition === position && styles.filterTextActive,
                ]}
              >
                {position}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {filteredMatches.length > 0 ? (
          filteredMatches.map(match => (
            <Card key={match.id} style={styles.matchCard}>
              <View style={styles.cardHeader}>
                <View style={styles.teamInfo}>
                  <Text style={styles.teamName}>{match.teamName}</Text>
                  <Text style={styles.opponent}>vs {match.opponent}</Text>
                </View>
                <View style={styles.levelBadge}>
                  <Text style={styles.levelText}>{match.level}</Text>
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
              </View>

              <View style={styles.positionsSection}>
                <Text style={styles.positionsLabel}>모집 포지션:</Text>
                <View style={styles.positionsContainer}>
                  {match.positions.map(position => (
                    <View key={position} style={styles.positionTag}>
                      <Text style={styles.positionText}>{position}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <Text style={styles.description}>{match.description}</Text>

              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => handleApply(match.id)}
              >
                <Text style={styles.applyButtonText}>용병 신청</Text>
              </TouchableOpacity>
            </Card>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>조건에 맞는 매치가 없습니다</Text>
            <Text style={styles.emptySubtitle}>다른 조건으로 검색해보세요</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
