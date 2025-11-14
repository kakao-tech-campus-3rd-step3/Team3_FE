import type { RegisterFormData } from '@/src/hooks/useRegisterForm';

interface ValidationErrors {
  password?: string;
  confirmPassword?: string;
}

export function validateAccountSetup(
  data: RegisterFormData,
  errors: ValidationErrors
): boolean {
  const passwordValid = !errors.password && !!data.password;
  const confirmPasswordValid =
    !errors.confirmPassword && !!data.confirmPassword;
  const termsAgreed = Boolean(data.termsAgreed);
  const privacyAgreed = Boolean(data.privacyAgreed);

  return passwordValid && confirmPasswordValid && termsAgreed && privacyAgreed;
}
