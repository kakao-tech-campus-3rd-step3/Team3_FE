import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Dropdown from '@/src/components/dropdown';
import { UNIVERSITIES } from '@/src/constants/universities';
import {
  useSendCodeMutation,
  useVerifyCodeSignupMutation,
} from '@/src/hooks/queries';
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

export default function EmailVerification({
  data,
  onChange,
  handleNext,
}: Props) {
  const { width } = useWindowDimensions();
  const { errors, validateField } = useRegisterValidation(emailValidationRules);

  const sendCodeMutation = useSendCodeMutation();
  const verifyCodeMutation = useVerifyCodeSignupMutation();

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendCode = async () => {
    if (!data.universityEmail) {
      Alert.alert('입력 오류', '대학교 이메일을 먼저 입력해주세요.');
      return;
    }

    if (errors.universityEmail) {
      Alert.alert('입력 오류', '올바른 대학교 이메일 형식으로 입력해주세요.');
      return;
    }

    try {
      await sendCodeMutation.mutateAsync(data.universityEmail);
      setIsCodeSent(true);
      setTimer(180);
      Alert.alert('전송 완료', '인증 코드가 이메일로 전송되었습니다.');
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '인증 코드 전송에 실패했습니다. 다시 시도해주세요.';
      Alert.alert('전송 실패', errorMessage);
    }
  };

  const handleVerifyCode = async () => {
    if (!data.verificationCode) {
      Alert.alert('입력 오류', '인증 코드를 입력해주세요.');
      return;
    }

    if (errors.verificationCode) {
      Alert.alert('입력 오류', errors.verificationCode);
      return;
    }

    try {
      await verifyCodeMutation.mutateAsync({
        email: data.universityEmail,
        code: data.verificationCode,
      });
      onChange('isEmailVerified', true);
      Alert.alert('인증 완료', '이메일 인증이 완료되었습니다.');
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '인증 코드가 올바르지 않습니다. 다시 확인해주세요.';
      Alert.alert('인증 실패', errorMessage);
    }
  };

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
      fontSize: Math.max(14, width * 0.04),
      color: theme.colors.text.main,
      backgroundColor: theme.colors.background.input,
      textAlignVertical: 'center',
      minHeight: 50,
    },
    errorText: {
      color: theme.colors.red[500],
      fontSize: Math.max(12, width * 0.035),
      marginTop: Math.max(8, width * 0.02),
    },
    nextButton: {
      backgroundColor: theme.colors.brand.main,
      paddingVertical: Math.max(12, width * 0.03),
      paddingHorizontal: Math.max(20, width * 0.05),
      borderRadius: Math.max(8, width * 0.02),
      alignItems: 'center',
      marginTop: Math.max(20, width * 0.05),
    },
    nextButtonText: {
      color: theme.colors.white,
      fontSize: Math.max(14, width * 0.04),
      fontWeight: '500',
    },
  });

  const isNextButtonDisabled =
    !data.university ||
    !data.universityEmail ||
    !!errors.universityEmail ||
    !data.isEmailVerified;

  const isSendCodeButtonDisabled =
    !data.universityEmail ||
    !!errors.universityEmail ||
    sendCodeMutation.isPending;

  const isVerifyButtonDisabled =
    !data.verificationCode ||
    !!errors.verificationCode ||
    verifyCodeMutation.isPending ||
    data.isEmailVerified;

  const handleFieldChange = (field: keyof RegisterFormData, value: string) => {
    onChange(field, value);
    const updatedData = { ...data, [field]: value };
    validateField(field, value, updatedData);
  };

  const handleNextStep = () => {
    if (!data.university || !data.universityEmail) {
      Alert.alert('입력 오류', '대학교명과 이메일을 입력해주세요.');
      return;
    }
    if (errors.universityEmail) {
      Alert.alert(
        '입력 오류',
        '대학교 이메일은 *.ac.kr 도메인으로 입력해주세요.'
      );
      return;
    }
    handleNext();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
      >
        <View style={styles.inputGroup}>
          <Text style={dynamicStyles.label}>대학교명</Text>
          <Dropdown
            items={UNIVERSITIES.map(uni => uni.name)}
            value={data.university}
            onChange={item => onChange('university', item)}
            placeholder="대학교를 선택하세요"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={dynamicStyles.label}>대학교 이메일</Text>
          <View style={styles.emailContainer}>
            <TextInput
              style={[
                dynamicStyles.input,
                styles.emailInput,
                (focusedField === 'universityEmail' || data.universityEmail) &&
                  styles.inputFilled,
                errors.universityEmail && styles.inputError,
              ]}
              placeholder="이메일 입력"
              value={data.universityEmail}
              onChangeText={text => handleFieldChange('universityEmail', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              multiline={false} // ✅ 추가
              onFocus={() => setFocusedField('universityEmail')}
              onBlur={() => setFocusedField(null)}
            />
            <TouchableOpacity
              style={[
                styles.sendCodeButton,
                isSendCodeButtonDisabled && styles.sendCodeButtonDisabled,
              ]}
              onPress={handleSendCode}
              disabled={isSendCodeButtonDisabled}
            >
              <Text
                style={[
                  styles.sendCodeButtonText,
                  isSendCodeButtonDisabled && styles.sendCodeButtonTextDisabled,
                ]}
              >
                {sendCodeMutation.isPending
                  ? '전송 중...'
                  : isCodeSent
                    ? '재전송'
                    : '전송'}
              </Text>
            </TouchableOpacity>
          </View>
          {errors.universityEmail && (
            <Text style={dynamicStyles.errorText}>
              {errors.universityEmail}
            </Text>
          )}
        </View>

        {isCodeSent && (
          <View style={styles.inputGroup}>
            <Text style={dynamicStyles.label}>인증 코드</Text>
            <View style={styles.verificationContainer}>
              <TextInput
                style={[
                  dynamicStyles.input,
                  styles.verificationInput,
                  (focusedField === 'verificationCode' ||
                    data.verificationCode) &&
                    styles.inputFilled,
                  errors.verificationCode && styles.inputError,
                ]}
                placeholder="6자리 인증 코드"
                value={data.verificationCode}
                onChangeText={text => {
                  const numericValue = text.replace(/[^0-9]/g, '').slice(0, 6);
                  handleFieldChange('verificationCode', numericValue);
                }}
                keyboardType="number-pad"
                maxLength={6}
                multiline={false}
                onFocus={() => setFocusedField('verificationCode')}
                onBlur={() => setFocusedField(null)}
              />
              <TouchableOpacity
                style={[
                  styles.verifyButton,
                  isVerifyButtonDisabled && styles.verifyButtonDisabled,
                ]}
                onPress={handleVerifyCode}
                disabled={isVerifyButtonDisabled}
              >
                <Text
                  style={[
                    styles.verifyButtonText,
                    isVerifyButtonDisabled && styles.verifyButtonTextDisabled,
                  ]}
                >
                  {verifyCodeMutation.isPending
                    ? '인증 중...'
                    : data.isEmailVerified
                      ? '인증 완료'
                      : '인증하기'}
                </Text>
              </TouchableOpacity>
            </View>
            {errors.verificationCode && (
              <Text style={dynamicStyles.errorText}>
                {errors.verificationCode}
              </Text>
            )}
            {data.isEmailVerified && (
              <Text style={styles.verifiedText}>
                ✓ 이메일 인증이 완료되었습니다.
              </Text>
            )}
          </View>
        )}

        <TouchableOpacity
          style={[
            dynamicStyles.nextButton,
            isNextButtonDisabled && styles.nextButtonDisabled,
          ]}
          onPress={handleNextStep}
          disabled={isNextButtonDisabled}
        >
          <Text
            style={[
              dynamicStyles.nextButtonText,
              isNextButtonDisabled && styles.nextButtonTextDisabled,
            ]}
          >
            다음
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.spacing2,
    paddingBottom: theme.spacing.spacing20,
  },
  inputGroup: { marginBottom: theme.spacing.spacing6 },
  inputFilled: { borderColor: theme.colors.brand.main },
  inputError: { borderColor: theme.colors.red[500] },
  nextButtonDisabled: { backgroundColor: theme.colors.gray[300] },
  nextButtonTextDisabled: { color: theme.colors.gray[500] },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing2,
  },
  emailInput: {
    flex: 4,
    textAlignVertical: 'center',
    minHeight: 50,
  },
  sendCodeButton: {
    backgroundColor: theme.colors.brand.main,
    paddingVertical: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing2,
    borderRadius: 8,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  sendCodeButtonDisabled: { backgroundColor: theme.colors.gray[300] },
  sendCodeButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: 'center',
  },
  sendCodeButtonTextDisabled: { color: theme.colors.gray[500] },
  verificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing2,
  },
  verificationInput: {
    flex: 4,
    textAlignVertical: 'center',
    minHeight: 50,
  },
  verifyButton: {
    backgroundColor: theme.colors.brand.main,
    paddingVertical: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing2,
    borderRadius: 8,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  verifyButtonDisabled: { backgroundColor: theme.colors.gray[300] },
  verifyButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: 'center',
  },
  verifyButtonTextDisabled: { color: theme.colors.gray[500] },
  verifiedText: {
    color: theme.colors.green[600],
    fontSize: theme.typography.fontSize.font3,
    marginTop: theme.spacing.spacing2,
    fontWeight: theme.typography.fontWeight.medium,
  },
});
