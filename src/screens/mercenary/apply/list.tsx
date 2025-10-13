import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '@/src/components/card/card';
import { theme } from '@/src/theme';
import { getDateOptions } from '@/src/utils/date';

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

  const renderMatchCard = ({ item }: { item: any }) => (
    <Card style={styles.matchCard}>
      <View style={styles.cardContent}>
        {/* 카드 헤더 */}
        <View style={styles.cardHeader}>
          <View style={styles.teamInfo}>
            <Text style={styles.teamName}>{item.teamName}</Text>
            <Text style={styles.opponent}>vs {item.opponent}</Text>
          </View>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{item.level}</Text>
          </View>
        </View>

        {/* 매치 정보 */}
        <View style={styles.matchDetails}>
          <View style={styles.detailRow}>
            <Ionicons
              name="calendar-outline"
              size={16}
              color={theme.colors.text.sub}
            />
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name="time-outline"
              size={16}
              color={theme.colors.text.sub}
            />
            <Text style={styles.detailText}>{item.time}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name="location-outline"
              size={16}
              color={theme.colors.text.sub}
            />
            <Text style={styles.detailText}>{item.location}</Text>
          </View>
        </View>

        {/* 포지션 섹션 */}
        <View style={styles.positionsSection}>
          <Text style={styles.positionsLabel}>모집 포지션:</Text>
          <View style={styles.positionsContainer}>
            {item.positions.map((position: string) => (
              <View key={position} style={styles.positionTag}>
                <Text style={styles.positionText}>{position}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 설명 */}
        <Text style={styles.description}>{item.description}</Text>

        {/* 신청 버튼 */}
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => handleApply(item.id)}
        >
          <Text style={styles.applyButtonText}>용병 신청</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={theme.colors.text.main}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>용병 찾기</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Date Filter */}
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

      {/* Position Filter */}
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

      {/* Matches List */}
      <FlatList
        data={filteredMatches}
        renderItem={renderMatchCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>조건에 맞는 매치가 없습니다</Text>
            <Text style={styles.emptySubtitle}>다른 조건으로 검색해보세요</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  dateFilterContainer: {
    backgroundColor: theme.colors.background.main,
    paddingVertical: theme.spacing.spacing2,
  },
  dateFilterContent: {
    paddingHorizontal: theme.spacing.spacing6,
    gap: theme.spacing.spacing2,
  },
  allViewButton: {
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing2,
    borderRadius: theme.spacing.spacing6,
    backgroundColor: theme.colors.background.sub,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  selectedAllViewButton: {
    backgroundColor: theme.colors.brand.main,
    borderColor: theme.colors.brand.main,
  },
  allViewButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text.sub,
  },
  selectedAllViewButtonText: {
    color: theme.colors.text.white,
  },
  dateButton: {
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing2,
    borderRadius: theme.spacing.spacing6,
    backgroundColor: theme.colors.background.sub,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  selectedDateButton: {
    backgroundColor: theme.colors.brand.main,
    borderColor: theme.colors.brand.main,
  },
  dateButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text.sub,
  },
  selectedDateButtonText: {
    color: theme.colors.text.white,
  },
  filterSection: {
    backgroundColor: theme.colors.background.main,
    paddingVertical: theme.spacing.spacing2,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  filterScroll: {
    paddingHorizontal: theme.spacing.spacing6,
  },
  filterButton: {
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing2,
    borderRadius: theme.spacing.spacing6,
    backgroundColor: theme.colors.background.sub,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    marginRight: theme.spacing.spacing2,
  },
  filterButtonActive: {
    backgroundColor: theme.colors.brand.main,
    borderColor: theme.colors.brand.main,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text.sub,
  },
  filterTextActive: {
    color: theme.colors.text.white,
  },
  listContainer: {
    padding: theme.spacing.spacing6,
  },
  matchCard: {
    marginBottom: theme.spacing.spacing4,
    backgroundColor: theme.colors.background.sub,
    borderRadius: theme.spacing.spacing4,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  cardContent: {
    padding: theme.spacing.spacing4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.spacing2,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing1,
  },
  opponent: {
    fontSize: 14,
    color: theme.colors.text.sub,
    fontWeight: '500',
  },
  levelBadge: {
    backgroundColor: theme.colors.brand.main + '20',
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing2,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.brand.main,
  },
  matchDetails: {
    marginBottom: theme.spacing.spacing2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing1,
  },
  detailText: {
    fontSize: 14,
    color: theme.colors.text.sub,
    marginLeft: theme.spacing.spacing2,
  },
  positionsSection: {
    marginBottom: theme.spacing.spacing2,
  },
  positionsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing1,
  },
  positionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.spacing1,
  },
  positionTag: {
    backgroundColor: theme.colors.brand.main + '10',
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing1,
    borderRadius: theme.spacing.spacing2,
    borderWidth: 1,
    borderColor: theme.colors.brand.main + '30',
  },
  positionText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.brand.main,
  },
  description: {
    fontSize: 14,
    color: theme.colors.text.sub,
    lineHeight: 20,
    marginBottom: theme.spacing.spacing4,
  },
  applyButton: {
    backgroundColor: theme.colors.brand.main,
    borderRadius: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing2,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.white,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.spacing8 * 2,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.spacing4,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing1,
  },
  emptySubtitle: {
    fontSize: 14,
    color: theme.colors.text.sub,
  },
});
