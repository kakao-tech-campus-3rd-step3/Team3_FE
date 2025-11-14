import { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { EmailInputSection } from '@/src/components/auth/register/email_input_section';
import { UniversitySelector } from '@/src/components/auth/register/university_selector';
import { VerificationCodeSection } from '@/src/components/auth/register/verification_code_section';
import { useCountdown } from '@/src/hooks/useCountdown';
import type { RegisterFormData } from '@/src/hooks/useRegisterForm';
import {
  useRegisterValidation,
  emailValidationRules,
} from '@/src/hooks/useRegisterValidation';
import {
  styles,
  getDynamicStyles,
} from '@/src/screens/auth/register/email_verification_style';

interface Props {
  data: RegisterFormData;
  onChange: <K extends keyof RegisterFormData>(
    key: K,
    value: RegisterFormData[K]
  ) => void;
  handleNext: () => void;
}

export default function EmailVerification({
  data,
  onChange,
  handleNext,
}: Props) {
  const { width } = useWindowDimensions();
  const { errors, validateField } = useRegisterValidation(emailValidationRules);

  const [isCodeSent, setIsCodeSent] = useState(false);
  const { start: startTimer } = useCountdown();

  const dynamicStyles = getDynamicStyles(width);

  const isNextButtonDisabled =
    !data.university ||
    !data.universityEmail ||
    !!errors.universityEmail ||
    !data.isEmailVerified;

  const handleFieldChange = (field: keyof RegisterFormData, value: string) => {
    onChange(field, value);
    const updatedData = { ...data, [field]: value };
    validateField(field, value, updatedData);
  };

  const handleEmailChange = (value: string) => {
    handleFieldChange('universityEmail', value);
  };

  const handleVerificationCodeChange = (value: string) => {
    handleFieldChange('verificationCode', value);
  };

  const handleCodeSent = () => {
    setIsCodeSent(true);
  };

  const handleVerificationSuccess = () => {
    onChange('isEmailVerified', true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
      >
        <UniversitySelector
          university={data.university}
          onUniversityChange={item => onChange('university', item)}
        />

        <EmailInputSection
          email={data.universityEmail}
          error={errors.universityEmail}
          isCodeSent={isCodeSent}
          onEmailChange={handleEmailChange}
          onCodeSent={handleCodeSent}
          onTimerStart={startTimer}
        />

        {isCodeSent && (
          <VerificationCodeSection
            email={data.universityEmail}
            verificationCode={data.verificationCode}
            error={errors.verificationCode}
            isEmailVerified={data.isEmailVerified}
            onVerificationCodeChange={handleVerificationCodeChange}
            onVerificationSuccess={handleVerificationSuccess}
          />
        )}

        <TouchableOpacity
          style={[
            dynamicStyles.nextButton,
            isNextButtonDisabled && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={isNextButtonDisabled}
        >
          <Text
            style={[
              dynamicStyles.nextButtonText,
              isNextButtonDisabled && styles.nextButtonTextDisabled,
            ]}
          >
            다음
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}
