import type { RegisterFormData } from '@/src/hooks/useRegisterForm';

interface EmailVerificationButtonStates {
  isNextButtonDisabled: boolean;
  isSendCodeButtonDisabled: boolean;
  isVerifyButtonDisabled: boolean;
}

interface EmailVerificationButtonStatesParams {
  data: RegisterFormData;
  errors: Partial<Record<keyof RegisterFormData, string>>;
  sendCodeMutationPending: boolean;
  verifyCodeMutationPending: boolean;
}

export function getButtonStates({
  data,
  errors,
  sendCodeMutationPending,
  verifyCodeMutationPending,
}: EmailVerificationButtonStatesParams): EmailVerificationButtonStates {
  const isNextButtonDisabled =
    !data.university ||
    !data.universityEmail ||
    !!errors.universityEmail ||
    !data.isEmailVerified;

  const isSendCodeButtonDisabled =
    !data.universityEmail ||
    !!errors.universityEmail ||
    sendCodeMutationPending;

  const isVerifyButtonDisabled =
    !data.verificationCode ||
    !!errors.verificationCode ||
    verifyCodeMutationPending ||
    data.isEmailVerified;

  return {
    isNextButtonDisabled,
    isSendCodeButtonDisabled,
    isVerifyButtonDisabled,
  };
}

export function formatVerificationCode(value: string): string {
  return value.replace(/[^0-9]/g, '').slice(0, 6);
}
