import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ROUTES } from '@/src/constants/routes';
import {
  useSendPasswordResetCodeMutation,
  useVerifyCodeMutation,
  useResetPasswordMutation,
} from '@/src/hooks/queries';
import { theme } from '@/src/theme';
import { VerifyCodeResponse } from '@/src/types';

function isVerifyCodeResponse(
  response: unknown
): response is VerifyCodeResponse {
  return (
    response !== null &&
    typeof response === 'object' &&
    'token' in response &&
    typeof (response as Record<string, unknown>).token === 'string'
  );
}

interface ForgotPasswordScreenProps {
  onBackToLogin: () => void;
}

type ForgotPasswordStep = 'email' | 'verification' | 'newPassword';

function ForgotPasswordScreen({ onBackToLogin }: ForgotPasswordScreenProps) {
  const [currentStep, setCurrentStep] = useState<ForgotPasswordStep>('email');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState('');

  const sendCodeMutation = useSendPasswordResetCodeMutation();
  const verifyCodeMutation = useVerifyCodeMutation();
  const resetPasswordMutation = useResetPasswordMutation();

  const handleEmailSubmit = async () => {
    if (!email.trim()) {
      Alert.alert('오류', '이메일을 입력해주세요.');
      return;
    }

    try {
      await sendCodeMutation.mutateAsync(email);
      Alert.alert(
        '인증코드 발송 완료',
        '입력하신 이메일로 인증코드를 발송했습니다.',
        [{ text: '확인', onPress: () => setCurrentStep('verification') }]
      );
    } catch (error: unknown) {
      const errorMessage =
        (error as Error).message || '인증코드 발송에 실패했습니다.';
      Alert.alert('오류', errorMessage);
    }
  };

  const handleVerificationSubmit = async () => {
    if (!verificationCode.trim()) {
      Alert.alert('오류', '인증코드를 입력해주세요.');
      return;
    }

    try {
      const response = await verifyCodeMutation.mutateAsync({
        email,
        code: verificationCode,
      });

      if (isVerifyCodeResponse(response)) {
        setResetToken(response.token);
        setCurrentStep('newPassword');
      } else {
        throw new Error('응답 형식이 올바르지 않습니다.');
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as Error).message || '인증코드가 올바르지 않습니다.';
      Alert.alert('오류', errorMessage);
    }
  };

  const handlePasswordSubmit = async () => {
    if (!newPassword.trim()) {
      Alert.alert('오류', '새 비밀번호를 입력해주세요.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert('오류', '비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    try {
      await resetPasswordMutation.mutateAsync({
        token: resetToken,
        password: newPassword,
      });
      Alert.alert(
        '비밀번호 변경 완료',
        '비밀번호가 성공적으로 변경되었습니다.',
        [{ text: '확인', onPress: () => router.push(ROUTES.LOGIN) }]
      );
    } catch (error: unknown) {
      const errorMessage =
        (error as Error).message || '비밀번호 변경에 실패했습니다.';
      Alert.alert('오류', errorMessage);
    }
  };

  const renderEmailStep = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>비밀번호 찾기</Text>
        <Text style={styles.subtitle}>
          가입하신 이메일 주소를 입력해주세요.{'\n'}
          인증코드를 보내드립니다.
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Ionicons
            name="mail-outline"
            size={20}
            color={theme.colors.brand.main}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="이메일을 입력하세요"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            sendCodeMutation.isPending && styles.submitButtonDisabled,
          ]}
          onPress={handleEmailSubmit}
          disabled={sendCodeMutation.isPending}
        >
          {sendCodeMutation.isPending ? (
            <ActivityIndicator color={theme.colors.white} />
          ) : (
            <Text style={styles.submitButtonText}>인증코드 발송</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );

  const renderVerificationStep = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>인증코드 입력</Text>
        <Text style={styles.subtitle}>
          {email}로 발송된{'\n'}
          인증코드를 입력해주세요.
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Ionicons
            name="key-outline"
            size={20}
            color={theme.colors.brand.main}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="인증코드를 입력하세요"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            verifyCodeMutation.isPending && styles.submitButtonDisabled,
          ]}
          onPress={handleVerificationSubmit}
          disabled={verifyCodeMutation.isPending}
        >
          {verifyCodeMutation.isPending ? (
            <ActivityIndicator color={theme.colors.white} />
          ) : (
            <Text style={styles.submitButtonText}>인증코드 확인</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.backSection}>
        <TouchableOpacity onPress={() => setCurrentStep('email')}>
          <Text style={styles.backText}>이메일 다시 입력</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderNewPasswordStep = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>새 비밀번호 설정</Text>
        <Text style={styles.subtitle}>
          새로운 비밀번호를 입력해주세요.{'\n'}
          비밀번호는 8자 이상이어야 합니다.
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color={theme.colors.brand.main}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="새 비밀번호를 입력하세요"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View
          style={[styles.inputGroup, { marginBottom: theme.spacing.spacing8 }]}
        >
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color={theme.colors.brand.main}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder="비밀번호를 다시 입력하세요"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            resetPasswordMutation.isPending && styles.submitButtonDisabled,
          ]}
          onPress={handlePasswordSubmit}
          disabled={resetPasswordMutation.isPending}
        >
          {resetPasswordMutation.isPending ? (
            <ActivityIndicator color={theme.colors.white} />
          ) : (
            <Text style={styles.submitButtonText}>비밀번호 변경</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.backSection}>
        <TouchableOpacity onPress={() => setCurrentStep('verification')}>
          <Text style={styles.backText}>인증코드 다시 입력</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        extraScrollHeight={20}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {currentStep === 'email' && renderEmailStep()}
        {currentStep === 'verification' && renderVerificationStep()}
        {currentStep === 'newPassword' && renderNewPasswordStep()}

        {currentStep === 'email' && (
          <View style={styles.backSection}>
            <TouchableOpacity onPress={() => router.push(ROUTES.LOGIN)}>
              <Text style={styles.backText}>로그인으로 돌아가기</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.spacing8,
    justifyContent: 'center',
    paddingTop: theme.spacing.spacing10,
    paddingBottom: theme.spacing.spacing10,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.spacing15,
  },
  title: {
    fontSize: theme.typography.text.auth.logo.fontSize,
    fontWeight: theme.typography.text.auth.logo.fontWeight,
    color: theme.colors.brand.main,
    marginBottom: theme.spacing.spacing4,
  },
  subtitle: {
    fontSize: theme.typography.text.auth.tagline.fontSize,
    color: theme.colors.text.sub,
    textAlign: 'center',
    fontWeight: theme.typography.text.auth.tagline.fontWeight,
    lineHeight: theme.typography.text.auth.tagline.lineHeight,
  },
  formContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.spacing10,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.input,
    paddingVertical: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing6,
    width: '100%',
    height: theme.spacing.spacing14,
    justifyContent: 'flex-start',
  },
  inputIcon: {
    marginRight: theme.spacing.spacing2,
    alignSelf: 'center',
    height: theme.spacing.spacing5,
    width: theme.spacing.spacing5,
  },
  textInput: {
    flex: 1,
    fontSize: theme.typography.text.body.fontSize,
    color: theme.colors.text.main,
    paddingVertical: 0,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  submitButton: {
    backgroundColor: theme.colors.success,
    borderRadius: theme.spacing.spacing13,
    paddingVertical: theme.spacing.spacing5,
    paddingHorizontal: theme.spacing.spacing18,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    opacity: 0.9,
    width: '100%',
  },
  submitButtonDisabled: {
    backgroundColor: theme.colors.gray[400],
  },
  submitButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.text.button.fontSize,
    fontWeight: theme.typography.text.button.fontWeight,
  },
  backSection: {
    alignItems: 'center',
  },
  backText: {
    color: theme.colors.text.sub,
    fontSize: theme.typography.text.body.fontSize,
    textDecorationLine: 'underline',
  },
});
