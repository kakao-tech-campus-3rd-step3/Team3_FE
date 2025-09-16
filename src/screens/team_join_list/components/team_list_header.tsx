import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from '@/src/screens/team_join_list/university_team_list_style';

interface TeamListHeaderProps {
  university: string;
  onFilterPress: () => void;
}

export default function TeamListHeader({
  university,
  onFilterPress,
}: TeamListHeaderProps) {
  return (
    <View style={styles.headerSection}>
      <Text style={styles.title}>{university} 팀 목록</Text>
      <Text style={styles.subtitle}>참여하고 싶은 팀을 선택하세요</Text>
    </View>
  );
}
