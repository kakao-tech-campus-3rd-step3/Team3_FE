import React, { useState, useEffect } from 'react';
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

import LoginForm from '@/src/screens/auth/components/login/login_form';
import styles from '@/src/screens/auth/login/login_style';

interface LoginScreenProps {
  onSwitchToRegister: () => void;
}

function LoginScreen({ onSwitchToRegister }: LoginScreenProps) {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.logoText}>ShootDoori</Text>
              <Text style={styles.tagline}>대학교 축구 연결 서비스</Text>
            </View>

            <View style={styles.formContainer}>
              <LoginForm />
            </View>

            {!isKeyboardVisible && (
              <View style={styles.signupSection}>
                <View style={styles.signupRow}>
                  <Text style={styles.signupText}>계정이 없으신가요?</Text>
                  <TouchableOpacity onPress={onSwitchToRegister}>
                    <Text style={styles.signupLink}>회원가입</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default LoginScreen;
