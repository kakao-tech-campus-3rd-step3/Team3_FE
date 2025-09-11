import { memo } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/src/components/card/card';
import { theme } from '@/src/theme';
import styles from '@/src/screens/profile/profile_style';
import { UserProfile } from '@/src/types/profile';

export default memo(function ProfileHeader({ user }: { user: UserProfile }) {
  return (
    <View style={styles.profileHeader}>
      <View style={styles.profileAvatar}>
        <Ionicons name="person" size={48} color={theme.colors.grass[500]} />
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileUniversity}>{user.university}</Text>
        <Text style={styles.profileDetails}>{user.joinDate} 가입</Text>
      </View>
    </View>
  );
});
