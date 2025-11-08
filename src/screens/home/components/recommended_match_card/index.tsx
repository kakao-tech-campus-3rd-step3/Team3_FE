import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import { useUserProfile, useRecommendedMatches } from '@/src/hooks/queries';
import { styles } from '@/src/screens/home/components/recommended_match_card/styles';
import { theme } from '@/src/theme';
import { RecommendedMatch } from '@/src/types/home';

interface SafeMatchPreviewProps {
  onMatchPress?: (matchDate?: string) => void;
}

export default function SafeMatchPreview({
  onMatchPress,
}: SafeMatchPreviewProps) {
  const { data: userProfile } = useUserProfile();
  const { data: matches = [], isLoading } = useRecommendedMatches();

  const renderPreviewCard = (match: RecommendedMatch, index: number) => (
    <TouchableOpacity
      key={`${match.id}-${index}`}
      activeOpacity={0.8}
      onPress={() => onMatchPress?.(match.matchDate)}
      style={styles.cardTouchable}
    >
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.badgeContainer}>
            <Ionicons name="star" size={16} color="#f59e0b" />
            <Text style={styles.badgeText}>추천</Text>
          </View>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="trophy" size={20} color="#eab308" />
            </View>
            <Text style={styles.infoText} numberOfLines={1}>
              {match.skillLevel}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="calendar" size={18} color="#06b6d4" />
            </View>
            <Text style={styles.infoText}>{match.matchDate}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="people" size={18} color="#8b5cf6" />
            </View>
            <Text style={styles.infoText}>{match.teamName}</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.footerText}>자세히 보기</Text>
          <Ionicons name="arrow-forward" size={16} color="#374151" />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderNoTeamState = () => (
    <View style={styles.emptyStateContainer}>
      <View style={styles.emptyStateCard}>
        <View style={styles.emptyStateContent}>
          <View style={styles.emptyStateIconContainer}>
            <Ionicons name="people" size={40} color={theme.colors.gray[400]} />
          </View>
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
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.emptyStateContainer}>
      <View style={styles.emptyStateCard}>
        <View style={styles.emptyStateContent}>
          <View style={styles.emptyStateIconContainer}>
            <ActivityIndicator size="large" color="#06b6d4" />
          </View>
          <Text style={styles.emptyStateTitle}>추천 매치를 불러오는 중...</Text>
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <View style={styles.emptyStateCard}>
        <View style={styles.emptyStateContent}>
          <View style={styles.emptyStateIconContainer}>
            <Ionicons name="football" size={40} color="#10b981" />
          </View>
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
