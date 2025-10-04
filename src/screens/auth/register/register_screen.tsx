import { router } from 'expo-router';
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
    } catch (error: unknown) {
      const errorMessage =
        (error as Error).message || '회원가입에 실패했습니다.';

      // 백엔드에서 보낸 구체적인 에러 메시지 표시
      if (errorMessage.includes('아이디의 형식이 올바르지 않습니다')) {
        Alert.alert(
          '입력 오류',
          '카카오톡 아이디 형식을 확인해주세요.\n영문, 숫자, 특수문자(-, _, .)를 포함하여 4~20자이어야 합니다.'
        );
      } else if (errorMessage.includes('이미 존재하는')) {
        Alert.alert(
          '입력 오류',
          '이미 사용 중인 정보입니다. 다른 정보를 입력해주세요.'
        );
      } else {
        Alert.alert('회원가입 실패', errorMessage);
      }
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
