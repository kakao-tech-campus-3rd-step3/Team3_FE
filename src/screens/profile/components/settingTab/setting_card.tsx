import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import Card from '@/src/components/card/card';
import { styles } from '@/src/screens/profile/profile_style';
import { theme } from '@/src/theme';
import { SettingItem } from '@/src/types';

export default memo(function SettingCard({ items }: { items: SettingItem[] }) {
  return (
    <Card style={styles.settingsCard}>
      <Text style={styles.sectionTitle}>설정</Text>
      {items.map(item => (
        <TouchableOpacity
          key={item.key}
          style={styles.settingItem}
          onPress={item.onPress}
        >
          <Text
            style={[
              styles.settingText,
              item.color ? { color: item.color } : undefined,
            ]}
          >
            {item.label}
          </Text>
          <Text style={styles.settingValue}>{item.value}</Text>
          {item.showChevron && (
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.colors.text.sub}
            />
          )}
        </TouchableOpacity>
      ))}
    </Card>
  );
});
