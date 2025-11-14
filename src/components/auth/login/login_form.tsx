import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { ROUTES } from '@/src/constants/routes';
import { useLoginMutation } from '@/src/hooks/queries';
import { useLoginForm } from '@/src/hooks/useLoginForm';
import { ApiError } from '@/src/lib/api_client';
import { theme } from '@/src/theme';

import { styles } from './login_form_style';

export default function LoginForm() {
  const { formData, errors, updateField, validateForm } = useLoginForm();
  const loginMutation = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string>('');

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setPasswordError('');
    try {
      await loginMutation.mutateAsync(formData);
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        const errorMessage = error.detail || error.message;
        setPasswordError(errorMessage);
      } else if (error instanceof Error) {
        setPasswordError(error.message);
      } else {
        setPasswordError('로그인에 실패했습니다.');
      }
    }
  };

  const handlePasswordChange = () => {
    setPasswordError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Ionicons
          name="school-outline"
          size={20}
          color={theme.colors.brand.main}
          style={styles.emailIcon}
        />
        <TextInput
          style={[styles.textInput, errors.email && styles.inputError]}
          placeholder="대학교 이메일을 입력하세요"
          value={formData.email}
          onChangeText={text => updateField('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <View style={styles.inputGroup}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color={theme.colors.brand.main}
          style={styles.inputIcon}
        />
        <TextInput
          style={[
            styles.textInput,
            (errors.password || passwordError) && styles.inputError,
          ]}
          placeholder="비밀번호를 입력하세요"
          value={formData.password}
          onChangeText={text => {
            updateField('password', text);
            handlePasswordChange();
          }}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.passwordToggle}
        >
          <Ionicons
            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color={theme.colors.brand.main}
          />
        </TouchableOpacity>
      </View>
      {(errors.password || passwordError) && (
        <Text style={styles.errorText}>{errors.password || passwordError}</Text>
      )}

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => router.push(ROUTES.FORGOT_PASSWORD)}
      >
        <Text style={styles.forgotPasswordText}>비밀번호를 잊으셨나요?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.loginButton,
          loginMutation.isPending && styles.loginButtonDisabled,
        ]}
        onPress={handleSubmit}
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? (
          <ActivityIndicator color={theme.colors.white} />
        ) : (
          <Text style={styles.loginButtonText}>로그인</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
