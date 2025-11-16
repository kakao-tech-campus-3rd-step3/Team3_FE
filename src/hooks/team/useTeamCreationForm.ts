import { useState } from 'react';

import {
  TeamType,
  SkillLevel,
  DEFAULT_TEAM_TYPE,
  DEFAULT_SKILL_LEVEL,
} from '@/src/types/team';
import {
  validateTeamForm,
  type TeamFormErrors,
} from '@/src/utils/team/validate_team_creation';

export interface TeamFormData {
  name: string;
  university: string;
  teamType: TeamType;
  skillLevel: SkillLevel;
  description: string;
}

export function useTeamCreationForm(initialUniversity?: string) {
  const [formData, setFormData] = useState<TeamFormData>({
    name: '',
    university: initialUniversity || '',
    teamType: DEFAULT_TEAM_TYPE,
    skillLevel: DEFAULT_SKILL_LEVEL,
    description: '',
  });

  const [errors, setErrors] = useState<TeamFormErrors>({});

  const validateForm = (): boolean => {
    const { isValid, errors: newErrors } = validateTeamForm(formData);
    setErrors(newErrors);
    return isValid;
  };

  const updateFormData = <Key extends keyof TeamFormData>(
    field: Key,
    value: TeamFormData[Key]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field in errors) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as keyof TeamFormErrors];
        return newErrors;
      });
    }
  };

  return {
    formData,
    errors,
    updateFormData,
    validateForm,
    setFormData,
  };
}
