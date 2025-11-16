import { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AgreementSection } from '@/src/components/auth/register/agreement_section';
import { PasswordInputSection } from '@/src/components/auth/register/password_input_section';
import type { RegisterFormData } from '@/src/hooks/useRegisterForm';
import {
  useRegisterValidation,
  accountValidationRules,
} from '@/src/hooks/useRegisterValidation';
import {
  styles,
  getDynamicStyles,
} from '@/src/screens/auth/register/account_setup_style';

import { validateAccountSetup } from './account_setup_utils';

interface Props {
  data: RegisterFormData;
  onChange: <K extends keyof RegisterFormData>(
    key: K,
    value: RegisterFormData[K]
  ) => void;
  onSubmit: () => void;
  isLoading: boolean;
  handlePrev: () => void;
}

export default function AccountSetup({
  data,
  onChange,
  onSubmit,
  isLoading,
  handlePrev,
}: Props) {
  const { width } = useWindowDimensions();
  const { errors, validateField } = useRegisterValidation(
    accountValidationRules
  );

  const dynamicStyles = getDynamicStyles(width);

  const isValid = useMemo(
    () => validateAccountSetup(data, errors),
    [data, errors]
  );

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
        >
          <PasswordInputSection
            data={data}
            errors={errors}
            validateField={validateField}
            onChange={onChange}
          />

          <AgreementSection data={data} onChange={onChange} />
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.prevButton} onPress={handlePrev}>
          <Text style={dynamicStyles.prevButtonText}>이전</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.submitButton,
            (!isValid || isLoading) && styles.submitButtonDisabled,
          ]}
          onPress={onSubmit}
          disabled={!isValid || isLoading}
        >
          <Text style={dynamicStyles.submitButtonText}>
            {isLoading ? '처리 중...' : '회원가입 완료'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
