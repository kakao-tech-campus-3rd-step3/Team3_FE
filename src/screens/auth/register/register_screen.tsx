import { View, Text, Alert, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRegisterMutation } from '@/src/hooks/queries';
import { useRegisterForm } from '@/src/hooks/useRegisterForm';
import { useStep } from '@/src/hooks/useStep';
import AccountSetup from '@/src/screens/auth/register/account_setup';
import EmailVerification from '@/src/screens/auth/register/email_verification';
import ProfileInfo from '@/src/screens/auth/register/profile_info';
import {
  styles,
  getDynamicStyles,
} from '@/src/screens/auth/register/register_screen_style';
import { handleApiError } from '@/src/utils/handle_api_error';
type Step = 1 | 2 | 3;

export default function RegisterScreen() {
  const { width } = useWindowDimensions();
  const registerMutation = useRegisterMutation();
  const { step, handlePrev, handleNext } = useStep<Step>(1, 3);
  const { formData, updateForm, getRegisterData } = useRegisterForm();

  const dynamicStyles = getDynamicStyles(width);

  const handleSubmit = async () => {
    try {
      const result = await registerMutation.mutateAsync(getRegisterData());
      if (!result?.accessToken) {
        throw new Error('회원가입 실패');
      }
      Alert.alert('성공', '회원가입이 완료되었습니다.');
    } catch (error: unknown) {
      handleApiError(error);
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
        <Text style={dynamicStyles.title}>회원가입</Text>
        <Text style={dynamicStyles.subtitle}>새 계정을 만들어보세요</Text>

        <View style={styles.progressContainer}>
          <View style={dynamicStyles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${(step / 3) * 100}%` }]}
            />
          </View>
          <Text style={dynamicStyles.stepText}>{step} / 3</Text>
        </View>
      </View>
      <View style={styles.formContainer}>{renderStep()}</View>
    </SafeAreaView>
  );
}
