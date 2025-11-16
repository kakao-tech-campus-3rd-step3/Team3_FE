import type { TeamFormData } from '@/src/hooks/team/useTeamCreationForm';

export interface TeamFormErrors {
  name?: string;
  university?: string;
  teamType?: string;
  description?: string;
}

export function validateTeamForm(formData: TeamFormData): {
  isValid: boolean;
  errors: TeamFormErrors;
} {
  const errors: TeamFormErrors = {};

  if (!formData.name.trim()) {
    errors.name = '팀 이름을 입력해주세요';
  } else if (formData.name.length > 100) {
    errors.name = '팀 이름은 100자 이하로 입력해주세요';
  }

  if (!formData.university.trim()) {
    errors.university = '대학교를 입력해주세요';
  } else if (formData.university.length > 100) {
    errors.university = '대학교명은 100자 이하로 입력해주세요';
  }

  if (!formData.teamType.trim()) {
    errors.teamType = '팀 유형을 선택해주세요';
  }

  if (formData.description && formData.description.length > 1000) {
    errors.description = '팀 설명은 1000자 이하로 입력해주세요';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
