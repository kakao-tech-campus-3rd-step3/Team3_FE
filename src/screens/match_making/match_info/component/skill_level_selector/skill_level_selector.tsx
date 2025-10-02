import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { style } from './skill_level_selector_style';

// 실력 레벨 정의
const LEVELS = [
  { key: 'AMATEUR', label: '아마추어', description: '초보자' },
  { key: 'SEMI_PRO', label: '세미프로', description: '중급자' },
  { key: 'PRO', label: '프로', description: '고급자' },
] as const;

type SkillLevel = (typeof LEVELS)[number]['key'];

type Props = {
  onChange: (min: SkillLevel, max: SkillLevel) => void;
};

export default function SkillLevelSelector({ onChange }: Props) {
  const [values, setValues] = useState<number[]>([0, 2]);

  const handleValuesChange = (newValues: number[]) => {
    setValues(newValues);
    onChange(LEVELS[newValues[0]].key, LEVELS[newValues[1]].key);
  };

  return (
    <View style={style.section}>
      <Text style={style.label}>선호하는 수준</Text>
      <Text style={style.selectedText}>
        {LEVELS[values[0]].label} ~ {LEVELS[values[1]].label}
      </Text>

      <View style={style.sliderContainer}>
        <View style={style.levelLabelsContainer}>
          {LEVELS.map((level, index) => (
            <View key={level.key} style={style.levelLabelContainer}>
              <Text style={style.levelLabel}>{level.label}</Text>
              <Text style={style.levelDescription}>{level.description}</Text>
            </View>
          ))}
        </View>

        <View style={style.sliderWrapper}>
          <MultiSlider
            values={values}
            onValuesChange={handleValuesChange}
            min={0}
            max={2}
            step={1}
            allowOverlap={false}
            snapped
            trackStyle={style.trackStyle}
            selectedStyle={style.selectedStyle}
            unselectedStyle={style.unselectedStyle}
            markerStyle={style.markerStyle}
            pressedMarkerStyle={style.pressedMarkerStyle}
            containerStyle={style.containerStyle}
          />
        </View>

        <View style={style.rangeLabelsContainer}>
          <Text style={style.rangeLabel}>최소: {LEVELS[values[0]].label}</Text>
          <Text style={style.rangeLabel}>최대: {LEVELS[values[1]].label}</Text>
        </View>
      </View>
    </View>
  );
}
