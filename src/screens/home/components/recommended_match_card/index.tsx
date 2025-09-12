import React, { useEffect, useRef, memo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '@/src/theme';
import { useRecommendedMatch, useHome } from '@/src/hooks/queries';
import { styles } from './styles';

interface RecommendedMatchCardProps {
  onMatchPress?: (matchId: number) => void;
}

export default memo(function RecommendedMatchCard({
  onMatchPress,
}: RecommendedMatchCardProps) {
  const { data: personalizedMatchData } = useRecommendedMatch();
  const { data: homeData, isLoading, error } = useHome();
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollAnimationRef = useRef<number | null>(null);
  const userInteractingRef = useRef(false);
  const restartTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentPositionRef = useRef(0);

  const recommendedMatches = personalizedMatchData?.recommendedMatches || [];
  const renderedMatches =
    recommendedMatches.length > 1
      ? [...recommendedMatches.slice(1), ...recommendedMatches.slice(1)]
      : [];

  useEffect(() => {
    if (!personalizedMatchData || recommendedMatches.length <= 1) return;

    const cardWidth = 130 + theme.spacing.spacing2;
    const totalWidth = (recommendedMatches.length - 1) * cardWidth;

    const continuousScroll = () => {
      if (userInteractingRef.current) return;

      currentPositionRef.current += 0.3;
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: currentPositionRef.current,
          animated: false,
        });
      }

      if (currentPositionRef.current >= totalWidth) {
        currentPositionRef.current -= totalWidth;
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: currentPositionRef.current,
            animated: false,
          });
        }
      }

      scrollAnimationRef.current = requestAnimationFrame(continuousScroll);
    };

    const timer = setTimeout(() => {
      scrollAnimationRef.current = requestAnimationFrame(continuousScroll);
    }, 2000);

    return () => {
      clearTimeout(timer);
      if (scrollAnimationRef.current)
        cancelAnimationFrame(scrollAnimationRef.current);
    };
  }, [personalizedMatchData, recommendedMatches.length]);

  if (error) throw error;
  if (isLoading || !homeData) return null;

  const handleScrollBeginDrag = () => {
    userInteractingRef.current = true;
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
    }
  };

  const handleScrollEndDrag = (e: any) => {
    currentPositionRef.current = e.nativeEvent.contentOffset.x;
    userInteractingRef.current = false;

    restartTimerRef.current = setTimeout(() => {
      scrollAnimationRef.current = requestAnimationFrame(function step() {
        if (!userInteractingRef.current) {
          currentPositionRef.current += 0.3;
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
              x: currentPositionRef.current,
              animated: false,
            });
          }
          scrollAnimationRef.current = requestAnimationFrame(step);
        }
      });
    }, 2000);
  };

  const handleScroll = (e: any) => {
    const cardWidth = 130 + theme.spacing.spacing2;
    const totalWidth = (recommendedMatches.length - 1) * cardWidth;
    let x = e.nativeEvent.contentOffset.x;

    if (x >= totalWidth) {
      x -= totalWidth;
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x, animated: false });
      }
      currentPositionRef.current = x;
    } else {
      currentPositionRef.current = x;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>금주의 추천 매치</Text>
      </View>

      <View style={styles.additionalMatches}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContainer}
          onScrollBeginDrag={handleScrollBeginDrag}
          onScrollEndDrag={handleScrollEndDrag}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {renderedMatches.map(match => (
            <TouchableOpacity
              key={`${match.id}-${Math.random()}`}
              style={[
                styles.additionalMatchItem,
                { backgroundColor: theme.colors.background.main },
              ]}
              onPress={() => onMatchPress?.(match.id)}
            >
              <View style={styles.additionalMatchInfo}>
                <Text style={styles.additionalLocation}>{match.location}</Text>
                <Text style={styles.additionalTime}>{match.time}</Text>
              </View>
              <View style={styles.additionalMatchBadges}>
                <View
                  style={[
                    styles.smallBadge,
                    {
                      backgroundColor:
                        match.level === '아마추어'
                          ? '#E3F2FD'
                          : match.level === '세미프로'
                            ? '#E8F5E8'
                            : '#FFEBEE',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.smallBadgeText,
                      {
                        color:
                          match.level === '아마추어'
                            ? '#1976D2'
                            : match.level === '세미프로'
                              ? '#2E7D32'
                              : '#C62828',
                      },
                    ]}
                  >
                    {match.level}
                  </Text>
                </View>
                <Text style={styles.playerCountSmall}>
                  {match.currentPlayers}/{match.totalPlayers}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
});
