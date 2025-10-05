import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import type { RegisterFormData } from '@/src/hooks/useRegisterForm';
import {
  useRegisterValidation,
  profileValidationRules,
} from '@/src/hooks/useRegisterValidation';
import { theme } from '@/src/theme';

interface Props {
  data: RegisterFormData;
  onChange: <K extends keyof RegisterFormData>(
    key: K,
    value: RegisterFormData[K]
  ) => void;
  handlePrev: () => void;
  handleNext: () => void;
}

export function ProfileInfo({ data, onChange, handlePrev, handleNext }: Props) {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { errors, validateField } = useRegisterValidation(
    profileValidationRules
  );

  const handleFieldChange = (field: keyof RegisterFormData, value: string) => {
    if (field === 'studentYear') {
      const numericValue = value.replace(/[^0-9]/g, '').slice(0, 2);
      onChange(field, numericValue);
      const updatedData = { ...data, [field]: numericValue };
      validateField(field, numericValue, updatedData);
    } else if (field === 'kakaoTalkId') {
      const validValue = value.replace(/[^a-zA-Z0-9._-]/g, '');
      onChange(field, validValue);
      const updatedData = { ...data, [field]: validValue };
      validateField(field, validValue, updatedData);
    } else {
      onChange(field, value);
      const updatedData = { ...data, [field]: value };
      validateField(field, value, updatedData);
    }
  };

  const isFormValid = useMemo(() => {
    const nameValid = data.name && data.name.trim().length >= 2;
    const kakaotalkIdValid =
      data.kakaoTalkId && /^[a-zA-Z0-9._-]{4,20}$/.test(data.kakaoTalkId);
    const studentYearValid =
      data.studentYear && /^\d{2}$/.test(data.studentYear);
    const departmentValid =
      data.department && data.department.trim().length >= 2;

    return nameValid && kakaotalkIdValid && studentYearValid && departmentValid;
  }, [data]);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
        >
          <View style={styles.inputGroup}>
            <Text style={styles.label}>이름</Text>
            <TextInput
              style={[
                styles.input,
                (focusedField === 'name' || data.name) && styles.inputFilled,
                errors.name && styles.inputError,
              ]}
              placeholder="이름을 입력하세요"
              value={data.name}
              onChangeText={text => handleFieldChange('name', text)}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>카카오 아이디</Text>
            <TextInput
              style={[
                styles.input,
                (focusedField === 'kakaoTalkId' || data.kakaoTalkId) &&
                  styles.inputFilled,
                errors.kakaoTalkId && styles.inputError,
              ]}
              placeholder="예: mykakao_id (영문, 숫자, ., _, - 사용)"
              value={data.kakaoTalkId}
              onChangeText={text => handleFieldChange('kakaoTalkId', text)}
              onFocus={() => setFocusedField('kakaoTalkId')}
              onBlur={() => setFocusedField(null)}
            />
            {errors.kakaoTalkId && (
              <Text style={styles.errorText}>{errors.kakaoTalkId}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>입학년도</Text>
            <TextInput
              style={[
                styles.input,
                (focusedField === 'studentYear' || data.studentYear) &&
                  styles.inputFilled,
                errors.studentYear && styles.inputError,
              ]}
              placeholder="예: 25 (입학년도 2자리)"
              value={data.studentYear}
              onChangeText={text => handleFieldChange('studentYear', text)}
              keyboardType="number-pad"
              maxLength={2}
              onFocus={() => setFocusedField('studentYear')}
              onBlur={() => setFocusedField(null)}
            />
            {errors.studentYear && (
              <Text style={styles.errorText}>{errors.studentYear}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>학과</Text>
            <TextInput
              style={[
                styles.input,
                (focusedField === 'department' || data.department) &&
                  styles.inputFilled,
                errors.department && styles.inputError,
              ]}
              placeholder="학과를 입력하세요"
              value={data.department}
              onChangeText={text => handleFieldChange('department', text)}
              onFocus={() => setFocusedField('department')}
              onBlur={() => setFocusedField(null)}
            />
            {errors.department && (
              <Text style={styles.errorText}>{errors.department}</Text>
            )}
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.prevButton} onPress={handlePrev}>
          <Text style={styles.prevButtonText}>이전</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.nextButton, !isFormValid && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!isFormValid}
        >
          <Text style={styles.nextButtonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.spacing2,
    paddingBottom: theme.spacing.spacing20,
    minHeight: '100%',
  },
  inputGroup: {
    marginBottom: theme.spacing.spacing6,
  },
  label: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border.input,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
    backgroundColor: theme.colors.background.input,
  },
  inputFilled: {
    borderColor: theme.colors.brand.main,
  },
  inputError: {
    borderColor: theme.colors.red[500],
  },
  errorText: {
    color: theme.colors.red[500],
    fontSize: theme.typography.fontSize.font3,
    marginTop: theme.spacing.spacing2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.spacing2,
    paddingVertical: theme.spacing.spacing4,
    backgroundColor: theme.colors.background.main,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
    gap: theme.spacing.spacing4,
  },
  prevButton: {
    flex: 1,
    backgroundColor: theme.colors.gray[200],
    borderRadius: 8,
    paddingVertical: theme.spacing.spacing4,
    alignItems: 'center',
  },
  prevButtonText: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.sub,
  },
  nextButton: {
    flex: 1,
    backgroundColor: theme.colors.brand.main,
    borderRadius: 8,
    paddingVertical: theme.spacing.spacing4,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: theme.colors.gray[400],
  },
  nextButtonText: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.white,
  },
});
