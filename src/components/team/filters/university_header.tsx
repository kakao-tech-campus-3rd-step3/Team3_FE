import { View, Text } from 'react-native';

import { styles } from '@/src/components/team/filters/university_header_styles';

export default function UniversityHeader() {
  return (
    <View style={styles.headerSection}>
      <Text style={styles.title}>대학교를 선택해주세요</Text>
      <Text style={styles.subtitle}>
        참여하고 싶은 팀이 있는 대학교를 선택하세요
      </Text>
    </View>
  );
}
