import { useState } from 'react';

import type { LoginRequest } from '@/src/types';

export function useLoginForm() {
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<LoginRequest>>({});

  const updateField = (field: keyof LoginRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginRequest> = {};

    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    updateField,
    validateForm,
    resetForm,
    isValid:
      Object.keys(errors).length === 0 && formData.email && formData.password,
  };
}
