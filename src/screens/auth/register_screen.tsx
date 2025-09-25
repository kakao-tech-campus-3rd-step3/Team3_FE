import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRegisterMutation } from '@/src/hooks/queries';
import { useRegisterStore } from '@/src/store/register_store';
import { theme } from '@/src/theme';
import type { RegisterRequest } from '@/src/types';

import { Step1EmailVerification } from './components/register/Step1EmailVerification';
import { Step2ProfileInfo } from './components/register/Step2ProfileInfo';
import { Step3FinalRegister } from './components/register/Step3FinalRegister';

function RegisterScreen({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const registerMutation = useRegisterMutation();
  const { currentStep } = useRegisterStore();

  const handleSubmit = async (userData: RegisterRequest) => {
    try {
      const result = await registerMutation.mutateAsync(userData);
      if (!result?.accessToken) throw new Error('회원가입에 실패했습니다.');
    } catch (error: unknown) {
      console.error('회원가입 실패:', error);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1EmailVerification />;
      case 2:
        return <Step2ProfileInfo />;
      case 3:
        return (
          <Step3FinalRegister
            onSubmit={handleSubmit}
            isLoading={registerMutation.isPending}
          />
        );
      default:
        return <Step1EmailVerification />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>회원가입</Text>
        <Text style={styles.subtitle}>새 계정을 만들어보세요</Text>
      </View>

      <View style={styles.formContainer}>{renderCurrentStep()}</View>
    </SafeAreaView>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
    paddingHorizontal: theme.spacing.spacing6,
  },
  header: {
    alignItems: 'center',
    marginTop: theme.spacing.spacing12,
    marginBottom: theme.spacing.spacing8,
  },
  title: {
    fontSize: theme.typography.fontSize.font7,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.sub,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
