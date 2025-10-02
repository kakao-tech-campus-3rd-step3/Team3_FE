import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { memo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { ROUTES } from '@/src/constants/routes';
import { theme } from '@/src/theme';

import styles from '../../home_style';

interface EnvelopeSectionProps {
  teamId?: number | null;
}

export default memo(function EnvelopeSection({ teamId }: EnvelopeSectionProps) {
  return (
    <>
      <View style={styles.envelopeSection}>
        <TouchableOpacity onPress={() => router.push(ROUTES.MATCH_MAKING)}>
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
        <TouchableOpacity
          onPress={() => {
            if (teamId) {
              router.push({
                pathname: ROUTES.MATCH_APPLICATION,
                params: { teamId: teamId.toString() },
              });
            } else {
              router.push(ROUTES.MATCH_APPLICATION);
            }
          }}
        >
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
