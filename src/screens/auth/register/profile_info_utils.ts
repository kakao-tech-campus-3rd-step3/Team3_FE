import type { RegisterFormData } from '@/src/hooks/useRegisterForm';

export function formatFieldValue(
  field: keyof RegisterFormData,
  value: string
): string {
  if (field === 'studentYear') {
    return value.replace(/[^0-9]/g, '').slice(0, 2);
  }
  if (field === 'kakaoTalkId') {
    return value.replace(/[^a-zA-Z0-9._-]/g, '');
  }
  return value;
}

export function validateProfileInfo(data: RegisterFormData): boolean {
  const nameValid = !!(data.name && data.name.trim().length >= 2);
  const kakaotalkIdValid = !!(
    data.kakaoTalkId && /^[a-zA-Z0-9._-]{4,20}$/.test(data.kakaoTalkId)
  );
  const studentYearValid = !!(
    data.studentYear && /^\d{2}$/.test(data.studentYear)
  );
  const departmentValid = !!(
    data.department && data.department.trim().length >= 2
  );

  return nameValid && kakaotalkIdValid && studentYearValid && departmentValid;
}
