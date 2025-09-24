import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '@/src/theme';

interface ForgotPasswordScreenProps {
  onBackToLogin: () => void;
}

function ForgotPasswordScreen({ onBackToLogin }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) {
      Alert.alert('오류', '이메일을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      Alert.alert(
        '이메일 발송 완료',
        '비밀번호 재설정 링크가 이메일로 발송되었습니다.',
        [{ text: '확인', onPress: onBackToLogin }]
      );
    } catch {
      Alert.alert('오류', '이메일 발송에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>비밀번호 찾기</Text>
              <Text style={styles.subtitle}>
                가입하신 이메일 주소를 입력해주세요.{'\n'}
                비밀번호 재설정 링크를 보내드립니다.
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
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  isLoading && styles.submitButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                <Text style={styles.submitButtonText}>
                  {isLoading ? '발송 중...' : '비밀번호 재설정 링크 발송'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.backSection}>
              <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                <Text style={styles.backText}>로그인으로 돌아가기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.spacing8,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.spacing15,
  },
  title: {
    fontSize: theme.typography.text.auth.logo.fontSize,
    fontWeight: theme.typography.text.auth.logo.fontWeight,
    color: theme.colors.brand.main,
    marginBottom: theme.spacing.spacing4,
  },
  subtitle: {
    fontSize: theme.typography.text.auth.tagline.fontSize,
    color: theme.colors.text.sub,
    textAlign: 'center',
    fontWeight: theme.typography.text.auth.tagline.fontWeight,
    lineHeight: theme.typography.text.auth.tagline.lineHeight,
  },
  formContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.spacing10,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.input,
    paddingVertical: theme.spacing.spacing4,
    marginBottom: theme.spacing.spacing6,
    width: '100%',
    height: theme.spacing.spacing14,
    justifyContent: 'flex-start',
  },
  inputIcon: {
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
    lineHeight: theme.typography.text.body.lineHeight,
    height: theme.spacing.spacing6,
    paddingTop: 0,
    paddingBottom: 0,
  },
  submitButton: {
    backgroundColor: theme.colors.success,
    borderRadius: theme.spacing.spacing13,
    paddingVertical: theme.spacing.spacing5,
    paddingHorizontal: theme.spacing.spacing18,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    opacity: 0.9,
    width: '100%',
  },
  submitButtonDisabled: {
    backgroundColor: theme.colors.gray[400],
  },
  submitButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.text.button.fontSize,
    fontWeight: theme.typography.text.button.fontWeight,
  },
  backSection: {
    alignItems: 'center',
  },
  backText: {
    color: theme.colors.text.sub,
    fontSize: theme.typography.text.body.fontSize,
    textDecorationLine: 'underline',
  },
});
