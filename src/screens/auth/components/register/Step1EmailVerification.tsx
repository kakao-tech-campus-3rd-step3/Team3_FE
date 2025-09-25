import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';

import { UNIVERSITIES } from '@/src/constants/universities';
import { useRegisterStore } from '@/src/store/register_store';
import { theme } from '@/src/theme';

export function Step1EmailVerification() {
  const { step1Data, setStep1Data, nextStep } = useRegisterStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);

  const handleSendVerification = async () => {
    try {
      // TODO: 이메일 인증 API 호출
      console.log('이메일 인증 전송:', step1Data.email);
      setIsVerificationSent(true);
    } catch (error) {
      console.error('이메일 인증 전송 실패:', error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      // TODO: 인증 코드 검증 API 호출
      console.log('인증 코드 검증:', step1Data.verificationCode);
      setStep1Data({ isEmailVerified: true });

      // 인증 완료 후 2단계로 진행
      setTimeout(() => {
        nextStep();
      }, 1000);
    } catch (error) {
      console.error('인증 코드 검증 실패:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '33%' }]} />
        </View>
        <Text style={styles.progressText}>1/3</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>대학교명</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Text
            style={[
              styles.dropdownText,
              !step1Data.university && styles.placeholderText,
            ]}
          >
            {step1Data.university || '대학교를 선택하세요'}
          </Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>

        <Modal
          visible={isDropdownOpen}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsDropdownOpen(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setIsDropdownOpen(false)}
          >
            <View style={styles.dropdownList}>
              <FlatList
                data={UNIVERSITIES}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                      setStep1Data({ university: item });
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.input}
          placeholder="이메일을 입력하세요"
          value={step1Data.email}
          onChangeText={text => setStep1Data({ email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={styles.verifyButton}
          onPress={handleSendVerification}
          disabled={!step1Data.email}
        >
          <Text style={styles.verifyButtonText}>인증번호 전송</Text>
        </TouchableOpacity>
      </View>

      {isVerificationSent && (
        <View style={styles.inputGroup}>
          <View style={styles.verificationHeader}>
            <Text style={styles.label}>인증번호</Text>
            <TouchableOpacity
              style={styles.resendButton}
              onPress={handleSendVerification}
            >
              <Text style={styles.resendButtonText}>인증번호 재발송</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.verificationRow}>
            <TextInput
              style={styles.verificationInput}
              placeholder="인증번호 6자리를 입력하세요"
              value={step1Data.verificationCode}
              onChangeText={text => setStep1Data({ verificationCode: text })}
              keyboardType="number-pad"
              maxLength={6}
            />
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={handleVerifyCode}
              disabled={!step1Data.verificationCode}
            >
              <Text style={styles.verifyButtonText}>인증 확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {step1Data.isEmailVerified && (
        <Text style={styles.successText}>✓ 이메일 인증이 완료되었습니다</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
    paddingHorizontal: theme.spacing.spacing6,
  },
  progressContainer: {
    marginBottom: theme.spacing.spacing6,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.gray[200],
    borderRadius: 4,
    marginBottom: theme.spacing.spacing2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.brand.main,
    borderRadius: 4,
  },
  progressText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
    textAlign: 'center',
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: theme.colors.border.input,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    backgroundColor: theme.colors.background.input,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
    flex: 1,
  },
  placeholderText: {
    color: theme.colors.text.light,
  },
  dropdownArrow: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.text.sub,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownList: {
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    maxHeight: 300,
    width: '80%',
    shadowColor: theme.colors.shadow.medium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  dropdownItem: {
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  dropdownItemText: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing2,
  },
  emailInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border.input,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
    backgroundColor: theme.colors.background.input,
  },
  atSymbol: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
    fontWeight: theme.typography.fontWeight.bold,
  },
  domainButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border.input,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    backgroundColor: theme.colors.background.input,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  domainText: {
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
    flex: 1,
  },
  inputGroup: {
    marginBottom: theme.spacing.spacing6,
  },
  label: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.main,
    marginBottom: theme.spacing.spacing2,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border.input,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
    backgroundColor: theme.colors.background.input,
    marginBottom: theme.spacing.spacing3,
  },
  verifyButton: {
    backgroundColor: theme.colors.brand.main,
    paddingVertical: theme.spacing.spacing3,
    paddingHorizontal: theme.spacing.spacing4,
    borderRadius: 8,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.medium,
  },
  successText: {
    color: theme.colors.green[500],
    fontSize: theme.typography.fontSize.font3,
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: 'center',
    marginTop: theme.spacing.spacing4,
  },
  verificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.spacing2,
  },
  resendButton: {
    paddingVertical: theme.spacing.spacing1,
    paddingHorizontal: theme.spacing.spacing2,
  },
  resendButtonText: {
    fontSize: theme.typography.fontSize.font3,
    color: theme.colors.brand.main,
    fontWeight: theme.typography.fontWeight.medium,
  },
  verificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.spacing2,
  },
  verificationInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border.input,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.spacing4,
    paddingVertical: theme.spacing.spacing3,
    fontSize: theme.typography.fontSize.font4,
    color: theme.colors.text.main,
    backgroundColor: theme.colors.background.input,
  },
});
