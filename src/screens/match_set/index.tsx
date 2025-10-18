import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { CustomHeader } from '@/src/components/ui/custom_header';
import { ROUTES } from '@/src/constants/routes';
import { useEnemyTeam } from '@/src/hooks/queries';
import { theme } from '@/src/theme';

import { styles } from './match_set_style';

export default function MatchSetScreen() {
  const { matchId } = useLocalSearchParams<{ matchId?: string }>();

  // ✅ 커스텀 훅 호출 (React Query)
  const { data: enemyTeam, isLoading, error } = useEnemyTeam(matchId);

  // ✅ 로딩 상태
  if (isLoading) {
    return (
      <View style={styles.container}>
        <CustomHeader title="매치 생성 완료" />
        <View style={styles.content}>
          <ActivityIndicator size="large" color={theme.colors.blue[600]} />
          <Text style={styles.infoText}>상대 팀 정보를 불러오는 중...</Text>
        </View>
      </View>
    );
  }

  // ✅ 에러 상태
  if (error || !enemyTeam) {
    return (
      <View style={styles.container}>
        <CustomHeader title="매치 생성 완료" />
        <View style={styles.content}>
          <Ionicons
            name="alert-circle-outline"
            size={48}
            color={theme.colors.red[500]}
          />
          <Text style={styles.infoText}>
            상대 팀 정보를 불러올 수 없습니다.
          </Text>
          {/* ❗ 디버깅용 출력 (개발 중에만) */}
          <Text style={[styles.infoText, { marginTop: 10 }]}>
            matchId: {matchId ?? 'undefined'}
          </Text>
          <Text style={styles.infoText}>
            {error
              ? `error: ${String((error as any)?.message)}`
              : 'no error message'}
          </Text>
        </View>
      </View>
    );
  }

  // ✅ 정상 데이터 렌더링
  return (
    <View style={styles.container}>
      <CustomHeader title="매치 생성 완료" />

      <ScrollView contentContainerStyle={styles.content}>
        <Ionicons name="trophy" size={60} color={theme.colors.green[600]} />
        <Text style={styles.successText}>매치가 성사되었습니다!</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>매치 ID: {matchId}</Text>
          <Text style={styles.infoText}>상대 팀명: {enemyTeam.teamName}</Text>
          <Text style={styles.infoText}>
            대학교: {enemyTeam.universityName}
          </Text>
          <Text style={styles.infoText}>
            팀 유형: {getTeamTypeLabel(enemyTeam.teamType)}
          </Text>
          <Text style={styles.infoText}>
            실력 등급: {getSkillLevelLabel(enemyTeam.skillLevel)}
          </Text>
          <Text style={styles.infoText}>
            팀원 수: {enemyTeam.memberCount}명
          </Text>
          <Text style={styles.infoText}>팀장: {enemyTeam.captainName}</Text>
          <Text style={styles.infoText}>팀 소개: {enemyTeam.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.replace(ROUTES.HOME)}
        >
          <Text style={styles.homeButtonText}>홈으로 돌아가기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.homeButton,
            {
              backgroundColor: theme.colors.gray[400],
              marginTop: theme.spacing.spacing3,
            },
          ]}
          onPress={() => router.push(`/team/management/${enemyTeam.teamId}`)}
        >
          <Text style={styles.homeButtonText}>팀 정보 보기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ✅ Enum 한글 변환 함수 */
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
