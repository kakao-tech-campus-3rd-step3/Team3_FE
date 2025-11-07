import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from '@/src/components/team/filters/member_count_slider_styles';

interface MemberCountSliderProps {
  value: number;
  onValueChange: (value: number) => void;
}

const MEMBER_COUNT_OPTIONS = [
  { label: '11명 이하', maxCount: 11, sliderValue: 1 },
  { label: '15명 이하', maxCount: 15, sliderValue: 2 },
  { label: '20명 이하', maxCount: 20, sliderValue: 3 },
  { label: '25명 이하', maxCount: 25, sliderValue: 4 },
  { label: '30명 이하', maxCount: 30, sliderValue: 5 },
  { label: '30명+', maxCount: 50, sliderValue: 6 },
];

export default function MemberCountSlider({
  value,
  onValueChange,
}: MemberCountSliderProps) {
  const getSliderValue = (currentValue: number) => {
    const option = MEMBER_COUNT_OPTIONS.find(
      opt => currentValue <= opt.maxCount
    );
    return option ? option.sliderValue : 6;
  };

  const currentSliderValue = getSliderValue(value);
  const sliderWidth = (currentSliderValue / 6) * 100;

  return (
    <View style={styles.memberCountSlider}>
      <View style={styles.sliderTrack}>
        <View style={styles.sliderTrackBackground} />
        <View
          style={[
            styles.sliderActiveTrack,
            {
              left: '0%',
              width: `${sliderWidth}%`,
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
