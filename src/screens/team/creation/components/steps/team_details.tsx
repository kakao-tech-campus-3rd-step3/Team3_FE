import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import { colors } from '@/src/theme';
import { SkillLevel, SKILL_LEVELS } from '@/src/types/team';

import { styles } from '../../team_creation_style';

interface TeamDetailsProps {
  skillLevel: SkillLevel;
  description: string;
  onSkillLevelChange: (level: SkillLevel) => void;
  onDescriptionChange: (description: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  errors: {
    description?: string;
  };
}

export default function TeamDetails({
  skillLevel,
  description,
  onSkillLevelChange,
  onDescriptionChange,
  onSubmit,
  onBack,
  errors,
}: TeamDetailsProps) {
  return (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>팀 상세 정보를 입력해주세요</Text>
        <Text style={styles.stepSubtitle}>
          팀의 실력 수준과 설명을 작성해주세요
        </Text>
      </View>

      <View style={styles.stepContent}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>팀 실력 *</Text>
          <View style={styles.selectorContainer}>
            {SKILL_LEVELS.map(level => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.stepSelectorButton,
                  skillLevel === level && styles.stepSelectorButtonActive,
                ]}
                onPress={() => onSkillLevelChange(level)}
              >
                <Text
                  style={[
                    styles.stepSelectorButtonText,
                    skillLevel === level && styles.stepSelectorButtonTextActive,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>팀 설명</Text>
          <TextInput
            style={[
              styles.stepTextArea,
              errors.description && styles.textInputError,
            ]}
            value={description}
            onChangeText={onDescriptionChange}
            placeholder="팀의 목표, 활동 내용, 모집 조건 등을 자유롭게 작성해주세요"
            multiline
            numberOfLines={4}
            maxLength={1000}
            textAlignVertical="top"
          />
          <Text style={styles.characterCount}>{description.length}/1000</Text>
          {errors.description && (
            <Text style={styles.errorText}>{errors.description}</Text>
          )}
        </View>
      </View>

      <View style={styles.stepFooter}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={20} color={colors.gray[600]} />
          <Text style={styles.backButtonText}>이전</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={onSubmit}>
          <Ionicons name="checkmark-circle" size={20} color={colors.white} />
          <Text style={styles.nextButtonText}>팀 생성</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
