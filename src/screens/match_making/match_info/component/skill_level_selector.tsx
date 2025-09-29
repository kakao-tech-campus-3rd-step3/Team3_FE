import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, { useState } from 'react';
import { View, Text } from 'react-native';

const LEVELS = ['AMATEUR', 'SEMI_PRO', 'PRO'];

type Props = {
  onChange: (min: string, max: string) => void;
};

export default function SkillLevelRangeSelector({ onChange }: Props) {
  const [values, setValues] = useState<[number, number]>([0, 2]);

  const handleChange = (val: number[]) => {
    const [min, max] = val as [number, number];
    setValues([min, max]);
    onChange(LEVELS[min], LEVELS[max]);
  };

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}>
        선호하는 수준
      </Text>
      <Text style={{ fontSize: 14, marginBottom: 12 }}>
        최소: {LEVELS[values[0]]} / 최대: {LEVELS[values[1]]}
      </Text>

      <MultiSlider
        values={values}
        sliderLength={280}
        min={0}
        max={2}
        step={1}
        onValuesChange={handleChange}
        selectedStyle={{ backgroundColor: '#2563eb' }}
        unselectedStyle={{ backgroundColor: '#d1d5db' }}
        markerStyle={{
          backgroundColor: '#2563eb',
          height: 24,
          width: 24,
          borderRadius: 12,
        }}
        containerStyle={{ alignSelf: 'center' }}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 8,
          paddingHorizontal: 8,
        }}
      >
        {LEVELS.map(level => (
          <Text key={level} style={{ fontSize: 12, color: '#6b7280' }}>
            {level}
          </Text>
        ))}
      </View>
    </View>
  );
}
