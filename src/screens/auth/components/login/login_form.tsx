import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';

import { useLoginMutation } from '@/src/hooks/queries';
import { useLoginForm } from '@/src/hooks/useLoginForm';
import { theme } from '@/src/theme';
import { translateErrorMessage } from '@/src/utils/error_messages';

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
      const rawErrorMessage =
        (error as Error).message || '로그인에 실패했습니다.';
      const errorMessage = translateErrorMessage(rawErrorMessage, {
        endpoint: '/api/auth/login',
        method: 'POST',
      });

      if (
        errorMessage.includes('비밀번호') ||
        errorMessage.includes('password') ||
        errorMessage.includes('인증') ||
        errorMessage.includes('credentials') ||
        errorMessage.includes('access') ||
        rawErrorMessage.includes('FAIL_LOGIN') ||
        rawErrorMessage.includes('로그인')
      ) {
        setPasswordError('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        Alert.alert('로그인 실패', errorMessage);
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
        onPress={() => router.push('/(auth)/forgot_password')}
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.input,
    paddingVertical: theme.spacing.spacing2,
    marginBottom: theme.spacing.spacing3,
    width: '100%',
    height: theme.spacing.spacing14,
    justifyContent: 'flex-start',
  },
  inputGroupFocused: {
    borderBottomColor: theme.colors.grass[500],
  },
  inputIcon: {
    marginRight: theme.spacing.spacing2,
    alignSelf: 'center',
    height: theme.spacing.spacing5,
    width: theme.spacing.spacing5,
  },
  emailIcon: {
    marginRight: theme.spacing.spacing2,
    alignSelf: 'center',
    height: theme.spacing.spacing5,
    width: theme.spacing.spacing5,
  },
  textInput: {
    flex: 1,
    fontSize: theme.typography.text.body.fontSize,
    color: theme.colors.text.main,
    paddingVertical: 0,
    textAlignVertical: 'center',
    includeFontPadding: false,
    minHeight: 50,
    paddingTop: 0,
    paddingBottom: 0,
  },
  inputError: {
    borderBottomColor: theme.colors.error,
  },
  passwordToggle: {
    padding: theme.spacing.spacing1,
    opacity: 0.7,
    marginTop: -theme.spacing.spacing1,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.spacing4,
  },
  forgotPasswordText: {
    color: theme.colors.text.sub,
    fontSize: theme.typography.text.bodySmall.fontSize,
  },
  loginButton: {
    backgroundColor: theme.colors.success,
    borderRadius: theme.spacing.spacing13,
    paddingVertical: theme.spacing.spacing5,
    paddingHorizontal: theme.spacing.spacing18,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    opacity: 0.9,
  },
  loginButtonDisabled: {
    backgroundColor: theme.colors.gray[400],
  },
  loginButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.text.button.fontSize,
    fontWeight: theme.typography.text.button.fontWeight,
  },
  errorText: {
    fontSize: theme.typography.text.caption.fontSize,
    color: theme.colors.error,
    marginLeft: theme.spacing.spacing1,
  },
});
