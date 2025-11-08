import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { View, Text } from 'react-native';

import { styles } from '@/src/components/team/cards/member_info_card_styles';
import { theme } from '@/src/theme';

export default memo(function MemberInfoCard() {
  return (
    <View style={styles.infoSection}>
      <View style={styles.infoCard}>
        <Ionicons
          name="information-circle-outline"
          size={24}
          color={theme.colors.blue[500]}
        />
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>팀원 관리 안내</Text>
          <Text style={styles.infoText}>
            회장과 부회장만 팀원의 역할을 변경하거나 강퇴할 수 있습니다.
          </Text>
        </View>
      </View>
    </View>
  );
});
