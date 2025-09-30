import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { Dropdown } from '@/src/components/dropdown';
import { UI_CONSTANTS } from '@/src/constants/ui';
import { UNIVERSITIES } from '@/src/constants/universities';
import type { RegisterFormData } from '@/src/hooks/useRegisterForm';
import {
  useRegisterValidation,
  emailValidationRules,
} from '@/src/hooks/useRegisterValidation';
import { theme } from '@/src/theme';

interface Props {
  data: RegisterFormData;
  onChange: <K extends keyof RegisterFormData>(
    key: K,
    value: RegisterFormData[K]
  ) => void;
  handleNext: () => void;
}
export function EmailVerification({ data, onChange, handleNext }: Props) {
  const { errors, validateField } = useRegisterValidation(emailValidationRules);

  const isNextButtonDisabled = !data.university || !data.universityEmail;

  const handleFieldChange = (field: keyof RegisterFormData, value: string) => {
    onChange(field, value);
    // 업데이트된 데이터로 검증
    const updatedData = { ...data, [field]: value };
    validateField(field, value, updatedData);
  };

  const handleNextStep = () => {
    if (!data.university || !data.universityEmail) {
      Alert.alert('입력 오류', '대학교명과 이메일을 입력해주세요.');
      return;
    }
    handleNext();
  };
  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={UI_CONSTANTS.KEYBOARD_VERTICAL_OFFSET}
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
            <Text style={styles.label}>대학교명</Text>
            <Dropdown
              items={UNIVERSITIES.map(uni => uni.name)}
              value={data.university}
              onChange={item => onChange('university', item)}
              placeholder="대학교를 선택하세요"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>대학교 이메일</Text>
            <TextInput
              style={[
                styles.input,
                data.universityEmail && styles.inputFilled,
                errors.universityEmail && styles.inputError,
              ]}
              placeholder="대학교 이메일을 입력하세요"
              value={data.universityEmail}
              onChangeText={text => handleFieldChange('universityEmail', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.universityEmail && (
              <Text style={styles.errorText}>{errors.universityEmail}</Text>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.nextButton,
              isNextButtonDisabled && styles.nextButtonDisabled,
            ]}
            onPress={handleNextStep}
            disabled={isNextButtonDisabled}
          >
            <Text
              style={[
                styles.nextButtonText,
                isNextButtonDisabled && styles.nextButtonTextDisabled,
              ]}
            >
              다음
            </Text>
          </TouchableOpacity>
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
  inputGroup: { marginBottom: theme.spacing.spacing6 },
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
  inputFilled: { borderColor: theme.colors.brand.main },
  inputError: { borderColor: theme.colors.red[500] },
  errorText: {
    color: theme.colors.red[500],
    fontSize: theme.typography.fontSize.font3,
    marginTop: theme.spacing.spacing2,
  },
  nextButton: {
    backgroundColor: theme.colors.brand.main,
    paddingVertical: theme.spacing.spacing4,
    paddingHorizontal: theme.spacing.spacing6,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: theme.spacing.spacing6,
  },
  nextButtonDisabled: {
    backgroundColor: theme.colors.gray[300],
  },
  nextButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.medium,
  },
  nextButtonTextDisabled: {
    color: theme.colors.gray[500],
  },
});
