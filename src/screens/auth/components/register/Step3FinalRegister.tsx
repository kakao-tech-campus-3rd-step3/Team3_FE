import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  StyleSheet,
} from 'react-native';

import { useRegisterStore } from '@/src/store/register_store';
import { theme } from '@/src/theme';
import type { RegisterRequest } from '@/src/types/auth';

interface Step3FinalRegisterProps {
  onSubmit: (data: RegisterRequest) => void;
  isLoading?: boolean;
}

export function Step3FinalRegister({
  onSubmit,
  isLoading,
}: Step3FinalRegisterProps) {
  const { step1Data, step2Data, prevStep } = useRegisterStore();
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  const handleSubmit = () => {
    if (
      password &&
      confirmPassword &&
      termsAgreed &&
      privacyAgreed &&
      password === confirmPassword
    ) {
      const registerData: RegisterRequest = {
        name: step2Data.name,
        skillLevel: '중급', // 기본값 설정
        email: step1Data.email,
        universityEmail: step1Data.email,
        password: password,
        kakaoId: step2Data.kakaoId,
        position: '미드필더', // 기본값 설정
        university: step1Data.university,
        department: step2Data.department,
        studentYear: step2Data.studentYear,
        bio: '',
      };
      onSubmit(registerData);
    }
  };

  const isFormValid =
    password &&
    confirmPassword &&
    termsAgreed &&
    privacyAgreed &&
    password === confirmPassword;

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '100%' }]} />
        </View>
        <Text style={styles.progressText}>3/3</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={[
            styles.input,
            (focusedField === 'email' || step1Data.email) &&
              styles.inputFocused,
          ]}
          placeholder="이메일을 입력하세요"
          value={step1Data.email}
          editable={false}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={[
            styles.input,
            (focusedField === 'password' || password) && styles.inputFocused,
          ]}
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => setFocusedField('password')}
          onBlur={() => setFocusedField(null)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>비밀번호 확인</Text>
        <TextInput
          style={[
            styles.input,
            (focusedField === 'confirmPassword' || confirmPassword) &&
              styles.inputFocused,
          ]}
          placeholder="비밀번호를 다시 입력하세요"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => setFocusedField('confirmPassword')}
          onBlur={() => setFocusedField(null)}
        />
        {confirmPassword && password !== confirmPassword && (
          <Text style={styles.errorText}>비밀번호가 일치하지 않습니다</Text>
        )}
      </View>

      <View style={styles.agreementContainer}>
        <TouchableOpacity
          style={styles.agreementItem}
          onPress={() => setTermsAgreed(!termsAgreed)}
        >
          <View
            style={[styles.checkbox, termsAgreed && styles.checkboxChecked]}
          >
            {termsAgreed && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.agreementText}>
            <Text style={styles.agreementLink}>서비스 이용약관</Text>에
            동의합니다
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.agreementItem}
          onPress={() => setPrivacyAgreed(!privacyAgreed)}
        >
          <View
            style={[styles.checkbox, privacyAgreed && styles.checkboxChecked]}
          >
            {privacyAgreed && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.agreementText}>
            <Text style={styles.agreementLink}>개인정보 처리방침</Text>에
            동의합니다
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.prevButton} onPress={prevStep}>
          <Text style={styles.prevButtonText}>이전</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.submitButton,
            (!isFormValid || isLoading) && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.submitButtonText}>회원가입 완료</Text>
          )}
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
  progressContainer: {
    marginBottom: theme.spacing.spacing6,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.gray[200],
    borderRadius: 4,
    marginBottom: theme.spacing.spacing2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.green[500],
    borderRadius: 4,
  },
  progressText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
    textAlign: 'center',
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
  inputFocused: {
    borderColor: theme.colors.green[800],
  },
  errorText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.red[500],
    marginTop: theme.spacing.spacing1,
  },
  agreementContainer: {
    marginBottom: theme.spacing.spacing8,
  },
  agreementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: theme.colors.border.input,
    borderRadius: 4,
    marginRight: theme.spacing.spacing3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: theme.colors.green[500],
    borderColor: theme.colors.green[500],
  },
  checkmark: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.bold,
  },
  agreementText: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
    flex: 1,
  },
  agreementLink: {
    color: theme.colors.brand.main,
    fontWeight: theme.typography.fontWeight.medium,
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
    backgroundColor: theme.colors.green[700],
    borderRadius: 8,
    paddingVertical: theme.spacing.spacing4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: theme.colors.gray[400],
  },
  submitButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.semibold,
  },
});
