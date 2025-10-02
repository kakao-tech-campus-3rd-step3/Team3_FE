import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { memo } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';

import { ROUTES } from '@/src/constants/routes';
import { theme } from '@/src/theme';

import styles from '../../home_style';

interface EnvelopeSectionProps {
  teamId?: number | null;
}

export default memo(function EnvelopeSection({ teamId }: EnvelopeSectionProps) {
  const checkTeamMembership = () => {
    if (!teamId || teamId === null || teamId === undefined) {
      Alert.alert(
        '팀 참여 필요',
        '매치에 참여하려면 먼저 팀에 가입해야 합니다.',
        [
          {
            text: '취소',
            style: 'cancel',
          },
          {
            text: '팀 만들기',
            onPress: () => router.push(ROUTES.TEAM_CREATION),
          },
          {
            text: '팀 참여하기',
            onPress: () => router.push(ROUTES.TEAM_GUIDE),
          },
        ]
      );
      return false;
    }
    return true;
  };

  const handleMatchCreation = () => {
    if (!checkTeamMembership()) return;
    router.push(ROUTES.MATCH_MAKING);
  };

  const handleMatchParticipation = () => {
    if (!checkTeamMembership()) return;
    router.push({
      pathname: ROUTES.MATCH_APPLICATION,
      params: teamId ? { teamId: teamId.toString() } : undefined,
    });
  };

  return (
    <>
      <View style={styles.envelopeSection}>
        <TouchableOpacity onPress={handleMatchCreation}>
          <View style={styles.envelopeHeader}>
            <View style={styles.envelopeIcon}>
              <Image
                source={require('@/assets/images/apply.png')}
                style={{ width: 20, height: 20 }}
              />
            </View>
            <Text style={styles.envelopeTitle}>매치 생성하기</Text>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.text.sub}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.envelopeSection}>
        <TouchableOpacity onPress={handleMatchParticipation}>
          <View style={styles.envelopeHeader}>
            <View style={styles.envelopeIcon}>
              <Image
                source={require('@/assets/images/apply.png')}
                style={{ width: 20, height: 20 }}
              />
            </View>
            <Text style={styles.envelopeTitle}>매치 참여하기</Text>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.text.sub}
            />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
});
