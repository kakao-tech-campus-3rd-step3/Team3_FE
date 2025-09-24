import React, { useRef, useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';

import { theme } from '@/src/theme';
import { RecommendedMatch } from '@/src/types/home';

import { styles } from './styles';

interface SafeMatchPreviewProps {
  onMatchPress?: (matchId: number) => void;
}

const CARD_WIDTH = 150 + theme.spacing.spacing2;

// 추천 매치 데이터 (빈 배열로 설정하여 빈 상태 테스트)
const mockRecommendedMatches: RecommendedMatch[] = [];

export default function SafeMatchPreview({
  onMatchPress,
}: SafeMatchPreviewProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const scrollOffset = useRef(0);
  const userInteracting = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const matches = useMemo(() => mockRecommendedMatches, []);

  const extendedMatches = useMemo(
    () => (matches.length > 1 ? [...matches, ...matches, ...matches] : matches),
    [matches]
  );

  const middleIndex = matches.length;
  const middleOffset = middleIndex * CARD_WIDTH;

  useEffect(() => {
    if (extendedMatches.length > 1) {
      setTimeout(() => {
        scrollOffset.current = middleOffset;
        flatListRef.current?.scrollToOffset({
          offset: middleOffset,
          animated: false,
        });
      }, 100);
    }
  }, [extendedMatches, middleOffset]);

  useEffect(() => {
    if (extendedMatches.length <= 1) return;

    const startAutoScroll = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        if (userInteracting.current) return;

        scrollOffset.current += CARD_WIDTH;

        const maxOffset = extendedMatches.length * CARD_WIDTH;
        if (scrollOffset.current >= maxOffset - CARD_WIDTH) {
          scrollOffset.current = middleOffset;
          flatListRef.current?.scrollToOffset({
            offset: scrollOffset.current,
            animated: false,
          });
        } else {
          flatListRef.current?.scrollToOffset({
            offset: scrollOffset.current,
            animated: true,
          });
        }
      }, 3000);
    };

    startAutoScroll();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [extendedMatches, middleOffset]);

  const renderPreviewCard = (match: any, index: number) => (
    <TouchableOpacity
      key={`${match.id}-${index}`}
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => onMatchPress?.(match.id)}
    >
      <View>
        <Text style={styles.location} numberOfLines={1}>
          {match.location}
        </Text>
        <Text style={styles.time}>{match.time}</Text>
      </View>
      <View style={styles.metaRow}>
        <View style={[styles.smallBadge, badgeBg(match.level)]}>
          <Text style={[styles.smallBadgeText, badgeTextColor(match.level)]}>
            {match.level}
          </Text>
        </View>
        <Text style={styles.playerCountSmall}>
          {match.currentPlayers}/{match.totalPlayers}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderFullItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.fullItem}
      onPress={() => {
        setModalVisible(false);
        onMatchPress?.(item.id);
      }}
      activeOpacity={0.85}
    >
      <View style={styles.fullItemLeft}>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <View style={styles.fullItemRight}>
        <View style={[styles.smallBadge, badgeBg(item.level)]}>
          <Text style={[styles.smallBadgeText, badgeTextColor(item.level)]}>
            {item.level}
          </Text>
        </View>
        <Text style={styles.playerCountSmall}>
          {item.currentPlayers}/{item.totalPlayers}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // 빈 상태 렌더링
  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <View style={styles.emptyStateContent}>
        <Text style={styles.emptyStateTitle}>추천 매치가 없어요</Text>
        <Text style={styles.emptyStateSubtitle}>
          새로운 매치가 등록되면{'\n'}알려드릴게요!
        </Text>
      </View>
      <View style={styles.emptyStateFooter}>
        <View style={styles.emptyStateDot} />
        <View style={styles.emptyStateDot} />
        <View style={styles.emptyStateDot} />
      </View>
    </View>
  );

  return (
    <View style={styles.container} pointerEvents="box-none">
      <View style={styles.header} pointerEvents="box-none">
        <Text style={styles.title}>금주의 추천 매치</Text>
        {matches.length > 3 && (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.moreButton}
            activeOpacity={0.8}
          >
            <Text style={styles.moreText}>더보기</Text>
          </TouchableOpacity>
        )}
      </View>

      {matches.length === 0 ? (
        renderEmptyState()
      ) : (
        <>
          <FlatList
            ref={flatListRef}
            data={extendedMatches}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item, index }) => renderPreviewCard(item, index)}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH}
            decelerationRate="fast"
            contentContainerStyle={styles.carouselContent}
            onScrollBeginDrag={() => (userInteracting.current = true)}
            onScrollEndDrag={() => (userInteracting.current = false)}
          />

          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={false}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>추천 매치 전체</Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.modalClose}>닫기</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={matches}
                keyExtractor={item => String(item.id)}
                renderItem={renderFullItem}
                contentContainerStyle={styles.flatListContent}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </View>
          </Modal>
        </>
      )}
    </View>
  );
}

const badgeBg = (level?: string) => {
  if (level === '아마추어') return { backgroundColor: theme.colors.blue[50] };
  if (level === '세미프로') return { backgroundColor: theme.colors.green[50] };
  return { backgroundColor: theme.colors.red[50] };
};
const badgeTextColor = (level?: string) => {
  if (level === '아마추어') return { color: theme.colors.blue[700] };
  if (level === '세미프로') return { color: theme.colors.green[700] };
  return { color: theme.colors.red[700] };
};
