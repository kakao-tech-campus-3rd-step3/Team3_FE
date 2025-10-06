import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { memo } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { colors } from '@/src/theme';

import { styles } from '../../team_guide_styles';

export default memo(function Header() {
  const router = useRouter();

  const handleBackPress = () => {
    router.replace('/(tabs)');
  };

  return (
    <>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="chevron-back" size={24} color={colors.text.white} />
      </TouchableOpacity>

      <Text style={styles.subTitle}>같이 뛸 팀원 필요하다면?</Text>

      <Text style={styles.mainTitle}>
        팀과 함께하는{'\n'}
        축구의 즐거움
      </Text>
    </>
  );
});
