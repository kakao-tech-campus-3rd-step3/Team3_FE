import { useState } from 'react';

import type { RegisterFormData } from './useRegisterForm';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const UNIVERSITY_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.ac\.kr$/;
const KAKAO_TALK_ID_REGEX = /^[a-zA-Z0-9._-]{4,20}$/;
const STUDENT_YEAR_REGEX = /^\d{2}$/;
const VERIFICATION_CODE_REGEX = /^\d{6}$/;

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  label?: string;
  patternMessage?: string;
  custom?: (
    value: string,
    allValues?: Partial<RegisterFormData>
  ) => string | null;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

const runValidation = (
  field: string,
  value: string,
  rule: ValidationRule,
  allValues?: Partial<RegisterFormData>
): string | null => {
  const label = rule.label || getFieldLabel(field);

  if (rule.required && !value.trim()) {
    return `${label}을(를) 입력해주세요`;
  }

  if (rule.minLength && value.trim().length < rule.minLength) {
    return `${label}은(는) ${rule.minLength}자 이상 입력해주세요`;
  }

  if (rule.maxLength && value.trim().length > rule.maxLength) {
    return `${label}은(는) ${rule.maxLength}자 이하로 입력해주세요`;
  }

  if (rule.pattern && !rule.pattern.test(value)) {
    return rule.patternMessage || getPatternErrorMessage(field);
  }

  if (rule.custom) {
    return rule.custom(value, allValues);
  }

  return null;
};

export const useRegisterValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (
    field: string,
    value: string,
    allValues?: Partial<RegisterFormData>
  ) => {
    const newErrors = { ...errors };
    const rule = rules[field];

    if (!rule) {
      delete newErrors[field];
      setErrors(newErrors);
      return;
    }

    const errorMessage = runValidation(field, value, rule, allValues);

    if (errorMessage) {
      newErrors[field] = errorMessage;
    } else {
      delete newErrors[field];
    }

    setErrors(newErrors);
  };

  const validateAll = (data: Partial<RegisterFormData>) => {
    const newErrors: Record<string, string> = {};

    Object.keys(rules).forEach(field => {
      const value = (data[field as keyof RegisterFormData] as string) || '';
      const rule = rules[field];

      const errorMessage = runValidation(field, value, rule, data);

      if (errorMessage) {
        newErrors[field] = errorMessage;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = () => {
    setErrors({});
  };

  const hasErrors = () => {
    return Object.keys(errors).length > 0;
  };

  return {
    errors,
    validateField,
    validateAll,
    clearErrors,
    hasErrors,
  };
};

const getFieldLabel = (field: string): string => {
  const labels: Record<string, string> = {
    name: '이름',
    kakaoTalkId: '카카오톡 아이디',
    skillLevel: '실력',
    position: '포지션',
    department: '학과',
    studentYear: '입학년도',
    university: '대학교',
    email: '이메일',
    universityEmail: '학교 이메일',
    verificationCode: '인증번호',
    password: '비밀번호',
    confirmPassword: '비밀번호 확인',
    bio: '자기소개',
  };
  return labels[field] || field;
};

const getPatternErrorMessage = (field: string): string => {
  const messages: Record<string, string> = {
    studentYear: '입학년도는 2자리 숫자로 입력해주세요 (예: 25)',
    verificationCode: '인증번호는 6자리 숫자로 입력해주세요',
    email: '올바른 이메일 형식을 입력해주세요',
    universityEmail: '학교 이메일은 *.ac.kr 도메인으로 입력해주세요',
    password: '비밀번호는 특수문자를 포함한 8자 이상으로 입력해주세요',
    kakaoTalkId:
      '카카오톡 아이디는 영문, 숫자, 특수문자(-, _, .)를 포함하여 4~20자이어야 합니다',
  };
  return messages[field] || '올바른 형식으로 입력해주세요';
};

export const profileValidationRules: ValidationRules = {
  name: {
    required: true,
    minLength: 2,
    label: '이름',
  },
  kakaoTalkId: {
    required: true,
    pattern: KAKAO_TALK_ID_REGEX,
    label: '카카오톡 아이디',
    patternMessage:
      '카카오톡 아이디는 영문, 숫자, 특수문자(-, _, .)를 포함하여 4~20자이어야 합니다',
  },
  studentYear: {
    required: true,
    pattern: STUDENT_YEAR_REGEX,
    label: '입학년도',
    patternMessage: '입학년도는 2자리 숫자로 입력해주세요 (예: 25)',
  },
  department: {
    required: true,
    minLength: 2,
    label: '학과',
  },
  bio: {
    maxLength: 500,
    label: '자기소개',
  },
};

export const emailValidationRules: ValidationRules = {
  university: {
    required: true,
    label: '대학교',
  },
  universityEmail: {
    required: true,
    pattern: UNIVERSITY_EMAIL_REGEX,
    label: '학교 이메일',
    patternMessage: '학교 이메일은 *.ac.kr 도메인으로 입력해주세요',
  },
  verificationCode: {
    required: true,
    pattern: VERIFICATION_CODE_REGEX,
    label: '인증번호',
    patternMessage: '인증번호는 6자리 숫자로 입력해주세요',
  },
};

export const accountValidationRules: ValidationRules = {
  email: {
    required: true,
    pattern: EMAIL_REGEX,
    label: '이메일',
    patternMessage: '올바른 이메일 형식을 입력해주세요',
  },
  password: {
    required: true,
    label: '비밀번호',
    custom: (value: string) => {
      if (!value) return null;

      const errors: string[] = [];

      if (value.length < 8) {
        errors.push('8자 이상');
      }

      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      if (!hasSpecialChar) {
        errors.push('특수문자');
      }

      const hasNumber = /[0-9]/.test(value);
      if (!hasNumber) {
        errors.push('숫자');
      }

      const hasLetter = /[a-zA-Z]/.test(value);
      if (!hasLetter) {
        errors.push('문자');
      }

      if (errors.length > 0) {
        return `${errors.join(', ')}를 포함해서 입력해주세요`;
      }

      return null;
    },
  },
  confirmPassword: {
    required: true,
    label: '비밀번호 확인',
    custom: (value: string, allValues?: Partial<RegisterFormData>) => {
      if (value && allValues?.password && value !== allValues.password) {
        return '비밀번호가 일치하지 않습니다';
      }
      return null;
    },
  },
};
