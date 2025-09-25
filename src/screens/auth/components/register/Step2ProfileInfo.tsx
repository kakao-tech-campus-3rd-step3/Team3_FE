import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { useRegisterStore } from '@/src/store/register_store';
import { theme } from '@/src/theme';

export function Step2ProfileInfo() {
  const { step2Data, setStep2Data, prevStep, nextStep } = useRegisterStore();
  const [focusedField, setFocusedField] = React.useState<string | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '66%' }]} />
        </View>
        <Text style={styles.progressText}>2/3</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={[
            styles.input,
            (focusedField === 'name' || step2Data.name) && styles.inputFocused,
          ]}
          placeholder="이름을 입력하세요"
          value={step2Data.name}
          onChangeText={text => setStep2Data({ name: text })}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>카카오 아이디</Text>
        <TextInput
          style={[
            styles.input,
            (focusedField === 'kakaoId' || step2Data.kakaoId) &&
              styles.inputFocused,
          ]}
          placeholder="카카오 아이디를 입력하세요"
          value={step2Data.kakaoId}
          onChangeText={text => setStep2Data({ kakaoId: text })}
          onFocus={() => setFocusedField('kakaoId')}
          onBlur={() => setFocusedField(null)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>학과</Text>
        <TextInput
          style={[
            styles.input,
            (focusedField === 'department' || step2Data.department) &&
              styles.inputFocused,
          ]}
          placeholder="학과를 입력하세요"
          value={step2Data.department}
          onChangeText={text => setStep2Data({ department: text })}
          onFocus={() => setFocusedField('department')}
          onBlur={() => setFocusedField(null)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>학번</Text>
        <TextInput
          style={[
            styles.input,
            (focusedField === 'studentYear' || step2Data.studentYear) &&
              styles.inputFocused,
          ]}
          placeholder="예: 25 (2자리 숫자)"
          value={step2Data.studentYear}
          onChangeText={text => setStep2Data({ studentYear: text })}
          keyboardType="number-pad"
          maxLength={2}
          onFocus={() => setFocusedField('studentYear')}
          onBlur={() => setFocusedField(null)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.prevButton} onPress={prevStep}>
          <Text style={styles.prevButtonText}>이전</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.nextButton,
            (!step2Data.name ||
              !step2Data.kakaoId ||
              !step2Data.department ||
              !step2Data.studentYear) &&
              styles.nextButtonDisabled,
          ]}
          onPress={nextStep}
          disabled={
            !step2Data.name ||
            !step2Data.kakaoId ||
            !step2Data.department ||
            !step2Data.studentYear
          }
        >
          <Text style={styles.nextButtonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.main,
    paddingHorizontal: theme.spacing.spacing2,
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
  },
  inputFocused: {
    borderColor: theme.colors.green[800],
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    marginBottom: theme.spacing.spacing8,
    gap: theme.spacing.spacing4,
  },
  prevButton: {
    flex: 1,
    backgroundColor: theme.colors.gray[200],
    borderRadius: 8,
    paddingVertical: theme.spacing.spacing4,
    alignItems: 'center',
  },
  prevButtonText: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.sub,
  },
  nextButton: {
    flex: 1,
    backgroundColor: theme.colors.green[700],
    borderRadius: 8,
    paddingVertical: theme.spacing.spacing4,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: theme.colors.gray[400],
  },
  nextButtonText: {
    fontSize: theme.typography.fontSize.font4,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.white,
  },
});
