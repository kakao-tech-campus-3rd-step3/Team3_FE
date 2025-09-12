import { memo } from 'react';
import { View, Text } from 'react-native';
import styles from '../../login_style';

export default memo(function LoginHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.logoText}>ShootDoori</Text>
      <Text style={styles.tagline}>대학교 축구 연결 서비스</Text>
    </View>
  );
});
