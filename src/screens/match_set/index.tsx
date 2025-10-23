import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  BackHandler,
} from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import { ROUTES, getTeamManagementUrl } from '@/src/constants/routes';
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
              <Text style={styles.successSubtitle}>
                상대 팀 정보를 불러오는 중...
              </Text>
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
              <Text style={[styles.successSubtitle, { marginTop: 10 }]}>
                matchId: {matchId ?? 'undefined'}
              </Text>
              <Text style={styles.successSubtitle}>
                {error
                  ? `error: ${String((error as any)?.message)}`
                  : 'no error message'}
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
          <View style={styles.successIconContainer}>
            <Ionicons
              name="checkmark-circle"
              size={64}
              color={theme.colors.green[500]}
            />
          </View>
          <Text style={styles.successTitle}>매치가 성사되었습니다!</Text>
          <Text style={styles.successSubtitle}>
            축하합니다! 상대 팀과의 매치가 확정되었습니다.{'\n'}경기장에서
            만나요!
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => router.replace(ROUTES.HOME)}
            activeOpacity={0.8}
          >
            <Ionicons name="home" size={20} color="white" />
            <Text style={styles.homeButtonText}>홈으로 돌아가기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.teamInfoCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="people" size={24} color={theme.colors.blue[500]} />
            <Text style={styles.cardTitle}>상대 팀 정보</Text>
          </View>

          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <Ionicons
                name="football"
                size={20}
                color={theme.colors.gray[500]}
              />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>팀명</Text>
                <Text style={styles.infoValue}>{enemyTeam.teamName}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Ionicons
                name="school"
                size={20}
                color={theme.colors.gray[500]}
              />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>대학교</Text>
                <Text style={styles.infoValue}>{enemyTeam.universityName}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Ionicons
                name="business"
                size={20}
                color={theme.colors.gray[500]}
              />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>팀 유형</Text>
                <Text style={styles.infoValue}>
                  {getTeamTypeLabel(enemyTeam.teamType)}
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Ionicons
                name="trophy"
                size={20}
                color={theme.colors.gray[500]}
              />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>실력 등급</Text>
                <Text style={styles.infoValue}>
                  {getSkillLevelLabel(enemyTeam.skillLevel)}
                </Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Ionicons
                name="person"
                size={20}
                color={theme.colors.gray[500]}
              />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>팀원 수</Text>
                <Text style={styles.infoValue}>{enemyTeam.memberCount}명</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="star" size={20} color={theme.colors.gray[500]} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>팀장</Text>
                <Text style={styles.infoValue}>{enemyTeam.captainName}</Text>
              </View>
            </View>

            {enemyTeam.description && (
              <View style={styles.infoItem}>
                <Ionicons
                  name="chatbubble"
                  size={20}
                  color={theme.colors.gray[500]}
                />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>팀 소개</Text>
                  <Text style={styles.infoValue}>{enemyTeam.description}</Text>
                </View>
              </View>
            )}
          </View>
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
