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
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    phoneNumber: initialData.phoneNumber || '',
    university: initialData.university || '',
    department: initialData.major || '',
    studentId: initialData.studentId || '',
    level: initialData.level || '아마추어',
    bio: initialData.bio || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    }

    if (!formData.university.trim()) {
      newErrors.university = '대학교를 입력해주세요.';
    }

    if (!formData.department.trim()) {
      newErrors.department = '학과를 입력해주세요.';
    }

    if (!formData.studentId.trim()) {
      newErrors.studentId = '학번을 입력해주세요.';
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
      <Text style={styles.sectionTitle}>기본 정보</Text>

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
        <Text style={styles.label}>전화번호</Text>
        <TextInput
          style={styles.input}
          value={formData.phoneNumber}
          onChangeText={value => updateField('phoneNumber', value)}
          placeholder="전화번호를 입력하세요"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.sectionDivider} />

      <Text style={styles.sectionTitle}>대학 정보</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>대학교 *</Text>
        <TextInput
          style={[styles.input, errors.university && styles.inputError]}
          value={formData.university}
          onChangeText={value => updateField('university', value)}
          placeholder="대학교를 입력하세요"
        />
        {errors.university && (
          <Text style={styles.errorText}>{errors.university}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>학과 *</Text>
        <TextInput
          style={[styles.input, errors.department && styles.inputError]}
          value={formData.department}
          onChangeText={value => updateField('department', value)}
          placeholder="학과를 입력하세요"
        />
        {errors.department && (
          <Text style={styles.errorText}>{errors.department}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>학번 *</Text>
        <TextInput
          style={[styles.input, errors.studentId && styles.inputError]}
          value={formData.studentId}
          onChangeText={value => updateField('studentId', value)}
          placeholder="학번을 입력하세요 (예: 20)"
          keyboardType="numeric"
        />
        {errors.studentId && (
          <Text style={styles.errorText}>{errors.studentId}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>등급</Text>
        <View style={styles.levelContainer}>
          {['아마추어', '세미프로', '프로'].map(level => (
            <TouchableOpacity
              key={level}
              style={[
                styles.levelOption,
                formData.level === level && styles.levelOptionSelected,
              ]}
              onPress={() => updateField('level', level)}
            >
              <Text
                style={[
                  styles.levelOptionText,
                  formData.level === level && styles.levelOptionTextSelected,
                ]}
              >
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.sectionDivider} />

      <Text style={styles.sectionTitle}>자기소개</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>소개글</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.bio}
          onChangeText={value => updateField('bio', value)}
          placeholder="자기소개를 입력하세요"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
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
