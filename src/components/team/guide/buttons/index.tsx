import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { memo } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import { useUserProfile } from '@/src/hooks/queries';
import { colors } from '@/src/theme';

import { styles } from '../buttons_styles';

export default memo(function Buttons() {
  const router = useRouter();
  const { data: userProfile } = useUserProfile();

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.joinButton}
        onPress={() =>
          router.push({
            pathname: '/team/join-university',
            params: { university: userProfile?.university || '' },
          })
        }
      >
        <Ionicons name="people-outline" size={24} color={colors.blue[500]} />
        <Text style={styles.joinButtonText}>팀 참여하기</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() =>
          router.push({
            pathname: '/team/creation',
            params: { university: userProfile?.university || '' },
          })
        }
      >
        <Ionicons
          name="add-circle-outline"
          size={24}
          color={colors.text.white}
        />
        <Text style={styles.createButtonText}>팀 생성하기</Text>
      </TouchableOpacity>
    </View>
  );
});
