import React, { useState } from 'react';
import { View, Alert, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLoginMutation } from '@/src/hooks/queries';
import type { LoginRequest } from '@/src/types';

import LoginForm from '../components/login/login_form';

import styles from './login_style';

interface LoginScreenProps {
  onSwitchToRegister: () => void;
}

function LoginScreen({ onSwitchToRegister }: LoginScreenProps) {
  const loginMutation = useLoginMutation();
  const [passwordError, setPasswordError] = useState<string>('');

  const handleSubmit = async (credentials: LoginRequest) => {
    setPasswordError('');
    try {
      await loginMutation.mutateAsync(credentials);
    } catch (error: unknown) {
      const errorMessage = (error as Error).message || '로그인에 실패했습니다.';

      if (
        errorMessage.includes('비밀번호') ||
        errorMessage.includes('password') ||
        errorMessage.includes('인증') ||
        errorMessage.includes('credentials')
      ) {
        setPasswordError('비밀번호가 올바르지 않습니다.');
      } else {
        Alert.alert('로그인 실패', errorMessage);
      }
    }
  };

  const handlePasswordChange = () => {
    setPasswordError('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logoText}>ShootDoori</Text>
          <Text style={styles.tagline}>대학교 축구 연결 서비스</Text>
        </View>

        <View style={styles.formContainer}>
          <LoginForm
            onSubmit={handleSubmit}
            isLoading={loginMutation.isPending}
            passwordError={passwordError}
            onPasswordChange={handlePasswordChange}
          />
        </View>

        <View style={styles.signupSection}>
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>계정이 없으신가요?</Text>
            <TouchableOpacity onPress={onSwitchToRegister}>
              <Text style={styles.signupLink}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
