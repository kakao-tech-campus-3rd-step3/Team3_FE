import { memo } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import { styles } from '@/src/screens/profile/profile_style';

type Tab = 'reputation' | 'settings';

export default memo(function TabBar({
  active,
  onChange,
}: {
  active: Tab;
  onChange: (t: Tab) => void;
}) {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, active === 'reputation' && styles.activeTab]}
        onPress={() => onChange('reputation')}
      >
        <Text
          style={[
            styles.tabText,
            active === 'reputation' && styles.activeTabText,
          ]}
        >
          평판 정보
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, active === 'settings' && styles.activeTab]}
        onPress={() => onChange('settings')}
      >
        <Text
          style={[
            styles.tabText,
            active === 'settings' && styles.activeTabText,
          ]}
        >
          설정
        </Text>
      </TouchableOpacity>
    </View>
  );
});
