import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRegisterMutation } from '@/src/hooks/queries';
import { useRegisterForm } from '@/src/hooks/useRegisterForm';
import { useStep } from '@/src/hooks/useStep';
import { theme } from '@/src/theme';

import { AccountSetup } from './account_setup';
import { EmailVerification } from './email_verification';
import { ProfileInfo } from './profile_info';
type Step = 1 | 2 | 3;

export default function RegisterScreen() {
  const registerMutation = useRegisterMutation();
  const { step, handlePrev, handleNext } = useStep<Step>(1, 3);
  const { formData, updateForm, getRegisterData } = useRegisterForm();

  const handleSubmit = async () => {
    if (
      !formData.password ||
      !formData.confirmPassword ||
      formData.password !== formData.confirmPassword ||
      !formData.termsAgreed ||
      !formData.privacyAgreed
    ) {
      Alert.alert('입력 오류', '모든 항목을 올바르게 입력해주세요.');
      return;
    }

    try {
      const result = await registerMutation.mutateAsync(getRegisterData());
      if (!result?.accessToken) {
        throw new Error('회원가입 실패');
      }
      Alert.alert('성공', '회원가입이 완료되었습니다.');
    } catch {
      Alert.alert('회원가입 실패', '다시 시도해주세요.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <EmailVerification
            data={formData}
            onChange={updateForm}
            handleNext={handleNext}
          />
        );
      case 2:
        return (
          <ProfileInfo
            data={formData}
            onChange={updateForm}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        );
      case 3:
        return (
          <AccountSetup
            data={formData}
            onChange={updateForm}
            onSubmit={handleSubmit}
            isLoading={registerMutation.isPending}
            handlePrev={handlePrev}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>회원가입</Text>
        <Text style={styles.subtitle}>새 계정을 만들어보세요</Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${(step / 3) * 100}%` }]}
            />
          </View>
          <Text style={styles.stepText}>{step} / 3</Text>
        </View>
      </View>
      <View style={styles.formContainer}>{renderStep()}</View>
    </SafeAreaView>
  );
}

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
  progressContainer: {
    marginTop: theme.spacing.spacing4,
    alignItems: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.gray[200],
    borderRadius: 4,
    width: 320,
    marginBottom: theme.spacing.spacing2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.brand.main,
    borderRadius: 4,
  },
  stepText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
