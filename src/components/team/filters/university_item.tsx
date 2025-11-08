import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from '@/src/components/team/filters/university_item_styles';
import { colors } from '@/src/theme';

interface UniversityItemProps {
  university: string;
  isSelected: boolean;
  onSelect: (university: string) => void;
}

export default function UniversityItem({
  university,
  isSelected,
  onSelect,
}: UniversityItemProps) {
  return (
    <TouchableOpacity
      style={[
        styles.universityCard,
        isSelected && styles.universityCardSelected,
      ]}
      onPress={() => onSelect(university)}
    >
      <View style={styles.cardContent}>
        <View
          style={[
            styles.universityLogo,
            isSelected && styles.universityLogoSelected,
          ]}
        >
          <Ionicons
            name="school"
            size={24}
            color={isSelected ? colors.white : colors.blue[500]}
          />
        </View>
        <View style={styles.universityInfo}>
          <Text
            style={[
              styles.universityName,
              isSelected && styles.universityNameSelected,
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {university}
          </Text>
        </View>
      </View>
      {isSelected && (
        <View style={styles.selectedIndicator}>
          <Text style={styles.selectedIndicatorText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
