import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { ROUTES } from '@/src/constants/routes';
import { useResetPasswordMutation } from '@/src/hooks/queries';
import { theme } from '@/src/theme';
import { handleApiError } from '@/src/utils/handle_api_error';

import { styles } from './forgot_password_steps_style';

interface NewPasswordStepProps {
  resetToken: string;
  newPassword: string;
  confirmPassword: string;
  onNewPasswordChange: (password: string) => void;
  onConfirmPasswordChange: (password: string) => void;
  onBack: () => void;
}

export function NewPasswordStep({
  resetToken,
  newPassword,
  confirmPassword,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onBack,
}: NewPasswordStepProps) {
  const resetPasswordMutation = useResetPasswordMutation();

  const handleSubmit = async () => {
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
      handleApiError(error);
    }
  };

  return (
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
            onChangeText={onNewPasswordChange}
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
            onChangeText={onConfirmPasswordChange}
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
          onPress={handleSubmit}
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
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backText}>인증코드 다시 입력</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
