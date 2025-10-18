import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { View, Text } from 'react-native';

import Badge from '@/src/screens/profile/components/badge/badge';
import { styles } from '@/src/screens/profile/profile_style';
import { theme } from '@/src/theme';
import { UserProfile } from '@/src/types/profile';
import { formatDate } from '@/src/utils/date';

export default memo(function ProfileHeader({ user }: { user: UserProfile }) {
  const getSkillLevelBadge = (skillLevel: string) => {
    switch (skillLevel) {
      case 'PRO':
        return { variant: 'gold' as const, text: '프로' };
      case 'SEMI_PRO':
        return { variant: 'silver' as const, text: '세미프로' };
      case 'AMATEUR':
        return { variant: 'bronze' as const, text: '아마추어' };
      default:
        return { variant: 'bronze' as const, text: '아마추어' };
    }
  };

  const skillBadge = getSkillLevelBadge(user.skillLevel);

  return (
    <View style={styles.profileHeader}>
      <View style={styles.profileAvatar}>
        <Ionicons name="person" size={48} color={theme.colors.grass[500]} />
      </View>
      <View style={styles.profileInfo}>
        <View style={[styles.nameContainer]}>
          <Text style={styles.profileName}>{user.name}</Text>
          <Badge
            text={skillBadge.text}
            variant={skillBadge.variant}
            size="small"
          />
        </View>
        <Text style={styles.profileUniversity}>{user.university}</Text>
        <Text style={styles.profileDetails}>
          {formatDate(user.createdAt)} 가입
        </Text>
      </View>
    </View>
  );
});
