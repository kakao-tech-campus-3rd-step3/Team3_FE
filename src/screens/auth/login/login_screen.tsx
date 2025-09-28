import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/src/contexts/auth_context';

import LoginForm from '../components/login/login_form';

import styles from './login_style';

interface LoginScreenProps {
  onSwitchToRegister: () => void;
}

function LoginScreen({ onSwitchToRegister }: LoginScreenProps) {
  const { login } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <TouchableOpacity
              style={styles.tempButton}
              onPress={() => login('temp-token')}
            >
              <Text style={styles.tempButtonText}>임시 로그인</Text>
            </TouchableOpacity>

            <View style={styles.header}>
              <Text style={styles.logoText}>ShootDoori</Text>
              <Text style={styles.tagline}>대학교 축구 연결 서비스</Text>
            </View>

            <View style={styles.formContainer}>
              <LoginForm />
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default LoginScreen;
