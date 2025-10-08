import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import { useUserProfile } from '@/src/hooks/queries';
import { useRecommendedMatches } from '@/src/hooks/useRecommendedMatches';
import { theme } from '@/src/theme';
import { RecommendedMatch } from '@/src/types/home';

import { styles } from './styles';

interface SafeMatchPreviewProps {
  onMatchPress?: (matchId: number, matchDate?: string) => void;
}

function SafeMatchPreview({ onMatchPress }: SafeMatchPreviewProps) {
  const { data: userProfile } = useUserProfile();
  const { data: matches = [], isLoading } = useRecommendedMatches();

  const renderPreviewCard = (match: RecommendedMatch, index: number) => (
    <TouchableOpacity
      key={`${match.id}-${index}`}
      activeOpacity={0.85}
      onPress={() => onMatchPress?.(match.id, match.matchDate)}
    >
      <LinearGradient
        colors={[theme.colors.background.main, theme.colors.grass[50]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: theme.spacing.spacing2,
            }}
          >
            <Ionicons
              name="trophy-outline"
              size={20}
              color={theme.colors.brand.main}
              style={{ marginRight: theme.spacing.spacing2 }}
            />
            <Text style={styles.location} numberOfLines={1}>
              {match.skillLevel}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: theme.spacing.spacing2,
            }}
          >
            <Ionicons
              name="calendar-outline"
              size={18}
              color={theme.colors.brand.main}
              style={{ marginRight: theme.spacing.spacing2 }}
            />
            <Text style={styles.time}>{match.matchDate}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
              name="people-outline"
              size={18}
              color={theme.colors.brand.main}
              style={{ marginRight: theme.spacing.spacing2 }}
            />
            <Text style={styles.time}>{match.teamName}</Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={theme.colors.brand.main}
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderNoTeamState = () => (
    <View style={styles.emptyStateContainer}>
      <View style={styles.emptyStateContent}>
        <Ionicons
          name="people-outline"
          size={48}
          color={theme.colors.brand.main}
          style={{ marginBottom: theme.spacing.spacing3 }}
        />
        <Text style={styles.emptyStateTitle}>팀 참여가 필요해요</Text>
        <Text style={styles.emptyStateSubtitle}>
          추천 매치를 보려면{'\n'}먼저 팀에 가입해주세요!
        </Text>
      </View>
      <View style={styles.emptyStateFooter}>
        <View style={styles.emptyStateDot} />
        <View style={styles.emptyStateDot} />
        <View style={styles.emptyStateDot} />
      </View>
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.emptyStateContainer}>
      <View style={styles.emptyStateContent}>
        <ActivityIndicator size="large" color={theme.colors.grass[500]} />
        <Text style={styles.emptyStateTitle}>추천 매치를 불러오는 중...</Text>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <View style={styles.emptyStateContent}>
        <Ionicons
          name="football-outline"
          size={48}
          color={theme.colors.brand.main}
          style={{ marginBottom: theme.spacing.spacing3 }}
        />
        <Text style={styles.emptyStateTitle}>추천 매치가 없어요</Text>
        <Text style={styles.emptyStateSubtitle}>
          3일 이내의 새로운 매치가{'\n'}등록되면 알려드릴게요!
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
      </View>

      {!userProfile?.teamId ? (
        renderNoTeamState()
      ) : isLoading ? (
        renderLoadingState()
      ) : matches.length === 0 ? (
        renderEmptyState()
      ) : (
        <View style={{ alignItems: 'center' }}>
          {renderPreviewCard(matches[0], 0)}
        </View>
      )}
    </View>
  );
}

export default SafeMatchPreview;
