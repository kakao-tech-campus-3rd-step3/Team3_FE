import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  useWindowDimensions,
} from 'react-native';

import { useVerifyCodeSignupMutation } from '@/src/hooks/queries';
import {
  styles,
  getDynamicStyles,
} from '@/src/screens/auth/register/email_verification_style';
import { formatVerificationCode } from '@/src/screens/auth/register/email_verification_utils';
import { handleApiError } from '@/src/utils/handle_api_error';

interface VerificationCodeSectionProps {
  email: string;
  verificationCode: string;
  error?: string;
  isEmailVerified: boolean;
  onVerificationCodeChange: (code: string) => void;
  onVerificationSuccess: () => void;
}

export function VerificationCodeSection({
  email,
  verificationCode,
  error,
  isEmailVerified,
  onVerificationCodeChange,
  onVerificationSuccess,
}: VerificationCodeSectionProps) {
  const { width } = useWindowDimensions();
  const dynamicStyles = getDynamicStyles(width);
  const verifyCodeMutation = useVerifyCodeSignupMutation();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const isDisabled =
    !verificationCode ||
    !!error ||
    verifyCodeMutation.isPending ||
    isEmailVerified;

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      Alert.alert('입력 오류', '인증 코드를 입력해주세요.');
      return;
    }
    try {
      await verifyCodeMutation.mutateAsync({
        email,
        code: verificationCode,
      });
      onVerificationSuccess();
      Alert.alert('인증 완료', '이메일 인증이 완료되었습니다.');
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <View style={styles.inputGroup}>
      <Text style={dynamicStyles.label}>인증 코드</Text>
      <View style={styles.verificationContainer}>
        <TextInput
          style={[
            dynamicStyles.input,
            styles.verificationInput,
            (focusedField === 'code' || verificationCode) && styles.inputFilled,
            error && styles.inputError,
          ]}
          placeholder="6자리 인증 코드"
          value={verificationCode}
          onChangeText={text => {
            const numericValue = formatVerificationCode(text);
            onVerificationCodeChange(numericValue);
          }}
          keyboardType="number-pad"
          maxLength={6}
          multiline={false}
          onFocus={() => setFocusedField('code')}
          onBlur={() => setFocusedField(null)}
        />
        <TouchableOpacity
          style={[
            styles.verifyButton,
            isDisabled && styles.verifyButtonDisabled,
          ]}
          onPress={handleVerifyCode}
          disabled={isDisabled}
        >
          <Text
            style={[
              styles.verifyButtonText,
              isDisabled && styles.verifyButtonTextDisabled,
            ]}
          >
            {verifyCodeMutation.isPending
              ? '인증 중...'
              : isEmailVerified
                ? '인증 완료'
                : '인증하기'}
          </Text>
        </TouchableOpacity>
      </View>
      {error && <Text style={dynamicStyles.errorText}>{error}</Text>}
      {isEmailVerified && (
        <Text style={styles.verifiedText}>✓ 이메일 인증이 완료되었습니다.</Text>
      )}
    </View>
  );
}
