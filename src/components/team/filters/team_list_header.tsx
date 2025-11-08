import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from '@/src/components/team/filters/team_list_header_styles';
import { colors } from '@/src/theme';

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
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
          <Ionicons name="options-outline" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
