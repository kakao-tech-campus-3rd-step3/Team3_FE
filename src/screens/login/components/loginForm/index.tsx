import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useLoginForm } from '@/src/hooks/useLoginForm';
import styles from './login_form_style';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/src/theme';
import type { LoginRequest } from '@/src/types';

interface LoginFormProps {
  onSubmit: (data: LoginRequest) => void;
  isLoading?: boolean;
  passwordError?: string;
  onPasswordChange?: () => void;
}

function LoginForm({
  onSubmit,
  isLoading,
  passwordError,
  onPasswordChange,
}: LoginFormProps) {
  const { formData, errors, updateField, validateForm } = useLoginForm();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
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
          style={styles.inputIcon}
        />
        <TextInput
          style={[styles.textInput, errors.email && styles.inputError]}
          placeholder="이메일을 입력하세요"
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
            onPasswordChange?.(); // 비밀번호 입력 시 API 에러 초기화
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

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>비밀번호를 잊으셨나요?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={theme.colors.white} />
        ) : (
          <Text style={styles.loginButtonText}>로그인</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

export default LoginForm;
