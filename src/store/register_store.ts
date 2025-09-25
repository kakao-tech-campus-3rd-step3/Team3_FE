import { create } from 'zustand';

export interface RegisterStep1Data {
  email: string;
  university: string;
  verificationCode: string;
  isEmailVerified: boolean;
}

export interface RegisterStep2Data {
  name: string;
  password: string;
  confirmPassword: string;
  kakaoId: string;
  skillLevel: string;
  position: string;
  university: string;
  department: string;
  studentYear: string;
  bio: string;
}

export interface RegisterStore {
  // 1단계: 이메일 인증
  step1Data: RegisterStep1Data;

  // 2단계: 프로필/개인정보
  step2Data: RegisterStep2Data;

  // 현재 단계
  currentStep: number;

  // 액션들
  setStep1Data: (data: Partial<RegisterStep1Data>) => void;
  setStep2Data: (data: Partial<RegisterStep2Data>) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;

  // 유효성 검사
  isStep1Valid: () => boolean;
  isStep2Valid: () => boolean;
  canProceedToStep2: () => boolean;
  canProceedToStep3: () => boolean;
}

const initialStep1Data: RegisterStep1Data = {
  email: '',
  university: '',
  verificationCode: '',
  isEmailVerified: false,
};

const initialStep2Data: RegisterStep2Data = {
  name: '',
  password: '',
  confirmPassword: '',
  kakaoId: '',
  skillLevel: '',
  position: '',
  university: '',
  department: '',
  studentYear: '',
  bio: '',
};

export const useRegisterStore = create<RegisterStore>((set, get) => ({
  step1Data: initialStep1Data,
  step2Data: initialStep2Data,
  currentStep: 1,

  setStep1Data: data =>
    set(state => ({
      step1Data: { ...state.step1Data, ...data },
    })),

  setStep2Data: data =>
    set(state => ({
      step2Data: { ...state.step2Data, ...data },
    })),

  setCurrentStep: step => set({ currentStep: step }),

  nextStep: () => set(state => ({ currentStep: state.currentStep + 1 })),

  prevStep: () => set(state => ({ currentStep: state.currentStep - 1 })),

  reset: () =>
    set({
      step1Data: initialStep1Data,
      step2Data: initialStep2Data,
      currentStep: 1,
    }),

  // 1단계 유효성 검사
  isStep1Valid: () => {
    const { step1Data } = get();
    return (
      step1Data.email.length > 0 &&
      step1Data.verificationCode.length > 0 &&
      step1Data.isEmailVerified
    );
  },

  // 2단계 유효성 검사
  isStep2Valid: () => {
    const { step2Data } = get();
    return (
      step2Data.name.length >= 2 &&
      step2Data.password.length >= 8 &&
      step2Data.password === step2Data.confirmPassword
    );
  },

  // 2단계로 진행 가능한지
  canProceedToStep2: () => {
    return get().isStep1Valid();
  },

  // 3단계로 진행 가능한지
  canProceedToStep3: () => {
    return get().isStep1Valid() && get().isStep2Valid();
  },
}));
