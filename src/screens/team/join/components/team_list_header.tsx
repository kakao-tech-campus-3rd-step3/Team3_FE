import { View, Text } from 'react-native';

import { styles } from '@/src/screens/team/join/university_team_list_style';

interface TeamListHeaderProps {
  university: string;
}

export default function TeamListHeader({ university }: TeamListHeaderProps) {
  return (
    <View style={styles.headerSection}>
      <Text style={styles.title}>{university} 팀 목록</Text>
      <Text style={styles.subtitle}>참여하고 싶은 팀을 선택하세요</Text>
    </View>
  );
}
