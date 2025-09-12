import React, { useState } from 'react';
import { SafeAreaView, View, Alert } from 'react-native';
import { useLoginMutation } from '@/src/hooks/queries';
import { useAuth } from '@/src/contexts/auth_context';
import styles from './login_style';
import type { LoginRequest } from '@/src/types';

import LoginHeader from './components/loginHeader';
import LoginForm from './components/loginForm';
import SignupSection from './components/signupSection';

interface LoginScreenProps {
  onSwitchToRegister: () => void;
}

function LoginScreen({ onSwitchToRegister }: LoginScreenProps) {
  const loginMutation = useLoginMutation();
  const { login } = useAuth();
  const [passwordError, setPasswordError] = useState<string>('');

  const handleSubmit = async (credentials: LoginRequest) => {
    try {
      setPasswordError(''); // 에러 초기화
      const result = await loginMutation.mutateAsync(credentials);
      if (!result?.authToken) throw new Error('인증 토큰을 받지 못했습니다.');

      await login(result.authToken);
    } catch (error: unknown) {
      const errorMessage = (error as Error).message || '로그인에 실패했습니다.';

      // 비밀번호 관련 에러인지 확인
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
    setPasswordError(''); // 비밀번호 입력 시 에러 초기화
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <LoginHeader />

        <View style={styles.formContainer}>
          <LoginForm
            onSubmit={handleSubmit}
            isLoading={loginMutation.isPending}
            passwordError={passwordError}
            onPasswordChange={handlePasswordChange}
          />
        </View>

        <SignupSection onSwitchToRegister={onSwitchToRegister} />
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
