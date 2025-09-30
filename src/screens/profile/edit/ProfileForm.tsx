import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import { UserProfile, UpdateProfileRequest } from '@/src/types/profile';

import { styles } from './ProfileFormStyle';

interface ProfileFormProps {
  initialData: UserProfile;
  onSave: (data: UpdateProfileRequest) => void;
  isLoading: boolean;
}

export function ProfileForm({
  initialData,
  onSave,
  isLoading,
}: ProfileFormProps) {
  const convertSkillLevelToKorean = (level: string) => {
    switch (level) {
      case 'AMATEUR':
        return '아마추어';
      case 'SEMI_PRO':
        return '세미프로';
      case 'PRO':
        return '프로';
      default:
        return level;
    }
  };

  const convertPositionToKorean = (position: string) => {
    switch (position) {
      case 'GK':
        return '골키퍼';
      case 'DF':
        return '수비수';
      case 'MF':
        return '미드필더';
      case 'FW':
        return '공격수';
      default:
        return position;
    }
  };

  const [formData, setFormData] = useState({
    name: initialData.name || '',
    skillLevel: convertSkillLevelToKorean(initialData.skillLevel || 'AMATEUR'),
    position: convertPositionToKorean(initialData.position || ''),
    bio: initialData.bio || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    } else if (formData.name.length < 2 || formData.name.length > 100) {
      newErrors.name = '이름은 2~100자 사이여야 합니다.';
    }

    if (formData.skillLevel && formData.skillLevel.length > 4) {
      newErrors.skillLevel = '실력은 4자 이하여야 합니다.';
    }

    if (formData.position && formData.position.length > 10) {
      newErrors.position = '포지션은 10자 이하여야 합니다.';
    }

    if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = '자기소개는 500자 이하여야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>프로필 수정</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>이름 *</Text>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          value={formData.name}
          onChangeText={value => updateField('name', value)}
          placeholder="이름을 입력하세요"
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>실력</Text>
        <View style={styles.levelContainer}>
          {['아마추어', '세미프로', '프로'].map(level => (
            <TouchableOpacity
              key={level}
              style={[
                styles.levelOption,
                formData.skillLevel === level && styles.levelOptionSelected,
              ]}
              onPress={() => updateField('skillLevel', level)}
            >
              <Text
                style={[
                  styles.levelOptionText,
                  formData.skillLevel === level &&
                    styles.levelOptionTextSelected,
                ]}
              >
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.skillLevel && (
          <Text style={styles.errorText}>{errors.skillLevel}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>포지션</Text>
        <TextInput
          style={[styles.input, errors.position && styles.inputError]}
          value={formData.position}
          onChangeText={value => updateField('position', value)}
          placeholder="포지션을 입력하세요 (예: 공격수, 미드필더, 수비수)"
        />
        {errors.position && (
          <Text style={styles.errorText}>{errors.position}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>자기소개</Text>
        <TextInput
          style={[
            styles.input,
            styles.textArea,
            errors.bio && styles.inputError,
          ]}
          value={formData.bio}
          onChangeText={value => updateField('bio', value)}
          placeholder="자기소개를 입력하세요"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        {errors.bio && <Text style={styles.errorText}>{errors.bio}</Text>}
      </View>

      <TouchableOpacity
        style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={isLoading}
      >
        <Text style={styles.saveButtonText}>
          {isLoading ? '저장 중...' : '저장하기'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
