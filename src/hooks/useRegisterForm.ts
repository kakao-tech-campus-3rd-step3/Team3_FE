import { useState } from 'react';

import type { RegisterRequest } from '@/src/types';

export interface RegisterFormData {
  // step 1
  university: string;
  universityEmail: string;
  verificationCode: string;
  isEmailVerified: boolean;
  // step 2
  name: string;
  kakaoTalkId: string;
  studentYear: string;
  department: string;
  bio: string;
  // step 3
  password: string;
  confirmPassword: string;
  termsAgreed: boolean;
  privacyAgreed: boolean;
}

const initialFormData: RegisterFormData = {
  university: '',
  universityEmail: '',
  verificationCode: '',
  isEmailVerified: false,
  name: '',
  kakaoTalkId: '',
  studentYear: '',
  department: '',
  bio: '',
  password: '',
  confirmPassword: '',
  termsAgreed: false,
  privacyAgreed: false,
};

export const useRegisterForm = () => {
  const [formData, setFormData] = useState<RegisterFormData>(initialFormData);

  const updateForm = <K extends keyof RegisterFormData>(
    key: K,
    value: RegisterFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const resetForm = () => setFormData(initialFormData);

  const getRegisterData = (): RegisterRequest => ({
    name: formData.name,
    skillLevel: '아마추어',
    email: formData.universityEmail,
    password: formData.password,
    kakaoTalkId: formData.kakaoTalkId,
    position: 'MF',
    university: formData.university,
    department: formData.department,
    studentYear: formData.studentYear,
    bio: formData.bio,
  });

  return { formData, updateForm, resetForm, getRegisterData };
};
