import { useState } from 'react';

import type { RegisterFormData } from './useRegisterForm';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  pattern?: RegExp;
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
  if (rule.required && !value.trim()) {
    return `${getFieldLabel(field)}을(를) 입력해주세요`;
  }

  if (rule.minLength && value.trim().length < rule.minLength) {
    return `${getFieldLabel(field)}은(는) ${rule.minLength}자 이상 입력해주세요`;
  }

  if (rule.pattern && !rule.pattern.test(value)) {
    return getPatternErrorMessage(field);
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
    kakaoId: '카카오 아이디',
    department: '학과',
    studentYear: '학번',
    university: '대학교',
    email: '이메일',
    universityEmail: '학교 이메일',
    verificationCode: '인증번호',
    password: '비밀번호',
    confirmPassword: '비밀번호 확인',
  };
  return labels[field] || field;
};

const getPatternErrorMessage = (field: string): string => {
  const messages: Record<string, string> = {
    studentYear: '학번은 2자리 숫자로 입력해주세요',
    verificationCode: '인증번호는 6자리 숫자로 입력해주세요',
    email: '올바른 이메일 형식을 입력해주세요',
    universityEmail: '올바른 이메일 형식을 입력해주세요',
    password: '비밀번호는 특수문자를 포함한 8자 이상으로 입력해주세요',
  };
  return messages[field] || '올바른 형식으로 입력해주세요';
};

export const profileValidationRules: ValidationRules = {
  name: {
    required: true,
    minLength: 2,
  },
  kakaoId: {
    required: true,
    minLength: 3,
  },
  department: {
    required: true,
  },
  studentYear: {
    required: true,
    pattern: /^\d{2}$/,
  },
};

export const emailValidationRules: ValidationRules = {
  university: {
    required: true,
  },
  universityEmail: {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  verificationCode: {
    required: true,
    pattern: /^\d{6}$/,
  },
};

export const accountValidationRules: ValidationRules = {
  email: {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  password: {
    required: true,
    minLength: 8,
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
    custom: (value: string, allValues?: Partial<RegisterFormData>) => {
      if (value && allValues?.password && value !== allValues.password) {
        return '비밀번호가 일치하지 않습니다';
      }
      return null;
    },
  },
};
