import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { theme } from '@/src/theme';

import styles from '../../home_style';

export default memo(function HomeHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Image
          source={require('@/assets/images/logo_without_background.png')}
          style={{ width: 28, height: 28, resizeMode: 'contain' }}
        />
        <Text style={styles.headerTitle}>ShootDoori</Text>
      </View>
      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons
            name="location-outline"
            size={24}
            color={theme.colors.text.main}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color={theme.colors.text.main}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
});
