import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../team_creation_style';

interface Step3Props {
  skillLevel: string;
  description: string;
  onSkillLevelChange: (level: string) => void;
  onDescriptionChange: (description: string) => void;
  onNext: () => void;
  onBack: () => void;
  errors: {
    description?: string;
  };
}

export default function Step3TeamDetails({
  skillLevel,
  description,
  onSkillLevelChange,
  onDescriptionChange,
  onNext,
  onBack,
  errors,
}: Step3Props) {
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
            {['아마추어', '세미프로', '프로'].map(level => (
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
          <Ionicons name="arrow-back" size={20} color="#666" />
          <Text style={styles.backButtonText}>이전</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextButtonText}>다음</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
