import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { memo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { theme } from '@/src/theme';

import styles from '../../home_style';

export default memo(function EnvelopeSection() {
  return (
    <View style={styles.envelopeSection}>
      <TouchableOpacity
        onPress={() => router.push('/match_making/teammate_register')}
      >
        <View style={styles.envelopeHeader}>
          <View style={styles.envelopeIcon}>
            <Image
              source={require('@/assets/images/apply.png')}
              style={{ width: 20, height: 20 }}
            />
          </View>
          <Text style={styles.envelopeTitle}>매치 신청하기</Text>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={theme.colors.text.sub}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
});
