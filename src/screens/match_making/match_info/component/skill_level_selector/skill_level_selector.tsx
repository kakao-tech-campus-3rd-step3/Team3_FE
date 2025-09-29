import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { style } from './skill_level_selector_style';

// 실력 레벨 정의
const LEVELS = ['AMATEUR', 'SEMI_PRO', 'PRO'];

type Props = {
  onChange: (min: string, max: string) => void;
};

export default function SkillLevelSelector({ onChange }: Props) {
  const [values, setValues] = useState<[number, number]>([0, 2]);

  const handleChange = (val: number[]) => {
    const [min, max] = val as [number, number];
    setValues([min, max]);
    onChange(LEVELS[min], LEVELS[max]);
  };

  return (
    <View style={style.section}>
      <Text style={style.label}>선호하는 수준</Text>
      <Text style={style.selectedText}>
        최소: {LEVELS[values[0]]} / 최대: {LEVELS[values[1]]}
      </Text>

      <MultiSlider
        values={values}
        sliderLength={280}
        min={0}
        max={2}
        step={1}
        onValuesChange={handleChange}
        selectedStyle={style.selectedTrack}
        unselectedStyle={style.unselectedTrack}
        markerStyle={style.marker}
        containerStyle={style.sliderContainer}
      />

      <View style={style.levelLabels}>
        {LEVELS.map(level => (
          <Text key={level} style={style.levelLabel}>
            {level}
          </Text>
        ))}
      </View>
    </View>
  );
}
