import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  useWindowDimensions,
} from 'react-native';

import { useSendCodeMutation } from '@/src/hooks/queries';
import type { RegisterFormData } from '@/src/hooks/useRegisterForm';
import {
  styles,
  getDynamicStyles,
} from '@/src/screens/auth/register/email_verification_style';
import { handleApiError } from '@/src/utils/handle_api_error';

interface EmailInputSectionProps {
  email: string;
  error?: string;
  isCodeSent: boolean;
  onEmailChange: (email: string) => void;
  onCodeSent: () => void;
  onTimerStart: (seconds: number) => void;
}

export function EmailInputSection({
  email,
  error,
  isCodeSent,
  onEmailChange,
  onCodeSent,
  onTimerStart,
}: EmailInputSectionProps) {
  const { width } = useWindowDimensions();
  const dynamicStyles = getDynamicStyles(width);
  const sendCodeMutation = useSendCodeMutation();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const isDisabled = !email || !!error || sendCodeMutation.isPending;

  const handleSendCode = async () => {
    try {
      await sendCodeMutation.mutateAsync(email);
      onCodeSent();
      onTimerStart(180);
      Alert.alert('전송 완료', '인증 코드가 이메일로 전송되었습니다.');
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <View style={styles.inputGroup}>
      <Text style={dynamicStyles.label}>대학교 이메일</Text>
      <View style={styles.emailContainer}>
        <TextInput
          style={[
            dynamicStyles.input,
            styles.emailInput,
            (focusedField === 'email' || email) && styles.inputFilled,
            error && styles.inputError,
          ]}
          placeholder="이메일 입력"
          value={email}
          onChangeText={onEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          multiline={false}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
        />
        <TouchableOpacity
          style={[
            styles.sendCodeButton,
            isDisabled && styles.sendCodeButtonDisabled,
          ]}
          onPress={handleSendCode}
          disabled={isDisabled}
        >
          <Text
            style={[
              styles.sendCodeButtonText,
              isDisabled && styles.sendCodeButtonTextDisabled,
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
      {error && <Text style={dynamicStyles.errorText}>{error}</Text>}
    </View>
  );
}
