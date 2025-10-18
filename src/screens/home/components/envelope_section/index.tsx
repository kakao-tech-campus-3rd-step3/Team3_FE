import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { memo } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';

import { ROUTES } from '@/src/constants/routes';
import { useAuth } from '@/src/contexts/auth_context';
import { styles } from '@/src/screens/home/home_style';
import { theme } from '@/src/theme';

interface EnvelopeSectionProps {
  teamId?: number | null;
}

export default memo(function EnvelopeSection({ teamId }: EnvelopeSectionProps) {
  const { token } = useAuth();
  const isAuthenticated = !!token;

  const checkTeamMembership = () => {
    if (!isAuthenticated) {
      return false;
    }

    if (!teamId || teamId === null || teamId === undefined) {
      Alert.alert(
        '팀 참여 필요',
        '매치에 참여하려면 먼저 팀에 가입해야 합니다.',
        [
          {
            text: '확인',
            style: 'default',
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

  const handleCheckCreatedMatches = () => {
    if (!checkTeamMembership()) return;
    router.push(ROUTES.CHECK_CREATED_MATCHES);
  };

  const handleCheckAppliedMatches = () => {
    if (!checkTeamMembership()) return;
    router.push(ROUTES.CHECK_APPLIED_MATCHES);
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
        <TouchableOpacity onPress={handleCheckCreatedMatches}>
          <View style={styles.envelopeHeader}>
            <View style={styles.envelopeIcon}>
              <Image
                source={require('@/assets/images/apply.png')}
                style={{ width: 20, height: 20 }}
              />
            </View>
            <Text style={styles.envelopeTitle}>생성한 매치 보기</Text>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.text.sub}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.envelopeSection}>
        <TouchableOpacity onPress={handleCheckAppliedMatches}>
          <View style={styles.envelopeHeader}>
            <View style={styles.envelopeIcon}>
              <Image
                source={require('@/assets/images/apply.png')}
                style={{ width: 20, height: 20 }}
              />
            </View>
            <Text style={styles.envelopeTitle}>신청한 매치 보기</Text>

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
