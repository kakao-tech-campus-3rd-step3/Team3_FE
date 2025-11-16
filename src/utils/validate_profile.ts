import type { SkillLevel } from '@/src/types/team';

export interface ProfileFormData {
  name: string;
  skillLevel: SkillLevel;
  position: string;
  bio: string;
}

export interface ProfileFormErrors extends Record<string, string | undefined> {
  skillLevel?: string;
  position?: string;
  bio?: string;
}

export function validateProfileForm(formData: ProfileFormData): {
  isValid: boolean;
  errors: ProfileFormErrors;
} {
  const errors: ProfileFormErrors = {};

  if (formData.skillLevel && formData.skillLevel.length > 4) {
    errors.skillLevel = '실력은 4자 이하여야 합니다.';
  }

  if (formData.position && formData.position.length > 10) {
    errors.position = '포지션은 10자 이하여야 합니다.';
  }

  if (formData.bio && formData.bio.length > 500) {
    errors.bio = '자기소개는 500자 이하여야 합니다.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
