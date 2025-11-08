import { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { EXTERNAL_LINKS } from '@/src/constants/external_links';
import type { RegisterFormData } from '@/src/hooks/useRegisterForm';
import {
  useRegisterValidation,
  accountValidationRules,
} from '@/src/hooks/useRegisterValidation';
import { theme } from '@/src/theme';

interface Props {
  data: RegisterFormData;
  onChange: <K extends keyof RegisterFormData>(
    key: K,
    value: RegisterFormData[K]
  ) => void;
  onSubmit: () => void;
  isLoading: boolean;
  handlePrev: () => void;
}

export default function AccountSetup({
  data,
  onChange,
  onSubmit,
  isLoading,
  handlePrev,
}: Props) {
  const { width } = useWindowDimensions();
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { errors, validateField } = useRegisterValidation(
    accountValidationRules
  );

  const dynamicStyles = StyleSheet.create({
    label: {
      fontSize: Math.max(14, width * 0.04),
      fontWeight: '500',
      color: theme.colors.text.main,
      marginBottom: Math.max(8, width * 0.02),
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border.input,
      borderRadius: Math.max(8, width * 0.02),
      paddingHorizontal: Math.max(16, width * 0.04),
      paddingVertical: Math.max(12, width * 0.03),
      fontSize: Math.max(14, width * 0.04),
      color: theme.colors.text.main,
      backgroundColor: theme.colors.background.input,
    },
    errorText: {
      color: theme.colors.red[500],
      fontSize: Math.max(12, width * 0.035),
      marginTop: Math.max(8, width * 0.02),
    },
    checkboxText: {
      fontSize: Math.max(14, width * 0.04),
      color: theme.colors.text.main,
      lineHeight: Math.max(20, width * 0.05),
    },
    linkText: {
      fontSize: Math.max(12, width * 0.035),
      color: theme.colors.brand.main,
      marginTop: Math.max(4, width * 0.01),
      textDecorationLine: 'underline',
    },
    prevButtonText: {
      fontSize: Math.max(14, width * 0.04),
      fontWeight: '500',
      color: theme.colors.text.sub,
    },
    submitButtonText: {
      fontSize: Math.max(14, width * 0.04),
      fontWeight: '500',
      color: theme.colors.white,
    },
  });

  const handleFieldChange = (field: keyof RegisterFormData, value: string) => {
    onChange(field, value);
    const updatedData = { ...data, [field]: value };
    validateField(field, value, updatedData);

    if (field === 'password' && data.confirmPassword) {
      validateField('confirmPassword', data.confirmPassword, updatedData);
    }
  };

  const isValid = useMemo(() => {
    const passwordValid = !errors.password && data.password;
    const confirmPasswordValid =
      !errors.confirmPassword && data.confirmPassword;
    const termsAgreed = data.termsAgreed;
    const privacyAgreed = data.privacyAgreed;

    return (
      passwordValid && confirmPasswordValid && termsAgreed && privacyAgreed
    );
  }, [data, errors]);

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
              <Text style={dynamicStyles.errorText}>
                {errors.confirmPassword}
              </Text>
            )}
          </View>

          <View style={styles.agreementContainer}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => onChange('termsAgreed', !data.termsAgreed)}
            >
              <View
                style={[
                  styles.checkbox,
                  data.termsAgreed && styles.checkboxChecked,
                ]}
              >
                {data.termsAgreed && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <View style={styles.checkboxTextContainer}>
                <Text style={dynamicStyles.checkboxText}>
                  서비스 이용약관에 동의합니다
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(EXTERNAL_LINKS.TERMS_OF_SERVICE)
                  }
                >
                  <Text style={dynamicStyles.linkText}>약관 보기</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => onChange('privacyAgreed', !data.privacyAgreed)}
            >
              <View
                style={[
                  styles.checkbox,
                  data.privacyAgreed && styles.checkboxChecked,
                ]}
              >
                {data.privacyAgreed && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <View style={styles.checkboxTextContainer}>
                <Text style={dynamicStyles.checkboxText}>
                  개인정보 처리방침에 동의합니다
                </Text>
                <TouchableOpacity
                  onPress={() => Linking.openURL(EXTERNAL_LINKS.PRIVACY_POLICY)}
                >
                  <Text style={dynamicStyles.linkText}>정책 보기</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.prevButton} onPress={handlePrev}>
          <Text style={dynamicStyles.prevButtonText}>이전</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.submitButton,
            (!isValid || isLoading) && styles.submitButtonDisabled,
          ]}
          onPress={onSubmit}
          disabled={!isValid || isLoading}
        >
          <Text style={dynamicStyles.submitButtonText}>
            {isLoading ? '처리 중...' : '회원가입 완료'}
          </Text>
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
  inputFilled: {
    borderColor: theme.colors.brand.main,
  },
  inputError: {
    borderColor: theme.colors.red[500],
  },
  agreementContainer: {
    marginBottom: theme.spacing.spacing8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.spacing4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: theme.colors.gray[400],
    borderRadius: 4,
    marginRight: theme.spacing.spacing3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    textAlignVertical: 'center',
  },
  checkboxChecked: {
    backgroundColor: theme.colors.gray[400],
    borderColor: theme.colors.gray[400],
  },
  checkmark: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.bold,
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: theme.typography.fontSize.font3,
  },
  checkboxTextContainer: {
    flex: 1,
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
  submitButton: {
    flex: 1,
    backgroundColor: theme.colors.brand.main,
    borderRadius: 8,
    paddingVertical: theme.spacing.spacing4,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: theme.colors.gray[400],
  },
  submitButtonText: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.white,
  },
});
