import { useState } from 'react';
import { View, Text, TextInput, useWindowDimensions } from 'react-native';

import type { RegisterFormData } from '@/src/hooks/useRegisterForm';
import {
  styles,
  getDynamicStyles,
} from '@/src/screens/auth/register/account_setup_style';

interface PasswordInputSectionProps {
  data: RegisterFormData;
  errors: Record<string, string>;
  validateField: (
    field: keyof RegisterFormData,
    value: string,
    updatedData: RegisterFormData
  ) => void;
  onChange: <K extends keyof RegisterFormData>(
    key: K,
    value: RegisterFormData[K]
  ) => void;
}

export function PasswordInputSection({
  data,
  errors,
  validateField,
  onChange,
}: PasswordInputSectionProps) {
  const { width } = useWindowDimensions();
  const dynamicStyles = getDynamicStyles(width);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleFieldChange = (field: keyof RegisterFormData, value: string) => {
    onChange(field, value);
    const updatedData = { ...data, [field]: value };
    validateField(field, value, updatedData);

    if (field === 'password' && data.confirmPassword) {
      validateField('confirmPassword', data.confirmPassword, updatedData);
    }
  };

  return (
    <>
      <View style={styles.inputGroup}>
        <Text style={dynamicStyles.label}>비밀번호</Text>
        <TextInput
          style={[
            dynamicStyles.input,
            (focusedField === 'password' || data.password) &&
              styles.inputFilled,
            errors.password && styles.inputError,
          ]}
          placeholder="비밀번호를 입력하세요"
          secureTextEntry
          value={data.password}
          onChangeText={text => handleFieldChange('password', text)}
          onFocus={() => setFocusedField('password')}
          onBlur={() => setFocusedField(null)}
        />
        {errors.password && (
          <Text style={dynamicStyles.errorText}>{errors.password}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={dynamicStyles.label}>비밀번호 확인</Text>
        <TextInput
          style={[
            dynamicStyles.input,
            (focusedField === 'confirmPassword' || data.confirmPassword) &&
              styles.inputFilled,
            errors.confirmPassword && styles.inputError,
          ]}
          placeholder="비밀번호 확인"
          secureTextEntry
          value={data.confirmPassword}
          onChangeText={text => handleFieldChange('confirmPassword', text)}
          onFocus={() => setFocusedField('confirmPassword')}
          onBlur={() => setFocusedField(null)}
        />
        {errors.confirmPassword && (
          <Text style={dynamicStyles.errorText}>{errors.confirmPassword}</Text>
        )}
      </View>
    </>
  );
}
