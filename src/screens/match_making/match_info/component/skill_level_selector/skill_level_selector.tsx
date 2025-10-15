import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { style } from './skill_level_selector_style';

// 실력 레벨 정의
const LEVELS = [
  { key: 'AMATEUR', label: '아마추어', description: '초보자' },
  { key: 'SEMI_PRO', label: '세미프로', description: '중급자' },
  { key: 'PRO', label: '프로', description: '고급자' },
] as const;

// 드롭다운용 데이터
const DROPDOWN_DATA = LEVELS.map((level, index) => ({
  label: level.label,
  value: index,
}));

type SkillLevel = (typeof LEVELS)[number]['key'];

type Props = {
  onChange: (min: SkillLevel, max: SkillLevel) => void;
};

export default function SkillLevelSelector({ onChange }: Props) {
  const [minLevel, setMinLevel] = useState<number>(0);
  const [maxLevel, setMaxLevel] = useState<number>(2);

  const handleMinLevelChange = (item: { label: string; value: number }) => {
    // 최소 레벨이 최대 레벨보다 높아지면 최대 레벨도 함께 조정
    if (item.value > maxLevel) {
      setMaxLevel(item.value);
      setMinLevel(item.value);
      onChange(LEVELS[item.value].key, LEVELS[item.value].key);
    } else {
      setMinLevel(item.value);
      onChange(LEVELS[item.value].key, LEVELS[maxLevel].key);
    }
  };

  const handleMaxLevelChange = (item: { label: string; value: number }) => {
    // 최대 레벨이 최소 레벨보다 낮아지면 최소 레벨도 함께 조정
    if (item.value < minLevel) {
      setMinLevel(item.value);
      setMaxLevel(item.value);
      onChange(LEVELS[item.value].key, LEVELS[item.value].key);
    } else {
      setMaxLevel(item.value);
      onChange(LEVELS[minLevel].key, LEVELS[item.value].key);
    }
  };

  return (
    <View style={style.section}>
      <Text style={style.label}>선호하는 수준</Text>
      <View style={style.selectedLevelSection}>
        <Text style={style.selectedText}>
          {LEVELS[minLevel].label} ~ {LEVELS[maxLevel].label}
        </Text>
      </View>

      <View style={style.sliderContainer}>
        {/* 드롭다운 기반 레벨 선택 */}
        <View style={style.dropdownContainer}>
          <View style={style.dropdownRow}>
            <View style={style.dropdownItem}>
              <Text style={style.dropdownLabel}>최소 레벨</Text>
              <Dropdown
                style={style.dropdown}
                placeholderStyle={style.dropdownPlaceholder}
                selectedTextStyle={style.dropdownSelectedText}
                data={DROPDOWN_DATA}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="선택하세요"
                value={minLevel}
                onChange={handleMinLevelChange}
              />
            </View>

            <View style={style.dropdownItem}>
              <Text style={style.dropdownLabel}>최대 레벨</Text>
              <Dropdown
                style={style.dropdown}
                placeholderStyle={style.dropdownPlaceholder}
                selectedTextStyle={style.dropdownSelectedText}
                data={DROPDOWN_DATA}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="선택하세요"
                value={maxLevel}
                onChange={handleMaxLevelChange}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
