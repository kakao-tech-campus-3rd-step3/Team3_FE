import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { useVerifyCodeMutation } from '@/src/hooks/queries';
import { theme } from '@/src/theme';
import { VerifyCodeResponse } from '@/src/types';
import { handleApiError } from '@/src/utils/handle_api_error';

import { styles } from './forgot_password_steps_style';

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

interface VerificationStepProps {
  email: string;
  verificationCode: string;
  onVerificationCodeChange: (code: string) => void;
  onSuccess: (token: string) => void;
  onBack: () => void;
}

export function VerificationStep({
  email,
  verificationCode,
  onVerificationCodeChange,
  onSuccess,
  onBack,
}: VerificationStepProps) {
  const verifyCodeMutation = useVerifyCodeMutation();

  const handleSubmit = async () => {
    try {
      const response = await verifyCodeMutation.mutateAsync({
        email,
        code: verificationCode,
      });

      if (isVerifyCodeResponse(response)) {
        onSuccess(response.token);
      } else {
        throw new Error('응답 형식이 올바르지 않습니다.');
      }
    } catch (error: unknown) {
      handleApiError(error);
    }
  };

  return (
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
            onChangeText={onVerificationCodeChange}
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
          onPress={handleSubmit}
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
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backText}>이메일 다시 입력</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
