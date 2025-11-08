import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  BackHandler,
} from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import { ROUTES } from '@/src/constants/routes';
import { useEnemyTeam } from '@/src/hooks/queries';
import { styles } from '@/src/screens/match_set/match_set_style';
import { theme } from '@/src/theme';

export default function MatchSetScreen() {
  const { matchId } = useLocalSearchParams<{ matchId?: string }>();

  const { data: enemyTeam, isLoading, error } = useEnemyTeam(matchId);

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <CustomHeader title="매치 성사 완료" />
        <View style={styles.scrollContainer}>
          <View style={styles.scrollContent}>
            <View style={styles.successSection}>
              <ActivityIndicator size="large" color={theme.colors.blue[600]} />
            </View>
          </View>
        </View>
      </View>
    );
  }

  if (error || !enemyTeam) {
    return (
      <View style={styles.container}>
        <CustomHeader title="매치 성사 완료" />
        <View style={styles.scrollContainer}>
          <View style={styles.scrollContent}>
            <View style={styles.successSection}>
              <Ionicons
                name="alert-circle-outline"
                size={48}
                color={theme.colors.red[500]}
              />
              <Text style={styles.successSubtitle}>
                상대 팀 정보를 불러올 수 없습니다.
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader title="매치 성사 완료" />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.successSection}>
          <View style={styles.successIconWrapper}>
            <View style={styles.successIconBackground}>
              <Ionicons
                name="checkmark-circle"
                size={70}
                color={theme.colors.green[500]}
              />
            </View>
          </View>
          <Text style={styles.successTitle}>매치 성사 완료!</Text>
          <Text style={styles.successSubtitle}>
            축하합니다! 상대 팀과의 매치가 확정되었습니다.
          </Text>
        </View>

        {/* 상대 팀 정보 카드 */}
        <View style={styles.teamInfoCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderIcon}>
              <Ionicons
                name="people"
                size={22}
                color={theme.colors.blue[600]}
              />
            </View>
            <Text style={styles.cardTitle}>상대 팀 정보</Text>
          </View>

          <View style={styles.teamInfoList}>
            <View style={styles.teamInfoRow}>
              <View style={styles.teamInfoItem}>
                <View style={styles.teamInfoIconWrapper}>
                  <Ionicons
                    name="football"
                    size={18}
                    color={theme.colors.blue[600]}
                  />
                </View>
                <View style={styles.teamInfoContent}>
                  <Text style={styles.teamInfoLabel}>팀명</Text>
                  <Text style={styles.teamInfoValue} numberOfLines={1}>
                    {enemyTeam.teamName}
                  </Text>
                </View>
              </View>

              <View style={styles.teamInfoItem}>
                <View style={styles.teamInfoIconWrapper}>
                  <Ionicons
                    name="school"
                    size={18}
                    color={theme.colors.purple[600]}
                  />
                </View>
                <View style={styles.teamInfoContent}>
                  <Text style={styles.teamInfoLabel}>대학교</Text>
                  <Text style={styles.teamInfoValue} numberOfLines={1}>
                    {enemyTeam.universityName}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.teamInfoRow}>
              <View style={styles.teamInfoItem}>
                <View style={styles.teamInfoIconWrapper}>
                  <Ionicons
                    name="business"
                    size={18}
                    color={theme.colors.green[600]}
                  />
                </View>
                <View style={styles.teamInfoContent}>
                  <Text style={styles.teamInfoLabel}>팀 유형</Text>
                  <Text style={styles.teamInfoValue}>
                    {getTeamTypeLabel(enemyTeam.teamType)}
                  </Text>
                </View>
              </View>

              <View style={styles.teamInfoItem}>
                <View style={styles.teamInfoIconWrapper}>
                  <Ionicons
                    name="trophy"
                    size={18}
                    color={theme.colors.orange[600]}
                  />
                </View>
                <View style={styles.teamInfoContent}>
                  <Text style={styles.teamInfoLabel}>실력 등급</Text>
                  <Text style={styles.teamInfoValue}>
                    {getSkillLevelLabel(enemyTeam.skillLevel)}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.teamInfoRow}>
              <View style={styles.teamInfoItem}>
                <View style={styles.teamInfoIconWrapper}>
                  <Ionicons
                    name="person"
                    size={18}
                    color={theme.colors.blue[500]}
                  />
                </View>
                <View style={styles.teamInfoContent}>
                  <Text style={styles.teamInfoLabel}>팀원 수</Text>
                  <Text style={styles.teamInfoValue}>
                    {enemyTeam.memberCount}명
                  </Text>
                </View>
              </View>

              <View style={styles.teamInfoItem}>
                <View style={styles.teamInfoIconWrapper}>
                  <Ionicons
                    name="star"
                    size={18}
                    color={theme.colors.yellow[600]}
                  />
                </View>
                <View style={styles.teamInfoContent}>
                  <Text style={styles.teamInfoLabel}>팀장</Text>
                  <Text style={styles.teamInfoValue} numberOfLines={1}>
                    {enemyTeam.captainName}
                  </Text>
                </View>
              </View>
            </View>

            {enemyTeam.description && (
              <View style={styles.descriptionSection}>
                <View style={styles.descriptionHeader}>
                  <Ionicons
                    name="chatbubble-outline"
                    size={18}
                    color={theme.colors.gray[600]}
                  />
                  <Text style={styles.descriptionLabel}>팀 소개</Text>
                </View>
                <Text style={styles.descriptionText}>
                  {enemyTeam.description}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => router.replace(ROUTES.HOME)}
            activeOpacity={0.8}
          >
            <Ionicons name="home" size={22} color="white" />
            <Text style={styles.homeButtonText}>홈으로 돌아가기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function getTeamTypeLabel(type: string) {
  switch (type) {
    case 'CENTRAL_CLUB':
      return '중앙동아리';
    case 'DEPARTMENT_CLUB':
      return '과동아리';
    default:
      return '기타';
  }
}

function getSkillLevelLabel(level: string) {
  switch (level) {
    case 'PRO':
      return '프로';
    case 'SEMI_PRO':
      return '세미프로';
    default:
      return '아마추어';
  }
}
