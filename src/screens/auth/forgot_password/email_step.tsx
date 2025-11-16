import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { useSendPasswordResetCodeMutation } from '@/src/hooks/queries';
import { theme } from '@/src/theme';
import { handleApiError } from '@/src/utils/handle_api_error';

import { styles } from './forgot_password_steps_style';

interface EmailStepProps {
  email: string;
  onEmailChange: (email: string) => void;
  onSuccess: () => void;
}

export function EmailStep({ email, onEmailChange, onSuccess }: EmailStepProps) {
  const sendCodeMutation = useSendPasswordResetCodeMutation();

  const handleSubmit = async () => {
    try {
      await sendCodeMutation.mutateAsync(email);
      Alert.alert(
        '인증코드 발송 완료',
        '입력하신 이메일로 인증코드를 발송했습니다.',
        [{ text: '확인', onPress: onSuccess }]
      );
    } catch (error: unknown) {
      handleApiError(error);
    }
  };

  return (
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
            onChangeText={onEmailChange}
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
          onPress={handleSubmit}
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
}
