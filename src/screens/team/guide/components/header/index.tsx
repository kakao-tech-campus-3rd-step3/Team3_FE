import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { memo } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import { ROUTES } from '@/src/constants/routes';
import { styles } from '@/src/screens/team/guide/team_guide_styles';
import { colors } from '@/src/theme';

export default memo(function Header() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const dynamicStyles = StyleSheet.create({
    subTitle: {
      fontSize: Math.max(18, width * 0.05),
      fontWeight: 'bold',
      color: colors.text.white,
      textAlign: 'center',
      marginTop: Math.max(60, width * 0.15),
      marginBottom: Math.max(12, width * 0.03),
      opacity: 0.9,
    },
    mainTitle: {
      fontSize: Math.max(28, width * 0.08),
      fontWeight: 'bold',
      color: colors.text.white,
      textAlign: 'center',
      lineHeight: Math.max(36, width * 0.1),
      marginBottom: Math.max(40, width * 0.1),
      marginTop: Math.max(16, width * 0.04),
      marginRight: Math.max(8, width * 0.02),
    },
  });

  const handleBackPress = () => {
    router.replace(ROUTES.TABS);
  };

  return (
    <>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="chevron-back" size={24} color={colors.text.white} />
      </TouchableOpacity>

      <Text style={dynamicStyles.subTitle}>같이 뛸 팀원 필요하다면?</Text>

      <Text style={dynamicStyles.mainTitle}>
        팀과 함께하는{'\n'}
        축구의 즐거움
      </Text>
    </>
  );
});
