import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

import { styles } from '@/src/components/team/sections/info_section_styles';
import { colors } from '@/src/theme';

export default function InfoSection() {
  return (
    <View style={styles.infoSection}>
      <View style={styles.infoCard}>
        <Ionicons
          name="information-circle-outline"
          size={24}
          color={colors.blue[500]}
        />
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>팀 정보 수정 안내</Text>
          <Text style={styles.infoText}>
            회장과 부회장만 팀 정보를 수정할 수 있습니다.
          </Text>
        </View>
      </View>
    </View>
  );
}
