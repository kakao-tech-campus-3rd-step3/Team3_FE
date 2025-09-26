import React, { useState, useRef } from 'react';
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
import { UNIVERSITIES } from '@/src/constants/universities';
import {
  useVerifyEmailMutation,
  useSendVerificationMutation,
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
export function EmailVerification({ data, onChange, handleNext }: Props) {
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const { errors, validateField, validateAll } =
    useRegisterValidation(emailValidationRules);
  const verifyEmailMutation = useVerifyEmailMutation();
  const sendVerificationMutation = useSendVerificationMutation();
  const verificationInputRef = useRef<TextInput>(null);

  const handleFieldChange = (field: keyof RegisterFormData, value: string) => {
    onChange(field, value);
    validateField(field, value, data);
  };

  const handleVerificationCodeChange = (value: string) => {
    setVerificationCode(value);
    validateField('verificationCode', value, data);
  };

  const handleSendVerification = async () => {
    if (!data.university || !data.universityEmail) {
      Alert.alert('입력 오류', '대학교명과 이메일을 입력해주세요.');
      return;
    }

    // try {
    // await sendVerificationMutation.mutateAsync(data.universityEmail);
    setIsVerificationSent(true);
    Alert.alert('전송 완료', '인증번호가 이메일로 전송되었습니다.', [
      {
        text: '확인',
        onPress: () => {
          setTimeout(() => {
            verificationInputRef.current?.focus();
          }, 100);
        },
      },
    ]);
    // } catch {
    //   Alert.alert('오류', '인증번호 전송에 실패했습니다.');
    // }
  };
  const handleVerify = async () => {
    // try {
    //   await verifyEmailMutation.mutateAsync({
    //     universityEmail: data.universityEmail,
    //     code: verificationCode,
    //   });
    setIsEmailVerified(true);
    Alert.alert('성공', '이메일 인증이 완료되었습니다.', [
      { text: '확인', onPress: () => handleNext() },
    ]);
    // } catch {
    //   Alert.alert('오류', '인증번호가 올바르지 않습니다.');
    // }
  };
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
            <Text style={styles.label}>대학교명</Text>
            <Dropdown
              items={UNIVERSITIES}
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
            <TouchableOpacity
              style={[
                styles.verifyButton,
                { marginTop: theme.spacing.spacing3 },
                isVerificationSent && styles.verifyButtonCompleted,
                (!data.university ||
                  !data.universityEmail ||
                  sendVerificationMutation.isPending ||
                  isVerificationSent) &&
                  styles.verifyButtonDisabled,
              ]}
              onPress={handleSendVerification}
              disabled={
                !data.university ||
                !data.universityEmail ||
                sendVerificationMutation.isPending ||
                isVerificationSent
              }
            >
              <Text
                style={[
                  styles.verifyButtonText,
                  (!data.university ||
                    !data.universityEmail ||
                    sendVerificationMutation.isPending ||
                    isVerificationSent) &&
                    styles.verifyButtonTextDisabled,
                ]}
              >
                {sendVerificationMutation.isPending
                  ? '전송 중...'
                  : isVerificationSent
                    ? '전송 완료'
                    : '인증번호 전송'}
              </Text>
            </TouchableOpacity>
          </View>
          {isVerificationSent && (
            <View style={styles.inputGroup}>
              <View style={styles.verificationHeader}>
                <Text style={styles.label}>인증번호</Text>
                <TouchableOpacity
                  style={styles.resendButton}
                  onPress={handleSendVerification}
                  disabled={sendVerificationMutation.isPending}
                >
                  <Text style={styles.resendButtonText}>인증번호 재발송</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.verificationRow}>
                <TextInput
                  ref={verificationInputRef}
                  style={[
                    styles.verificationInput,
                    verificationCode && styles.inputFilled,
                    errors.verificationCode && styles.inputError,
                  ]}
                  placeholder="인증번호를 입력하세요"
                  value={verificationCode}
                  onChangeText={handleVerificationCodeChange}
                  keyboardType="number-pad"
                  maxLength={6}
                />
                <TouchableOpacity
                  style={[
                    styles.verifyButton,
                    (verificationCode.length !== 6 ||
                      verifyEmailMutation.isPending) &&
                      styles.verifyButtonDisabled,
                  ]}
                  onPress={handleVerify}
                  disabled={
                    verificationCode.length !== 6 ||
                    verifyEmailMutation.isPending
                  }
                >
                  <Text
                    style={[
                      styles.verifyButtonText,
                      (verificationCode.length !== 6 ||
                        verifyEmailMutation.isPending) &&
                        styles.verifyButtonTextDisabled,
                    ]}
                  >
                    인증 확인
                  </Text>
                </TouchableOpacity>
              </View>
              {errors.verificationCode && (
                <Text style={styles.errorText}>{errors.verificationCode}</Text>
              )}
            </View>
          )}
          {isEmailVerified && (
            <Text style={styles.successText}>
              ✓ 이메일 인증이 완료되었습니다
            </Text>
          )}
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
  dropdownButton: {
    borderWidth: 1,
    borderColor: theme.colors.border.input,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    backgroundColor: theme.colors.background.input,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
    flex: 1,
  },
  placeholderText: { color: theme.colors.text.light },
  dropdownArrow: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
    paddingBottom: theme.spacing.spacing2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownList: {
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    maxHeight: 300,
    width: '80%',
    shadowColor: theme.colors.shadow.medium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  dropdownItem: {
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  dropdownItemText: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing2,
  },
  emailInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border.input,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
    backgroundColor: theme.colors.background.input,
  },
  atSymbol: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
    fontWeight: theme.typography.fontWeight.bold,
  },
  domainButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border.input,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    backgroundColor: theme.colors.background.input,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  domainText: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
    flex: 1,
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
  verifyButton: {
    backgroundColor: theme.colors.brand.main,
    paddingVertical: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing4,
    borderRadius: 8,
    alignItems: 'center',
  },
  verifyButtonCompleted: {
    backgroundColor: theme.colors.gray[400],
  },
  verifyButtonDisabled: {
    backgroundColor: theme.colors.gray[300],
  },
  verifyButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.medium,
  },
  verifyButtonTextDisabled: {
    color: theme.colors.gray[500],
  },
  successText: {
    color: theme.colors.text.main,
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: 'center',
    marginTop: theme.spacing.spacing4,
  },
  verificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing2,
  },
  resendButton: {
    paddingVertical: theme.spacing.spacing1,
    paddingHorizontal: theme.spacing.spacing2,
  },
  resendButtonText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.brand.main,
    fontWeight: theme.typography.fontWeight.medium,
  },
  verificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing2,
  },
  verificationInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border.input,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
    backgroundColor: theme.colors.background.input,
  },
});
