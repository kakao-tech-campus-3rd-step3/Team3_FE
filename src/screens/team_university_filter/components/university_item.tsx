import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from '../university_list_style';

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
        <View style={styles.universityLogo}>
          <Text style={styles.universityLogoText}>{university.charAt(0)}</Text>
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
