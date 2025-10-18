import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { Image, Text, TouchableOpacity, View, Alert } from 'react-native';

import { useAuth } from '@/src/contexts/auth_context';
import { styles } from '@/src/screens/home/home_style';
import { theme } from '@/src/theme';

export default memo(function HomeHeader() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert('로그아웃', '정말 로그아웃하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '로그아웃',
        style: 'destructive',
        onPress: async () => {
          try {
            await logout();
          } catch (error) {
            console.error('로그아웃 중 오류 발생:', error);
          }
        },
      },
    ]);
  };

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
        <TouchableOpacity style={styles.headerIcon} onPress={handleLogout}>
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
