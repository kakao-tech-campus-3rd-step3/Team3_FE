import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';

import { Dropdown } from '@/src/components/dropdown';
import { EMAIL_DOMAINS } from '@/src/constants/email_domains';
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

export function AccountSetup({
  data,
  onChange,
  onSubmit,
  isLoading,
  handlePrev,
}: Props) {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [passwordMismatchError, setPasswordMismatchError] =
    useState<string>('');
  const [emailId, setEmailId] = useState<string>('');
  const [emailDomain, setEmailDomain] = useState<string>('');
  const { errors, validateField, hasErrors } = useRegisterValidation(
    accountValidationRules
  );

  const handleEmailIdChange = (value: string) => {
    setEmailId(value);
    const fullEmail = value && emailDomain ? `${value}@${emailDomain}` : '';
    onChange('email', fullEmail);
    validateField('email', fullEmail);
  };

  const handleEmailDomainChange = (value: string) => {
    setEmailDomain(value);
    const fullEmail = emailId && value ? `${emailId}@${value}` : '';
    onChange('email', fullEmail);
    validateField('email', fullEmail);
  };

  const handleFieldChange = (field: keyof RegisterFormData, value: string) => {
    onChange(field, value);

    if (field === 'confirmPassword') {
      if (!value.trim()) {
        validateField(field, value);
        setPasswordMismatchError('');
      } else if (value !== data.password) {
        setPasswordMismatchError('비밀번호가 일치하지 않습니다');
      } else {
        validateField(field, value);
        setPasswordMismatchError('');
      }
    } else {
      validateField(field, value);

      // 비밀번호 변경 시 비밀번호 확인 필드도 재검증
      if (field === 'password' && data.confirmPassword) {
        if (data.confirmPassword !== value) {
          setPasswordMismatchError('비밀번호가 일치하지 않습니다');
        } else {
          setPasswordMismatchError('');
        }
      }
    }
  };

  const isValid =
    data.email &&
    data.password &&
    data.confirmPassword &&
    data.password === data.confirmPassword &&
    data.termsAgreed &&
    data.privacyAgreed &&
    !hasErrors() &&
    !passwordMismatchError;

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>이메일</Text>
        <View style={styles.emailContainer}>
          <TextInput
            style={[
              styles.emailInput,
              (focusedField === 'emailId' || emailId) && styles.inputFilled,
              errors.email && styles.inputError,
            ]}
            placeholder="아이디"
            value={emailId}
            onChangeText={handleEmailIdChange}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={() => setFocusedField('emailId')}
            onBlur={() => setFocusedField(null)}
          />
          <Text style={styles.atSymbol}>@</Text>
          <View style={styles.domainDropdown}>
            <Dropdown
              items={EMAIL_DOMAINS}
              value={emailDomain}
              onChange={handleEmailDomainChange}
              placeholder="도메인"
            />
          </View>
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={[
            styles.input,
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
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>비밀번호 확인</Text>
        <TextInput
          style={[
            styles.input,
            (focusedField === 'confirmPassword' || data.confirmPassword) &&
              styles.inputFilled,
            (errors.confirmPassword || passwordMismatchError) &&
              styles.inputError,
          ]}
          placeholder="비밀번호를 다시 입력하세요"
          secureTextEntry
          value={data.confirmPassword}
          onChangeText={text => handleFieldChange('confirmPassword', text)}
          onFocus={() => setFocusedField('confirmPassword')}
          onBlur={() => setFocusedField(null)}
        />
        {(errors.confirmPassword || passwordMismatchError) && (
          <Text style={styles.errorText}>
            {errors.confirmPassword || passwordMismatchError}
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
            <Text style={styles.checkboxText}>
              서비스 이용약관에 동의합니다
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(EXTERNAL_LINKS.TERMS_OF_SERVICE)}
            >
              <Text style={styles.linkText}>약관 보기</Text>
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
            <Text style={styles.checkboxText}>
              개인정보 처리방침에 동의합니다
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(EXTERNAL_LINKS.PRIVACY_POLICY)}
            >
              <Text style={styles.linkText}>정책 보기</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.prevButton} onPress={handlePrev}>
          <Text style={styles.prevButtonText}>이전</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.submitButton,
            (!isValid || isLoading) && styles.submitButtonDisabled,
          ]}
          onPress={onSubmit}
          disabled={!isValid || isLoading}
        >
          <Text style={styles.submitButtonText}>
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
    paddingHorizontal: theme.spacing.spacing2,
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
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing2,
  },
  emailInput: {
    flex: 1,
    flexBasis: 0,
    borderWidth: 1,
    borderColor: theme.colors.border.input,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
    backgroundColor: theme.colors.background.input,
    height: 48,
    minWidth: 0,
  },
  atSymbol: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
    fontWeight: theme.typography.fontWeight.bold,
    paddingHorizontal: theme.spacing.spacing2,
  },
  domainDropdown: {
    flex: 1,
    flexBasis: 0,
    height: 48,
    minWidth: 0,
  },
  errorText: {
    color: theme.colors.red[500],
    fontSize: theme.typography.fontSize.font3,
    marginTop: theme.spacing.spacing2,
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
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: theme.colors.gray[400],
    borderRadius: 4,
    marginRight: theme.spacing.spacing3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: theme.colors.gray[400],
    borderColor: theme.colors.gray[400],
  },
  checkmark: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.bold,
  },
  checkboxTextContainer: {
    flex: 1,
  },
  checkboxText: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
    lineHeight: 20,
  },
  linkText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.brand.main,
    marginTop: theme.spacing.spacing1,
    textDecorationLine: 'underline',
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
