import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ROUTES } from '@/src/constants/routes';
import { EmailStep } from '@/src/screens/auth/forgot_password/email_step';
import { styles } from '@/src/screens/auth/forgot_password/index_style';
import { NewPasswordStep } from '@/src/screens/auth/forgot_password/new_password_step';
import { VerificationStep } from '@/src/screens/auth/forgot_password/verification_step';

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

  const handleEmailSuccess = () => {
    setCurrentStep('verification');
  };

  const handleVerificationSuccess = (token: string) => {
    setResetToken(token);
    setCurrentStep('newPassword');
  };

  const handleVerificationBack = () => {
    setCurrentStep('email');
  };

  const handleNewPasswordBack = () => {
    setCurrentStep('verification');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        extraScrollHeight={20}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {currentStep === 'email' && (
          <EmailStep
            email={email}
            onEmailChange={setEmail}
            onSuccess={handleEmailSuccess}
          />
        )}
        {currentStep === 'verification' && (
          <VerificationStep
            email={email}
            verificationCode={verificationCode}
            onVerificationCodeChange={setVerificationCode}
            onSuccess={handleVerificationSuccess}
            onBack={handleVerificationBack}
          />
        )}
        {currentStep === 'newPassword' && (
          <NewPasswordStep
            resetToken={resetToken}
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            onNewPasswordChange={setNewPassword}
            onConfirmPasswordChange={setConfirmPassword}
            onBack={handleNewPasswordBack}
          />
        )}

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
