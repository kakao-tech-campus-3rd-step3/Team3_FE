import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from '../university_team_list_style';

interface MemberCountSliderProps {
  value: number;
  onValueChange: (value: number) => void;
}

const MEMBER_COUNT_OPTIONS = [
  { label: '11명 이하', maxCount: 11 },
  { label: '15명 이하', maxCount: 15 },
  { label: '20명 이하', maxCount: 20 },
  { label: '25명 이하', maxCount: 25 },
  { label: '30명 이하', maxCount: 30 },
  { label: '30명+', maxCount: 50 },
];

export default function MemberCountSlider({
  value,
  onValueChange,
}: MemberCountSliderProps) {
  return (
    <View style={styles.memberCountSlider}>
      <View style={styles.sliderTrack}>
        <View style={styles.sliderTrackBackground} />
        <View
          style={[
            styles.sliderActiveTrack,
            {
              left: '0%',
              width: `${(value / 50) * 100}%`,
            },
          ]}
        />
      </View>
      <View style={styles.sliderLabels}>
        {MEMBER_COUNT_OPTIONS.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.sliderLabel,
              value >= option.maxCount && styles.sliderLabelActive,
            ]}
            onPress={() => onValueChange(option.maxCount)}
          >
            <Text
              style={[
                styles.sliderLabelText,
                value >= option.maxCount && styles.sliderLabelTextActive,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
