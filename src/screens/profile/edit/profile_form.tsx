import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import Dropdown from '@/src/components/dropdown';
import {
  POSITION_OPTIONS,
  convertPositionToKorean,
  convertKoreanToPosition,
} from '@/src/constants/positions';
import { styles } from '@/src/screens/profile/edit/profile_form_style';
import { UserProfile, UpdateProfileRequest } from '@/src/types/profile';

interface ProfileFormProps {
  initialData: UserProfile;
  onSave: (data: UpdateProfileRequest) => void;
  isLoading: boolean;
}

export default function ProfileForm({
  initialData,
  onSave,
  isLoading,
}: ProfileFormProps) {
  const { width } = useWindowDimensions();

  const getDynamicFontSize = (baseSize: number) => {
    return Math.max(baseSize, width * 0.035);
  };
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

  const [formData, setFormData] = useState({
    name: initialData.name || '',
    skillLevel: convertSkillLevelToKorean(initialData.skillLevel || 'AMATEUR'),
    position: convertPositionToKorean(initialData.position || ''),
    bio: initialData.bio || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

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
      const dataToSave = {
        name: initialData.name, // 원본 이름 유지
        skillLevel: formData.skillLevel,
        position: convertKoreanToPosition(formData.position),
        bio: formData.bio,
      };
      onSave(dataToSave);
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
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={[styles.input, styles.inputDisabled]}
          value={formData.name}
          editable={false}
          placeholder="이름"
        />
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
                  { fontSize: getDynamicFontSize(10) },
                ]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8}
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
        <Dropdown
          items={POSITION_OPTIONS}
          value={formData.position || null}
          onChange={value => updateField('position', value)}
          placeholder="포지션을 선택하세요"
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
