import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

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
  const { errors, validateField, hasErrors, validateAll } =
    useRegisterValidation(profileValidationRules);

  const handleFieldChange = (field: keyof RegisterFormData, value: string) => {
    onChange(field, value);
    validateField(field, value, data);
  };

  const isFormValid = useMemo(() => {
    // 현재 단계(프로필 정보)의 필드만 검증
    const nameValid = data.name && data.name.trim().length >= 2;
    const kakaoIdValid = data.kakaoId && data.kakaoId.trim().length >= 3;
    const departmentValid =
      data.department && data.department.trim().length > 0;
    const studentYearValid =
      data.studentYear && /^\d{2}$/.test(data.studentYear);

    return nameValid && kakaoIdValid && departmentValid && studentYearValid;
  }, [data]);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 50}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets={true}
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
                (focusedField === 'kakaoId' || data.kakaoId) &&
                  styles.inputFilled,
                errors.kakaoId && styles.inputError,
              ]}
              placeholder="카카오 아이디를 입력하세요"
              value={data.kakaoId}
              onChangeText={text => handleFieldChange('kakaoId', text)}
              onFocus={() => setFocusedField('kakaoId')}
              onBlur={() => setFocusedField(null)}
            />
            {errors.kakaoId && (
              <Text style={styles.errorText}>{errors.kakaoId}</Text>
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

          <View style={styles.inputGroup}>
            <Text style={styles.label}>학번</Text>
            <TextInput
              style={[
                styles.input,
                (focusedField === 'studentYear' || data.studentYear) &&
                  styles.inputFilled,
                errors.studentYear && styles.inputError,
              ]}
              placeholder="예: 25 (2자리 숫자)"
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

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.prevButton} onPress={handlePrev}>
              <Text style={styles.prevButtonText}>이전</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.nextButton,
                !isFormValid && styles.nextButtonDisabled,
              ]}
              onPress={handleNext}
              disabled={!isFormValid}
            >
              <Text style={styles.nextButtonText}>다음</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
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
    marginTop: 'auto',
    marginBottom: theme.spacing.spacing8,
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
