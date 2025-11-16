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

import { FormField } from '@/src/components/auth/register/form_field';
import type { RegisterFormData } from '@/src/hooks/useRegisterForm';
import {
  useRegisterValidation,
  profileValidationRules,
} from '@/src/hooks/useRegisterValidation';
import {
  styles,
  getDynamicStyles,
} from '@/src/screens/auth/register/profile_info_style';
import {
  formatFieldValue,
  validateProfileInfo,
} from '@/src/screens/auth/register/profile_info_utils';

interface Props {
  data: RegisterFormData;
  onChange: <K extends keyof RegisterFormData>(
    key: K,
    value: RegisterFormData[K]
  ) => void;
  handlePrev: () => void;
  handleNext: () => void;
}

export default function ProfileInfo({
  data,
  onChange,
  handlePrev,
  handleNext,
}: Props) {
  const { width } = useWindowDimensions();
  const { errors, validateField } = useRegisterValidation(
    profileValidationRules
  );

  const dynamicStyles = getDynamicStyles(width);

  const handleFieldChange = (field: keyof RegisterFormData, value: string) => {
    const formattedValue = formatFieldValue(field, value);
    onChange(field, formattedValue);
    const updatedData = { ...data, [field]: formattedValue };
    validateField(field, formattedValue, updatedData);
  };

  const isFormValid = useMemo(() => validateProfileInfo(data), [data]);

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
          <FormField
            label="이름"
            value={data.name}
            onChangeText={text => handleFieldChange('name', text)}
            error={errors.name}
            placeholder="이름을 입력하세요"
          />

          <FormField
            label="카카오 아이디"
            value={data.kakaoTalkId}
            onChangeText={text => handleFieldChange('kakaoTalkId', text)}
            error={errors.kakaoTalkId}
            placeholder="카카오톡 아이디를 입력해주세요"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <FormField
            label="입학년도"
            value={data.studentYear}
            onChangeText={text => handleFieldChange('studentYear', text)}
            error={errors.studentYear}
            placeholder="예: 25 (입학년도 2자리)"
            keyboardType="number-pad"
            maxLength={2}
          />

          <FormField
            label="학과"
            value={data.department}
            onChangeText={text => handleFieldChange('department', text)}
            error={errors.department}
            placeholder="학과를 입력하세요"
          />
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.prevButton} onPress={handlePrev}>
          <Text style={dynamicStyles.prevButtonText}>이전</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.nextButton, !isFormValid && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!isFormValid}
        >
          <Text style={dynamicStyles.nextButtonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
